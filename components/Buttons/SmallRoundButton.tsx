import styled from "@emotion/styled";

/**
 * SmallRoundButton
 * 
 * Small round HTMLButtonElement
 */
export const SmallRoundButton = styled.button`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;

  padding: 0px;
  margin: 0px;

  background-color: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.onSurfaceLowEmp};

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  border: 1px solid ${(p) => p.theme.colors.onSurfaceLowEmp};
  border-radius: 50%;

  font-family: ${(p) => p.theme.font.numberFamily};
  font-size: 30px;

  cursor: pointer;

  transition: ${(p) => p.theme.transitions.normal};

  :hover {
    border: 1px solid ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.primary};
  }

  :disabled,
  :hover + :disabled {
    //pointer-events: none;
    border: 1px solid ${(p) => p.theme.colors.onSurfaceDisabled};
    color: ${(p) => p.theme.colors.onSurfaceDisabled};
    cursor: not-allowed;
  }
`;