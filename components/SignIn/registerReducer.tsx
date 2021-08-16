import { RegisterAction, RegisterState } from "./types";

/**
 * registerReducer
 * 
 * Reducer for RegisterInputs
 * 
 * @param state RegisterState
 * @param action RegisterAction
 */
export function registerReducer(
  state: RegisterState,
  action: RegisterAction
): RegisterState {
  switch (action.type) {
    case "EMAIL_CHANGE":
      return {
        ...state,
        email: action.payload,
        emailError: undefined,
        error: undefined,
      };
    case "EMAIL_ERROR":
      return {
        ...state,
        emailError: action.payload,
      };
    case "USERNAME_CHANGE":
      return {
        ...state,
        username: action.payload,
        usernameError: undefined,
        error: undefined,
      };
    case "USERNAME_ERROR":
      return {
        ...state,
        usernameError: action.payload,
      };
    case "PASSWORD_CHANGE":
      return {
        ...state,
        password: action.payload,
        passwordError: undefined,
        error: undefined,
      };
    case "REPEAT_PASSWORD_CHANGE":
      return {
        ...state,
        repeatPassword: action.payload,
        passwordError: undefined,
        error: undefined,
      };
    case "PASSWORD_ERROR":
      return {
        ...state,
        passwordError: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return { ...state };
  }
}
