"use client";

import React, { useEffect, useState, useMemo, useRef } from "react"; // Importe useMemo
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

export const TipoPratoHeader = () => {
  const [tipos, setTipos] = useState<string[][]>([]);
  const [setDeactive, setActive] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/tipos");
      const json = await res.json();
      setTipos(json.data || []);
    }
    fetchData();
  }, []);

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

  // 1. Crie uma lista de tipos ÚNICOS usando useMemo
  const uniqueTipos = useMemo(() => {
    // 1.1. Comece com slice(1) para ignorar o cabeçalho (se a primeira linha for o cabeçalho)
    // 1.2. Mapeie para extrair apenas o valor (tipo[0])
    const allTipos = tipos.slice(1).map((tipo) => tipo[0]);

    // 1.3. Use o Set para remover duplicatas, e depois espalhe em um novo Array
    return Array.from(new Set(allTipos));
  }, [tipos]); // Recalcula apenas quando 'tipos' muda

  return (
    <div className="w-full bg-white p-0.5 flex justify-center items-center">
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
          <ScrollBar orientation="horizontal" className="scroll-area-no-bar" />
        </ScrollArea>
      </div>
    </div>
  );
};
