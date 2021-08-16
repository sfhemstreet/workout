import { keyframes } from "@emotion/react";
import { ThemeType } from "../types";

export const ShimmerBackgroundKeyframe = keyframes`
  0% { 
    background-position: 0% 0%; 
  }
  100% { 
    background-position: 100% 0%; 
  }
`;

export const FadeInKeyframe = keyframes`
  0% { 
    opacity: 0; 
  }
  100% { 
    opacity: 1; 
  }
`;

export const SlowlyFlickerFrame = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

export const CountdownKeyFrame = (endOffset: number) => keyframes`
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: ${endOffset}px;
  }
`;

export const BoxShadowFlicker = (themeType: ThemeType) => keyframes`
  0% {
    box-shadow: 0px 1px 5px 0px ${
      themeType === "DARK"
        ? `rgba(187, 134, 252, 0.7)`
        : `rgba(98, 0, 238, 0.7)`
    }
  }
  25% {
    box-shadow: 0px 1px 7px 0px ${
      themeType === "DARK"
        ? `rgba(187, 134, 252, 0.5)`
        : `rgba(98, 0, 238, 0.5)`
    }
  }
  50% {
    box-shadow: 0px 1px 10px 0px ${
      themeType === "DARK"
        ? `rgba(187, 134, 252, 0.3)`
        : `rgba(98, 0, 238, 0.3)`
    }
  }
  75% {
    box-shadow: 0px 1px 12px 0px ${
      themeType === "DARK"
        ? `rgba(187, 134, 252, 0.2)`
        : `rgba(98, 0, 238, 0.2)`
    }
  }
  100% {
    box-shadow: 0px 1px 14px 0px ${
      themeType === "DARK"
        ? `rgba(187, 134, 252, 0.5)`
        : `rgba(98, 0, 238, 0.5)`
    }
  }
`;
