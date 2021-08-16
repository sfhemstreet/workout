import styled from "@emotion/styled";

export type SVGIconProps = {
  onClick?: () => void;
  isFilled?: boolean;
}

/**
 * SVGIcon is the base SVG element all SVG icons are built off of.  
 */
export const SVGIcon = styled.svg<SVGIconProps>`
  fill: ${p => p.isFilled ? p.theme.colors.primary : p.theme.colors.onSurfaceLowEmp};
  transition: ${p => p.theme.transitions.normal};

  ${p => p.onClick && `cursor: pointer;`};

  :hover {
    fill: ${p => p.theme.colors.primary};
  }
`;