import type { ReactNode } from "react";
import { TabLink } from "../nav";

/** Client quote shown on the card beside the project write-up. */
export type ProjectTestimonial = {
  name: string;
  /** Role / org, e.g. "Director, Acme Co." (optional). */
  role?: string;
  /** Path to a profile photo under /public. Empty -> initials fallback. */
  photo?: string;
  quote: string;
};

/** Initials fallback for a testimonial with no profile photo. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Presentational shell for a single project page. Layout only — every page
 * (src/app/<slug>/page.tsx) supplies its own header, image, and copy.
 *
 * Order: big header + lead description, then the cover image, then a
 * one-paragraph description (`children`). The testimonial sits on the side.
 */
export function ProjectPage({
  eyebrow,
  title,
  lead,
  img,
  imgAlt,
  testimonial,
  children,
}: {
  /** Small label above the title, e.g. "Leadership · 2023-2026". */
  eyebrow: string;
  title: string;
  /** Big header description shown directly under the title. */
  lead: ReactNode;
  /** Cover image — the same picture used on the card stack. */
  img?: string;
  imgAlt?: string;
  testimonial?: ProjectTestimonial;
  /** The one-paragraph description shown beneath the image. */
  children: ReactNode;
}) {
  return (
    <section className="tab-panel is-active project-detail" tabIndex={-1}>
      <div className="section-head project-head">
        <p className="eyebrow">
          <TabLink tab="portfolio" className="project-back">
            ← Portfolio
          </TabLink>
        </p>
        <h2>{title}</h2>
        <p className="project-eyebrow">{eyebrow}</p>
        <p className="section-sub">{lead}</p>
      </div>

      <div className="project-layout">
        <div className="project-body">
          {img ? (
            <div className="project-cover">
              <img src={img} alt={imgAlt ?? title} />
            </div>
          ) : null}
          <div className="project-summary">{children}</div>
        </div>

        {testimonial ? (
          <aside className="project-aside">
            <figure className="testimonial-card">
              <div className="testimonial-avatar">
                {testimonial.photo ? (
                  <img src={testimonial.photo} alt={testimonial.name} />
                ) : (
                  <span aria-hidden="true">{initials(testimonial.name)}</span>
                )}
              </div>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                {testimonial.role ? <span>{testimonial.role}</span> : null}
              </figcaption>
            </figure>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
