import { Observable, of, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import { useGetRequestContentType } from "../../hooks/useGetRequestContentType";
import { fakeTimers } from "../test-utils/helpers";
import { render, fakeSchedulers } from "../test-utils/render";

fakeTimers();

const imageUrl = "url";

// useGetRequestContentType uses ajax, mock the ajax call to return image/png
jest.mock("rxjs/ajax", () => {
  const { of } = require("rxjs");
  return {
    ajax: (url: string) =>
      of({
        xhr: {
          getResponseHeader: (_: "Content-Type") =>
            url === imageUrl ? "image/png" : undefined,
        },
      }),
  };
});

test(
  "useGetRequestContentType returns content type of image/png",
  fakeSchedulers((advance) => {
    let contentType = "";
    const subject = new Subject<string>();
    const func = jest.fn((value: string) => (contentType = value));

    const Component = () => {
      useGetRequestContentType(subject, func);
      return <div>Hi</div>;
    };
    
    render(<Component />);

    subject.next(imageUrl);

    // Need to wait because we debounce by 400 inside hook
    advance(400);

    expect(contentType).toBe("image/png");
  })
);

test(
  "useGetRequestContentType returns 'FAILED'",
  fakeSchedulers((advance) => {
    let contentType = "";
    const subject = new Subject<string>();
    const func = jest.fn((value: string) => (contentType = value));

    const Component = () => {
      useGetRequestContentType(subject, func);
      return <div>Hi</div>;
    };
    
    render(<Component />);

    subject.next("not a valid url");

    // Need to wait because we debounce by 400 inside hook
    advance(400);

    expect(contentType).toBe("FAILED");
  })
);
