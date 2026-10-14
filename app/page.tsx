"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { copyright } from "./lib/content";

export default function Home() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (navigationTimer.current !== null) clearTimeout(navigationTimer.current);
  }, []);

  function transitionTo(href: string, event: { preventDefault: () => void }) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (navigationTimer.current !== null) return;
    router.prefetch(href);
    setLeaving(true);
    navigationTimer.current = setTimeout(() => router.push(href), 180);
  }

  return (
    <main id="main-content" className={`entry-page${leaving ? " is-leaving" : ""}`} aria-busy={leaving}>
      <header className="entry-brand">
        <h1>MK PHOTOBO0K</h1>
        <p className="eyebrow">LIM MING KANG / VISUAL ARCHIVE</p>
      </header>

      <nav className="entry-options" aria-label="選擇網站入口">
        <Link href="/highlight" className="entry-link" onNavigate={event => transitionTo("/highlight", event)}>
          <span className="entry-number eyebrow">01 / HIGHLIGHTS</span>
          <h2>HIGHLIGHTS</h2>
          <span className="entry-caption">精選作品集 <span aria-hidden="true">↗</span></span>
        </Link>

        <span className="entry-divider" aria-hidden="true" />

        <Link href="/about" className="entry-link" onNavigate={event => transitionTo("/about", event)}>
          <span className="entry-number eyebrow">02 / BEHIND THE LENS</span>
          <h2>ABOUT ME</h2>
          <span className="entry-caption">個人簡介與器材 <span aria-hidden="true">↗</span></span>
        </Link>
      </nav>

      <footer className="entry-footer">
        <p>Following the light, capturing the moment.</p>
        <span className="eyebrow">MALAYSIA → TAIWAN</span>
        <small className="entry-copyright">{copyright}</small>
      </footer>
    </main>
  );
}
