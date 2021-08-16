import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  catchError,
  delay,
  filter,
  ignoreElements,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from "rxjs/operators";
import { AppEpic } from "..";
import { ActiveWorkoutActionTypes } from "../ducks/activeWorkout";
import {
  signOutFail,
  UserActionTypes,
  userCompletedWorkout,
  userDeleteComplete,
  userDeleteFail,
  userLoginFail,
  userRegisterFail,
} from "../ducks/user";
import { getFirebaseUser$ } from "./util/getFirebaseUser$";
import { getOrCreateTempUser$ } from "./util/getOrCreateTempUser$";
import { myOfType } from "./util/myOfType";
import { firebase } from "../../firebase";
import { deleteUserIfExists$ } from "./util/registerHelpers";
import { createTempUser$ } from "./util/createTempUser$";

/**
 * registerUserEpic
 *
 * Attempts to create a userAuth in FirebaseAuth then create a User in Firebase
 * on REGISTER_USER_BEGIN.
 */
const registerUserEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(UserActionTypes.REGISTER_USER_BEGIN),
    withLatestFrom(state$),
    mergeMap(
      ([
        {
          payload: { email, name, password },
        },
        state,
      ]) =>
        from(
          firebase.auth().createUserWithEmailAndPassword(email, password)
        ).pipe(
          map((userCredentials) => {
            if (userCredentials.user === null) {
              console.error("Err: User is null!");
              throw new Error("User is null!");
            }
            return userCredentials.user;
          }),
          mergeMap((user) =>
            from(user.getIdToken()).pipe(
              mergeMap((token) =>
                ajax({
                  url: "/api/user",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: {
                    user: {
                      id: user.uid,
                      name: name,
                      avatar: `https://robohash.org/${name}`,
                      playSounds: true,
                      theme: state.theme.type,
                      workouts: state.workouts.list.map((workout) =>
                        workout.creator.id === state.user.id
                          ? {
                              ...workout,
                              creator: { ...workout.creator, id: user.uid },
                            }
                          : workout
                      ),
                      completedWorkouts: state.user.workoutsCompleted,
                    },
                    token,
                  },
                }).pipe(
                  mergeMap(() =>
                    getFirebaseUser$({ user, isRegistering: true })
                  ),
                  catchError((err) => {
                    console.error("Register error while creating user.", err);
                    return deleteUserIfExists$;
                  })
                )
              ),
              catchError((err) => {
                console.error("Failed to get user token", err);
                return deleteUserIfExists$;
              })
            )
          ),
          catchError((err) => {
            console.error("Register err: ", err);
            return of(
              userRegisterFail(
                err.code === undefined
                  ? "Sorry, there was an error. Please try again."
                  : err.code === "auth/email-already-in-use"
                  ? "This email is already in use. Did you mean to login?"
                  : err.code === "auth/network-request-failed"
                  ? "There was a network failure, please try again."
                  : err.code === "auth/web-storage-unsupported"
                  ? "This browser is not supported or 3rd party cookies and data may be disabled."
                  : err.code === "auth/cors-unsupported"
                  ? "This browser is not supported."
                  : "There was an error, please try again."
              )
            );
          })
        )
    )
  );

/**
 * signInUserEpic
 *
 * Attempts to sign the user in to Firebase on LOGIN_USER_BEGIN.
 */
