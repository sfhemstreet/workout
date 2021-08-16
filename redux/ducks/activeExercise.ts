import { ActiveExercise, Exercise } from "../../types";

// State
export const DEFAULT_ACTIVE_EXERCISE_STATE: ActiveExercise = {
  id: "",
  name: "",
  description: "",
  duration: 0,
  isPaused: false,
  currentTime: 0,
  repetitions: 0,
} as const;

// Actions
export enum ActiveExerciseActionTypes {
  INIT = "workout/activeExercise/INIT",
  CHANGE_ACTIVE_EXERCISE = "workout/activeExercise/CHANGE_ACTIVE_EXERCISE",
  DECREMENT_TIME = "workout/activeExercise/DECREMENT_TIME",
  RESET_TIME = "workout/activeExercise/RESET_TIME",
  START_PAUSE = "workout/activeExercise/START_PAUSE",
  END_PAUSE = "workout/activeExercise/END_PAUSE",
}

export type ActiveExerciseAction =
  | {
      type: typeof ActiveExerciseActionTypes.INIT;
      payload: { activeExercise: ActiveExercise };
    }
  | {
      type: typeof ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE;
      payload: { exercise: Exercise };
    }
  | { type: typeof ActiveExerciseActionTypes.DECREMENT_TIME }
  | { type: typeof ActiveExerciseActionTypes.RESET_TIME }
  | { type: typeof ActiveExerciseActionTypes.START_PAUSE }
  | { type: typeof ActiveExerciseActionTypes.END_PAUSE };

// Action Creators
export const initActiveExercise = (
  activeExercise: ActiveExercise
): ActiveExerciseAction => ({
  type: ActiveExerciseActionTypes.INIT as const,
  payload: { activeExercise },
});

export const changeActiveExercise = (exercise: Exercise) => ({
  type: ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE as const,
  payload: {
    exercise,
  },
});

export const removeActiveExercise = (): ActiveExerciseAction => ({
  type: ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE as const,
  payload: {
    exercise: {
      ...DEFAULT_ACTIVE_EXERCISE_STATE,
    },
  },
});

export const pauseExercise = (): ActiveExerciseAction => ({
  type: ActiveExerciseActionTypes.START_PAUSE as const,
});

export const resumeExercise = (): ActiveExerciseAction => ({
  type: ActiveExerciseActionTypes.END_PAUSE as const,
});

export const decrementExerciseTimer = (): ActiveExerciseAction => ({
  type: ActiveExerciseActionTypes.DECREMENT_TIME as const,
});

export const resetExerciseTimer = (): ActiveExerciseAction => ({
  type: ActiveExerciseActionTypes.RESET_TIME as const,
});

// Reducer
export function activeExerciseReducer(
  state = DEFAULT_ACTIVE_EXERCISE_STATE,
  action: ActiveExerciseAction
): ActiveExercise {
  switch (action.type) {
    case ActiveExerciseActionTypes.INIT:
      return {
        ...action.payload.activeExercise
      }
    case ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE:
      return {
        ...action.payload.exercise,
        isPaused: false,
        currentTime: action.payload.exercise.duration,
      };
    case ActiveExerciseActionTypes.START_PAUSE:
      return {
        ...state,
        isPaused: true,
      };
    case ActiveExerciseActionTypes.END_PAUSE:
      return {
        ...state,
        isPaused: false,
      };
    case ActiveExerciseActionTypes.DECREMENT_TIME:
      return {
        ...state,
        currentTime: state.currentTime - 1,
      };
    case ActiveExerciseActionTypes.RESET_TIME:
      return {
        ...state,
        currentTime: state.duration,
      };
    default:
      return state;
  }
}
