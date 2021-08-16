import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { initActiveExercise } from "../../ducks/activeExercise";
import { initActiveWorkout } from "../../ducks/activeWorkout";
import { setTheme } from "../../ducks/theme";
import { anonymousUserSignin } from "../../ducks/user";
import { initWorkouts } from "../../ducks/workouts";
import {
  getLocalStorageTheme,
  getLocalStorageUser,
  getLocalStorageWorkouts,
  getLocalStorageActiveWorkout,
  getLocalStorageActiveExercise,
  getLocalStorageSound,
} from "./saveLocally";
import { createTempUser$ } from "./createTempUser$";
import { setSound } from "../../ducks/sound";

/**
 * getOrCreateTempUser$
 * 
 * Looks in localStorage for a temp user profile and initializes app 
 * with that data, or creates a new profile.
 */
export const getOrCreateTempUser$ = of({
  themeType: getLocalStorageTheme(),
  sound: getLocalStorageSound(),
  user: getLocalStorageUser(),
  workouts: getLocalStorageWorkouts(),
  activeWorkout: getLocalStorageActiveWorkout(),
  activeExercise: getLocalStorageActiveExercise(),
}).pipe(
  mergeMap(({ sound, themeType, user, workouts, activeExercise, activeWorkout }) =>
    user.id !== "" && user.name !== ""
      ? of(
          anonymousUserSignin(user),
          setTheme(themeType),
          setSound(sound.isOn),
          initWorkouts(workouts.list, workouts.error),
          initActiveWorkout(activeWorkout),
          initActiveExercise(activeExercise)
        )
      : createTempUser$()
  )
);
