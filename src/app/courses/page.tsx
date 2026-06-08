import type { Metadata } from "next";
import { CoursesPanel } from "@/components/site/panels/courses";

export const metadata: Metadata = { title: "Courses — Colin Ruark" };

export default function Page() {
  return <CoursesPanel />;
}
