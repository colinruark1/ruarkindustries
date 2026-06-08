import type { Metadata } from "next";
import { ContactPanel } from "@/components/site/panels/contact";

export const metadata: Metadata = { title: "Contact — Colin Ruark" };

export default function Page() {
  return <ContactPanel />;
}
