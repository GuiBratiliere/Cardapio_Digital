export default function convertInNumber(preco: string) {
  const numero = parseFloat(preco.replace(",", "."));
  const arredondado = Math.round(numero * 100) / 100;
  return isNaN(arredondado) ? 0 : arredondado;
}
