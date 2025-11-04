import { Header } from "@/components/common/header";
import ProductDetailClient from "./components/pageproduct";
import React from "react";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  return (
    <div className="bg-[#CBDCD3]">
      <Header />
      <ProductDetailClient slug={slug} />
    </div>
  );
}
