import { Panel } from "../panel";

export function AboutPanel() {
  return (
    <Panel id="about">
      <div className="section-head">
        <p className="eyebrow">About</p>
        <h2>Get to know your backstage crew.</h2>
      </div>
      <div className="about-layout">
        <div className="about-portrait" aria-hidden="true">
          <img src="/images/Colin.png" alt="Colin Ruark" />
        </div>
        <div className="about-body">
          <p>
            I like 'About' sections on a website like this because, despite the work I may be able to show in my _portfolio_ to show experience, the smartest of my clients will take the time to read the 'About' to understand what I really push for; how I communicate to clients with transparency, how I stay loyal to the programs I involve myself with, and how I won't give up on new challenges until the job is done.
          </p>
          <p>
            I'd like to talk about some hobbies I take on outside of my work. The truth is, I love putting myself back at square one when tackling a new project, and there's a 100% chance that your project will not be the same as the prior, or the next.
          </p>
          <ul className="checklist">
            <li>Reaching a peak Chess rating of 1700 ELO</li>
            <li>Solving a Rubik's Cube in under a minute</li>
            <li>Reaching a Personal Record of Bench Pressing 225 pounds</li>
            <li>In Progress: I want to complete a Marathon by the end of the Summer.</li>
          </ul>
        </div>
      </div>
    </Panel>
  );
}
