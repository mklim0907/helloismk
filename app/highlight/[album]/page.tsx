import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PhotoGallery from "../../components/photo-gallery";
import { albums } from "../../lib/albums";

export const dynamicParams = false;

export function generateStaticParams() {
  return albums.map(album => ({ album: album.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ album: string }> }): Promise<Metadata> {
  const { album: slug } = await params;
  const album = albums.find(item => item.slug === slug);
  return { title: album ? `${album.title} — Highlights` : "相簿不存在" };
}

export default async function AlbumPage({ params }: { params: Promise<{ album: string }> }) {
  const { album: slug } = await params;
  const album = albums.find(item => item.slug === slug);
  if (!album) notFound();

  return (
    <main id="main-content" className="shell album-page">
      <div className="album-breadcrumb">
        <Link href="/highlight" className="text-link">← 返回 Highlights</Link>
        <span className="eyebrow">{album.category} / {album.group}</span>
      </div>
      <header className="album-heading">
        <h1>{album.title}</h1>
        <p className="muted">{album.photos.length} 張照片 · 點擊照片放大瀏覽</p>
      </header>
      <PhotoGallery photos={album.photos} title={album.title} />
      <div className="archive-footnote">
        <Link href="/highlight" className="text-link">瀏覽其他相簿 <span aria-hidden="true">↗</span></Link>
        <a href={album.driveUrl} className="text-link" target="_blank" rel="noopener noreferrer">在 Google Drive 開啟 <span aria-hidden="true">↗</span></a>
      </div>
    </main>
  );
}
