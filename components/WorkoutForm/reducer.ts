import { v4 as uuid } from "uuid";

import { Exercise } from "../../types";
import { REST_PERIOD } from "../../constants";
import { Difficulty } from "../../types/Difficulty";
import { Tag } from "../../types/Tag";

export interface ExerciseState extends Exercise {
  nameError: string | undefined;
  descriptionError: string | undefined;
}

export type WorkoutFormState = {
  id: string;
  name: string;
  nameError: string | undefined;
  description: string;
  descriptionError: string | undefined;
  rounds: number;
  exercises: ExerciseState[];
  difficulty: Difficulty;
  error: string | undefined;
  tagError: string | undefined;
  tags: Tag[];
  isShared: boolean;
};

export const DEFAULT_STATE: WorkoutFormState = {
  id: "",
  name: "",
  nameError: undefined,
  description: "",
  descriptionError: undefined,
  difficulty: "moderate",
  rounds: 1,
  exercises: [
    {
      id: uuid(),
      name: "",
      nameError: undefined,
      description: "",
      descriptionError: undefined,
      duration: 60,
      repetitions: 0,
    },
  ],
  tagError: undefined,
  tags: [],
  error: undefined,
  isShared: false,
};

export enum WorkoutFormActionTypes {
  CHANGE_FIELD = "CHANGE_FIELD",
  ADD_EXERCISE = "ADD_EXERCISE",
  ADD_REST = "ADD_REST",
  CHANGE_EXERCISE = "CHANGE_EXERCISE",
  DELETE_EXERCISE = "DELETE_EXERCISE",
  DELETE_WORKOUT = "DELETE_WORKOUT",
  RESTORE = "RESTORE",
  REORDER = "REORDER",
}

export type WorkoutFormAction =
  | {
      type: WorkoutFormActionTypes.CHANGE_FIELD;
      payload: {
        change: Omit<Partial<WorkoutFormState>, "exercises">;
      };
    }
  | { type: WorkoutFormActionTypes.ADD_EXERCISE }
  | { type: WorkoutFormActionTypes.ADD_REST }
  | {
      type: WorkoutFormActionTypes.CHANGE_EXERCISE;
      payload: {
        exerciseId: string;
        change: Partial<ExerciseState>;
      };
    }
  | {
      type: WorkoutFormActionTypes.DELETE_EXERCISE;
      payload: { exerciseId: string };
    }
  | { type: WorkoutFormActionTypes.DELETE_WORKOUT }
  | {
      type: WorkoutFormActionTypes.RESTORE;
      payload: { state: WorkoutFormState };
    }
  | {
      type: WorkoutFormActionTypes.REORDER;
      payload: {
        exercises: ExerciseState[];
      };
    };

/**
 * workoutFormReducer
 * 
 * Reducer for WorkoutForm state.
 * 
 * @param state CreateWorkoutState
 * @param action CreateWorkoutAction
 */
export function workoutFormReducer(
  state: WorkoutFormState,
  action: WorkoutFormAction
): WorkoutFormState {
  switch (action.type) {
    case WorkoutFormActionTypes.CHANGE_FIELD:
      return {
        ...state,
        ...action.payload.change,
        error: action.payload.change.error ?? undefined,
      };
    case WorkoutFormActionTypes.ADD_EXERCISE:
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: uuid(),
            name: "",
            nameError: undefined,
            description: "",
            descriptionError: undefined,
            duration: 60,
            repetitions: 0,
          },
        ],
        error: undefined,
      };
    case WorkoutFormActionTypes.ADD_REST:
      return {
        ...state,
        exercises: [
          ...state.exercises,
          {
            id: uuid(),
            name: REST_PERIOD,
            nameError: undefined,
            description: "",
            descriptionError: undefined,
            duration: 60,
            repetitions: 0,
          },
        ],
        error: undefined,
      };
    case WorkoutFormActionTypes.CHANGE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map((e) =>
          e.id === action.payload.exerciseId
            ? {
                ...e,
                ...action.payload.change,
              }
            : e
        ),
        error: undefined,
      };
    case WorkoutFormActionTypes.DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          (e) => e.id !== action.payload.exerciseId
        ),
        error: undefined,
      };
    case WorkoutFormActionTypes.DELETE_WORKOUT:
      return {
        ...DEFAULT_STATE,
      };
    case WorkoutFormActionTypes.RESTORE:
      return {
        ...action.payload.state,
      };
    case WorkoutFormActionTypes.REORDER:
      return {
        ...state,
        exercises: action.payload.exercises,
        error: undefined,
      };
    default:
      return state;
  }
}
