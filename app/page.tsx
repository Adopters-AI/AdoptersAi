import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = {
  title: { absolute: "Adopters AI | Enterprise AI systems integrator" },
  description:
    "Adopters helps enterprises move from AI ideas to deployed agents, intelligence platforms, monitored models, and measurable business outcomes."
};

export default function Page() {
  return <HomePage />;
}
