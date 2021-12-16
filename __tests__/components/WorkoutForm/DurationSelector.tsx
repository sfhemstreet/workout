import { DurationSelector } from "../../../components/WorkoutForm/DurationSelector";
import { fakeTimers, getForceButtonWaitTime } from "../../test-utils/helpers";
import {
  fakeSchedulers,
  render,
  fireEvent,
  screen,
} from "../../test-utils/render";

fakeTimers();

test(
  "DurationSelector displays correct time",
  fakeSchedulers(async (advance) => {
    let duration = 60;
    const handleChange = jest.fn((value) => (duration = value));

    const { rerender } = render(
      <DurationSelector
        id="dur-sel"
        duration={duration}
        onChange={handleChange}
        min={0}
        max={120}
      />
    );

    const decrementBtn = screen.getByText("-") as HTMLButtonElement;
    const incrementBtn = screen.getByText("+") as HTMLButtonElement;

    const minutesInput = () =>
      screen.getByLabelText("Minutes") as HTMLInputElement;

    const secondsInput = () =>
      screen.getByLabelText("Seconds") as HTMLInputElement;

    expect(minutesInput().value).toBe("1");
    expect(secondsInput().value).toBe("00");
    expect(duration).toBe(60);

    fireEvent.click(decrementBtn);

    expect(handleChange).toBeCalledTimes(1);
    expect(duration).toBe(59);

    rerender(
      <DurationSelector
        id="dur-sel"
        duration={duration}
        onChange={handleChange}
        min={0}
        max={120}
      />
    );

    expect(minutesInput().value).toBe("0");
    expect(secondsInput().value).toBe("59");
    expect(duration).toBe(59);

    fireEvent.click(incrementBtn);

    expect(handleChange).toBeCalledTimes(2);
    expect(duration).toBe(60);

    rerender(
      <DurationSelector
        id="dur-sel"
        duration={duration}
        onChange={handleChange}
        min={0}
        max={120}
      />
    );

    expect(minutesInput().value).toBe("1");
    expect(secondsInput().value).toBe("00");
    expect(duration).toBe(60);

    fireEvent.mouseDown(incrementBtn);

    advance(getForceButtonWaitTime(3));

    fireEvent.mouseUp(incrementBtn);

    expect(handleChange).toBeCalledTimes(5);
    expect(duration).toBe(63);

    rerender(
      <DurationSelector
        id="dur-sel"
        duration={duration}
        onChange={handleChange}
        min={0}
        max={120}
      />
    );

    expect(minutesInput().value).toBe("1");
    expect(secondsInput().value).toBe("03");
    expect(duration).toBe(63);

    fireEvent.keyDown(decrementBtn, { key: "Enter" });

    advance(getForceButtonWaitTime(13));

    fireEvent.keyUp(decrementBtn, { key: "Enter" });

    expect(handleChange).toBeCalledTimes(13 + 5);
    expect(duration).toBe(50);

    rerender(
      <DurationSelector
        id="dur-sel"
        duration={duration}
        onChange={handleChange}
        min={0}
        max={120}
      />
    );

    expect(minutesInput().value).toBe("0");
    expect(secondsInput().value).toBe("50");
    expect(duration).toBe(50);
  })
);
