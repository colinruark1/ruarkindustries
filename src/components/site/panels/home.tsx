import Image from "next/image";
import Link from "next/link";
import { Panel } from "../panel";
import { TabLink } from "../nav";
import { PROJECTS } from "../projects";

/** Projects featured on Home, in display order (the first gets the wider tile). */
const FEATURED = ["slammedu", "naiss"].flatMap((slug) =>
  PROJECTS.filter((p) => p.slug === slug),
);

export function HomePanel() {
  return (
    <Panel id="home">
      <div className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI Consulting · Commissions</p>
          <h1>
            Let me handle your <span className="accent">online presence.</span>
          </h1>
          <p className="lede">
            Upscaling your business in 2026 means having a digital signature. I&apos;ll
            build you a meaningful website that highlights exactly what you want
            consumers to know.
          </p>
          <div className="hero-actions">
            <TabLink tab="portfolio" className="btn btn-primary">
              Explore Portfolio
            </TabLink>
            <TabLink tab="contact" className="btn btn-ghost">
              Get in Touch
            </TabLink>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>200 hours/wk</strong>
              <span>Saved on digital tasks via my solutions</span>
            </li>
            <li>
              <strong>8</strong>
              <span>Company projects</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="work">
        <div className="work-head">
          <div className="section-head">
            <p className="eyebrow">Selected Work</p>
            <h2>What I&apos;ve built and led.</h2>
          </div>
          <TabLink tab="portfolio" className="work-all">
            See all {PROJECTS.length} projects →
          </TabLink>
        </div>
        <div className="work-grid">
          {FEATURED.map((project) => (
            <Link key={project.slug} href={`/${project.slug}`} className="work-item">
              <span className="work-media">
                {project.img ? (
                  <Image
                    src={project.img}
                    alt=""
                    fill
                    sizes="(max-width: 860px) 100vw, 640px"
                  />
                ) : null}
              </span>
              <span className="work-meta">{project.meta}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </Panel>
  );
}
