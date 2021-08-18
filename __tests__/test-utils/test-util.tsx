import next from "next";
import React, { ReactElement, useEffect } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { initializeStore } from "../../redux";
import { userInit } from "../../redux/ducks/user";
import { LayoutContainer } from "../../containers/LayoutContainer";
import { AppThemeProviderContainer } from "../../containers/AppThemeProviderContainer";
import { AppThemeProvider } from "../../components/AppThemeProvider";

next({ dev: true });

jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

window.scrollTo = jest.fn();

/**
 * Providers renders children with context to Redux, Theme, and inside of Layout.
 *
 * @param children
 */
const Providers: React.FC = ({ children }) => {
  const store = initializeStore();

  useEffect(() => {
    store.dispatch(userInit());
  }, []);

  return (
    <ReduxProvider store={store}>
      <AppThemeProviderContainer>
        <LayoutContainer>{children}</LayoutContainer>
      </AppThemeProviderContainer>
    </ReduxProvider>
  );
};

/**
 * NoProviders wraps children only with ThemeProvider.
 *
 * @param children
 */
const NoProviders: React.FC = ({ children }) => (
  <AppThemeProvider themeType="DARK">{children}</AppThemeProvider>
);

interface CustomRenderOptions extends Omit<RenderOptions, "queries"> {
  hasProviders?: boolean;
}
/**
 * customRender
 *
 * Helper function that wraps `render`from @testing-library/react.
 *
 * If UI should be wrapped by Redux/Layout,
 * set `hasProviders: true` in options.
 * By default wraps children in ThemeProvider set to 'DARK' mode.
 *
 * @param ui UI Component to render
 * @param options CustomRenderOptions
 */
const customRender = (ui: ReactElement, options?: CustomRenderOptions) =>
  render(ui, {
    wrapper: options?.hasProviders ? Providers : NoProviders,
    ...options,
  });

test("Tests run", () => {
  expect(true).toBe(true);
});

export * from "@testing-library/react";
export { customRender as render };
