import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { TransitionStatus } from "react-transition-group";

import { REST_PERIOD } from "../../constants";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { ActiveExercise, ActiveWorkout } from "../../types";
import { SecondaryButton } from "../Buttons";
import { InlineButton } from "../Buttons/InlineButton";
import { Confetti } from "./Confetti";
import { CurrentExerciseDetails } from "./CurrentExerciseDetails";
import { CurrentExerciseDisplay } from "./CurrentExerciseDisplay";
import { FadableDiv, FadeInOut, FadeInOutMixin } from "../FadeInOut";
import { FullscreenBlurredBackground } from "../FullScreenBlurredBackground";
import { NextExercisesList } from "./NextExercisesList";
import { RoundsDisplay } from "./RoundsDisplay";
import { H3, H4, NumberSpan } from "../Txt";

type WorkoutProps = {
  currentExercise: ActiveExercise;
  workout: ActiveWorkout;
  actions: {
    addWorkoutToList?: () => void;
    toggleStartStop: () => void;
    togglePause: () => void;
    previousExercise: () => void;
    nextExercise: () => void;
    goToWorkouts: () => void;
    restartWorkout: () => void;
  };
};

/**
 * Workout
 *
 * Displays UI that user completes a workout with.
 * Displays the workout name, current exercise, current time,
 * has button for displaying details modal, list of exercises,
 * and shoots confetti when completed.
 *
 * @param currentExercise
 * @param workout
 * @param actions
 */
