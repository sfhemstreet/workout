import isEqual from "lodash.isequal";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { NavMenu } from "../components/NavMenu";
import { SwitchWorkoutsAlert } from "../components/SwitchWorkoutsAlert";
import { pauseExercise } from "../redux/ducks/activeExercise";
import { changeActiveWorkout } from "../redux/ducks/activeWorkout";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Workout } from "../types";

/**
 * NavMenuContainer
 *
 * Connects to redux store and Next.js router to provide routing functions
 * to the NavMenu component, and controls the isOpen state of NavMenu sidebar.
 *
 * Also controls SwitchWorkoutsAlert, a modal component that alerts users
 * when they are switching workouts before completing one they have started.
 */
export const NavMenuContainer = () => {
  const navProps = useAppSelector(
    ({ user, workouts, activeWorkout, activeExercise }) => ({
      user,
      workouts,
      activeWorkout,
      activeExercise,
    }),
    isEqual
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  // Used to display modal that asks user if they really want to switch workouts
  // before their current workout is finished.
  const [confirmGoToWorkoutId, setConfirmGoToWorkoutId] = useState("");

  const handleToggleSideBar = () => setIsSidebarOpen(!isSideBarOpen);

  const goToWorkout = (workoutId: string) => {
    const workout: Workout | undefined = navProps.workouts.list.find(
      ({ id }) => workoutId === id
    );

    if (!workout) return;

    dispatch(changeActiveWorkout(workout));
    router.push({ pathname: "/workout", query: { id: workout.id } });
  };

  const pauseExerciseIfNeeded = () =>
    navProps.activeExercise.duration > 0 &&
    navProps.activeWorkout.isStarted &&
    !navProps.activeExercise.isPaused &&
    dispatch(pauseExercise());

  const goToRoute = (route: string) => {
    pauseExerciseIfNeeded();
    router.push({ pathname: route });
    if (isSideBarOpen) setIsSidebarOpen(false);
  };

  return (
    <>
      <NavMenu
        {...navProps}
        isSideBarOpen={isSideBarOpen}
        toggleSideBar={handleToggleSideBar}
        actions={{
          goToHome: () => goToRoute("/"),
          goToWorkout,
          goToAbout: () => goToRoute("/about"),
          goToActiveWorkout: () => goToRoute("/workout"),
          goToCreate: () => goToRoute("/create"),
          goToEdit: () => goToRoute("/edit"),
          goToExplore: () => goToRoute("/explore"),
          goToHistory: () => goToRoute("/history"),
          goToMyWorkouts: () => goToRoute("/my-workouts"),
        }}
      />
    </>
  );
};
