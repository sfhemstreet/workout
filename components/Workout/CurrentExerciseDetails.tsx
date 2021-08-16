import styled from "@emotion/styled";
import React from "react";
import { SurfaceElevation } from "../../styles/SurfaceElevation";
import { getExerciseDurationDisplayString } from "../../utils/getExerciseDurationDisplayString";
import { SecondaryButton } from "../Buttons";
import { P, NumberSpan } from "../Txt";

type CurrentExerciseDetailsProps = {
  onClose: () => void;
  name: string;
  description: string;
  repetitions: number;
  duration: number;
  currentTime: number;
};

export const CurrentExerciseDetails = ({
  onClose,
  name,
  description,
  duration,
  currentTime,
  repetitions,
}: CurrentExerciseDetailsProps) => (
  <Center>
    <DescriptionContainer onClick={(e) => e.stopPropagation()}>
      <SecondaryButton onClick={onClose}>Close</SecondaryButton>
      <P>Exercise:</P> <P>{name}</P>
      {description !== "" && (
        <>
          <P>Description:</P> <P>{description}</P>
        </>
      )}
      <P>Repetitions:</P>
      <P>
        {repetitions === 0 ? (
          "Till Failure"
        ) : (
          <NumberSpan>{repetitions}</NumberSpan>
        )}
      </P>
      <P>Duration:</P>{" "}
      <P>
        {duration === 0 ? (
          "Unlimited"
        ) : (
          <NumberSpan>
            {getExerciseDurationDisplayString(duration, true)}
          </NumberSpan>
        )}
      </P>
      <P>Time Remaining:</P>
      <P>
        {duration === 0 ? (
          "Unlimited"
        ) : (
          <NumberSpan>
            {getExerciseDurationDisplayString(currentTime, true)}
          </NumberSpan>
        )}
      </P>
    </DescriptionContainer>
  </Center>
);

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: max-content;
  padding: 40px 20px 20px 20px;

  border-radius: 20px;

  ${(p) => SurfaceElevation(p.theme.name, 3)};

  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr min-content 1fr 1fr 1fr;

  position: relative;

  button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  @media ${(p) => p.theme.media.tablet} {
    width: 500px;
  }
`;
