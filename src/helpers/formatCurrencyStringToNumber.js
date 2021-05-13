export function formatCurrencyStringToNumber(value) {
  return Number.isNaN(Number(value))
    ? Number(value.replace(/\./g, '').replace(/,/g, '.'))
    : Number(value);
}
