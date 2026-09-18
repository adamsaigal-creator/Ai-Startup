import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { mimeTypeForExtension, resolveServedFilePath } from "@/lib/media/storage";

// Serves self-hosted media uploads straight from MEDIA_STORAGE_PATH on
// disk - the public counterpart to lib/media/storage.ts's writer. This is
// what makes "/media/..." a stable URL independent of where the bytes
// physically live, in both local dev and DigitalOcean production (see the
// Phase 4F report for the deployment-readiness notes).
export async function GET(_request: Request, context: RouteContext<"/media/[...path]">) {
  const { path: segments } = await context.params;
  const filePath = resolveServedFilePath(segments);
  if (!filePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const mime = mimeTypeForExtension(path.extname(filePath).slice(1));
  if (!mime) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const bytes = await readFile(filePath);
    return new NextResponse(new Uint8Array(bytes), {
      status: 200,
      headers: {
        "Content-Type": mime,
        // Filenames are content-addressed with a random suffix and never
        // overwritten in place, so a long, immutable cache is safe.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
