import styled from "@emotion/styled";
import { TextMixin, TextMixinProps } from "../../styles/mixins";

export const H5 = styled.h5<TextMixinProps>`
  ${p => TextMixin({...p})}
`;