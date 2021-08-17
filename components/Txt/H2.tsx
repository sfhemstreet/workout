import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * H2
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const H2 = styled.h2<TextMixinProps>`
  ${p => TextMixin({...p})}
`;