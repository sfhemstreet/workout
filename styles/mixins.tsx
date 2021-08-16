import { css } from "@emotion/react";

export type CssUnit = `${'px' | '%' | 'em' | 'rem'}`
export type Padding = `${number}${CssUnit} ${number}${CssUnit} ${number}${CssUnit} ${number}${CssUnit}` | `${number}${CssUnit} ${number}${CssUnit} ${number}${CssUnit}` | `${number}${CssUnit} ${number}${CssUnit}` | `${number}${CssUnit}`;
export type Margin = Padding;

export type TextMixinProps = {
  padding?: Padding;
  margin?: Margin;
  textAlign?: 'left' | 'center' | 'right';
}

export const TextMixin = ({padding, margin, textAlign}: TextMixinProps) => css`
  ${ padding && `padding: ${padding};` };
  ${ margin && `margin: ${margin};` };
  ${ textAlign && `text-align: ${textAlign};` };  
`;
