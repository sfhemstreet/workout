import { ofType } from "redux-observable";
import { mapTo } from "rxjs/operators";
import { AppEpic } from "..";
import { SignInModalActionTypes } from "../ducks/signInModal";
import { removeUserError } from "../ducks/user";

const removeUserErrorOnOpenCloseEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(
      SignInModalActionTypes.TOGGLE,
      SignInModalActionTypes.OPEN,
      SignInModalActionTypes.CLOSE
    ),
    mapTo(removeUserError())
  );

export const signInModalEpics = [removeUserErrorOnOpenCloseEpic];
