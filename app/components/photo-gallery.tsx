"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "../lib/albums";

export default function PhotoGallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = selected === null ? null : photos[selected];

  useEffect(() => {
    if (selected === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);

  function openPhoto(index: number) {
    setSelected(index);
    dialog.current?.showModal();
  }

  function advance(direction: number) {
    setSelected(current => current === null ? null : (current + direction + photos.length) % photos.length);
  }

  return (
    <>
      <div className="photo-grid">
        {photos.map((item, index) => (
          <button key={item.id} type="button" className="photo-tile" onClick={() => openPhoto(index)} aria-label={`放大 ${title} 第 ${index + 1} 張照片`}>
            <Image src={item.thumbnail} alt={`${title} · ${item.name}`} width={item.width} height={item.height} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" loading={index < 3 ? "eager" : "lazy"} />
            <span className="photo-tile-caption"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">↗</span></span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title}照片檢視器`}
        onClose={() => setSelected(null)}
        onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); advance(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); advance(1); }
        }}
      >
        <button type="button" className="lightbox-close" onClick={() => dialog.current?.close()} aria-label="關閉照片" autoFocus>×</button>
        {photo && selected !== null && (
          <>
            <button type="button" className="lightbox-prev" onClick={() => advance(-1)} aria-label="上一張照片">←</button>
            <figure className="lightbox-photo">
              <Image src={photo.src} alt={`${title} · ${photo.name}`} width={photo.width} height={photo.height} sizes="100vw" />
              <figcaption aria-live="polite"><span>{title}</span><span>{selected + 1} / {photos.length}</span></figcaption>
            </figure>
            <button type="button" className="lightbox-next" onClick={() => advance(1)} aria-label="下一張照片">→</button>
          </>
        )}
      </dialog>
    </>
  );
}
