import { readFileSync } from "node:fs";
import path from "node:path";
import { albums } from "./albums";

// Read on render so exp.txt stays the source for previews and static builds.
const albumLinks: Record<string, string> = {
  "2023.08 藥品與醫材法規科學碩士在職學位學程 新生座談會": "/highlight/orientation-2023",
  "2023.08 清大醫工營": "/highlight/biomedical-camp-2023",
  "2024.04 清大校慶園遊會與國際美食節": "/highlight/food-fair-2024",
  "2025.03 乙巳梅竹賽": "/highlight/meichu-2025",
  "2026.03 丙午梅竹": "/highlight/meichu-2026",
};
const availableAlbumPaths = new Set(albums.map(album => `/highlight/${album.slug}`));

export interface Experience {
  date: string;
  title: string;
  href?: string;
}

export function getExperienceYears() {
  const text = readFileSync(path.join(process.cwd(), "app/about/exp.txt"), "utf8");
  const projects: Experience[] = text.split(/\r?\n/).flatMap(line => {
    const trimmed = line.trim();
    const match = trimmed.match(/^(\d{4}\.\d{1,2}(?:-\d{4}\.\d{1,2})?)\s+(.+)$/);
    if (!match) return [];
    const date = match[1].replace(/\.(\d)(?=-|$)/g, ".0$1");
    const href = albumLinks[`${date} ${match[2]}`];
    return [{ date, title: match[2], href: href && availableAlbumPaths.has(href) ? href : undefined }];
  }).sort((a, b) => b.date.slice(0, 7).localeCompare(a.date.slice(0, 7)));

  return [...new Set(projects.map(project => project.date.slice(0, 4)))].map(year => ({
    year,
    projects: projects.filter(project => project.date.startsWith(year)),
  }));
}
