/**
 * hasSymbol checks to see if a string contains a symbol
 *
 * @param str
 * @param exceptions
 */
export function hasSymbol(str: string, exceptions: string[] = []): boolean {
  const regExpStr = `[\^a-zA-Z1-9 ${
    exceptions.length > 0
      ? exceptions.map((char) => char.replace(/[-.*+?^${}()|[\]\\]/g, "\\$&"))
      : ""
  }]`;

  const regex = new RegExp(regExpStr, "u");

  return regex.test(str);
}
