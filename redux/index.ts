import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { combineEpics, createEpicMiddleware, Epic } from "redux-observable";

import { ActiveExercise, ActiveWorkout, User, Workouts } from "../types";

// Ducks
import {
  ActiveExerciseAction,
  activeExerciseReducer,
  DEFAULT_ACTIVE_EXERCISE_STATE,
} from "./ducks/activeExercise";

import {
  ActiveWorkoutAction,
  activeWorkoutReducer,
  ActiveWorkoutState,
  DEFAULT_ACTIVE_WORKOUT_STATE,
} from "./ducks/activeWorkout";

import {
  DEFAULT_WORKOUTS_STATE,
  WorkoutsAction,
  workoutsReducer,
} from "./ducks/workouts";

import {
  DEFAULT_THEME_STATE,
  ThemeAction,
  themeReducer,
  ThemeState,
} from "./ducks/theme";

import {
  DEFAULT_SIGNIN_MODAL_STATE,
  SignInModalAction,
  signInModalReducer,
  SignInModalState,
} from "./ducks/signInModal";

import {
  DEFAULT_USER_SIDEBAR_STATE,
  UserSideBarAction,
  userSideBarReducer,
  UserSideBarState,
} from"./ducks/userSideBar";

import {
  DEFAULT_SOUND_STATE,
  SoundAction,
  soundReducer,
  SoundState
} from "./ducks/sound";

import { DEFAULT_USER_STATE, UserAction, userReducer } from "./ducks/user";

// Epics
import { activeExercisesEpics } from "./epics/activeExerciseEpics";
import { activeWorkoutEpics } from "./epics/activeWorkoutEpics";
import { workoutsEpics } from "./epics/workoutsEpics";
import { saveEpics } from "./epics/saveEpics";
import { userEpics } from "./epics/userEpics";
import { initEpics } from "./epics/initEpic";
import { themeEpics } from "./epics/themeEpics";
import { soundEpics } from "./epics/soundEpics";
import { signInModalEpics } from "./epics/signInModalEpics";
import { wakeLockEpics } from "./epics/wakeLockEpics";
import { DEFAULT_SWITCH_WORKOUT_STATE, SwitchWorkoutAction, switchWorkoutReducer, SwitchWorkoutState } from "./ducks/switchWorkout";

export type AppState = {
  user: User;
  theme: ThemeState;
  sound: SoundState;
  signInModal: SignInModalState;
  userSideBar: UserSideBarState;
  workouts: Workouts;
  activeWorkout: ActiveWorkoutState;
  activeExercise: ActiveExercise;
  switchWorkout: SwitchWorkoutState;
};

export type AppAction =
  | ThemeAction
  | SoundAction
  | UserAction
  | SignInModalAction
  | UserSideBarAction
  | WorkoutsAction
  | ActiveWorkoutAction
  | ActiveExerciseAction
  | SwitchWorkoutAction;

export type AppEpic = Epic<AppAction, AppAction | never, AppState>;

export type AppStore = ReturnType<typeof createAppStore>;

export type AppDispatch = AppStore["dispatch"];

export const DEFAULT_APP_STATE: AppState = {
  user: DEFAULT_USER_STATE,
  theme: DEFAULT_THEME_STATE,
  sound: DEFAULT_SOUND_STATE,
  signInModal: DEFAULT_SIGNIN_MODAL_STATE,
  userSideBar: DEFAULT_USER_SIDEBAR_STATE,
  workouts: DEFAULT_WORKOUTS_STATE,
  activeWorkout: DEFAULT_ACTIVE_WORKOUT_STATE,
  activeExercise: DEFAULT_ACTIVE_EXERCISE_STATE,
  switchWorkout: DEFAULT_SWITCH_WORKOUT_STATE,
};

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  sound: soundReducer,
  signInModal: signInModalReducer,
  userSideBar: userSideBarReducer,
  workouts: workoutsReducer,
  activeWorkout: activeWorkoutReducer,
  activeExercise: activeExerciseReducer,
  switchWorkout: switchWorkoutReducer,
});

const rootEpic = combineEpics(
  ...userEpics,
  ...initEpics,
  ...saveEpics,
  ...soundEpics,
  ...workoutsEpics,
  ...activeWorkoutEpics,
  ...activeExercisesEpics,
  ...themeEpics,
  ...signInModalEpics,
  ...wakeLockEpics,
);

let store: AppStore | undefined = undefined;

/**
 * createAppStore 
 * 
 * creates the redux store and applies the epics middleware.
 * It should only be called by `initializeStore`.
 */
function createAppStore(preloadedState = DEFAULT_APP_STATE) {
  const epicMiddleware =
    createEpicMiddleware<AppAction, AppAction | never, AppState, void>();

  const reduxMiddleware = composeWithDevTools(applyMiddleware(epicMiddleware));

  const appStore = createStore(rootReducer, preloadedState, reduxMiddleware);

  epicMiddleware.run(rootEpic);

  return appStore;
}

/**
 * initializeStore 
 * 
 * creates or returns the current redux store.
 * If preloadedState is supplied, it will use that to create the store.
 *
 * @param preloadedState
 */
export const initializeStore = (preloadedState?: AppState) => {
  let _store = store ?? createAppStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createAppStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};
