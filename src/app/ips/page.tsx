import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Invent Penn State — Colin Ruark",
};

export default function Page() {
  return (
    <ProjectPage
      title="Invent Penn State"
      eyebrow="Retrieval-Augmented Generation · 2023"
      lead="Full Stack Developer for Invent Penn State via Nittany AI Advance"
      imgAlt="Invent Penn State"
    >
      <p>
        Invent Penn State was one of the first business-sponsored projects I've ever tackled as part of my journey to become a software engineer. Key insights include Web Development, Database Management, Retrieval Augmented Generation, and most importantly, Teams Communications.
      </p>
    </ProjectPage>
  );
}
