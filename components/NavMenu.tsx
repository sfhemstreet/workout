import styled from "@emotion/styled";
import React from "react";
import { TransitionStatus } from "react-transition-group";

import { ActiveWorkout, Workouts } from "../types";
import { Hamburger } from "./Buttons";
import { FadeInOut } from "./FadeInOut";
import { SideBar } from "./SideBar";
import { H4, H5, P } from "./Txt";
import { BoxShadowFlicker } from "../styles/keyframes";

type NavMenuProps = {
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
  workouts: Workouts;
  activeWorkout: ActiveWorkout;
  actions: {
    goToHome: () => void;
    goToActiveWorkout: () => void;
    goToWorkout: (workoutId: string) => void;
    goToAbout: () => void;
    goToExplore: () => void;
    goToHistory: () => void;
    goToEdit: () => void;
    goToCreate: () => void;
    goToMyWorkouts: () => void;
  };
};

/**
 * NavMenu
 *
 * Nav element for navigating around Workout.
 * On smaller screens displays a hamburger button that when clicked opens up the menu in a sidebar.
 *
 * @param isSideBarOpen when `true` NavMenu is displayed in sidebar on left side of screen
 * @param toggleSideBar function to control open and close of sidebar
 * @param workouts user's saved workouts
 * @param activeWorkout user's active workout
 * @param actions functions for navigation
 */
export const NavMenu = ({
  isSideBarOpen,
  toggleSideBar,
  workouts,
  activeWorkout,
  actions,
}: NavMenuProps) => (
  <>
    <Container>
      <Hamburger onClick={toggleSideBar} />
      <Content
        actions={actions}
        workouts={workouts}
        activeWorkout={activeWorkout}
      />
    </Container>
    <SideBar isOpen={isSideBarOpen} side="left" closeSideBar={toggleSideBar}>
      <Content
        isSideBar
        actions={actions}
        workouts={workouts}
        activeWorkout={activeWorkout}
      />
    </SideBar>
  </>
);

interface ContentProps
  extends Omit<NavMenuProps, "isSideBarOpen" | "toggleSideBar"> {
  isSideBar?: boolean;
}

const Content = ({
  isSideBar,
  workouts,
  activeWorkout,
  actions,
}: ContentProps) => (
  <ContentList isDesktopSidebar={isSideBar}>
    <ContentItem>
      <MenuTitle>Menu</MenuTitle>
    </ContentItem>

    <ContentItem>
      <LinkBtn onClick={actions.goToHome}>
        <span>🏡</span> Home
      </LinkBtn>
    </ContentItem>

    <ContentItem>
      <LinkBtn onClick={actions.goToExplore}>
        <span>🛸</span> Explore
      </LinkBtn>
    </ContentItem>

    <ContentItem>
      <LinkBtn onClick={actions.goToCreate}>
        <span>🛠</span> Create
      </LinkBtn>
    </ContentItem>

    <ContentItem>
      <LinkBtn onClick={actions.goToEdit}>
        <span>🎛</span> Edit
      </LinkBtn>
    </ContentItem>

    <ContentItem>
      <LinkBtn onClick={actions.goToHistory}>
        <span>📜</span> History
      </LinkBtn>
    </ContentItem>

    <ContentItem>
      <LinkBtn onClick={actions.goToAbout}>
        <span>❓</span> About
      </LinkBtn>
    </ContentItem>

    <YourWorkoutsContainer>
      <LinkBtn onClick={actions.goToMyWorkouts}>
        <span>❤️</span> My Workouts
      </LinkBtn>
      
      {workouts.list.length > 0 ? (
        workouts.list.map((workout) => (
          <SmallLinkBtn
            key={workout.id}
            onClick={() => actions.goToWorkout(workout.id)}
          >
            {workout.name}
          </SmallLinkBtn>
        ))
      ) : (
        <P padding="0rem 30px">None 😢</P>
      )}
    </YourWorkoutsContainer>

    <FadeInOut
      isShowing={
        activeWorkout.id !== "" &&
        activeWorkout.isStarted &&
        !activeWorkout.isCompleted
      }
      render={(transitionStatus) => (
        <ActiveWorkoutContainer transitionStatus={transitionStatus}>
          <LinkBtn onClick={actions.goToActiveWorkout}>
            <span>💥</span> Active Workout: {activeWorkout.name}
          </LinkBtn>
        </ActiveWorkoutContainer>
      )}
    />
  </ContentList>
);

const MenuTitle = styled(H4)`
  color: ${(p) => p.theme.colors.onBackgroundLowEmp};
`;

const ContentList = styled.ul<{ isDesktopSidebar?: boolean }>`
  display: ${(p) => (p.isDesktopSidebar ? "block" : "none")};
  padding: 2px;
  margin: 0px;

  ${(p) =>
    !p.isDesktopSidebar &&
    `box-shadow: 0px 1px 5px 0px
    ${
      p.theme.name === "DARK" ? `rgba(255, 255, 255, 0.281)` : `rgba(0,0,0,0.2)`
    }; background-color: ${
      p.theme.name === "DARK"
        ? `rgba(44, 44, 44, 0.4)`
        : `rgba(241, 241, 241, 0.2)`
    }`};

  @media ${(p) => p.theme.media.laptop} {
    border-radius: 10px;
    display: block;

    padding: 10px;
  }
`;

const ContentItem = styled.li<{ transitionStatus?: TransitionStatus }>`
  list-style: none;

  opacity: ${(p) =>
    p.transitionStatus ? (p.transitionStatus === "entered" ? 1 : 0) : 1};
  transition: ${(p) => p.theme.transitions.normal};
`;

const Container = styled.section`
  width: 100%;
  height: auto;
`;

const LinkBtn = styled.button`
  position: relative;
  font-size: 1.2rem;
  padding: 1rem;
  width: 100%;
  border: transparent 1px solid;
  border-radius: 10px;
  background: inherit;
  text-align: left;
  cursor: pointer;

  color: ${(p) => p.theme.colors.onBackground};

  transition: color 700ms ease-in-out, border 700ms ease-in-out,
    animation 300ms ease-in-out;

  span {
    display: inline-block;
    background: transparent;
    transition: transform 600ms ease-in-out;
    transform: scale(1);
  }

  :hover {
    animation: ${(p) => BoxShadowFlicker(p.theme.name)} 6s ease-in-out both;
    border: ${(p) => p.theme.colors.secondary} 1px solid;
    color: ${(p) =>
      p.theme.name === "DARK"
        ? p.theme.colors.secondary
        : p.theme.colors.primary};

    span {
      transform: scale(1.4);
    }
  }
`;

const SmallLinkBtn = styled(LinkBtn)`
  font-size: 1rem;
  width: 100%;
  padding: 5px 5px 5px 30px;
`;

const YourWorkouts = styled(H5)`
  font-size: 1rem;
  color: ${(p) => p.theme.colors.onBackgroundLowEmp};
  padding-bottom: 5px;
`;

const YourWorkoutsContainer = styled(ContentItem)`
  padding-bottom: 20px;
`;

const ActiveWorkoutContainer = styled(ContentItem)`
  button {
    font-size: 1rem;
  }
`;
