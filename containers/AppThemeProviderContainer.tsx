import React from "react";
import { useAppSelector } from "../redux/hooks";
import { AppThemeProvider } from "../components/AppThemeProvider";

/**
 * AppThemeProviderContainer
 * 
 * Connects to redux store and passes theme to AppThemeProvider component.
 * 
 * @param children
 */
export const AppThemeProviderContainer: React.FC = ({children}) => {
  const themeType = useAppSelector(state => state.theme.type);

  return (
    <AppThemeProvider themeType={themeType}>
      {children}
    </AppThemeProvider>
  )
}