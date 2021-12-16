import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { fromEvent, merge, of } from "rxjs";
import { mapTo, tap, debounceTime, switchMap, takeUntil } from "rxjs/operators";

import {
  FadeInKeyframe,
  ShimmerBackgroundKeyframe,
  BoxShadowFlicker,
} from "../../styles/keyframes";
import { InlineButton } from "../Buttons";

type CloneButtonProps = {
  noHover: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CloneButton = ({ noHover, onClick }: CloneButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 600);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const hoverIn = fromEvent(ref.current, "mouseenter").pipe(mapTo(true));

    const hoverOut = fromEvent(ref.current, "mouseleave").pipe(mapTo(false));

    // Wait 400ms before executing hover out animation.
    // If hover in event happens before 400ms is up,
    // cancel hover out animation.
    const sub = merge(hoverIn, hoverOut)
      .pipe(
        tap((isHovered) => isHovered && setIsHovered(true)),
        debounceTime(400),
        switchMap((isHovered) =>
          of(isHovered).pipe(
            tap((isHovered) => !isHovered && setIsHovered(false)),
            takeUntil(hoverIn)
          )
        )
      )
      .subscribe();

    return () => sub.unsubscribe();
  }, [ref]);

  return (
    <Btn
      onClick={onClick}
      isHovered={isHovered && isMounted && !noHover}
      ref={ref}
    >
      Clone
    </Btn>
  );
};

const Btn = styled(InlineButton)<{
  isHovered: boolean;
}>`
  position: absolute;
  display: block;
  bottom: 33px;
  right: 5px;
  transform: rotate(90deg) scale(1);
  transition: ${(p) => p.theme.transitions.normal};
  animation: ${FadeInKeyframe} 700ms ease-in-out both;

  ${(p) =>
    p.isHovered &&
    css`
      min-height: 30px;
      right: 18px;
      bottom: 25px;
      transform: rotate(0deg) scale(1.5);
      color: ${p.theme.colors.background};
      background-image: ${p.theme.colors.superGradient};
      background-size: 400% 200%;
      animation: ${ShimmerBackgroundKeyframe} 3s infinite alternate,
        ${BoxShadowFlicker(p.theme.name)} 10s infinite alternate;

      :hover {
        color: ${p.theme.colors.background};
      }
    `}

  :active {
    transform: rotate(0deg) scale(1);
  }
`;
