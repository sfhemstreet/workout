// State

export type SignInModalState = {
  isOpen: boolean;
};

export const DEFAULT_SIGNIN_MODAL_STATE: SignInModalState = {
  isOpen: false,
};

// Action Types

export enum SignInModalActionTypes {
  OPEN = "workout/signInModal/OPEN",
  CLOSE = "workout/signInModal/CLOSE",
  TOGGLE = "workout/signInModal/TOGGLE",
}

// Actions

export type SignInModalAction =
  | { type: typeof SignInModalActionTypes.OPEN }
  | { type: typeof SignInModalActionTypes.CLOSE }
  | { type: typeof SignInModalActionTypes.TOGGLE };

// Action Creators

export const openSignInModal = (): SignInModalAction => ({
  type: SignInModalActionTypes.OPEN as const,
});

export const closeSignInModal = (): SignInModalAction => ({
  type: SignInModalActionTypes.CLOSE as const,
});

export const toggleSignInModal = (): SignInModalAction => ({
  type: SignInModalActionTypes.TOGGLE as const,
});

// Reducer

export function signInModalReducer(
  state = DEFAULT_SIGNIN_MODAL_STATE,
  action: SignInModalAction
): SignInModalState {
  switch (action.type) {
    case SignInModalActionTypes.OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case SignInModalActionTypes.CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case SignInModalActionTypes.TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
