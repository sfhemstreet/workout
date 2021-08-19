import styled from "@emotion/styled";
import React from "react";

import { SignInContainer } from "../containers/SignInContainer";
import { FadeInOut } from "./FadeInOut";
import { FullscreenBlurredBackground } from "./FullScreenBlurredBackground";

type SignInModalProps = {
  isShowing: boolean;
  toggleIsShowing: () => void;
  isRegistering?: boolean;
};

/**
 * SigninModal
 *
 * Mounts / Unmounts the SignInContainer in a modal
 *
 * @param isShowing controls mounting of component, when `true` modal is mounted to DOM and fades in
 * @param toggleIsShowing function to toggle isShowing on / off
 * @param isRegistering when `true` the modal renders the register inputs. Default is the signin inputs.
 */
export const SignInModal = ({
  isShowing,
  toggleIsShowing,
  isRegistering,
}: SignInModalProps) => (
  <FadeInOut
    isShowing={isShowing}
    render={(transitionStatus) => (
      <FullscreenBlurredBackground
        transitionStatus={transitionStatus}
        onClick={toggleIsShowing}
      >
        <Container onClick={(e) => e.stopPropagation()}>
          <SignInContainer isUserRegistering={isRegistering} />
        </Container>
      </FullscreenBlurredBackground>
    )}
  />
);

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 40px 20px;
`;
