import { Workouts, Workout } from "../../types";
import { v4 as uuid } from "uuid";

// State
export const DEFAULT_WORKOUTS_STATE: Workouts = {
  list: [],
  isLoading: true,
  error: "",
};

// Actions
export enum WorkoutsActionTypes {
  INIT = "workout/workouts/INIT",
  ADD = "workout/workouts/ADD",
  CREATE = "workout/workouts/CREATE",
  CLONE = "workout/workouts/CLONE",
  REMOVE = "workout/workouts/REMOVE",
  DELETE = "workout/workouts/DELETE",
  EDIT = "workout/workouts/EDIT",
  RESTORE = "workout/workouts/RESTORE",
  STAR = "workout/workouts/STAR",
  SHARE = "workout/workouts/SHARE",
  RESCIND_SHARE = "workout/workouts/RESCIND_SHARE",
  // Fetch workouts
  FETCH_BEGIN = "workout/workouts/FETCH_BEGIN",
  FETCH_COMPLETE = "workout/workouts/FETCH_COMPLETE",
  FETCH_FAIL = "workout/workouts/FETCH_FAIL",
}

export type WorkoutsAction =
  | {
      type: typeof WorkoutsActionTypes.INIT;
      payload: { workouts: Workout[]; error?: string };
    }
  | {
      type: typeof WorkoutsActionTypes.ADD;
      payload: { workout: Workout };
    }
  | {
      type: typeof WorkoutsActionTypes.CREATE;
      payload: { workout: Workout };
    }
  | {
      type: typeof WorkoutsActionTypes.EDIT;
      payload: {
        workoutId: string;
        changes: Omit<Partial<Workout>, "id" | "stars">;
      };
    }
  | {
      type: typeof WorkoutsActionTypes.CLONE;
      payload: {
        newId: Workout["id"];
        workout: Workout;
      };
    }
  | {
      type: typeof WorkoutsActionTypes.REMOVE;
      payload: { workoutId: string };
    }
  | {
      type: typeof WorkoutsActionTypes.DELETE;
      payload: { workoutId: string };
    }
  | {
      type: typeof WorkoutsActionTypes.RESTORE;
      payload: { workouts: Workout[] };
    }
  | {
      type: typeof WorkoutsActionTypes.STAR;
      payload: { workoutId: Workout["id"] };
    }
  | {
      type: typeof WorkoutsActionTypes.SHARE;
      payload: { workoutId: Workout["id"] };
    }
  | {
      type: typeof WorkoutsActionTypes.RESCIND_SHARE;
      payload: { workoutId: Workout["id"] };
    }
  | {
      type: typeof WorkoutsActionTypes.FETCH_BEGIN;
    }
  | {
      type: typeof WorkoutsActionTypes.FETCH_COMPLETE;
      payload: { workouts: Workout[] };
    }
  | {
      type: typeof WorkoutsActionTypes.FETCH_FAIL;
      payload: { error: string };
    };

// Action Creators

export const initWorkouts = (
  workouts: Workout[],
  error?: string
): WorkoutsAction => ({
  type: WorkoutsActionTypes.INIT,
  payload: { workouts, error },
});

/**
 * Workouts action creator, Add workout to workouts
 * @param workout
 */
export const addWorkout = (workout: Workout): WorkoutsAction => ({
  type: WorkoutsActionTypes.ADD,
  payload: { workout },
});

/**
 * Workouts action creator, Remove workout from workouts
 * @param workoutId
 */
export const removeWorkout = (workoutId: Workout["id"]): WorkoutsAction => ({
  type: WorkoutsActionTypes.REMOVE,
  payload: { workoutId },
});

/**
 * Workouts action creator, Create workout and add it to workouts
 * @param workout
 */
export const createWorkout = (workout: Workout): WorkoutsAction => ({
  type: WorkoutsActionTypes.CREATE,
  payload: { workout },
});

/**
 * Workouts action creator, Clone an existing workout.
 * @param workout
 */
export const cloneWorkout = (workout: Workout, newId: Workout["id"]): WorkoutsAction => ({
  type: WorkoutsActionTypes.CLONE,
  payload: { workout, newId },
});

/**
 * Workouts action creator, Delete workout from workouts and cause side effect of deleting from Firestore.
 *
 * Only call this on workouts owned by user.
 *
 * @param workoutId
 */
