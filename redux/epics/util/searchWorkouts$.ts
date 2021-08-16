import { firebase } from "../../../firebase";
import { combineLatest, from, of } from "rxjs";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { Workout } from "../../../types";
import { removeDuplicates } from "../../../utils/removeDuplicates";
import { snapshotsToWorkouts } from "./snapshotToWorkouts";

export const searchWorkouts$ = (searchInput: string) =>
  of(searchInput).pipe(
    switchMap((searchInput) =>
      combineLatest([
        from(
          firebase
            .firestore()
            .collection("workouts")
            .where("isShared", "==", true)
            .where("tags", "array-contains", searchInput)
            .get()
        ).pipe(
          snapshotsToWorkouts(),
          catchError((err) => {
            console.error("Failed to query workout tags.", err);
            return of([] as Workout[]);
          })
        ),
        from(
          firebase
            .firestore()
            .collection("workouts")
            .where("isShared", "==", true)
            .where("name", "==", searchInput)
            .get()
        ).pipe(
          snapshotsToWorkouts(),
          catchError((err) => {
            console.error("Failed to query workout names.", err);
            return of([] as Workout[]);
          })
        ),
        from(
          firebase
            .firestore()
            .collection("workouts")
            .where("isShared", "==", true)
            .where("creator.name", "==", searchInput)
            .get()
        ).pipe(
          snapshotsToWorkouts(),
          catchError((err) => {
            console.error("Failed to query workout creator names.", err);
            return of([] as Workout[]);
          })
        ),
      ])
    ),
    tap(() => console.log("Search Completed")),
    map(([tags, names, creators]) =>
      removeDuplicates([...tags, ...names, ...creators])
    )
  );
