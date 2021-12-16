import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { SearchTags } from "../components/SearchTags";
import { BrowseWorkouts } from "../components/BrowseWorkouts";

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

  useEffect(() => {
    setTimeout(() => router.prefetch("/workout"), 500);
  }, []);

  return (
    <Container>
      <BrowseWorkouts />
      <SearchTags />
    </Container>
  );
}

const Container = styled.section`
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;
