import React from "react";
import { TransitionGroup, Transition } from "react-transition-group";

import { REST_PERIOD } from "../../constants";
import { Exercise } from "../../types";
import { ArrowButton, SecondaryButton } from "../Buttons";
import { NumberSelector } from "../NumberSelector";
import { TextInput } from "../TextInput";
import { H3, H4, LowEmpSpan, NumberSpan, P } from "../Txt";
import { DurationSelector } from "./DurationSelector";
import { preparedExercises } from "./preparedExercises";
import { ExerciseState } from "./reducer";
import {
  ExerciseContainer,
  ExercisesContainer,
  MarginLeft,
  Row,
} from "./styles";

type ExercisesInputProps = {
  exercises: ExerciseState[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  onDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    exerciseId: string
  ) => void;
  onChange: (exerciseId: string, change: Partial<Exercise>) => void;
};

/**
 * ExercisesInput
 * 
 * Inputs for adding exercises and rest periods to workout.
 *
 * @param exercises exercises in workout
 * @param onReorder function called when exercise order is changed
 * @param onChange function called when field of exercise changes
 * @param onDelete function called when exercise's 'Delete' button is clicked
 */
export const ExercisesInput = ({
  exercises,
  onReorder,
  onChange,
  onDelete,
}: ExercisesInputProps) => (
  <>
    <H3 padding="20px 0px 0px 1rem">Exercises</H3>
    <P>
      Add exercises and rest periods.{" "}
      <LowEmpSpan>
        You can reorder the exercises and rests by using the arrows.
      </LowEmpSpan>
    </P>
    <P padding="0px 1rem">
      Duration: Exercises with no duration (ie '0:00') will not be timed, and
      will require the person doing the workout to hit the 'Next' button.{" "}
      <LowEmpSpan>
        (Only set duration to zero if you want a certain number of reps to be
        performed.)
      </LowEmpSpan>
    </P>
    <P>
      Repetitions: If you want the exercise to be performed to failure, set
      repetitions to 0.
    </P>

    <TransitionGroup component={ExercisesContainer}>
      {exercises.map((exercise, index) => (
        <Transition
          key={exercise.id}
          mountOnEnter
          unmountOnExit
          timeout={{
            appear: 500,
            enter: 300,
            exit: 500,
          }}
        >
          {(transitionStatus) => (
            <ExerciseContainer transitionStatus={transitionStatus}>
              {exercise.name === REST_PERIOD ? (
                <>
                  {/* REST PERIOD INPUT */}
                  <Row justifyContent="space-between" margin="0px 0px 15px 0px">
                    <div>
                      <Row justifyContent="flex-start">
                        <H4>
                          Rest{" "}
                          <NumberSpan>
                            {
                              /* Rest Number */
                              /* Total number of rests - rests that come after this one */
                              exercises.reduce(
                                (acc, e) =>
                                  e.name === REST_PERIOD ? acc + 1 : acc,
                                0
                              ) -
                                exercises.reduce(
                                  (acc, e, i) =>
                                    e.name === REST_PERIOD && i > index
                                      ? acc + 1
                                      : acc,
                                  0
                                )
                            }
                          </NumberSpan>
                        </H4>
                        {/* Move Rest position in list */}
                        <MarginLeft>
                          <ArrowButton
                            direction="Up"
                            onClick={() => onReorder(index, index - 1)}
                            isDisabled={index === 0}
                          />
                          <ArrowButton
                            direction="Down"
                            onClick={() => onReorder(index, index + 1)}
                            isDisabled={index >= exercises.length - 1}
                          />
                        </MarginLeft>
                      </Row>
                    </div>
                    {/* Remove Rest Button */}
                    <SecondaryButton onClick={(e) => onDelete(e, exercise.id)}>
                      Remove
                    </SecondaryButton>
                  </Row>
                  {/* Rest Description */}
                  <TextInput
                    id={`exercise-description-${index}`}
                    label="Rest Message"
                    value={exercise.description}
                    error={exercise.descriptionError}
                    onChange={(description) =>
                      onChange(exercise.id, { description })
                    }
                    placeholder="Optional Message to display during rest"
                    isOutlined
                  />
                  <Row justifyContent="center">
                    {/* Rest Duration */}
                    <DurationSelector
                      id={`exercise-duration-${index}`}
                      duration={exercise.duration}
                      onChange={(duration) =>
                        onChange(exercise.id, { duration })
                      }
                    />
                  </Row>
                  {/* END REST PERIOD INPUT */}
                </>
              ) : (
                <>
                  {/* EXERCISE INPUT */}
                  <Row justifyContent="space-between" margin="0px 0px 15px 0px">
                    <div>
                      <Row justifyContent="flex-start">
                        <H4>
                          Exercise{" "}
                          <NumberSpan>
                            {
                              /* Exercise Number */
                              /* Total number of exercises - exercises that come after this one */
                              exercises.reduce(
                                (acc, e) =>
                                  e.name !== REST_PERIOD ? acc + 1 : acc,
                                0
                              ) -
                                exercises.reduce(
                                  (acc, e, i) =>
                                    e.name !== REST_PERIOD && i > index
                                      ? acc + 1
                                      : acc,
                                  0
                                )
                            }
                          </NumberSpan>
                        </H4>
                        {/* Move Exercise position in list */}
                        <div>
                          <ArrowButton
                            direction="Up"
                            onClick={() => onReorder(index, index - 1)}
                            isDisabled={index === 0}
                          />
                          <ArrowButton
                            direction="Down"
                            onClick={() => onReorder(index, index + 1)}
                            isDisabled={index >= exercises.length - 1}
                          />
                        </div>
                      </Row>
                    </div>
                    {/* Remove Exercise Button */}
                    <SecondaryButton
                      onClick={(e) => onDelete(e, exercise.id)}
                      disabled={
                        exercises.filter((e) => e.name !== REST_PERIOD)
                          .length <= 1
                      }
                    >
                      Remove
                    </SecondaryButton>
                  </Row>
                  {/* Exercise Name */}
                  <TextInput
                    id={`exercise-name-${index}`}
                    list="exercises-data-list"
                    label={`Exercise Name`}
                    placeholder={"Pushups"}
                    value={exercise.name}
                    error={exercise.nameError}
                    onChange={(name) => onChange(exercise.id, { name })}
                    isOutlined
                    isRequired
                  />
                  {/* Exercise Name Options */}
                  <datalist id="exercises-data-list">
                    {preparedExercises.map((ex, i) => (
                      <option key={i} value={ex.name} />
                    ))}
                  </datalist>
                  {/* Exercise Description */}
                  <TextInput
                    id={`exercise-description-${index}`}
                    label={"Exercise Description"}
                    placeholder="Give others an idea of how the exercise should be performed."
                    value={exercise.description}
                    error={exercise.descriptionError}
                    onChange={(description) =>
                      onChange(exercise.id, { description })
                    }
                    isOutlined
                    isTextArea
                  />
                  <Row justifyContent="space-evenly" isColumnOnMobile>
                    {/* Exercise Duration  */}
                    <DurationSelector
                      id={`exercise-duration-${index}`}
                      duration={exercise.duration}
                      onChange={(duration) =>
                        onChange(exercise.id, { duration })
                      }
                    />
                    {/* Exercise Repetitions */}
                    <NumberSelector
                      id={`exercise-rep-count-${index}`}
                      label="Repetitions"
                      number={exercise.repetitions}
                      onChange={(repetitions) =>
                        onChange(exercise.id, { repetitions })
                      }
                      min={0}
                      max={999}
                    />
                  </Row>
                  {/* END EXERCISE INPUT */}
                </>
              )}
            </ExerciseContainer>
          )}
        </Transition>
      ))}
    </TransitionGroup>
  </>
);
