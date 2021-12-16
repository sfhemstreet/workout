import { from, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { firebase } from "../../../firebase/firebase";
import { Workout } from "../../../types";
import { Tag } from "../../../types/Tag";
import { snapshotToWorkouts$ } from "./snapshotToWorkouts$";

export const searchWorkoutsByTags$ = (tags: Tag[]) =>
  from(
    firebase
      .firestore()
      .collection("workouts")
      .where("isShared", "==", true)
      .where("tags", "array-contains-any", tags)
      .get()
  ).pipe(
    snapshotToWorkouts$,
    map((workouts) =>
      workouts.sort(
        (a, b) =>
          a.tags.filter((t) => tags.includes(t)).length -
          b.tags.filter((t) => tags.includes(t)).length
      )
    ),
    catchError((err) => {
      console.error("Failed to fetch workouts by tags", err);
      return of([] as Workout[]);
    })
  );

