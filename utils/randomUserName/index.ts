/**
 * Creates a random username.
 */
 export async function randomUserName() {
  const adjectives = (await import('./adjectives')).adjectives;
  const nouns = (await import('./nouns')).nouns;

  return `${adjectives[getRandomInt(0, adjectives.length - 1)]} ${
    nouns[getRandomInt(0, nouns.length - 1)]
  }`;
}

/**
 * Get random integer between min and max, both inclusive.
 * @param min
 * @param max
 */
function getRandomInt(min: number, max: number) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min + 1) + _min);
}