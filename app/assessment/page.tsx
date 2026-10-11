import type { Metadata } from "next";
import { AssessmentPage } from "@/components/assessment-page";

export const metadata: Metadata = {
  title: "AI Assessment",
  description: "Answer four quick questions and get a recommended AI starting point in 60 seconds."
};

export default function Page() {
  return <AssessmentPage />;
}
