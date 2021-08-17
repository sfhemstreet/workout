import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * LowEmpSpan
 * 
 * Surface low emphasis HTMLSpanElement
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const LowEmpSpan = styled.span<TextMixinProps>`
  ${p => TextMixin({...p})};
  color: ${p => p.theme.colors.onSurfaceLowEmp};
`;