import { hasNumber } from "../../../utils/validation";

test("hasNumber", () => {
  expect(hasNumber("abcdefg1")).toBe(true);
  expect(hasNumber("abcdefg")).toBe(false);
});
