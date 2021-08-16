import { CompletedWorkout } from "../types/CompletedWorkout";

export const sortWorkoutsCompletedByDate = (
  workoutsCompleted: CompletedWorkout[]
): CompletedWorkout[] =>
  workoutsCompleted.sort((a, b) => a.date.getTime() - b.date.getTime());
