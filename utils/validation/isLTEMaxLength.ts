/**
 * Is Less Than or Equal To Max Length. Default maxLength is `200`.
 * 
 * @param str
 */
 export function isLTEMaxLength(str: string, maxLength=200): boolean {
  return str.length <= maxLength;
}