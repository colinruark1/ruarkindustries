import { Panel } from "../panel";
import { PortfolioCardstack } from "../portfolio-cardstack";

export function PortfolioPanel({ active }: { active: boolean }) {
  return (
    <Panel id="portfolio" active={active}>
      <div className="section-head">
        <p className="eyebrow">Portfolio</p>
        <h2>Work for hire, lorem ipsum dolor sit amet.</h2>
        <p className="section-sub">
          Selected projects — sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>
      <PortfolioCardstack />
    </Panel>
  );
}
