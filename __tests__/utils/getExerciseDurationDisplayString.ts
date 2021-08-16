import { getExerciseDurationDisplayString } from "../../utils/getExerciseDurationDisplayString";

test("getDisplayTime returns correct strings", () => {
  expect(getExerciseDurationDisplayString(120)).toBe("2:00");
  expect(getExerciseDurationDisplayString(122)).toBe("2:02");
  expect(getExerciseDurationDisplayString(60)).toBe("1:00");
  expect(getExerciseDurationDisplayString(10)).toBe("10");
  expect(getExerciseDurationDisplayString(8, true)).toBe("0:08");
});