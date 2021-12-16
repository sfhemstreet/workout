import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mergeMap,
  withLatestFrom,
} from "rxjs/operators";
import { firebase } from "../../firebase/firebase";
import { AppEpic } from "..";
import { SoundActionTypes } from "../ducks/sound";
import { ActiveExerciseActionTypes } from "../ducks/activeExercise";
import { endExerciseTone } from "./util/endExerciseTone";
import { setLocalStorageSound } from "./util/saveLocally";

const saveSoundOnChangeEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(SoundActionTypes.SET, SoundActionTypes.TOGGLE),
    withLatestFrom(state$),
    mergeMap(([, state]) =>
      state.user.isAuthenticated
        ? from(
            firebase
              .firestore()
              .collection("users")
              .doc(state.user.id)
              .update({ playSounds: state.sound.isOn })
          ).pipe(
            catchError((err) => {
              console.error("Failed to update sound", err);
              return of();
            })
          )
        : of(setLocalStorageSound(state.sound))
    ),
    ignoreElements()
  );

/**
 * Controls playing tone for last 3 seconds of an exercise.
 */
const playSoundLast3SecondsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveExerciseActionTypes.DECREMENT_TIME),
    withLatestFrom(state$),
    filter(
      ([, state]) =>
        state.sound.isOn &&
        state.activeExercise.currentTime <= 3 &&
        state.activeExercise.currentTime >= 0 &&
        !state.activeExercise.isPaused &&
        state.activeWorkout.isStarted
    ),
    map(([, state]) => endExerciseTone(state.activeExercise.currentTime === 0)),
    ignoreElements()
  );

export const soundEpics = [saveSoundOnChangeEpic, playSoundLast3SecondsEpic];
