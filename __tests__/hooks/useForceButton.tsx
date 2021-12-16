import React, { useRef } from "react";

import { useForceButton } from "../../hooks/useForceButton";
import {
  fireEvent,
  render,
  act,
  fakeSchedulers,
  userEvent,
} from "../test-utils/render";
import { getForceButtonWaitTime } from "../test-utils/helpers";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test("useForceButton calls func one time onClick", () => {
  const func = jest.fn();

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc: () => true,
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

  userEvent.click(button);

  expect(func).toBeCalledTimes(1);
});

test(
  "useForceButton calls func 3 times using default values for wait and frequency",
  fakeSchedulers((advance) => {
    const func = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLButtonElement>(null);
      useForceButton({
        ref,
        func,
        stopFunc: () => true,
      });

      return <button ref={ref}>Click Me</button>;
    };

    const rendered = render(<Component />);
    const button = rendered.getByText("Click Me") as HTMLButtonElement;

    fireEvent.mouseDown(button);

    advance(getForceButtonWaitTime(3));

    fireEvent.mouseUp(button);
    expect(func).toBeCalledTimes(3);
  })
);

test(
  "useForceButton calls func 3 times then stops because of stopFunc",
  fakeSchedulers((advance) => {
    let x = 0;
    const func = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLButtonElement>(null);
      useForceButton({
        ref,
        func: () => {
          x = x + 1;
          func()
        },
        stopFunc: () => x < 3,
        wait: 1,
        frequency: 1,
      });

      return <button ref={ref}>Click Me</button>;
    };

    const rendered = render(<Component />);
    const button = rendered.getByText("Click Me") as HTMLButtonElement;

    // Wait 1000ms, which is over the amount of time needed to call func 3 times.
    fireEvent.mouseDown(button);

    advance(10000);

    fireEvent.mouseUp(button);

    expect(func).toBeCalledTimes(3);
  })
);

test(
  "useForceButton never calls func because of stopFunc",
  fakeSchedulers((advance) => {
    const func = jest.fn();
    const stopFunc = jest.fn(() => true);

    const Component = () => {
      const ref = useRef<HTMLButtonElement>(null);
      useForceButton({
        ref,
        func,
        stopFunc: () => false,
        wait: 1,
        frequency: 1,
      });

      return <button ref={ref}>Click Me</button>;
    };

    const rendered = render(<Component />);
    const button = rendered.getByText("Click Me") as HTMLButtonElement;

    // Wait 1000ms, which is over the amount of time needed to call func a bunch of times.
    fireEvent.mouseDown(button);
    advance(1000);
    fireEvent.mouseUp(button);
    expect(func).toBeCalledTimes(0);
  })
);

test(
  "useForceButton calls func 5 times using keyboard 'Enter' key",
  fakeSchedulers((advance) => {
    const func = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLButtonElement>(null);
      useForceButton({
        ref,
        func,
        stopFunc: () => true,
        wait: 100,
        frequency: 50,
      });

      return <button ref={ref}>Click Me</button>;
    };

    const rendered = render(<Component />);
    const button = rendered.getByText("Click Me") as HTMLButtonElement;

    fireEvent.keyDown(button, { key: "Enter" });

    advance(getForceButtonWaitTime(5, { wait: 100, freq: 50 }));

    fireEvent.keyUp(button, { key: "Enter" });
    expect(func).toBeCalledTimes(5);
  })
);
