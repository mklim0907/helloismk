import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { links } from "../lib/content";
import { getExperienceYears } from "../lib/experience";

export const metadata: Metadata={ title: "About — 關於我" };
const connections=[
  { number: "01", title: "Instagram", note: "日常光影與最新紀錄", label: "@mk_photobo0k", href: links.instagram },
  { number: "02", title: "The highlight archive", note: "在 Google Drive 瀏覽精選作品", label: "精選作品集", href: links.archive },
  { number: "03", title: "Client access", note: "下載與收藏完成的照片", label: "照片交付 / Google Drive", href: links.delivery },
];

export default function AboutPage() {
  const experienceYears = getExperienceYears();
  return (
    <main id="main-content" className="shell about-page">
      <div className="page-topline eyebrow">
        <span>ABOUT / 關於我</span>
        <span>A FACE BEHIND THE FRAME</span>
      </div>
      <section className="about-hero">
        <div className="about-title">
          <p className="eyebrow">HELLO, I’M</p>
          <h1>
            LIM Ming Kang
            <span>林明康<span className="name-dot" aria-hidden="true">.</span></span>
          </h1>
          <p className="about-role">Student & photographer</p>
          <div className="location">
            <span className="status-dot" aria-hidden="true" />Based in Hsinchu, Taiwan<span>來自馬來西亞 · 現居新竹</span>
          </div>
        </div>
        <figure className="portrait-frame">
          <div className="portrait-image">
            <Image src="/helloismk/images/me.jpeg" alt="林明康手持相機，專注調整拍攝設定" fill preload sizes="(max-width: 720px) 260px, (max-width: 1000px) 40vw, 360px" />
          </div>
          <figcaption>
            <span className="eyebrow">THE PERSON BEHIND THE CAMERA</span>
            <span aria-hidden="true">↗</span>
          </figcaption>
        </figure>
      </section>
      <section className="about-statement">
        <p className="eyebrow">01 / A SIMPLE PHILOSOPHY</p>
        <div>
          <h2>紀錄<span>美好</span>生活。</h2>
          <p>Following the light.<br />
            <em>Capturing the moment.</em>
          </p>
        </div>
        <span className="statement-star" aria-hidden="true">✳</span>
      </section>
      <section className="details-grid section-space">
        <div>
          <p className="eyebrow">02 / TOOLS</p>
          <h2>Tools<span className="accent">.</span>
          </h2>
          <p className="muted">讓觀察成為畫面的工具。</p>
          <dl className="gear-list">
            <div>
              <dt>BODY</dt>
              <dd>Nikon D750<br />Sony A7 III</dd>
            </div>
            <div>
              <dt>SOFTWARE</dt>
              <dd>Lightroom Classic <span>(LrC)</span><br />Final Cut Pro</dd>
            </div>
            <div>
              <dt>LENS</dt>
              <dd>Tamron 70–200mm<br />
                <span>f/2.8 G2</span>
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <p className="eyebrow">03 / WHAT CATCHES MY EYE</p>
          <h2>Interested In<span className="accent">.</span>
          </h2>
          <p className="muted">每一種題材，都有不同的故事。</p>
          <div className="interest-tags">{["Landscape / 風景", "Travel / 旅行", "Portrait / 人像", "Events / 活動", "Sports / 運動"].map((interest) => <span key={interest}>{interest}</span>)}</div>
          <Link href="/highlight" className="text-link">Discover my work <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="services-section">
        <p className="eyebrow">04 / COLLABORATION</p>
        <div className="services-heading">
          <h2>Collaboration<span className="accent">.</span></h2>
          <a href={links.instagram} className="text-link" target="_blank" rel="noopener noreferrer">透過 Instagram 洽詢 <span aria-hidden="true">↗</span></a>
        </div>
        <div className="services-grid">
          <div>
            <h3>靜態活動紀錄</h3>
            <p>活動現場攝影、照片整理與交付。</p>
          </div>
          <div>
            <h3>影音剪輯</h3>
            <p>影音素材整理、剪接與成片輸出。</p>
          </div>
          <div>
            <h3>音樂會側拍</h3>
            <p>演出現場與幕後瞬間的攝影紀錄。</p>
          </div>
        </div>
      </section>
      <section className="experience-section">
        <p className="eyebrow">05 / EXPERIENCE</p>
        <h2>Experience<span className="accent">.</span></h2>
        <p className="muted">按年份瀏覽攝影活動與影音合作紀錄。</p>
        <div className="experience-list">
          {experienceYears.map(({ year, projects }, index) => (
            <details key={year} className="experience-year" open={index === 0}>
              <summary>
                <h3 className="experience-year-heading">{year}</h3>
                <span className="experience-year-count">{projects.length} 筆紀錄</span>
                <span className="experience-toggle" aria-hidden="true">⌄</span>
              </summary>
              <div className="experience-projects">
                {projects.map(project => (
                  <article key={`${project.date}-${project.title}`} className="experience-row">
                    <span className="eyebrow">{project.date.replace("-", "–")}</span>
                    <h4>{project.title}</h4>
                    {project.href && (
                      <Link href={project.href} className="experience-view">作品 <span aria-hidden="true">↗</span></Link>
                    )}
                  </article>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>
      <section className="connect-section">
        <div className="connect-heading">
          <p className="eyebrow">06 / ELSEWHERE ON THE INTERNET</p>
          <h2>Let’s <em>connect.</em>
          </h2>
          <p className="muted">更多作品、日常，以及照片交付。</p>
        </div>
        <div>{connections.map((connection) => <a className="connection-row" key={connection.number} href={connection.href} target="_blank" rel="noopener noreferrer">
          <span className="eyebrow">{connection.number}</span>
          <div>
            <h3>{connection.title}</h3>
            <p>{connection.note}</p>
          </div>
          <span className="connection-label">{connection.label}</span>
          <span className="row-arrow" aria-hidden="true">↗</span>
        </a>)}</div>
      </section>
    </main>
  );
}
