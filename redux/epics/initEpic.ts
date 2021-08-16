import { firebase } from "../../firebase";

import { ofType } from "redux-observable";
import { map, switchMap } from "rxjs/operators";
import { AppEpic } from "..";
import { UserActionTypes } from "../ducks/user";

import { getFirebaseUser$ } from "./util/getFirebaseUser$";
import { getOrCreateTempUser$ } from "./util/getOrCreateTempUser$";

const initEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.INIT),
    map(() => firebase.auth().currentUser),
    switchMap((user) =>
      user === null
        ? getOrCreateTempUser$
        : getFirebaseUser$({ user, isInit: true })
    )
  );

export const initEpics = [initEpic];
