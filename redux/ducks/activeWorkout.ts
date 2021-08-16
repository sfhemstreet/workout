import { ActiveWorkout, Exercise, Workout } from "../../types";

// State
export const DEFAULT_ACTIVE_WORKOUT_STATE: ActiveWorkout = {
  id: "",
  name: "",
  description: "",
  difficulty: "active-rest",
  creator: {
    id: "",
    name: "",
    avatar: "",
  },
  exercises: [],
  stars: 0,
  currentExerciseId: "",
  currentRound: 0,
  rounds: 0,
  isStarted: false,
  isCompleted: false,
  isShared: false,
  clonedFromIds: [],
  createdAt: new Date(),
  tags: [],
};

// Actions
export enum ActiveWorkoutActionTypes {
  INIT = "workout/activeWorkout/INIT",
  START_WORKOUT = "workout/activeWorkout/START_WORKOUT",
  STOP_WORKOUT = "workout/activeWorkout/STOP_WORKOUT",
  CHANGE_WORKOUT = "workout/activeWorkout/CHANGE_WORKOUT",
  CHANGE_CURRENT_EXERCISE = "workout/activeWorkout/CHANGE_CURRENT_EXERCISE",
  PREV_EXERCISE = "workout/activeWorkout/PREV_EXERCISE",
  NEXT_EXERCISE = "workout/activeWorkout/NEXT_EXERCISE",
  INCREMENT_CURRENT_ROUND = "workout/activeWorkout/INCREMENT_CURRENT_ROUND",
  COMPLETED = "workout/activeWorkout/COMPLETED",
}

export type ActiveWorkoutAction =
  | {
      type: typeof ActiveWorkoutActionTypes.INIT;
      payload: { activeWorkout: ActiveWorkout };
    }
  | { type: typeof ActiveWorkoutActionTypes.START_WORKOUT }
  | { type: typeof ActiveWorkoutActionTypes.STOP_WORKOUT }
  | {
      type: typeof ActiveWorkoutActionTypes.CHANGE_WORKOUT;
      payload: { workout: Workout };
    }
  | {
      type: typeof ActiveWorkoutActionTypes.CHANGE_CURRENT_EXERCISE;
      payload: { exerciseId: Exercise["id"] };
    }
  | { type: typeof ActiveWorkoutActionTypes.PREV_EXERCISE }
  | { type: typeof ActiveWorkoutActionTypes.NEXT_EXERCISE }
  | { type: typeof ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND }
  | { type: typeof ActiveWorkoutActionTypes.COMPLETED };

// Action Creators
export const initActiveWorkout = (
  activeWorkout: ActiveWorkout
): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.INIT as const,
  payload: { activeWorkout },
});

export const startActiveWorkout = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.START_WORKOUT as const,
});

export const stopActiveWorkout = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.STOP_WORKOUT as const,
});

export const changeActiveWorkout = (workout: Workout): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.CHANGE_WORKOUT as const,
  payload: {
    workout,
  },
});

export const changeCurrentExercise = (
  exerciseId: Exercise["id"]
): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.CHANGE_CURRENT_EXERCISE as const,
  payload: { exerciseId },
});

export const nextExercise = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.NEXT_EXERCISE as const,
});

export const previousExercise = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.PREV_EXERCISE as const,
});

export const nextRound = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND as const,
});

export const removeActiveWorkout = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.CHANGE_WORKOUT as const,
  payload: {
    workout: {
      ...DEFAULT_ACTIVE_WORKOUT_STATE,
    },
  },
});

export const completedActiveWorkout = (): ActiveWorkoutAction => ({
  type: ActiveWorkoutActionTypes.COMPLETED as const,
});

// Reducer
export function activeWorkoutReducer(
  state = DEFAULT_ACTIVE_WORKOUT_STATE,
  action: ActiveWorkoutAction
): ActiveWorkout {
  const handleNextExercise = () => {
    if (state.id === "" || state.exercises.length <= 1) return state;

    const currentExerciseIndex = state.exercises.findIndex(
      (exercise) => exercise.id === state.currentExerciseId
    );

    if (currentExerciseIndex === -1) return state;

    const nextIndex =
      currentExerciseIndex + 1 < state.exercises.length
        ? currentExerciseIndex + 1
        : 0;

    return {
      ...state,
      currentExerciseId: state.exercises.reduce((acc, curr, currIndex) =>
        currIndex === nextIndex ? curr : acc
      ).id,
    };
  };

  const handlePreviousExercise = () => {
    if (state.id === "" || state.exercises.length <= 1) return state;

    const currentExerciseIndex = state.exercises.findIndex(
      (exercise) => exercise.id === state.currentExerciseId
    );

    if (currentExerciseIndex === -1) return state;

    if (currentExerciseIndex === 0 && state.currentRound === 1) return state;

    const shouldDecrementRound = currentExerciseIndex - 1 < 0;
    const prevIndex = shouldDecrementRound
      ? state.exercises.length - 1
      : currentExerciseIndex - 1;

    return {
      ...state,
      currentExerciseId: state.exercises.reduce((acc, curr, currIndex) =>
        currIndex === prevIndex ? curr : acc
      ).id,
      currentRound: shouldDecrementRound
        ? state.currentRound - 1
        : state.currentRound,
    };
  };

  switch (action.type) {

    

    case ActiveWorkoutActionTypes.INIT:
      return {
        ...action.payload.activeWorkout,
      };

    case ActiveWorkoutActionTypes.START_WORKOUT:
      return {
        ...state,
        isStarted: true,
        isCompleted: false,
      };

    case ActiveWorkoutActionTypes.STOP_WORKOUT:
      return {
        ...state,
        isStarted: false,
        isCompleted: false,
        currentRound: 1,
        currentExerciseId:
          state.exercises.length > 0 ? state.exercises[0].id : "",
      };

    case ActiveWorkoutActionTypes.CHANGE_WORKOUT:
      return {
        ...action.payload.workout,
        currentRound: 1,
        currentExerciseId:
          action.payload.workout.exercises.length >= 1
            ? action.payload.workout.exercises[0].id
            : "",
        isStarted: false,
        isCompleted: false,
      };

    case ActiveWorkoutActionTypes.CHANGE_CURRENT_EXERCISE:
      return {
        ...state,
        currentExerciseId: action.payload.exerciseId,
      };

    case ActiveWorkoutActionTypes.NEXT_EXERCISE:
      return handleNextExercise();

    case ActiveWorkoutActionTypes.PREV_EXERCISE:
      return handlePreviousExercise();

    case ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND:
      return {
        ...state,
        currentRound: state.currentRound + 1,
        currentExerciseId:
          state.exercises.length > 0 ? state.exercises[0].id : "",
      };

    case ActiveWorkoutActionTypes.COMPLETED:
      return {
        ...state,
        currentRound: 1,
        currentExerciseId:
          state.exercises.length > 0 ? state.exercises[0].id : "",
        isStarted: false,
        isCompleted: true,
      };

    default:
      return state;
  }
}
