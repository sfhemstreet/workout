import { RefObject, useEffect } from "react";
import { fromEvent, merge, timer } from "rxjs";
import { takeUntil, switchMap, tap, takeWhile, filter } from "rxjs/operators";

type ForceButtonProps = {
  ref: RefObject<HTMLButtonElement>;
  func: (event: Event) => void;
  stopFunc: (event: Event) => boolean;
  wait?: number;
  frequency?: number;
};

/**
 * useForceButton 
 * 
 * Converts buttons from one click -> one function call,
 * to holdable buttons that call a function repeatedly after being held down.
 *
 * @param ref React Ref to HTMLButtonElement
 * @param func Function that is called every click/Enter key, and when button is pressed (based on frequency)
 * @param stopFunc Function that checks to see if func should still be called while button is pressed.
 * @param wait number in ms to wait till func is called after button is held down, default `250`
 * @param frequency number in ms, frequency that func will be called while button is held down, default `100`
 */
export function useForceButton({
  ref,
  func,
  stopFunc,
  wait = 250,
  frequency = 100,
}: ForceButtonProps) {
  useEffect(() => {
    if (!ref.current || typeof document === "undefined") return;

    const mouseDown$ = merge(
      fromEvent(ref.current, "mousedown"),
      fromEvent(ref.current, "touchstart"),
      fromEvent<KeyboardEvent>(ref.current, "keydown").pipe(
        filter((e) => e.key === "Enter")
      )
    );

    const mouseUp$ = merge(
      fromEvent(document, "mouseup"),
      fromEvent(document, "touchend"),
      fromEvent<KeyboardEvent>(ref.current, "keyup").pipe(
        filter((e) => e.key === "Enter")
      )
    );

    const holdsStream$ = mouseDown$.pipe(
      switchMap((event) =>
        timer(wait, frequency).pipe(
          takeWhile(() => stopFunc(event)),
          takeUntil(mouseUp$),
          tap(() => func(event))
        )
      )
    );

    const clickStream$ = fromEvent(ref.current, "click").pipe(
      filter((evt) => stopFunc(evt)),
      tap((evt) => func(evt))
    );

    const subscription = merge(holdsStream$, clickStream$).subscribe();

    return () => subscription.unsubscribe();
  }, [ref]);
}
