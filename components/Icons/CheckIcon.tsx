import { SVGIcon, SVGIconProps } from "./SVGIcon";

interface CheckIconProps extends SVGIconProps {
  isChecked?: boolean;
}

/**
 * CheckIcon
 * 
 * @param isChecked if true displays colored in check mark, when false outline crossed out check mark
 * @param onClick function to call when clicked on
 */
export const CheckIcon = ({ isChecked, onClick }: CheckIconProps) => (
  <SVGIcon
    role={onClick !== undefined ? 'button' : 'img'}
    onClick={onClick}
    isFilled={isChecked}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
  >
    {isChecked ? (
      <>
        <title>Checked</title>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </>
    ) : (
      <>
        <title>Unchecked</title>
        <rect fill="none" height="24" width="24" />
        <path d="M21.19,21.19L2.81,2.81L1.39,4.22l2.27,2.27C2.61,8.07,2,9.96,2,12c0,5.52,4.48,10,10,10c2.04,0,3.93-0.61,5.51-1.66 l2.27,2.27L21.19,21.19z M10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l0.18-0.18l1.41,1.41L10.59,16.6z M13.59,10.76l-7.1-7.1 C8.07,2.61,9.96,2,12,2c5.52,0,10,4.48,10,10c0,2.04-0.61,3.93-1.66,5.51l-5.34-5.34l2.65-2.65l-1.41-1.41L13.59,10.76z" />
      </>
    )}
  </SVGIcon>
);
