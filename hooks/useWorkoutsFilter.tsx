import { useState } from "react";
import { Difficulty } from "../types/Difficulty";
import { Rating } from "../types/Rating";

type FilterOptions = {
  difficulty: Difficulty | undefined;
  rating: Rating | undefined;
};

const DEFAULT_FILTER: FilterOptions = {
  difficulty: undefined,
  rating: undefined,
};

export function useWorkoutsFilter() {
  const [filter, setFilter] = useState<FilterOptions>(DEFAULT_FILTER);

  const handleChangeDifficultyFilter = (difficulty: Difficulty) =>
    setFilter((filter) => ({
      ...filter,
      difficulty: difficulty === filter.difficulty ? undefined : difficulty,
    }));

  const handleChangeRatingFilter = (rating: Rating) =>
    setFilter((filter) => ({
      ...filter,
      rating: rating === filter.rating ? undefined : rating,
    }));

  return {
    filter,
    onChangeDifficultyFilter: handleChangeDifficultyFilter,
    onChangeRatingFilter: handleChangeRatingFilter,
  }
}