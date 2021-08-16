import {
  ActiveExercise,
  ActiveWorkout,
  ThemeType,
  User,
  Workouts,
} from "../../../types";
import { DEFAULT_ACTIVE_EXERCISE_STATE } from "../../ducks/activeExercise";
import { DEFAULT_ACTIVE_WORKOUT_STATE } from "../../ducks/activeWorkout";
import { DEFAULT_SOUND_STATE, SoundState } from "../../ducks/sound";
import { DEFAULT_THEME_STATE } from "../../ducks/theme";
import { DEFAULT_USER_STATE } from "../../ducks/user";
import { DEFAULT_WORKOUTS_STATE } from "../../ducks/workouts";

const workoutsKey = "_w_";
const activeWorkoutKey = "_a_w_";
const activeExerciseKey = "_a_e_";
const themeKey = "_t_";
const userKey = "_u_";
const soundKey = "_s_";

/**
 * Get workouts from localStorage
 */
export const getLocalStorageWorkouts = (): Workouts => {
  const workouts: Workouts | undefined = getLocalStorage(workoutsKey);

  if (!workouts) return DEFAULT_WORKOUTS_STATE;

  // convert timestamp strings back into Date type
  return {
    ...workouts,
    list: workouts.list.map((workout) => ({
      ...workout,
      createdAt: new Date(workout.createdAt),
    })),
  };
};

/**
 * Save workouts to localStorage
 *
 * @param workouts
 */
export const setLocalStorageWorkouts = (workouts: Workouts): void =>
  setLocalStorage(workoutsKey, workouts);

/**
 * Get ActiveWorkout from localStorage
 */
export const getLocalStorageActiveWorkout = (): ActiveWorkout => {
  const workout: ActiveWorkout | undefined = getLocalStorage(activeWorkoutKey);

  if (!workout) return DEFAULT_ACTIVE_WORKOUT_STATE;

  // convert timestamp strings back into Date type
  return { ...workout, createdAt: new Date(workout.createdAt) };
};

/**
 * Save ActiveWorkout to localStorage
 *
 * @param activeWorkout
 */
export const setLocalStorageActiveWorkout = (
  activeWorkout: ActiveWorkout
): void => setLocalStorage(activeWorkoutKey, activeWorkout);

/**
 * Get ActiveWorkout from localStorage
 */
export const getLocalStorageActiveExercise = (): ActiveExercise =>
  getLocalStorage(activeExerciseKey) ?? DEFAULT_ACTIVE_EXERCISE_STATE;

/**
 * Save ActiveWorkout to localStorage
 *
 * @param activeWorkout
 */
export const setLocalStorageActiveExercise = (
  activeExercise: ActiveExercise
): void => setLocalStorage(activeExerciseKey, activeExercise);

/**
 * Save theme to localStorage
 * @param theme
 */
export const setLocalStorageTheme = (themeType: ThemeType): void =>
  setLocalStorage(themeKey, themeType);

/**
 * Get themeType from localStorage
 */
export const getLocalStorageTheme = (): ThemeType =>
  getLocalStorage(themeKey) ?? DEFAULT_THEME_STATE.type;

/**
 * Get User name and avatar from localStorage
 */
export const getLocalStorageUser = (): User =>
  getLocalStorage(userKey) ?? DEFAULT_USER_STATE;

/**
 * Save user to localStorage
 * @param user
 */
export const setLocalStorageUser = (user: User): void =>
  setLocalStorage(userKey, user);

/**
 * Get Sound state from localStorage
 */
export const getLocalStorageSound = (): SoundState =>
  getLocalStorage(soundKey) ?? DEFAULT_SOUND_STATE;

/**
 * Save sound settings to localStorage
 * @param sound
 */
export const setLocalStorageSound = (sound: SoundState) =>
  setLocalStorage(soundKey, sound);

function getLocalStorage<T>(key: string): T | undefined {
  try {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    )
      return undefined;

    const item = window.localStorage.getItem(key);

    if (!item) return undefined;

    const { data } = JSON.parse(item);

    if (!data) return undefined;

    return data;
  } catch (err) {
    console.error(`Error getting localStorage for key: ${key}`, err);
    return undefined;
  }
}

function setLocalStorage<T>(key: string, data: T): void {
  try {
    if (
      typeof window === "undefined" ||
      typeof window.localStorage === "undefined"
    )
      return;

    const dataToSave = JSON.stringify({ data });

    window.localStorage.setItem(key, dataToSave);
  } catch (err) {
    console.error(`Error setting localStorage for key: ${key}`, err);
  }
}
