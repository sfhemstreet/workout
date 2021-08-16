import { ofType } from "redux-observable";
import { filter, ignoreElements, tap, withLatestFrom } from "rxjs/operators";
import { AppEpic } from "..";
import { UserActionTypes } from "../ducks/user";
import { WorkoutsActionTypes } from "../ducks/workouts";
import {
  setLocalStorageUser,
  setLocalStorageWorkouts,
} from "./util/saveLocally";

/**
 * These Epics save the user, and workouts state, 
 * when a user is signed out.
 * 
 * This allows state to persist thru page refreshes.
 */

const saveWorkoutsEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      WorkoutsActionTypes.REMOVE,
      WorkoutsActionTypes.DELETE,
      WorkoutsActionTypes.CREATE,
      WorkoutsActionTypes.ADD,
      WorkoutsActionTypes.EDIT,
      WorkoutsActionTypes.RESTORE
    ),
    withLatestFrom(state$),
    filter(([,state]) => !state.user.isAuthenticated),
    tap(([, state]) => setLocalStorageWorkouts(state.workouts)),
    ignoreElements()
  );

const saveUserEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      UserActionTypes.ANONYMOUS_REGISTER,
      UserActionTypes.ANONYMOUS_SIGN_IN,
    ),
    withLatestFrom(state$),
    filter(([,state]) => !state.user.isAuthenticated),
    tap(([, state]) => setLocalStorageUser(state.user)),
    ignoreElements()
  );

export const saveEpics = [
  saveWorkoutsEpic,
  saveUserEpic,
];
