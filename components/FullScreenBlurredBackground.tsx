import styled from "@emotion/styled";
import React, { useRef } from "react";
import { TransitionStatus } from "react-transition-group";
import { useTrapFocus } from "../hooks/useTrapFocus";

type FullScreenBlurredBackgroundProps = {
  children: React.ReactNode;
  transitionStatus?: TransitionStatus;
  onClick?: () => void;
};

/**
 * FullscreenBlurredBackground
 * 
 * Div that fills entire screen, blurring content below it in the DOM.
 * It also traps focus to make sure that only its children can be 'tabbed' into focus.
 *
 * Note: If browser does not support backdrop-filter the background is just darkened more.
 * 
 * @param children Child elements / components
 * @param transitionStatus controls fade-in/fade-out effect
 * @param onClick optional onClick function
 */
export const FullscreenBlurredBackground: React.FC<FullScreenBlurredBackgroundProps> =
  ({ children, transitionStatus, onClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    useTrapFocus(ref);

    return (
      <FullscreenBlurredBackgroundDiv
        transitionStatus={transitionStatus}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </FullscreenBlurredBackgroundDiv>
    );
  };

/**
 * HTMLDivElement that fills entire screen, blurring content below it in the DOM.
 *
 * If browser does not support backdrop-filter the background is darkened more.
 */
export const FullscreenBlurredBackgroundDiv = styled.div<{
  transitionStatus?: TransitionStatus;
}>`
  position: fixed;
  z-index: 9999;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  min-height: 700px;

  overflow-y: scroll;

  background-color: rgba(0, 0, 0, 0.5);

  backdrop-filter: blur(2px);

  display: flex;
  justify-content: center;

  transition: ${(p) => p.theme.transitions.normal};
  opacity: ${(p) =>
    p.transitionStatus ? (p.transitionStatus === "entered" ? 1 : 0) : 1};

  @media ${(p) => p.theme.media.tablet} {
    padding-top: 10px;
  }

  @supports not (backdrop-filter: blur(2px)) {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
