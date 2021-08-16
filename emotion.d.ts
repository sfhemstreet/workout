import "@emotion/react";
import { Theme as MyTheme } from "./styles/theme";

/**
 * This tells Typescript what type our Emotion theme is,
 * ie props.theme in a styled component.
 */
declare module "@emotion/react" {
  export interface Theme extends MyTheme {}
}
