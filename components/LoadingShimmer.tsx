import styled from "@emotion/styled";
import { TransitionStatus } from "react-transition-group";
import { ShimmerBackgroundKeyframe } from "../styles/keyframes";
import { CssUnit, Margin } from "../styles/mixins";

type LoadingShimmerProps = {
  width?: `${number}${CssUnit}`;
  height?: `${number}${CssUnit}`;
  borderRadius?: `${number}${CssUnit}`;
  transitionStatus?: TransitionStatus;
  margin?: Margin;
};

/**
 * LoadingShimmer
 * 
 * Renders a div with a moving gradient background.
 * 
 * @param width default `100%`
 * @param height default `100%`
 * @param borderRadius default `0%`
 * @param transitionStatus default `entered`
 * @param margin default `0px`
 */
export const LoadingShimmer = ({
  width = "100%",
  height = "100%",
  borderRadius = "0%",
  transitionStatus = "entered",
  margin = "0px"
}: LoadingShimmerProps) => (
  <Shimmer
    width={width}
    height={height}
    borderRadius={borderRadius}
    transitionStatus={transitionStatus}
    margin={margin}
  />
);

const Shimmer = styled.div<{
  width: `${number}${CssUnit}`;
  height: `${number}${CssUnit}`;
  borderRadius: `${number}${CssUnit}`;
  transitionStatus: TransitionStatus;
  margin: Margin;
}>`
  animation: ${ShimmerBackgroundKeyframe} 9s alternate infinite ease-in-out;
  background-image: ${p => p.theme.colors.superGradient};
  background-size: 400% 100%;
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  border-radius: ${(p) => p.borderRadius};
  overflow: hidden;
  margin: ${(p) => p.margin};
  padding: 0px;

  opacity: ${(p) =>
    p.transitionStatus === "entering" || p.transitionStatus === "entered"
      ? 1
      : 0};
  ${(p) => p.transitionStatus && `transition: ${p.theme.transitions.normal};`};
`;
