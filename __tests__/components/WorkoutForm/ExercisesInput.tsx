import { ExercisesInput } from "../../../components/WorkoutForm/ExercisesInput";
import { ExerciseState } from "../../../components/WorkoutForm/reducer";
import { REST_PERIOD } from "../../../constants";
import { Exercise } from "../../../types";
import { fireEvent, render, screen } from "../../test-utils/render";

test("ExercisesInput renders", () => {
  const e: ExerciseState[] = [
    {
      id: "1",
      name: "E",
      description: "description is here",
      nameError: "Name error here",
      descriptionError: undefined,
      duration: 0,
      repetitions: 0,
    },
    {
      id: "2",
      name: REST_PERIOD,
      description: "",
      nameError: undefined,
      descriptionError: undefined,
      duration: 0,
      repetitions: 0,
    },
  ];

  const onDelete = jest.fn();
  const onReorder = jest.fn();
  const onChange = jest.fn((exerciseId: string, change: Partial<Exercise>) => {
    const i = e.findIndex((e) => e.id === exerciseId);
    e[i] = { ...e[i], ...change };
  });

  render(
    <ExercisesInput
      exercises={e}
      onReorder={onReorder}
      onChange={onChange}
      onDelete={onDelete}
    />
  );

  const eName = () =>
    screen.getByLabelText("Exercise Name*") as HTMLInputElement;
  const eDesc = () =>
    screen.getByLabelText("Exercise Description") as HTMLTextAreaElement;
  const eErrMess = () => screen.getByText("Name error here");
  const restMess = () =>
    screen.getByLabelText("Rest Message") as HTMLInputElement;
  const deleteBtns = () => screen.getAllByText("Remove") as HTMLButtonElement[];

  expect(eName().value).toBe("E");
  expect(eDesc().value).toBe("description is here");
  expect(eErrMess()).toBeTruthy();
  expect(restMess().value).toBe("");
  expect(deleteBtns().length).toBe(2);

  // The first REMOVE button should be disabled
  // because there is only one exercise.
  fireEvent.click(deleteBtns()[0]);
  expect(onDelete).toBeCalledTimes(0);

  // The second REMOVE button is for the rest
  // and should work
  fireEvent.click(deleteBtns()[1]);
  expect(onDelete).toBeCalledTimes(1);

  fireEvent.change(eName(), {target: { value: "Hello" }});
  expect(onChange).toBeCalledWith("1", { name: "Hello" });
});
