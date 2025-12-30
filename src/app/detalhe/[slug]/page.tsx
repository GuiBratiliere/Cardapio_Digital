import { Header } from "@/components/common/header";
import ProductDetailClient from "./components/pageproduct";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="bg-[#CBDCD3]">
      <Header />
      <ProductDetailClient slug={slug} />
    </div>
  );
}

export const dynamic = "force-dynamic";
