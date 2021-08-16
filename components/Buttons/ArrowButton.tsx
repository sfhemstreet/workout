import styled from "@emotion/styled";
import { SurfaceElevation } from "../../styles/SurfaceElevation";

type ArrowDirection = "Up" | "Down";

type ArrowButtonProps = {
  onClick: () => void;
  direction: ArrowDirection;
  isDisabled?: boolean;
};

/**
 * ArrowButton
 * 
 * Button that contains an arrow that points either up or down.
 * 
 * @param onClick 
 * @param direction "Up" or "Down"
 * @param isDisabled  
 */
export const ArrowButton = ({ onClick, direction, isDisabled }: ArrowButtonProps) => (
  <Button disabled={isDisabled} aria-label={direction} onClick={(e) => {
    e.preventDefault();
    onClick();
  }}>
    <Arrow direction={direction} />
  </Button>
);

const Button = styled.button`
  background-color: ${(p) => p.theme.colors.surface};
  border: none;
  outline: none;

  display: block;
  position: relative;

  min-width: 83px;
  height: 28px;
  min-height: 28px;

  background-color: inherit;
  color: inherit;

  transition: ${(p) => p.theme.transitions.normal};

  cursor: pointer;

  border: none;
  border-radius: 5px;

  &:hover {
    ${(p) => SurfaceElevation(p.theme.name, 4)};
  }

  &:disabled {
    opacity: 0.36;
    pointer-events: none;

    :hover {
      background-color: inherit;
      color: inherit;
      cursor: not-allowed;
    }
  }
`;

const Arrow = styled.div<{ direction: ArrowDirection }>`
  border: solid ${(p) => p.theme.colors.onSurface};
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;

  transform: ${(p) =>
    p.direction === "Up" ? "rotate(-135deg)" : "rotate(45deg)"};
`;
