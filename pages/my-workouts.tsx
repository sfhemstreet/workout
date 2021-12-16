import styled from "@emotion/styled";
import isEqual from "lodash.isequal";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { SecondaryButton, SubmitButton } from "../components/Buttons";

import { FadeInOut } from "../components/FadeInOut";
import { FullscreenBlurredBackground } from "../components/FullScreenBlurredBackground";
import { DialogWindow } from "../components/SwitchWorkoutsAlert";
import { H5, P } from "../components/Txt";
import { Center, Row } from "../components/WorkoutForm/styles";
import { WorkoutPreview } from "../components/WorkoutPreview";
import { WorkoutPreviewLoadingShimmers } from "../components/WorkoutPreviewLoadingShimmers";
import { changeActiveWorkout } from "../redux/ducks/activeWorkout";
import { deleteWorkout, removeWorkout } from "../redux/ducks/workouts";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { Workout } from "../types";

export default function MyWorkoutsPage() {
  const { workouts, user } = useAppSelector(
    (state) => ({
      workouts: state.workouts,
      user: state.user,
    }),
    isEqual
  );
  const [removingWorkout, setRemovingWorkout] = useState<Workout | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const goToWorkout = (workoutId: string) => {
    const workout: Workout | undefined = workouts.list.find(
      ({ id }) => workoutId === id
    );

    if (!workout) return;

    dispatch(changeActiveWorkout(workout));
    router.push({ pathname: "/workout", query: { id: workout.id } });
  };

  const handleRemoveWorkout = (workout: Workout) => setRemovingWorkout(workout);

  const confirmRemoveWorkout = () => {
    if (!removingWorkout) return;

    const removeId = removingWorkout.id;
    const creatorId = removingWorkout.creator.id;

    dispatch(
      user.id === creatorId ? deleteWorkout(removeId) : removeWorkout(removeId)
    );
    setRemovingWorkout(null);
  };

  return (
    <Container>
      <WorkoutsContainer>
        <SwitchTransition mode="out-in">
          <Transition
            key={workouts.isLoading ? "loading" : "results"}
            timeout={300}
          >
            {(transitionStatus) =>
              workouts.isLoading ? (
                <WorkoutPreviewLoadingShimmers
                  transitionStatus={transitionStatus}
                />
              ) : (
                workouts.list.length === 0 ?
                <P>You dont have any workouts saved.</P>
                :
                workouts.list.map((workout) => (
                  <WorkoutPreview
                    key={workout.id}
                    workout={workout}
                    onClick={() => goToWorkout(workout.id)}
                    action={{
                      onClick: () => handleRemoveWorkout(workout),
                      label:
                        user.id === workout.creator.id ? "Delete" : "Remove",
                    }}
                  />
                ))
              )
            }
          </Transition>
        </SwitchTransition>
      </WorkoutsContainer>
      <FadeInOut
        isShowing={removingWorkout !== null}
        render={(transitionStatus) => (
          <FullscreenBlurredBackground
            transitionStatus={transitionStatus}
            onClick={() => setRemovingWorkout(null)}
          >
            <Center>
              {/* @ts-ignore: emotion is being very annoying. */}
              <DialogWindow onClick={(e) => e.stopPropagation()}>
                <H5>
                  Are you sure you want to{" "}
                  {user.id === removingWorkout?.creator.id
                    ? "delete"
                    : "remove"}{" "}
                  {removingWorkout?.name}?
                </H5>

                <Row justifyContent="space-between">
                  <SecondaryButton onClick={() => setRemovingWorkout(null)}>
                    Cancel
                  </SecondaryButton>
                  <SubmitButton onClick={confirmRemoveWorkout}>
                    {user.id === removingWorkout?.creator.id
                      ? "Delete"
                      : "Remove"}
                  </SubmitButton>
                </Row>
              </DialogWindow>
            </Center>
          </FullscreenBlurredBackground>
        )}
      />
    </Container>
  );
}

const Container = styled.section`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  ${(p) => SurfaceElevation(p.theme.name, 1)};
`;

const WorkoutsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
