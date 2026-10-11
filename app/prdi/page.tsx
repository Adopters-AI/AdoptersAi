import type { Metadata } from "next";
import { PrdiPage } from "@/components/prdi-page";

export const metadata: Metadata = {
  title: "PRDI",
  description: "Palestine Research, Development & Innovation Center: applied research turning Palestinian research into market-ready products."
};

export default function Page() {
  return <PrdiPage />;
}
