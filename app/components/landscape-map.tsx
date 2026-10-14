"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { AlbumPreview } from "../lib/albums";
import { mapPlaces, mapViews, projectPlace, type MapView } from "../lib/map-places";

interface Pin {
  id: string;
  label: string;
  longitude: number;
  latitude: number;
  offsetX: number;
  offsetY: number;
  selected: boolean;
  slug?: string;
  nextView?: MapView;
}

export default function LandscapeMap({ albums }: { albums: AlbumPreview[] }) {
  const places = mapPlaces.flatMap(place => {
    const album = albums.find(item => item.slug === place.slug);
    return album ? [{ ...place, album }] : [];
  });
  const [view, setView] = useState<MapView>("east");
  const [selectedSlug, setSelectedSlug] = useState<string>(places[0]?.slug ?? "");
  const focusAfterView = useRef(false);
  const selected = places.find(place => place.slug === selectedSlug) ?? places[0];

  useEffect(() => {
    if (!focusAfterView.current) return;
    document.querySelector<HTMLButtonElement>(".landscape-pin[aria-pressed='true']")?.focus();
    focusAfterView.current = false;
  }, [view]);

  if (!selected) return <p className="muted">風景相簿尚未加入拍攝地點。</p>;

  function changeView(next: MapView, moveFocus = false) {
    if (next === "taiwan" && selected.region !== "Taiwan") {
      const first = places.find(place => place.region === "Taiwan");
      if (first) setSelectedSlug(first.slug);
    }
    focusAfterView.current = moveFocus;
    setView(next);
  }

  function selectPlace(slug: string) {
    const place = places.find(item => item.slug === slug);
    if (!place) return;
    setSelectedSlug(slug);
    setView(place.region === "Taiwan" ? "taiwan" : "east");
  }

  const camera = mapViews[view];
  const point = projectPlace(selected.longitude, selected.latitude, view);
  const taiwanPlaces = places.filter(place => place.region === "Taiwan");
  let pins: Pin[];
  if (view === "world") {
    pins = [{ id: "east", label: `東亞 · ${places.length} 地點`, longitude: 121, latitude: 28, offsetX: -75, offsetY: -40, selected: true, nextView: "east" }];
  } else if (view === "east") {
    pins = places.filter(place => place.region === "China").map(place => ({
      id: place.slug, label: place.name, longitude: place.longitude, latitude: place.latitude,
      offsetX: place.slug === "shanghai" ? 70 : -70, offsetY: place.slug === "shanghai" ? -45 : 40,
      selected: place.slug === selected.slug, slug: place.slug,
    }));
    if (taiwanPlaces.length) pins.push({ id: "taiwan", label: `台灣 · ${taiwanPlaces.length} 地點`, longitude: 121.6, latitude: 25, offsetX: 45, offsetY: 45, selected: selected.region === "Taiwan", nextView: "taiwan" });
  } else {
    pins = taiwanPlaces.map(place => ({
      id: place.slug, label: place.name, longitude: place.longitude, latitude: place.latitude,
      offsetX: place.slug === "tamsui" ? -90 : 95,
      offsetY: place.slug === "tamsui" ? -65 : place.slug === "keelung" ? -15 : 20,
      selected: place.slug === selected.slug, slug: place.slug,
    }));
  }

  const longitudeStep = view === "world" ? 60 : view === "east" ? 10 : 0.5;
  const latitudeStep = view === "world" ? 30 : view === "east" ? 10 : 0.5;
  const verticals: number[] = [];
  const horizontals: number[] = [];
  for (let lon = Math.ceil(camera.west / longitudeStep) * longitudeStep; lon < camera.west + 720 / camera.scale; lon += longitudeStep) {
    verticals.push(projectPlace(lon, 0, view).x);
  }
  for (let lat = Math.floor(camera.north / latitudeStep) * latitudeStep; lat > camera.north - 460 / camera.scale; lat -= latitudeStep) {
    horizontals.push(projectPlace(0, lat, view).y);
  }
  const otherAlbums = albums.filter(album => !places.some(place => place.slug === album.slug));

  return (
    <section className="landscape-explorer" aria-label="依拍攝地點探索風景相簿">
      <div className="landscape-toolbar">
        <div><p className="eyebrow">PLACES THROUGH MY LENS</p><h2>Somewhere, <em>a moment.</em></h2></div>
        <div className="map-view-controls" role="group" aria-label="選擇地圖視角">
          {(Object.keys(mapViews) as MapView[]).map(key => <button key={key} type="button" aria-pressed={view === key} onClick={() => changeView(key)}>{mapViews[key].label}</button>)}
        </div>
      </div>

      <div className="landscape-board">
        <div className="landscape-stage">
          <svg className="landscape-canvas" viewBox="0 0 720 460" aria-hidden="true">
            <image key={view} className="map-land" href={`/helloismk/maps/${camera.asset}.svg`} width="720" height="460" />
            <g className="map-graticule">
              {verticals.map(x => <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="460" />)}
              {horizontals.map(y => <line key={`h-${y}`} x1="0" y1={y} x2="720" y2={y} />)}
            </g>
            <text x="570" y="410" className="map-ocean-label">PACIFIC OCEAN</text>
            {pins.map(pin => {
              const anchor = projectPlace(pin.longitude, pin.latitude, view);
              return <g key={pin.id} className={pin.selected ? "map-anchor is-selected" : "map-anchor"}>
                <line x1={anchor.x} y1={anchor.y} x2={anchor.x + pin.offsetX} y2={anchor.y + pin.offsetY} />
                {pin.selected && <circle className="map-pulse" cx={anchor.x} cy={anchor.y} r="13" />}
                <circle cx={anchor.x} cy={anchor.y} r={pin.selected ? 5 : 3.5} />
              </g>;
            })}
            <g key={`${view}-${selected.slug}`} className="map-connection">
              <path className="map-connector map-connector-desktop" d={`M${point.x},${point.y} C${point.x + 100},${point.y} 625,230 720,230`} />
              <path className="map-connector map-connector-mobile" d={`M${point.x},${point.y} C${point.x},${point.y + 80} 360,405 360,460`} />
            </g>
          </svg>
          {pins.map(pin => {
            const anchor = projectPlace(pin.longitude, pin.latitude, view);
            return <button
              key={pin.id} type="button" className="landscape-pin"
              style={{ left: `${(anchor.x + pin.offsetX) / 720 * 100}%`, top: `${(anchor.y + pin.offsetY) / 460 * 100}%` }}
              aria-pressed={pin.selected} aria-controls="map-album-preview"
              onClick={() => pin.nextView ? changeView(pin.nextView, true) : selectPlace(pin.slug!)}
            >{pin.label}{pin.nextView && <span aria-hidden="true">↗</span>}</button>;
          })}
          <span className="map-view-label eyebrow">{camera.label}{view === "taiwan" ? " · 北部" : ""}</span>
        </div>

        <div id="map-album-preview" className="landscape-preview" aria-live="polite" aria-atomic="true">
          <Link key={selected.slug} href={`/highlight/${selected.album.slug}`} className="landscape-album" aria-label={`瀏覽${selected.name}相簿`}>
            <div className="landscape-album-photo"><Image src={selected.album.cover.thumbnail} alt={`${selected.name}風景相簿封面`} fill sizes="(max-width: 760px) 90vw, 280px" /></div>
            <div className="landscape-album-caption">
              <p className="eyebrow">{selected.region.toUpperCase()} / {selected.english.toUpperCase()}</p>
              <h3>{selected.name}<span>{selected.album.count} 張照片</span></h3>
              <span className="landscape-open">開啟相簿 <span aria-hidden="true">↗</span></span>
            </div>
          </Link>
        </div>
      </div>

      <div className="map-place-list" role="group" aria-label="選擇拍攝地點">
        {places.map(place => <button key={place.slug} type="button" aria-pressed={selected.slug === place.slug} onClick={() => selectPlace(place.slug)}>{place.name}<span>{place.english}</span></button>)}
      </div>
      <div className="landscape-map-note"><p>點選地點，沿著光影走進相簿。標記以城市／區域為準。</p><a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Map: Natural Earth ↗</a></div>
      {otherAlbums.length > 0 && <div className="map-other-albums">{otherAlbums.map(album => <Link key={album.slug} href={`/highlight/${album.slug}`}>{album.title} ↗</Link>)}</div>}
    </section>
  );
}
