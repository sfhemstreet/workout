import { from, of } from "rxjs";
import {
  catchError,
  filter,
  ignoreElements,
  map,
  mapTo,
  mergeMap,
  withLatestFrom,
} from "rxjs/operators";

import { firebase } from "../../firebase";
import { AppEpic } from "..";
import {
  changeActiveWorkout,
  DEFAULT_ACTIVE_WORKOUT_STATE,
} from "../ducks/activeWorkout";
import { WorkoutsActionTypes } from "../ducks/workouts";
import { myOfType } from "./util/myOfType";

/**
 * addWorkoutEpic
 *
 * When a logged in user ADDs a workout,
 * this epic attempts to append the workout to the user's document.
 */
const addWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.ADD),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    mergeMap(([action, state]) =>
      from(
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.id)
          .update({
            workouts: firebase.firestore.FieldValue.arrayUnion(
              action.payload.workout.id
            ),
          })
      ).pipe(
        catchError((err) => {
          console.error("Failed to add workout to user document.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

/**
 * createWorkoutEpic
 *
 * When a logged in user creates a workout with CREATE/CLONE,
 * this epic attempts to create a workout document for it in the workouts collection,
 * and adds the workout to the user's workouts array in their user document.
 *
 * Uses a batch approach so that it works offline.
 */
const createWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.CREATE, WorkoutsActionTypes.CLONE),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    mergeMap(([action, state]) =>
      from(
        (async function () {
          const db = firebase.firestore();
          const batch = db.batch();
          const workoutsRef = db
            .collection("workouts")
            .doc(
              action.type === WorkoutsActionTypes.CREATE
                ? action.payload.workout.id
                : action.payload.newId
            );
          const userRef = db.collection("users").doc(state.user.id);

          batch.set(workoutsRef, {
            ...action.payload.workout,
            // Convert Date to Timestamp before sending to firestore.
            createdAt: firebase.firestore.Timestamp.fromDate(
              action.payload.workout.createdAt
            ),
          });
          batch.update(userRef, {
            workouts: firebase.firestore.FieldValue.arrayUnion(
              action.type === WorkoutsActionTypes.CREATE
                ? action.payload.workout.id
                : action.payload.newId
            ),
          });

          return batch.commit();
        })()
      ).pipe(
        catchError((err) => {
          console.error("Failed to save workout to firestore.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

/**
 * removeWorkoutEpic
 *
 * When a logged in user removes a workout with REMOVE,
 * this epic attempts to remove the workout from the user's document.
 */
const removeWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.REMOVE),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    mergeMap(([action, state]) =>
      from(
        firebase
          .firestore()
          .collection("users")
          .doc(state.user.id)
          .update({
            workouts: firebase.firestore.FieldValue.arrayRemove(
              action.payload.workoutId
            ),
          })
      ).pipe(
        catchError((err) => {
          console.error("Failed to remove workout from user.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

const updateWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.EDIT),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    map(([action]) =>
      // Convert createdAt Date to Timestamp if it exists in changes.
      typeof action.payload.changes.createdAt !== "undefined"
        ? {
            ...action,
            payload: {
              ...action.payload,
              changes: {
                ...action.payload.changes,
                createdAt: firebase.firestore.Timestamp.fromDate(
                  action.payload.changes.createdAt
                ),
              },
            },
          }
        : action
    ),
    mergeMap((action) =>
      from(
        firebase
          .firestore()
          .collection("workouts")
          .doc(action.payload.workoutId)
          .update(action.payload.changes)
      ).pipe(
        catchError((err) => {
          console.error("Failed to update workout.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

/**
 * deleteWorkoutEpic
 *
 * When a logged in user deletes a workout with DELETE,
 * this epic attempts to delete the workout document for it,
 * and removes the workout from the user's document.
 *
 * Uses a batch approach so that it works offline.
 */
const deleteWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.DELETE),
    withLatestFrom(state$),
    filter(([, state]) => state.user.isAuthenticated),
    mergeMap(([action, state]) =>
      from(
        (async function () {
          const db = firebase.firestore();
          const batch = db.batch();
          const workoutsRef = db
            .collection("workouts")
            .doc(action.payload.workoutId);
          const userRef = db.collection("users").doc(state.user.id);

          batch.delete(workoutsRef);
          batch.update(userRef, {
            workouts: firebase.firestore.FieldValue.arrayRemove(
              action.payload.workoutId
            ),
          });

          return batch.commit();
        })()
      ).pipe(
        catchError((err) => {
          console.error("Failed to delete workout.", err);
          return of();
        })
      )
    ),
    ignoreElements()
  );

/**
 * syncWorkoutChangesEpic
 *
 * When a change occurs to a workout and the workout is the current activeWorkout,
 * sync the changes.
 */
const syncWorkoutChangesEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.EDIT),
    withLatestFrom(state$),
    filter(
      ([action, state]) =>
        state.workouts.list.length > 0 &&
        action.payload.workoutId === state.activeWorkout.id
    ),
    map(([action, state]) =>
      changeActiveWorkout(
        state.workouts.list.reduce((e1, e2) =>
          e2.id === action.payload.workoutId ? e2 : e1
        )
      )
    )
  );

/**
 * removeActiveWorkoutOnDeleteWorkoutEpic
 *
 * If a user deletes or removes a workout and that same workout is the activeWorkout
 * this epic removes the activeWorkout as well.
 */
const removeActiveWorkoutOnDeleteWorkoutEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    myOfType(WorkoutsActionTypes.REMOVE, WorkoutsActionTypes.DELETE),
    withLatestFrom(state$),
    filter(
      ([action, state]) => state.activeWorkout.id === action.payload.workoutId
    ),
    mapTo(changeActiveWorkout(DEFAULT_ACTIVE_WORKOUT_STATE))
  );

export const workoutsEpics = [
  createWorkoutEpic,
  deleteWorkoutEpic,
  addWorkoutEpic,
  removeWorkoutEpic,
  updateWorkoutEpic,
  syncWorkoutChangesEpic,
  removeActiveWorkoutOnDeleteWorkoutEpic,
];
