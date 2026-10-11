import type { Metadata } from "next";
import { UseCasesPage } from "@/components/use-cases-page";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Reference AI patterns across retail, healthcare, public sector, finance, legal, compliance, and manufacturing."
};

export default function Page() {
  return <UseCasesPage />;
}
