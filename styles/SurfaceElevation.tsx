import { css } from "@emotion/react";
import { ElevationLevel } from "../types/ElevationLevel";
import { ThemeType } from "../types/ThemeType";
import { lightColors } from "./colors";

const lightBoxShadowMap = {
  1: `box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2); background-color: ${lightColors.background};`,
  2: `box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2); background-color: ${lightColors.background};`,
  3: `box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.2); background-color: ${lightColors.surface};`,
  4: `box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.2); background-color: ${lightColors.surface};`,
  5: `box-shadow: 0px 1px 14px 0px rgba(0,0,0,0.2); background-color: ${lightColors.surface};`,
};

const darkSurfaceColorMap = {
  1: "background-color: rgb(29, 29, 29);",
  2: "background-color: rgb(44, 44, 44);",
  3: "background-color: rgb(49, 49, 49);",
  4: "background-color: rgb(61, 61, 61);",
  5: "background-color: rgb(73, 73, 73);",
};

const darkBoxShadowMap = {
  1: `box-shadow: 0px 1px 3px 0px rgba(255, 255, 255, 0.158); ${darkSurfaceColorMap[1]};`,
  2: `box-shadow: 0px 1px 5px 0px rgba(255, 255, 255, 0.281); ${darkSurfaceColorMap[2]};`,
  3: `box-shadow: 0px 1px 8px 0px rgba(255, 255, 255, 0.301); ${darkSurfaceColorMap[3]};`,
  4: `box-shadow: 0px 1px 10px 0px rgba(255, 255, 255, 0.562); ${darkSurfaceColorMap[4]};`,
  5: `box-shadow: 0px 1px 14px 0px rgba(255, 255, 255, 0.664); ${darkSurfaceColorMap[5]};`,
};

/**
 * SurfaceElevation is a css helper that in LIGHT theme gives box-shadow
 * and in DARK theme adds opacity to make the background appear higher.
 *
 * @param themeType
 * @param level
 * @param noShadow LIGHT theme will not have box-shadow if this is set to true.
 */
export const SurfaceElevation = (
  themeType: ThemeType,
  level: ElevationLevel,
  noShadow?: boolean
) => css`
  ${themeType === "LIGHT"
    ? noShadow
      ? `background-color: ${lightColors.surface};`
      : lightBoxShadowMap[level]
    : noShadow 
      ? darkSurfaceColorMap[level]
      : darkBoxShadowMap[level]
    }
`;
