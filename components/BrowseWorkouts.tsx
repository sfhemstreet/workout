import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";

import {
  useBrowseWorkouts,
  WorkoutsSortType,
} from "../hooks/useBrowseWorkouts";
import { useWorkoutsFilter } from "../hooks/useWorkoutsFilter";
import { ShimmerBackgroundKeyframe } from "../styles/keyframes";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { FlexSetting } from "../types/FlexSetting";
import { SecondaryButton } from "./Buttons";
import { DifficultySelector } from "./DifficultySelector";
import { Toggler } from "./Toggler";
import { H3, LowEmpSpan } from "./Txt";
import { WorkoutPreview } from "./WorkoutPreview";
import { WorkoutPreviewLoadingShimmers } from "./WorkoutPreviewLoadingShimmers";

export const BrowseWorkouts = React.memo(() => {
  const { filter, onChangeDifficultyFilter } = useWorkoutsFilter();

  const [{ sort, limit }, setOptions] =
    useState<BrowseWorkoutsOptions>(DEFAULT_OPTIONS);

  const { isLoading, workouts, getMoreWorkouts, isExhausted, goToWorkout } =
    useBrowseWorkouts({
      sort,
      limit,
      difficulty: filter.difficulty,
      rating: filter.rating,
    });

  const handleChangeSort = () =>
    setOptions((prevOptions) => ({
      ...prevOptions,
      sort: prevOptions.sort === "LATEST" ? "POPULAR" : "LATEST",
    }));

  const handleChangeLimit = (newLimit: number) =>
    setOptions((prevOptions) => ({ ...prevOptions, limit: newLimit }));

  return (
    <Container>
      <H3>Browse Workouts</H3>
      <Row>
        <Toggler
          onLabel="Latest"
          offLabel="Popular"
          onToggle={handleChangeSort}
          isOn={sort === "LATEST"}
          ariaLabel={`Change sort to ${
            sort === "LATEST" ? "popular" : "latest"
          }`}
          title="Sort"
        />
        <Column>
          <LowEmpSpan padding="1rem 1rem 0rem 1rem">Difficulty</LowEmpSpan>
          <DifficultySelector
            difficulty={filter.difficulty}
            onSelect={onChangeDifficultyFilter}
          />
        </Column>
      </Row>

      <WorkoutsContainer>
        <SwitchTransition mode="out-in">
          <Transition key={isLoading ? "loading" : "results"} timeout={300}>
            {(transitionStatus) =>
              isLoading ? (
                <WorkoutPreviewLoadingShimmers
                  transitionStatus={transitionStatus}
                />
              ) : (
                workouts.map((workout) => (
                  <WorkoutPreview
                    key={`browse-${workout.id}`}
                    workout={workout}
                    onClick={() => goToWorkout(workout.id)}
                  />
                ))
              )
            }
          </Transition>
        </SwitchTransition>
      </WorkoutsContainer>

      {!isExhausted && workouts.length > 0 && (
        <LoadMoreBtn
          disabled={isLoading}
          isLoading={isLoading}
          onClick={getMoreWorkouts}
        >
          More Workouts!
        </LoadMoreBtn>
      )}
    </Container>
  );
});

type BrowseWorkoutsOptions = {
  sort: WorkoutsSortType;
  limit: number;
};

const DEFAULT_OPTIONS: BrowseWorkoutsOptions = {
  sort: "POPULAR",
  limit: 10,
};

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

const LoadMoreBtn = styled(SecondaryButton)<{
  isLoading: boolean;
}>`
  ${(p) =>
    p.isLoading &&
    css`
      animation: ${ShimmerBackgroundKeyframe} 2s alternate infinite ease-in-out;
      background-image: ${p.theme.colors.superGradient};
      background-size: 400% 100%;
      overflow: hidden;
    `}

  transition: ${(p) => p.theme.transitions.normal};

  margin: 1rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Column = styled.div<{
  alignItems?: FlexSetting;
  justifyContent?: FlexSetting;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${(p) => p.justifyContent ?? "center"};
  align-items: ${(p) => p.alignItems ?? "flex-start"};
`;
