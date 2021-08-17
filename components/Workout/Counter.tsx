import styled from "@emotion/styled";
import React from "react";

import {
  CountdownKeyFrame,
  FadeInKeyframe,
  SlowlyFlickerFrame,
} from "../../styles/keyframes";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { getExerciseDurationDisplayString } from "../../utils/getExerciseDurationDisplayString";
import { H1, H2, P } from "../Txt";

type CounterProps = {
  duration: number;
  currentTime: number;
  isPaused: boolean;
  shouldReset: boolean;
};

/**
 * Counter 
 * 
 * Displays the time remaining in an exercise.
 * 
 * @param currentTime current time remaining in exercise
 * @param duration total duration of exercise
 * @param isPaused if exercise is paused set to `true`
 * @param shouldReset if counter needs to reset set to `true` 
 */
export const Counter = ({
  currentTime,
  duration,
  isPaused,
  shouldReset,
}: CounterProps) => (
  <Container isPaused={isPaused}>
    <Paused isPaused={isPaused}>
      <H1>PAUSED</H1>
    </Paused>

    {duration > 0 ? (
      <Time increaseSize={currentTime < 60}>
        {getExerciseDurationDisplayString(currentTime)}
      </Time>
    ) : (
      <>
        <H2 textAlign="center">No Time Limit</H2>
        <P>Hit 'Next' when completed</P>
      </>
    )}

    <SVG>
      <defs>
        <linearGradient
          spreadMethod="pad"
          id="awesome-counter-gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgb(187, 134, 252)" />
          <stop offset="51%" stopColor="rgb(3, 218, 198)" />
          <stop offset="100%" stopColor="rgb(55, 0, 179)" />
        </linearGradient>
      </defs>
      {duration > 0 && currentTime >= 0 ? (
        /* When the clock resets we need to make sure the circle gradient resets too. */
        shouldReset ? (
          <CircleNoAnimation />
        ) : (
          <Circle duration={duration} isPaused={isPaused} />
        )
      ) : (
        <></>
      )}
    </SVG>
  </Container>
);

const Container = styled.div<{ isPaused: boolean }>`
  border: solid 1px
    ${(p) => (p.isPaused ? p.theme.colors.error : "transparent")};

  width: 310px;
  height: 310px;

  padding: 0px;
  margin: 0px;

  border-radius: 50%;
  ${(p) => SurfaceElevation(p.theme.name, 5)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;

  transition: ${(p) => p.theme.transitions.normal};
  animation: ${FadeInKeyframe} linear 300ms both;

  @media ${(p) => p.theme.media.tablet} {
    width: 360px;
    height: 360px;
  }

  @media ${(p) => p.theme.media.laptopL} {
    width: 410px;
    height: 410px;
  }

  @media ${(p) => p.theme.media.desktop} {
    width: 810px;
    height: 810px;
  }
`;

const Time = styled.h1<{ increaseSize: boolean }>`
  position: relative;

  font-family: "Share Tech Mono", monospace;
  text-align: center;
  font-size: ${(p) => (p.increaseSize ? "11.2rem" : "8.2rem")};

  transition: ${(p) => p.theme.transitions.normal};
  animation: ${FadeInKeyframe} linear 300ms both;

  @media ${(p) => p.theme.media.mobileL} {
    font-size: ${(p) => (p.increaseSize ? "8.2rem" : "6.2rem")};
  }

  @media ${(p) => p.theme.media.tablet} {
    font-size: ${(p) => (p.increaseSize ? "8.2rem" : "6.2rem")};
  }

  @media ${(p) => p.theme.media.laptopL} {
    font-size: ${(p) => (p.increaseSize ? "11.2rem" : "8.2rem")};
  }

  @media ${(p) => p.theme.media.desktop} {
    font-size: ${(p) => (p.increaseSize ? "25.2rem" : "14.2rem")};
  }
`;

const SVG = styled.svg`
  position: absolute;
  z-index: 3;

  width: 308px;
  height: 308px;

  padding: 0px;
  margin: 0px;
  // Sets the start of the countdown gradient to 12o'clock
  transform: rotateY(-180deg) rotateZ(-90deg);

  @media ${(p) => p.theme.media.tablet} {
    width: 358px;
    height: 358px;
  }

  @media ${(p) => p.theme.media.laptopL} {
    width: 408px;
    height: 408px;
  }

  @media ${(p) => p.theme.media.desktop} {
    width: 808px;
    height: 808px;
  }
`;

const CircleNoAnimation = styled.circle`
  cx: 50%;
  cy: 50%;
  r: 150px;
  stroke-width: 4px;
  stroke: url(#awesome-counter-gradient);
  fill: none;

  @media ${(p) => p.theme.media.tablet} {
    r: 175px;
  }

  @media ${(p) => p.theme.media.laptopL} {
    r: 200px;
  }

  @media ${(p) => p.theme.media.desktop} {
    r: 400px;
  }
`;

const Circle = styled(CircleNoAnimation)<{
  duration: number;
  isPaused: boolean;
}>`
  stroke-dasharray: 940px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;

  animation: ${CountdownKeyFrame(940)} ${(p) => p.duration + 1}s linear forwards;
  animation-play-state: ${(p) => (p.isPaused ? "paused" : "running")};

  @media ${(p) => p.theme.media.tablet} {
    stroke-dasharray: 1090px;
    animation: ${CountdownKeyFrame(1090)} ${(p) => p.duration + 1}s linear
      forwards;
    animation-play-state: ${(p) => (p.isPaused ? "paused" : "running")};
  }

  @media ${(p) => p.theme.media.laptopL} {
    stroke-dasharray: 1254px;
    animation: ${CountdownKeyFrame(1254)} ${(p) => p.duration + 1}s linear
      forwards;
    animation-play-state: ${(p) => (p.isPaused ? "paused" : "running")};
  }

  @media ${(p) => p.theme.media.desktop} {
    stroke-dasharray: 2508px;
    animation: ${CountdownKeyFrame(2508)} ${(p) => p.duration + 1}s linear
      forwards;
    animation-play-state: ${(p) => (p.isPaused ? "paused" : "running")};
  }
`;

const Paused = styled.div<{ isPaused: boolean }>`
  position: absolute;
  z-index: 2;

  top: 0px;
  left: 0px;

  opacity: ${(p) => (p.isPaused ? 1 : 0)};
  transition: ${(p) => p.theme.transitions.normal};

  width: 100%;
  height: 100%;

  background: ${(p) =>
    p.theme.name === "DARK" ? "rgba(0, 0, 0, 0.7)" : "rgba(255,255,255,0.7)"};
  backdrop-filter: blur(2px);

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;

    font-size: 6rem;

    color: ${(p) => p.theme.colors.error};
    animation: ${SlowlyFlickerFrame} 5000ms ease-in-out infinite;
  }
`;
