/**
 * Custom seeded random number generator.
 * @param seed - The seed for the random generator.
 * @returns A function that generates random numbers based on the seed.
 */
export default function seededRandom(seed: number): () => number {
  let x = Math.sin(seed++) * 10000;
  return function () {
    x = Math.sin(x++) * 10000;
    return x - Math.floor(x);
  };
}
