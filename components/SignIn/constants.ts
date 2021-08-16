import { RegisterState, SignInState } from "./types";

export const INVALID_PASSWORD = "Please enter a valid password.";
export const INVALID_REPEAT_PASSWORD = "Passwords do not match.";
export const INVALID_EMAIL = "Please enter a valid email.";
export const INVALID_USERNAME = "Please enter a valid username.";
export const USERNAME_TAKEN = "Sorry, this username is taken, please try another 🙏";

export const EMPTY_EMAIL = "Please enter your email.";
export const EMPTY_PASSWORD = "Please enter your password.";
export const EMPTY_USERNAME = "Please enter your username.";



export const PASSWORD_LENGTH = {
  min: 6,
  max: 20,
} as const;

export const USERNAME_LENGTH = {
  min: 2,
  max: 20,
} as const;

export const DEFAULT_SIGNIN_STATE: SignInState = {
  // Sign In state for returning users
  email: "",
  password: "",
  emailError: undefined,
  passwordError: undefined,
  error: undefined,
};

export const DEFAULT_REGISTER_STATE: RegisterState = {
  // Register state for new users
  email: "",
  username: "",
  password: "",
  repeatPassword: "",
  emailError: undefined,
  usernameError: undefined,
  passwordError: undefined,
  error: undefined,
};
