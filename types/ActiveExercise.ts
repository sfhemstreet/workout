import { Exercise } from "./Exercise";

export interface ActiveExercise extends Exercise {
  isPaused: boolean;
  currentTime: number;
}