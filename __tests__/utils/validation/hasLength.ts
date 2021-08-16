import { hasLength } from "../../../utils/validation";

test("hasLength", () => {
  expect(hasLength("four", { min: 3, max: 5 })).toBe(true);
  expect(hasLength("1", { min: 2, max: 5 })).toBe(false);
  expect(hasLength("xxxx", { min: 4, max: 5 })).toBe(true);
  expect(hasLength("six", { min: 2, max: 3 })).toBe(true);
  expect(hasLength("ooooooo", { min: 3, max: 5 })).toBe(false);
});
