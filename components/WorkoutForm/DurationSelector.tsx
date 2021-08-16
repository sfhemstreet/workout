import React, { useRef } from "react";
import styled from "@emotion/styled";

import { getExerciseDurationDisplayString } from "../../utils/getExerciseDurationDisplayString";
import { SmallRoundButton } from "../Buttons";
import { useForceButton } from "../../hooks/useForceButton";
import { HiddenLabel } from "../HiddenLabel";
import { MAX_EXERCISE_DURATION } from "../../constants";

type DurationSelectorProps = {
  id: string;
  duration: number;
  onChange: (number: number) => void;
  min?: number;
  max?: number;
};

/**
 * DurationSelector
 * 
 * NumberSelector build to handle time input.
 * 
 * @param id unique id for input
 * @param duration value of input in seconds
 * @param onChange function called when duration changes
 * @param min minimum duration allowed
 * @param max maximum duration allowed
 */
export const DurationSelector = ({
  id,
  duration,
  onChange,
  min = 0,
  max = MAX_EXERCISE_DURATION, // 99 minutes, 59 seconds
}: DurationSelectorProps) => {
  const myDuration = useRef(duration);
  const decrementRef = useRef<HTMLButtonElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);

  // Convert seconds into string, ie `60` === '1:00'
  const timeString = getExerciseDurationDisplayString(duration, true);

  // Get minutes and seconds from string
  const minutesString =
    timeString.length === 5
      ? timeString.substring(0, 2)
      : timeString.substring(0, 1);

  const secondsString =
    timeString.length === 5 ? timeString.substring(3) : timeString.substring(2);

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let minutes = parseInt(e.target.value);

    if (isNaN(minutes)) minutes = 0;

    let seconds = parseInt(secondsString);

    if (isNaN(seconds)) seconds = 0;

    const newDuration = minutes * 60 + seconds;

    if (newDuration > max || newDuration < min) return;

    myDuration.current = newDuration;
    onChange(newDuration);
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let seconds = parseInt(e.target.value) % 60;

    if (isNaN(seconds)) seconds = 0;

    let minutes = parseInt(minutesString);

    if (isNaN(minutes)) minutes = 0;

    const newDuration = minutes * 60 + seconds;

    if (newDuration > max || newDuration < min) return;

    myDuration.current = newDuration;
    onChange(newDuration);
  };

  useForceButton({
    ref: decrementRef,
    func: () => {
      if (myDuration.current - 1 >= min) {
        myDuration.current = myDuration.current - 1;
        onChange(myDuration.current);
      }
    },
    stopFunc: () => myDuration.current - 1 >= min,
  });

  useForceButton({
    ref: incrementRef,
    func: () => {
      if (myDuration.current + 1 <= max) {
        myDuration.current = myDuration.current + 1;
        onChange(myDuration.current);
      }
    },
    stopFunc: () => myDuration.current + 1 <= max,
  });

  return (
    <Container>
      <Label>Duration (Min : Sec)</Label>
      <SmallRoundButton
        ref={decrementRef}
        onClick={(e) => e.preventDefault()}
        disabled={duration <= min}
      >
        -
      </SmallRoundButton>
      <HiddenLabel htmlFor={`duration-min-${id}`}>Minutes</HiddenLabel>
      <Input
        id={`duration-min-${id}`}
        marginLeft
        onChange={handleMinutesChange}
        value={minutesString}
      />
      <Span>:</Span>
      <HiddenLabel htmlFor={`duration-sec-${id}`}>Seconds</HiddenLabel>
      <Input
        id={`duration-sec-${id}`}
        marginRight
        onChange={handleSecondsChange}
        value={secondsString}
      />
      <SmallRoundButton
        ref={incrementRef}
        onClick={(e) => e.preventDefault()}
        disabled={duration >= max}
      >
        +
      </SmallRoundButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  width: 225px;
  height: 70px;
  padding-top: 15px;

  position: relative;
`;

const Label = styled.label`
  background-color: inherit;
  color: ${(p) => p.theme.colors.onSurfaceLowEmp};
  font-size: 14px;
  text-align: center;

  position: absolute;
  top: 2px;
  left: 2px;
`;

const Input = styled.input<{ marginLeft?: boolean; marginRight?: boolean }>`
  font-family: ${(p) => p.theme.font.numberFamily};
  font-size: 1.423rem;

  text-align: center;

  width: 45px;
  height: 45px;

  ${(p) => p.marginLeft && `margin-left: 10px;`};
  ${(p) => p.marginRight && `margin-right: 10px;`};

  background-color: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.onSurface};

  border: 1px solid ${(p) => p.theme.colors.onSurfaceLowEmp};
  border-radius: 4px;

  outline: none;

  :focus {
    border: 1px solid ${(p) => p.theme.colors.primary};
  }
`;

const Span = styled.span`
  font-family: ${(p) => p.theme.font.numberFamily};
  font-size: 1.623rem;
`;
