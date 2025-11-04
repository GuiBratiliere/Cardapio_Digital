"use client";
import React from "react";
import { useCartContext } from "../context/cart-context";
import convertInNumber from "@/helpers/convert-in-number";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCartContext();
  const tel = "5531995259313";
  const produto = cartItems.map((item) => {
    return `*${item.nomePrato}*%0AQuantidade: ${item.quantity}%0APreço: R$ ${item.preco}%0A%0A`;
  });
  const whatsapp = `https://wa.me/${tel}?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido.%0A%0A${produto}`;
  if (cartItems.length === 0) {
    return <div className="p-8">Seu carrinho está vazio.</div>;
  }
  const preconumber = cartItems.map((item) => {
    return convertInNumber(item.preco) * item.quantity;
  });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Carrinho</h1>

      {cartItems.map((item) => (
        <div
          key={item.slug}
          className="flex justify-between items-center mb-4 border-b pb-2"
        >
          <img
            src={item.imagem_URL}
            alt={item.nomePrato}
            width={300}
            height={300}
            className="rounded-lg my-4"
          />
          <div>
            <p className="font-medium">{item.nomePrato}</p>
            <p className="text-sm text-gray-500">
              {item.quantity}x — R$ {item.preco}
            </p>
            <p>R$ {preconumber}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.slug)}
            className="text-red-500 hover:underline"
          >
            Remover
          </button>
        </div>
      ))}
      <a href={whatsapp}>Fazer Pedido!</a>
      <button
        onClick={clearCart}
        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Limpar Carrinho
      </button>
    </div>
  );
}
