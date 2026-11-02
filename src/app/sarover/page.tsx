import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "SaRover — Colin Ruark",
};

// Placeholder copy sourced from the live site (shopsarover.com) — replace with
// the real write-up.
export default function Page() {
  return (
    <ProjectPage
      title="SaRover"
      eyebrow="E-Commerce Website · Live Site"
      lead="An online store for a premium women's activewear and luxury loungewear brand"
      img="/images/SaRover.jpeg"
      imgAlt="Four models wearing SaRover's pink activewear set, from the SaRover homepage"
      liveUrl="https://shopsarover.com"
    >
      <p>
        I built the online storefront for SaRover, a women's clothing brand selling luxury loungewear and elevated activewear. The site carries the brand's script identity through the shopping experience, with product search, a cart, and a free express shipping offer on larger orders.
      </p>
    </ProjectPage>
  );
}
