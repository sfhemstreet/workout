import { CompletedWorkout } from "../../types/CompletedWorkout";
import { getTotalWorkoutsCompleted } from "../../utils/getTotalWorkoutsCompleted";

test("getTotalWorkoutsCompleted", () => {
  const completedWorkouts: CompletedWorkout[] = [
    { workoutId: "1", name: "1", date: new Date(2020, 1, 1) },
    { workoutId: "1", name: "1", date: new Date(2020, 2, 2) },
    { workoutId: "2", name: "2", date: new Date(2020, 3, 3) },
  ]

  expect(getTotalWorkoutsCompleted(completedWorkouts)).toBe(3);
})