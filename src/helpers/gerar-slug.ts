export default function gerarSlug(nome: string) {
  return nome
    .toLowerCase()
    .normalize("NFD") // remove acentuação
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // troca espaços por hífens
    .replace(/[^a-z0-9-]/g, ""); // remove caracteres especiais
}
