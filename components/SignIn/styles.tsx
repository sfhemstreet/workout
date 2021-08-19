import styled from "@emotion/styled";
import { TransitionStatus } from "react-transition-group";
import { FadeInKeyframe } from "../../styles/keyframes";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { TertiaryButton, InlineButton } from "../Buttons";

export const Container = styled.form<{ transitionStatus: TransitionStatus }>`
  position: relative;
  min-width: 100%;
  height: fit-content;
  padding: 20px;

  border-radius: 9px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  ${(p) => SurfaceElevation(p.theme.name, 2)};

  opacity: ${p => p.transitionStatus === "entered" || p.transitionStatus === "entering"
    ? 1
    : 0};
  animation: ${FadeInKeyframe} 300ms ease-in-out;
  transition: all 300ms linear;

  @media ${p => p.theme.media.tablet} {
    min-width: 500px;
    max-width: 500px;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
`;

export const ButtonRow = styled(Row)`
  width: 70%;
`;

export const ValidationRow = styled(Row)`
  justify-content: flex-start;
`;

export const ValidationSpan = styled.span`
  padding-left: 10px;
`;

export const ValidationContainer = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;
  max-width: 300px;

  @media ${p => p.theme.media.tablet} {
    max-width: 350px;
  }
`;

export const ErrorText = styled.div`
  text-align: center;
  max-height: 18px;
  margin: 5px 0px 15px 0px;
  /* font-size: 14px; */
  color: ${(p) => p.theme.colors.error};
`;

export const ForgotPasswordBtn = styled(InlineButton)`
  font-size: 0.8rem;
  align-self: flex-start;
  position: relative;
  top: 5px;
  color: ${p => p.theme.colors.onSurfaceLowEmp};
`;

export const CloseButton = styled(TertiaryButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 2rem;
  width: 50px;
  min-width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
