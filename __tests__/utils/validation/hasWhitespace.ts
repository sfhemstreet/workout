import { hasWhitespace } from "../../../utils/validation";

test("hasWhitespace", () => {
  expect(hasWhitespace("hello world")).toBe(true);
  expect(hasWhitespace("hello_world")).toBe(false);
});
