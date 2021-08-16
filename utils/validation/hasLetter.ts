/**
 * hasLetter checks to see if given string contains a letter.
 *
 * @param str
 */
export function hasLetter(str: string): boolean {
  return /[a-zA-Z]/.test(str);
}
