import styled from "@emotion/styled";
import React, { useRef } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import { useTrapFocus } from "../hooks/useTrapFocus";

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
}) => {
  const ref = useRef<HTMLElement>(null);
  useTrapFocus(ref);

  return (
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
          onKeyDown={(e) => e.key === "Enter" && closeSideBar()}
        >
          <SideBarMenu
            side={side}
            transitionStatus={transitionStatus}
            onClick={(e) => e.stopPropagation()}
            ref={ref}
          >
            <OffScreenExitBtn
              onClick={closeSideBar}
              onKeyDown={(e) => e.key === "Enter" && closeSideBar()}
            >
              Close Side Bar
            </OffScreenExitBtn>
            {children}
          </SideBarMenu>
        </SideBarBackground>
      )}
    </Transition>
  );
};

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

  padding: 0px;
  margin: 0px;

  @media ${(p) => p.theme.media.laptop} {
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
  border-radius: 5px 0px 0px 5px;

  padding-top: 10px;

  ${(props) => SurfaceElevation(props.theme.name, 2, true)};

  box-shadow: inset ${(p) => (p.side === "right" ? "1px" : "-1px")} 0px 10px
    ${(p) =>
      p.theme.name === "DARK"
        ? p.theme.colors.background
        : p.theme.colors.onBackgroundDisabled};

  transform: ${(p) =>
    p.transitionStatus === "entered"
      ? `translateX(0px)`
      : `translateX(${p.side === "left" ? "-" : ""}250px)`};
  transition: ${(p) => p.theme.transitions.normal};
`;

export const OffScreenExitBtn = styled.button`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
`;
