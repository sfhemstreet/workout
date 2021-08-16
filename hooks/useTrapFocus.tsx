import React, { useEffect } from "react";

type TabElement =
  | HTMLAnchorElement
  | HTMLButtonElement
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLSelectElement;

/**
 * useTrapFocus
 *
 * Traps user focus to children of given ref.
 * Useful for making modals more accessible.
 *
 * @param ref React.RefObject
 */
export function useTrapFocus(ref: React.RefObject<HTMLElement>) {
  const handleTrapFocus = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !ref.current || typeof document === "undefined")
      return;

    const focusableChildren = ref.current.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select"
    );

    if (focusableChildren.length === 0) return;

    const activeElement = document.activeElement;

    const firstElement = focusableChildren[0] as TabElement;

    const lastElement = focusableChildren[
      focusableChildren.length - 1
    ] as TabElement;

    // Go to first element if on last element.
    if (!e.shiftKey && activeElement === lastElement) {
      typeof firstElement.focus !== "undefined" && firstElement.focus();
      return e.preventDefault();
    }

    // Go to last element if going backwards with shift engaged on first element.
    if (e.shiftKey && activeElement === firstElement) {
      typeof lastElement.focus !== "undefined" && lastElement.focus();
      return e.preventDefault();
    }

    // If element with focus is not a child of our parent
    // give focus to first element.
    let isChild = false;

    focusableChildren.forEach((element) => {
      if (element === activeElement) {
        isChild = true;
      }
    });

    if (!isChild) {
      firstElement.focus();
      return e.preventDefault();
    }
  };

  useEffect(() => {
    if (!ref.current || typeof document === "undefined") return;

    document.addEventListener("keydown", handleTrapFocus, false);

    return () =>
      document.removeEventListener("keydown", handleTrapFocus, false);
  }, [ref]);
}
