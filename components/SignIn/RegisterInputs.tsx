import React, { useEffect, useMemo, useReducer } from "react";
import { TransitionStatus } from "react-transition-group";
import isEmail from "validator/lib/isEmail";
import { SecondaryButton, SubmitButton } from "../Buttons";
import { CheckIcon } from "../Icons";
import { TextInput } from "../TextInput";
import { H1, H2, NumberSpan } from "../Txt";
import {
  DEFAULT_REGISTER_STATE,
  EMPTY_EMAIL,
  EMPTY_PASSWORD,
  EMPTY_USERNAME,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_REPEAT_PASSWORD,
  INVALID_USERNAME,
  PASSWORD_LENGTH,
  USERNAME_LENGTH,
  USERNAME_TAKEN,
} from "./constants";
import { registerReducer } from "./registerReducer";
import {
  ButtonRow,
  CloseButton,
  Container,
  ErrorText,
  ValidationContainer,
  ValidationRow,
  ValidationSpan,
} from "./styles";
import { checkPassword, checkUsername } from "./utils";

type OnSubmitArgs = {
  email: string;
  username: string;
  password: string;
};

type RegisterInputsProps = {
  onInputUsername: (username: string) => void;
  isUsernameUnique: boolean;
  onSubmit: (args: OnSubmitArgs) => void;
  onSwitchToSignIn: () => void;
  errorText: string | undefined;
  transitionStatus: TransitionStatus;
  onClose: () => void;
};

/**
 * RegisterInputs
 *
 * Inputs, state, and validation for registering new user.
 *
 * @param isUsernameUnique boolean for if the username typed is taken
 * @param onSubmit function called after inputs are validated
 * @param onSwitchToSignIn function called when user wants to switch to SignIn screen
 * @param onInputUsername function called as user types in username (used to check if the username is unique)
 * @param errorText error from server
 * @param transitionStatus transition status of mounting/un-mounting animation
 */
