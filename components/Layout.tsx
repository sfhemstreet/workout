import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
} from "react-transition-group";

import { H1, NumberSpan } from "./Txt";
import { BoxShadowFlicker } from "../styles/keyframes";

type LayoutProps = {
  children: ReactNode;
  pageTitle: string;
  userMenu: JSX.Element;
  navMenu: JSX.Element;
};

/**
 * Layout
 *
 * Provides dashboard like structure and styling for website. 
 * Wraps pages and gives consistent look and feel.
 *
 * @param children page component that renders in middle of screen
 * @param userMenu component that goes on right side of screen for user options
 * @param navMenu component that goes on left side of screen for navigation
 * @param pageTitle displays at top of screen
 */
export const Layout: React.FC<LayoutProps> = ({
  children,
  userMenu,
  navMenu,
  pageTitle,
}) => (
  <BG>
    <Container>
      <TitleArea>
        <SwitchTransition mode="out-in">
          <Transition
            key={pageTitle}
            timeout={{ enter: 150, exit: 150, appear: 150 }}
          >
            {(transitionStatus) => (
              <Title transitionStatus={transitionStatus}>
                <NumberSpan>{pageTitle}</NumberSpan>
              </Title>
            )}
          </Transition>
        </SwitchTransition>
      </TitleArea>
      <UserArea>{userMenu}</UserArea>
      <MenuArea>{navMenu}</MenuArea>
      <MainArea>
        <SwitchTransition mode="out-in">
          <Transition
            key={`${pageTitle}-children`}
            timeout={{ enter: 300, exit: 300, appear: 300 }}
          >
            {(transitionStatus) => (
              <MainAreaFade transitionStatus={transitionStatus}>
                {children}
              </MainAreaFade>
            )}
          </Transition>
        </SwitchTransition>
      </MainArea>
    </Container>
  </BG>
);

const Title = styled(H1)<{ transitionStatus: TransitionStatus }>`
  padding: 0px;
  transform: ${(p) =>
    p.transitionStatus === "exiting"
      ? `rotateX(-90deg)`
      : p.transitionStatus === "exited"
      ? `rotateX(-190deg)`
      : p.transitionStatus === "entering"
      ? `rotateX(90deg)`
      : `rotateX(0deg)`};

  opacity: ${(p) =>
    p.transitionStatus === "exiting" || p.transitionStatus === "exited"
      ? `0`
      : `1`};

  backface-visibility: visible;
  perspective: 200px;
  transition: 150ms linear;
  transform-style: preserve-3d;

  cursor: default;
`;

const BG = styled.div`
  padding: 2px;
  margin: 0px;

  height: 100%;
  overflow: scroll;

  border-radius: 5px;

  background: ${(p) => p.theme.colors.background};
  background: ${(p) => p.theme.colors.backgroundGradient};

  animation: ${(p) => BoxShadowFlicker(p.theme.name)} 20s ease-in-out infinite
    both alternate;

  @media ${(p) => p.theme.media.laptop} {
    padding: 10px;
    border-radius: 10px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: max-content;

  display: grid;
  grid-template-columns: 60px auto 60px;
  grid-template-rows: 60px 1fr;
  gap: 10px 10px;

  @media ${(p) => p.theme.media.laptop} {
    grid-template-columns: 250px 1fr;
    gap: 20px 20px;
  }

  @media ${(p) => p.theme.media.laptopM} {
    grid-template-columns: 250px 1fr 250px;
    gap: 20px 20px;
  }
`;

const TitleArea = styled.div`
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  align-self: center;
`;

const UserArea = styled.aside`
  grid-column: 3;
  grid-row: 1;

  justify-self: center;
  align-self: center;

  @media ${(p) => p.theme.media.laptopM} {
    grid-row: 1 / 3;
    align-self: start;
  }
`;

const MenuArea = styled.nav`
  grid-column: 1;
  grid-row: 1;

  @media ${(p) => p.theme.media.laptop} {
    grid-column: 1;
    grid-row: 1 / 3;
  }
`;

const MainArea = styled.main`
  grid-column: 1 / 4;
  grid-row: 2;

  justify-self: center;

  width: 100%;
  height: 100%;
  min-height: 100%;
  border-radius: 10px;
  padding: 2px;

  @media ${(p) => p.theme.media.laptop} {
    grid-column: 2 / 4;
    grid-row: 2;
  }

  @media ${(p) => p.theme.media.laptopM} {
    grid-column: 2 / 3;
    grid-row: 2;
  }
`;

const MainAreaFade = styled.div<{ transitionStatus: TransitionStatus }>`
  opacity: ${(p) =>
    p.transitionStatus === "exiting" || p.transitionStatus === "exited"
      ? `0`
      : `1`};

  transition: 300ms linear;
`;
