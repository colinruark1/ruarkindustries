import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Ocean Cleaners — Colin Ruark",
};

export default function Page() {
  return (
    <ProjectPage
      title="Ocean Cleaners"
      eyebrow="Rapid Prototyping · 2025"
      lead="Team Lead on Ocean Cleaners, a Hack-a-thon project designed to connect efforts to clean up our oceans."
      img="/images/Ocean%20Cleaners.jpeg"
      imgAlt="Ocean Cleaners"
    >
      <p>
        Over the course of 24 hours, my team worked diligently to create a fun social media app that connected others in an effort to do something good for the environment. I had a lot of fun creating the client-facing design, not as much fun managing API keys on a database at 5 AM.
      </p>
    </ProjectPage>
  );
}
