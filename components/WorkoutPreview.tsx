import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import { Workout } from "../types";
import { H5, LowEmpSpan, NumberSpan, P } from "./Txt";
import { REST_PERIOD } from "../constants";
import { InlineButton } from "./Buttons";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { FadeInOut } from "./FadeInOut";
import { TransitionStatus } from "react-transition-group";
import {
  BoxShadowFlicker,
  FadeInKeyframe,
  ShimmerBackgroundKeyframe,
} from "../styles/keyframes";
import { css } from "@emotion/react";
import { fromEvent, merge, of } from "rxjs";
import { debounceTime, mapTo, switchMap, takeUntil, tap } from "rxjs/operators";

type WorkoutPreviewProps = {
  workout: Workout;
  onClick?: () => void;
  isSelected?: boolean;
  transitionStatus?: TransitionStatus;
  onClone?: () => void;
};

/**
 * WorkoutPreview
 *
 * Displays the workout's name and is expandable to show all details about the workout.
 *
 * @param workout
 * @param onClick
 * @param isSelected
 * @param transitionStatus
 * @param onClone
 */
export const WorkoutPreview = ({
  workout: { name, description, difficulty, exercises, rounds },
  onClick,
  isSelected,
  transitionStatus,
  onClone,
}: WorkoutPreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClone = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClone && onClone();
  };

  return (
    <WorkoutPreviewContainer
      isExpanded={isExpanded}
      isHighlighted={isSelected}
      hasCursor={onClick !== undefined}
      transitionStatus={transitionStatus}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => onClick && e.key === "Enter" && onClick()}
      tabIndex={0}
    >
      <Row>
        <Title shouldShrink={name.length > 23}>{name}</Title>
        <ExpandBtn
          onClick={handleExpand}
          isExpanded={isExpanded}
          title={isExpanded ? "Hide workout details" : "Show workout details"}
          aria-label={
            isExpanded ? "Hide workout details" : "Show workout details"
          }
        >
          ▼
        </ExpandBtn>
      </Row>

      <FadeInOut
        timeout={{ exit: 300 }}
        isShowing={isExpanded}
        render={() => (
          <>
            <P padding={"0.5rem 1rem 0.2rem 1rem"}>
              <LowEmpSpan>Difficulty: </LowEmpSpan>
              <NumberSpan>{difficulty}</NumberSpan>
            </P>

            <P padding={"0.2rem 1rem"}>
              <LowEmpSpan>Rounds: </LowEmpSpan>
              <NumberSpan>{rounds}</NumberSpan>
            </P>

            {description !== "" && (
              <DescriptionContainer padding={"0.2rem 1rem"}>
                <LowEmpSpan>Description: </LowEmpSpan>
                <DescriptionSpan>{description}</DescriptionSpan>
              </DescriptionContainer>
            )}

            <ExercisesContainer>
              <LowEmpSpan>Exercises: </LowEmpSpan>
              <ul>
                {exercises
                  .filter((exercise) => exercise.name !== REST_PERIOD)
                  .map((exercise) => (
                    <li key={exercise.id}>{exercise.name}</li>
                  ))}
              </ul>
            </ExercisesContainer>

            {onClone !== undefined && (
              <CloneButton noHover={!isExpanded} onClick={handleClone} />
            )}
          </>
        )}
      />
    </WorkoutPreviewContainer>
  );
};

