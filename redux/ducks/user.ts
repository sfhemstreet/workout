import { User } from "../../types";
import { CompletedWorkout } from "../../types/CompletedWorkout";

// State
export const DEFAULT_USER_STATE: User = {
  id: "",
  name: "",
  avatar: "",
  error: "",
  isAuthenticated: false,
  isLoading: true,
  workoutsCompleted: [],
};

// Actions
export enum UserActionTypes {
  INIT = "workout/user/INIT",

  ANONYMOUS_SIGN_IN = "workout/user/ANONYMOUS_SIGN_IN",
  ANONYMOUS_REGISTER = "workout/user/ANONYMOUS_REGISTER",

  REGISTER_USER_BEGIN = "workout/user/REGISTER_USER_BEGIN",
  REGISTER_USER_COMPLETE = "workout/user/REGISTER_USER_COMPLETE",
  REGISTER_USER_FAIL = "workout/user/REGISTER_USER_FAIL",

  LOGIN_USER_BEGIN = "workout/user/LOGIN_USER_BEGIN",
  LOGIN_USER_COMPLETE = "workout/user/LOGIN_USER_COMPLETE",
  LOGIN_USER_FAIL = "workout/user/LOGIN_USER_FAIL",

  SIGN_OUT_BEGIN = "workout/user/SIGN_OUT_BEGIN",
  SIGN_OUT_COMPLETE = "workout/user/SIGN_OUT_COMPLETE",
  SIGN_OUT_FAIL = "workout/user/SIGN_OUT_FAIL",

  DELETE_USER_BEGIN = "workout/user/DELETE_USER_BEGIN",
  DELETE_USER_COMPLETE = "workout/user/DELETE_USER_COMPLETE",
  DELETE_USER_FAIL = "workout/user/DELETE_USER_FAIL",

  CHANGE_NAME = "workout/user/CHANGE_NAME",
  CHANGE_AVATAR = "workout/user/CHANGE_AVATAR",

  COMPLETED_A_WORKOUT = "workout/user/COMPLETED_A_WORKOUT",

  REMOVE_ERROR = "workout/user/REMOVE_ERROR",
}

export type UserAction =
  | { type: typeof UserActionTypes.INIT }
  // Anon User
  | {
      type: typeof UserActionTypes.ANONYMOUS_SIGN_IN;
      payload: { user: User };
    }
  | {
      type: typeof UserActionTypes.ANONYMOUS_REGISTER;
      payload: { user: Pick<User, "id" | "name"> };
    }
  // Register Actions
  | {
      type: typeof UserActionTypes.REGISTER_USER_BEGIN;
      payload: { email: string; name: string; password: string };
    }
  | {
      type: typeof UserActionTypes.REGISTER_USER_COMPLETE;
      payload: { user: Pick<User, "id" | "name" | "avatar"> };
    }
  | {
      type: typeof UserActionTypes.REGISTER_USER_FAIL;
      payload: { error: string };
    }
  // Login Actions
  | {
      type: typeof UserActionTypes.LOGIN_USER_BEGIN;
      payload: { email: string; password: string };
    }
  | {
      type: typeof UserActionTypes.LOGIN_USER_COMPLETE;
      payload: {
        user: Pick<User, "id" | "name" | "avatar">;
      };
    }
  | {
      type: typeof UserActionTypes.LOGIN_USER_FAIL;
      payload: { error: string };
    }
  // Sign Out
  | { type: typeof UserActionTypes.SIGN_OUT_BEGIN }
  | { type: typeof UserActionTypes.SIGN_OUT_COMPLETE }
  | { type: typeof UserActionTypes.SIGN_OUT_FAIL; payload: { error: string } }

  // Delete User Actions
  | {
      type: typeof UserActionTypes.DELETE_USER_BEGIN;
    }
  | {
      type: typeof UserActionTypes.DELETE_USER_COMPLETE;
    }
  | {
      type: typeof UserActionTypes.DELETE_USER_FAIL;
      payload: { error: string };
    }
  // User Actions
  | { type: typeof UserActionTypes.CHANGE_NAME; payload: { name: string } }
  | { type: typeof UserActionTypes.CHANGE_AVATAR; payload: { avatar: string } }
  | {
      type: typeof UserActionTypes.COMPLETED_A_WORKOUT;
      payload: { workoutId: string; name: string };
    }
  | { type: typeof UserActionTypes.REMOVE_ERROR };

// Action Creators
/**
 * User action creator, INIT
 */
export const userInit = (): UserAction => ({
  type: UserActionTypes.INIT as const,
});

/**
 * User action creator
 */
export const anonymousUserSignin = (user: User): UserAction => ({
  type: UserActionTypes.ANONYMOUS_SIGN_IN as const,
  payload: { user },
});

/**
 * User action creator
 */
export const anonymousUserRegister = (
  id: string,
  name: string
): UserAction => ({
  type: UserActionTypes.ANONYMOUS_REGISTER as const,
  payload: { user: { id, name } },
});

/**
 * User action creator for logging in an existing user.
 *
 * @param email
 * @param password
 */
export const userLoginBegin = (
  email: string,
  password: string
): UserAction => ({
  type: UserActionTypes.LOGIN_USER_BEGIN as const,
  payload: {
    email,
    password,
  },
});

/**
 * User action creator for when a user login completes.
 *
 * @param id
 * @param name
 * @param avatar
 */
export const userLoginComplete = ({
  id,
  name,
  avatar,
}: {
  id: string;
  name: string;
  avatar: string;
}): UserAction => ({
  type: UserActionTypes.LOGIN_USER_COMPLETE as const,
  payload: {
    user: {
      id,
      name,
      avatar,
    },
  },
});

