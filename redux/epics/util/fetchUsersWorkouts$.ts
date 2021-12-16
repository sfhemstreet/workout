import firebase from "firebase";
import { forkJoin, from, Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Workout } from "../../../types";
import { removeDuplicates } from "../../../utils/removeDuplicates";
import { snapshotToWorkouts$ } from "./snapshotToWorkouts$";

/**
 * fetchUsersWorkouts$
 *
 * Attempts to fetch from firebase the workouts
 * that the user has created and workouts that they have added thru liking (star).
 *
 * @param userId
 * @param workoutIds
 */
export const fetchUsersWorkouts$ = (
  userId: string,
  workoutIds: string[]
): Observable<Workout[]> =>
  forkJoin({
    liked: likedWorkouts$(workoutIds),
    created: from(
      firebase
        .firestore()
        .collection("workouts")
        .where("creator.id", "==", userId)
        .get()
    ).pipe(
      snapshotToWorkouts$,
      catchError((err) => {
        console.error("Error fetching workouts", err);
        return of([] as Workout[]);
      })
    ),
  }).pipe(
    map(({ liked, created }) => removeDuplicates([...liked, ...created])),
    catchError((err) => {
      console.error("Failed to fetch user's workouts.", err);
      return of([] as Workout[]);
    })
  );

/**
 * likedWorkouts$
 *
 * Fetches the user's liked workouts.
 *
 * It circumvents the firestore limit of 10 items in an 'in' query
 * by breaking up workoutIds into multiple arrays of size 10
 * and sending multiple parallel queries.
 *
 * @param workoutIds
 */
const likedWorkouts$ = (workoutIds: string[]): Observable<Workout[]> => {
  const queries: string[][] = [];
  // Max 10 items in firestore 'in' query
  const querySize = 10;

  // Build array of arrays of querySize length
  for (let i = 0; i < workoutIds.length; i += querySize) {
    queries.push(workoutIds.slice(i, i + querySize));
  }

  return forkJoin(
    queries.map((ids) =>
      from(
        firebase
          .firestore()
          .collection("workouts")
          .where("isShared", "==", true)
          .where("id", "in", ids)
          .get()
      ).pipe(
        snapshotToWorkouts$,
        catchError((err) => {
          console.error("Error fetching workouts", err);
          return of([] as Workout[]);
        })
      )
    )
  ).pipe(map((arrayOfArrays) => arrayOfArrays.flat()));
};
