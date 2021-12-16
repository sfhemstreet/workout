import React from "react";
import { Rating } from "../types/Rating";
import { SelectableInlineButton } from "./Buttons";
import { Row } from "./DifficultySelector";

type RatingSelectorProps = {
  rating: Rating | undefined;
  onSelect: (rating: Rating) => void;
  isFilter?: boolean;
};

export const RatingsSelector = ({
  rating,
  onSelect,
  isFilter,
}: RatingSelectorProps) => (
  <Row>
    {[1, 2, 3, 4, 5].map((r) => (
      <SelectableInlineButton
        key={r}
        isSelected={r === rating}
        onClick={(e) => {
          e.preventDefault();
          onSelect(r as Rating);
        }}
      >
        {isFilter ? r === 5 ? r : `>= ${r}` : r}
      </SelectableInlineButton>
    ))}
  </Row>
);
