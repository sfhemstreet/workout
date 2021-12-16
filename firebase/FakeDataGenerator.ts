import faker from "faker";
import firebase from "firebase";

import { Workout } from "../types";
import { uuid } from "../utils/uuid";
import { Tag, tags } from "../types/Tag";
import { CompletedWorkout } from "../types/CompletedWorkout";
import { isInteger, round } from "lodash";
import { preparedExercises } from "../components/WorkoutForm/preparedExercises";

/**
 * Class used to populate firestore with fake data.
 */
export class FakeDataGenerator {
  private db: firebase.firestore.Firestore;

  constructor(firestore: firebase.firestore.Firestore) {
    this.db = firestore;
  }

  /**
   * Generates 50 fake users and 100 fake workouts.
   */
  public async generateFakeData(): Promise<void> {
    if (await this.isPopulated()) return;

    this.setIsPopulatedTrue();
    this.generateData();
    console.log("Using Fake Data!");
  }

  /**
   * Checks flag document to see if DB is already populated with fake data.
   */
  private async isPopulated(): Promise<boolean> {
    return (await this.db.collection("fakeDataFlag").doc("generated").get())
      .exists;
  }

  /**
   * Sets flag document in DB to let us know DB is populated with fake data.
   */
  private setIsPopulatedTrue(): void {
    this.db.collection("fakeDataFlag").doc("generated").set({ hello: "world" });
  }

  /**
   * Creates 50 users in firestore, each with 2 workouts.
   */
  private async generateData(): Promise<void> {
    new Array(50).fill(1).map(() => {
      const creator = {
        id: uuid(),
        name: faker.internet.userName(),
        avatar: faker.internet.avatar(),
      };

      const workout1 = this.generateWorkout(creator);
      const workout2 = this.generateWorkout(creator);

      const completedWorkouts: CompletedWorkout[] = [
        {
          workoutId: workout1.id,
          name: workout1.name,
          date: new Date(
            2021,
            this.randomNumber(0, 11),
            this.randomNumber(1, 27)
          ),
        },
        {
          workoutId: workout2.id,
          name: workout2.name,
          date: new Date(
            2021,
            this.randomNumber(0, 11),
            this.randomNumber(1, 27)
          ),
        },
      ];

      const user = {
        id: creator.id,
        name: creator.name,
        avatar: creator.avatar,
        playSounds: true,
        theme: "DARK",
        workouts: [workout1.id, workout2.id],
        completedWorkouts: completedWorkouts,
      };

      console.log("-- User Created ->", user);

      this.db.collection("users").doc(user.id).set(user);
    });
  }

  /**
   * Creates a random workout, adds it to firestore, and returns the workout.
   * @param creator
   */
  private generateWorkout(creator: {
    id: string;
    name: string;
    avatar: string;
  }): Workout {
    const workoutId = uuid();

    const exercises = new Array(this.randomNumber(1, 10)).fill(1).map(() => {
      const exercise = preparedExercises[this.randomNumber(0, preparedExercises.length - 1)];
      const hasReps = this.randomNumber(0,1) === 0;

      return {
        id: uuid(),
        name: exercise.name,
        description: exercise.description,
        duration: this.randomNumber(10, 60),
        repetitions: hasReps ? this.randomNumber(5, 20) : 0,
      };
    });

    const workout: Workout = {
      id: workoutId,
      name: faker.random.words(2),
      description: this.randomDescription(),
      exercises: exercises,
      difficulty:
        exercises.length > 9
          ? "extreme"
          : exercises.length > 5
          ? "hard"
          : exercises.length > 3
          ? "moderate"
          : "active-rest",
      rounds: this.randomNumber(2, 5),
      rating: this.randomRating(),
      isShared: true,
      createdAt: new Date(
        2021,
        this.randomNumber(0, 11),
        this.randomNumber(1, 27)
      ),
      creator: creator,
      clonedFromIds: [],
      tags: this.randomTags(),
    };

    console.log("---- Workout Created ->", workout);

    this.db.collection("workouts").doc(workoutId).set(workout);

    return workout;
  }

  /**
   * Returns random inclusive number
   * @param min default 1
   * @param max default 100
   */
  private randomNumber(min = 1, max = 100, isFloatOk = false): number {
    min = Math.floor(min);
    max = Math.ceil(max);

    const result = Math.random() * (max - min + 1) + min;

    return isFloatOk ? result : Math.floor(result);
  }

  /**
   * Returns array with 3 random Tags
   */
  private randomTags(): Tag[] {
    return [
      tags[this.randomNumber(0, tags.length - 1)],
      tags[this.randomNumber(0, tags.length - 1)],
      tags[this.randomNumber(0, tags.length - 1)],
    ];
  }

  /**
   * Generates random 20 word string
   */
  private randomDescription(): string {
    return faker.random
      .words(20)
      .split(" ")
      .map((w, i) => (i !== 0 ? w.toLowerCase() : w))
      .join(" ");
  }

  private randomRating(): number {
    const num = this.randomNumber(0, 5, true);

    if (isInteger(num)) return num;

    return round(num, 2);
  }
}
