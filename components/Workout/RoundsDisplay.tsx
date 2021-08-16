import styled from "@emotion/styled";
import React from "react";

type RoundsDisplayProps = {
  currentRound: number;
  totalRounds: number;
  isStarted?: boolean;
};

export const RoundsDisplay = ({
  currentRound,
  totalRounds,
  isStarted,
}: RoundsDisplayProps) => (
  <Container>
    {isStarted ? <>Round
    <span>{currentRound}</span>
    of {totalRounds}</> : 
    <>
      {totalRounds} Round{totalRounds > 1 ? 's' : ''}
    </>
    }
  </Container>
);

const Container = styled.section`
  font-family: "Share Tech Mono", monospace;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-end;

  color: ${(p) => p.theme.colors.onBackgroundLowEmp};

  span {
    padding: 0px 7px;
    color: ${(p) => p.theme.colors.onBackground};
  }
`;
