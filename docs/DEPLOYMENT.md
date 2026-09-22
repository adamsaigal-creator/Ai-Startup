# Deployment Guide — Saigal Realty

This document covers everything needed to deploy and operate this
application on a self-hosted DigitalOcean server. It is a **plan and
reference for the next phase** — no deployment has been executed from
this repository. Follow it in order the first time you provision a
server; after that, only the "Deploying an update" section is needed for
routine changes.

## 1. Architecture summary

- **App**: Next.js 16 (App Router), run with `next start` under PM2.
- **Database**: self-hosted PostgreSQL, same server or a managed DO
  Postgres instance — either works, since the app only needs a
  `DATABASE_URL`.
- **Media**: uploaded images live on disk at `MEDIA_STORAGE_PATH`, a
  directory outside the app's git checkout, served by the app itself at
  `/media/...` (see `app/media/[...path]/route.ts`).
- **Reverse proxy**: Nginx terminates TLS and forwards to the Next.js
  process on `localhost:3000`.
- **TLS**: Let's Encrypt via Certbot.
- **Process manager**: PM2, fork mode (a single Node process — see the
  note on rate limiting below).

Docker is not used. This app has no need for multiple services,
non-Node runtimes, or per-service isolation — a plain Node process behind
Nginx is simpler to operate and debug on a single droplet, and is what
this guide assumes throughout.

## 2. Server prerequisites

