"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, links } from "../lib/content";
import type { AlbumPreview } from "../lib/albums";
import LandscapeMap from "./landscape-map";

type Filter = "All" | (typeof categories)[number]["name"];

export default function WorkBrowser({ albums }: { albums: AlbumPreview[] }) {
  const [active, setActive] = useState<Filter>("All");
  const pendingFocus = useRef<Filter | null>(null);
  const visible = active === "All" ? albums : albums.filter(album => album.category === active);

  useEffect(() => {
    if (pendingFocus.current === null) return;
    const id = active === "All" ? "pick-01" : `filter-${categories.find(category => category.name === active)!.number}`;
    document.getElementById(id)?.focus();
    pendingFocus.current = null;
  }, [active]);

  function selectFilter(filter: Filter) {
    if (filter === active) return;
    pendingFocus.current = filter;
    setActive(filter);
  }

  return (
    <section className="work-browser" aria-label="作品相簿">
      {active !== "All" && <div className="work-filters" role="group" aria-label="選擇攝影題材">
        <button id="filter-all" className="filter-back" type="button" aria-label="返回分類入口" aria-controls="album-results" onClick={() => selectFilter("All")}>
          <span aria-hidden="true">←</span>Back
        </button>
        {categories.map(category => (
          <button id={`filter-${category.number}`} key={category.name} type="button" aria-pressed={active === category.name} aria-controls="album-results" onClick={() => selectFilter(category.name)}>
            <span>{category.number}</span>{category.name}<span className="filter-chinese">{category.chinese}</span>
          </button>
        ))}
      </div>}

      <p className="album-result-count muted" role="status" aria-live="polite">
        {active === "All" ? "6 個分類 · 選擇分類瀏覽作品" : `${visible.length} 個相簿 · ${visible.reduce((total, album) => total + album.count, 0)} 張照片`}
      </p>
      <div id="album-results">
        {active === "All" ? (
          <div className="category-picker" role="group" aria-label="六個作品分類入口">
            {categories.map((category, index) => {
              const count = albums.filter(album => album.category === category.name).length;
              return (
                <button
                  key={category.name}
                  id={`pick-${category.number}`}
                  type="button"
                  className="category-pick"
                  style={{ animationDelay: `${index * 65}ms` }}
                  aria-controls="album-results"
                  onClick={() => selectFilter(category.name)}
                >
                  <span className="category-pick-number eyebrow">{category.number} / {category.note}</span>
                  <span className="category-pick-name">{category.name}</span>
                  <span className="category-pick-caption">{category.chinese}<span aria-hidden="true">↗</span></span>
                  <span className="category-pick-count">{count ? `${count} 個相簿` : "相簿待新增"}</span>
                </button>
              );
            })}
          </div>
        ) : active === "Landscape" && visible.length > 0 ? (
          <LandscapeMap albums={visible} />
        ) : visible.length > 0 ? (
          <div className="album-grid">
            {visible.map(album => (
              <Link key={album.slug} href={`/highlight/${album.slug}`} className="album-card">
                <figure>
                  <div className="album-cover">
                    <Image src={album.cover.thumbnail} alt={`${album.title}相簿封面`} width={album.cover.width} height={album.cover.height} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  </div>
                  <figcaption>
                    <div>
                      <p className="eyebrow">{album.group}</p>
                      <h2>{album.title}</h2>
                    </div>
                    <span className="album-count">{album.count} 張 <span aria-hidden="true">↗</span></span>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        ) : (
          <div className="album-empty">
            <h2>{active}</h2>
            <p className="muted">這個分類尚未加入照片，可返回入口瀏覽其他攝影分類。</p>
            <button type="button" className="text-link" onClick={() => selectFilter("All")}>返回分類入口 <span aria-hidden="true">↗</span></button>
          </div>
        )}
      </div>
      <div className="archive-footnote">
        <p>紀錄美好生活。</p>
        <a className="text-link" href={links.archive} target="_blank" rel="noopener noreferrer">Google Drive 作品集 <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
