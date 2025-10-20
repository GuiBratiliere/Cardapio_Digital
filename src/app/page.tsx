import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Pratos } from "@/components/common/pratos";
import React from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <Pratos />
      <Footer />
    </div>
  );
}
