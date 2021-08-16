import React, { useCallback, useEffect, useReducer, useState } from "react";
import { debounce } from "ts-debounce";

import { Exercise, Workout } from "../../types";
import { H2, H3, P } from "../Txt";
import { TextInput } from "../TextInput";
import * as validator from "../../utils/validation";
import {
  WorkoutFormActionTypes,
  workoutFormReducer,
  WorkoutFormState,
  DEFAULT_STATE,
} from "./reducer";
import {
  getSavedWorkoutFromLocalStorage,
  mergeState,
  removeStateFromLocalStorage,
  saveStateToLocalStorage,
} from "./helpers";
import { ErrorP, Form, Row } from "./styles";
import { NumberSelector } from "../NumberSelector";
import { preparedExercises } from "./preparedExercises";
import { SecondaryButton, SubmitButton } from "../Buttons";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_EXERCISE_DURATION,
  MAX_EXERCISE_REPETITIONS,
  MAX_NAME_LENGTH,
  MAX_WORKOUT_ROUNDS,
  MIN_DESCRIPTION_LENGTH,
  MIN_NAME_LENGTH,
  REST_PERIOD,
} from "../../constants";
import { FadeInOut } from "../FadeInOut";
import { Tag } from "../../types/Tag";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { TagSelector } from "../TagSelector";
import { DifficultySelector } from "../DifficultySelector";
import { Toggler } from "../Toggler";
import { ExercisesInput } from "./ExercisesInput";
import { ConfirmDeleteWorkoutModal } from "./ConfirmDeleteModal";

type WorkoutFormProps = {
  editWorkout?: Workout;
  onSubmit: (workout: Omit<Workout, "creator">) => void;
  onDeleteWorkout?: (workoutId: string) => void;
  isClone?: boolean;
  canShare?: boolean;
};

/**
 * WorkoutForm
 *
 * A form that can be used to create a new workout, or edit/clone an existing one,
 *
 * @param editWorkout optional workout to edit.
 * @param onSubmit function to call when user submits workout (Workout is validated before this function is called.)
 * @param onDeleteWorkout function to call to permanently delete a workout, used to delete an existing workout
 * @param isClone boolean, set to true if its a clone workout
 */
