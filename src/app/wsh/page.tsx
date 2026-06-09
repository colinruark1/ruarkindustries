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
      lead="TODO: Big header description for West Shore Home — what it is and the headline of your involvement."
      img="/images/WSH.jpg"
      imgAlt="West Shore Home"
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
