import styled from "@emotion/styled";
import { TextMixinProps, TextMixin } from "../../styles/mixins";

/**
 * P
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const P = styled.p<TextMixinProps>`
  ${p => TextMixin({...p})}
`;