import { from, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { firebase } from "../../../firebase";
import { Workout } from "../../../types";
import { fixWorkoutDates } from "./fixWorkoutDates";
import { snapshotsToWorkouts } from "./snapshotToWorkouts";

export const fetchPopularWorkouts$ = from(
  firebase
    .firestore()
    .collection("workouts")
    .where("isShared", "==", true)
    .where("stars", ">", 0)
    .orderBy("stars", "desc")
    .limit(20)
    .get()
).pipe(
  snapshotsToWorkouts(),
  catchError((err) => {
    console.error("Failed to fetch popular workouts.", err);
    return of([] as Workout[]);
  })
);
