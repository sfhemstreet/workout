import { firebase } from "../firebase/firebase";
import { useEffect } from "react";
import { from, of, Subject } from "rxjs";
import {
  debounceTime,
  switchMap,
  map,
  catchError,
  filter,
} from "rxjs/operators";
import { USERNAME_LENGTH } from "../components/SignIn/constants";

/**
 * useIsUsernameUnique
 *
 * Hook used to check if username is unique as the user types.
 *
 * To use, the subject must get usernames to check 'onNext'
 *
 * @param subject rxjs Subject that gets username's onNext'd to it
 * @param func function to call when result comes in
 */
export function useIsUsernameUnique(
  subject: Subject<string>,
  func: (isUnique: boolean) => void
) {
  useEffect(() => {
    const usernameSubscription$ = subject
      .pipe(
        debounceTime(400),
        filter((username) => username.trim().length >= USERNAME_LENGTH.min),
        switchMap((username) =>
          from(
            firebase
              .firestore()
              .collection("users")
              .where("name", "==", username)
              .get()
          ).pipe(
            map((snapshot) => func(snapshot.empty)),
            catchError((err) => {
              console.error("Erroring checking username", err);
              return of(false);
            })
          )
        ),
      )
      .subscribe();

    return () => usernameSubscription$.unsubscribe();
  }, []);
}
