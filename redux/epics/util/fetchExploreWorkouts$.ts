import { firebase } from "../../../firebase/firebase";
import { from, of } from "rxjs";
import {
  catchError,
  map,
  mergeMap,
} from "rxjs/operators";
import { Workout } from "../../../types";
import { snapshotToWorkouts$ } from "./snapshotToWorkouts$";
import { Difficulty } from "../../../types/Difficulty";
import { Rating } from "../../../types/Rating";

export const DEFAULT_FETCH_WORKOUTS_LIMIT = 10;

export type FetchWorkoutsOptions = {
  type: "LATEST" | "POPULAR",
  startAt?: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
  limit?: number;
  difficulty?: Difficulty;
  rating?: Rating;
};

/**
 * fetchLatestWorkouts$
 *
 * Fetches most recently created workouts.
 *
 * Returns an object with the workouts,
 * and a snapshot document which can be used to paginate results on subsequent queries.
 *
 * @param type "LATEST" or "POPULAR", sorts results by createdAt date or rating
 * @param startAt document reference used to paginate results
 * @param limit amount of workouts fetched in each request
 * @param difficulty Difficulty filter, if given only gets workouts with matching difficulty
 * @param rating rating filter, if given only gets workouts with rating >= 
 */
export const fetchExploreWorkouts$ = ({
  type,
  startAt,
  limit = DEFAULT_FETCH_WORKOUTS_LIMIT,
  difficulty,
  rating,
}: FetchWorkoutsOptions) => {
  let query = firebase
    .firestore()
    .collection("workouts")
    .where("isShared", "==", true);

  if (difficulty) {
    query = query.where("difficulty", "==", difficulty);
  }

  if (rating) {
    query = query.where("rating", ">=", rating).orderBy("rating", "desc");
  }

  if (type === "LATEST") {
    query = query.orderBy("createdAt", "desc");
  } else if (type === "POPULAR" && !rating) {
    query = query.orderBy("rating", "desc");
  }

  // We add 1 to the limit so that we can return the nextDoc.
  query = query.limit(limit + 1);

  if (startAt) {
    query = query.startAt(startAt);
  }

  return fetchWorkoutsHelper$(query.get());
};

export const fetchWorkoutsHelper$ = (
  promise: Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  >
) =>
  from(promise).pipe(
    map((snapshot) => ({
      // nextDoc is the last doc in the snapshot,
      // because we added 1 to the limit.
      nextDoc:
        snapshot.docs.length > 1
          ? snapshot.docs[snapshot.docs.length - 1]
          : undefined,
      snapshot,
    })),
    mergeMap(({ nextDoc, snapshot }) =>
      of(snapshot).pipe(
        snapshotToWorkouts$,
        map((workouts) => ({
          nextDoc,
          // We want to honor the limit param so we remove the last workout.
          // But if there is only one workout we give it to them.
          workouts: workouts.length > 1 ? workouts.slice(0, -1) : workouts,
        }))
      )
    ),
    catchError((err) => {
      console.error("Failed to fetch workouts.", err);
      return of({ nextDoc: undefined, workouts: [] as Workout[] });
    })
  );
