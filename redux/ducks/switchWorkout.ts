// State
export type SwitchWorkoutState = {
  isModalOpen: boolean;
  newWorkoutId: string;
};

export const DEFAULT_SWITCH_WORKOUT_STATE: SwitchWorkoutState = {
  isModalOpen: false,
  newWorkoutId: "",
};

// Actions
export enum SwitchWorkoutActionTypes {
  OPEN_WARNING = "workout/switchWorkout/OPEN_WARNING",
  CANCEL = "workout/switchWorkout/CANCEL",
  ACCEPT = "workout/switchWorkout/ACCEPT",
}

export type SwitchWorkoutAction =
  | {
      type: typeof SwitchWorkoutActionTypes.OPEN_WARNING;
      payload: { newWorkoutId: string };
    }
  | { type: typeof SwitchWorkoutActionTypes.CANCEL }
  | { type: typeof SwitchWorkoutActionTypes.ACCEPT };

export const switchWorkoutOpenWarning = (
  newWorkoutId: string
): SwitchWorkoutAction => ({
  type: SwitchWorkoutActionTypes.OPEN_WARNING,
  payload: { newWorkoutId },
});

export const switchWorkoutCancel = (): SwitchWorkoutAction => ({
  type: SwitchWorkoutActionTypes.CANCEL,
});

export const switchWorkoutAccept = (): SwitchWorkoutAction => ({
  type: SwitchWorkoutActionTypes.ACCEPT,
});

// Reducer
export function switchWorkoutReducer(
  state = DEFAULT_SWITCH_WORKOUT_STATE,
  action: SwitchWorkoutAction
): SwitchWorkoutState {
  switch (action.type) {
    case SwitchWorkoutActionTypes.OPEN_WARNING:
      return {
        isModalOpen: true,
        newWorkoutId: action.payload.newWorkoutId
      }
    case SwitchWorkoutActionTypes.CANCEL:
      return {
        isModalOpen: false,
        newWorkoutId: "",
      }
    case SwitchWorkoutActionTypes.ACCEPT: 
      return {
        ...state,
        isModalOpen: false,
      }
    default: 
      return state;
  }
}
