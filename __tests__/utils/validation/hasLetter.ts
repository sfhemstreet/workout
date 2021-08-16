import { hasLetter } from "../../../utils/validation";

test("hasLetter", () => {
  expect(hasLetter("11111q111111")).toBe(true);
  expect(hasLetter("11111111111")).toBe(false);
  expect(hasLetter("------q------")).toBe(true);
  expect(hasLetter("11111-111111")).toBe(false);
});
