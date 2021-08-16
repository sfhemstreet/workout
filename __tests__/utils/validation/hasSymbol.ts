import { hasSymbol } from "../../../utils/validation";

test("hasSymbol", () => {
  expect(hasSymbol("abcdefg!")).toBe(true);
  expect(hasSymbol("abcdefg")).toBe(false);
  expect(hasSymbol("abcdefg!", ["!"])).toBe(false);
  expect(hasSymbol("hello_world-", ["-", "_"])).toBe(false);
});
