import "server-only";
import { randomBytes } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

// Self-hosted media storage (Phase 4F). Uploaded image bytes never touch
// Supabase or any third-party storage service - they live on this app's
// own filesystem, at a location controlled entirely by the
// MEDIA_STORAGE_PATH env var, so local dev and DigitalOcean production
// point at two different directories through the same code path with no
// Mac-specific path baked in anywhere.
//
// PostgreSQL (the Media table) remains the source of truth for metadata;
// this module only ever deals with bytes on disk, keyed by the same
// storagePath string that's stored in the database.

/** The public URL prefix runtime uploads are served under - see
 * app/media/[...path]/route.ts. Deliberately not "/uploads": this repo
 * already has a committed, git-tracked public/uploads/ directory of raw
 * legacy migration source assets (Phase 1/2), unrelated to this feature -
 * reusing that path would risk colliding with it. */
export const MEDIA_URL_PREFIX = "/media";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // 10MB

type DetectedImageType = { ext: "jpg" | "png" | "webp" | "gif"; mime: string };

/** Magic-byte sniffing of the actual uploaded bytes. The browser-supplied
 * File.type/File.name are never trusted for this - see the doc comment on
 * validateUpload(). SVG is intentionally not supported: it's XML that can
 * embed <script>, making it a stored-XSS vector if ever rendered directly. */
function detectImageType(bytes: Buffer): DetectedImageType | null {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { ext: "png", mime: "image/png" };
  }
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  if (bytes.length >= 6 && bytes.toString("ascii", 0, 3) === "GIF" && (bytes.toString("ascii", 3, 6) === "87a" || bytes.toString("ascii", 3, 6) === "89a")) {
    return { ext: "gif", mime: "image/gif" };
  }
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") {
    return { ext: "webp", mime: "image/webp" };
  }
  return null;
}

export type UploadValidationResult =
  | { ok: true; bytes: Buffer; ext: string; mime: string }
  | { ok: false; error: string };

/** Validates an uploaded file's actual bytes (not the client-supplied
 * filename or MIME type, which are attacker-controlled and easy to spoof -
 * a .png-named file can contain anything). Rejects anything whose magic
 * bytes don't match one of the allowed raster image formats, and anything
 * over the size cap, before a single byte reaches disk. */
export async function validateUpload(file: File): Promise<UploadValidationResult> {
  if (file.size === 0) {
    return { ok: false, error: "The selected file is empty." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: `File is too large (max ${Math.floor(MAX_UPLOAD_BYTES / (1024 * 1024))}MB).` };
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const detected = detectImageType(bytes);
  if (!detected) {
    return { ok: false, error: "Unsupported file. Only JPG, PNG, WebP, and GIF images are allowed." };
  }
  return { ok: true, bytes, ext: detected.ext, mime: detected.mime };
}

/** Strips path separators, control characters, and anything else that
 * isn't a safe display/URL character, so a crafted filename (e.g.
 * containing "../" or a null byte) can never influence where a file is
 * written or be mistaken for a filesystem path. */
function sanitizeBaseName(rawName: string): string {
  const withoutExt = rawName.replace(/\.[^./\\]+$/, "");
  const cleaned = withoutExt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return cleaned || "image";
}

/** Human-readable-ish but always unique and always generated server-side -
 * never the raw client-supplied filename - so two uploads named the same
 * thing can never collide, and the on-disk name never round-trips
 * attacker-controlled input. */
export function generateStorageFilename(originalName: string, ext: string): string {
  const base = sanitizeBaseName(originalName);
  const suffix = randomBytes(4).toString("hex");
  return `${base}-${suffix}.${ext}`;
}

function resolveStorageRoot(): string {
  const configured = process.env.MEDIA_STORAGE_PATH;
  if (configured && configured.trim() !== "") {
    return path.resolve(configured);
  }
  // Local-dev fallback only - production must set MEDIA_STORAGE_PATH
  // explicitly (see .env.example). Never a Mac-specific absolute path.
  return path.join(process.cwd(), "storage", "uploads");
}

/** Joins a filename onto the storage root and verifies the resolved path
 * didn't escape that root (defense in depth against path traversal, on
 * top of generateStorageFilename() never accepting untrusted input as a
 * path component in the first place). */
function resolveFilePath(storageFilename: string): string {
  const root = resolveStorageRoot();
  const resolved = path.resolve(root, storageFilename);
  if (resolved !== root && !resolved.startsWith(root + path.sep)) {
    throw new Error("Refusing to resolve a media path outside the storage root.");
  }
  return resolved;
}

export async function writeMediaFile(storageFilename: string, bytes: Buffer): Promise<void> {
  const root = resolveStorageRoot();
  await mkdir(root, { recursive: true });
  await writeFile(resolveFilePath(storageFilename), bytes);
}

/** Deletes the on-disk file for a /media/... storagePath. Only ever
 * called for rows this app itself wrote (storagePath starting with
 * MEDIA_URL_PREFIX) - legacy /images/... rows point at git-tracked build
 * assets that this feature must never touch. Best-effort: a missing file
 * is not an error, since PostgreSQL is the source of truth for whether
 * the media record exists, not the filesystem. */
export async function deleteMediaFile(storagePath: string): Promise<void> {
  if (!storagePath.startsWith(`${MEDIA_URL_PREFIX}/`)) return;
  const storageFilename = storagePath.slice(MEDIA_URL_PREFIX.length + 1);
  try {
    await unlink(resolveFilePath(storageFilename));
  } catch {
    // Already gone, or never existed - nothing further to do.
  }
}

/** Used by app/media/[...path]/route.ts to turn a request path back into
 * an on-disk path, with the same traversal guard as the write path. */
export function resolveServedFilePath(segments: string[]): string | null {
  if (segments.some((s) => s === ".." || s === "." || s.includes("/") || s.includes("\\") || s === "")) {
    return null;
  }
  const storageFilename = segments.join("/");
  try {
    return resolveFilePath(storageFilename);
  } catch {
    return null;
  }
}

export function mimeTypeForExtension(ext: string): string | null {
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return null;
  }
}
