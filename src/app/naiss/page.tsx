import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Nittany AI Student Society — Colin Ruark",
};

export default function Page() {
  return (
    <ProjectPage
      title="Nittany AI Student Society"
      eyebrow="Leadership · 2023-2026"
      lead="Current President of the Nittany AI Student Society."
      img="/images/NAiSS.jpeg"
      imgAlt="Nittany AI Student Society"
      testimonial={{
        name: "Kevin McGovern",
        role: "Cybersecurity Services at Arcova",
        photo: "/images/KevinMcGovern.jpeg", // TODO: "/images/their-photo.jpg"
        quote: "Colin and the entire NAISS team are a shining example of how our NG Leaders are here with us ready to evolve a secure and relevant digital universe that improves life for all of us to enjoy this century. ",
      }}
    >
      <p>
         I've gotten the opportunity to develop AI-based growth in over 500 participating members since I've started at Penn State in 2023, working on Leadership, Communications, and even technology-based skills, teaching our main Machine Learning Bootcamp program.
      </p>
    </ProjectPage>
  );
}