export const WorkoutForm = ({
  editWorkout,
  onSubmit,
  onDeleteWorkout,
  isClone,
  canShare,
}: WorkoutFormProps) => {
  // When editWorkout exists use that as default state.
  const [state, dispatch] = useReducer(
    workoutFormReducer,
    editWorkout
      ? mergeState(editWorkout)
      : { ...DEFAULT_STATE, isShared: canShare ?? false }
  );
  const [isConfirmDeleteModalShowing, setIsConfirmDeleteModalShowing] = useState(false);

  const nameDescriptionValidation = ({
    value,
    isDescription,
    exerciseId,
  }: {
    value: string;
    isDescription?: boolean;
    exerciseId?: string;
  }): boolean => {
    const hasMinLength = validator.isGTEMinLength(
      value,
      isDescription ? MIN_DESCRIPTION_LENGTH : MIN_NAME_LENGTH
    );
    const hasMaxLength = validator.isLTEMaxLength(
      value,
      isDescription ? MAX_DESCRIPTION_LENGTH : MAX_NAME_LENGTH
    );
    const hasLetter =
      isDescription && value.length === 0 ? true : validator.hasLetter(value);

    // Error is either nameError, descriptionError, or undefined.
    const change = {
      [`${isDescription ? "description" : "name"}Error`]: !hasMinLength
        ? `${isDescription ? "Description" : "Name"} 
            must be at least ${
              isDescription ? MIN_DESCRIPTION_LENGTH : MIN_NAME_LENGTH
            } characters long.`
        : !hasMaxLength
        ? `${isDescription ? "Description" : "Name"} cannot be more than ${
            isDescription ? MAX_DESCRIPTION_LENGTH : MAX_NAME_LENGTH
          } characters long.`
        : !hasLetter
        ? `${isDescription ? "Description" : "Name"} must include letters.`
        : undefined,
    };

    if (exerciseId) {
      dispatch({
        type: WorkoutFormActionTypes.CHANGE_EXERCISE,
        payload: {
          exerciseId,
          change,
        },
      });
    } else {
      dispatch({
        type: WorkoutFormActionTypes.CHANGE_FIELD,
        payload: { change },
      });
    }

    if (change.nameError || change.descriptionError) return false;
    else return true;
  };

  const validateState = (): boolean => {
    const isWorkoutNameValid = nameDescriptionValidation({
      value: state.name,
    });
    const isWorkoutDescriptionValid = nameDescriptionValidation({
      value: state.description,
      isDescription: true,
    });
    // If all exercises are actually rests this = false.
    let isExercisesValid =
      state.exercises.reduce(
        (acc, e) => (e.name !== REST_PERIOD ? acc + 1 : acc),
        0
      ) > 0;

    state.exercises.forEach((exercise) => {
      const isExerciseNameValid = nameDescriptionValidation({
        value: exercise.name,
        exerciseId: exercise.id,
      });
      const isExerciseDescriptionValid = nameDescriptionValidation({
        value: exercise.description,
        exerciseId: exercise.id,
        isDescription: true,
      });
      if (!isExerciseNameValid || !isExerciseDescriptionValid) {
        isExercisesValid = false;
      }
    });

    const isTagsValid = state.tags.length >= 2;

    if (!isTagsValid) {
      dispatch({
        type: WorkoutFormActionTypes.CHANGE_FIELD,
        payload: {
          change: { tagError: "Workouts must have at least 2 tags." },
        },
      });
    }

    return (
      isWorkoutNameValid &&
      isWorkoutDescriptionValid &&
      isExercisesValid &&
      isTagsValid
    );
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isValid = validateState();

    if (isValid) {
      // Create new workout object without spread operator to avoid passing error fields.
      const workout: Omit<Workout, "creator"> = {
        id: state.id,
        name: state.name,
        description: state.description,
        difficulty: state.difficulty,
        tags: state.tags,
        rounds:
          state.rounds > MAX_WORKOUT_ROUNDS || state.rounds < 1
            ? 1
            : state.rounds,
        // Fix potential invalid input.
        exercises: state.exercises.map((e) => ({
          id: e.id,
          name: e.name,
          description: e.description,
          duration:
            !Number.isInteger(e.duration) ||
            e.duration > MAX_EXERCISE_DURATION ||
            e.duration < 0
              ? 0
              : e.duration,
          repetitions:
            !Number.isInteger(e.repetitions) ||
            e.repetitions > MAX_EXERCISE_REPETITIONS ||
            e.repetitions < 0
              ? 0
              : e.repetitions,
        })),
        stars: editWorkout ? editWorkout.stars : 0,
        clonedFromIds: editWorkout ? editWorkout.clonedFromIds : [],
        isShared: canShare ? state.isShared : false,
        createdAt: editWorkout
          ? isClone
            ? new Date()
            : editWorkout.createdAt
          : new Date(),
      };

      dispatch({ type: WorkoutFormActionTypes.DELETE_WORKOUT });
      removeStateFromLocalStorage();
      onSubmit(workout);
    } else {
      let error = "Please fix errors above, they are highlighted in red.";

      if (
        state.exercises.reduce(
          (acc, e) => (e.name !== REST_PERIOD ? acc + 1 : acc),
          0
        ) === 0
      ) {
        error += " Workout must include exercises.";
      }

      dispatch({
        type: WorkoutFormActionTypes.CHANGE_FIELD,
        payload: { change: { error } },
      });
    }
  };

  const debouncedNameDescriptionValidation = useCallback(
    debounce(nameDescriptionValidation, 500),
    []
  );

  const handleFieldChange = (
    change: Omit<Partial<Workout>, "exercises">
  ): void => {
    if (change.name || change.description) {
      debouncedNameDescriptionValidation({
        value: (change.name ?? change.description) as string,
        isDescription: change.description !== undefined,
      });
    }

    dispatch({
      type: WorkoutFormActionTypes.CHANGE_FIELD,
      payload: { change },
    });
  };

  const handleExerciseChange = (
    exerciseId: string,
    change: Partial<Exercise>
  ): void => {
    if (change.name || change.description) {
      debouncedNameDescriptionValidation({
        value: (change.name ?? change.description) as string,
        isDescription: change.description !== undefined,
        exerciseId,
      });
    }

    // If the exercise is from the pre-made list add the pre-made description.
    if (change.name) {
      const preparedExercise = preparedExercises.reduce(
        (acc: { name: string; description: string; tags: Tag[] } | null, ex) =>
          ex.name === change.name ? ex : acc,
        null
      );

      if (preparedExercise) {
        change = {
          name: preparedExercise.name,
          description: preparedExercise.description,
        };

        // Add new tags while avoiding duplicates, all prepared exercises are body-weight so add that.
        dispatch({
          type: WorkoutFormActionTypes.CHANGE_FIELD,
          payload: {
            change: {
              tags: removeDuplicates([
                ...state.tags,
                ...preparedExercise.tags,
                "body-weight",
              ]),
            },
          },
        });
      }
    }

    dispatch({
      type: WorkoutFormActionTypes.CHANGE_EXERCISE,
      payload: { exerciseId, change },
    });
  };

  const handleDeleteExercise = (
    e: React.MouseEvent<HTMLButtonElement>,
    exerciseId: string
  ): void => {
    e.preventDefault();
    dispatch({
      type: WorkoutFormActionTypes.DELETE_EXERCISE,
      payload: { exerciseId },
    });
  };

  const handleDeleteWorkout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (editWorkout) {
      setIsConfirmDeleteModalShowing(true);
      return;
    }

    dispatch({ type: WorkoutFormActionTypes.DELETE_WORKOUT });
    saveStateToLocalStorage(DEFAULT_STATE);
  };

  const handleConfirmDeleteWorkout = () => {
    onDeleteWorkout && onDeleteWorkout(state.id);
    setIsConfirmDeleteModalShowing(false);
  };

  const handleAddExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: WorkoutFormActionTypes.ADD_EXERCISE });
  };

  const handleAddRest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: WorkoutFormActionTypes.ADD_REST });
  };

  const handleReorder = (oldIndex: number, newIndex: number) =>
    dispatch({
      type: WorkoutFormActionTypes.REORDER,
      payload: {
        exercises: state.exercises.map((e, i) =>
          i === oldIndex
            ? state.exercises[newIndex]
            : i === newIndex
            ? state.exercises[oldIndex]
            : e
        ),
      },
    });

  const handleClickTag = (tag: Tag) => {
    const newTags = state.tags.includes(tag)
      ? state.tags.filter((t) => t !== tag)
      : removeDuplicates([...state.tags, tag]);

    dispatch({
      type: WorkoutFormActionTypes.CHANGE_FIELD,
      payload: {
        change: {
          tags: newTags,
          tagError: newTags.length >= 2 ? undefined : state.tagError,
        },
      },
    });
  };

  // Saves progress to localStorage after 1sec
  const debouncedSave = useCallback(
    debounce((state: WorkoutFormState) => saveStateToLocalStorage(state), 1000),
    []
  );

  // On mount, get any workout that was previously made from localStorage.
  useEffect(() => {
    if (editWorkout) return;

    const savedState = getSavedWorkoutFromLocalStorage();

    dispatch({
      type: WorkoutFormActionTypes.RESTORE,
      payload: { state: savedState },
    });
  }, []);

  // Whenever the state changes save it to localStorage,
  // except for unnamed workouts (after onSubmit is called name will be "")
  // and when editing an existing workout.
  useEffect(() => {
    if (state.name === "" || editWorkout) return;

    debouncedSave(state);
  }, [state]);

  // If editing a workout, make sure to switch
  // to the latest editWorkout prop if ids don't match.
  useEffect(() => {
    if (editWorkout && state.id !== editWorkout.id) {
      dispatch({
        type: WorkoutFormActionTypes.RESTORE,
        payload: {
          state: mergeState(editWorkout),
        },
      });
    }
  }, [editWorkout]);

  return (
    <>
      <Form>
        <Row justifyContent="space-between">
          {/* Title */}
          <H2>
            {editWorkout
              ? isClone
                ? `Cloning ${editWorkout.name}`
                : "Edit Workout"
              : "Create A Workout"}
          </H2>

          {/* Clear / Delete Workout Button */}
          <SecondaryButton onClick={handleDeleteWorkout}>
            {editWorkout ? "Delete" : "Clear"}
          </SecondaryButton>
        </Row>

        {/* Workout Name */}
        <TextInput
          id="create-workout-name"
          value={state.name}
          label="Workout Name"
          placeholder="Chest Destroyer... or something"
          error={state.nameError}
          onChange={(name) => handleFieldChange({ name })}
          isOutlined
          isRequired
        />

        {/* Workout Description */}
        <TextInput
          id="create-workout-description"
          value={state.description}
          label="Workout Description"
          placeholder="Describe the workout, sell it and get others to try it!"
          error={state.descriptionError}
          onChange={(description) => handleFieldChange({ description })}
          isTextArea
          isOutlined
        />

        {/* Workout number of rounds */}
        <Row justifyContent={canShare ? "space-evenly" : "center"}>
          <NumberSelector
            id="create-workout-rounds"
            label="Number of Rounds"
            number={state.rounds}
            onChange={(num) => handleFieldChange({ rounds: num })}
            min={1}
            max={MAX_WORKOUT_ROUNDS}
          />

          {/* Share Setting */}
          {canShare && (
            <Toggler
              title="Share Setting"
              isOn={state.isShared}
              onLabel="Public"
              offLabel="Private"
              onToggle={() => handleFieldChange({ isShared: !state.isShared })}
            />
          )}
        </Row>

        {/* Exercises */}
        <ExercisesInput
          exercises={state.exercises}
          onChange={handleExerciseChange}
          onReorder={handleReorder}
          onDelete={handleDeleteExercise}
        />

        {/* Add Exercise / Rest Buttons */}
        <Row justifyContent="space-evenly" margin="30px 0px">
          <SecondaryButton onClick={handleAddExercise}>
            Add Exercise
          </SecondaryButton>
          <SecondaryButton
            onClick={handleAddRest}
            disabled={
              state.exercises.length > 0 &&
              state.exercises.reduce((acc, curr, currIndex, arr) =>
                currIndex + 1 === arr.length ? curr : acc
              ).name === REST_PERIOD
            }
          >
            Add Rest
          </SecondaryButton>
        </Row>

        {/* Difficulty */}
        <H3 padding="20px 0px 0px 1rem">Difficulty</H3>
        <P>How difficult do you think this workout is?</P>
        <Row justifyContent="flex-start">
          <DifficultySelector
            difficulty={state.difficulty}
            onSelect={(difficulty) =>
              dispatch({
                type: WorkoutFormActionTypes.CHANGE_FIELD,
                payload: { change: { difficulty } },
              })
            }
          />
        </Row>

        {/* Tags */}
        <H3 padding="20px 0px 0px 1rem">Tags</H3>
        <P>
          Select tags that you believe apply to the workout. Please select a
          minimum of 2.
        </P>
        <ErrorP padding="0rem 1rem">{state.tagError}</ErrorP>
        <TagSelector selectedTags={state.tags} onClick={handleClickTag} />

        {/* Error */}
        <FadeInOut isShowing={state.error !== undefined}>
          <Row justifyContent="center">
            <ErrorP padding="0px 1rem 1rem 1rem" textAlign="center">
              {state.error}
            </ErrorP>
          </Row>
        </FadeInOut>

        {/* Submit Button */}
        <Row margin="2rem" justifyContent="center">
          <SubmitButton onClick={handleSubmit}>
            {editWorkout
              ? isClone
                ? "Clone"
                : "Submit Edits"
              : "Create Workout"}
          </SubmitButton>
        </Row>
      </Form>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteWorkoutModal
        isShowing={isConfirmDeleteModalShowing}
        workoutName={state.name}
        onCancel={() => setIsConfirmDeleteModalShowing(false)}
        onConfirm={handleConfirmDeleteWorkout}
      />
    </>
  );
};
