import React, { useState } from "react";
import styled from "@emotion/styled";
import { TransitionStatus } from "react-transition-group";

import { Workout } from "../../types";
import { H5, LowEmpSpan, NumberSpan, P } from "./../Txt";
import { REST_PERIOD } from "../../constants";
import { InlineButton, TertiaryButton } from "./../Buttons";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { FadeInOut } from "./../FadeInOut";
import { CloneButton } from "./CloneButton";

type WorkoutPreviewProps = {
  workout: Workout;
  onClick?: () => void;
  isSelected?: boolean;
  transitionStatus?: TransitionStatus;
  onClone?: () => void;
  action?: {
    onClick: () => void;
    label: string;
  };
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
 * @param action optional aux action 
 */
export const WorkoutPreview = ({
  workout: { name, description, difficulty, exercises, rounds, creator },
  onClick,
  isSelected,
  transitionStatus,
  onClone,
  action,
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

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    action && action.onClick();
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
            {creator.avatar !== "" && (
              <>
                <P padding={"0.5rem 1rem 0px 1rem"}>
                  <LowEmpSpan>Created By:</LowEmpSpan>
                </P>

                <CreatorRow>
                  <P padding={"0.2rem 1rem 0.2rem 0rem"}>{creator.name}</P>
                  <Avatar src={creator.avatar} />
                </CreatorRow>
              </>
            )}

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

            <ExercisesContainer marginBottom={typeof action !== "undefined"}>
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

            {action && (
              <ActionBtn onClick={handleRemove}>{action.label}</ActionBtn>
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
  overflow: ${(p) => (p.isExpanded ? "scroll" : "hidden")};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  max-height: ${(p) => (p.isExpanded ? "800px" : "60px")};

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

  @media (min-width: 358px) {
    width: 300px;
  }

  @media ${(p) => p.theme.media.tablet} {
    max-height: ${(p) => (p.isExpanded ? "800px" : "73px")};
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

const ExercisesContainer = styled.div<{marginBottom: boolean}>`
  margin-bottom: ${p => p.marginBottom ? "3rem" : "0"};
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

const CreatorRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.3rem 1rem;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

const ActionBtn = styled(TertiaryButton)`
  position: absolute;
  bottom: 0px;
  margin-top: 1rem;
  margin-left: 0.2rem;
  font-size: 1rem;
  color: ${p => p.theme.colors.onSurfaceLowEmp};
  

`;