const WorkoutPreviewContainer = styled.article<{
  isExpanded: boolean;
  isHighlighted?: boolean;
  hasCursor?: boolean;
  transitionStatus?: TransitionStatus;
}>`
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 300px;
  max-height: ${(p) => (p.isExpanded ? "300px" : "60px")};

  padding: 1rem;
  margin: 10px;

  border: 1px solid
    ${(props) =>
      props.isHighlighted
        ? props.theme.colors.primary
        : props.theme.colors.onBackgroundDisabled};
  border-radius: 10px;

  cursor: ${(p) => (p.hasCursor ? "pointer" : "default")};
  ${(p) => SurfaceElevation(p.theme.name, 1)};

  transition: ${(p) => p.theme.transitions.normal};
  opacity: ${(p) =>
    p.transitionStatus ? (p.transitionStatus === "entered" ? 1 : 0) : 1};

  :hover {
    box-shadow: 0px 0px 1px 1px
      ${(p) => (p.hasCursor ? p.theme.colors.primaryVariant : "transparent")};
  }

  @media ${(p) => p.theme.media.tablet} {
    max-height: ${(p) => (p.isExpanded ? "300px" : "73px")};
  }
`;

const Title = styled(H5)<{ shouldShrink?: boolean }>`
  padding: 0rem 2rem 0rem 1rem;
  max-height: 26px;

  font-size: ${(p) => (p.shouldShrink ? "1rem" : "default")};

  @media ${(p) => p.theme.media.tablet} {
    padding: 0rem 1rem;
    max-height: 46px;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DescriptionContainer = styled(P)`
  max-height: 80px;
  overflow: scroll;
  margin-bottom: 0.2rem;
`;

const DescriptionSpan = styled.span`
  font-size: 0.9rem;
`;

const ExercisesContainer = styled.div`
  padding: 0.2rem 1rem;

  ul {
    font-family: ${(p) => p.theme.font.numberFamily};
    max-height: 108px;
    overflow: scroll;
    margin-top: 0.2rem;
    margin-bottom: 1px;

    padding: 0px 0px 0px 1.5rem;

    li {
      padding: 0px;
      list-style: none;
    }
  }
`;

const ExpandBtn = styled(InlineButton)<{ isExpanded: boolean }>`
  min-width: 31px;
  font-family: ${(p) => p.theme.font.numberFamily};
  font-size: 2rem;
  background: transparent;

  transform: rotate(${(p) => (p.isExpanded ? "180deg" : "0deg")});
  transition: ${(p) => p.theme.transitions.normal};
`;

type CloneButtonProps = {
  noHover: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CloneButton = ({ noHover, onClick }: CloneButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 600);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const hoverIn = fromEvent(ref.current, "mouseenter").pipe(mapTo(true));

    const hoverOut = fromEvent(ref.current, "mouseleave").pipe(mapTo(false));

    // Wait 400ms before executing hover out animation.
    // If hover in event happens before 400ms is up,
    // cancel hover out animation.
    const sub = merge(hoverIn, hoverOut)
      .pipe(
        tap((isHovered) => isHovered && setIsHovered(true)),
        debounceTime(400),
        switchMap((isHovered) =>
          of(isHovered).pipe(
            tap((isHovered) => !isHovered && setIsHovered(false)),
            takeUntil(hoverIn)
          )
        )
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [ref]);

  return (
    <CloneBtn
      onClick={onClick}
      isHovered={isHovered && isMounted && !noHover}
      ref={ref}
    >
      Clone
    </CloneBtn>
  );
};

const CloneBtn = styled(InlineButton)<{
  isHovered: boolean;
}>`
  position: absolute;
  display: block;
  bottom: 33px;
  right: 5px;
  transform: rotate(90deg) scale(1);
  transition: ${(p) => p.theme.transitions.normal};
  animation: ${FadeInKeyframe} 700ms ease-in-out both;

  ${(p) =>
    p.isHovered &&
    css`
      min-height: 30px;
      right: 18px;
      bottom: 25px;
      transform: rotate(0deg) scale(1.5);
      color: ${p.theme.colors.background};
      background-image: ${p.theme.colors.superGradient};
      background-size: 400% 200%;
      animation: ${ShimmerBackgroundKeyframe} 3s infinite alternate,
        ${BoxShadowFlicker(p.theme.name)} 10s infinite alternate;

      :hover {
        color: ${p.theme.colors.background};
      }
    `}

  :active {
    transform: rotate(0deg) scale(1);
  }
`;
