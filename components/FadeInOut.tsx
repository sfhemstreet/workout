import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Transition, TransitionStatus } from "react-transition-group";

import { FadeInKeyframe } from "../styles/keyframes";
import { transitions } from "../styles/transitions";

type FadeInOutProps = {
  isShowing: boolean;
  alwaysMounted?: boolean;
  children?: ReactNode;
  render?: (transitionStatus: TransitionStatus) => void;
  timeout?:
    | {
        enter?: number;
        exit?: number;
        appear?: number;
      }
    | number;
};

/**
 * FadeInOut wraps a Transition component from `react-transition-group`
 * to fade in and out components with the same timeout and transition settings.
 *
 * @param isShowing controls if component is faded in or not
 * @param alwaysMounted optional, if true keeps component mounted to the DOM while faded out
 * @param children child components to render, they will be wrapped with div that fades
 * @param render optional, render method passes the transitionStatus, overrides children
 * @param timeout optional, times in ms for enter, exit, appear. Default `enter: 300, exit: 800, appear: 300`
 */
export const FadeInOut: React.FC<FadeInOutProps> = ({
  isShowing,
  alwaysMounted = false,
  children,
  render,
  timeout,
}) => {
  // Give default arguments for timeout
  if (!timeout) {
    timeout = { enter: 300, exit: 800, appear: 300 };
  } else if (typeof timeout === "object") {
    // Override defaults
    timeout = { enter: 300, exit: 800, appear: 300, ...timeout };
  }

  return (
    <Transition
      in={isShowing}
      timeout={timeout}
      unmountOnExit={!alwaysMounted}
      mountOnEnter={!alwaysMounted}
      appear={false}
    >
      {(status) =>
        render ? (
          render(status)
        ) : (
          <Container status={status}>{children}</Container>
        )
      }
    </Transition>
  );
};

const Container = styled.div<{ status: TransitionStatus }>`
  width: 100%;
  height: 100%;

  ${(p) => FadeInOutMixin(p.status)};
`;

/**
 * FadeInOutMixin
 * 
 * Adds css properties to fade in and out any HTML element. 
 * 
 * @param transitionStatus 
 */
export const FadeInOutMixin = (transitionStatus: TransitionStatus) => css `
  opacity: ${transitionStatus === "entered"
    ? 1
    : 0};
  animation: ${FadeInKeyframe} 300ms ease-in-out both;
  transition: ${transitions.normal};
`;

/**
 * HTMLDivElement that fades in and out thru the transitionStatus prop
 * using the FadeInOutMixin.
 * 
 * @param transitionStatus
 */
export const FadableDiv = styled.div<{ transitionStatus: TransitionStatus }>`
  ${(p) => FadeInOutMixin(p.transitionStatus)};
`;
