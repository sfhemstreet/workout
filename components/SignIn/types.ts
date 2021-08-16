export type SignInCallback = ({
  email,
  username,
  password,
  isRegistering,
}: {
  email: string;
  username?: string;
  password: string;
  isRegistering: boolean;
}) => void;

export type SignInProps = {
  onSubmit: SignInCallback;
  isLoading: boolean;

  signin: {
    error?: string;
  };

  register: {
    isUsernameUnique: boolean;
    error?: string;
    onInputUsername: (username: string) => void;
    isShowing?: boolean;
  };

  forgottenPassword: {
    onToggle: () => void;
    success?: boolean;
    isShowing: boolean;
    onSubmit: (email: string) => void;
  };

  onClose: () => void;
};

export type SignInState = {
  // Sign In state for returning users
  email: string;
  password: string;
  emailError: string | undefined;
  passwordError: string | undefined;
  error: string | undefined;
};

export type RegisterState = {
  // Register state for new users
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  emailError: string | undefined;
  usernameError: string | undefined;
  passwordError: string | undefined;
  error: string | undefined;
};

export type SignInAction =
  | { type: "EMAIL_CHANGE"; payload: string }
  | { type: "PASSWORD_CHANGE"; payload: string }
  | { type: "EMAIL_ERROR"; payload: string }
  | { type: "PASSWORD_ERROR"; payload: string }
  | { type: "ERROR"; payload: string };

export type RegisterAction =
  | { type: "EMAIL_CHANGE"; payload: string }
  | { type: "USERNAME_CHANGE"; payload: string }
  | { type: "PASSWORD_CHANGE"; payload: string }
  | { type: "REPEAT_PASSWORD_CHANGE"; payload: string }
  | { type: "EMAIL_ERROR"; payload: string }
  | { type: "USERNAME_ERROR"; payload: string }
  | { type: "PASSWORD_ERROR"; payload: string }
  | { type: "ERROR"; payload: string };
