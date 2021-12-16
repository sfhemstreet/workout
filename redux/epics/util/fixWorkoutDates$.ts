import { of, pipe } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Workout } from "../../../types";

/**
 * fixWorkoutDates
 *
 * Pipe-able operator that converts workouts `createdAt` properties from
 * firestore timestamp object to JS Date object.
 */
export const fixWorkoutDates$ =
  pipe(
    map((ws: any[]) => ws.map(fixWorkoutDate)),
    catchError((err) => {
      console.error("Failed to convert dates.", err);
      return of([] as Workout[]);
    })
  );

/**
 * fixWorkoutDate
 * 
 * Takes workout document from firestore and converts timestamp to Date.
 *
 * @param workout workout document from firestore
 */
export const fixWorkoutDate = <T extends Workout>(workout: any): T => {
  if (typeof workout.createdAt === "string")
    return {
      ...workout,
      createdAt: new Date(workout.createdAt),
    };

  if (typeof workout.createdAt?.toDate === "function")
    return {
      ...workout,
      createdAt: workout.createdAt.toDate(),
    };

  return workout;
};
