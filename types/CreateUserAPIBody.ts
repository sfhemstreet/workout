import { Workout } from ".";
import { APIBody } from "./APIBody";
import { ThemeType } from "./ThemeType";
import { CompletedWorkout } from "./CompletedWorkout";

export interface CreateUserAPIBody extends APIBody {
  id: string;
  name: string;
  avatar: string;
  playSounds: boolean;
  theme: ThemeType;
  workouts: Workout[];
  completedWorkouts: CompletedWorkout[];
}
