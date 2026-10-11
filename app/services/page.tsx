import type { Metadata } from "next";
import { ServicesPage } from "@/components/services-page";

export const metadata: Metadata = {
  title: "Services",
  description: "AI strategy, professional services, and managed services: one production path from strategy to operating AI."
};

export default function Page() {
  return <ServicesPage />;
}
