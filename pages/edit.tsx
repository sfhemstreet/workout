import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { InlineButton } from "../components/Buttons/InlineButton";
import { WorkoutForm } from "../components/WorkoutForm";
import { FadeInOut } from "../components/FadeInOut";
import { H2, P } from "../components/Txt";
import { WorkoutPreview } from "../components/WorkoutPreview";
import {
  cloneWorkout,
  deleteWorkout,
  editWorkout,
  removeWorkout,
} from "../redux/ducks/workouts";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Workout } from "../types";
import isEqual from "lodash.isequal";
import { SecondaryButton } from "../components/Buttons";
import { Row } from "../components/WorkoutForm/styles";
import { LoadingShimmer } from "../components/LoadingShimmer";
import { SwitchTransition, Transition } from "react-transition-group";
import { pushToClone } from "../utils/pushToClone";
import { uuid } from "../utils/uuid";
import { SurfaceElevation } from "../styles/SurfaceElevation";

/**
 * Edit Workout Page
 *
 * `/edit`
 */
export default function EditWorkoutPage() {
  const router = useRouter();
  const { myWorkouts, canShare, isLoading, savedWorkouts } = useAppSelector(
    (state) => ({
      isLoading: state.workouts.isLoading,
      canShare: state.user.isAuthenticated,
      myWorkouts: state.workouts.list.filter(
        (workout) => workout.creator.id === state.user.id
      ),
      savedWorkouts: state.workouts.list.filter(
        (workout) => workout.creator.id !== state.user.id
      ),
    }),
    isEqual
  );
  const dispatch = useAppDispatch();
  const [workoutToEdit, setWorkoutToEdit] = useState<Workout | undefined>(
    undefined
  );

  const handleSubmitEdit = (workout: Omit<Workout, "creator">) => {
    dispatch(editWorkout(workout.id, { ...workout }));
    setWorkoutToEdit(undefined);
  };

  const handleDeleteWorkout = (workoutId: string) => {
    dispatch(deleteWorkout(workoutId));
    setWorkoutToEdit(undefined);
  };

  const handleCloneWorkout = (workout: Workout) => {
    dispatch(cloneWorkout(workout, uuid()));
    pushToClone(router, workout.id);
  };

  useEffect(() => {
    // Update the workoutToEdit if router has a workout id as a query param
    // and workoutToEdit.id does not match it.
    if (
      myWorkouts.length > 0 &&
      typeof router.query.workout === "string" &&
      router.query.workout !== "" &&
      (workoutToEdit === undefined || workoutToEdit.id !== router.query.workout)
    ) {
      const workout = myWorkouts.reduce((prev, curr) =>
        curr.id === router.query.workout ? curr : prev
      );

      if (workout) setWorkoutToEdit(workoutToEdit);
    }
    // Update the router query params if the workoutToEdit.id dopes not match.
    else if (
      workoutToEdit !== undefined &&
      router.query.workout !== workoutToEdit.id
    ) {
      router.replace({ query: { workout: workoutToEdit.id } });
    }
  }, [router.query, workoutToEdit]);

  useEffect(() => {
    // Prefetch the clone page just incase
    router.prefetch("/clone");
  }, []);

  return (
    <Container>
      <SwitchTransition mode="out-in">
        <Transition
          key={isLoading ? "loading" : !workoutToEdit ? "select" : "edit"}
          timeout={300}
        >
          {(transitionStatus) =>
            isLoading ? (
              <>
                <H2>Edit Workout</H2>
                <Row justifyContent="center">
                  <LoadingShimmer
                    width="300px"
                    height="300px"
                    borderRadius="50%"
                    transitionStatus={transitionStatus}
                  />
                </Row>
              </>
            ) : myWorkouts.length > 0 || savedWorkouts.length > 0 ? (
              workoutToEdit === undefined ? (
                <>
                  <H2>Edit Workout</H2>
                  <P>Select a workout to edit</P>

                  {myWorkouts.length > 0 && (
                    <>
                      <P padding="1rem 1rem 0rem 1rem">Created</P>{" "}
                      <WorkoutsContainer>
                        {myWorkouts.map((workout) => (
                          <WorkoutPreview
                            key={workout.id}
                            workout={workout}
                            onClick={() => setWorkoutToEdit(workout)}
                            onClone={() => handleCloneWorkout(workout)}
                          />
                        ))}
                      </WorkoutsContainer>
                    </>
                  )}

                  {savedWorkouts.length > 0 && (
                    <>
                      <P padding="1rem 1rem 0rem 1rem">Saved</P>
                      <WorkoutsContainer>
                        {savedWorkouts.map((workout) => (
                          <WorkoutPreview
                            key={workout.id}
                            workout={workout}
                            onClick={() => handleCloneWorkout(workout)}
                          />
                        ))}
                      </WorkoutsContainer>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Row justifyContent="space-evenly">
                    <P>
                      To save your edits, click 'Submit Edits' at the bottom of
                      the form.
                    </P>
                    <SecondaryButton
                      onClick={() => setWorkoutToEdit(undefined)}
                    >
                      Cancel
                    </SecondaryButton>
                  </Row>
                  <FadeInOut
                    isShowing={workoutToEdit !== undefined}
                    timeout={{ exit: 0 }}
                  >
                    <WorkoutForm
                      canShare={canShare}
                      editWorkout={workoutToEdit}
                      onSubmit={handleSubmitEdit}
                      onDeleteWorkout={handleDeleteWorkout}
                    />
                  </FadeInOut>
                </>
              )
            ) : (
              <P>
                Looks like you haven't created any workouts.{" "}
                <InlineButton onClick={() => router.push("/create")}>
                  Create a workout!
                </InlineButton>
              </P>
            )
          }
        </Transition>
      </SwitchTransition>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 1rem;
`;

const WorkoutsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  margin-bottom: 20px;
`;