const signInUserEpic: AppEpic = (action$) =>
  action$.pipe(
    myOfType(UserActionTypes.LOGIN_USER_BEGIN),
    mergeMap(({ payload: { email, password } }) =>
      from(
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      ).pipe(
        mergeMap(() =>
          from(
            firebase.auth().signInWithEmailAndPassword(email, password)
          ).pipe(
            mergeMap((userCredentials) =>
              userCredentials.user !== null
                ? getFirebaseUser$({ user: userCredentials.user })
                : of(userLoginFail("Email or password do not match records."))
            ),
            catchError((err) =>
              of(
                userLoginFail(
                  err.code === undefined
                    ? "There was an error, please try again."
                    : err.code === "auth/user-not-found" ||
                      err.code === "auth/wrong-password"
                    ? "Email or password do not match records."
                    : err.code === "auth/email-already-in-use"
                    ? "This email is already in use."
                    : err.code === "auth/network-request-failed"
                    ? "There was a network failure, please try again."
                    : err.code === "auth/web-storage-unsupported"
                    ? "This browser is not supported or 3rd party cookies and data may be disabled."
                    : err.code === "auth/cors-unsupported"
                    ? "This browser is not supported."
                    : "There was an error, please try again."
                )
              )
            )
          )
        ),
        catchError((err) => {
          console.error("Error at login: ", err);
          return of(
            userLoginFail("Regrettably there was an error. Please try again.")
          );
        })
      )
    )
  );

/**
 * signOutUserEpic
 *
 * When user signs out replace them with a temp user profile.
 */
const signOutUserEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.SIGN_OUT_BEGIN),
    delay(500),
    mergeMap(() =>
      from(firebase.auth().signOut()).pipe(
        catchError((err) => {
          console.error("Error occurred while trying to sign out user.", err);
          return of(signOutFail());
        })
      )
    ),
    mergeMap(() => getOrCreateTempUser$)
  );

/**
 * deleteUserEpic
 *
 * When a user starts the delete process,
 * attempt to delete the user doc from firestore
 * then delete the user from firebase auth.
 */
const deleteUserEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(UserActionTypes.DELETE_USER_BEGIN),
    tap(
      () =>
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined" &&
        window.localStorage.clear()
    ),
    mergeMap(() =>
      of(firebase.auth().currentUser).pipe(
        mergeMap((user) =>
          user === null
            ? createTempUser$()
            : from(
                firebase.firestore().collection("users").doc(user.uid).delete()
              ).pipe(
                mergeMap(() =>
                  from(user.delete()).pipe(
                    map(() => userDeleteComplete()),
                    catchError((err) => {
                      console.error("Failed to delete user auth.", err);
                      return of(userDeleteFail());
                    })
                  )
                ),
                catchError((err) => {
                  console.error("Failed to delete user.", err);
                  return of(userDeleteFail());
                })
              )
        )
      )
    ),
    catchError((err) => {
      console.error("Error deleting user.", err);
      return of(userDeleteFail());
    })
  );

const changeUsernameEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(UserActionTypes.CHANGE_NAME),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    mergeMap(([action, state]) =>
      from(
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.id)
          .update({ name: action.payload.name })
      ).pipe(
        catchError((err) => {
          console.error("failed to update username.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

const changeAvatarEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(UserActionTypes.CHANGE_AVATAR),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    mergeMap(([action, state]) =>
      from(
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.id)
          .update({ avatar: action.payload.avatar })
      ).pipe(
        catchError((err) => {
          console.error("failed to update avatar.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

/**
 * completedAWorkoutEpic
 *
 * When user completes a workout add it to their completedWorkouts
 */
const completedAWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveWorkoutActionTypes.COMPLETED),
    withLatestFrom(state$),
    map(([, state]) =>
      userCompletedWorkout(state.activeWorkout.id, state.activeWorkout.name)
    )
  );

/**
 * completedAWorkoutEpic
 *
 * When a logged in user completes a workout add it to their completedWorkouts in firebase
 */
//  const addCompletedWorkoutToFirebaseEpic: AppEpic = (action$, state$) =>
//   action$.pipe(
//    myOfType(ActiveWorkoutActionTypes.COMPLETED),
//    withLatestFrom(state$),
//    filter(([,state]) => state.user.isAuthenticated),
//    map(([,state]) => ({ user: state.user, completedWorkout: state.activeWorkout })),
//    mergeMap(({ user, completedWorkout }) =>
//     from(

//     )
//    )
//  );

export const userEpics = [
  registerUserEpic,
  signInUserEpic,
  signOutUserEpic,
  changeUsernameEpic,
  changeAvatarEpic,
  deleteUserEpic,
  completedAWorkoutEpic,
];
