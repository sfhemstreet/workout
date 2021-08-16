import { firebase } from "../../../firebase";
import { from, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Workout } from "../../../types";
import { fixWorkoutDates } from "./fixWorkoutDates";
import { snapshotsToWorkouts } from "./snapshotToWorkouts";

export const fetchLatestWorkouts$ = from(
  firebase
    .firestore()
    .collection("workouts")
    .where("isShared", "==", true)
    .orderBy("createdAt", "desc")
    .limit(20)
    .get()
).pipe(
  snapshotsToWorkouts(),
  catchError((err) => {
    console.error("Failed to fetch latest workouts.", err);
    return of([] as Workout[]);
  })
);
