export function percentChange(originalNumber: number, newNumber: number) {
  return ((newNumber - originalNumber) / originalNumber) * 100;
}

export function toFixedIfNecessary(value: number) {
  return +value.toFixed(2);
}
