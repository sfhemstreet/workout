import { USE_FORCE_BUTTON_FREQ_TIME, USE_FORCE_BUTTON_WAIT_TIME } from "../hooks/useForceButton";
import * as helpers from "./test-utils/helpers";

test("getForceButtonWaitTime gives correct time", () => {
  // Test default values
  expect(USE_FORCE_BUTTON_WAIT_TIME).toBe(250);
  expect(USE_FORCE_BUTTON_FREQ_TIME).toBe(100);

  // Test function with default values
  expect(helpers.getForceButtonWaitTime()).toBe(250);
  expect(helpers.getForceButtonWaitTime(1)).toBe(250);
  expect(helpers.getForceButtonWaitTime(2)).toBe(350);
  expect(helpers.getForceButtonWaitTime(3)).toBe(450);
  expect(helpers.getForceButtonWaitTime(4)).toBe(550);

  // Test with overridden wait
  const wait = 100;
  expect(helpers.getForceButtonWaitTime(1, { wait })).toBe(wait);
  expect(helpers.getForceButtonWaitTime(2, { wait })).toBe(200);
  expect(helpers.getForceButtonWaitTime(3, { wait })).toBe(300);

  // Test with overridden freq
  const freq = 50;
  expect(helpers.getForceButtonWaitTime(1, { freq })).toBe(250);
  expect(helpers.getForceButtonWaitTime(2, { freq })).toBe(300);
  expect(helpers.getForceButtonWaitTime(3, { freq })).toBe(350);

  // Test with overridden wait and freq
  expect(helpers.getForceButtonWaitTime(1, { wait, freq })).toBe(100);
  expect(helpers.getForceButtonWaitTime(2, { wait, freq })).toBe(150);
  expect(helpers.getForceButtonWaitTime(3, { wait, freq })).toBe(200);
})