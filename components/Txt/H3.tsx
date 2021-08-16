import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const H3 = styled.h3<TextMixinProps>`
  ${p => TextMixin({...p})}
`;