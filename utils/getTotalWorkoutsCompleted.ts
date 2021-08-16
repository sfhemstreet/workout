import { CompletedWorkout } from "../types/CompletedWorkout";

export const getTotalWorkoutsCompleted = (
  workoutsCompleted: CompletedWorkout[]
): number => workoutsCompleted.length;
