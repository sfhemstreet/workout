import { from, of, timer } from "rxjs";
import {
  catchError,
  debounceTime,
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
import { endExerciseTone } from "./util/endExerciseTone";
import { REST_PERIOD } from "../../constants";
import { Exercise } from "../../types";
import { firebase } from "../../firebase";
import { setLocalStorageActiveExercise } from "./util/saveLocally";

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
    withLatestFrom(state$),
    // filter actions that keep timer going (some require checking state)
    filter(
      ([action, state]) =>
        action.type === ActiveExerciseActionTypes.END_PAUSE ||
        action.type === ActiveWorkoutActionTypes.START_WORKOUT ||
        (action.type === ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE &&
          state.activeWorkout.isStarted &&
          !state.activeExercise.isPaused &&
          state.activeExercise.duration !== 0) ||
        // If user hits refresh and INIT runs,
        // make sure the time starts playing again.
        (action.type === ActiveExerciseActionTypes.INIT &&
          state.activeWorkout.isStarted &&
          !state.activeExercise.isPaused &&
          !state.activeWorkout.isCompleted)
    ),
    filter(([, state]) =>  state.activeExercise.duration > 0),
    switchMap(() =>
      timer(1000, 1000).pipe(
        takeUntil(
          action$.pipe(
            withLatestFrom(state$),
            // Actions that stop the timer
            filter(
              ([action, state]) =>
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
 * If the last exercise of the last round of a workout is a rest period,
 * this epic makes it skip it.
 */
const skipRestIfLastExerciseAndLastRoundEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveExerciseActionTypes.CHANGE_ACTIVE_EXERCISE),
    withLatestFrom(state$),
    filter(([, state]) => 
      state.activeWorkout.exercises.length > 0
    ),
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
    //debounceTime(2000),
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
  resetExerciseTimerEpic,
  switchTimeAfterZeroEpic,
  switchRoundOrCompleteOnNextExerciseEpic,
  skipRestIfLastExerciseAndLastRoundEpic,
  saveActiveExerciseEpic,
];
