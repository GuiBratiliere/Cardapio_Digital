"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo, useRef } from "react"; // Importe useMemo
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { MapPin } from "lucide-react";

export const Header = () => {
  const [tipos, setTipos] = useState<string[][]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionId = document.querySelectorAll("section[id]");
    const options = {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0,
    };
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, options);
    sectionId.forEach((section) => {
      observer.current?.observe(section);
    });
    return () => observer.current?.disconnect();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/tipos");
      const json = await res.json();
      setTipos(json.data || []);
    }
    fetchData();
  }, []);

  const [setDeactive, setActive] = useState("");

  // 1. Crie uma lista de tipos ÚNICOS usando useMemo
  const uniqueTipos = useMemo(() => {
    // 1.1. Comece com slice(1) para ignorar o cabeçalho (se a primeira linha for o cabeçalho)
    // 1.2. Mapeie para extrair apenas o valor (tipo[0])
    const allTipos = tipos.slice(1).map((tipo) => tipo[0]);

    // 1.3. Use o Set para remover duplicatas, e depois espalhe em um novo Array
    return Array.from(new Set(allTipos));
  }, [tipos]); // Recalcula apenas quando 'tipos' muda

  return (
    <header className="w-full bg-white shadow-md p-4 flex justify-center items-center sticky top-0 z-50 rounded-b-2xl">
      <div className="flex w-full flex-col items-center">
        <Link href="/">
          <Image
            src="/logotipo-antigo-ocidental-de-estilo-vintage-de-luxo-para-cafe-e-restaurante-do-hotel_117739-1128.jpg"
            alt="Logotipo do Café/Restaurante"
            width={100}
            height={100}
            className="rounded-full"
          />
        </Link>
        <h1 className="p-4 text-3xl font-semibold">RESTAURANT</h1>
        <div className="flex flex-row space-x-1 w-full justify-center">
          <MapPin />
          <a href="https://www.google.com/maps">
            Rua tal, bairro tal, cidade tal, cep: 00000-000
          </a>
        </div>
        <div className="w-full border-b bg-white">
          <ScrollArea className="w-full whitespace-nowrap scroll-area-no-bar">
            <div className="flex space-x-1 px-2 py-3 justify-center">
              {/* 2. Percorra o array de tipos ÚNICOS */}
              {uniqueTipos.map((tipo) => (
                <Button
                  key={tipo} // Use o próprio 'tipo' como chave, pois é único agora
                  onClick={() => {
                    const section = document.getElementById(tipo);
                    section?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    setActive(tipo);
                  }}
                  className={cn(
                    "text-sm font-medium transition-all text-black",
                    setDeactive === tipo
                      ? "text-[#496E5B] border-b-2 border-[#496E5B] pb-1 bg-white"
                      : "bg-white hover:text-white"
                  )}
                >
                  <a href={`#${tipo}`}>{tipo}</a>
                </Button>
              ))}
            </div>
            <ScrollBar
              orientation="horizontal"
              className="scroll-area-no-bar"
            />
          </ScrollArea>
        </div>
      </div>
    </header>
  );
};
