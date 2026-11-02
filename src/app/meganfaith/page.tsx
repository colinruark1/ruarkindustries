import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Megan Faith Music — Colin Ruark",
};

// Placeholder copy sourced from the live site (meganfaithmusic.com) — replace
// with the real write-up.
export default function Page() {
  return (
    <ProjectPage
      title="Megan Faith Music"
      eyebrow="Artist Website · Live Site"
      lead="A home on the web for a touring musician's songs, shows, and fans"
      img="/images/MeganFaith.jpeg"
      imgAlt="Megan Faith homepage with a polaroid of the artist playing guitar over a beach backdrop"
      liveUrl="https://meganfaithmusic.com"
    >
      <p>
        I built the official website for musician Megan Faith, bringing music, tour dates, and social links together in one place. A newsletter signup lets fans hear about new singles and upcoming shows directly.
      </p>
    </ProjectPage>
  );
}
