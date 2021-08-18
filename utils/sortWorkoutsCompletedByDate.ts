import { CompletedWorkout } from "../types/CompletedWorkout";

export const sortWorkoutsCompletedByDate = (
  workoutsCompleted: CompletedWorkout[]
): CompletedWorkout[] =>
  workoutsCompleted.sort((a, b) => b.date.getTime() - a.date.getTime());
