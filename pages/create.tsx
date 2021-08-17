import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { WorkoutForm } from "../components/WorkoutForm";
import { changeActiveWorkout } from "../redux/ducks/activeWorkout";
import { createWorkout } from "../redux/ducks/workouts";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Workout } from "../types";
import { uuid } from "../utils/uuid";

/**
 * Create Page
 * 
 * `/create`
 * 
 * Used to create a new workout.
 */
export default function CreatePage() {
  const { user } = useAppSelector((state) => ({ user: state.user }));
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (workout: Omit<Workout, "creator">) => {
    // We need to add the creator and make sure the ids are unique.
    // The workout id and exercise ids will not be unique because they are
    // made when the page is built.
    const w: Workout = {
      ...workout,
      id: uuid(),
      exercises: workout.exercises.map((e) => ({
        id: uuid(),
        name: e.name,
        description: e.description,
        duration: e.duration,
        repetitions: e.repetitions,
      })),
      creator: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    };

    dispatch(createWorkout(w));
    dispatch(changeActiveWorkout(w));
    router.push("/workout");
  };

  useEffect(() => {
    // When user submits the workout we route to the workout page,
    // pre-fetching the page makes the transition faster.
    router.prefetch("/workout");
  }, []);

  return (
    <WorkoutForm
      onSubmit={handleSubmit}
      canShare={user.isAuthenticated}
    />
  );
}
