import isEqual from "lodash.isequal";
import { useState } from "react";
import { useAppSelector } from "../redux/hooks";

export function useWorkout() {
  const { activeWorkout } = useAppSelector(
    (state) => ({
      activeWorkout: state.activeWorkout,
    }),
    isEqual
  );

  // Used to display modal that asks user if they really want to switch workouts
  // before their current workout is finished.
  const [confirmGoToWorkoutId, setConfirmGoToWorkoutId] = useState("");
  


  



}