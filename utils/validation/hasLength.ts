import { isGTEMinLength } from "./isGTEMinLength";
import { isLTEMaxLength } from "./isLTEMaxLength";

/**
 * hasLength tests to see if a string is between 2 given lengths, inclusive.
 * 
 * @param str 
 * @param options default `min=2 max=200`
 */
export function hasLength(str: string, options = { min: 2, max: 200 }) {
  const meetsMinRequirement = isGTEMinLength(str, options.min);
  const isBelowMax = isLTEMaxLength(str, options.max);

  return meetsMinRequirement && isBelowMax;
}
