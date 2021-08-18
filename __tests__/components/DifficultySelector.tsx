import { DifficultySelector } from "../../components/DifficultySelector";
import { Difficulty } from "../../types/Difficulty";
import { fireEvent, render } from "../test-utils/test-util";

test("DifficultySelector renders properly", () => {
  let difficulty: Difficulty = "hard" 

  const selector = render(<DifficultySelector difficulty="hard" onSelect={(d) => difficulty = d} />);

  const moderateBtn = selector.getByText("moderate");

  fireEvent.click(moderateBtn);

  expect(difficulty).toBe("moderate");

  expect(selector).toMatchSnapshot();
});