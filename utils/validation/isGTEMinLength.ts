/**
 * Is Greater Than or Equal To Min Length. Default minLength is `2`.
 * 
 * @param str
 */
export function isGTEMinLength(str: string, minLength=2): boolean {
  return str.length >= minLength;
}