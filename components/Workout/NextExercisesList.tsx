import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { REST_PERIOD } from "../../constants";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { Exercise } from "../../types";
import { getExerciseDurationDisplayString } from "../../utils/getExerciseDurationDisplayString";
import { NumberSpan } from "../Txt";

type NextExercisesListProps = {
  exercises: Exercise[];
  currentExerciseId: string;
  isStarted?: boolean;
};

/**
 * NextExerciseList
 * 
 * Displays list of exercises in workout, 
 * highlight's of the current exercise and crosses out completed exercises.
 * 
 * @param exercises exercises in workout
 * @param currentExerciseId current exercise's id
 * @param isStarted workouts running status
 */
export const NextExercisesList = ({
  exercises,
  currentExerciseId,
  isStarted,
}: NextExercisesListProps) => {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRef = useRef<HTMLLIElement>(null);

  const currentExerciseIndex = exercises.reduce(
    (accIndex, exercise, currentIndex) =>
      exercise.id === currentExerciseId ? currentIndex : accIndex,
    0
  );

  const list = exercises.map((e, i) => {
    const distanceFromCurrent = i - currentExerciseIndex;

    return (
      <Item
        key={e.id}
        distance={isStarted === false ? 1 : distanceFromCurrent}
        ref={e.id === currentExerciseId ? itemRef : undefined}
        shouldShrink={e.name.length > 23}
      >
        <span>{e.name === REST_PERIOD ? "Rest" : e.name}:</span>
        <NumberSpan>
          {e.duration !== 0
            ? getExerciseDurationDisplayString(e.duration, true)
            : e.repetitions !== 0
            ? `${e.repetitions}`
            : ""}
        </NumberSpan>
      </Item>
    );
  });

  // When the currentExerciseId changes,
  // scroll the list to show the item.
  useEffect(() => {
    if (listRef.current && itemRef.current) {
      listRef.current.scrollTo({
        top: itemRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentExerciseId]);

  return (
    <Container>
      <Title>
        <h5>Exercise</h5>
        <h5>Duration/Reps</h5>
      </Title>
      <List showAll={isStarted === false} ref={listRef}>
        {list}
      </List>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 2)};
  padding: 0px 5px 5px 5px;
  position: relative;
  z-index: -1;
`;

const List = styled.ol<{ showAll: boolean }>`
  ${(p) => SurfaceElevation(p.theme.name, 2)};
  border-radius: 10px;
  padding: 5px;
  margin: 0px;

  list-style: none;

  width: 250px;
  max-height: ${(p) => (p.showAll ? "100%" : "80px")};

  overflow-y: scroll;
  // Important: This makes the scroll function
  position: relative;

  scrollbar-width: none;

  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media ${(p) => p.theme.media.tablet} {
    width: 300px;
    max-height: ${(p) => (p.showAll ? "100%" : "200px")};
  }

  @media ${(p) => p.theme.media.laptopL} {
    width: 400px;
    max-height: ${(p) => (p.showAll ? "100%" : "400px")};
  }
`;

const Item = styled.li<{
  isCurrent?: boolean;
  distance: number;
  shouldShrink: boolean;
}>`
  color: ${(p) =>
    p.distance < 0
      ? p.theme.colors.onSurfaceDisabled
      : p.distance === 0
      ? p.theme.colors.primary
      : p.theme.colors.onSurface};

  text-decoration: ${(p) => (p.distance < 0 ? "line-through" : "none")};

  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  span:first-of-type {
    ${(p) => p.shouldShrink && "font-size: 0.8rem;"};
  }

  @media ${(p) => p.theme.media.laptop} {
    font-size: 1.3rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  h5 {
    padding-bottom: 0.5rem;
  }
`;
