export type ColorPallette = {
  primary: string;
  primaryVariant: string;
  secondary: string;
  background: string;
  backgroundGradient: string;
  superGradient: string;
  surface: string;
  error: string;
  onPrimary: string;
  onSecondary: string;
  onBackground: string;
  onBackgroundLowEmp: string;
  onBackgroundDisabled: string;
  onSurface: string;
  onSurfaceLowEmp: string;
  onSurfaceDisabled: string;
  onError: string;
};

export const lightColors: ColorPallette = {
  primary: "#6200EE",
  primaryVariant: "#3700B3",
  secondary: "#03DAC6",
  background: "#F1F1F1",
  backgroundGradient:
    "linear-gradient(135deg, rgba(98,0,238,0.1) 0%, rgba(73,0,204,0.1) 2%, rgba(55,0,179,0.05) 5%, rgba(92,49,192,0.05) 8%, rgba(117,81,200,0.05) 11%, rgba(167,145,216,0.05) 15%, rgba(204,193,229,0.05) 22%, rgba(227,226,226,0.05) 31%, rgba(241,241,241,0.1) 44%, rgba(217,208,208,0.05) 86%, rgba(141,212,204,0.1) 97%, rgba(3,218,198,0.1) 100%);",
  superGradient:
    "linear-gradient(119deg,#41b497,#7f47c5,#c29c46,#41b497,#7f47c5);",
  surface: "#F1F1F1",
  error: "#B00020",
  onPrimary: "#FFFFFF",
  onSecondary: "#000000",
  onBackground: "#000000",
  onBackgroundLowEmp: "rgba(0,0,0,0.6)",
  onBackgroundDisabled: "rgba(0,0,0,0.38)",
  onSurface: "#000000",
  onSurfaceLowEmp: "rgba(0,0,0,0.6)",
  onSurfaceDisabled: "rgba(0,0,0,0.38)",
  onError: "#FFFFFF",
};

export const darkColors: ColorPallette = {
  primary: "#BB86FC",
  primaryVariant: "#3700B3",
  secondary: "#03DAC6",
  background: "#121212",
  backgroundGradient:
    "linear-gradient(129deg, rgba(18,18,18,0.3) 0%, rgba(187,134,252,0.2) 0%, rgba(114,71,183,0.1) 2%, rgba(40,7,114,0.1) 4%, rgba(42,6,123,0.1) 8%, rgba(27,14,58,0.1) 14%, rgba(18,18,18,0.1) 22%, rgba(19,13,34,0.1) 46%, rgba(21,6,55,0.1) 54%, rgba(19,14,30,0.1) 64%, rgba(18,18,18,0.1) 89%, rgba(11,112,103,0.1) 96%, rgba(8,147,135,0.1) 99%, rgba(3,218,198,0.1) 100%);",
  superGradient:
    "linear-gradient(119deg,#41b497,#7f47c5,#c29c46,#41b497,#7f47c5);",
  surface: "#121212",
  error: "#CF6679",
  onPrimary: "#000000",
  onSecondary: "#000000",
  onBackground: "rgba(255,255,255,0.87)",
  onBackgroundLowEmp: "rgba(255,255,255,0.6)",
  onBackgroundDisabled: "rgba(255,255,255,0.38)",
  onSurface: "rgba(255,255,255,0.87)",
  onSurfaceLowEmp: "rgba(255,255,255,0.6)",
  onSurfaceDisabled: "rgba(255,255,255,0.38)",
  onError: "#000000",
};
