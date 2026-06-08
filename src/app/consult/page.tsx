import type { Metadata } from "next";
import { ConsultPanel } from "@/components/site/panels/consult";

export const metadata: Metadata = { title: "Consult — Colin Ruark" };

export default function Page() {
  return <ConsultPanel />;
}
