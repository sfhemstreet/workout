import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { InlineButton } from ".";
import { BoxShadowFlicker } from "../../styles/keyframes";

/**
 * SelectableInlineButton
 * 
 * InlineButton that takes a `isSelected` prop, that gives button animated box-shadow.
 * 
 * @param isSelected boolean
 */
export const SelectableInlineButton = styled(InlineButton)<{ isSelected: boolean }>`
  width: max-content;
  min-width: max-content;
  max-width: max-content;
  margin: 4px;

  border: solid 1px
    ${(p) => (p.isSelected ? p.theme.colors.primary : "transparent")};
  border-radius: 5px;

  transition: ${(p) => p.theme.transitions.normal};

  ${(p) =>
    p.isSelected &&
    css `
      animation: ${BoxShadowFlicker(p.theme.name)} 10s infinite alternate;
    `};
`;