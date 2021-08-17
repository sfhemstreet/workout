import React from "react";
import { UserMenuProps } from ".";
import { UserWorkoutsCompleted } from "./UserWorkoutsCompleted";
import { SecondaryButton } from "../Buttons";
import { NameAvatar } from "./NameAvatar";
import { Container, Menu } from "./styles";
import { ThemeToggler } from "./ThemeToggler";
import { SoundToggler } from "./SoundToggler";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { isMedia } from "../../styles/media";

export interface ContentProps extends UserMenuProps {
  isSideBar?: boolean;
}

/**
 * Content
 * 
 * User Menu content
 * 
 * @param user User object
 * @param themeType 'DARK' or 'LIGHT'
 * @param actions actions object
 * @param isSoundOn boolean
 * @param isSideBar if this content is featured inside of a SideBar component set to `true`   
 * @param isOpen if this content is featured inside of a SideBar component and the sidebar is open set this to `true`
 */
export const Content = ({
  user,
  themeType,
  actions,
  isSoundOn,
  isSideBar,
  isOpen,
}: ContentProps) => {
  const { width } = useWindowDimensions();

  return (
    <Container
      hasBackground={isSideBar}
    >
      <NameAvatar
        {...user}
        onClick={
          isMedia(width, "laptopM")
            ? actions.toggleSettings
            : isOpen
              ? actions.toggleSettings
              : actions.toggleSideBar
        }
        isSideBar={isSideBar}
      />
      <Menu isViewable={isSideBar}>
        {!user.isAuthenticated && (
          <SecondaryButton onClick={actions.signIn}>Sign In</SecondaryButton>
        )}

        <UserWorkoutsCompleted workoutsCompleted={user.workoutsCompleted} />

        <ThemeToggler
          currentTheme={themeType}
          toggleTheme={actions.toggleTheme}
        />

        <SoundToggler isSoundOn={isSoundOn} toggleSound={actions.toggleSound} />

        {user.isAuthenticated && (
          <SecondaryButton onClick={actions.signOut}>Sign Out</SecondaryButton>
        )}
      </Menu>
    </Container>
  );
};
