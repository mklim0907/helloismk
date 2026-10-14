import type { Metadata } from "next";
import WorkBrowser from "../components/work-browser";
import { albumPreviews } from "../lib/albums";

export const metadata: Metadata = { title: "Highlights — 精選作品" };

export default function HighlightPage() {
  return (
    <main id="main-content" className="shell works-page">
      <div className="page-topline eyebrow">
        <span>HIGHLIGHTS / 精選作品</span>
        <span>A COLLECTION OF MOMENTS</span>
      </div>
      <div className="works-heading">
        <h1>Highlights<span className="accent">.</span></h1>
        <p>人、地方，以及那些稍縱即逝的瞬間。</p>
      </div>
      <WorkBrowser albums={albumPreviews} />
    </main>
  );
}
