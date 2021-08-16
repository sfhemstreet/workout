import styled from "@emotion/styled";
import React from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { FadeInOutMixin } from "./FadeInOut";

type Side = "left" | "right";

type SideBarProps = {
  isOpen: boolean;
  closeSideBar: () => void;
  side?: Side;
};

/**
 * SideBar
 * 
 * Mounts children when open, unmounts when closed
 * 
 * @param isOpen determines if sidebar is open or closed
 * @param closeSideBar function to close sidebar
 * @param side determines side of screen sidebar opens on, 'left' or 'right' 
 */
export const SideBar: React.FC<SideBarProps> = ({
  isOpen,
  side = "left",
  closeSideBar,
  children,
}) => (
  <Transition
    in={isOpen}
    timeout={{
      enter: 0,
      exit: 400,
    }}
    mountOnEnter
    unmountOnExit
  >
    {(transitionStatus) => (
      <SideBarBackground
        side={side}
        transitionStatus={transitionStatus}
        onClick={closeSideBar}
      >
        <SideBarMenu
          side={side}
          transitionStatus={transitionStatus}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </SideBarMenu>
      </SideBarBackground>
    )}
  </Transition>
);

const SideBarBackground = styled.div<{
  side: Side;
  transitionStatus: TransitionStatus;
}>`
  display: grid;
  grid-template-columns: ${(p) =>
    p.side === "left" ? "250px 1fr" : "1fr 250px"};
  grid-template-rows: 1fr;

  position: fixed;
  z-index: 1000;
  top: 0px;
  left: 0px;

  width: 100%;
  height: 100%;

  overflow-y: scroll;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);

  ${(p) => FadeInOutMixin(p.transitionStatus)};

  padding: 2px;
  margin: 0px;
  
  border-radius: 5px;

  @media ${(p) => p.theme.media.laptop} {
    padding: 10px;
    border-radius: 10px;
  }

  @supports not (backdrop-filter: blur(2px)) {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const SideBarMenu = styled.aside<{
  side: Side;
  transitionStatus: TransitionStatus;
}>`
  grid-column: ${(p) => (p.side === "left" ? 1 : 2)};
  grid-row: 1;

  height: 100%;

  ${(props) => SurfaceElevation(props.theme.name, 2, true)};

  transform: ${(p) =>
    p.transitionStatus === "entered"
      ? `translateX(0px)`
      : `translateX(${p.side === "left" ? "-" : ""}250px)`};
  transition: ${(p) => p.theme.transitions.normal};
`;
