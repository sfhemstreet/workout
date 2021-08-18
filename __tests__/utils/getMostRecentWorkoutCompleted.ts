import { CompletedWorkout } from "../../types/CompletedWorkout";
import { getMostRecentWorkoutCompleted } from "../../utils/getMostRecentWorkoutCompleted";

test("getMostRecentWorkoutCompleted returns most recent completed workout", () => {
  const workout1: CompletedWorkout = {
    workoutId: "1",
    name: "Twerkout 1",
    date: new Date(2020, 1, 1),
  };
  const workout1Again: CompletedWorkout = {
    workoutId: "1",
    name: "Twerkout 1",
    date: new Date(2020, 4, 4),
  };
  const workout2: CompletedWorkout = {
    workoutId: "2",
    name: "Twerkout 2",
    date: new Date(2020, 2, 2),
  };
  const workout3: CompletedWorkout = {
    workoutId: "3",
    name: "Twerkout 3",
    date: new Date(2020, 3, 3),
  };

  expect(
    getMostRecentWorkoutCompleted([workout2, workout1, workout3, workout1Again])
  ).toStrictEqual({ id: "1", count: 2, date: new Date(2020, 4, 4) });
});
