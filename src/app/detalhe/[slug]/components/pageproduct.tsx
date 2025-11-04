"use client";
import gerarSlug from "@/helpers/gerar-slug";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useCartContext } from "@/app/context/cart-context";
import Image from "next/image";

interface Prato {
  nomePrato: string;
  tipo: string;
  preco: string;
  status: string;
  descricao: string;
  Categoria: string;
  imagem_URL: string;
  slug: string;
}

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [pratos, setPratos] = useState<string[][]>([]);
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/pratos");
      const json = await res.json();
      setPratos(json.data || []);
    }
    fetchData();
  }, []);

  const groupPratos = useMemo(() => {
    const group: { [key: string]: Prato[] } = {};
    pratos.slice(1).forEach((row) => {
      const prato: Prato = {
        nomePrato: row[0],
        tipo: row[1],
        preco: row[2],
        status: row[3],
        descricao: row[4],
        Categoria: row[5],
        imagem_URL: row[6],
        slug: gerarSlug(row[0]),
      };

      const statusLower = prato.status.trim().toLowerCase();
      if (statusLower !== "ativo") return;

      const tipo = prato.tipo;
      if (!group[tipo]) group[tipo] = [];
      group[tipo].push(prato);
    });
    return group;
  }, [pratos]);

  if (Object.keys(groupPratos).length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8 animate-fade-in transition-opacity duration-700 ease-in-out bg-[#CBDCD3]">
        <img src="/Carregando_Cardapio.gif" alt="Carregando..." />
      </div>
    );
  }

  const pratoSelecionado = Object.values(groupPratos)
    .flat()
    .find((p) => p.slug === slug);

  if (!pratoSelecionado) {
    return <div>Prato não encontrado.</div>;
  }
  const handleAddToCart = () => {
    addToCart({ ...pratoSelecionado, quantity: 1 });
    alert("Prato adicionado ao carrinho!");
  };

  return (
    <div className="p-6 flex flex-col bg-[#CBDCD3]">
      <Image
        src={pratoSelecionado.imagem_URL}
        alt={pratoSelecionado.nomePrato}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full object-cover rounded-2xl"
      />
      <h1 className="text-2xl font-semibold">{pratoSelecionado.nomePrato}</h1>

      <p className="text-gray-700">{pratoSelecionado.descricao}</p>
      <p className="text-lg font-bold mt-2">Preço: {pratoSelecionado.preco}</p>
      <div className="flex w-[100px] items-center justify-between rounded-lg border p-0.5">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setQuantity(quantity - 1)}
        >
          <MinusIcon />
        </Button>
        <p>{quantity}</p>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setQuantity(quantity + 1)}
        >
          <PlusIcon />
        </Button>
      </div>
      <Button onClick={handleAddToCart} className="rounded-full" size="lg">
        Adicionar ao Carrinho
      </Button>
    </div>
  );
}
