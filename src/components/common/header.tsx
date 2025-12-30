"use client";

import Image from "next/image";
import Link from "next/link";

import { TipoPratoHeader } from "./tipo-prato-header";
import { usePathname } from "next/navigation";

import CartPageSheet from "@/components/cart/cart-sheet";

export const Header = () => {
  const pathname = usePathname();
  const temslug = pathname.includes("/detalhe/");
  return (
    <header className="bg-white shadow-md p-5 flex flex-col justify-between items-center sticky top-0 z-40 rounded-b-2xl">
      <div className="flex items-center justify-between p-5 w-full">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logotipo-antigo-ocidental-de-estilo-vintage-de-luxo-para-cafe-e-restaurante-do-hotel_117739-1128.jpg"
              alt="Logotipo do Café/Restaurante"
              width={50}
              height={50}
              className="rounded-full"
            />
          </Link>
          <h3 className="p-4 font-semibold font-[Story_Script] text-gray-800">
            RESTAURANT
          </h3>
        </div>
        <CartPageSheet />
      </div>
      {!temslug && <TipoPratoHeader />}
    </header>
  );
};
