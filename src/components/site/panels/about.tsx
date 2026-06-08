import { Panel } from "../panel";

export function AboutPanel({ active }: { active: boolean }) {
  return (
    <Panel id="about" active={active}>
      <div className="section-head">
        <p className="eyebrow">About</p>
        <h2>Lorem ipsum dolor sit amet consectetur adipiscing.</h2>
      </div>
      <div className="about-layout">
        <div className="about-portrait" aria-hidden="true">
          <span>CR</span>
        </div>
        <div className="about-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </p>
          <ul className="checklist">
            <li>Lorem ipsum dolor sit amet consectetur</li>
            <li>Sed do eiusmod tempor incididunt ut labore</li>
            <li>Ut enim ad minim veniam quis nostrud</li>
            <li>Duis aute irure dolor in reprehenderit</li>
          </ul>
        </div>
      </div>
    </Panel>
  );
}
