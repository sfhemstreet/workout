import styled from "@emotion/styled";
import { TextMixinProps, TextMixin } from "../../styles/mixins";

export const P = styled.p<TextMixinProps>`
  ${p => TextMixin({...p})}
`;