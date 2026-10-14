"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const pages=[{ href: "/", label: "Home", number: "01" }, { href: "/highlight", label: "Highlights", number: "02" }, { href: "/about", label: "About", number: "03" }];

export default function SiteHeader() {
  const pathname=usePathname();
  if (pathname === "/") return null;
  return <header className="site-header shell">
    <Link href="/" className="wordmark" aria-label="MK Photobo0k 首頁">
      <Image src="/helloismk/favicon.ico" alt="" width={64} height={64} loading="eager" className="header-logo" />
    </Link>
    <nav className="main-nav" aria-label="主要導覽">{pages.map(({ href, label, number }) => <Link key={href} href={href} aria-current={(href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)) ? "page" : undefined}>
      <span className="nav-number">{number}</span>{label}</Link>)}</nav>
    <a className="header-social" href="https://www.instagram.com/mk_photobo0k/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span>
    </a>
  </header>;
}
