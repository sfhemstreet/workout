import styled from "@emotion/styled";
import { useState } from "react";
import { TransitionStatus } from "react-transition-group";

import { FadeInKeyframe } from "../styles/keyframes";
import { FadeInOut } from "./FadeInOut";
import { HiddenLabel } from "./HiddenLabel";
import { EyeIcon } from "./Icons";

type TextInputProps = {
  id: string;
  value: string;
  onChange: (str: string) => void;
  label: string;
  placeholder: string;
  error?: string;
  list?: string;
  isLabelHidden?: boolean;
  isPassword?: boolean;
  isEmail?: boolean;
  isDisabled?: boolean;
  isOutlined?: boolean;
  isTextArea?: boolean;
  isRequired?: boolean;
  autoComplete?: "new-password" | "off";
  onEnterKeyPress?: () => void;
  tabIndex?: number;
};

/**
 * TextInput
 * 
 * Controlled input for text / password / email, or textarea.
 * 
 * Defaults to `input`
 * Default input type is 'text'
 * 
 * @param id Unique ID for input
 * @param value string value of input
 * @param onChange function called when input change occurs
 * @param label label for input  or textarea
 * @param placeholder placeholder text for input / textarea
 * @param error String error message to display
 * @param list optional datalist id for browser to show a list of options
 * @param isTextArea when `true` renders a textarea instead of an input
 * @param isLabelHidden when `true` the label is not displayed but is still accessible to screen readers
 * @param isEmail when `true` input is set to type=email
 * @param isPassword when `true` type='password'. Displays visibility icon to toggle hidden on/off
 * @param isDisabled when `true` input / textarea is disabled
 * @param isOutlined when `true` the input / textarea will have border
 * @param isRequired when `true` tells browser that the input / textarea is required
 * @param autocomplete asks browser to not auto fill. Options are `new-password` or `off`
 * @param tabIndex optional tabIndex
 */
export function TextInput({
  id,
  value,
  onChange,
  label,
  placeholder,
  error,
  list,
  isLabelHidden,
  isEmail,
  isPassword,
  isDisabled,
  isOutlined,
  isTextArea,
  isRequired,
  autoComplete,
  onEnterKeyPress,
  tabIndex,
}: TextInputProps): JSX.Element {
  const [isInputHidden, setIsInputHidden] = !isPassword
    ? [undefined, undefined]
    : useState(true);

  const preventEnterKeyReset = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnterKeyPress && onEnterKeyPress();
    }
  };

  return (
    <Container
      hasOutline={isOutlined}
      hasError={error !== undefined}
      isTextArea={isTextArea}
    >
      {setIsInputHidden !== undefined && (
        <EyeIconContainer>
          <EyeIcon
            onClick={() => setIsInputHidden(!isInputHidden)}
            isCrossedOut={isInputHidden}
          />
        </EyeIconContainer>
      )}
      {isTextArea ? (
        <TextArea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          hasOutline={isOutlined}
          disabled={isDisabled}
          spellCheck={true}
          required={isRequired}
          tabIndex={tabIndex}
        />
      ) : (
        <Input
          id={id}
          type={isEmail ? "email" : isInputHidden ? "password" : "text"}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          hasOutline={isOutlined}
          disabled={isDisabled}
          isPassword={isPassword}
          required={isRequired}
          list={list}
          onKeyPress={preventEnterKeyReset}
          autoComplete={autoComplete}
          tabIndex={tabIndex}
        />
      )}
      {isLabelHidden ? (
        <HiddenLabel htmlFor={id}>{label}</HiddenLabel>
      ) : (
        <Label hasOutline={isOutlined} isDisabled={isDisabled} htmlFor={id}>
          {label}
          {isRequired && <span>*</span>}
        </Label>
      )}
      {
        <FadeInOut
          timeout={{ appear: 600, enter: 600, exit: 600 }}
          isShowing={error !== undefined}
          render={(transitionStatus) => (
            <Error transitionStatus={transitionStatus}>{error}</Error>
          )}
        />
      }
    </Container>
  );
}

/**
 * Container wraps the entire input and controls the border and label color.
 */
