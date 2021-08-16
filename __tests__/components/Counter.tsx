import { Counter } from "../../components/Workout/Counter";
import { render } from "../test-utils/test-util";

test("Counter renders the correct time", () => {
  const counter = render(<Counter duration={5} isPaused={false} shouldReset={false} currentTime={5} />);
  const h1 = counter.queryByText('5');

  expect(h1).toBeInstanceOf(HTMLElement);
});