import type { Metadata } from "next";
import { AiAcademyPage } from "@/components/ai-academy-page";

export const metadata: Metadata = {
  title: "AI Academy",
  description: "Practical AI education for teams building real systems. Join the AI Academy waitlist."
};

export default function Page() {
  return <AiAcademyPage />;
}
