import { from, of, timer } from "rxjs";
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mapTo,
  mergeMap,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
  withLatestFrom,
} from "rxjs/operators";
import { AppEpic } from "..";
import {
  ActiveExerciseActionTypes,
  decrementExerciseTimer,
  resetExerciseTimer,
} from "../ducks/activeExercise";
import {
  ActiveWorkoutActionTypes,
  completedActiveWorkout,
  nextExercise,
  nextRound,
} from "../ducks/activeWorkout";
import { ofType } from "redux-observable";
import { REST_PERIOD } from "../../constants";
import { Exercise } from "../../types";
import { firebase } from "../../firebase/firebase";
import { setLocalStorageActiveExercise } from "./util/saveLocally";
import router from "next/router";

/**
 * Active Exercise Epics
 *
 * These epics keep the activeExercise in sync
 * with activeWorkout and workouts, and control the
 * timer.
 */

/**
 * Controls timer that decrements exercise current time.
 *
 * Only starts and stops timer.
 */
const resumePauseExerciseEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    filter(() => router.pathname === "/workout"),
    withLatestFrom(state$),
    // Actions that trigger decrement exercise timer
    filter(
      ([action]) =>
        action.type === ActiveExerciseActionTypes.END_PAUSE ||
        action.type === ActiveWorkoutActionTypes.START_WORKOUT ||
        action.type === ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE ||
        action.type === ActiveExerciseActionTypes.INIT
    ),
    // State that is required for decrement
    filter(
      ([, state]) =>
        state.activeExercise.duration > 0 && 
        state.activeWorkout.isStarted &&
        !state.activeWorkout.isCompleted &&
        !state.activeExercise.isPaused
    ),
    tap(([action, state]) => console.log(action.type, state.activeExercise.isPaused)),
    switchMap(() =>
      timer(1000, 1000).pipe(
        takeUntil(
          action$.pipe(
            withLatestFrom(state$),
            // Actions / state that stop the timer
            filter(
              ([action, state]) =>
                router.pathname !== "/workout" ||
                action.type === ActiveExerciseActionTypes.START_PAUSE ||
                action.type === ActiveWorkoutActionTypes.STOP_WORKOUT ||
                action.type === ActiveWorkoutActionTypes.COMPLETED ||
                (action.type ===
                  ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE &&
                  (!state.activeWorkout.isStarted ||
                    state.activeExercise.isPaused ||
                    state.activeExercise.duration === 0)) ||
                (action.type === ActiveExerciseActionTypes.INIT &&
                  (!state.activeWorkout.isStarted ||
                    state.activeExercise.isPaused))
            )
          )
        ),
        mapTo(decrementExerciseTimer())
      )
    )
  );



/**
 * When the timer hits -1, this epic sends an action to switch to the next exercise.
 * If the exercise is the last exercise of a round it switches to the next round.
 * If all the rounds and exercises are competed it sends a completedActiveWorkout action.
 */
const switchTimeAfterZeroEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveExerciseActionTypes.DECREMENT_TIME),
    withLatestFrom(state$),
    filter(([_, state]) => state.activeExercise.currentTime === -1),
    map(([_, state]) => {
      const nextExerciseIndex =
        state.activeWorkout.exercises.findIndex(
          (e) => e.id === state.activeExercise.id
        ) + 1;

      if (nextExerciseIndex >= state.activeWorkout.exercises.length) {
        return state.activeWorkout.currentRound + 1 > state.activeWorkout.rounds
          ? completedActiveWorkout()
          : nextRound();
      }

      return nextExercise();
    })
  );



/**
 * If the last exercise of the last round of a workout is a rest period,
 * this epic makes it skip it.
 */
const skipRestIfLastExerciseAndLastRoundEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE),
    withLatestFrom(state$),
    filter(([, state]) => state.activeWorkout.exercises.length > 0),
    filter(
      ([, state]) =>
        state.activeWorkout.currentRound === state.activeWorkout.rounds &&
        state.activeExercise.name === REST_PERIOD &&
        state.activeWorkout.exercises.reduce(
          (acc: boolean, curr: Exercise, currIndex, arr) =>
            curr.id === state.activeExercise.id && currIndex + 1 === arr.length
              ? true
              : acc,
          false
        )
    ),
    mapTo(completedActiveWorkout())
  );

const saveActiveExerciseEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE,
      ActiveExerciseActionTypes.DECREMENT_TIME,
      ActiveExerciseActionTypes.END_PAUSE,
      ActiveExerciseActionTypes.RESET_TIME,
      ActiveExerciseActionTypes.START_PAUSE
    ),
    throttleTime(5000),
    withLatestFrom(state$),
    mergeMap(([, state]) =>
      state.user.isAuthenticated
        ? from(
            firebase
              .firestore()
              .collection("latestActivity")
              .doc(state.user.id)
              .set(
                {
                  activeExercise: state.activeExercise,
                },
                { merge: true }
              )
          ).pipe(
            catchError((err) => {
              console.error("Failed to save active exercise", err);
              return of();
            })
          )
        : of(setLocalStorageActiveExercise(state.activeExercise))
    ),
    tap(() => console.log("Saved Active Exercise")),
    ignoreElements()
  );

export const activeExercisesEpics = [
  resumePauseExerciseEpic,
  switchTimeAfterZeroEpic,
  skipRestIfLastExerciseAndLastRoundEpic,
  saveActiveExerciseEpic,
];
