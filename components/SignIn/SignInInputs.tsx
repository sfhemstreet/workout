import React, { useEffect, useReducer } from "react";
import { TransitionStatus } from "react-transition-group";
import isEmail from "validator/lib/isEmail";
import { SecondaryButton, SubmitButton } from "../Buttons";
import { TextInput } from "../TextInput";
import { H1, H2 } from "../Txt";
import {
  DEFAULT_SIGNIN_STATE,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
} from "./constants";
import { signInReducer } from "./signInReducer";
import {
  ButtonRow,
  CloseButton,
  Container,
  ErrorText,
  ForgotPasswordBtn,
} from "./styles";
import { checkPassword } from "./helpers";

type OnSubmitArgs = {
  email: string;
  password: string;
};

type SignInInputsProps = {
  onSubmit: (args: OnSubmitArgs) => void;
  onSwitchToRegister: () => void;
  errorText?: string;
  onForgotPassword: () => void;
  transitionStatus: TransitionStatus;
  onClose: (evt: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * SignInInputs
 *
 * inputs, state, and validation for user sign in.
 *
 * @param onSubmit function called after validation of input.
 * @param onSwitchToRegister function called when user wants to switch to register screen.
 * @param onForgotPassword function called when user has forgotten password.
 * @param errorText server error message.
 * @param transitionStatus transition status of mounting/un-mounting animation.
 */
export const SignInInputs = ({
  onSubmit,
  onSwitchToRegister,
  onForgotPassword,
  errorText,
  transitionStatus,
  onClose,
}: SignInInputsProps) => {
  const [state, setState] = useReducer(signInReducer, {
    ...DEFAULT_SIGNIN_STATE,
    error: errorText,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isEmailEmpty = state.email.trim().length === 0;
    const isPasswordEmpty = state.password.trim().length === 0;

    if (isEmailEmpty || isPasswordEmpty) {
      isEmailEmpty && setState({ type: "EMAIL_ERROR", payload: EMPTY_EMAIL });
      isPasswordEmpty &&
        setState({ type: "PASSWORD_ERROR", payload: EMPTY_PASSWORD });
      setState({ type: "ERROR", payload: "Enter login information." });
      return;
    }

    const isEmailValid = isEmail(state.email.trim());
    const isPasswordValid = !Object.values(
      checkPassword(state.password.trim())
    ).includes(false);

    if (!isEmailValid || !isPasswordValid) {
      !isEmailValid &&
        setState({
          type: "EMAIL_ERROR",
          payload: INVALID_EMAIL,
        });
      !isPasswordValid &&
        setState({
          type: "PASSWORD_ERROR",
          payload: INVALID_PASSWORD,
        });
      setState({ type: "ERROR", payload: "Correct errors, highlighted red." });
      return;
    }

    onSubmit({
      email: state.email.trim(),
      password: state.password.trim(),
    });
  };

  useEffect(() => {
    if (
      (errorText === undefined && state.error !== "") ||
      errorText !== state.error
    ) {
      setState({ type: "ERROR", payload: errorText ?? "" });
    }
  }, [errorText]);

  return (
    <Container aria-label="signin modal" transitionStatus={transitionStatus}>
      <CloseButton aria-label="close signin modal" onClick={onClose}>
        ✕
      </CloseButton>
      <H1 padding="1rem 1rem 0rem 1rem">🦾 WORKOUT</H1>
      <H2 padding="0.5rem">Sign In</H2>
      <TextInput
        id={"signin-email-input"}
        value={state.email}
        onChange={(value) => setState({ type: "EMAIL_CHANGE", payload: value })}
        label={"Email"}
        placeholder={"Enter Email"}
        error={state.emailError}
        isOutlined
        isEmail
      />
      <TextInput
        id={"signin-password-input"}
        value={state.password}
        onChange={(value) =>
          setState({ type: "PASSWORD_CHANGE", payload: value })
        }
        label={"Password"}
        placeholder={"Enter Password"}
        error={state.passwordError}
        isPassword
        isOutlined
      />
      <ForgotPasswordBtn
        onClick={(e) => {
          e.preventDefault();
          onForgotPassword();
        }}
      >
        Forgot Password?
      </ForgotPasswordBtn>
      <ErrorText>{errorText}</ErrorText>
      <ButtonRow>
        <SecondaryButton
          onClick={(e) => {
            e.preventDefault();
            onSwitchToRegister();
          }}
        >
          Register
        </SecondaryButton>
        <SubmitButton title={"Sign In"} onClick={handleSubmit}>
          Sign In
        </SubmitButton>
      </ButtonRow>
    </Container>
  );
};
