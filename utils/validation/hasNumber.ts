/**
 * hasNumber checks to see if given string contains a number.
 * 
 * @param str 
 */
export function hasNumber(str: string): boolean {
  return /\d/.test(str);
}