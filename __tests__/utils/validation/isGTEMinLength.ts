import { isGTEMinLength } from "../../../utils/validation";

test("isGTEMinLength", () => {
  expect(isGTEMinLength("hello", 2)).toBe(true);
  expect(isGTEMinLength("hello", 5)).toBe(true);
  expect(isGTEMinLength("hello", 6)).toBe(false);
});
