import React, { useRef } from "react";
import styled from "@emotion/styled";

import { HiddenLabel } from "./HiddenLabel";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { SmallRoundButton } from "./Buttons";
import { useForceButton } from "../hooks/useForceButton";

type NumberSelectorProps = {
  id: string;
  label: string;
  number: number;
  onChange: (number: number) => void;
  min?: number;
  max?: number;
  isLabelHidden?: boolean;
  wait?: number;
  frequency?: number;
};

/**
 * NumberSelector
 *
 * Number input with 3 means of changing number 
 * - decrement button
 * - increment button
 * - HTMLInputElement 
 *
 * @param id Unique ID for input
 * @param label label for input
 * @param number current number displayed
 * @param onChange function called with new selected number
 * @param min min number allowed to be selected
 * @param max max number allowed to be selected
 * @param isLabelHidden when `true` hides label from being displayed but is still accessible to screen readers
 * @param wait useForceButton wait param
 * @param frequency useForceButton frequency param
 */
export const NumberSelector = ({
  id,
  label,
  number,
  onChange,
  min = 0,
  max = 10,
  isLabelHidden,
  wait,
  frequency,
}: NumberSelectorProps) => {
  // Use a ref instead of state so that useForceButton does not use stale closure state.
  const myNum = useRef(number);
  const decrementRef = useRef<HTMLButtonElement>(null);
  const incrementRef = useRef<HTMLButtonElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newNumber = parseInt(e.target.value.replace(/[^0-9]/g, ""));

    if (isNaN(newNumber)) newNumber = 0;

    if (newNumber > max || newNumber < min) return;

    myNum.current = newNumber;
    onChange(newNumber);
  };

  useForceButton({
    ref: decrementRef,
    func: () => {
      myNum.current = myNum.current - 1;
      onChange(myNum.current);
    },
    stopFunc: () => myNum.current - 1 >= min,
    wait,
    frequency,
  });

  useForceButton({
    ref: incrementRef,
    func: () => {
      myNum.current = myNum.current + 1;
      onChange(myNum.current);
    },
    stopFunc: () => myNum.current + 1 <= max,
    wait,
    frequency,
  });

  return (
    <Container>
      <SmallRoundButton
        aria-label="Decrease number by 1"
        onClick={(e) => e.preventDefault()}
        disabled={number <= min}
        ref={decrementRef}
      >
        -
      </SmallRoundButton>
      <NumberInput id={id} onChange={handleInput} value={number} />
      {isLabelHidden ? (
        <HiddenLabel htmlFor={id}>{label}</HiddenLabel>
      ) : (
        <Label role="label" htmlFor={id}>
          {label}
        </Label>
      )}
      <SmallRoundButton
        aria-label="Increase number by 1"
        onClick={(e) => e.preventDefault()}
        disabled={number >= max}
        ref={incrementRef}
      >
        +
      </SmallRoundButton>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 136px;
  height: 70px;

  padding-top: 15px;

  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;

  input:focus + label {
    color: ${(p) => p.theme.colors.primary};
    transition: ${(p) => p.theme.transitions.normal};
  }

  input {
    outline: none;
    transition: ${(p) => p.theme.transitions.normal};

    :focus {
      border: 1px solid ${(p) => p.theme.colors.primary};
    }
  }
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

const NumberInput = styled.input`
  width: 45px;
  height: 45px;
  margin: 5px;

  border: 1px solid ${(p) => p.theme.colors.onSurfaceLowEmp};
  border-radius: 10px;

  ${(p) => SurfaceElevation(p.theme.name, 1)};
  color: ${(p) => p.theme.colors.onSurface};

  text-align: center;
  font-size: 1.423rem;
  font-family: ${(p) => p.theme.font.numberFamily};
`;
