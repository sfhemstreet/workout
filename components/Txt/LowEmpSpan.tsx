import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const LowEmpSpan = styled.span<TextMixinProps>`
  ${p => TextMixin({...p})};
  color: ${p => p.theme.colors.onSurfaceLowEmp};
`;