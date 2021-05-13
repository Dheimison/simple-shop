export function maskValueBRL(value) {
  const onlyDigits = value.replace(/[^\d]/g, '').padStart(3, '0');
  const digitsFloat = `${onlyDigits.slice(0, -2)}.${onlyDigits.slice(-2)}`;

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
  }).format(digitsFloat);
}
