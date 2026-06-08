import { Panel } from "../panel";
import { TabLink } from "../nav";

export function CoursesPanel() {
  return (
    <Panel id="courses">
      <div className="section-head">
        <p className="eyebrow">Courses</p>
        <h2>Nothing to see here yet.</h2>
        <p className="section-sub">
          Have a question about coding or AI? Leave it _here_ or _schedule a consultaiton_!
        </p>
      </div>
      <div className="card-grid">
        <article className="card">
          <span className="tag">Beginner</span>
          <h3>Lorem Ipsum Foundations</h3>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            nostrud.
          </p>
          <div className="card-meta">
            <span>6 modules</span>
            <span>$199</span>
          </div>
          <TabLink tab="contact" className="btn btn-small">
            Enroll
          </TabLink>
        </article>
        <article className="card card-featured">
          <span className="tag">Most Popular</span>
          <h3>Applied Dolor Sit Amet</h3>
          <p>
            Ut enim ad minim veniam quis nostrud exercitation ullamco laboris
            nisi.
          </p>
          <div className="card-meta">
            <span>10 modules</span>
            <span>$349</span>
          </div>
          <TabLink tab="contact" className="btn btn-small btn-primary">
            Enroll
          </TabLink>
        </article>
        <article className="card">
          <span className="tag">Advanced</span>
          <h3>Consectetur Mastery</h3>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum.
          </p>
          <div className="card-meta">
            <span>8 modules</span>
            <span>$299</span>
          </div>
          <TabLink tab="contact" className="btn btn-small">
            Enroll
          </TabLink>
        </article>
      </div>
    </Panel>
  );
}
