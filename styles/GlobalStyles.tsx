import { css, Global } from "@emotion/react";
import { ThemeType } from "../types/ThemeType";
import { darkColors, lightColors } from "./colors";
import { font } from "./font";
import { mediaDevices } from "./media";
import { tooltip } from "./tooltip";

type GlobalStylesProps = {
  themeType: ThemeType;
};

/**
 * GlobalStyles is CSS that is applied to entire application.
 */
export const GlobalStyles = ({ themeType }: GlobalStylesProps) => (
  <Global
    styles={css`
      html,
      body {
        width: 100%;
        height: 100%;
        min-height: 100%;

        padding: 2px;
        margin: 0;

        font-family: ${font.textFamily};

        background: ${themeType === "LIGHT"
          ? lightColors.background
          : darkColors.background};

        color: ${themeType === "LIGHT"
          ? lightColors.onBackground
          : darkColors.onBackground};

        font-size: 12px;
      }

      /* Next wraps the body in a div, 
      this targets that div */
      html > div,
      body > div {
        width: 100%;
        height: 100%;
        min-height: 100%;
      }

      button {
        font-family: ${font.textFamily};
        font-size: 1.125rem;
      }

      input,
      textarea {
        font-family: ${font.numberFamily};
        font-size: 16px;
      }

      a {
        color: inherit;
        text-decoration: none;
        font-size: 1rem;

        :hover {
          color: ${themeType === "LIGHT"
            ? lightColors.primary
            : darkColors.primary};
        }
      }

      * {
        box-sizing: border-box;
      }

      h1 {
        margin: 0px;
        padding: 1rem;
        font-size: 1.802rem;
      }

      h2 {
        margin: 0px;
        padding: 1rem;
        font-size: 1.602rem;
      }

      h3 {
        margin: 0px;
        padding: 1rem;
        font-size: 1.424rem;
      }

      h4 {
        margin: 0px;
        padding: 1rem;
        font-size: 1.266rem;
      }

      h5 {
        margin: 0px;
        padding: 1rem;
        font-size: 1.125rem;
      }

      p {
        margin: 0;
        padding: 1rem;
        font-size: 1rem;
      }

      @media ${mediaDevices.mobileL} {
        html,
        body {
          font-size: 14px;
        }
      }

      @media ${mediaDevices.tablet} {
        html,
        body {
          font-size: 16px;
          padding: 5px;
        }
        h1 {
          font-size: 2.488rem;
        }

        h2 {
          font-size: 2.074rem;
        }

        h3 {
          font-size: 1.728rem;
        }

        h4 {
          font-size: 1.44rem;
        }

        h5 {
          font-size: 1.2rem;
        }

        button {
          font-size: 1.2rem;
        }
      }

      @media ${mediaDevices.laptopL} {
        html,
        body {
          padding: 5px 7px;
        }
        h1 {
          font-size: 3.052rem;
        }

        h2 {
          font-size: 2.441rem;
        }

        h3 {
          font-size: 1.953rem;
        }

        h4 {
          font-size: 1.563rem;
        }

        h5 {
          font-size: 1.25rem;
        }

        button {
          font-size: 1.25rem;
        }
      }

      ${tooltip(themeType)}
    `}
  />
);
