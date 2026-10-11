import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Book a call",
  description: "Tell us where you are and we'll help you choose the right AI path: strategy, product demo, build support, or managed operations."
};

export default function Page() {
  return <ContactPage />;
}
