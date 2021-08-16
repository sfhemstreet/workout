import { from, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { v4 as uuid } from "uuid";
import { ThemeType } from "../../../types";
import { randomUserName } from "../../../utils/randomUserName";
import {
  DEFAULT_ACTIVE_EXERCISE_STATE,
  initActiveExercise,
} from "../../ducks/activeExercise";
import {
  DEFAULT_ACTIVE_WORKOUT_STATE,
  initActiveWorkout,
} from "../../ducks/activeWorkout";
import { DEFAULT_SOUND_STATE, setSound } from "../../ducks/sound";
import { DEFAULT_THEME_STATE, setTheme } from "../../ducks/theme";
import { anonymousUserRegister } from "../../ducks/user";
import { DEFAULT_WORKOUTS_STATE, initWorkouts } from "../../ducks/workouts";

/**
 * createTempUser$
 * 
 * Creates a temp user account with given settings or defaults.
 * ThemeType will be set to users system preference, if possible.
 * 
 * @param themeType 
 * @param workouts 
 * @param activeWorkout 
 * @param activeExercise 
 */
export const createTempUser$ = (
  sound = DEFAULT_SOUND_STATE,
  themeType = DEFAULT_THEME_STATE.type,
  workouts = DEFAULT_WORKOUTS_STATE,
  activeWorkout = DEFAULT_ACTIVE_WORKOUT_STATE,
  activeExercise = DEFAULT_ACTIVE_EXERCISE_STATE
) =>
  from(randomUserName()).pipe(
    map((username) =>
      typeof window === "undefined" || typeof window.matchMedia === "undefined"
        ? { username, themeType }
        : {
            username,
            themeType: (window.matchMedia("(prefers-color-scheme: dark)")
              .matches
              ? "DARK"
              : "LIGHT") as ThemeType,
          }
    ),
    catchError((err) => {
      console.error("Error creating temp user", err);
      return of({username: "Bob", themeType: "DARK" as ThemeType})
    }),
    mergeMap(({ username, themeType }) =>
      of(
        anonymousUserRegister(uuid(), username),
        setTheme(themeType),
        setSound(sound.isOn),
        initWorkouts(workouts.list, workouts.error),
        initActiveWorkout(activeWorkout),
        initActiveExercise(activeExercise)
      )
    )
  );
