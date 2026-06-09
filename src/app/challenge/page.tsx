import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Nittany AI Challenge — Colin Ruark",
};

export default function Page() {
  return (
    <ProjectPage
      title="Nittany AI Challenge"
      eyebrow="Analytics · 2026"
      lead="TODO: Big header description for the Nittany AI Challenge — what it is and the headline of your involvement."
      img="/images/Challenge.jpeg"
      imgAlt="Nittany AI Challenge"
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
