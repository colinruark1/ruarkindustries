import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "West Shore Home — Colin Ruark",
};

export default function Page() {
  return (
    <ProjectPage
      title="West Shore Home"
      eyebrow="Automated Workflows · 2026"
      lead="Applied A.I. Engineer for West Shore Home"
      img="/images/WSH.jpg"
      imgAlt="West Shore Home"
    >
      <p>
        This was my first leap into the world of A.I.-focused Automation, using Agents and Code to create consistent, meaningful results out of business data. Working at West Shore Home is like the dream for turning unstructured data into actionable business insights.
      </p>
    </ProjectPage>
  );
}