export const Workout = ({
  currentExercise,
  workout,
  actions,
}: WorkoutProps) => {
  const [isFiringConfetti, setIsFiringConfetti] = useState(false);
  const [isDescriptionShowing, setIsDescriptionShowing] = useState(false);

  const handleToggleDescription = () => {
    if (
      workout.isStarted &&
      !currentExercise.isPaused &&
      currentExercise.duration > 0 &&
      !isDescriptionShowing
    ) {
      actions.togglePause();
    }

    setIsDescriptionShowing(!isDescriptionShowing);
  };

  const nextExerciseIndex = workout.exercises.reduce(
    (acc, curr, currIndex, self) =>
      currIndex + 1 < self.length && curr.id === workout.currentExerciseId
        ? currIndex + 1
        : acc,
    0
  );

  const nextExerciseName =
    workout.exercises.length > 0
      ? nextExerciseIndex === 0 && workout.currentRound === workout.rounds
        ? undefined
        : workout.exercises[nextExerciseIndex].name === REST_PERIOD
        ? "Rest"
        : workout.exercises[nextExerciseIndex].name
      : "";

  useEffect(() => {
    if (workout.id === "") return;

    if (workout.isCompleted) {
      setTimeout(() => setIsFiringConfetti(true), 300);
    } else if (isFiringConfetti) {
      setIsFiringConfetti(false);
    }
  }, [workout]);

  return (
    <Container>
      {workout.id !== "" ? (
        <>
          <Top>
            <Title>
              Workout:<H4 textAlign="center">{workout.name}</H4>
            </Title>
            <RoundsDisplay
              currentRound={workout.currentRound}
              totalRounds={workout.rounds}
              isStarted={workout.isStarted}
            />
          </Top>

          <FadeInOut
            isShowing={!workout.isCompleted}
            timeout={{ exit: 0 }}
            render={(transitionStatus) => (
              <Exercise transitionStatus={transitionStatus}>
                <CurrentExerciseDisplay
                  {...currentExercise}
                  isStarted={workout.isStarted}
                  isCompleted={workout.isCompleted}
                  onClickTitle={handleToggleDescription}
                  nextExercise={nextExerciseName}
                />
              </Exercise>
            )}
          />

          <FadeInOut
            isShowing={workout.isCompleted}
            timeout={{ enter: 300, appear: 300, exit: 0 }}
            render={(transitionStatus) => (
              <Completed transitionStatus={transitionStatus}>
                <H3 textAlign="center">
                  <NumberSpan>WORKOUT COMPLETED</NumberSpan>
                </H3>
                <H3 textAlign="center">Congratulations!</H3>
              </Completed>
            )}
          />

          <FadeInOut
            isShowing={!workout.isCompleted}
            timeout={{ exit: 0 }}
            render={(transitionStatus) => (
              <List transitionStatus={transitionStatus}>
                <NextExercisesList
                  exercises={workout.exercises}
                  currentExerciseId={workout.currentExerciseId}
                />
              </List>
            )}
          />

          <ActionsPanel>
            <FadeInOut
              isShowing={!workout.isStarted}
              timeout={{ exit: 0 }}
              render={(transitionStatus) => (
                <ExploreArea transitionStatus={transitionStatus}>
                  <InlineButton
                    onClick={(e) => {
                      e.preventDefault();
                      actions.goToWorkouts();
                    }}
                    isFullWidth
                    isCentered
                  >
                    Explore Workouts
                  </InlineButton>
                </ExploreArea>
              )}
            />

            <FadeInOut
              timeout={{ exit: 0 }}
              isShowing={workout.isStarted}
              render={(transitionStatus) => (
                <PreviousArea transitionStatus={transitionStatus}>
                  <SecondaryButton
                    onClick={(e) => {
                      e.preventDefault();
                      actions.previousExercise();
                    }}
                    disabled={
                      workout.exercises.length <= 1 ||
                      (workout.exercises.findIndex(
                        (e) => e.id === workout.currentExerciseId
                      ) <= 0 &&
                        workout.currentRound === 1)
                    }
                  >
                    Back
                  </SecondaryButton>
                </PreviousArea>
              )}
            />

            <FadeInOut
              timeout={{ exit: 0 }}
              isShowing={workout.isStarted}
              render={(transitionStatus) => (
                <NextArea transitionStatus={transitionStatus}>
                  <SecondaryButton
                    onClick={(e) => {
                      e.preventDefault();
                      actions.nextExercise();
                    }}
                  >
                    Next
                  </SecondaryButton>
                </NextArea>
              )}
            />

            <FadeInOut
              timeout={{ exit: 0 }}
              isShowing={workout.isStarted}
              render={(transitionStatus) => (
                <PauseArea transitionStatus={transitionStatus}>
                  <SecondaryButton
                    onClick={(e) => {
                      e.preventDefault();
                      actions.togglePause();
                    }}
                    disabled={currentExercise.duration <= 0}
                  >
                    {currentExercise.isPaused ? "Resume" : "Pause"}
                  </SecondaryButton>
                </PauseArea>
              )}
            />

            <StartQuitArea isStarted={workout.isStarted}>
              <StartQuitBtn
                isQuit={workout.isStarted}
                onClick={(e) => {
                  e.preventDefault();
                  workout.isCompleted
                    ? actions.restartWorkout()
                    : actions.toggleStartStop();
                }}
              >
                {workout.isStarted
                  ? "Quit"
                  : workout.isCompleted
                  ? "Restart"
                  : "Start"}
              </StartQuitBtn>
            </StartQuitArea>
          </ActionsPanel>

          {/* Description Modal */}
          {currentExercise.name !== REST_PERIOD && (
            <FadeInOut
              isShowing={isDescriptionShowing}
              render={(transitionStatus) => (
                <FullscreenBlurredBackground
                  transitionStatus={transitionStatus}
                  onClick={handleToggleDescription}
                >
                  <CurrentExerciseDetails
                    onClose={handleToggleDescription}
                    {...currentExercise}
                  />
                </FullscreenBlurredBackground>
              )}
            />
          )}

          <FadeInOut
            timeout={{ exit: 0 }}
            isShowing={typeof actions.addWorkoutToList !== "undefined"}
            render={(transitionStatus) => (
              <SecondaryButton
                onClick={(e) => {
                  e.preventDefault();
                  actions.addWorkoutToList && actions.addWorkoutToList();
                }}
              >
                Add workout to list
              </SecondaryButton>
            )}
          />
        </>
      ) : (
        <Title>You need to select a workout!</Title>
      )}

      {workout.isCompleted && <Confetti isFiring={isFiringConfetti} />}
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media ${(p) => p.theme.media.tablet} {
    padding: 10px;
  }

  @media ${(p) => p.theme.media.laptop} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60px 1fr min-content;
    grid-gap: 10px;

    max-width: 1040px;
  }

  @media ${(p) => p.theme.media.laptopL} {
    //grid-gap: 20px;
  }
`;

const Top = styled.div`
  /* ${(p) => SurfaceElevation(p.theme.name, 1)}; */
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  border-radius: 10px;

  @media ${(p) => p.theme.media.laptop} {
    grid-column: 1 / 3;
    grid-row: 1;
    justify-self: center;
  }
`;

const Title = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const Exercise = styled(FadableDiv)`
  @media ${(p) => p.theme.media.laptop} {
    grid-column: 2;
    grid-row: 2;
    justify-self: center;
  }
`;

const List = styled(FadableDiv)`
  @media ${(p) => p.theme.media.laptop} {
    grid-column: 1;
    grid-row: 2;
    justify-self: center;
    align-self: center;
  }
`;

const Completed = styled.div<{ transitionStatus: TransitionStatus }>`
  width: 300px;
  height: 450px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  opacity: ${(p) => (p.transitionStatus === "entered" ? 1 : 0)};
  transition: all 800ms ease-in-out;

  @media ${(p) => p.theme.media.laptop} {
    grid-column: 1 / 3;
    grid-row: 2;
    justify-self: center;
    align-self: center;
  }
`;

const ActionsPanel = styled.ul`
  list-style: none;

  padding: 0px;
  padding-bottom: 30px;

  width: 300px;
  min-width: 300px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5px 5px;

  transition: ${(p) => p.theme.transitions.normal};

  li {
    //width: 83px;
    min-width: 83px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media ${(p) => p.theme.media.laptop} {
    grid-column: 1 / 3;
    grid-row: 3;
    justify-self: center;
    align-self: start;
    padding-bottom: 5px;
    margin-top: 0px;
  }
`;

const StartQuitArea = styled.li<{
  isStarted: boolean;
}>`
  grid-column: 2 / 3;
  grid-row: ${(p) => (p.isStarted ? 3 : 1)};
`;

const PreviousArea = styled.li<{ transitionStatus: TransitionStatus }>`
  ${(p) => FadeInOutMixin(p.transitionStatus)};
  grid-column: 1;
  grid-row: 2;
`;

const PauseArea = styled.li<{ transitionStatus: TransitionStatus }>`
  ${(p) => FadeInOutMixin(p.transitionStatus)};
  grid-column: 2 / 3;
  grid-row: 1;
`;

const NextArea = styled.li<{ transitionStatus: TransitionStatus }>`
  ${(p) => FadeInOutMixin(p.transitionStatus)};
  grid-column: 3;
  grid-row: 2;
`;

const ExploreArea = styled.li<{ transitionStatus: TransitionStatus }>`
  ${(p) => FadeInOutMixin(p.transitionStatus)};
  grid-column: 2 / 3;
  grid-row: 3;
`;

const StartQuitBtn = styled(SecondaryButton)<{ isQuit: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    ${(p) => p.isQuit && `color: ${p.theme.colors.error};`};
  }
`;
