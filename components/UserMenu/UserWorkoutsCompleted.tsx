import React from "react";
import { CompletedWorkout } from "../../types/CompletedWorkout";
import { getTotalWorkoutsCompleted } from "../../utils/getTotalWorkoutsCompleted";
import { P, NumberSpan } from "../Txt";

type UserWorkoutsCompletedProps = {
  workoutsCompleted: CompletedWorkout[];
};

export const UserWorkoutsCompleted = ({
  workoutsCompleted,
}: UserWorkoutsCompletedProps) => (
  <P>
    Workouts Completed:{" "}
    <NumberSpan>{getTotalWorkoutsCompleted(workoutsCompleted)}</NumberSpan>{" "}
  </P>
);
