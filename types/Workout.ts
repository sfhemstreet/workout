import { Difficulty } from "./Difficulty";
import { Exercise } from "./Exercise";
import { RatingAvg } from "./Rating";
import { Tag } from "./Tag";

export type Workout = {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  rounds: number;
  difficulty: Difficulty;
  rating: RatingAvg;
  creator: {
    id: string;
    name: string;
    avatar: string;
  }
  isShared: boolean;
  clonedFromIds: Workout["id"][];
  createdAt: Date;
  tags: Tag[]
};