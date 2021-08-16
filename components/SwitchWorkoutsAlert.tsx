import styled from "@emotion/styled";
import React from "react";

import { BoxShadowFlicker } from "../styles/keyframes";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { SecondaryButton, SubmitButton } from "./Buttons";
import { Center, Row } from "./WorkoutForm/styles";
import { FadeInOut } from "./FadeInOut";
import { FullscreenBlurredBackground } from "./FullScreenBlurredBackground";
import { H5, P } from "./Txt";

type SwitchWorkoutAlertProps = {
  isShowing: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  workoutName: string;
};

/**
 * SwitchWorkoutsAlert
 * 
 * Displays a modal alert window that tells the user they are switching workouts
 * before they completed the first workout.
 * 
 * @param isShowing boolean to determine if modal dialog window is mounted
 * @param onCancel function to cancel switching workouts
 * @param onConfirm function to confirm switch
 * @param workoutName name of uncompleted workout 
 * @returns
 */
export const SwitchWorkoutsAlert = ({
  isShowing,
  onCancel,
  onConfirm,
  workoutName,
}: SwitchWorkoutAlertProps) => (
  <FadeInOut
    isShowing={isShowing}
    render={(transitionStatus) => (
      <FullscreenBlurredBackground
        transitionStatus={transitionStatus}
        onClick={onCancel}
      >
        <Center>
          {/* @ts-ignore: emotion is being very annoying. */}
          <DialogWindow onClick={(e) => e.stopPropagation()}>
            <H5>Are you sure you want to switch workouts?</H5>
            <P>You haven't finished {workoutName} yet.</P>

            <Row justifyContent="space-between">
              <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
              <SubmitButton onClick={onConfirm}>Yes</SubmitButton>
            </Row>
          </DialogWindow>
        </Center>
      </FullscreenBlurredBackground>
    )}
  />
);

const DialogWindow = styled.div`
  width: 280px;
  height: 280px;

  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  text-align: center;

  ${(p) => SurfaceElevation(p.theme.name, 4)};
  border-radius: 10px;

  animation: ${BoxShadowFlicker} 5s infinite alternate;
`;
