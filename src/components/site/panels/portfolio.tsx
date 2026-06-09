import { Panel } from "../panel";
import { PortfolioCardstack } from "../portfolio-cardstack";

export function PortfolioPanel() {
  return (
    <Panel id="portfolio">
      <div className="section-head">
        <p className="eyebrow">Portfolio</p>
        <h2>Check out my latest projects.</h2>
        <p className="section-sub">
          By clicking on these projects, you'll see some specific comments provided by my clients about the quality and intention I brough to them and their practice. These were not listed recently, in some attempt to boost my credit; these are real testimonies from real people, who took a chance on a young guy who's willing to learn.
        </p>
      </div>
      <PortfolioCardstack />
    </Panel>
  );
}
