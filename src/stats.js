export function mean(...numbers) {
  return numbers.reduce((accum, next) => accum + next) / numbers.length;
}

export function range(...numbers) {
  const largest = Math.max(...numbers);
  const smallest = Math.min(...numbers);
  return largest - smallest;
}
