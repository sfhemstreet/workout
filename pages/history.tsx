import React from "react";
import isEqual from "lodash.isequal";

import { LoadingShimmer } from "../components/LoadingShimmer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import styled from "@emotion/styled";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { useDispatch } from "react-redux";
import { openSignInModal } from "../redux/ducks/signInModal";
import { InlineButton } from "../components/Buttons";
import { useRouter } from "next/router";

/**
 * History Page
 *
 * `/history`
 */
export default function HistoryPage() {
  const { user } = useAppSelector((state) => ({ user: state.user }), isEqual);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const goToWorkout = (workoutId: string) => {
    router.push({ pathname: "/workout", query: { id: workoutId } });
  };

  if (user.isLoading) return <LoadingShimmer />;

  if (user.workoutsCompleted.length === 0)
    return (
      <div>
        Looks like you haven't completed any workouts yet.
        <br />
        Maybe you need to{" "}
        <InlineButton isUnderlined onClick={() => dispatch(openSignInModal())}>
          login
        </InlineButton>
        ?
      </div>
    );

  return (
    <List>
      <Item isTitle>
        <span>Name</span>
        <span>Date</span>
      </Item>
      {user.workoutsCompleted.map((completedWorkout, index) => (
        <Item
          key={index}
          isOdd={index % 2 === 1}
          onClick={() => goToWorkout(completedWorkout.workoutId)}
          role="button"
        >
          <span>{completedWorkout.name}</span>
          <span>{`${completedWorkout.date
            .toTimeString()
            .substring(
              0,
              completedWorkout.date.toTimeString().lastIndexOf(":")
            )} ${completedWorkout.date.toDateString()}`}</span>
        </Item>
      ))}
    </List>
  );
}

const List = styled.ul`
  ${(p) => SurfaceElevation(p.theme.name, 1)};
  border-radius: 8px;
  padding: 1rem;
  list-style: none;
`;

const Item = styled.li<{ isTitle?: boolean; isOdd?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${(p) =>
    p.isTitle ? p.theme.colors.onSurfaceLowEmp : p.theme.colors.onSurface};
  background-color: ${(p) => (p.isOdd ? p.theme.colors.background : "initial")};
  border-bottom: ${(p) =>
    p.isTitle ? `1px solid ${p.theme.colors.onSurfaceDisabled}` : "none"};

  cursor: pointer;

  span {
    padding: 1rem;
  }
`;
