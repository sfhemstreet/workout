
// State
export type SoundState = {
  isOn: boolean;
};

export const DEFAULT_SOUND_STATE: SoundState = {
  isOn: true,
};

// Actions
export enum SoundActionTypes {
  TOGGLE = "workout/sound/TOGGLE",
  SET = "workout/sound/SET",
}

export type SoundAction =
  | {
      type: typeof SoundActionTypes.TOGGLE;
    }
  | { type: typeof SoundActionTypes.SET; payload: { isOn: boolean } };

// Reducer
export function soundReducer(
  state = DEFAULT_SOUND_STATE,
  action: SoundAction
): SoundState {
  switch (action.type) {
    case SoundActionTypes.TOGGLE:
      return {
        ...state,
        isOn: !state.isOn,
      };
    case SoundActionTypes.SET:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const toggleSound = (): SoundAction => ({
  type: SoundActionTypes.TOGGLE as const,
});

export const setSound = (isOn: boolean): SoundAction => ({
  type: SoundActionTypes.SET as const,
  payload: { isOn },
});
