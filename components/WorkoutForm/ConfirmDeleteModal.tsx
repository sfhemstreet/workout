import React from "react";
import { SecondaryButton, SubmitButton } from "../Buttons";
import { FadeInOut } from "../FadeInOut";
import { FullscreenBlurredBackground } from "../FullScreenBlurredBackground";
import { H5 } from "../Txt";
import { Center, ErrorP, Row, DialogWindow } from "./styles";

type ConfirmDeleteWorkoutModalProps = {
  workoutName: string;
  isShowing: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

/**
 * ConfirmDeleteWorkoutModal
 * 
 * @param isShowing controls when modal is mounted/un-mounted
 * @param workoutName name to display
 * @param onCancel function to call when user cancels
 * @param onConfirm function to call when user confirms
 */
export const ConfirmDeleteWorkoutModal = ({
  isShowing,
  workoutName,
  onCancel,
  onConfirm,
}: ConfirmDeleteWorkoutModalProps) => (
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
            <H5>Are you sure you want to delete {workoutName}?</H5>
            <ErrorP textAlign="center">You cannot undo this.</ErrorP>

            <Row justifyContent="space-between">
              <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
              <SubmitButton onClick={onConfirm}>Delete</SubmitButton>
            </Row>
          </DialogWindow>
        </Center>
      </FullscreenBlurredBackground>
    )}
  />
);
