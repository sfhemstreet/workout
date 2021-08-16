import styled from "@emotion/styled";
import { BoxShadowFlicker } from "../../styles/keyframes";

/**
 * SummitButton
 * 
 * HTMLButtonElement styled to convey superiority over all other buttons.
 */
export const SubmitButton = styled.button`
  width: fit-content;
  min-width: 99px;
  height: 36px;
  min-height: 36px;
  border: none;
  border-radius: 5px;

  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.onPrimary};

  font-weight: 500;
  
  text-align: center;

  transition: ${p => p.theme.transitions.normal};

  cursor: pointer;

  box-shadow: 0px 0px 0px rgba(0,0,0,0);

  &:hover {
    // background-color: ${p => p.theme.colors.onPrimary};
    // color: ${p => p.theme.colors.primary};
    transform: scale(1.1);
    animation: ${p => BoxShadowFlicker(p.theme.name)} 6s infinite alternate;
  }

  &:active {
    transform: scale(0.9);
  }

  &:disabled {
    opacity: 0.36;
    pointer-events: none;

    :hover {
      background-color: ${p => p.theme.colors.primary};
      color: ${p => p.theme.colors.onPrimary};
      cursor: not-allowed;
    }
  }
`;