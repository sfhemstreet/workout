import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { WorkoutForm } from "../components/WorkoutForm";
import { LoadingShimmer } from "../components/LoadingShimmer";
import { changeActiveWorkout } from "../redux/ducks/activeWorkout";
import { deleteWorkout, editWorkout } from "../redux/ducks/workouts";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Workout } from "../types";

/**
 * Clone Page
 * 
 * Page for cloning an existing workout.
 * 
 * When navigating to this page, the router query must provider a `cloneId` query param.
 * If the cloneId is not there, or the cloneId does not match any workout in the users workouts list,
 * the page will be rerouted to the home page.
 */
export default function ClonePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, workouts, isWorkoutsLoading } = useAppSelector((state) => ({
    user: state.user,
    workouts: state.workouts.list,
    isWorkoutsLoading: state.workouts.isLoading,
  }));
  const [workoutClone, setWorkoutClone] = useState<Workout | undefined>(
    undefined
  );

  const handleSubmit = (workout: Omit<Workout, "creator">) => {
    const workoutToSubmit: Workout = {
      ...workout,
      isShared: user.isAuthenticated ? workout.isShared : false,
      creator: {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
      },
    };

    dispatch(editWorkout(workoutToSubmit.id, workoutToSubmit));
    dispatch(changeActiveWorkout(workoutToSubmit));
    router.replace("/workout");
  };

  const handleDelete = (workoutId: string) => {
    dispatch(deleteWorkout(workoutId));
    router.replace("/");
  };

  useEffect(() => {
    if (isWorkoutsLoading) return;

    const cloneId = router.query.cloneId;

    if (!cloneId || typeof cloneId === "object" || workouts.length === 0) {
      router.replace("/");
      return;
    }

    const workout = workouts.reduce((result, current) =>
      current.clonedFromIds.reduce(
        (acc, curr) => (curr === cloneId ? curr : acc),
        ""
      ) === ""
        ? result
        : current
    );

    if (workout) setWorkoutClone(workout);
    else router.replace("/");
  }, [isWorkoutsLoading]);

  useEffect(() => {
    // When user submits the workout we route to the workout page,
    // pre-fetching the page makes the transition faster.
    router.prefetch("/workout");
  }, []);

  return (
    <SwitchTransition mode="out-in">
      <Transition timeout={300} key={workoutClone ? "loaded" : "loading"}>
        {(transitionStatus) =>
          workoutClone ? (
            <WorkoutForm
              editWorkout={workoutClone}
              onSubmit={handleSubmit}
              onDeleteWorkout={handleDelete}
              canShare={user.isAuthenticated}
              isClone
            />
          ) : (
            <LoadingShimmer transitionStatus={transitionStatus} />
          )
        }
      </Transition>
    </SwitchTransition>
  );
}
