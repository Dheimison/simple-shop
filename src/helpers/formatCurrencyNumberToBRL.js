export function formatCurrencyNumberToBRL(value, { showSymbol = false } = {}) {
  if (showSymbol) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return Number(value).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });
}
