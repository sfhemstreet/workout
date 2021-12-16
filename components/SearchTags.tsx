import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { Subject } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { useWorkoutsFilter } from "../hooks/useWorkoutsFilter";

import { searchWorkoutsByTags$ } from "../redux/epics/util/searchWorkoutsByTags$";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { Workout } from "../types";
import { Tag } from "../types/Tag";
import { Column } from "./BrowseWorkouts";
import { DifficultySelector } from "./DifficultySelector";
import { RatingsSelector } from "./RatingsSelector";
import { TagSelector } from "./TagSelector";
import { H3, LowEmpSpan, P } from "./Txt";
import { WorkoutPreview } from "./WorkoutPreview";
import { WorkoutPreviewLoadingShimmers } from "./WorkoutPreviewLoadingShimmers";

const searchTags$ = new Subject<Tag[]>();

/**
 * SearchTags
 *
 * Displays the TagSelector and searches for workouts that contain tags selected,
 * rendering a list of WorkoutPreview's
 *
 */
export const SearchTags = () => {
  const {
    filter: workoutsFilter,
    onChangeDifficultyFilter,
  } = useWorkoutsFilter();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Workout[]>([]);

  const handleClickTag = (tag: Tag) => {
    const tagList = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    if (tagList.length >= 11) {
      tagList.shift();
    }

    setSelectedTags(tagList);
    searchTags$.next(tagList);
  };

  useEffect(() => {
    const searchTagsSubscription$ = searchTags$
      .pipe(
        filter((tags) => tags.length > 0 && tags.length < 11),
        tap(() => setIsLoading(true)),
        switchMap((tags) => searchWorkoutsByTags$(tags)),
        map((results) => setResults(results)),
        tap(() => console.log("new")),
        tap(() => setIsLoading(false))
      )
      .subscribe();

    return () => searchTagsSubscription$.unsubscribe();
  }, []);

  return (
    <Container>
      <H3>Search workouts by tag</H3>
      <P padding="0rem 1rem 0.5rem 1rem">
        Select up to 10 tags to discover new workouts!
      </P>
      <TagSelector onClick={handleClickTag} selectedTags={selectedTags} />
      {selectedTags.length > 0 && (
        <Column alignItems="center">
          <LowEmpSpan padding="1rem 1rem 0rem 1rem">Difficulty</LowEmpSpan>
          <DifficultySelector
            difficulty={workoutsFilter.difficulty}
            onSelect={onChangeDifficultyFilter}
          />
        </Column>
      )}

      <ResultsBox>
        <SwitchTransition mode="out-in">
          <Transition key={isLoading ? "loading" : "results"} timeout={300}>
            {(transitionStatus) =>
              isLoading ? (
                <WorkoutPreviewLoadingShimmers
                  transitionStatus={transitionStatus}
                />
              ) : (
                results
                  .filter((workout) =>
                    workoutsFilter.difficulty
                      ? workout.difficulty === workoutsFilter.difficulty
                      : true
                  )
                  .filter((workout) =>
                    workoutsFilter.rating
                      ? workout.rating >= workoutsFilter.rating
                      : true
                  )
                  .map((workout) => (
                    <WorkoutPreview
                      key={workout.id}
                      workout={workout}
                      transitionStatus={transitionStatus}
                    />
                  ))
              )
            }
          </Transition>
        </SwitchTransition>
      </ResultsBox>
    </Container>
  );
};

const Container = styled.article`
  margin-top: 5rem;
  margin-bottom: 5rem;
  border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 1)};
`;

const ResultsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
