import { CompletedWorkout } from "../../types/CompletedWorkout";
import { sortWorkoutsCompletedByDate } from "../../utils/sortWorkoutsCompletedByDate";

test("sortWorkoutsCompletedByDate", () => {
  const workoutsCompletedArray: CompletedWorkout[] = [
    { workoutId: "1", name: "1", date: new Date(2020, 4, 4) },
    { workoutId: "1", name: "1", date: new Date(2020, 6, 6) },
    { workoutId: "2", name: "2", date: new Date(2020, 1, 1) },
    { workoutId: "2", name: "2", date: new Date(2020, 5, 5) },
    { workoutId: "3", name: "3", date: new Date(2020, 7, 7) },
  ];
  const sorted: CompletedWorkout[] = [
    { workoutId: "3", name: "3", date: new Date(2020, 7, 7) },
    { workoutId: "1", name: "1", date: new Date(2020, 6, 6) },
    { workoutId: "2", name: "2", date: new Date(2020, 5, 5) },
    { workoutId: "1", name: "1", date: new Date(2020, 4, 4) },
    { workoutId: "2", name: "2", date: new Date(2020, 1, 1) },
  ];

  expect(sortWorkoutsCompletedByDate(workoutsCompletedArray)).toStrictEqual(
    sorted
  );
});
