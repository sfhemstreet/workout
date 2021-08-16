import { isLTEMaxLength } from "../../../utils/validation";

test("isLTEMaxLength", () => {
  expect(isLTEMaxLength("hello", 5)).toBe(true);
  expect(isLTEMaxLength("hello", 6)).toBe(true);
  expect(isLTEMaxLength("hello", 4)).toBe(false);
});
