import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const H4 = styled.h4<TextMixinProps>`
  ${p => TextMixin({...p})}
`;