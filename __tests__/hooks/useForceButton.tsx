import React, { useRef } from "react";
import { useForceButton } from "../../hooks/useForceButton";
import { fireEvent, render } from "../test-utils/test-util";

test("useForceButton calls func one time onClick", () => {
  const func = jest.fn();

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc: () => false,
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

  fireEvent.click(button);

  setTimeout(() => {
    expect(func).toBeCalledTimes(1);
  }, 100)
});

test("useForceButton calls func one time onKeyDown 'Enter'", () => {
  const func = jest.fn();

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc: () => false,
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

  fireEvent.keyDown(button, { key: "Enter" });

  setTimeout(() => {
    expect(func).toBeCalledTimes(1);
  }, 100)
});

test("useForceButton calls func 3 times using default values for wait and frequency", () => {
  const func = jest.fn();

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc: () => false,
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

   // 1st click occurs -> initial wait of 250ms -> 2nd click occurs -> waits 100ms -> 3rd click occurs -> waits 100ms -> nth click occurs etc
  // So for 3 calls to func we need to hold mousedown for 350ms
  fireEvent.mouseDown(button);
  setTimeout(() => {
    fireEvent.mouseUp(button);
    expect(func).toBeCalledTimes(3);
  }, 350);
});

test("useForceButton calls func 3 times then stops because of stopFunc", () => {
  let x = 0;
  const func = jest.fn(() => x = x + 1);
  const stopFunc = jest.fn(() => x > 3);

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc,
      wait: 1,
      frequency: 1,
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

  // Wait 1000ms, which is over the amount of time needed to call func 3 times.
  fireEvent.mouseDown(button);
  setTimeout(() => {
    fireEvent.mouseUp(button);
    expect(func).toBeCalledTimes(3);
  }, 1000);
});

test("useForceButton never calls func because of stopFunc", () => {
  const func = jest.fn();
  const stopFunc = jest.fn(() => true);

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc,
      wait: 1,
      frequency: 1
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

  // Wait 1000ms, which is over the amount of time needed to call func a bunch of times.
  fireEvent.mouseDown(button);
  setTimeout(() => {
    fireEvent.mouseUp(button);
    expect(func).toBeCalledTimes(0);
  }, 1000);
});

test("useForceButton calls func 5 times using keyboard 'Enter' key", () => {
  const func = jest.fn();

  const Component = () => {
    const ref = useRef<HTMLButtonElement>(null);
    useForceButton({
      ref,
      func,
      stopFunc: () => false,
      wait: 100,
      frequency: 50
    });

    return <button ref={ref}>Click Me</button>;
  };

  const rendered = render(<Component />);
  const button = rendered.getByText("Click Me") as HTMLButtonElement;

  // 1st call is right away -> wait 100ms -> 2nd call -> wait 50ms -> 3rd call -> wait 50ms -> etc 
  // So 5 calls is 250ms
  fireEvent.keyDown(button, { key: "Enter" });
  setTimeout(() => {
    fireEvent.keyUp(button, { key: "Enter" });
    expect(func).toBeCalledTimes(5);
  }, 250);
});
