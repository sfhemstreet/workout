import isEqual from "lodash.isequal";
import { useState } from "react";
import { Subject } from "rxjs";
import { AccountSettings } from "../components/AccountSettings";
import { useGetRequestContentType } from "../hooks/useGetRequestContentType";
import { useIsUsernameUnique } from "../hooks/useIsUsernameUnique";
import {
  userAvatarChange,
  userDeleteBegin,
  userNameChange,
} from "../redux/ducks/user";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const userNameSubject$ = new Subject<string>();
const avatarSubject$ = new Subject<string>();

type AccountSettingsContainerProps = {
  closeSettings: () => void;
};

/**
 * AccountSettingsContainer
 *
 * Connects to the redux store and provides data/functions to AccountSettings component.
 *
 * @param closeSettings Function to close account settings modal
 */
export const AccountSettingsContainer = ({
  closeSettings,
}: AccountSettingsContainerProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(
    (state) => ({
      user: state.user,
    }),
    isEqual
  );
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isAvatarOk, setIsAvatarOk] = useState(true);

  const handleDeleteAccount = () => {
    dispatch(userDeleteBegin());
    closeSettings();
  };

  const handleChangeName = (name: string) => {
    dispatch(userNameChange(name));
    closeSettings();
  };

  const handleCheckName = (name: string) => userNameSubject$.next(name);

  const handleChangeAvatar = (url: string) => {
    dispatch(userAvatarChange(url));
    closeSettings();
  };

  const handleCheckAvatar = (url: string) => avatarSubject$.next(url);

  const handleCheckContentType = (contentType: string) =>
    setIsAvatarOk(contentType.startsWith("image/"));

  useIsUsernameUnique(userNameSubject$, setIsUsernameUnique);
  useGetRequestContentType(avatarSubject$, handleCheckContentType);

  return (
    <AccountSettings
      user={user}
      username={{
        onSubmit: handleChangeName,
        onTypeName: handleCheckName,
        isUnique: isUsernameUnique,
        error: undefined,
      }}
      avatar={{
        onSubmit: handleChangeAvatar,
        onCheckUrl: handleCheckAvatar,
        isUrlOk: isAvatarOk,
        error: undefined,
      }}
      onDeleteAccount={handleDeleteAccount}
      onClose={closeSettings}
    />
  );
};
