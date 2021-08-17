import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * H4
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const H4 = styled.h4<TextMixinProps>`
  ${p => TextMixin({...p})}
`;