/**
 * User action creator for when logging in an existing a user fails.
 * @param error
 */
export const userLoginFail = (error = "Unable to login"): UserAction => ({
  type: UserActionTypes.LOGIN_USER_FAIL as const,
  payload: {
    error,
  },
});

/**
 * User action creator for registering a new user.
 *
 * @param name
 * @param password
 */
export const userRegisterBegin = (
  name: string,
  email: string,
  password: string
): UserAction => ({
  type: UserActionTypes.REGISTER_USER_BEGIN as const,
  payload: {
    name,
    email,
    password,
  },
});

/**
 * User action creator for when a user registration completes.
 *
 * @param id
 * @param name
 * @param avatar
 */
export const userRegisterComplete = ({
  id,
  name,
  avatar,
}: {
  id: string;
  name: string;
  avatar: string;
}): UserAction => ({
  type: UserActionTypes.REGISTER_USER_COMPLETE as const,
  payload: {
    user: {
      id,
      name,
      avatar,
    },
  },
});

/**
 * User action creator for when registering a user fails.
 * @param error
 */
export const userRegisterFail = (error = "Unable to login"): UserAction => ({
  type: UserActionTypes.REGISTER_USER_FAIL as const,
  payload: {
    error,
  },
});

export const signOutUser = (): UserAction => ({
  type: UserActionTypes.SIGN_OUT_BEGIN as const,
});

export const signOutComplete = (): UserAction => ({
  type: UserActionTypes.SIGN_OUT_COMPLETE as const,
});

export const signOutFail = (error?: string): UserAction => ({
  type: UserActionTypes.SIGN_OUT_FAIL as const,
  payload: { error: error ?? "Failed to sign out" },
});

// Delete Action Creators
/**
 * User action creator for starting to delete a user.
 */
export const userDeleteBegin = (): UserAction => ({
  type: UserActionTypes.DELETE_USER_BEGIN as const,
});

/**
 * User action creator for when deleting a user completes.
 */
export const userDeleteComplete = (): UserAction => ({
  type: UserActionTypes.DELETE_USER_COMPLETE as const,
});

/**
 * User action creator for when deleting a user failed.
 *
 * @param error
 */
export const userDeleteFail = (error = "Unable to login"): UserAction => ({
  type: UserActionTypes.DELETE_USER_FAIL as const,
  payload: {
    error,
  },
});

// User Action Creators
/**
 * User action creator for changing name.
 *
 * @param name
 */
export const userNameChange = (name: string): UserAction => ({
  type: UserActionTypes.CHANGE_NAME as const,
  payload: {
    name,
  },
});

/**
 * User action creator for changing  avatar.
 * @param avatar
 */
export const userAvatarChange = (avatar: string): UserAction => ({
  type: UserActionTypes.CHANGE_AVATAR as const,
  payload: {
    avatar,
  },
});

export const userCompletedWorkout = (
  workoutId: string,
  name: string
): UserAction => ({
  type: UserActionTypes.COMPLETED_A_WORKOUT as const,
  payload: {
    workoutId,
    name,
  },
});

export const removeUserError = (): UserAction => ({
  type: UserActionTypes.REMOVE_ERROR,
});

// Reducer
export function userReducer(
  state = DEFAULT_USER_STATE,
  action: UserAction
): User {
  switch (action.type) {
    // INIT
    case UserActionTypes.INIT:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.ANONYMOUS_SIGN_IN:
      return {
        ...action.payload.user,
      };
    case UserActionTypes.ANONYMOUS_REGISTER:
      return {
        ...state,
        ...action.payload.user,
        isAuthenticated: false,
        isLoading: false,
      };
    // Register
    case UserActionTypes.REGISTER_USER_BEGIN:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    case UserActionTypes.REGISTER_USER_COMPLETE:
      return {
        ...state,
        ...action.payload.user,
        error: "",
        isAuthenticated: true,
        isLoading: false,
      };
    case UserActionTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isAuthenticated: false,
        isLoading: false,
      };

    // Login
    case UserActionTypes.LOGIN_USER_BEGIN:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
      };
    case UserActionTypes.LOGIN_USER_COMPLETE:
      return {
        ...state,
        ...action.payload.user,
        error: "",
        isAuthenticated: true,
        isLoading: false,
      };
    case UserActionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isAuthenticated: false,
        isLoading: false,
      };

    // Sign Out
    case UserActionTypes.SIGN_OUT_BEGIN:
      return {
        ...DEFAULT_USER_STATE,
        isLoading: true,
      };
    case UserActionTypes.SIGN_OUT_COMPLETE:
      return {
        ...DEFAULT_USER_STATE,
      };
    case UserActionTypes.SIGN_OUT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    // Delete User
    case UserActionTypes.DELETE_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UserActionTypes.DELETE_USER_COMPLETE:
      return {
        ...DEFAULT_USER_STATE,
      };
    case UserActionTypes.DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload.error,
      };

    // Name and Avatar Change
    case UserActionTypes.CHANGE_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case UserActionTypes.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.payload.avatar,
      };

    // Workouts Completed
    case UserActionTypes.COMPLETED_A_WORKOUT:
      return {
        ...state,
        workoutsCompleted: [
          ...state.workoutsCompleted,
          {
            workoutId: action.payload.workoutId,
            name: action.payload.name,
            date: new Date(),
          },
        ],
      };
      
    case UserActionTypes.REMOVE_ERROR:
      return {
        ...state,
        error: "",
      };

    default:
      return state;
  }
}
