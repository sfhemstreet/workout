import { useIsUsernameUnique } from "../../hooks/useIsUsernameUnique";
import { Subject } from "rxjs";
import { fakeSchedulers, render } from "../test-utils/render";
import { fakeTimers } from "../test-utils/helpers";

fakeTimers();

/**
 * useIsUsernameUnique uses firestore,
 * we mock that call so only 'Bob' is unique.
 */
const uniqueName = "Bob";
jest.mock("../../firebase", () => ({
  firebase: {
    ...jest.requireActual("../../firebase").firebase,
    firestore: () => {
      console.log("1. firestore");
      return {
        collection: (str: string) => {
          console.log("2. collection");
          return {
            where: (_1: string, _2: string, username: string) => {
              console.log("3. where", username);
              return {
                get: () => {
                  console.log("4. get", username === uniqueName);
                  return new Promise<{ empty: boolean }>((res) => {
                    res({
                      empty: username === uniqueName,
                    });
                  });
                },
              };
            },
          };
        },
      };
    },
  },
}));

test(
  "useIsUsernameUnique returns true", done => 
  fakeSchedulers((advance) => {
    let result = false;
    const subject = new Subject<string>();
    const func = jest.fn((value: boolean) => (result = value));

    const Component = () => {
      useIsUsernameUnique(subject, func);
      return <div>yep</div>;
    };
    render(<Component />);

    subject.next(uniqueName);

    advance(500);

    expect(result).toBe(true);
    expect(func).toBeCalledTimes(1);
    done();
  })
);

test(
  "useIsUsernameUnique returns false",
  fakeSchedulers((advance) => {
    let result = true;
    const subject = new Subject<string>();
    const func = jest.fn((value: boolean) => (result = value));

    const Component = () => {
      useIsUsernameUnique(subject, func);
      return <div>yep</div>;
    };
    render(<Component />);

    subject.next("Not Unique Name");

    advance(500);

    expect(result).toBe(false);
    expect(func).toBeCalledTimes(1);
  })
);

test(
  "useIsUsernameUnique does not call callback with empty string",
  fakeSchedulers((advance) => {
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

    advance(500);

    expect(result).toBe(undefined);
    expect(func).toBeCalledTimes(0);
  })
);

test(
  "useIsUsernameUnique returns false then true then false",
  fakeSchedulers((advance) => {
    let result: (undefined | boolean)[] = [];
    const subject = new Subject<string>();
    const func = jest.fn((value: boolean) => result.push(value));

    const Component = () => {
      useIsUsernameUnique(subject, func);
      return <div>yep</div>;
    };
    render(<Component />);

    // First next should be ignored by debounce in hook.
    subject.next(uniqueName);
    subject.next("not unique");

    advance(500);

    expect(result[0]).toBe(false);
    expect(func).toBeCalledTimes(1);

    // First next should be ignored by debounce in hook.
    subject.next("not unique again");
    subject.next(uniqueName);

    advance(500);

    expect(result[1]).toBe(true);
    expect(func).toBeCalledTimes(2);

    subject.next("not-unique_again2");

    advance(500);

    expect(result[2]).toBe(false);
    expect(func).toBeCalledTimes(3);
  })
);

test(
  "useIsUsernameUnique debounce waits 400ms",
  fakeSchedulers((advance) => {
    let result: undefined | boolean = undefined;
    const subject = new Subject<string>();
    const func = jest.fn((value: boolean) => (result = value));

    const Component = () => {
      useIsUsernameUnique(subject, func);
      return <div>yep</div>;
    };
    render(<Component />);

    subject.next("not unique");

    advance(200);

    expect(result).toBe(undefined);
    expect(func).toBeCalledTimes(0);

    subject.next(uniqueName);

    advance(400);

    expect(result).toBe(true);
    expect(func).toBeCalledTimes(1);
  })
);
