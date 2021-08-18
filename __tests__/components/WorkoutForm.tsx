import { WorkoutForm } from "../../components/WorkoutForm";
import { fireEvent, render } from "../test-utils/test-util";

/**
 * WorkoutForm tests
 * 
 * Renders WorkoutForm and fills in inputs.
 */
test("WorkoutForm renders properly", () => {
  const form = render(<WorkoutForm onSubmit={() => {}} canShare={true} />);

  const workoutName = form.getByLabelText("Workout Name*") as HTMLInputElement;
  const workoutDescription = form.getByLabelText(
    "Workout Description"
  ) as HTMLInputElement;

  const roundsInput = form.getByLabelText('Number of Rounds') as HTMLInputElement;

  const firstExerciseName = form.getByLabelText(
    "Exercise Name*"
  ) as HTMLInputElement;
  const firstExerciseDesc = form.getByLabelText(
    "Exercise Description"
  ) as HTMLInputElement;

  const increaseBtns = form.getAllByText("+");
  const increaseRoundsBtn = increaseBtns[0];
  const firstExerciseIncreaseDurationBtn = increaseBtns[1];

  const firstExerciseSecondsDuration = form.getByLabelText(
    "Seconds"
  ) as HTMLInputElement;

  const addExerciseBtn = form.getByText("Add Exercise");
  const addRestBtn = form.getByText("Add Rest");

  fireEvent.change(workoutName, { target: { value: "Test Workout 1" } });
  fireEvent.change(workoutDescription, {
    target: {
      value: "This is a test workout description that contains words.",
    },
  });
  fireEvent.change(firstExerciseName, { target: { value: "Plank" } });
  fireEvent.click(firstExerciseIncreaseDurationBtn);

  fireEvent.click(addRestBtn);
  fireEvent.click(addExerciseBtn);
  fireEvent.click(increaseRoundsBtn);

  expect(workoutName.value).toBe("Test Workout 1");
  expect(workoutDescription.value).toBe(
    "This is a test workout description that contains words."
  );
  expect(firstExerciseName.value).toBe("Plank");
  expect(firstExerciseDesc.value).toBe(
    "Lie face down with your forearms on the floor and hands clasped. Extend the legs behind you and rise up on to your toes. Keeping the back straight, tighten your core, quads and glutes and hold the position."
  );
  expect(firstExerciseSecondsDuration.value).toBe("01");

  expect(roundsInput.value).toBe("2");

  expect(form).toMatchSnapshot();
});
