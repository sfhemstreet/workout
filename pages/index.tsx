import React from "react";
import styled from "@emotion/styled";
import isEqual from "lodash.isequal";

import { H2, H3, NumberSpan, P } from "../components/Txt";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LoadingShimmer } from "../components/LoadingShimmer";
import { InlineButton } from "../components/Buttons/InlineButton";
import { useRouter } from "next/router";
import { WorkoutPreview } from "../components/WorkoutPreview";
import { openSignInModal } from "../redux/ducks/signInModal";

/**
 * Home Page
 * 
 * `/`
 */
export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, workouts, activeWorkout } = useAppSelector(
    ({ user, workouts, activeWorkout }) => ({ user, workouts, activeWorkout }),
    (left, right) => isEqual(left, right)
  );

  const goToActiveWorkoutPage = () => router.push("/workout");

  if (user.isLoading) {
    return <LoadingShimmer />;
  }

  return (
    <Container>
      <H2>Welcome, {user.name}</H2>

      {!user.isAuthenticated && (
        <P>
          You are using an anonymous account.
          <br /> If you want to share workouts
          <InlineButton
            onClick={() => dispatch(openSignInModal())}
            isUnderlined
          >
            signin or register!
          </InlineButton>
        </P>
      )}

      <PopularWorkoutsSection>
        <H3>Popular Workouts</H3>
        <P>To Do: Query Firebase for most popular workouts</P>
      </PopularWorkoutsSection>

      <LatestWorkoutsSection>
        <H3>Latest Workouts</H3>
        <P>To Do: Query Firebase for the latest created workouts</P>
      </LatestWorkoutsSection>

      {activeWorkout.id !== "" && (
        <ActiveWorkoutSection>
          <H3>
            Your current workout: <NumberSpan>{activeWorkout.name}</NumberSpan>
          </H3>
          <P>
            <InlineButton onClick={goToActiveWorkoutPage}>
              {activeWorkout.isStarted
                ? `Click here to continue the ${activeWorkout.name} workout.`
                : activeWorkout.isCompleted
                ? `Congrats on completing ${activeWorkout.name}! Click here to do it again.`
                : `Click here to start the ${activeWorkout.name} workout.`}
            </InlineButton>
          </P>
        </ActiveWorkoutSection>
      )}

      {workouts.list.length > 0 && (
        <SavedWorkoutsSection>
          <H3>Saved Workouts</H3>
          {workouts.list.map((workout) => (
            <WorkoutPreview
              key={workout.id}
              workout={workout}
              onClick={() => {}}
            />
          ))}
        </SavedWorkoutsSection>
      )}
    </Container>
  );
}

const Container = styled.div``;

const ActiveWorkoutSection = styled.section``;

const PopularWorkoutsSection = styled.section``;

const LatestWorkoutsSection = styled.section``;

const SavedWorkoutsSection = styled.section``;
