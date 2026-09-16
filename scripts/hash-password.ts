#!/usr/bin/env -S npx tsx
// Generates an Argon2id hash for ADMIN_PASSWORD_HASH.
//
// Usage:  npx tsx scripts/hash-password.ts "your-new-password"
//
// The printed value is pre-escaped for a .env file: Next.js's env loader
// (@next/env) does shell-style $VAR expansion on unescaped `$` in .env
// values, which corrupts an Argon2 hash (its format is itself delimited by
// literal `$` characters, e.g. $argon2id$v=19$m=...,t=...,p=...$salt$hash).
// Paste the printed line as-is into .env - do not remove the backslashes.
import { hashSync } from "@node-rs/argon2";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npx tsx scripts/hash-password.ts "your-new-password"');
  process.exit(1);
}

const hash = hashSync(password);
const escapedForDotEnv = hash.replace(/\$/g, "\\$");

console.log("\nADMIN_PASSWORD_HASH=\"" + escapedForDotEnv + "\"\n");
