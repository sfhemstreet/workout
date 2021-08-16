import React from "react";
import isEqual from "lodash.isequal";

import { LoadingShimmer } from "../components/LoadingShimmer";
import { useAppSelector } from "../redux/hooks";

/**
 * History Page
 * 
 * `/history`
 */
export default function HistoryPage() {
  const { user } = useAppSelector(
    (state) => ({ user: state.user }),
    (left, right) =>
      isEqual(left.user.workoutsCompleted, right.user.workoutsCompleted)
  );

  if (user.isLoading) return <LoadingShimmer />

  return <div>History page...</div>;
}
