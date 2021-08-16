import firebase from "firebase";
import { forkJoin, from, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Workout } from "../../../types";
import { removeDuplicates } from "../../../utils/removeDuplicates";
import { fixWorkoutDates } from "./fixWorkoutDates";
import { snapshotsToWorkouts } from "./snapshotToWorkouts";

/**
 * fetchUsersWorkouts$ 
 * 
 * Attempts to fetch from firebase the workouts
 * that the user has created and workouts that they have added thru liking (star).
 *
 * @param userId
 * @param workoutIds
 */
export const fetchUsersWorkouts$ = (userId: string, workoutIds: string[]) =>
  forkJoin({
    shared: from(
      firebase
        .firestore()
        .collection("workouts")
        .where("isShared", "==", true)
        .where("id", "in", workoutIds)
        .get()
    ).pipe(
      snapshotsToWorkouts(),
      catchError((err) => {
        console.error("Error fetching workouts", err);
        return of([] as Workout[]);
      })
    ),
    created: from(
      firebase
        .firestore()
        .collection("workouts")
        .where("creator.id", "==", userId)
        .where("id", "in", workoutIds)
        .get()
    ).pipe(
      snapshotsToWorkouts(),
      catchError((err) => {
        console.error("Error fetching workouts", err);
        return of([] as Workout[]);
      })
    ),
  }).pipe(
    map(({ shared, created }) => removeDuplicates([...shared, ...created])),
    catchError((err) => {
      console.error("Failed to fetch user's workouts.", err);
      return of([] as Workout[]);
    })
  );
