import { useIsUsernameUnique } from "../../hooks/useIsUsernameUnique";
import { Subject } from "rxjs";
import { render } from "../test-utils/test-util";

/**
 * useIsUsernameUnique uses firestore, 
 * we mock that call so only 'Bob' is unique.
 */
const uniqueName = "Bob";
jest.mock("../../firebase", () => ({
  firebase: {
    ...jest.requireActual("../../firebase").firebase,
    firestore: () => ({
      collection: (str: string) => ({
        where: (x: string, y: string, username: string) => ({
          get: () => ({
            empty: () => username === uniqueName,
          }),
        }),
      }),
    }),
  },
}));

test("useIsUsernameUnique returns true", () => {
  let result: undefined | boolean = undefined;
  const subject = new Subject<string>();
  const func = jest.fn((value: boolean) => (result = value));

  const Component = () => {
    useIsUsernameUnique(subject, func);
    return <div>yep</div>;
  };
  render(<Component />);

  subject.next(uniqueName);

  setTimeout(() => {
    expect(result).toBe(true);
    expect(func).toBeCalledTimes(1);
  }, 500);
});

test("useIsUsernameUnique returns false", () => {
  let result: undefined | boolean = undefined;
  const subject = new Subject<string>();
  const func = jest.fn((value: boolean) => (result = value));

  const Component = () => {
    useIsUsernameUnique(subject, func);
    return <div>yep</div>;
  };
  render(<Component />);

  subject.next("Not Unique Name");

  setTimeout(() => {
    expect(result).toBe(false);
    expect(func).toBeCalledTimes(1);
  }, 500);
});

test("useIsUsernameUnique does not call callback with empty string", () => {
  let result: undefined | boolean = undefined;
  const subject = new Subject<string>();
  const func = jest.fn((value: boolean) => (result = value));

  const Component = () => {
    useIsUsernameUnique(subject, func);
    return <div>yep</div>;
  };
  render(<Component />);

  // Empty string
  subject.next("");

  setTimeout(() => {
    expect(result).toBe(undefined);
    expect(func).toBeCalledTimes(0);
  }, 500);
});

test("useIsUsernameUnique returns false then true then false", () => {
  let result: (undefined | boolean)[] = [];
  const subject = new Subject<string>();
  const func = jest.fn((value: boolean) => (result.push(value)));

  const Component = () => {
    useIsUsernameUnique(subject, func);
    return <div>yep</div>;
  };
  render(<Component />);

  // First next should be ignored by debounce in hook.
  subject.next(uniqueName);
  subject.next("not unique");

  setTimeout(() => {
    expect(result[0]).toBe(false);
    expect(func).toBeCalledTimes(1);

    // First next should be ignored by debounce in hook.
    subject.next("not unique again");
    subject.next(uniqueName);

    setTimeout(() => {
      expect(result[1]).toBe(true);
      expect(func).toBeCalledTimes(2);

      subject.next("not-unique_again2");

      setTimeout(() => {
        expect(result[2]).toBe(false);
        expect(func).toBeCalledTimes(3);
      });
    }, 500);
  }, 500);
})

test("useIsUsernameUnique debounce waits 400ms", () => {
  let result: undefined | boolean = undefined;
  const subject = new Subject<string>();
  const func = jest.fn((value: boolean) => (result = value));

  const Component = () => {
    useIsUsernameUnique(subject, func);
    return <div>yep</div>;
  };
  render(<Component />);

  subject.next("not unique");

  setTimeout(() => {
    expect(result).toBe(undefined);
    expect(func).toBeCalledTimes(0);

    subject.next(uniqueName);
  }, 200);

  setTimeout(() => {
    expect(result).toBe(true);
    expect(func).toBeCalledTimes(1);
  }, 400)
});