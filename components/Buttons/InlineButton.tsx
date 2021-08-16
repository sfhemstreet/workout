import styled from "@emotion/styled";
import { TertiaryButton } from "./TertiaryButton";

/**
 * InlineButton
 * 
 * HTMLButtonElement that takes from SecondaryButton but allows text content to expand freely.
 */
export const InlineButton = styled(TertiaryButton)<{isUnderlined?: boolean, isFullWidth?:boolean, isCentered?: boolean }>`
  width: ${p => p.isFullWidth ? "100%" : "fit-content"};
  min-width: ${p => p.isFullWidth ? "100%" : "1px"};
  height:  ${p => p.isFullWidth ? "100%" : "inherit"};
  min-height: ${p => p.isFullWidth ? "100%" : "1px"};

  background-color: inherit;
  color: inherit;

  text-align: ${p => p.isCentered ? "center" : "inherit"};
  font-size: inherit;

  text-decoration: ${props => props.isUnderlined ? "underline": "none"};
`;  