import styled from "@emotion/styled";
import { SurfaceElevation } from "../../styles/SurfaceElevation";

/**
 * SecondaryButton
 *
 * HTMLButtonElement styled to convey a chill button.
 */
export const SecondaryButton = styled.button`
  width: fit-content;
  min-width: 83px;
  height: 36px;
  min-height: 36px;

  padding: 1px 1rem;

  background-color: ${(p) =>
    p.theme.name === "DARK" ? "rgba(244,244,244,0.02)" : "rgba(0,0,0,0.02)"};
  color: inherit;

  text-align: center;

  transition: ${(p) => p.theme.transitions.normal};

  cursor: pointer;

  border: 1px solid
    ${(p) =>
      p.theme.name === "DARK" ? "rgba(244,244,244,0.2)" : "rgba(0,0,0,0.1)"};
  border-radius: 5px;

  &:hover {
    ${(p) => SurfaceElevation(p.theme.name, 2)};
    color: ${(p) =>
      p.theme.name === "DARK"
        ? p.theme.colors.secondary
        : p.theme.colors.primary};
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