const Container = styled.div<{
  hasOutline?: boolean;
  hasError?: boolean;
  isTextArea?: boolean;
}>`
  position: relative;
  width: 100%;
  height: ${(p) => (p.isTextArea ? "100px" : "auto")};
  max-height: ${(p) => (p.isTextArea ? "100px" : p.hasError ? "80px" : "65px")};
  background-color: inherit;
  transition: ${(p) => p.theme.transitions.normal};
  margin: 2px 0px;

  label {
    ${(p) => p.hasError && `color: ${p.theme.colors.error};`};
  }

  input:focus + label,
  textarea:focus + label {
    color: ${(p) => p.theme.colors.primary};
    transition: ${(p) => p.theme.transitions.normal};
  }

  input,
  textarea {
    outline: none;
    transition: ${(p) => p.theme.transitions.normal};

    border-radius: ${(p) => (p.hasOutline ? "7px" : "7px 7px 0px 0px")};
    border: ${(p) =>
      p.hasOutline
        ? `1px solid ${
            p.hasError ? p.theme.colors.error : p.theme.colors.onSurfaceLowEmp
          }`
        : "none"};
    ${(p) =>
      p.hasError &&
      !p.hasOutline &&
      `border-bottom: 1px solid ${p.theme.colors.error}`};

    :focus {
      ${(p) =>
        p.hasOutline
          ? `border: 1px solid ${p.theme.colors.primary};`
          : `border-bottom: 1px solid ${p.theme.colors.primary};`};
    }
  }

  /* Gets rid of default reveal in Edge, we have our own reveal icon and mechanism. */
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }

  @media ${(p) => p.theme.media.tablet} {
    height: ${(p) => (p.isTextArea ? "130px" : "auto")};
    max-height: ${(p) =>
      p.isTextArea ? "100px" : p.hasError ? "85px" : "75px"};
  }
`;

const Label = styled.label<{ hasOutline?: boolean; isDisabled?: boolean }>`
  position: absolute;
  top: ${(p) => (p.hasOutline ? "1px" : "5px")};
  left: 15px;
  padding: ${(p) => (p.hasOutline ? "2px" : "0px")};
  border-radius: 2px;
  background-color: inherit;
  color: ${(p) =>
    p.isDisabled
      ? p.theme.colors.onSurfaceDisabled
      : p.theme.colors.onSurfaceLowEmp};
  font-size: 14px;

  span {
    position: relative;
    top: -2px;
    right: -2px;
  }
`;

const Input = styled.input<{ hasOutline?: boolean; isPassword?: boolean }>`
  background-color: inherit;
  color: ${(p) => p.theme.colors.onSurface};

  font-size: 16px;

  width: 100%;
  height: 50px;

  /* Increase padding right for passwords so that 'eye' doesn't cover input */
  padding: ${(p) => (p.isPassword ? "0px 37px 0px 15px" : "0px 15px")};
  margin: 10px 0px 0px 0px;

  ::placeholder {
    color: ${(p) => p.theme.colors.onSurfaceLowEmp};
    font-size: 12px;
  }

  :disabled {
    border: ${(p) =>
      p.hasOutline ? `1px solid ${p.theme.colors.onSurfaceDisabled}` : "none"};
    color: ${(p) => p.theme.colors.onSurfaceDisabled};
  }

  @media ${(p) => p.theme.media.tablet} {
    height: 60px;

    ::placeholder {
      font-size: 14px;
    }
  }
`;

const TextArea = styled.textarea<{ hasOutline?: boolean }>`
  background-color: inherit;
  color: ${(p) => p.theme.colors.onSurface};

  font-size: 16px;

  width: 100%;
  height: 83px;
  min-height: 83px;
  max-height: 83px;
  resize: none;

  padding: 15px;
  margin: 10px 0px 0px 0px;

  ::placeholder {
    color: ${(p) => p.theme.colors.onSurfaceLowEmp};
    font-size: 14px;
  }

  :disabled {
    border: ${(p) =>
      p.hasOutline ? `1px solid ${p.theme.colors.onSurfaceDisabled}` : "none"};
    color: ${(p) => p.theme.colors.onSurfaceDisabled};
  }

  @media ${(p) => p.theme.media.tablet} {
    height: 83px;
    min-height: 83px;
    max-height: 83px;
  }
`;

const Error = styled.div<{ transitionStatus: TransitionStatus }>`
  color: ${(p) => p.theme.colors.error};
  font-size: 12px;
  margin: 2px 15px 2px 15px;

  opacity: ${(p) =>
    p.transitionStatus === "entered" || p.transitionStatus === "entering"
      ? 1
      : 0};

  animation: ${FadeInKeyframe} 600ms ease-in-out;

  transition: all 600ms ease-in-out; //${(p) => p.theme.transitions.normal};

  @media ${(p) => p.theme.media.tablet} {
    font-size: 14px;
  }
`;

const EyeIconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 23px;

  @media ${(p) => p.theme.media.tablet} {
    top: 27px;
  }
`;
