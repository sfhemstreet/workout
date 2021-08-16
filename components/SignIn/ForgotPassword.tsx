import React, { useEffect, useState } from "react";
import { TransitionStatus } from "react-transition-group";
import isEmail from "validator/lib/isEmail";
import { SecondaryButton, SubmitButton } from "../Buttons";
import { TextInput } from "../TextInput";
import { H1, H2, P } from "../Txt";
import { EMPTY_EMAIL, INVALID_EMAIL } from "./constants";
import { ButtonRow, Container } from "./styles";

type ForgotPasswordProps = {
  onSubmit: (email: string) => void;
  onCancel: () => void;
  error?: string;
  success?: boolean;
  transitionStatus: TransitionStatus;
};

/**
 * ForgotPassword
 * 
 * Input, state, and validation for forgot password screen.
 * 
 * @param onCancel function called when user cancels 
 * @param onSubmit function called after input is submitted and validated
 * @param error server error message
 * @param success server success
 * @param transitionStatus transition status of mounting/un-mounting animation
 */
export const ForgotPassword = ({
  onCancel,
  onSubmit,
  error,
  success,
  transitionStatus
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string | undefined>(error);

  const handleInput = (value: string) => {
    setEmail(value);

    if (err) {
      setErr(undefined);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.trim().length === 0) {
      setErr(EMPTY_EMAIL);
      return;
    } else if (!isEmail(email)) {
      setErr(INVALID_EMAIL);
      return;
    }

    onSubmit(email);
  };

  useEffect(() => {
    if (error !== err) {
      setErr(error);
    }
  }, [error]);

  return (
    <Container transitionStatus={transitionStatus}>
      <H1>🦾 WORKOUT</H1>
      <H2>Forgot Password</H2>
      {success ? (
        <P>
          Success! Please check your email to finish resetting your password.
        </P>
      ) : (
        <TextInput
          id="forgot-password"
          value={email}
          isEmail
          onChange={handleInput}
          label="Email"
          placeholder="Your account email"
          error={err}
          isOutlined
        />
      )}
      <P></P>
      <ButtonRow>
        {success === true ? (
          <SubmitButton onClick={handleCancel}>Back</SubmitButton>
        ) : (
          <>
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
            <SubmitButton onClick={handleSubmit}>Reset</SubmitButton>{" "}
          </>
        )}
      </ButtonRow>
    </Container>
  );
};
