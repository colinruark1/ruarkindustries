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
      lead="Leader of Depth-First Search and Rescue, a semi-finalist project designed to save seconds in critical first-responder scenarios."
      img="/images/Challenge.jpeg"
      imgAlt="Nittany AI Challenge"
      testimonial={{
        name: "Jackson Gasperack",
        role: "Computational Data Science Student at Penn State University",
        photo: "/images/JacksonGasperack.jpeg",
        quote: "In November 2025, Colin Ruark approached me with the idea to form a team for the Nittany AI Challenge with a project dealing with Search and Rescue concepts. I am so thankful for this experience because it broadened my skillset and taught me so much.",
      }}
    >
      <p>
        A little boy came up to me 2 years ago while I was working my summer job. It was a regular, hot day, and he was an energetic kid, so I was already intrigued by his opening of "Guess What?!". He then went on to tell me that he had witnessed a shooting in Philadelphia. Mortified by this response, I had to see this project through; one that detects lethal weapons and notifies potential victims and first responders with a potential route to safety or to the attacker.
      </p>
    </ProjectPage>
  );
}