export const RegisterInputs = ({
  isUsernameUnique,
  onSubmit,
  onSwitchToSignIn,
  onInputUsername,
  errorText,
  transitionStatus,
  onClose,
}: RegisterInputsProps) => {
  const [state, setState] = useReducer(registerReducer, {
    ...DEFAULT_REGISTER_STATE,
    error: errorText,
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const isEmailValid = isEmail(state.email.trim());
    const isEmailEmpty = state.email.trim().length === 0;

    const isRegisterUsernameValid = !Object.values(
      checkUsername(state.username.trim())
    ).includes(false);

    const isUsernameEmpty = state.username.trim().length === 0;

    const isRegisterPasswordValid = !Object.values(
      checkPassword(state.password.trim())
    ).includes(false);

    const isPasswordEmpty = state.password.trim().length === 0;

    const arePasswordsSame =
      state.password.trim() === state.repeatPassword.trim();

    if (isEmailEmpty) {
      setState({
        type: "EMAIL_ERROR",
        payload: EMPTY_EMAIL,
      });
    } else if (!isEmailValid) {
      setState({
        type: "EMAIL_ERROR",
        payload: INVALID_EMAIL,
      });
    }

    if (isUsernameEmpty) {
      setState({
        type: "USERNAME_ERROR",
        payload: EMPTY_USERNAME,
      });
    } else if (!isUsernameUnique) {
      setState({
        type: "USERNAME_ERROR",
        payload: USERNAME_TAKEN,
      });
    } else if (!isRegisterUsernameValid) {
      setState({
        type: "USERNAME_ERROR",
        payload: INVALID_USERNAME,
      });
    }

    if (isPasswordEmpty) {
      setState({
        type: "PASSWORD_ERROR",
        payload: EMPTY_PASSWORD,
      });
    } else if (!isRegisterPasswordValid) {
      setState({
        type: "PASSWORD_ERROR",
        payload: INVALID_PASSWORD,
      });
    } else if (!arePasswordsSame) {
      setState({
        type: "PASSWORD_ERROR",
        payload: INVALID_REPEAT_PASSWORD,
      });
    }

    if (
      isEmailValid &&
      isRegisterUsernameValid &&
      isUsernameUnique &&
      isRegisterPasswordValid &&
      arePasswordsSame
    ) {
      onSubmit({
        email: state.email.trim(),
        username: state.username.trim(),
        password: state.password.trim(),
      });
    } else {
      setState({
        type: "ERROR",
        payload: "Correct errors, highlighted red",
      });
    }
  };

  const handleUsernameChange = async (username: string) => {
    onInputUsername(username);
    setState({ type: "USERNAME_CHANGE", payload: username });
  };

  const handlePasswordChange = (value: string) =>
    setState({ type: "PASSWORD_CHANGE", payload: value });

  const handleRepeatPasswordChange = (value: string) =>
    setState({ type: "REPEAT_PASSWORD_CHANGE", payload: value });

  const usernameCheck = useMemo(
    () => checkUsername(state.username.trim()),
    [state.username]
  );

  const passwordCheck = useMemo(
    () => checkPassword(state.password.trim()),
    [state.password]
  );

  useEffect(() => {
    if (
      (errorText === undefined && state.error !== "") ||
      errorText !== state.error
    ) {
      setState({ type: "ERROR", payload: errorText ?? "" });
    }
  }, [errorText]);

  useEffect(() => {
    if (!isUsernameUnique && !state.usernameError) {
      setState({
        type: "USERNAME_ERROR",
        payload: "Sorry, this username is taken, please try another 🙏",
      });
    }
  }, [isUsernameUnique]);

  return (
    <Container aria-label="register modal" transitionStatus={transitionStatus}>
      <CloseButton aria-label="Close register modal" onClick={onClose}>
        ✕
      </CloseButton>
      <H1 padding="1rem 1rem 0rem 1rem">🦾 WORKOUT</H1>
      <H2 padding="0.5rem">Register</H2>

      <TextInput
        id={"register-email-input"}
        value={state.email}
        onChange={(email) => setState({ type: "EMAIL_CHANGE", payload: email })}
        label={"Email"}
        placeholder={"Your email will not be displayed"}
        error={state.emailError}
        isEmail
        isOutlined
      />
      <TextInput
        id={"register-username-input"}
        value={state.username}
        onChange={handleUsernameChange}
        label={"Username"}
        placeholder={"larry_da_lobster"}
        error={state.usernameError}
        isOutlined
        autoComplete="off"
      />

      <ValidationContainer>
        <ValidationRow>
          <CheckIcon isChecked={usernameCheck.hasLength && isUsernameUnique} />
          <ValidationSpan>Username must be unique.</ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon isChecked={usernameCheck.hasLength} />
          <ValidationSpan>
            {USERNAME_LENGTH.min}-{USERNAME_LENGTH.max} characters in length
          </ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon
            isChecked={
              state.username.trim() !== "" && usernameCheck.hasNoSymbols
            }
          />
          <ValidationSpan>No symbols ('-' and '_' are OK)</ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon
            isChecked={
              state.username.trim() !== "" && usernameCheck.hasNoWhitespace
            }
          />
          <ValidationSpan>No whitespace</ValidationSpan>
        </ValidationRow>
      </ValidationContainer>

      <TextInput
        id={"register-password-input-1"}
        value={state.password}
        onChange={handlePasswordChange}
        label={"Password"}
        placeholder={"Enter Password"}
        error={
          state.passwordError !== "Passwords do not match."
            ? state.passwordError
            : undefined
        }
        isPassword
        isOutlined
        autoComplete="new-password"
      />
      <TextInput
        id={"register-password-input-2"}
        value={state.repeatPassword}
        onChange={handleRepeatPasswordChange}
        label={"Confirm Password"}
        placeholder={
          !Object.values(passwordCheck).includes(false)
            ? "Enter the same password"
            : "Complete password above"
        }
        error={
          state.passwordError === "Passwords do not match."
            ? state.passwordError
            : undefined
        }
        isPassword
        isOutlined
        isDisabled={Object.values(passwordCheck).includes(false)}
        autoComplete="new-password"
      />

      <ValidationContainer>
        <ValidationRow>
          <CheckIcon isChecked={passwordCheck.hasLetter} />
          <ValidationSpan>
            <NumberSpan>ABC</NumberSpan> - at least 1 letter
          </ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon isChecked={passwordCheck.hasNumber} />
          <ValidationSpan>
            <NumberSpan>123</NumberSpan> - at least 1 number
          </ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon isChecked={passwordCheck.hasSymbol} />
          <ValidationSpan>
            <NumberSpan>!@$</NumberSpan> - at least 1 symbol
          </ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon isChecked={passwordCheck.hasLength} />
          <ValidationSpan>
            <NumberSpan>
              {PASSWORD_LENGTH.min}-{PASSWORD_LENGTH.max}
            </NumberSpan>{" "}
            characters in length
          </ValidationSpan>
        </ValidationRow>
        <ValidationRow>
          <CheckIcon
            isChecked={
              state.password !== "" && state.repeatPassword === state.password
            }
          />
          <ValidationSpan>Confirm password matches</ValidationSpan>
        </ValidationRow>
      </ValidationContainer>

      <ErrorText>{state.error}</ErrorText>

      <ButtonRow>
        <SecondaryButton
          onClick={(e) => {
            e.preventDefault();
            onSwitchToSignIn();
          }}
        >
          Login
        </SecondaryButton>
        <SubmitButton
          title={"Register"}
          onClick={handleSubmit}
          disabled={false}
        >
          Register
        </SubmitButton>
      </ButtonRow>
    </Container>
  );
};
