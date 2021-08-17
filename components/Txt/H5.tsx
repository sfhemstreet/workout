import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

/**
 * H5
 * 
 * @param padding
 * @param margin
 * @param textAlign
 */
export const H5 = styled.h5<TextMixinProps>`
  ${p => TextMixin({...p})}
`;