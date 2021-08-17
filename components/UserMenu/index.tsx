import React from "react";
import { ThemeType, User } from "../../types";
import { SideBar } from "../SideBar";
import { Content } from "./Content";

export type UserMenuProps = {
  isOpen: boolean;
  user: User;
  themeType: ThemeType;
  isSoundOn: boolean;
  actions: {
    signIn: () => void;
    signOut: () => void;
    toggleSettings: () => void;
    toggleTheme: () => void;
    toggleSideBar: () => void;
    toggleSound: () => void;
  };
};

/**
 * UserMenu
 * 
 * Displays User controls.
 * 
 * On small screens Content is rendered inside SideBar component.
 * 
 * @param isOpen controls SideBar  component for small screens
 * @param isSoundOn boolean for sound toggle
 * @param user current User 
 * @param themeType 'DARK' or 'LIGHT'
 * @param actions actions object
 */
export const UserMenu = ({
  isOpen,
  isSoundOn,
  user,
  themeType,
  actions,
}: UserMenuProps) => (
  <>
    <Content
      user={user}
      isSoundOn={isSoundOn}
      themeType={themeType}
      actions={actions}
      isOpen={isOpen}
    />
    <SideBar isOpen={isOpen} side="right" closeSideBar={actions.toggleSideBar}>
      <Content
        user={user}
        isSoundOn={isSoundOn}
        themeType={themeType}
        actions={actions}
        isOpen={isOpen}
        isSideBar={true}
      />
    </SideBar>
  </>
);
