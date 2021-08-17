import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * NumberSpan
 * 
 * HTMLSpanElement with number font family
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const NumberSpan = styled.span<TextMixinProps>`
  font-family: ${(p) => p.theme.font.numberFamily};
  color: inherit;

  ${(p) => TextMixin({ ...p })};
`;
