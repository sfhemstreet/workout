import React, { useEffect } from "react";
import styled from "@emotion/styled";
import isEqual from "lodash.isequal";

import { H2, H3, NumberSpan, P } from "../components/Txt";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LoadingShimmer } from "../components/LoadingShimmer";
import { InlineButton } from "../components/Buttons/InlineButton";
import { useRouter } from "next/router";
import { WorkoutPreview } from "../components/WorkoutPreview";
import { openSignInModal } from "../redux/ducks/signInModal";
import { useBrowseWorkouts } from "../hooks/useBrowseWorkouts";
import { SwitchTransition, Transition } from "react-transition-group";
import { WorkoutPreviewLoadingShimmers } from "../components/WorkoutPreviewLoadingShimmers";
import { SurfaceElevation } from "../styles/SurfaceElevation";

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
  const { isLoading: popularWorkoutsLoading, workouts: popularWorkouts } =
    useBrowseWorkouts({ sort: "POPULAR", limit: 5 });

  const { isLoading: latestWorkoutsLoading, workouts: latestWorkouts } =
    useBrowseWorkouts({ sort: "LATEST", limit: 5 });

  const goToActiveWorkoutPage = () => router.push("/workout");

  useEffect(() => {
    setTimeout(() => router.prefetch("/workout"), 500);
  }, []);

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
        <WorkoutsContainer>
          <SwitchTransition mode="out-in">
            <Transition
              key={popularWorkoutsLoading ? "loading" : "results"}
              timeout={300}
            >
              {(transitionStatus) =>
                popularWorkoutsLoading ? (
                  <WorkoutPreviewLoadingShimmers
                    transitionStatus={transitionStatus}
                    numShimmers={5}
                  />
                ) : (
                  popularWorkouts.map((workout) => (
                    <WorkoutPreview
                      key={`browse-${workout.id}`}
                      workout={workout}
                    />
                  ))
                )
              }
            </Transition>
          </SwitchTransition>
        </WorkoutsContainer>
      </PopularWorkoutsSection>

      <LatestWorkoutsSection>
        <H3>Latest Workouts</H3>
        <WorkoutsContainer>
          <SwitchTransition mode="out-in">
            <Transition
              key={latestWorkoutsLoading ? "loading" : "results"}
              timeout={300}
            >
              {(transitionStatus) =>
                latestWorkoutsLoading ? (
                  <WorkoutPreviewLoadingShimmers
                    transitionStatus={transitionStatus}
                    numShimmers={5}
                  />
                ) : (
                  latestWorkouts.map((workout) => (
                    <WorkoutPreview
                      key={`browse-${workout.id}`}
                      workout={workout}
                    />
                  ))
                )
              }
            </Transition>
          </SwitchTransition>
        </WorkoutsContainer>
      </LatestWorkoutsSection>

      {/* {activeWorkout.id !== "" && (
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
      )} */}

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

const Container = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  margin-bottom: 3rem;
  ${(p) => SurfaceElevation(p.theme.name, 1)};
`;

const ActiveWorkoutSection = styled.section``;

const PopularWorkoutsSection = styled.section`
  margin: 1rem;
   border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 2)};
`;

const LatestWorkoutsSection = styled.section`
   margin: 3rem 1rem;
   border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 2)};
`;

const SavedWorkoutsSection = styled.section``;

const WorkoutsContainer = styled.div`
  display: flex;
  justify-content: center;
  
  flex-wrap: wrap;
`;
