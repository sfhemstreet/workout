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
