import { Panel } from "../panel";
import { TabLink } from "../nav";

export function HomePanel() {
  return (
    <Panel id="home">
      <div className="hero">
        <div className="hero-text">
          <p className="eyebrow">AI Courses · Consulting · Work for Hire</p>
          <h1>
            Let us handle your <span className="accent">online presence.</span>
          </h1>
          <p className="lede">
            Upscaling your business in 2026 means having a digital presence. Our
            team is prepared to offer the tools necessary to provide a meaningful
            website to your team, highlighting exactly what you want consumers to
            know.
          </p>
          <div className="hero-actions">
            <TabLink tab="courses" className="btn btn-primary">
              Explore Courses
            </TabLink>
            <TabLink tab="consult" className="btn btn-ghost">
              Book a Consult
            </TabLink>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>12+</strong>
              <span>Lorem cohorts</span>
            </li>
            <li>
              <strong>240</strong>
              <span>Ipsum learners</span>
            </li>
            <li>
              <strong>98%</strong>
              <span>Dolor sit rating</span>
            </li>
          </ul>
        </div>
        <div className="hero-card" aria-hidden="true">
          <div className="swatch-stack">
            <span className="swatch" style={{ background: "#F2F0EF" }}>
              #F2F0EF
            </span>
            <span className="swatch" style={{ background: "#BBBDBC" }}>
              #BBBDBC
            </span>
            <span
              className="swatch swatch-dark"
              style={{ background: "#245F73" }}
            >
              #245F73
            </span>
            <span
              className="swatch swatch-dark"
              style={{ background: "#733E24" }}
            >
              #733E24
            </span>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        <article className="feature">
          <span className="feature-num">01</span>
          <h3>Courses</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor.
          </p>
        </article>
        <article className="feature">
          <span className="feature-num">02</span>
          <h3>Consulting</h3>
          <p>
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris
            nisi.
          </p>
        </article>
        <article className="feature">
          <span className="feature-num">03</span>
          <h3>Work for Hire</h3>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum.
          </p>
        </article>
      </div>
    </Panel>
  );
}
