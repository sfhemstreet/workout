import styled from "@emotion/styled";

export const Container = styled.section<{ hasBackground?: boolean }>`
  width: 100%;
  height: auto;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2px;
  margin: 0px;

  ${(p) =>
    p.hasBackground &&
    `background-color: ${
      p.theme.name === "DARK"
        ? `rgba(44, 44, 44, 0.2)`
        : `rgba(241, 241, 241, 0.2)`
    }`};

  @media ${(p) => p.theme.media.laptopM} {
    border-radius: 10px;
    padding: 10px;

    box-shadow: 0px 1px 5px 0px
      ${(p) =>
        p.theme.name === "DARK"
          ? `rgba(255, 255, 255, 0.2)`
          : `rgba(0,0,0,0.2)`};

    background-color: ${(p) =>
      p.theme.name === "DARK"
        ? `rgba(44, 44, 44, 0.2)`
        : `rgba(241, 241, 241, 0.2)`};
  }
`;

export const Name = styled.div<{
  shouldShrink?: boolean;
  isViewable?: boolean;
}>`
  display: ${(p) => (p.isViewable ? "block" : "none")};
  text-align: center;
  margin-right: 10px;

  p {
    font-size: ${(p) => (p.shouldShrink ? "0.8rem" : "default")};
  }

  h5 {
    padding-bottom: 0px;
  }

  span {
    font-size: 9px;
    padding: 0px;
    margin: 0px;
    color: ${(p) => p.theme.colors.onBackgroundLowEmp};
    cursor: help;
  }

  @media ${(p) => p.theme.media.laptop} {
    display: block;
    margin-right: 15px;

    span {
      font-size: 11px;
    }
  }
`;

export const AvatarRow = styled.div<{ isSideBar?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: ${p => p.isSideBar ? "1rem" : "0px"};

  @media ${p => p.theme.media.laptopM} {
    padding-bottom: 1rem;
  }
`;

export const Menu = styled.div<{ isViewable?: boolean }>`
  width: 100%;
  height: 100%;

  display: ${(p) => (p.isViewable ? "flex" : "none")};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media ${(p) => p.theme.media.laptopM} {
    display: flex;
  }
`;
