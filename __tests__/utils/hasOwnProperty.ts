import { hasOwnProperty } from "../../utils/hasOwnProperty";

test("typescript hasOwnProperty function", () => {
  const obj1 = {
    id: 1,
    name: "Sam",
  }

  expect(hasOwnProperty(obj1, "id")).toBe(true);
  expect(hasOwnProperty(obj1, "name")).toBe(true);
  expect(hasOwnProperty(obj1, "lastName")).toBe(false);
})