import { Subject } from "rxjs";
import { useGetRequestContentType } from "../../hooks/useGetRequestContentType";
import { render } from "../test-utils/test-util";

import { ajax } from "rxjs/ajax";

// useGetRequestContentType uses ajax, mock the ajax call to return image/png
jest.mock("rxjs/ajax", () => ({
  ajax: (str: string) => ({
    xhr: { 
      getResponseHeader: (str: "Content-Type") => "image/png"
    },
  }),
}));

test("useGetRequestContentType returns content type of image/png", () => {
  let contentType = "";
  const subject = new Subject<string>();
  const func = jest.fn((value: string) => (contentType = value));

  const Component = () => {
    useGetRequestContentType(subject, func);
    return <div>Hi</div>;
  };
  const rendered = render(<Component />);

  subject.next(
    "url to image"
  );

  setTimeout(() => {
    expect(contentType).toBe("image/png");
  }, 2000);
});

// the hooks uses ajax to get content-type, this time return undefined to trigger failure.
jest.mock("rxjs/ajax", () => ({
  ajax: (str: string) => ({
    xhr: { 
      getResponseHeader: (str: "Content-Type") => undefined
    },
  }),
}));

test("useGetRequestContentType returns 'FAILED'", () => {
  let contentType = "";
  const subject = new Subject<string>();
  const func = jest.fn((value: string) => (contentType = value));

  const Component = () => {
    useGetRequestContentType(subject, func);
    return <div>Hi</div>;
  };
  const rendered = render(<Component />);

  subject.next("not a valid url");

  setTimeout(() => {
    expect(contentType).toBe("FAILED");
  }, 2000);
});
