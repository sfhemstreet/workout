import { CompletedWorkout } from "./CompletedWorkout";

export type User = {
  id: string;
  name: string;
  avatar: string;
  error: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  workoutsCompleted: CompletedWorkout[];
}