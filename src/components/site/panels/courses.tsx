import { Panel } from "../panel";
import { TabLink } from "../nav";

export function CoursesPanel() {
  return (
    <Panel id="courses">
      <div className="section-head">
        <p className="eyebrow">Courses</p>
        <h2>Nothing to see here yet.</h2>
        <h3 className="section-sub">
          Have a question about coding or AI?
        </h3>
      </div>
      <div className="card-grid">
        <article className="card">
          <h3>Ask a question</h3>
          <p>
            Click below to ask a question you'd like me to answer.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfyWUzXVEr9xsKvT_ufvHKCFbwTFfF391sbopeMeXrwTPQFFg/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-small"
          >
            Ask a question
          </a>
        </article>
        <article className="card card-featured">
          <h3>Schedule a Consult</h3>
          <p>
            Set up an appointment with me to answer a personal question you have about AI.
          </p>
          <TabLink tab="contact" className="btn btn-small btn-primary">
            Connect
          </TabLink>
        </article>
      </div>
    </Panel>
  );
}
