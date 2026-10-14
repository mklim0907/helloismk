import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import { createInterface } from "node:readline";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Supply temporary authenticated download URLs via stdin, never in tracked files.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(await readFile(path.join(root, "scripts/highlight-source.json"), "utf8"));
const directory = path.join(root, "public/images/highlight");
await mkdir(directory, { recursive: true });
console.log("Ready for download references on stdin (input is hidden).");
const reader = createInterface({ input: process.stdin });
const downloads = [];
for await (const line of reader) {
  const input = JSON.parse(line);
  if (input.done) break;
  downloads.push(...input);
}
reader.close();
const references = new Map(downloads.map(item => [item.id, item.url]));
const files = [...new Map(source.flatMap(album => album.photos).map(photo => [photo.id, photo])).values()];
const metadata = new Map();
let cursor = 0;
let completed = 0;
let totalBytes = 0;
const failures = [];

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

await Promise.all(Array.from({ length: 4 }, async () => {
  while (cursor < files.length) {
    const photo = files[cursor++];
    if (!/^[\w-]+$/.test(photo.id)) throw new Error("Invalid file ID");
    const fullPath = path.join(directory, `${photo.id}.webp`);
    const thumbPath = path.join(directory, `${photo.id}-thumb.webp`);
    try {
      if (!await exists(fullPath)) {
        const url = references.get(photo.id);
        if (!url) throw new Error("Download reference missing");
        let bytes;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
            if (!response.ok) throw new Error(`Download HTTP ${response.status}`);
            bytes = Buffer.from(await response.arrayBuffer());
            break;
          } catch {
            if (attempt === 2) throw new Error("Download failed after three attempts");
          }
        }
        await sharp(bytes).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).webp({ quality: 82 }).toFile(fullPath);
      }
      if (!await exists(thumbPath)) {
        await sharp(fullPath).resize({ width: 640, height: 640, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(thumbPath);
      }
      const info = await sharp(fullPath).metadata();
      totalBytes += (await readFile(fullPath)).length + (await readFile(thumbPath)).length;
      metadata.set(photo.id, { width: info.width, height: info.height });
      completed++;
      if (completed % 20 === 0) console.log(`Prepared ${completed}/${files.length} photos.`);
    } catch (error) {
      failures.push({ id: photo.id, reason: error.message });
    }
  }
}));

if (failures.length) {
  console.error(JSON.stringify({ failures }));
  process.exitCode = 1;
} else {
  const albums = source.map(album => ({
    slug: album.slug,
    title: album.title,
    category: album.category,
    group: album.group,
    driveUrl: `https://drive.google.com/drive/folders/${album.folderId}`,
    photos: album.photos.map(photo => ({
      id: photo.id,
      name: photo.name,
      src: `/helloismk/images/highlight/${photo.id}.webp`,
      thumbnail: `/helloismk/images/highlight/${photo.id}-thumb.webp`,
      ...metadata.get(photo.id),
    })),
  }));
  await writeFile(path.join(root, "app/lib/albums.json"), JSON.stringify(albums, null, 2) + "\n");
  console.log(JSON.stringify({ albums: albums.length, photos: completed, webImageMB: +(totalBytes / 1024 / 1024).toFixed(2) }));
}
