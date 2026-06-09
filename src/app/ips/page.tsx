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
      lead="TODO: Big header description for Invent Penn State — what it is and the headline of your involvement."
      imgAlt="Invent Penn State"
      testimonial={{
        name: "TODO: Client name",
        role: "TODO: Role, organization",
        photo: "", // TODO: "/images/their-photo.jpg"
        quote: "TODO: Paste the client's quote here.",
      }}
    >
      <p>
        TODO: One-paragraph description of the project — what you built/led, how
        you did it, and the outcome.
      </p>
    </ProjectPage>
  );
}
