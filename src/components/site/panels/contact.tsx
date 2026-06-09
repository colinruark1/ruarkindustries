import { Panel } from "../panel";
import { CalendlyEmbed } from "../calendly-embed";

export function ContactPanel() {
  return (
    <Panel id="contact">
      <div className="section-head">
        <p className="eyebrow">Contact</p>
        <h2>Let's chat</h2>
        <p className="section-sub">
          Free Consultations to start! Please list either "Consult" or "Commission" in your appointment message when booking. If you find your appointment helpful, you may be prompted to donate. Donations are greatly apprectiated but never expected.
        </p>
      </div>
      <div className="appointment-choices">
        <article className="appointment-card">
          <h3>Consult</h3>
          <p>
            Running into issues with your build? Want to talk through ideas, strategy, or direction? A focused session can
            scope your project or figure out the best path forward.
          </p>
        </article>
        <article className="appointment-card">
          <h3>Commission</h3>
          <p>
            Want to skip the coding? Schedule a meeting to discuss what you're looking for. My team will work hard to promise you quality and transparency throughout the building process.
          </p>
        </article>
      </div>
      <CalendlyEmbed />
    </Panel>
  );
}
