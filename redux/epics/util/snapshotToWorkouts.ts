import { pipe } from "rxjs";
import { map, tap } from "rxjs/operators";
import { firebase } from "../../../firebase";
import { fixWorkoutDates } from "./fixWorkoutDates";

/**
 * snapshotsToWorkouts
 *
 * Converts workout snapshot to Workout[].
 *
 * @returns Workout[]
 */
export const snapshotsToWorkouts = () =>
  pipe(
    map(
      (
        snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
      ) => snapshot.docs.map((doc) => doc.data())
    ),
    fixWorkoutDates(),
  );
