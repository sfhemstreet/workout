import { Workout } from "../../components/Workout";
import { render } from "../test-utils/test-util";

test("Workout renders properly", () => {
  const workout = render(
    <Workout
      currentExercise={{
        id: "1",
        name: "Exercise 1",
        description: "Test",
        isPaused: false,
        currentTime: 5,
        duration: 10,
        repetitions: 0,
      }}
      workout={{
        id: "w1",
        name: "Workout 1",
        description: "test workout",
        rounds: 3,
        currentRound: 2,
        currentExerciseId: "1",
        isStarted: true,
        isCompleted: false,
        difficulty: "hard",
        stars: 2,
        isShared: true,
        tags: ["arms", "core", "back"],
        clonedFromIds: [],
        createdAt: new Date(2021, 2, 2),
        creator: {
          id: "user1",
          name: "Test-User",
          avatar: "https://robohash.org/test-user",
        },
        exercises: [
          {
            id: "1",
            name: "Exercise 1",
            description: "Test d",
            duration: 10,
            repetitions: 0,
          },
          {
            id: "2",
            name: "Exercise 2",
            description: "Test d2",
            duration: 20,
            repetitions: 0,
          },
          {
            id: "3",
            name: "Exercise 3",
            description: "Test d3",
            duration: 0,
            repetitions: 30,
          },
        ],
      }}
      actions={{
        toggleStartStop: () => {},
        togglePause: () => {},
        previousExercise: () => {},
        nextExercise: () => {},
        goToWorkouts: () => {},
      }}
    />
  );

  expect(workout).toMatchSnapshot();
});

test("Workout with Confetti renders properly", () => {
  const workout = render(
    <Workout
      currentExercise={{
        id: "1",
        name: "Exercise 1",
        description: "Test",
        isPaused: false,
        currentTime: 5,
        duration: 10,
        repetitions: 0,
      }}
      workout={{
        id: "w1",
        name: "Workout 1",
        description: "test workout",
        rounds: 3,
        currentRound: 2,
        currentExerciseId: "1",
        isStarted: true,
        isCompleted: true,
        difficulty: "hard",
        stars: 2,
        isShared: true,
        tags: ["arms", "core", "back"],
        clonedFromIds: [],
        createdAt: new Date(2021, 2, 2),
        creator: {
          id: "user1",
          name: "Test-User",
          avatar: "https://robohash.org/test-user",
        },
        exercises: [
          {
            id: "1",
            name: "Exercise 1",
            description: "Test d",
            duration: 10,
            repetitions: 0,
          },
          {
            id: "2",
            name: "Exercise 2",
            description: "Test d2",
            duration: 20,
            repetitions: 0,
          },
          {
            id: "3",
            name: "Exercise 3",
            description: "Test d3",
            duration: 0,
            repetitions: 30,
          },
        ],
      }}
      actions={{
        toggleStartStop: () => {},
        togglePause: () => {},
        previousExercise: () => {},
        nextExercise: () => {},
        goToWorkouts: () => {},
      }}
    />
  );

  expect(workout).toMatchSnapshot();
});
