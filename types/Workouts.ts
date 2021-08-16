import { Workout } from "./Workout";

export type Workouts = {
  list: Workout[],
  isLoading: boolean,
  error: string,
}