import type { Metadata } from "next";
import { PortfolioPanel } from "@/components/site/panels/portfolio";

export const metadata: Metadata = { title: "Portfolio — Colin Ruark" };

export default function Page() {
  return <PortfolioPanel />;
}