export const deleteWorkout = (workoutId: Workout["id"]): WorkoutsAction => ({
  type: WorkoutsActionTypes.DELETE,
  payload: { workoutId },
});

/**
 * Workouts action creator, Edit a workout in the workouts store
 *
 * @param workoutId
 * @param changes
 */
export const editWorkout = (
  workoutId: Workout["id"],
  changes: Omit<Partial<Workout>, "id">
): WorkoutsAction => ({
  type: WorkoutsActionTypes.EDIT,
  payload: { workoutId, changes },
});

/**
 * Workouts action creator, Replace all workouts with new workouts
 *
 * @param workouts
 */
export const restoreWorkouts = (workouts: Workout[]): WorkoutsAction => ({
  type: WorkoutsActionTypes.RESTORE,
  payload: { workouts },
});

/**
 * Workouts action creator, Star a workout
 */
export const starWorkout = (workoutId: Workout["id"]): WorkoutsAction => ({
  type: WorkoutsActionTypes.STAR,
  payload: { workoutId },
});

/**
 * Workouts action creator, share a workout
 * @param workoutId
 */
export const shareWorkout = (workoutId: Workout["id"]): WorkoutsAction => ({
  type: WorkoutsActionTypes.SHARE,
  payload: { workoutId },
});

/**
 * Workouts action creator, remove a shared workout
 * @param workoutId
 */
export const rescindSharedWorkout = (
  workoutId: Workout["id"]
): WorkoutsAction => ({
  type: WorkoutsActionTypes.RESCIND_SHARE,
  payload: { workoutId },
});

/**
 * Workouts action creator, Delete all workouts in the workouts store
 */
export const deleteWorkouts = (): WorkoutsAction => restoreWorkouts([]);

// Reducer
export function workoutsReducer(
  state = DEFAULT_WORKOUTS_STATE,
  action: WorkoutsAction
): Workouts {
  switch (action.type) {
    case WorkoutsActionTypes.INIT:
      return {
        error: action.payload.error ?? "",
        isLoading: false,
        list: [...action.payload.workouts],
      };

    case WorkoutsActionTypes.CREATE:
    // Fall thru to ADD
    case WorkoutsActionTypes.ADD:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload.workout,
          },
        ],
      };

    case WorkoutsActionTypes.DELETE:
    // Fall thru to REMOVE
    case WorkoutsActionTypes.REMOVE:
      return {
        ...state,
        list: state.list.filter(
          (workout) => workout.id !== action.payload.workoutId
        ),
      };

    case WorkoutsActionTypes.CLONE:
      return {
        ...state,
        list: [
          ...state.list,
          {
            ...action.payload.workout,
            id: action.payload.newId,
            name: `${action.payload.workout.name} - Clone`,
            clonedFromIds: [
              ...action.payload.workout.clonedFromIds,
              action.payload.workout.id,
            ],
          },
        ],
      };

    case WorkoutsActionTypes.EDIT:
      return {
        ...state,
        list: state.list.map((workout) =>
          workout.id === action.payload.workoutId
            ? { ...workout, ...action.payload.changes }
            : workout
        ),
      };

    case WorkoutsActionTypes.RESTORE:
      return {
        ...state,
        list: [...action.payload.workouts],
      };

    case WorkoutsActionTypes.STAR:
      return {
        ...state,
        list: [
          ...state.list.map((workout) =>
            workout.id === action.payload.workoutId
              ? { ...workout, stars: workout.stars + 1 }
              : workout
          ),
        ],
      };

    case WorkoutsActionTypes.SHARE:
      return {
        ...state,
        list: state.list.map((workout) =>
          workout.id === action.payload.workoutId
            ? { ...workout, isShared: true }
            : workout
        ),
      };

    case WorkoutsActionTypes.RESCIND_SHARE:
      return {
        ...state,
        list: state.list.map((workout) =>
          workout.id === action.payload.workoutId
            ? { ...workout, isShared: false }
            : workout
        ),
      };

    case WorkoutsActionTypes.FETCH_BEGIN:
      return {
        ...state,
        isLoading: true,
      };

    case WorkoutsActionTypes.FETCH_COMPLETE:
      return {
        isLoading: false,
        list: [...action.payload.workouts],
        error: "",
      };

    case WorkoutsActionTypes.FETCH_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
