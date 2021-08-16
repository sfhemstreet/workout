// State

export type UserSideBarState = {
  isOpen: boolean;
};

export const DEFAULT_USER_SIDEBAR_STATE: UserSideBarState = {
  isOpen: false,
};

// Action Types

export enum UserSideBarActionTypes {
  OPEN = "workout/userSideBar/OPEN",
  CLOSE = "workout/userSideBar/CLOSE",
  TOGGLE = "workout/userSideBar/TOGGLE",
}

// Actions

export type UserSideBarAction =
  | { type: typeof UserSideBarActionTypes.OPEN }
  | { type: typeof UserSideBarActionTypes.CLOSE }
  | { type: typeof UserSideBarActionTypes.TOGGLE };

// Action Creators

export const openUserSideBar = (): UserSideBarAction => ({
  type: UserSideBarActionTypes.OPEN as const,
});

export const closeUserSideBar = (): UserSideBarAction => ({
  type: UserSideBarActionTypes.CLOSE as const,
});

export const toggleUserSideBar = (): UserSideBarAction => ({
  type: UserSideBarActionTypes.TOGGLE as const,
});

// Reducer

export function userSideBarReducer(
  state = DEFAULT_USER_SIDEBAR_STATE,
  action: UserSideBarAction
): UserSideBarState {
  switch (action.type) {
    case UserSideBarActionTypes.OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case UserSideBarActionTypes.CLOSE:
      return {
        ...state,
        isOpen: false,
      };
    case UserSideBarActionTypes.TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}