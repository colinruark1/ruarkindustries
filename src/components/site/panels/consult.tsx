import { Panel } from "../panel";
import { TabLink } from "../nav";

export function ConsultPanel() {
  return (
    <Panel id="consult">
      <div className="section-head">
        <p className="eyebrow">Consult</p>
        <h2>Consulting, lorem ipsum dolor sit amet consectetur.</h2>
      </div>
      <div className="consult-layout">
        <div className="pricing">
          <article className="price-card">
            <h3>Discovery</h3>
            <p className="price">
              $0<span>/intro call</span>
            </p>
            <ul className="checklist">
              <li>Lorem ipsum dolor sit</li>
              <li>30 minute session</li>
              <li>Consectetur adipiscing</li>
            </ul>
            <TabLink tab="contact" className="btn btn-ghost">
              Book now
            </TabLink>
          </article>
          <article className="price-card price-card-featured">
            <h3>Strategy</h3>
            <p className="price">
              $450<span>/session</span>
            </p>
            <ul className="checklist">
              <li>Sed do eiusmod tempor</li>
              <li>Deep-dive workshop</li>
              <li>Ut enim ad minim veniam</li>
              <li>Follow-up summary</li>
            </ul>
            <TabLink tab="contact" className="btn btn-primary">
              Book now
            </TabLink>
          </article>
          <article className="price-card">
            <h3>Retainer</h3>
            <p className="price">
              $2k<span>/month</span>
            </p>
            <ul className="checklist">
              <li>Duis aute irure dolor</li>
              <li>Ongoing advisory</li>
              <li>Priority response</li>
            </ul>
            <TabLink tab="contact" className="btn btn-ghost">
              Book now
            </TabLink>
          </article>
        </div>
      </div>
    </Panel>
  );
}
