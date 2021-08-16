import next from "next";
import React, { ReactElement, useEffect } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider as ReduxProvider } from "react-redux";
import { initializeStore } from "../../redux";
import { userInit } from "../../redux/ducks/user";
import { LayoutContainer } from "../../containers/LayoutContainer";
import { AppThemeProviderContainer } from "../../containers/AppThemeProviderContainer";

next({dev: true});

jest.mock("next/router", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

const Providers: React.FC = ({ children }) => {
  const store = initializeStore();

  useEffect(() => {
    store.dispatch(userInit())
  },[]);

  return (
    <ReduxProvider store={store}>
      <AppThemeProviderContainer>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </AppThemeProviderContainer>
    </ReduxProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: Providers, ...options });

test("Tests run", () => {
  expect(true).toBe(true);
})

export * from "@testing-library/react";
export { customRender as render };