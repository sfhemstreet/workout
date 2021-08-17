import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * H3
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const H3 = styled.h3<TextMixinProps>`
  ${p => TextMixin({...p})}
`;