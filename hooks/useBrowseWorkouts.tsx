import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { of } from "rxjs";
import { filter, switchMap, tap } from "rxjs/operators";
import { firebase } from "../firebase/firebase";
import { changeActiveWorkout } from "../redux/ducks/activeWorkout";

import {
  DEFAULT_FETCH_WORKOUTS_LIMIT,
  fetchExploreWorkouts$,
} from "../redux/epics/util/fetchExploreWorkouts$";
import { useAppDispatch } from "../redux/hooks";
import { Workout } from "../types";
import { Difficulty } from "../types/Difficulty";
import { Rating } from "../types/Rating";
import { removeDuplicates } from "../utils/removeDuplicates";

type UseBrowseWorkoutsState = {
  isLoading: boolean;
  workouts: Workout[];
  nextDocument:
    | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    | undefined;
  fetchMarker: number;
};

/** When pagination is exhausted, ie nothing left to fetch, this will let us know. */
const FETCH_FLAG = -1;

const DEFAULT_USE_BROWSE_WORKOUT_STATE: UseBrowseWorkoutsState = {
  isLoading: true,
  workouts: [],
  nextDocument: undefined,
  fetchMarker: 1,
};

export type WorkoutsSortType = "POPULAR" | "LATEST";

type UseBrowseWorkoutsOptions = {
  sort?: WorkoutsSortType;
  limit?: number;
  difficulty?: Difficulty;
  rating?: Rating;
};

/**
 * useBrowseWorkouts
 *
 * Hook for fetching the latest or most popular workouts in a paginated fashion.
 *
 * @param options "POPULAR" | "LATEST" defaults to popular
 * @returns `isLoading` boolean, true while fetch request is active
 * @returns `workouts` paginated results
 * @returns `getMoreWorkouts` function to fetch next batch of workouts
 * @returns `isExhausted` boolean that indicates all possible workouts have been loaded
 */
export function useBrowseWorkouts({
  sort = "POPULAR",
  limit = DEFAULT_FETCH_WORKOUTS_LIMIT,
  difficulty,
  rating,
}: UseBrowseWorkoutsOptions) {
  // We keep track of pagination using by nextDocument as our startAt param
  // and trigger new fetch requests by incrementing the fetchMarker.
  const [{ isLoading, workouts, nextDocument, fetchMarker }, setState] =
    useState<UseBrowseWorkoutsState>(DEFAULT_USE_BROWSE_WORKOUT_STATE);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getMoreWorkouts = () => {
    if (fetchMarker > 0)
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        fetchMarker: prevState.fetchMarker + 1,
      }));
  };

  const goToWorkout = (workoutId: string) => {
    const workout = workouts.reduce(
      (acc: null | Workout, curr) => (curr.id === workoutId ? curr : acc),
      null
    );
    if (!workout) return;
    dispatch(changeActiveWorkout(workout));
    router.push({ pathname: "/workout", query: { id: workout.id } });
  };

  // Fetches workouts when fetchMarker, sort, or limit changes.
  useEffect(() => {
    const subscription$ = of({ fetchMarker, limit, sort, difficulty, rating })
      .pipe(
        // This filter keeps us from running fetch
        // twice on mount (the sort useEffect below will make this fetch once)
        // and when the resource is exhausted.
        filter(({ fetchMarker }) => fetchMarker > 0),
        switchMap(({ fetchMarker, limit, sort }) =>
          fetchExploreWorkouts$({
            type: sort,
            startAt: nextDocument,
            limit,
            difficulty,
            rating,
          }).pipe(
            tap(({ nextDoc, workouts }) =>
              setState((prevState) => {
                // When all possible paginated results are pulled,
                // Firestore will sometimes go to top of it's list and we will have duplicate workouts.
                // So here we check that the nextDoc exists, we got results back, and we check for duplicates.
                // If we any of these is true it is exhausted.
                const isExhausted =
                  nextDoc === undefined ||
                  workouts.length < limit ||
                  // Check for duplicates
                  prevState.workouts.some((w1) =>
                    // Add the nextDoc workout to the workouts to check
                    [...workouts, nextDoc.data()].find((w2) => w1.id === w2.id)
                  );

                return {
                  isLoading: false,
                  fetchMarker: isExhausted ? FETCH_FLAG : fetchMarker,
                  nextDocument: nextDoc,
                  workouts: isExhausted
                    ? removeDuplicates([...prevState.workouts, ...workouts])
                    : [...prevState.workouts, ...workouts],
                };
              })
            )
          )
        )
      )
      .subscribe();

    return () => subscription$.unsubscribe();
  }, [fetchMarker]);

  // Resets workouts and starts new fetch process when sort, difficulty, or rating changes.
  // Also fetches workouts on mount by incrementing the fetchMarker from 0 to 1 (so that we don't fetch twice on mount)
  useEffect(() => {
    setState(({ fetchMarker }) => ({
      isLoading: true,
      workouts: [],
      // Makes sure we reset fetchMaker if we exhausted previous resource.
      fetchMarker: fetchMarker >= 0 ? fetchMarker + 1 : 1,
      nextDocument: undefined,
    }));
  }, [sort, limit, difficulty, rating]);

  return {
    isLoading,
    workouts,
    getMoreWorkouts,
    isExhausted: fetchMarker === FETCH_FLAG,
    goToWorkout,
  };
}
