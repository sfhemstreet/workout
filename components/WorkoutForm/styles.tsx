import styled from "@emotion/styled";
import { TransitionStatus } from "react-transition-group";

import { BoxShadowFlicker, FadeInKeyframe } from "../../styles/keyframes";
import { Margin } from "../../styles/mixins";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { P } from "../Txt";

export const DialogWindow = styled.div`
  width: 280px;
  height: 280px;

  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  text-align: center;

  ${(p) => SurfaceElevation(p.theme.name, 4)};
  border-radius: 10px;

  animation: ${BoxShadowFlicker} 5s infinite alternate;
`;

export const Form = styled.form`
  border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 1)};

  padding: 15px;
  transition: ${(p) => p.theme.transitions.normal};

  max-width: 1000px;
`;

export const ExercisesContainer = styled.section`
  display: flex;
  flex-direction: column;
  transition: 500ms linear;
  position: relative;
`;

export const ExerciseContainer = styled.section<{
  transitionStatus: TransitionStatus;
}>`
  padding: 15px;
  margin: 15px 0px;
  border-radius: 10px;

  opacity: ${(p) =>
    p.transitionStatus === "entered" || p.transitionStatus === "entering"
      ? 1
      : 0};
  filter: ${(p) =>
    p.transitionStatus === "entered" || p.transitionStatus === "entering"
      ? "none"
      : "blur(2px)"};

  transition: ${(p) => p.theme.transitions.normal};

  animation: ${FadeInKeyframe} 300ms ease-in-out;

  ${(p) => SurfaceElevation(p.theme.name, 2)};
`;

type RowProps = {
  justifyContent:
    | "space-between"
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-evenly";
  margin?: Margin;
  isColumnOnMobile?: boolean;
};

export const Row = styled.div<RowProps>`
  display: flex;
  justify-content: ${(p) => p.justifyContent};
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: ${(p) => (p.isColumnOnMobile ? "column" : "row")};

  ${(p) => p.margin && `margin: ${p.margin};`};

  @media ${(p) => p.theme.media.tablet} {
    flex-direction: row;
  }
`;

export const LowEmpSpan = styled.span`
  color: ${(p) => p.theme.colors.onSurfaceLowEmp};
`;

export const MarginLeft = styled.div`
  margin-left: 42px;
`;

export const ErrorP = styled(P)`
  color: ${(p) => p.theme.colors.error};
  width: fit-content;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


