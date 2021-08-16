import { Workout } from "../../types";
import { WorkoutFormState, DEFAULT_STATE } from "./reducer";

const WORKOUT_FORM_STORAGE_KEY = "__create-workout-k__";

/**
 * saveStateToLocalStorage
 *  
 * saves progress to local storage.
 * 
 * @param state WorkoutFormState
 */
export function saveStateToLocalStorage(state: WorkoutFormState) {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return;

  window.localStorage.setItem(
    WORKOUT_FORM_STORAGE_KEY,
    JSON.stringify(state)
  );
}

/**
 * getSavedWorkoutFromLocalStorage
 * 
 * Checks localStorage for previous progress, 
 * if it doesn't exist returns default state.
 */
export function getSavedWorkoutFromLocalStorage(): WorkoutFormState {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return DEFAULT_STATE;

  const savedState = window.localStorage.getItem(WORKOUT_FORM_STORAGE_KEY);

  if (!savedState) return DEFAULT_STATE;

  return JSON.parse(savedState);
}

/**
 * removeStateFromLocalStorage
 * 
 * Removes any saved progress from localStorage.
 */
export function removeStateFromLocalStorage() {
  if (typeof window === "undefined" || typeof window.localStorage === "undefined") return;

  window.localStorage.removeItem(WORKOUT_FORM_STORAGE_KEY);
}

/**
 * mergeState
 * 
 * Takes a Workout and adds error properties needed to become WorkoutFormState.
 * 
 * @param workout 
 */
export const mergeState = (workout: Workout): WorkoutFormState => ({
  ...workout,
  nameError: undefined,
  descriptionError: undefined,
  exercises: workout.exercises.map((e) => ({
    ...e,
    nameError: undefined,
    descriptionError: undefined,
  })),
  tagError: undefined,
  error: undefined,
});