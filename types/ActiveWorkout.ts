import { Workout } from "./Workout";

export interface ActiveWorkout extends Workout {
  currentExerciseId: string;
  currentRound: number;
  isStarted: boolean;
  isCompleted: boolean;
}