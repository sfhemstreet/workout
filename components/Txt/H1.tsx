import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const H1 = styled.h1<TextMixinProps>`
  ${p => TextMixin({...p})}
`;