/**
 * hasOwnProperty
 * 
 * Helper function that works exactly like `Object.hasOwnProperty`
 * but is typed to keep Typescript from complaining.
 * 
 * @param obj object to test for property
 * @param prop property to test for
 */
export function hasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}
