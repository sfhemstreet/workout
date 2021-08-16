import styled from "@emotion/styled";
import { ShimmerBackgroundKeyframe } from "../../styles/keyframes";

type HamburgerProps = {
  onClick: () => void;
};

/**
 * Hamburger
 * 
 * Button styled like typical hamburger menu icon, 
 * ie 3 parallel lines stacked on top of each other.
 * 
 * @param onClick function to call when clicked
 */
export const Hamburger = ({ onClick }: HamburgerProps) => (
  <Button onClick={onClick}>
    <div />
    <div />
    <div />
  </Button>
);

const Button = styled.button`
  width: 46px;
  height: 46px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: transparent;

  border: none;
  margin: 5px 0px 0px 0px;
  padding: 0px;

  cursor: pointer;

  div {
    width: 40px;
    height: 6px;

    border-radius: 20px;
    background-color: ${(p) => p.theme.colors.onBackgroundLowEmp};
    background-image: ${(p) => `linear-gradient(
        119deg,
        rgba(0,0,0,0),
        ${p.theme.colors.onBackground},
        ${p.theme.colors.primary},
        ${p.theme.colors.secondary}
      )`};
    background-size: 400% 100%;

    transition: ${(p) => p.theme.transitions.normal};
  }

  :hover {
    div {
      animation: ${ShimmerBackgroundKeyframe} 0.7s ease-in-out both;
    }
  }

  @media ${(p) => p.theme.media.tablet} {
    margin: 5px 0px 0px 5px;
  }

  @media ${(p) => p.theme.media.laptop} {
    display: none;
  }
`;
