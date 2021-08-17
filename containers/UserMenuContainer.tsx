import styled from "@emotion/styled";
import isEqual from "lodash.isequal";
import React, { useEffect, useState } from "react";

import { FadeInOut } from "../components/FadeInOut";
import { FullscreenBlurredBackground } from "../components/FullScreenBlurredBackground";
import { UserMenu } from "../components/UserMenu";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { toggleSignInModal } from "../redux/ducks/signInModal";
import { toggleSound } from "../redux/ducks/sound";
import { toggleTheme } from "../redux/ducks/theme";
import { signOutUser } from "../redux/ducks/user";
import { closeUserSideBar, toggleUserSideBar } from "../redux/ducks/userSideBar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { isMedia } from "../styles/media";
import { AccountSettingsContainer } from "./AccountSettingsContainer";

/**
 * UserMenuContainer
 * 
 * Connects to redux store to give props to UserMenu component,
 * and stores state of account settings modal. 
 */
export const UserMenuContainer = () => {
  const dispatch = useAppDispatch();
  const { user, themeType, isSidebarOpen, isSoundOn } = useAppSelector(
    (state) => ({
      isSidebarOpen: state.userSideBar.isOpen,
      user: state.user,
      themeType: state.theme.type,
      isSoundOn: state.sound.isOn,
    }),
    isEqual
  );
  const { width } = useWindowDimensions();
  const [isAccountSettingsShowing, setIsAccountSettingsShowing] =
    useState(false);

  const handleToggleSideBar = () => {
    if (!isMedia(width, "laptopM")) {
      dispatch(toggleUserSideBar());
    }
  };

  const handleToggleTheme = () => dispatch(toggleTheme());

  const handleSignIn = () => dispatch(toggleSignInModal());

  const handleSignOut = () => dispatch(signOutUser());

  const handleToggleSound = () => dispatch(toggleSound());

  const myAvatar =
    user.avatar !== ""
      ? user.avatar
      : themeType === "DARK"
      ? "images/bag-on-head-white.png"
      : "images/bag-on-head-black.png";

  useEffect(() => {
    if (isMedia(width, "laptopM") && isSidebarOpen) {
      dispatch(closeUserSideBar());
    }
  }, [width])

  return (
    <>
      <UserMenu
        isOpen={isSidebarOpen}
        user={{ ...user, avatar: myAvatar }}
        themeType={themeType}
        isSoundOn={isSoundOn}
        actions={{
          signIn: handleSignIn,
          signOut: handleSignOut,
          toggleSettings: () => setIsAccountSettingsShowing(true),
          toggleTheme: handleToggleTheme,
          toggleSideBar: handleToggleSideBar,
          toggleSound: handleToggleSound,
        }}
      />
      <FadeInOut
        isShowing={isAccountSettingsShowing}
        render={(transitionStatus) => (
          <FullscreenBlurredBackground
            transitionStatus={transitionStatus}
            onClick={() => setIsAccountSettingsShowing(false)}
          >
            <Div onClick={(e) => e.stopPropagation()}>
              <AccountSettingsContainer
                closeSettings={() => setIsAccountSettingsShowing(false)}
              />
            </Div>
          </FullscreenBlurredBackground>
        )}
      />
    </>
  );
};

const Div = styled.div`
  width: auto;
  height: min-content;
`;
