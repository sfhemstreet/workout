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
