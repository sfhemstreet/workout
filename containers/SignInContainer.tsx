import React, { useState } from "react";
import { firebase } from "../firebase/firebase";

import { SignIn } from "../components/SignIn";
import { userLoginBegin, userRegisterBegin } from "../redux/ducks/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Subject } from "rxjs";
import { useIsUsernameUnique } from "../hooks/useIsUsernameUnique";
import isEqual from "lodash.isequal";
import { closeSignInModal } from "../redux/ducks/signInModal";

const registerUsernameSubject$ = new Subject<string>();

type SignInContainerProps = {
  isUserRegistering?: boolean;
};

/**
 * SigninContainer
 *
 * Connects to redux store and dispatch to provide functions to SignIn component.
 *
 * @param isUserRegistering boolean that makes SignIn component render register screen first, instead of default Signin screen
 */
export function SignInContainer({ isUserRegistering }: SignInContainerProps) {
  const dispatch = useAppDispatch();
  const { error, isUserLoading, isAuth } = useAppSelector(
    (state) => ({
      error: state.user.error,
      isUserLoading: state.user.isLoading,
      isAuth: state.user.isAuthenticated,
    }),
    isEqual
  );

  const [hasForgottenPassword, setHasForgottenPassword] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState<
    boolean | undefined
  >(undefined);

  const [isRegisterUsernameUnique, setIsRegisterUsernameUnique] =
    useState(true);

  const handleSignIn = ({
    email,
    username,
    password,
    isRegistering,
  }: {
    email: string;
    username?: string;
    password: string;
    isRegistering: boolean;
  }) => {
    if (isRegistering) {
      username && dispatch(userRegisterBegin(username, email, password));
    } else {
      dispatch(userLoginBegin(email, password));
    }
  };

  const handleRequestPasswordReset = async (email: string) => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setForgotPasswordSuccess(true);
    } catch (err) {
      console.error("Failed to reset password.", err);
      setForgotPasswordSuccess(false);
    }
  };

  const handleRegisterUsername = (username: string) =>
    registerUsernameSubject$.next(username);

  const handleCloseSignin = () => dispatch(closeSignInModal());  

  useIsUsernameUnique(registerUsernameSubject$, setIsRegisterUsernameUnique);

  // The signin modal unmounts when the user successfully logs in or registers.
  // there is a slight delay in the unmount that flashes the signin inputs again.
  // We treat isAuthenticated as isLoading to avoid that.
  const isLoading = isUserLoading || isAuth;

  return (
    <SignIn
      onSubmit={handleSignIn}
      isLoading={isLoading}
      signin={{
        error: error !== "" ? error : undefined,
      }}
      register={{
        isUsernameUnique: isRegisterUsernameUnique,
        onInputUsername: handleRegisterUsername,
        error: error !== "" ? error : undefined,
        isShowing: isUserRegistering,
      }}
      forgottenPassword={{
        onSubmit: handleRequestPasswordReset,
        success: forgotPasswordSuccess,
        isShowing: hasForgottenPassword,
        onToggle: () => setHasForgottenPassword(!hasForgottenPassword),
      }}
      onClose={handleCloseSignin}
    />
  );
}
