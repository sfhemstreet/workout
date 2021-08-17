import styled from "@emotion/styled";
import React, { useState } from "react";
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
} from "react-transition-group";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { User } from "../types";
import { InlineButton, SecondaryButton, SubmitButton } from "./Buttons";
import { FadeInOutMixin } from "./FadeInOut";
import {
  EMPTY_USERNAME,
  USERNAME_LENGTH,
  USERNAME_TAKEN,
} from "./SignIn/constants";
import { checkUsername } from "./SignIn/helpers";
import { TextInput } from "./TextInput";
import { H1, P } from "./Txt";

type AccountSettingsProps = {
  user: User;

  username: {
    onSubmit: (name: string) => void;
    onTypeName: (name: string) => void;
    isUnique: boolean;
    error: string | undefined;
  };

  avatar: {
    onSubmit: (url: string) => void;
    onCheckUrl: (url: string) => void;
    isUrlOk: boolean;
    error: string | undefined;
  };

  onDeleteAccount: () => void;
  onClose: () => void;
};

/**
 * AccountSettings
 * 
 * Allows signed in users to change their username / avatar, 
 * and for all user's to delete their account.
 * 
 * @param user current User
 * @param username object with properties concerning changing of username
 * @param avatar object with properties concerning changing of avatar
 * @param onDeleteAccount function called after user confirms to delete their account
 * @param onClose function called when user wishes to exit settings
 */
export const AccountSettings = ({
  user,
  username,
  avatar,
  onDeleteAccount,
  onClose,
}: AccountSettingsProps) => {
  const [newUsername, setNewUsername] = useState(user.name);
  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined
  );
  const [newAvatarUrl, setNewAvatarUrl] = useState(user.avatar);
  const [avatarError, setAvatarError] = useState<string | undefined>(undefined);

  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleSubmitUsername = () => {
    if (newUsername.trim().length === 0) {
      setUsernameError(EMPTY_USERNAME);
      return;
    }

    if (newUsername.trim() === user.name) {
      setUsernameError("You are already using that name...");
      return;
    }

    if (!username.isUnique) {
      setUsernameError(USERNAME_TAKEN);
      return;
    }

    const { hasLength, hasNoSymbols, hasNoWhitespace } = checkUsername(
      newUsername.trim()
    );

    if (!hasLength) {
      setUsernameError(
        `Name must be ${USERNAME_LENGTH.min}-${USERNAME_LENGTH.max} characters.`
      );
      return;
    }
    if (!hasNoSymbols) {
      setUsernameError(`Name cannot have symbols, besides '-' and '_'`);
      return;
    }
    if (!hasNoWhitespace) {
      setUsernameError(`Name cannot contain whitespace.`);
      return;
    }

    username.onSubmit(newUsername.trim());
  };

  const handleNameChange = (name: string) => {
    setNewUsername(name);
    user.name !== name && username.onTypeName(name.trim());

    if (usernameError) setUsernameError(undefined);
  };

  const handleSubmitAvatar = () => {
    if (newAvatarUrl.trim().length === 0) {
      setAvatarError("Please enter URL to image.");
      return;
    }
    if (!avatar.isUrlOk) {
      setAvatarError("URL must be an image.");
      return;
    }
    if (newAvatarUrl.trim() === user.avatar) {
      setAvatarError("You are already using this as your avatar...");
      return;
    }

    avatar.onSubmit(newAvatarUrl.trim());
  };

  const handleAvatarChange = (url: string) => {
    setNewAvatarUrl(url);
    user.avatar !== url && avatar.onCheckUrl(url);

    if (avatarError) setAvatarError(undefined);
  };

  return (
    <SwitchTransition mode="out-in">
      <Transition
        timeout={{ enter: 0, appear: 100, exit: 300 }}
        key={isDeletingAccount ? "delete" : "edit"}
      >
        {(transitionStatus) =>
          isDeletingAccount ? (
            <Container transitionStatus={transitionStatus}>
              <CloseBtn onClick={onClose}>✕</CloseBtn>
              <H1>Delete Account</H1>
              <P>Are you sure you want to delete your account?</P>
              <Row>
                <SecondaryButton onClick={() => setIsDeletingAccount(false)}>
                  Cancel
                </SecondaryButton>
                <SubmitButton onClick={onDeleteAccount}>Delete</SubmitButton>
              </Row>
            </Container>
          ) : (
            <Container transitionStatus={transitionStatus}>
              <CloseBtn onClick={onClose}>✕</CloseBtn>
              <H1>Account Settings</H1>
              {!user.isAuthenticated && (
                <P>
                  You need to be logged in to change your username or avatar.
                </P>
              )}
              <TextInput
                id="account-settings-name"
                label="Username"
                onChange={handleNameChange}
                placeholder="Want a new username?"
                value={newUsername}
                error={
                  !username.isUnique && newUsername !== user.name
                    ? USERNAME_TAKEN
                    : usernameError
                }
                isOutlined
                isDisabled={!user.isAuthenticated}
              />
              <Row flexEnd>
                <SecondaryButton
                  onClick={handleSubmitUsername}
                  disabled={!user.isAuthenticated}
                >
                  Change Username
                </SecondaryButton>
              </Row>

              <TextInput
                id="account-settings-avatar"
                label="Avatar URL"
                onChange={handleAvatarChange}
                placeholder="Image URl"
                value={newAvatarUrl}
                error={
                  !avatar.isUrlOk
                    ? "Invalid URL, must be an image."
                    : avatarError
                }
                isOutlined
                isDisabled={!user.isAuthenticated}
              />
              <Row flexEnd>
                <SecondaryButton
                  onClick={handleSubmitAvatar}
                  disabled={!user.isAuthenticated}
                >
                  Change Avatar
                </SecondaryButton>
              </Row>
              <br />
              <Row>
                <SecondaryButton onClick={onClose}>Close</SecondaryButton>
                <SecondaryButton onClick={() => setIsDeletingAccount(true)}>
                  Delete Account
                </SecondaryButton>
              </Row>
            </Container>
          )
        }
      </Transition>
    </SwitchTransition>
  );
};

const Container = styled.article<{ transitionStatus: TransitionStatus }>`
  position: relative;
  max-width: 300px;
  width: 100%;
  height: fit-content;

  border-radius: 20px;
  ${(p) => SurfaceElevation(p.theme.name, 3)};

  padding: 1rem;

  ${(p) => FadeInOutMixin(p.transitionStatus)};

  @media ${(p) => p.theme.media.tablet} {
    max-width: 500px;
  }

  button {
    margin-top: 0.25rem;
    margin-bottom: 1rem;
  }
`;

const Row = styled.div<{ flexEnd?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: ${(p) => (p.flexEnd ? "flex-end" : "space-around")};
  align-items: center;
`;

const CloseBtn = styled(InlineButton)`
  position: absolute;
  top: 2px;
  right: 12px;
  font-family: ${(p) => p.theme.font.numberFamily};
  font-size: 2rem;
  background: transparent;
`;
