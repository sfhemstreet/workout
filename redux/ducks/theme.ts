import { ThemeType } from "../../types/ThemeType";

// State
export type ThemeState = {
  type: ThemeType;
};

export const DEFAULT_THEME_STATE: ThemeState = {
  type: "DARK",
};

// Actions
export enum ThemeActionTypes {
  TOGGLE = "workout/theme/TOGGLE",
  SET = "workout/theme/SET",
}

export type ThemeAction =
  | {
      type: typeof ThemeActionTypes.TOGGLE;
    }
  | { type: typeof ThemeActionTypes.SET; payload: { themeType: ThemeType } };

// Reducer
export function themeReducer(
  state = DEFAULT_THEME_STATE,
  action: ThemeAction
): ThemeState {
  switch (action.type) {
    case ThemeActionTypes.TOGGLE:
      return {
        ...state,
        type: state.type === "LIGHT" ? "DARK" : "LIGHT",
      };
    case ThemeActionTypes.SET:
      return {
        ...state,
        type: action.payload.themeType,
      };
    default:
      return state;
  }
}

// Action Creators
export const toggleTheme = (): ThemeAction => ({
  type: ThemeActionTypes.TOGGLE as const,
});

export const setTheme = (themeType: ThemeType): ThemeAction => ({
  type: ThemeActionTypes.SET as const,
  payload: { themeType },
});
