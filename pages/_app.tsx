import { NextComponentType, NextPageContext } from "next";
import { Provider as ReduxProvider } from "react-redux";
import { BehaviorSubject } from "rxjs";
import { useEffect, useRef } from "react";

import { AppThemeProviderContainer } from "../containers/AppThemeProviderContainer";
import { initializeStore } from "../redux";
import { LayoutContainer } from "../containers/LayoutContainer";

import { userInit } from "../redux/ducks/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { firebase } from "../firebase";

type AppProps = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

/**
 * _app
 *
 * This is a next.js special component that mounts first and wraps every page.
 *
 * We use it to initialize the redux store and provide the theme, layout, and attach auth listeners.
 */
export default function App({ Component, pageProps }: AppProps) {
  const store = initializeStore();

  return (
    <ReduxProvider store={store}>
      <AuthListener>
        <AppThemeProviderContainer>
          <LayoutContainer>
            <Component {...pageProps} />
          </LayoutContainer>
        </AppThemeProviderContainer>
      </AuthListener>
    </ReduxProvider>
  );
}

type UserStatus = "LOADING" | "SIGNED_IN" | "SIGNED_OUT";

const getUserStatus = (user: firebase.User | undefined | null): UserStatus =>
  user === undefined ? "LOADING" : user === null ? "SIGNED_OUT" : "SIGNED_IN";

const userBehaviorSubject = new BehaviorSubject<UserStatus>("LOADING");

const authStateObserver = (user: firebase.User | null) =>
  userBehaviorSubject.next(getUserStatus(user));

/**
 * AuthListener
 *
 * Attaches listener to firebase auth state.
 * When auth state changes, dispatches userInit action.
 */
const AuthListener: React.FC = ({ children }) => {
  const userRef = useRef<UserStatus>("LOADING");
  const dispatch = useAppDispatch();
  const isSignInModalOpen = useAppSelector((state) => state.signInModal.isOpen);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(authStateObserver);

    const subscription = userBehaviorSubject.subscribe((userStatus) => {
      if (isSignInModalOpen) return;

      if (userStatus === "SIGNED_IN" && userRef.current !== "SIGNED_IN") {
        dispatch(userInit());
        userRef.current = "SIGNED_IN";
      } else if (
        userStatus === "SIGNED_OUT" &&
        userRef.current !== "SIGNED_OUT"
      ) {
        dispatch(userInit());
        userRef.current = "SIGNED_OUT";
      }
    });

    return () => subscription.unsubscribe();
  }, [isSignInModalOpen]);

  return <>{children}</>;
};
