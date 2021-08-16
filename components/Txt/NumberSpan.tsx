import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const NumberSpan = styled.span<TextMixinProps>`
  font-family: ${(p) => p.theme.font.numberFamily};
  color: inherit;

  ${(p) => TextMixin({ ...p })};
`;
