import {
  USE_FORCE_BUTTON_FREQ_TIME,
  USE_FORCE_BUTTON_WAIT_TIME,
} from "../../hooks/useForceButton";

/**
 * getForceButtonWaitTime
 *
 * Calculates amount of time needed for force button to call func desire amount of times.
 *
 * @param numFuncCalls  default `1` number of calls to func to wait for
 * @param options `wait` default `250` initial wait on force button , `freq` default `100` frequency of force button
 */
export const getForceButtonWaitTime = (
  numFuncCalls = 1,
  options?: { wait?: number; freq?: number }
) => {
  if (numFuncCalls <= 0) return 0;

  // Use defaults when options are not given.
  if (!options) {
    options = {
      wait: USE_FORCE_BUTTON_WAIT_TIME,
      freq: USE_FORCE_BUTTON_FREQ_TIME,
    };
  } 
  if (!options.wait) options.wait = USE_FORCE_BUTTON_WAIT_TIME;
  if (!options.freq) options.freq = USE_FORCE_BUTTON_FREQ_TIME;

  if (numFuncCalls === 1) return options.wait;

  let result = options.wait;
  // Start currentCall at 1 because initial wait is already accounted for.
  for (let currentCall = 1; currentCall < numFuncCalls; currentCall++) {
    result += options.freq;
  }
  return result;
};

/**
 * Before each test calls jest.useFakeTimers
 * 
 * After each test calls jest.useRealTimers
 */
export function fakeTimers() {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  })
}
