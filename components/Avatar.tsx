import styled from "@emotion/styled";
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
} from "react-transition-group";
import { FadeInKeyframe } from "../styles/keyframes";

import { SurfaceElevation } from "../styles/SurfaceElevation";
import { FadeInOutMixin } from "./FadeInOut";
import { LoadingShimmer } from "./LoadingShimmer";


type AvatarProps = {
  isLoading: boolean;
  src: string;
  onClick?: () => void;
};

/**
 * Avatar
 * 
 * Displays round user avatar 
 * 
 * @param isLoading when `true` a LoadingShimmer is rendered instead of avatar
 * @param src src of avatar img
 * @param onClick function to call when avatar is clicked
 */
export const Avatar = ({ isLoading, src, onClick }: AvatarProps) => (
  <BtnContainer
    noHover={onClick === undefined}
    onClick={() => !isLoading && onClick && onClick()}
    aria-label="User information"
  >
    <SwitchTransition mode="out-in">
      <Transition key={isLoading ? "true" : "false"} timeout={200}>
        {(status) => (
          <>
            {isLoading ? (
              <LoadingContainer status={status}>
                <LoadingShimmer />
              </LoadingContainer>
            ) : (
              <Img
                role="button"
                status={status}
                src={src}
                alt="User Avatar"
                title="Toggle user menu"
              />
            )}
          </>
        )}
      </Transition>
    </SwitchTransition>
  </BtnContainer>
);

const BtnContainer = styled.button<{ noHover: boolean }>`
  padding: 0px;
  border: none;
  overflow: hidden;

  ${(p) => SurfaceElevation(p.theme.name, 4)};

  width: 50px;
  height: 50px;
  border-radius: 50%;

  display: flex;
  justify-content: space-around;
  align-items: center;

  animation: ${FadeInKeyframe} 300ms linear both;
  transition: ${(p) => p.theme.transitions.normal};

  cursor: ${(p) => (p.noHover ? "default" : "pointer")};

  :hover {
    ${(p) => !p.noHover && `background: ${p.theme.colors.secondary}`};
  }

  @media ${(p) => p.theme.media.tablet} {
    width: 60px;
    height: 60px;
  }
`;

const Img = styled.img<{ status: TransitionStatus }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;

  ${(p) => FadeInOutMixin(p.status)};

  @media ${(p) => p.theme.media.tablet} {
    width: 56px;
    height: 56px;
  }
`;

const LoadingContainer = styled.div<{ status: TransitionStatus }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;

  overflow: hidden;

  display: flex;
  justify-content: space-around;
  align-items: center;

  transition: ${(p) => p.theme.transitions.normal};
  opacity: ${(p) => (p.status === "entered" ? 1 : 0)};

  @media ${(p) => p.theme.media.tablet} {
    width: 56px;
    height: 56px;
  }
`;
