"use client";
import React, { useState, useEffect, use } from "react";

interface CartItem {
  slug: string;
  quantity: number;
  nomePrato: string;
  preco: string;
  imagem_URL: string;
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savecart = localStorage.getItem("cart");
    if (savecart) {
      setCartItems(JSON.parse(savecart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(item: CartItem) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.slug === item.slug);
      if (existingItem) {
        return prevItems.map((i) =>
          i.slug === item.slug
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevItems, item];
      }
    });
  }

  function removeFromCart(slug: string) {
    setCartItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
  }
  function clearCart() {
    setCartItems([]);
  }

  return { cartItems, addToCart, removeFromCart, clearCart };
}
