import { css } from "@emotion/react";
import { ThemeType } from "../types";
import { darkColors, lightColors } from "./colors";
import { font } from "./font";

/**
 * URL encoded theme color for the arrow of the tooltip
 *
 * @param themeType
 */
const tipColor = (themeType: ThemeType) =>
  themeType === "DARK"
    ? "rgba%28%20225,%20225,%20225,%201%29"
    : "rgba%28%200,%200,%200,%201%29";

/**
 * tooltip
 *
 * Taken from microtip css package. Adds ability to create tooltip for any HTML Element.
 *
 * @param themeType `DARK` or `LIGHT`
 */
export const tooltip = (themeType: ThemeType) => css`
  // The following is taken from microtip and altered to accommodate the theme
  /* -------------------------------------------------------------------
  Microtip
  Modern, lightweight css-only tooltips
  Just 1kb minified and gzipped
  @author Ghosh
  @package Microtip
----------------------------------------------------------------------
  1. Base Styles
  2. Direction Modifiers
  3. Position Modifiers
--------------------------------------------------------------------*/

  /* ------------------------------------------------
  [1] Base Styles
-------------------------------------------------*/

  [aria-label][role~="tooltip"] {
    position: relative;
  }

  [aria-label][role~="tooltip"]::before,
  [aria-label][role~="tooltip"]::after {
    transform: translate3d(0, 0, 0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    will-change: transform;
    opacity: 0;
    pointer-events: none;
    transition: all var(--microtip-transition-duration, 0.18s)
      var(--microtip-transition-easing, ease-in-out)
      var(--microtip-transition-delay, 0s);
    position: absolute;
    box-sizing: border-box;
    z-index: 10;
    transform-origin: top;
  }

  [aria-label][role~="tooltip"]::before {
    background-size: 100% auto !important;
    content: "";
  }

  [aria-label][role~="tooltip"]::after {
    background: ${themeType === "DARK"
      ? darkColors.onBackground
      : lightColors.onBackground};
    border-radius: 4px;
    font-family: ${font.numberFamily};
    color: ${themeType === "DARK"
      ? darkColors.background
      : lightColors.background};
    content: attr(aria-label);
    font-size: var(--microtip-font-size, 13px);
    font-weight: var(--microtip-font-weight, normal);
    text-transform: var(--microtip-text-transform, none);
    padding: 0.5em 1em;
    white-space: nowrap;
    box-sizing: content-box;
  }

  [aria-label][role~="tooltip"]:hover::before,
  [aria-label][role~="tooltip"]:hover::after,
  [aria-label][role~="tooltip"]:focus::before,
  [aria-label][role~="tooltip"]:focus::after {
    opacity: 1;
    pointer-events: auto;
  }

  /* ------------------------------------------------
  [2] Position Modifiers
-------------------------------------------------*/

  [role~="tooltip"][data-microtip-position|="top"]::before {
    background: ${`url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22${tipColor(
        themeType
      )}%22%20transform%3D%22rotate%280%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E")`}
      no-repeat;
    height: 6px;
    width: 18px;
    margin-bottom: 5px;
  }

  [role~="tooltip"][data-microtip-position|="top"]::after {
    margin-bottom: 11px;
  }

  [role~="tooltip"][data-microtip-position|="top"]::before {
    transform: translate3d(-50%, 0, 0);
    bottom: 100%;
    left: 50%;
  }

  [role~="tooltip"][data-microtip-position|="top"]:hover::before {
    transform: translate3d(-50%, -5px, 0);
  }

  [role~="tooltip"][data-microtip-position|="top"]::after {
    transform: translate3d(-50%, 0, 0);
    bottom: 100%;
    left: 50%;
  }

  [role~="tooltip"][data-microtip-position="top"]:hover::after {
    transform: translate3d(-50%, -5px, 0);
  }

  /* ------------------------------------------------
  [2.1] Top Left
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position="top-left"]::after {
    transform: translate3d(calc(-100% + 16px), 0, 0);
    bottom: 100%;
  }

  [role~="tooltip"][data-microtip-position="top-left"]:hover::after {
    transform: translate3d(calc(-100% + 16px), -5px, 0);
  }

  /* ------------------------------------------------
  [2.2] Top Right
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position="top-right"]::after {
    transform: translate3d(calc(0% + -16px), 0, 0);
    bottom: 100%;
  }

  [role~="tooltip"][data-microtip-position="top-right"]:hover::after {
    transform: translate3d(calc(0% + -16px), -5px, 0);
  }

  /* ------------------------------------------------
  [2.3] Bottom
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position|="bottom"]::before {
    background: ${`url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22${tipColor(
        themeType
      )}%22%20transform%3D%22rotate%28180%2018%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E")`}
      no-repeat;
    height: 6px;
    width: 18px;
    margin-top: 5px;
    margin-bottom: 0;
  }

  [role~="tooltip"][data-microtip-position|="bottom"]::after {
    margin-top: 11px;
  }

  [role~="tooltip"][data-microtip-position|="bottom"]::before {
    transform: translate3d(-50%, -10px, 0);
    bottom: auto;
    left: 50%;
    top: 100%;
  }

  [role~="tooltip"][data-microtip-position|="bottom"]:hover::before {
    transform: translate3d(-50%, 0, 0);
  }

  [role~="tooltip"][data-microtip-position|="bottom"]::after {
    transform: translate3d(-50%, -10px, 0);
    top: 100%;
    left: 50%;
  }

  [role~="tooltip"][data-microtip-position="bottom"]:hover::after {
    transform: translate3d(-50%, 0, 0);
  }

  /* ------------------------------------------------
  [2.4] Bottom Left
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position="bottom-left"]::after {
    transform: translate3d(calc(-100% + 16px), -10px, 0);
    top: 100%;
  }

  [role~="tooltip"][data-microtip-position="bottom-left"]:hover::after {
    transform: translate3d(calc(-100% + 16px), 0, 0);
  }

  /* ------------------------------------------------
  [2.5] Bottom Right
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position="bottom-right"]::after {
    transform: translate3d(calc(0% + -16px), -10px, 0);
    top: 100%;
  }

  [role~="tooltip"][data-microtip-position="bottom-right"]:hover::after {
    transform: translate3d(calc(0% + -16px), 0, 0);
  }

  /* ------------------------------------------------
  [2.6] Left
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position="left"]::before,
  [role~="tooltip"][data-microtip-position="left"]::after {
    bottom: auto;
    left: auto;
    right: 100%;
    top: 50%;
    transform: translate3d(10px, -50%, 0);
  }

  [role~="tooltip"][data-microtip-position="left"]::before {
    background: ${`url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22${tipColor(
        themeType
      )}%22%20transform%3D%22rotate%28-90%2018%2018%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E")`}
      no-repeat;
    height: 18px;
    width: 6px;
    margin-right: 5px;
    margin-bottom: 0;
  }

  [role~="tooltip"][data-microtip-position="left"]::after {
    margin-right: 11px;
  }

  [role~="tooltip"][data-microtip-position="left"]:hover::before,
  [role~="tooltip"][data-microtip-position="left"]:hover::after {
    transform: translate3d(0, -50%, 0);
  }

  /* ------------------------------------------------
  [2.7] Right
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-position="right"]::before,
  [role~="tooltip"][data-microtip-position="right"]::after {
    bottom: auto;
    left: 100%;
    top: 50%;
    transform: translate3d(-10px, -50%, 0);
  }

  [role~="tooltip"][data-microtip-position="right"]::before {
    background: ${`url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212px%22%20height%3D%2236px%22%3E%3Cpath%20fill%3D%22${tipColor(
        themeType
      )}%22%20transform%3D%22rotate%2890%206%206%29%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E")`}
      no-repeat;
    height: 18px;
    width: 6px;
    margin-bottom: 0;
    margin-left: 5px;
  }

  [role~="tooltip"][data-microtip-position="right"]::after {
    margin-left: 11px;
  }

  [role~="tooltip"][data-microtip-position="right"]:hover::before,
  [role~="tooltip"][data-microtip-position="right"]:hover::after {
    transform: translate3d(0, -50%, 0);
  }

  /* ------------------------------------------------
  [3] Size
-------------------------------------------------*/
  [role~="tooltip"][data-microtip-size="small"]::after {
    white-space: initial;
    width: 80px;
  }

  [role~="tooltip"][data-microtip-size="medium"]::after {
    white-space: initial;
    width: 150px;
  }

  [role~="tooltip"][data-microtip-size="large"]::after {
    white-space: initial;
    width: 260px;
  }
`;
