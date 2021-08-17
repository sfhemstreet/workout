import React from "react";
import { Avatar } from "../Avatar";
import { P } from "../Txt";
import { AvatarRow, Name } from "./styles";

type NameAvatarProps = {
  name: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  avatar: string;
  onClick?: () => void;
  isSideBar?: boolean;
};

/**
 * NameAvatar
 * 
 * Displays the user's name and avatar.
 * Avatar is a button which is controlled by `onClick` prop.
 * 
 * @param name current user's name
 * @param isAuthenticated status of user's login
 * @param isLoading loading  status of user
 * @param avatar user's avatar src
 * @param onClick function called when avatar is clicked
 * @param isSideBar boolean, set to `true` when this component is being rendered inside SideBar component
 */
export const NameAvatar = ({
  name,
  isAuthenticated,
  isLoading,
  avatar,
  onClick,
  isSideBar,
}: NameAvatarProps) => (
  <AvatarRow>
    <Name shouldShrink={name.length > 16} isViewable={isSideBar}>
      <P margin="0px" padding="0px">
        {isLoading ? "Loading" : name}
      </P>
      {!isLoading && !isAuthenticated && (
        <span
          aria-label="Register or sign in to share workouts!"
          role="tooltip"
          data-microtip-position="bottom-left"
        >
          Anonymous
        </span>
      )}
    </Name>
    <Avatar isLoading={isLoading} src={avatar} onClick={onClick} />
  </AvatarRow>
);
