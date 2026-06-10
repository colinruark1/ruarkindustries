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
            <TabLink tab="portfolio" className="btn btn-primary">
              Explore Portfolio
            </TabLink>
            <TabLink tab="contact" className="btn btn-ghost">
              Get in Touch
            </TabLink>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>5+</strong>
              <span>Major Projects</span>
            </li>
            <li>
              <strong>Real</strong>
              <span>Market ROI</span>
            </li>
            <li>
              <strong>3.73</strong>
              <span>Penn State GPA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="feature-grid">
        <TabLink tab="courses" className="feature">
          <span className="feature-num">01</span>
          <h3>Courses</h3>
          <p>
            Learn about what it's like to build a website or a coding project from the ground up, and how to leverage AI.
          </p>
        </TabLink>
        <TabLink tab="contact" className="feature">
          <span className="feature-num">02</span>
          <h3>Consulting</h3>
          <p>
            Answer a specific question, get feedback, or get pointed in the right direction about approaches.
          </p>
        </TabLink>
        <TabLink tab="contact" className="feature">
          <span className="feature-num">03</span>
          <h3>Work for Hire</h3>
          <p>
            Free Quotas on pricing for me to build your website or project.
          </p>
        </TabLink>
      </div>
    </Panel>
  );
}
