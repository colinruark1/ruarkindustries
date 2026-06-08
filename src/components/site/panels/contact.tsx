import { Panel } from "../panel";
import { CalendlyEmbed } from "../calendly-embed";

export function ContactPanel({ active }: { active: boolean }) {
  return (
    <Panel id="contact" active={active}>
      <div className="section-head">
        <p className="eyebrow">Contact</p>
        <h2>Let&apos;s talk — lorem ipsum dolor sit amet.</h2>
        <p className="section-sub">
          Tell me about your project and I&apos;ll get back to you.
        </p>
      </div>
      <CalendlyEmbed active={active} />
    </Panel>
  );
}
