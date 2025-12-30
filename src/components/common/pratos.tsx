import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import gerarSlug from "@/helpers/gerar-slug";
import { Button } from "../ui/button";
import Link from "next/link";

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

export const dynamic = "force-dynamic";

export async function Pratos() {
  const res = await fetch("http://localhost:3000/api/pratos", {
    cache: "no-store",
  });
  const json = await res.json();
  const pratos = json.data || [];

  const group: { [key: string]: Prato[] } = {};
  pratos.slice(1).forEach((row: string[]) => {
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
    if (statusLower !== "ativo") {
      return; // Ignora pratos inativos
    }
    const tipodoprato = prato.tipo;
    if (!group[tipodoprato]) {
      group[tipodoprato] = [];
    }
    group[tipodoprato].push(prato);
  });

  if (Object.keys(group).length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-8 animate-fade-in transition-opacity duration-700 ease-in-out">
        <img src="/Carregando_Cardapio.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 p-4 bg-[#CBDCD3] relative z-10 -mt-3">
      {/* 2.1. Itera sobre as chaves (nomes dos grupos: Entrada, Principal, etc.) */}
      {Object.entries(group).map(([tipoGrupo, pratosDoGrupo]) => (
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
                <div className="ml-4 flex-shrink-0 p-4">
                  <Image
                    src={prato.imagem_URL}
                    alt={prato.nomePrato}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover w-24 h-24"
                  />
                  <Button variant="outline" className="w-full p-4 mt-2">
                    <Link href={`/detalhe/${prato.slug}`}> Detalhe </Link>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
