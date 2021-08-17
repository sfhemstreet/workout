import React, { useState } from "react";
import { SignInProps } from "./types";
import { RegisterInputs } from "./RegisterInputs";
import { SignInInputs } from "./SignInInputs";
import {
  SwitchTransition,
  Transition,
} from "react-transition-group";
import { LoadingShimmer } from "../LoadingShimmer";
import { ForgotPassword } from "./ForgotPassword";

type SignInState = "loading" | "forgot" | "register" | "signin";

/**
 * SignIn allows users to login or register an account.
 *
 * @param onSignIn callback to submit username and password of user signing in or registering.
 * @param onRegisterUsername async function to call when registering user is typing desired username.
 * @param signInError error message for signin
 * @param registerError error message for register
 * 
 */
export function SignIn({
  onSubmit,
  isLoading,
  signin,
  register,
  forgottenPassword,
  onClose,
}: SignInProps): JSX.Element {
  const [isUserRegistering, setIsUserRegistering] = useState(
    register.isShowing !== undefined && register.isShowing
  );

  const state: SignInState = isLoading
    ? "loading"
    : forgottenPassword.isShowing
    ? "forgot"
    : isUserRegistering
    ? "register"
    : "signin";

  return (
    <SwitchTransition mode="out-in">
      <Transition key={state} timeout={{ enter: 0, appear: 100, exit: 300 }}>
        {(transitionStatus) => {
          switch (state) {
            case "signin":
              return (
                <SignInInputs
                  onForgotPassword={forgottenPassword.onToggle}
                  onSubmit={(args) =>
                    onSubmit({ ...args, isRegistering: false })
                  }
                  onSwitchToRegister={() => setIsUserRegistering(true)}
                  errorText={signin.error}
                  transitionStatus={transitionStatus}
                  onClose={onClose}
                />
              );
            case "register":
              return (
                <RegisterInputs
                  onSubmit={(args) =>
                    onSubmit({ ...args, isRegistering: true })
                  }
                  isUsernameUnique={register.isUsernameUnique}
                  onSwitchToSignIn={() => setIsUserRegistering(false)}
                  onInputUsername={register.onInputUsername}
                  errorText={register.error}
                  transitionStatus={transitionStatus}
                  onClose={onClose}
                />
              );
            case "forgot":
              return (
                <ForgotPassword
                  success={forgottenPassword.success}
                  error={
                    forgottenPassword.success === false
                      ? "Sorry, please double check that the email is correct."
                      : undefined
                  }
                  onCancel={forgottenPassword.onToggle}
                  onSubmit={forgottenPassword.onSubmit}
                  transitionStatus={transitionStatus}
                />
              );
            case "loading":
            // Falls to default
            default:
              return (
                <LoadingShimmer
                  width="300px"
                  height="300px"
                  borderRadius="50%"
                  transitionStatus={transitionStatus}
                  margin="10% 0px"
                />
              );
          }
        }}
      </Transition>
    </SwitchTransition>
  );
}
