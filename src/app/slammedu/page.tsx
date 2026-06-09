import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Slammedu — Colin Ruark",
};

export default function Page() {
  return (
    <ProjectPage
      title="Slammedu"
      eyebrow="Full Stack Development · 2026"
      lead="Software Development Lead at Slammedu and Circuit"
      img="/images/Slammedu.png"
      imgAlt="Slammedu"
      testimonial={{
        name: "Niklas Restrepo",
        role: "Co-founder of Slammedu and Circuit",
        photo: "/images/NiklasRestrepo.jpeg", // TODO: "/images/their-photo.jpg"
        quote: "None of this would have been possible without our incredible team at SlammedU. Huge thank you to Colin Ruark, Ana Birleanu, and Elizabeth Faulkner for all of your hard work, dedication, and belief in what we are building. Excited for what's ahead.",
      }}
    >
      <p>
        I was extremely curious when Niklas came to me with a Student Engagement Website he had been working on. I decided to say yes to helping out with the technical components of this project, and has shown me a world when it comes to Rapid Development with tools such as Supabase, Vercel, Stripe, and others, and is part of what led me to begin freelance work.
      </p>
    </ProjectPage>
  );
}
