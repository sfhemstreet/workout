import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";

import { darkColors, lightColors } from "../styles/colors";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";
import { ThemeType } from "../types/ThemeType";

type AppThemeProviderProps = {
  children: ReactNode;
  themeType: ThemeType;
};
/**
 * AppThemeProvider
 * - provides the current theme in use to child components.
 * - provides the current theme to Emotion styled components via Emotion's ThemeProvider.
 * - applies global CSS via GlobalStyles.
 *
 * @param children
 */
export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  themeType,
}) => (
  <ThemeProvider
    theme={{
      ...theme,
      name: themeType,
      colors: themeType === "LIGHT" ? lightColors : darkColors,
    }}
  >
    <GlobalStyles themeType={themeType} />
    {children}
  </ThemeProvider>
);
