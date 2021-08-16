import { ofType } from "redux-observable";
import {
  catchError,
  debounceTime,
  filter,
  ignoreElements,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { firebase } from "../../firebase";

import { AppEpic } from "..";
import {
  ActiveExerciseActionTypes,
  changeActiveExercise,
  DEFAULT_ACTIVE_EXERCISE_STATE,
} from "../ducks/activeExercise";
import { ActiveWorkoutActionTypes } from "../ducks/activeWorkout";
import { setLocalStorageActiveWorkout } from "./util/saveLocally";
import { from, of } from "rxjs";



// When ActiveWorkout changes, update ActiveExercise
const syncActiveExerciseWithWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      ActiveWorkoutActionTypes.STOP_WORKOUT,
      ActiveWorkoutActionTypes.CHANGE_WORKOUT,
      ActiveWorkoutActionTypes.PREV_EXERCISE,
      ActiveWorkoutActionTypes.NEXT_EXERCISE,
      ActiveWorkoutActionTypes.CHANGE_CURRENT_EXERCISE,
      ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND,
      ActiveWorkoutActionTypes.COMPLETED
    ),
    withLatestFrom(state$),
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
      ActiveWorkoutActionTypes.INCREMENT_CURRENT_ROUND,
      ActiveWorkoutActionTypes.NEXT_EXERCISE
    ),
    debounceTime(2000),
    withLatestFrom(state$),
    tap(([a, s]) => console.log(s.activeWorkout)),
    switchMap(([action, state]) =>
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
              console.error("Failed to save activeWorkout");
              return of();
            })
          )
        : of(setLocalStorageActiveWorkout(state.activeWorkout))
    ),
    tap(() => console.log("Saved Active Workout")),
    ignoreElements()
  );

export const activeWorkoutEpics = [
  syncActiveExerciseWithWorkoutEpic,
  saveActiveWorkoutEpic,
];


