import styled from "@emotion/styled";
import React from "react";

import { REST_PERIOD } from "../../constants";
import { TertiaryButton } from "../Buttons";
import { Counter } from "./Counter";
import { FadeInOut } from "../FadeInOut";
import { H2, P } from "../Txt";
import { css } from "@emotion/react";

type CurrentExerciseDisplayProps = {
  id: string;
  name: string;
  description: string;
  isPaused: boolean;
  isStarted: boolean;
  isCompleted: boolean;
  duration: number;
  currentTime: number;
  repetitions: number;
  onClickTitle: () => void;
  nextExercise?: string;
};

/**
 * CurrentExerciseDisplay
 *
 * Displays the current exercise name, button to show details, and Counter component.
 *
 * @param id exercise id
 * @param name exercise name
 * @param description exercise description
 * @param isPaused exercise pause status
 * @param isStarted workout running status
 * @param isCompleted workout complete status
 * @param duration total time for exercise
 * @param currentTime current time left on exercise
 * @param repetitions exercise repetitions
 * @param onClickTitle function called when exercise name is clicked
 * @param nextExercise name of the next exercise, if it exists
 */
export const CurrentExerciseDisplay = ({
  id,
  name,
  description,
  isPaused,
  isStarted,
  isCompleted,
  duration,
  currentTime,
  repetitions,
  onClickTitle,
  nextExercise,
}: CurrentExerciseDisplayProps) => (
  <>
    <Container>
      <TitleButton
        onClick={name !== REST_PERIOD ? onClickTitle : undefined}
        aria-label={
          name !== REST_PERIOD ? "View Exercise Description" : undefined
        }
        role="tooltip"
        data-microtip-position="bottom"
        noHover={name === REST_PERIOD}
      >
        <H2
          padding={
            name === REST_PERIOD && description
              ? "0.8rem 0.8rem 0px 0.8rem"
              : "0.8rem"
          }
          textAlign="center"
        >
          {name === REST_PERIOD ? "Rest" : name}
        </H2>
      </TitleButton>

      {name === REST_PERIOD && description && (
        <P textAlign="center" padding="0px 1rem 1rem 1rem">
          {description}
        </P>
      )}

      <Counter
        key={id}
        shouldReset={isCompleted || !isStarted}
        isPaused={isPaused}
        currentTime={currentTime}
        duration={duration}
        repetitions={repetitions}
      />

      <SpaceMaker>
        <FadeInOut
          isShowing={
            nextExercise !== undefined && currentTime <= 10 && currentTime > 0
          }
          timeout={{ exit: 1000 }}
        >
          <P>Next Up: {nextExercise}</P>
        </FadeInOut>
      </SpaceMaker>
    </Container>
  </>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const TitleButton = styled(TertiaryButton)<{ noHover: boolean }>`
  max-height: fit-content;
  height: fit-content;

  ${(p) =>
    p.noHover &&
    css`
      &:hover {
        background-color: inherit;
        color: inherit;
        box-shadow: none;
        cursor: default;
      }
    `}
`;

const SpaceMaker = styled.div<{ shrink?: boolean }>`
  height: ${(p) => (p.shrink ? "fit-content" : "36px")};
`;
