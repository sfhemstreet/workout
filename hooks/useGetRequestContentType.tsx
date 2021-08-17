import { useEffect } from "react";
import { of, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
} from "rxjs/operators";

/**
 * useGetRequestContentType
 * 
 * @param subject rxjs Subject that gets onNext'd url to check
 * @param func function to call with contentType. If error occurs, returns `FAILED`
 */
export function useGetRequestContentType(
  subject: Subject<string>,
  func: (contentType: string) => void
) {
  useEffect(() => {
    const subscription$ = subject
      .pipe(
        debounceTime(400),
        filter((url) => url.trim().length > 0),
        switchMap((url) =>
          ajax(url).pipe(
            map((response) =>  response.xhr.getResponseHeader("Content-Type")),
            map(contentType => func(contentType ?? "FAILED")),
            catchError((err) => {
              console.log("Failed to get Content-Type", err);
              return of(func("FAILED"));
            })
          )
        )
      )
      .subscribe();

    return () => subscription$.unsubscribe();
  }, []);
}
