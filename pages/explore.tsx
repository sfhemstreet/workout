import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { SwitchTransition, Transition } from "react-transition-group";
import { combineLatest, forkJoin } from "rxjs";
import { map } from "rxjs/operators";
import { SearchTags } from "../components/SearchTags";
import { SearchText } from "../components/SearchText";
import { H3 } from "../components/Txt";
import { WorkoutPreview } from "../components/WorkoutPreview";
import { WorkoutPreviewLoadingShimmers } from "../components/WorkoutPreviewLoadingShimmers";
import { fetchLatestWorkouts$ } from "../redux/epics/util/fetchLatestWorkouts$";
import { fetchPopularWorkouts$ } from "../redux/epics/util/fetchPopluarWorkouts$";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { Workout } from "../types";
import { Tag } from "../types/Tag";

type WorkoutData = {
  workouts: Workout[];
  isLoading: boolean;
};

const DEFAULT_WORKOUT_DATA: WorkoutData = {
  workouts: [],
  isLoading: true,
};

/**
 * Explore Page 
 * 
 * `/edit`
 * 
 * - search for workouts
 * - look at there own workouts
 * - select workouts to do
 * - select workouts to edit
 * - select to create a workout
 */
export default function ExplorePage() {
  const router = useRouter();
  const [latest, setLatest] = useState({ ...DEFAULT_WORKOUT_DATA });
  const [popular, setPopular] = useState({ ...DEFAULT_WORKOUT_DATA });

  useEffect(() => {
    const exploreSubscription$ = combineLatest([
      fetchLatestWorkouts$.pipe(
        map((workouts) => setLatest({ isLoading: false, workouts }))
      ),
      fetchPopularWorkouts$.pipe(
        map((workouts) => setPopular({ isLoading: false, workouts }))
      ),
    ]).subscribe();

    return () => exploreSubscription$.unsubscribe();
  }, []);

  return (
    <Container>
      <H3>Latest Workouts</H3>
      <WorkoutsContainer>
        <SwitchTransition mode="out-in">
          <Transition
            key={latest.isLoading ? "loading" : "results"}
            timeout={300}
          >
            {(transitionStatus) =>
              latest.isLoading ? (
                <WorkoutPreviewLoadingShimmers
                  transitionStatus={transitionStatus}
                />
              ) : (
                latest.workouts.map((workout) => (
                  <WorkoutPreview
                    key={`latest-${workout.id}`}
                    workout={workout}
                  />
                ))
              )
            }
          </Transition>
        </SwitchTransition>
      </WorkoutsContainer>
      <SearchTags />
    </Container>
  );
}

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
`;
