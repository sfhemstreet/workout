import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Difficulty } from "../../types/Difficulty";

type DifficultyIconProps = {
  difficulty: Difficulty;
};

export const DifficultyIcon = ({ difficulty }: DifficultyIconProps) => {
  const Icon =
    difficulty === "active-rest"
      ? ActiveRest
      : difficulty === "moderate"
      ? Moderate
      : difficulty === "hard"
      ? Hard
      : difficulty === "extreme"
      ? Extreme
      : Nothing;

  return <Icon />;
};

const DefaultSize = css`
  width: 20px;
  height: 20px;
`;

const ActiveRest = styled.div`
  ${DefaultSize}

  border-radius: 50%;
  background-color: green;
`;

const Moderate = styled.div`
  ${DefaultSize}

  background-color: blue;
`;

const Hard = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-bottom: 5px solid red;
`;

const Extreme = styled.div`
  ${DefaultSize}

  background-color: black;
  transform: rotate(45deg);
`;

const Nothing = styled.div``;
