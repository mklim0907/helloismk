"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { copyright } from "../lib/content";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <footer className="site-footer shell">
    <div>
      <Link href="/" className="footer-brand">mk. photobo0k</Link>
      <p>Following the light, capturing the moment.</p>
    </div>
    <span className="eyebrow">MALAYSIA → TAIWAN</span>
    <div className="footer-meta">
      <a href="https://www.instagram.com/mk_photobo0k/" target="_blank" rel="noopener noreferrer">Stay connected <span aria-hidden="true">↗</span></a>
      <small className="footer-copyright">{copyright}</small>
    </div>
  </footer>;
}
