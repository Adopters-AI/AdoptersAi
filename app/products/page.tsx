import type { Metadata } from "next";
import { ProductsPage } from "@/components/products-page";

export const metadata: Metadata = {
  title: "Products",
  description: "Adopters Intelligent turns scattered information into decision-ready intelligence. Pulse keeps production AI reliable and governed."
};

export default function Page() {
  return <ProductsPage />;
}
