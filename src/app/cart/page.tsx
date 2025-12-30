"use client";
import { useCartContext } from "../context/cart-context";
import convertInNumber from "@/helpers/convert-in-number";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, ShoppingBasketIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCartContext();
  const tel = "5531995259313";
  const produto = cartItems
    .map(
      (item) =>
        `*${item.nomePrato}*%0AQuantidade: ${item.quantity}%0APreço: R$ ${item.preco}%0A%0A`
    )
    .join("");
  const whatsapp = `https://wa.me/${tel}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.%0A%0A${produto}`;

  return (
    <div className="relative z-[9999]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <ShoppingBasketIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>
          <div className="p-6">
            <ScrollArea className="h-96 w-full pr-4">
              {cartItems.map((item) => (
                <div
                  key={item.slug}
                  className="flex justify-between items-center mb-4 border-b pb-2"
                >
                  <img
                    src={item.imagem_URL}
                    alt={item.nomePrato}
                    width={80}
                    height={80}
                    className="rounded-lg my-4"
                  />
                  <div>
                    <p className="font-medium">{item.nomePrato}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity}x — R$ {item.preco}
                    </p>
                    <p>R$ {convertInNumber(item.preco) * item.quantity}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.slug)}
                    className="text-red-500 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </ScrollArea>
            <div className="p-6 justify-between items-center space-y-4">
              <Button className="bg-green-500 rounded-full  hover:bg-green-700">
                <a href={whatsapp}>Fazer Pedido!</a>
                <MessageCircle />
              </Button>
              <Button
                onClick={clearCart}
                className="bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