On a fresh Ubuntu droplet (22.04 LTS or newer):

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20 LTS or newer (this project was built against Node 22;
# Next.js itself requires >=20.9.0 - see node_modules/next/package.json)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Nginx
sudo apt install -y nginx

# Certbot (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx

# PM2 (global, so it survives any one app's node_modules)
sudo npm install -g pm2

# Git
sudo apt install -y git
```

## 3. Database setup

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE saigal_cms;
CREATE USER saigal_app WITH ENCRYPTED PASSWORD 'a-real-generated-password';
GRANT ALL PRIVILEGES ON DATABASE saigal_cms TO saigal_app;
```

Use a strong, generated password (`openssl rand -base64 24`) — never the
placeholder above. The resulting `DATABASE_URL` looks like:

```
postgresql://saigal_app:PASSWORD@localhost:5432/saigal_cms?schema=public
```

Grant `saigal_app` only what it needs (its own database) — never a
Postgres superuser role, and never reused for anything else on the
server.

## 4. Persistent media directory

Create the directory the app will write uploads to, **outside** the git
checkout so `git pull` / redeploys never touch it:

```bash
sudo mkdir -p /var/www/saigalrealty-data/uploads
sudo chown -R <deploy-user>:<deploy-user> /var/www/saigalrealty-data
sudo chmod 750 /var/www/saigalrealty-data/uploads
```

- `<deploy-user>` is whichever system user runs the PM2 process (a
  dedicated non-root user, not `root`).
- `750` keeps the directory unreadable to other system users while still
  writable by the app; nothing about this directory is ever served
  directly by Nginx — the app's own `/media/...` route handler is the
  only thing that reads it (see `app/media/[...path]/route.ts` and
  `lib/media/storage.ts`), so there is no directory-listing risk from
  the webserver layer either.
- Set `MEDIA_STORAGE_PATH=/var/www/saigalrealty-data/uploads` in the
  app's `.env` (see §6).

## 5. Application checkout

```bash
sudo mkdir -p /var/www/saigalrealty
sudo chown <deploy-user>:<deploy-user> /var/www/saigalrealty
cd /var/www/saigalrealty
git clone <repo-url> . 
git checkout <deploy-branch>
```

## 6. Environment configuration

Copy `.env.example` to `.env` in the app directory and fill in real
values:

```bash
cp .env.example .env
```

| Variable | Value |
|---|---|
| `DATABASE_URL` | From §3 |
| `ADMIN_SESSION_SECRET` | `openssl rand -hex 32` |
| `ADMIN_USERNAME` | The real admin username |
| `ADMIN_PASSWORD_HASH_B64` | `npx tsx scripts/hash-password.ts "the-real-password"` — copy its output verbatim |
| `MEDIA_STORAGE_PATH` | `/var/www/saigalrealty-data/uploads` (§4) |
| `NODE_ENV` | `production` |
| `SITE_URL` | `https://saigalrealty.ca` (only needs setting if the deployed domain differs from this default — see `lib/seo/site-url.ts`) |

`.env` must never be committed — it already isn't (see `.gitignore`).
Its permissions should be restrictive (`chmod 600 .env`), since it holds
the session-signing secret and the path to the admin's password hash.

## 7. Install, migrate, build

```bash
cd /var/www/saigalrealty
npm ci
npx prisma migrate deploy
npm run build
```

- `npm ci` — deterministic install from `package-lock.json`, never `npm
  install` in production.
- `npx prisma migrate deploy` — **applies schema migrations only**. It
  never seeds or modifies data in existing tables. This is the only
  Prisma command a routine deploy ever runs.
- `npm run build` — produces the `.next` production build.

### First deploy only: bootstrap content

A **brand-new, empty** database has no Pages/Neighbourhoods/Blog/
Listings/Team/Settings rows yet — `prisma migrate deploy` only creates
the empty tables. Seed the initial content once, immediately after the
first migration, with:

```bash
npm run db:seed
```

`prisma/seed.ts` (see its own top-of-file comment) refuses to run at all
if the database already has content, unless `ALLOW_RESEED=true` is
explicitly set — so this command is safe to leave documented here
without it ever accidentally wiping a live site. **Never set
`ALLOW_RESEED=true` in production** except in the rare, deliberate case
of intentionally resetting the site back to its bootstrap content — it
overwrites Pages/Neighbourhoods/Blog content and wholesale-replaces
Listings/Media.

After this first seed, all further content changes happen through
`/admin` — never re-run `db:seed` as part of a routine deploy.

## 8. Process management (PM2)

Create `ecosystem.config.js` in the app root (not committed — it's
server-specific):

```js
module.exports = {
  apps: [
    {
      name: "saigal-realty",
      cwd: "/var/www/saigalrealty",
      script: "npm",
      args: "start",
      env: { NODE_ENV: "production", PORT: 3000 },
      instances: 1, // fork mode - see the rate-limit note below
      exec_mode: "fork",
    },
  ],
};
```

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # follow its printed instructions to enable on boot
```

**Why fork mode, not cluster mode**: `lib/auth/rate-limit.ts`'s
brute-force protection for `/admin/login` is an in-memory `Map`, shared
correctly only within a single Node process. Running PM2 in cluster mode
(multiple instances) would split login attempts across processes and
silently weaken the lockout. This app's traffic (one admin, a marketing
site) has no need for multiple instances — if that ever changes, the
rate limiter would need to move to a shared store (e.g. Redis) first.

## 9. Nginx reverse proxy

`/etc/nginx/sites-available/saigalrealty.ca`:

```nginx
server {
    listen 80;
    server_name saigalrealty.ca www.saigalrealty.ca;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

`X-Forwarded-For` is what `lib/auth/rate-limit.ts` reads to key login
attempts by real client IP — without this header (or behind a different
proxy that doesn't set it), every client falls into one shared bucket.
Confirm it's actually present with a request through Nginx before going
live.

```bash
sudo ln -s /etc/nginx/sites-available/saigalrealty.ca /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Then issue the certificate (Certbot rewrites the config above to add the
`listen 443 ssl` block and the HTTP→HTTPS redirect automatically):

```bash
sudo certbot --nginx -d saigalrealty.ca -d www.saigalrealty.ca
```

Certbot's systemd timer renews the certificate automatically; confirm it
exists with `systemctl list-timers | grep certbot`.

Once HTTPS is live, `next.config.ts`'s `Strict-Transport-Security`
header (sent by the app itself, not Nginx) takes effect for real — it's
already conditioned on `NODE_ENV=production` (see §11), so nothing
further is needed here.

## 10. Deploying an update

```bash
cd /var/www/saigalrealty
git pull origin <deploy-branch>
npm ci
npx prisma migrate deploy   # schema only - never touches CMS-edited data
npm run build
pm2 restart saigal-realty
```

`MEDIA_STORAGE_PATH` and the database are both outside this directory
and untouched by `git pull`, so uploaded media and all CMS content
(Pages, Neighbourhoods, Blog, Listings, Team, Settings) survive every
redeploy without any extra step.

## 11. What ships with this codebase already

These are implemented in the application itself, not the server config
— listed here so a deploy isn't second-guessed as missing something:

- **Security headers** (`next.config.ts`'s `headers()`): CSP,
  X-Content-Type-Options, Referrer-Policy, Permissions-Policy,
  X-Frame-Options, and (production only) Strict-Transport-Security.
- **Rate limiting**: `lib/auth/rate-limit.ts`, 5 failed logins per IP
  locks that IP out for 15 minutes (see §8's fork-mode note).
- **robots.txt / sitemap.xml**: `app/robots.ts` / `app/sitemap.ts`,
  generated from live published content, `/admin` disallowed.
- **File upload validation**: magic-byte checks, SVG/executable
  rejection, 10MB cap, randomized filenames, path-traversal guards (see
  `lib/media/storage.ts`).

## 12. Backups

Two things must be backed up, and **kept together** — a database
snapshot and a media snapshot taken at different times can reference
files or rows that don't match (e.g. a Page pointing at a photo the
media backup doesn't have yet, or vice versa).

### What to back up

1. **PostgreSQL** — the entire `saigal_cms` database (all CMS content:
   Pages, Neighbourhoods, Blog, Listings, Team, Settings, Media
   metadata, admin sessions).
2. **`MEDIA_STORAGE_PATH`** (`/var/www/saigalrealty-data/uploads`) — the
   actual uploaded image bytes the Media table's rows point at.

`.env` is also worth backing up separately (it's not content, but
losing `ADMIN_SESSION_SECRET`/`ADMIN_PASSWORD_HASH_B64` without a copy
means regenerating admin access from scratch) — store it somewhere more
restricted than the routine backup rotation, since it's a secret, not
content.

### How to back up

```bash
# Database dump (custom format - faster, smaller, and restorable
# selectively with pg_restore, unlike a plain-text dump)
pg_dump -U saigal_app -Fc saigal_cms > saigal_cms_$(date +%Y%m%d_%H%M%S).dump

# Media directory
tar czf media_$(date +%Y%m%d_%H%M%S).tar.gz -C /var/www/saigalrealty-data uploads
```

Run both commands back-to-back (same script, same run) so the two
snapshots are from the same moment. Store the results off the droplet
(DigitalOcean Spaces, or any off-server location) — a backup that lives
only on the server it's backing up doesn't survive that server's loss.

### Recommended frequency

- **Daily**, automated (a cron job running the two commands above), for
  a low-traffic single-brokerage CMS where content changes are
  infrequent but not worth losing a day of.
- **Immediately before** any manual database operation (a schema
  migration, a deliberate `ALLOW_RESEED=true` reset, a direct SQL edit).
- Retain at least the last 7 daily backups and a handful of older
  weekly/monthly ones, pruning the rest — exact retention is an
  operational choice, not something this app's code constrains.

### Restore procedure

```bash
# Stop the app first - avoid writes racing the restore
pm2 stop saigal-realty

# Database
pg_restore -U saigal_app -d saigal_cms --clean --if-exists saigal_cms_TIMESTAMP.dump

# Media
tar xzf media_TIMESTAMP.tar.gz -C /var/www/saigalrealty-data

pm2 start saigal-realty
```

Always restore the database dump and the media archive from the **same
backup run** — restoring mismatched snapshots reintroduces the
consistency problem the "back up together" rule above exists to avoid.

## 13. Next-step deployment checklist

Use this the first time a real server is provisioned:

- [ ] Droplet created, SSH access confirmed, firewall (ufw) allows 22/80/443 only
- [ ] Node.js, PostgreSQL, Nginx, Certbot, PM2 installed (§2)
- [ ] Dedicated non-root deploy user created, owns `/var/www/saigalrealty*`
- [ ] Database + app-scoped user created (§3), password generated and stored securely
- [ ] `/var/www/saigalrealty-data/uploads` created with correct ownership/permissions (§4)
- [ ] Repo cloned to `/var/www/saigalrealty` on the deploy branch (§5)
- [ ] `.env` populated with real, generated secrets — never the `.env.example` placeholders (§6)
- [ ] `npm ci && npx prisma migrate deploy && npm run build` completes cleanly (§7)
- [ ] `npm run db:seed` run **once** against the empty database (§7) — confirm content loaded via `/admin`
- [ ] PM2 process started in **fork mode**, `pm2 save` + `pm2 startup` done (§8)
- [ ] Nginx site enabled, `nginx -t` passes, reloaded (§9)
- [ ] DNS for saigalrealty.ca / www points at the droplet
- [ ] Certbot certificate issued, HTTPS confirmed working (§9)
- [ ] Confirm `X-Forwarded-For` reaches the app correctly through Nginx (§9) — test the rate limiter
- [ ] Confirm security headers appear on a real response (`curl -I https://saigalrealty.ca/`)
- [ ] Confirm `/robots.txt` and `/sitemap.xml` return real content on the live domain
- [ ] Log into `/admin` with the real credentials, confirm session persists and logout works
- [ ] Upload a test image via `/admin/media`, confirm it appears at its `/media/...` URL
- [ ] Restart PM2 (`pm2 restart saigal-realty`) and confirm CMS content + uploaded media both survive
- [ ] Daily backup cron job installed and confirmed to produce both a `.dump` and a `.tar.gz` (§12)
- [ ] `.env` backed up separately to a restricted location
