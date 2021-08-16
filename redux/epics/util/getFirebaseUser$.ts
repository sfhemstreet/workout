import { firebase } from "../../../firebase";
import { combineLatest, forkJoin, from, of, timer } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import {
  ActiveExercise,
  ActiveWorkout,
  ThemeType,
  Workout,
} from "../../../types";
import { closeSignInModal } from "../../ducks/signInModal";
import { setTheme } from "../../ducks/theme";
import {
  userRegisterComplete,
  userLoginComplete,
  userRegisterFail,
  userLoginFail,
} from "../../ducks/user";
import { closeUserSideBar } from "../../ducks/userSideBar";
import { initWorkouts } from "../../ducks/workouts";
import { getOrCreateTempUser$ } from "./getOrCreateTempUser$";
import { fetchUsersWorkouts$ } from "./fetchUsersWorkouts$";
import { setSound } from "../../ducks/sound";
import {
  DEFAULT_ACTIVE_EXERCISE_STATE,
  initActiveExercise,
} from "../../ducks/activeExercise";
import {
  DEFAULT_ACTIVE_WORKOUT_STATE,
  initActiveWorkout,
} from "../../ducks/activeWorkout";
import { fixWorkoutDate } from "./fixWorkoutDates";

/**
 * getFirebaseUser$
 *
 * Fetches the given user's data from firebase.
 *
 * @param user firebase.User
 * @param isRegistering optional boolean to determine action type to return
 * @param isInit optional boolean to determine action type to return
 */
export const getFirebaseUser$ = ({
  user,
  isRegistering,
  isInit,
}: {
  user: firebase.User;
  isRegistering?: boolean;
  isInit?: boolean;
}) =>
  // Use combineLatest to make sure that request
  // takes at least 500ms for loading indicator to display.
  combineLatest([
    timer(500),
    forkJoin({
      user: from(firebase.firestore().collection("users").doc(user.uid).get()),
      lastActivity: from(
        firebase.firestore().collection("latestActivity").doc(user.uid).get()
      ).pipe(
        map((snapshot) =>
          snapshot.exists
            ? (snapshot.data() as {
                activeWorkout: ActiveWorkout | undefined;
                activeExercise: ActiveExercise | undefined;
              })
            : undefined
        ),
        map((data) =>
          data
            ? data.activeWorkout
              ? {
                  ...data,
                  activeWorkout: {
                    ...data.activeWorkout,
                    createdAt: (data.activeWorkout.createdAt as any).toDate(),
                  },
                }
              : data
            : data
        ),
        catchError((err) => of(undefined))
      ),
    }),
  ]).pipe(
    // Only care about data from forkJoin
    map((array) => array[1]),
    mergeMap((data) =>
      // No user found
      !data.user.exists
        ? isInit
          ? getOrCreateTempUser$
          : of(
              isRegistering
                ? userRegisterFail("User not found")
                : userLoginFail("User not found")
            )
        : of(data).pipe(
            map((data) => ({
              user: data.user.data() as {
                id: string;
                name: string;
                avatar: string;
                playSounds: boolean;
                theme: ThemeType;
                workouts: string[];
              },
              latestActivity: data.lastActivity,
            })),
            mergeMap((data) =>
              data.user.workouts.length > 0
                ? fetchUsersWorkouts$(user.uid, data.user.workouts).pipe(
                    map((workouts) => ({
                      ...data,
                      user: { ...data.user, workouts },
                    }))
                  )
                : of({
                    ...data,
                    user: { ...data.user, workouts: [] as Workout[] },
                  })
            ),
            mergeMap(
              ({
                user: { id, name, avatar, theme, playSounds, workouts },
                latestActivity,
              }) =>
                of(
                  isRegistering
                    ? userRegisterComplete({
                        id,
                        name,
                        avatar,
                      })
                    : userLoginComplete({
                        id,
                        name,
                        avatar,
                      }),
                  setTheme(theme),
                  setSound(playSounds),
                  initWorkouts(workouts),
                  closeSignInModal(),
                  closeUserSideBar(),
                  initActiveExercise(
                    latestActivity?.activeExercise ??
                      DEFAULT_ACTIVE_EXERCISE_STATE
                  ),
                  initActiveWorkout(
                    latestActivity?.activeWorkout
                      ? fixWorkoutDate(latestActivity.activeWorkout)
                      : DEFAULT_ACTIVE_WORKOUT_STATE
                  )
                )
            ),
            catchError((err) => {
              console.error("getFirebaseUser error 1:", err);
              if (isInit) return getOrCreateTempUser$;
              else if (isRegistering)
                return of(userRegisterFail("Error registering"));

              return of(userLoginFail("Login Failed"));
            })
          )
    ),
    catchError((err) => {
      console.error("getFirebaseUser error 2:", err);
      if (isInit) return getOrCreateTempUser$;
      else if (isRegistering) return of(userRegisterFail("Error registering"));

      return of(userLoginFail("Login Failed"));
    })
  );
