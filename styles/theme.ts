import { ThemeType } from "../types/ThemeType";
import { ColorPallette, lightColors } from "./colors";
import { font } from "./font";
import { media } from "./media";
import { transitions } from "./transitions";

export type Theme = {
  name: ThemeType;
  colors: ColorPallette;
  media: typeof media;
  transitions: typeof transitions;
  font: typeof font;
}

export const theme: Theme = {
  name: "LIGHT",
  colors: lightColors,
  media: media,
  transitions: transitions,
  font: font,
};