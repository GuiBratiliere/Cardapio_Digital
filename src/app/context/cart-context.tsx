"use client";
import React, { createContext, useContext } from "react";
import { useCart } from "@/hooks/useCart";

interface CartContextType {
  cartItems: {
    slug: string;
    quantity: number;
    nomePrato: string;
    preco: string;
    imagem_URL: string;
  }[];
  addToCart: (item: {
    slug: string;
    quantity: number;
    nomePrato: string;
    preco: string;
    imagem_URL: string;
  }) => void;
  removeFromCart: (slug: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext deve ser usado dentro de um CartProvider");
  }
  return context;
};
