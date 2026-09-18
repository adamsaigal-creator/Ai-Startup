#!/usr/bin/env -S npx tsx
// Generates an Argon2id hash for ADMIN_PASSWORD_HASH_B64.
//
// Usage:  npx tsx scripts/hash-password.ts "your-new-password"
//
// The Argon2 PHC hash is itself delimited by literal `$` characters (e.g.
// $argon2id$v=19$m=...,t=...,p=...$salt$hash), which is awkward to carry
// through a .env file unmangled - Next.js's env loader does shell-style
// $VAR expansion on unescaped `$`, and even escaping it has proven
// fragile across environments. Base64-encoding the whole hash sidesteps
// this entirely: the base64 alphabet never contains `$`, so there is
// nothing for any env loader to misinterpret. The value is decoded back
// to the real hash server-side before verification (lib/auth/password.ts).
import { hashSync } from "@node-rs/argon2";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npx tsx scripts/hash-password.ts "your-new-password"');
  process.exit(1);
}

const hash = hashSync(password);
const base64Hash = Buffer.from(hash, "utf8").toString("base64");

console.log('\nADMIN_PASSWORD_HASH_B64="' + base64Hash + '"\n');
