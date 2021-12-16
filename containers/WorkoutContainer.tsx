import isEqual from "lodash.isequal";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { firebase } from "../firebase/firebase";
import { Workout } from "../components/Workout";
import { pauseExercise, resumeExercise } from "../redux/ducks/activeExercise";
import {
  changeActiveWorkout,
  nextExercise,
  previousExercise,
  restartActiveWorkout,
  startActiveWorkout,
  stopActiveWorkout,
} from "../redux/ducks/activeWorkout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fixWorkoutDate } from "../redux/epics/util/fixWorkoutDates$";
import { addWorkout } from "../redux/ducks/workouts";

/**
 * WorkoutContainer
 *
 * Connects to redux store to give Workout component props.
 *
 * Adds the workout's name to the page title tag.
 */
export const WorkoutContainer = () => {
  const { currentExercise, activeWorkout, workouts } = useAppSelector(
    (state) => ({
      currentExercise: state.activeExercise,
      activeWorkout: state.activeWorkout,
      workouts: state.workouts,
    }),
    isEqual
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isWorkoutInList =
    workouts.list.filter((w) => w.id === activeWorkout.id).length > 0;

  // Workout Actions
  const handleStartWorkout = () => dispatch(startActiveWorkout());

  const handleStopWorkout = () => dispatch(stopActiveWorkout());

  const handleToggleStartStopWorkout = () =>
    activeWorkout.isStarted ? handleStopWorkout() : handleStartWorkout();

  const handleRestartWorkout = () => dispatch(restartActiveWorkout());

  const handleAddWorkoutToList = () => dispatch(addWorkout(activeWorkout));

  // Exercise Actions
  const handlePreviousExercise = () =>
    activeWorkout.isStarted && dispatch(previousExercise());

  const handleNextExercise = () =>
    activeWorkout.isStarted && dispatch(nextExercise());

  const handlePauseExercise = () =>
    activeWorkout.isStarted && dispatch(pauseExercise());

  const handleResumeExercise = () =>
    activeWorkout.isStarted && dispatch(resumeExercise());

  const handleTogglePause = () =>
    currentExercise.isPaused ? handleResumeExercise() : handlePauseExercise();

  useEffect(() => {
    if (workouts.isLoading) return;

    let workoutId = router.query.id;

    if (typeof workoutId === "object") {
      workoutId = workoutId[0];
    }

    if (!workoutId && activeWorkout.id) {
      router.replace({ query: { id: activeWorkout.id } });
      return;
    }

    if (!workoutId || workoutId === activeWorkout.id) return;

    if (workoutId !== activeWorkout.id) {
      console.log("No Match", workoutId, activeWorkout.id);

      const workout = workouts.list.find((w) => w.id === workoutId);

      if (workout) {
        dispatch(changeActiveWorkout(workout));
        console.log("found");
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
  }, [activeWorkout.id, router.query.id, workouts.isLoading]);

  return (
    <>
      <Head>
        <title>
          {activeWorkout.name === ""
            ? "Workout"
            : `${currentExercise.isPaused ? "PAUSED - " : ""}${activeWorkout.name}`}
        </title>
      </Head>
      <Workout
        currentExercise={currentExercise}
        workout={activeWorkout}
        actions={{
          restartWorkout: handleRestartWorkout,
          togglePause: handleTogglePause,
          toggleStartStop: handleToggleStartStopWorkout,
          previousExercise: handlePreviousExercise,
          nextExercise: handleNextExercise,
          goToWorkouts: () => router.push("/explore"),
          addWorkoutToList: isWorkoutInList ? undefined : handleAddWorkoutToList,
        }}
      />
    </>
  );
};
