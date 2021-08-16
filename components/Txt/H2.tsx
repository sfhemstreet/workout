import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const H2 = styled.h2<TextMixinProps>`
  ${p => TextMixin({...p})}
`;