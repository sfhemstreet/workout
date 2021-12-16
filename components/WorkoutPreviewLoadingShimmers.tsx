import React from "react";
import { TransitionStatus } from "react-transition-group";
import { LoadingShimmer } from "./LoadingShimmer";

type WorkoutPreviewLoadingShimmersProps = {
  numShimmers?: number;
  transitionStatus?: TransitionStatus;
};

/**
 * WorkoutPreviewLoadingShimmers
 *
 * Displays the given number of loading shimmers, shaped like workout previews.ƒ
 *
 * @param numShimmers default `10`
 */
export const WorkoutPreviewLoadingShimmers = ({
  numShimmers = 10,
  transitionStatus,
}: WorkoutPreviewLoadingShimmersProps) => {
  const array = new Array<number>(numShimmers).fill(1).map((x, i) => x + i);

  return (
    <>
      {array.map((n) => (
        <LoadingShimmer
          key={n}
          width="300px"
          height="80px"
          borderRadius="10px"
          margin="10px"
          transitionStatus={transitionStatus}
        />
      ))}
    </>
  );
};
