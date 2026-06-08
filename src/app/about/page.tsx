import type { Metadata } from "next";
import { AboutPanel } from "@/components/site/panels/about";

export const metadata: Metadata = { title: "About — Colin Ruark" };

export default function Page() {
  return <AboutPanel />;
}
