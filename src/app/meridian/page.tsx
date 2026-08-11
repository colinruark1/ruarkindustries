import type { Metadata } from "next";
import { ProjectPage } from "@/components/site/panels/project-page";

export const metadata: Metadata = {
  title: "Meridian — Colin Ruark",
};

// Placeholder copy sourced from Meridian's LinkedIn page
// (linkedin.com/company/meridian-deployment) — replace with the real write-up.
export default function Page() {
  return (
    <ProjectPage
      title="Meridian"
      eyebrow="AI Strategy & Implementation · 2026"
      lead="Helping businesses leverage AI to grow revenue, protect margins, and automate workflows"
      img="/images/Meridian.jpeg"
      imgAlt="Meridian"
    >
      <p>
        Meridian is an AI strategy and implementation partner for operations-heavy firms in commercial real estate, services, and private equity. The team works with clients to identify and deploy AI agents and custom tools that reduce expenses, increase deal volume, and free employees from repetitive manual processes.
      </p>
    </ProjectPage>
  );
}
