import { DifficultySelector } from "../../components/DifficultySelector";
import { Difficulty } from "../../types/Difficulty";
import { fireEvent, render } from "../test-utils/test-util";

test("DifficultySelector renders properly", () => {
  let difficulty: Difficulty = "extreme" 

  const selector = render(<DifficultySelector difficulty="extreme" onSelect={(d) => difficulty = d} />);

  const activeRestBtn = selector.getByText("active-rest") as HTMLButtonElement;
  const moderateBtn = selector.getByText("moderate") as HTMLButtonElement;
  const hardBtn = selector.getByText("hard") as HTMLButtonElement;
  const extremeBtn = selector.getByText("extreme") as HTMLButtonElement;

  // Extreme button is selected and should have animation
  expect(getComputedStyle(extremeBtn).animation.includes("10s infinite alternate")).toBeTruthy();

  fireEvent.click(hardBtn);
  expect(difficulty).toBe("hard");

  fireEvent.click(moderateBtn);
  expect(difficulty).toBe("moderate");

  fireEvent.click(activeRestBtn);
  expect(difficulty).toBe("active-rest");

  expect(selector).toMatchSnapshot();
});