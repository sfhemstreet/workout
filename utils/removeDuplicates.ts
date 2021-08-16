import { hasOwnProperty } from "./hasOwnProperty";

/**
 * removeDuplicates takes an array and removes any duplicates.
 *
 * If given an array of objects, `id` property must exist on each object.
 *
 * ie `[1,1,2] => [1,2]`
 *
 * ie `[{ id: 'a' }, { id: 'a' }] => [{ id: 'a' }]`
 *
 * @param input array of same type, if objects they must have `id` property
 */
export function removeDuplicates<T>(input: T[]): T[];
export function removeDuplicates<T extends { id: string }>(input: T[]): T[] {
  if (input.length === 0) return input;

  if (hasOwnProperty(input[0], "id")) {
    const uniqueObjects = new Map<string, T>();

    input.forEach((i) => {
      if (!uniqueObjects.has(i.id)) {
        uniqueObjects.set(i.id, i);
      }
    });

    return [...uniqueObjects.values()];
  } else {
    return [...new Set([...input])];
  }
}
