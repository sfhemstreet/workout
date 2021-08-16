import styled from "@emotion/styled";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { Difficulty } from "../types/Difficulty";
import { SelectableInlineButton } from "./Buttons";

const DIFFICULTY_LEVELS: Difficulty[] = ["active-rest", "moderate", "hard", "extreme"];

type DifficultySelectorProps = {
  difficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
};

/**
 * DifficultySelector
 * 
 * Displays all difficulty options as selectable buttons.
 * 
 * @param difficulty the selected difficulty
 * @param onSelect function called when a difficulty is selected
 */
export const DifficultySelector = ({
  difficulty,
  onSelect,
}: DifficultySelectorProps) => (
  <Row>
    {DIFFICULTY_LEVELS.map((diff) => (
      <SelectableInlineButton
        key={diff}
        isSelected={difficulty === diff}
        onClick={(e) => {
          e.preventDefault();
          onSelect(diff);
        }}
      >
        {diff}
      </SelectableInlineButton>
    ))}
  </Row>
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  margin: 10px;
  padding: 10px;

  border-radius: 10px;
  ${(p) => SurfaceElevation(p.theme.name, 3)};
`;
