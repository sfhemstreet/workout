import { Workout } from "../types";
import { CompletedWorkout } from "../types/CompletedWorkout";

export function getMostRecentWorkoutCompleted(
  workoutsCompleted: CompletedWorkout[]
): { id: Workout["id"]; count: number; date: Date } | null {
  try {
    if (workoutsCompleted.length === 0) return null;

    const mostRecent = workoutsCompleted.reduce((acc, curr) =>
      curr.date > acc.date ? curr : acc
    );

    const result = {
      id: mostRecent.workoutId,
      date: mostRecent.date,
      count: workoutsCompleted.filter(
        (workout) => workout.workoutId === mostRecent.workoutId
      ).length,
    };

    return result;
  } catch (err) {
    console.error("Failed to get latest workout.", err);
    return null;
  }
}
