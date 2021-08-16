import isEqual from "lodash.isequal";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { firebase } from "../firebase";
import { Workout } from "../components/Workout";
import { pauseExercise, resumeExercise } from "../redux/ducks/activeExercise";
import {
  changeActiveWorkout,
  nextExercise,
  previousExercise,
  startActiveWorkout,
  stopActiveWorkout,
} from "../redux/ducks/activeWorkout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fixWorkoutDate } from "../redux/epics/util/fixWorkoutDates";

/**
 * WorkoutContainer
 *
 * Connects to redux store to give Workout component props.
 *
 * Adds the workout's name to the page title tag.
 */
export const WorkoutContainer = () => {
  const { currentExercise, workout, workouts } = useAppSelector(
    (state) => ({
      currentExercise: state.activeExercise,
      workout: state.activeWorkout,
      workouts: state.workouts,
    }),
    isEqual
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Workout Actions
  const handleStartWorkout = () => dispatch(startActiveWorkout());

  const handleStopWorkout = () => dispatch(stopActiveWorkout());

  const handleToggleStartStopWorkout = () =>
    workout.isStarted ? handleStopWorkout() : handleStartWorkout();

  // Exercise Actions
  const handlePreviousExercise = () =>
    workout.isStarted && dispatch(previousExercise());

  const handleNextExercise = () =>
    workout.isStarted && dispatch(nextExercise());

  const handlePauseExercise = () =>
    workout.isStarted && dispatch(pauseExercise());

  const handleResumeExercise = () =>
    workout.isStarted && dispatch(resumeExercise());

  const handleTogglePause = () =>
    currentExercise.isPaused ? handleResumeExercise() : handlePauseExercise();

  useEffect(() => {
    let workoutId = router.query.id;

    if (typeof workoutId === "object") {
      workoutId = workoutId[0];
    }

    if (!workoutId && workout.id) {
      router.replace({ query: { id: workout.id } });
      return;
    } 

    if (!workoutId || workoutId === workout.id) {
      return;
    } 

    if (workoutId !== workout.id) {
      const workout = workouts.list.find((w) => w.id === workoutId);

      if (workout) {
        dispatch(changeActiveWorkout(workout));
        console.log("found")
        return;
      }

      (async () => {
        try {
          console.log("try find", workoutId);

          const snapshot = await firebase
            .firestore()
            .collection("workouts")
            .doc(workoutId)
            .get();

          const workout = snapshot.exists
            ? fixWorkoutDate(snapshot.data())
            : undefined;

          if (workout) {
            dispatch(changeActiveWorkout(workout));
          }
        } catch (err) {
          console.error("Failed to fetch workout", err);
        }
      })();
    }
  }, [workout.id]);

  return (
    <>
      <Head>
        <title>
          Workout{" "}
          {workout.name === ""
            ? ""
            : `- ${workout.name} ${currentExercise.isPaused ? "PAUSED" : ""}`}
        </title>
      </Head>
      <Workout
        currentExercise={currentExercise}
        workout={workout}
        actions={{
          togglePause: handleTogglePause,
          toggleStartStop: handleToggleStartStopWorkout,
          previousExercise: handlePreviousExercise,
          nextExercise: handleNextExercise,
          goToWorkouts: () => router.push("/workouts"),
        }}
      />
    </>
  );
};
