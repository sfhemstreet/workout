import styled from "@emotion/styled";
import isEqual from "lodash.isequal";
import React, { useEffect, useReducer, useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { combineLatest, from, of, Subject, timer } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";

import { firebase } from "../firebase";
import { searchWorkouts$ } from "../redux/epics/util/searchWorkouts$";
import { searchWorkoutsByTags$ } from "../redux/epics/util/searchWorkoutsByTags$";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { Workout } from "../types";
import { Tag } from "../types/Tag";
import { removeDuplicates } from "../utils/removeDuplicates";
import { LoadingShimmer } from "./LoadingShimmer";
import { TagSelector } from "./TagSelector";
import { TextInput } from "./TextInput";
import { H3, P } from "./Txt";
import { WorkoutPreview } from "./WorkoutPreview";
import { WorkoutPreviewLoadingShimmers } from "./WorkoutPreviewLoadingShimmers";

/**
 * SearchTags
 * 
 * Displays the TagSelector and searches for workouts that contain tags selected,
 * rendering a list of WorkoutPreview's
 * 
 */
export const SearchTags = () => {
  const searchTags$ = new Subject<Tag[]>();
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
        switchMap((tags) =>
          searchWorkoutsByTags$(tags)
        ),
        map((results) => setResults(results)),
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
      <ResultsBox>
        <SwitchTransition mode="out-in">
          <Transition key={isLoading ? "loading" : "results"} timeout={300}>
            {(transitionStatus) =>
              isLoading ? (
                <WorkoutPreviewLoadingShimmers
                  transitionStatus={transitionStatus}
                />
              ) : (
                results.map((workout) => (
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
  border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 2)};
`;

const ResultsBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
