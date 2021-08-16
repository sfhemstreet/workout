import { ofType } from "redux-observable";
import { of } from "rxjs";
import { filter, tap, ignoreElements } from "rxjs/operators";
import { AppEpic } from "..";
import { ActiveExerciseActionTypes } from "../ducks/activeExercise";
import { ActiveWorkoutActionTypes } from "../ducks/activeWorkout";

let wakeLock: WakeLockSentinel | null = null;

/**
 * startWakeLock attempts to request a wakeLock,
 * which keeps the user's screen active.
 */
const startWakeLock =
  (filter(
    () =>
      typeof navigator !== "undefined" &&
      "wakeLock" in navigator &&
      wakeLock === null
  ),
  tap(async () => {
    try {
      wakeLock = await (navigator as unknown as Navigator).wakeLock.request(
        "screen"
      );
    } catch (err) {
      console.error("Error requesting wakeLock", err);
    }
  }),
  ignoreElements());

/**
 * stopWakeLock attempts to release the wakeLock,
 * so that the user's screen can sleep.
 */
const stopWakeLock =
  (filter(
    () =>
      typeof navigator !== "undefined" &&
      "wakeLock" in navigator &&
      wakeLock !== null
  ),
  tap(async () => {
    await wakeLock?.release();
    wakeLock = null;
  }),
  ignoreElements());

/**
 * Start wakeLock on START_WORKOUT 
 * and NEXT_EXERCISE (in case user returns to workout and START action is not fired.)
 */
const wakeLockWorkoutStartEpic: AppEpic = (action$) =>
  action$.pipe(
    ofType(
      ActiveWorkoutActionTypes.START_WORKOUT,
      ActiveWorkoutActionTypes.NEXT_EXERCISE
    ),
    startWakeLock
  );

/**
 * Starts wakeLock on END_PAUSE
 */
const wakeLockExerciseStartEpic: AppEpic = (action$) =>
  action$.pipe(ofType(ActiveExerciseActionTypes.END_PAUSE), startWakeLock);

/**
 * Stops wakeLock on workout STOP, COMPLETED, CHANGE
 */
const wakeLockWorkoutStopEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(
      ActiveWorkoutActionTypes.STOP_WORKOUT,
      ActiveWorkoutActionTypes.COMPLETED,
      ActiveWorkoutActionTypes.CHANGE_WORKOUT
    ),
    startWakeLock,
  );

/**
 * Stops wakeLock on exercise PAUSE
 */
const wakeLockExerciseStopEpic: AppEpic = (action$, state$) =>
  action$.pipe(
    ofType(ActiveExerciseActionTypes.START_PAUSE),
    stopWakeLock,
  );

/**
 * wakeLockEpics control start and stop of WakeLock,
 * which keeps the users screen active.
 */
export const wakeLockEpics = [
  wakeLockWorkoutStartEpic,
  wakeLockExerciseStartEpic,
  wakeLockWorkoutStopEpic,
  wakeLockExerciseStopEpic,
];

/**
 * Following types are for experimental WakeLock feature,
 * which as of writing is supported in Edge and Chrome browsers.
 */

type WakeLockType = "screen";

/**
 * A WakeLockSentinel provides a handle to a platform wake lock, and it holds on
 * to it until it is either manually released or until the underlying platform
 * wake lock is released. Its existence keeps a platform wake lock for a given
 * wake lock type active, and releasing all WakeLockSentinel instances of a
 * given wake lock type will cause the underlying platform wake lock to be
 * released.
 */
interface WakeLockSentinel extends EventTarget {
  /** Whether the WakeLockSentinel's handle has been released. */
  readonly released: boolean;
  /** The WakeLockSentinel's wake lock type. */
  readonly type: WakeLockType;
  /** Releases the WakeLockSentinel's lock on the screen. */
  release(): Promise<undefined>;
  /**
   * Called when the WakeLockSentinel's handle is released. Note that the
   * WakeLockSentinel's handle being released does not necessarily mean that
   * the underlying wake lock has been released.
   */
  onrelease: EventListener;
}

/**
 * Allows a document to acquire a screen wake lock.
 */
interface WakeLock {
  /**
   * The request method will attempt to obtain a wake lock, and will return
   * a promise that will resolve with a sentinel to the obtained lock if
   * successful.
   *
   * If unsuccessful, the promise will reject with a "NotAllowedError"
   * DOMException. There are multiple different situations that may cause the
   * request to be unsucessful, including:
   *
   * 1. The _document_ is not allowed to use the wake lock feature.
   * 2. The _user-agent_ denied the specific type of wake lock.
   * 3. The _document_'s browsing context is `null`.
   * 4. The _document_ is not fully active.
   * 5. The _document_ is hidden.
   * 6. The request was aborted.
   *
   * @param type The type of wake lock to be requested.
   */
  request(type: WakeLockType): Promise<WakeLockSentinel>;
}

interface Navigator {
  readonly wakeLock: WakeLock;
}
