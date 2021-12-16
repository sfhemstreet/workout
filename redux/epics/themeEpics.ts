import { firebase } from "../../firebase/firebase";
import { ofType } from "redux-observable";
import {
  catchError,
  filter,
  ignoreElements,
  map,
  switchMap,
  withLatestFrom,
} from "rxjs/operators";
import { AppEpic } from "..";
import { ThemeActionTypes } from "../ducks/theme";
import { from, of } from "rxjs";
import { setLocalStorageTheme } from "./util/saveLocally";
import { userAvatarChange } from "../ducks/user";

/**
 * saveThemeEpic
 *
 * Attempt to save theme in firestore when a logged in user changes the theme.
 * Save theme to localStorage when not authenticated.
 */
const saveThemeEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ThemeActionTypes.SET, ThemeActionTypes.TOGGLE),
    withLatestFrom(state$),
    switchMap(([action, state]) =>
      state.user.isAuthenticated
        ? from(
            firebase
              .firestore()
              .collection("users")
              .doc(state.user.id)
              .update({ theme: state.theme.type })
          ).pipe(
            catchError((err) => {
              console.error("Failed to update theme in Firestore.", err);
              return of();
            })
          )
        : of(
            setLocalStorageTheme(
              action.type === ThemeActionTypes.SET
                ? action.payload.themeType
                : state.theme.type
            )
          )
    ),
    ignoreElements()
  );

export const themeEpics = [saveThemeEpic];
