import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * H1
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const H1 = styled.h1<TextMixinProps>`
  ${p => TextMixin({...p})}
`;