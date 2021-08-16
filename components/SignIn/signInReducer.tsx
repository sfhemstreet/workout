import { SignInAction, SignInState } from "./types";

/**
 * signInReducer
 * 
 * Reducer for SignInInputs
 * 
 * @param state SignInState
 * @param action SignInAction
 */
export function signInReducer(state: SignInState, action: SignInAction): SignInState {
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
    case "PASSWORD_CHANGE":
      return {
        ...state,
        password: action.payload,
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
