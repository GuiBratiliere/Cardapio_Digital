"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Prato {
  nomePrato: string;
  tipo: string;
  preco: string;
  status: string;
  descricao: string;
  Categoria: string;
  imagem_URL: string;
}

export function Pratos() {
  const [pratos, setPratos] = useState<string[][]>([]);
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
      };
      const statusLower = prato.status.trim().toLowerCase();
      if (statusLower !== "ativo") {
        return; // Ignora pratos inativos
      }
      const tipodoprato = prato.tipo;
      if (!group[tipodoprato]) {
        group[tipodoprato] = [];
      }
      group[tipodoprato].push(prato);
    });
    return group;
  }, [pratos]);

  if (Object.keys(groupPratos).length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8 animate-fade-in transition-opacity duration-700 ease-in-out">
        <img src="/Carregando_Cardapio.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 p-4 bg-[#CBDCD3] relative z-10 -mt-3">
      {/* 2.1. Itera sobre as chaves (nomes dos grupos: Entrada, Principal, etc.) */}
      {Object.entries(groupPratos).map(([tipoGrupo, pratosDoGrupo]) => (
        // O `tipoGrupo` é o nome do grupo (a chave do objeto)
        // Ignora pratos inativos
        <section
          key={tipoGrupo}
          id={tipoGrupo}
          className="space-y-4 scroll-mt-72"
        >
          {/* 👈 TÍTULO DO GRUPO */}
          <h2 className="text-3xl font-bold border-b-2 border-white pb-2 text-gray-900">
            {tipoGrupo}
          </h2>

          {/* 2.2. Itera sobre os pratos DENTRO de cada grupo */}
          {pratosDoGrupo.map((prato) => (
            <div key={prato.nomePrato} className="flex">
              <Card className="w-full flex justify-between p-4 flex-row items-center">
                <div className="flex-1">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-xl">{prato.nomePrato}</CardTitle>
                    <CardDescription>{prato.descricao}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-lg font-semibold text-green-700">
                      R$ {prato.preco}
                    </p>
                  </CardContent>
                </div>

                {/* Imagem - movida para o layout flex, removendo CardFooter desnecessário */}
                <div className="ml-4 flex-shrink-0">
                  <Image
                    src={prato.imagem_URL}
                    alt={prato.nomePrato}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-24 h-24"
                  />
                </div>
              </Card>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
