import { ofType } from "redux-observable";
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mapTo,
  switchMap,
  tap,
  throttleTime,
  withLatestFrom,
} from "rxjs/operators";
import { firebase } from "../../firebase/firebase";

import { AppEpic } from "..";
import {
  changeActiveExercise,
  DEFAULT_ACTIVE_EXERCISE_STATE,
  pauseExercise,
  resetExerciseTimer,
} from "../ducks/activeExercise";
import {
  ActiveWorkoutActionTypes,
  completedActiveWorkout,
  nextRound,
} from "../ducks/activeWorkout";
import { setLocalStorageActiveWorkout } from "./util/saveLocally";
import { from, of } from "rxjs";

// When ActiveWorkout changes, update ActiveExercise
const syncActiveExerciseWithWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      ActiveWorkoutActionTypes.STOP_WORKOUT,
      ActiveWorkoutActionTypes.CHANGE_WORKOUT,
      ActiveWorkoutActionTypes.CHANGE_WORKOUT_ACCEPT,
      ActiveWorkoutActionTypes.PREV_EXERCISE,
      ActiveWorkoutActionTypes.NEXT_EXERCISE,
      ActiveWorkoutActionTypes.CHANGE_CURRENT_EXERCISE,
      ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND,
      ActiveWorkoutActionTypes.COMPLETED
    ),
    withLatestFrom(state$),
    filter(([action, state]) =>
      action.type === ActiveWorkoutActionTypes.CHANGE_WORKOUT
        ? state.activeWorkout.switchWorkout === null
        : true
    ),
    map(([, state]) =>
      state.activeWorkout.exercises.length > 0
        ? state.activeWorkout.exercises.reduce((e1, e2) =>
            e2.id === state.activeWorkout.currentExerciseId ? e2 : e1
          )
        : DEFAULT_ACTIVE_EXERCISE_STATE
    ),
    map((exercise) =>
      changeActiveExercise({
        ...exercise,
      })
    )
  );

const saveActiveWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      ActiveWorkoutActionTypes.COMPLETED,
      ActiveWorkoutActionTypes.START_WORKOUT,
      ActiveWorkoutActionTypes.STOP_WORKOUT,
      ActiveWorkoutActionTypes.CHANGE_WORKOUT,
      ActiveWorkoutActionTypes.CHANGE_WORKOUT_ACCEPT,
      ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND,
      ActiveWorkoutActionTypes.NEXT_EXERCISE
    ),
    withLatestFrom(state$),
    filter(([action, state]) =>
      action.type === ActiveWorkoutActionTypes.CHANGE_WORKOUT
        ? state.activeWorkout.switchWorkout === null
        : true
    ),
    throttleTime(5000),
    switchMap(([, state]) =>
      state.user.isAuthenticated
        ? from(
            firebase
              .firestore()
              .collection("latestActivity")
              .doc(state.user.id)
              .set(
                {
                  activeWorkout: {
                    ...state.activeWorkout,
                    // Convert Date to Timestamp before sending to firestore.
                    createdAt: firebase.firestore.Timestamp.fromDate(
                      state.activeWorkout.createdAt
                    ),
                  },
                },
                { merge: true }
              )
          ).pipe(
            catchError((err) => {
              console.error("Failed to save activeWorkout", err);
              return of();
            })
          )
        : of(setLocalStorageActiveWorkout(state.activeWorkout))
    ),
    tap(() => console.log("Saved Active Workout")),
    ignoreElements()
  );

/**
 * Checks to see if round needs to be increased or if the workout is actually over
 * when a NEXT_EXERCISE action comes in.
 */
const switchRoundOrCompleteOnNextExerciseEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveWorkoutActionTypes.NEXT_EXERCISE),
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        state.activeWorkout.exercises[0] &&
        state.activeWorkout.exercises[0].id ===
          state.activeWorkout.currentExerciseId
    ),
    map(([, state]) =>
      state.activeWorkout.currentRound + 1 > state.activeWorkout.rounds
        ? completedActiveWorkout()
        : nextRound()
    )
  );

/**
 * Controls exercise time reset.
 */
const resetExerciseTimerEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(
      ActiveWorkoutActionTypes.STOP_WORKOUT,
      ActiveWorkoutActionTypes.COMPLETED
    ),
    mapTo(resetExerciseTimer())
  );

/**
 * Pauses active exercise when changing workouts while active workout is not finished.
 */
const pauseIfSwitchingWorkoutsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveWorkoutActionTypes.CHANGE_WORKOUT),
    withLatestFrom(state$),
    filter(([, state]) => state.activeWorkout.switchWorkout !== null && !state.activeExercise.isPaused),
    mapTo(pauseExercise())
  );

export const activeWorkoutEpics = [
  syncActiveExerciseWithWorkoutEpic,
  saveActiveWorkoutEpic,
  resetExerciseTimerEpic,
  switchRoundOrCompleteOnNextExerciseEpic,
  pauseIfSwitchingWorkoutsEpic,
];
