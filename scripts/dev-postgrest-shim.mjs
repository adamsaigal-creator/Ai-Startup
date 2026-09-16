#!/usr/bin/env node
// Minimal PostgREST-compatible read-only HTTP shim for local development
// validation ONLY. Not used in production and not part of the shipped app.
//
// Why this exists: the real Supabase local dev stack (`supabase start`)
// needs Docker to pull ~10 service images, and this sandbox's egress
// policy blocks the registries those pulls go through (explicit 403s on
// the Docker Hub / GHCR blob CDNs). A plain local Postgres is reachable
// (via apt), but @supabase/supabase-js talks to Postgres over PostgREST's
// HTTP query protocol, not the Postgres wire protocol - so this shim
// implements just enough of that protocol (select/eq/order/limit, role
// switching by apikey header) for the app's real lib/supabase/* client
// code to run against it unmodified. On a real Supabase project, this
// shim is not needed at all - Supabase provides the genuine PostgREST API.
import { createServer } from "node:http";
import pg from "pg";

const PORT = process.env.SHIM_PORT ? Number(process.env.SHIM_PORT) : 54321;
const ANON_KEY = process.env.SHIM_ANON_KEY || "local-anon-key";
const SERVICE_KEY = process.env.SHIM_SERVICE_KEY || "local-service-role-key";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "saigal",
  user: "app_user",
  password: "app_user_local_dev",
});

function roleForRequest(req) {
  const apikey = req.headers["apikey"] || "";
  const auth = req.headers["authorization"] || "";
  if (apikey === SERVICE_KEY || auth === `Bearer ${SERVICE_KEY}`) return "service_role";
  return "anon";
}

const IDENT_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
function assertIdent(name, kind) {
  if (!IDENT_RE.test(name)) throw new Error(`invalid ${kind}: ${name}`);
  return name;
}

async function handleSelect(client, table, params) {
  assertIdent(table, "table");
  const selectParam = params.get("select") || "*";
  const cols =
    selectParam === "*"
      ? "*"
      : selectParam
          .split(",")
          .map((c) => assertIdent(c.trim(), "column"))
          .map((c) => `"${c}"`)
          .join(", ");

  const whereClauses = [];
  const values = [];
  for (const [key, value] of params.entries()) {
    if (["select", "order", "limit", "offset"].includes(key)) continue;
    assertIdent(key, "column");
    const eqMatch = /^eq\.(.*)$/.exec(value);
    const inMatch = /^in\.\((.*)\)$/.exec(value);
    if (eqMatch) {
      values.push(eqMatch[1]);
      whereClauses.push(`"${key}" = $${values.length}`);
    } else if (inMatch) {
      const items = inMatch[1] === "" ? [] : inMatch[1].split(",").map((s) => s.replace(/^"(.*)"$/, "$1"));
      if (items.length === 0) {
        whereClauses.push("false");
      } else {
        const placeholders = items.map((item) => {
          values.push(item);
          return `$${values.length}`;
        });
        whereClauses.push(`"${key}" IN (${placeholders.join(", ")})`);
      }
    } else {
      throw new Error(`unsupported filter operator for ${key}: ${value}`);
    }
  }
  const where = whereClauses.length ? ` WHERE ${whereClauses.join(" AND ")}` : "";

  let orderSql = "";
  const orderParam = params.get("order");
  if (orderParam) {
    const parts = orderParam.split(",").map((part) => {
      const [col, dir] = part.split(".");
      assertIdent(col, "order column");
      const direction = dir === "desc" ? "DESC" : "ASC";
      return `"${col}" ${direction}`;
    });
    orderSql = ` ORDER BY ${parts.join(", ")}`;
  }

  let limitSql = "";
  const limitParam = params.get("limit");
  if (limitParam) {
    const n = Number(limitParam);
    if (!Number.isInteger(n) || n < 0) throw new Error("invalid limit");
    limitSql = ` LIMIT ${n}`;
  }

  const sql = `SELECT ${cols} FROM "${table}"${where}${orderSql}${limitSql}`;
  const result = await client.query(sql, values);
  return result.rows;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const table = url.pathname.replace(/^\/(rest\/v1\/)?/, "");

  if (req.method !== "GET" || !table) {
    res.writeHead(405, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "shim only supports GET <table> reads" }));
    return;
  }

  const client = await pool.connect();
  try {
    const role = roleForRequest(req);
    await client.query(`SET ROLE ${role}`);
    const rows = await handleSelect(client, table, url.searchParams);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(rows));
  } catch (err) {
    res.writeHead(400, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: String(err.message || err) }));
  } finally {
    try {
      await client.query("RESET ROLE");
    } catch {}
    client.release();
  }
});

server.listen(PORT, () => {
  console.log(`dev-postgrest-shim listening on http://localhost:${PORT}`);
});
