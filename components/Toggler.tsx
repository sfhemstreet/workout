import styled from "@emotion/styled";
import { SurfaceElevation } from "../styles/SurfaceElevation";
import { TertiaryButton } from "./Buttons/TertiaryButton";
import { NumberSpan } from "./Txt";

type TogglerProps = {
  onToggle: () => void;
  isOn: boolean;
  offLabel: string;
  onLabel: string;
  ariaLabel?: string;
  title?: string;
};

/**
 * Toggler
 * 
 * Horizontal on / off switch with clickable buttons on either side.
 * 
 * @param title Title for toggler, displays above 
 * @param onLabel Label for the 'on' side 
 * @param offLabel Label for the 'off' side
 * @param ariaLabel aria-label for toggler, not displayed
 * @param onToggle function called when toggler is clicked.
 * @param isOn boolean, controls which side the toggler is set to
 * 
 */
export const Toggler = ({
  onLabel,
  offLabel,
  onToggle,
  isOn,
  ariaLabel,
  title,
}: TogglerProps) => (
  <Container>
    {title && <Title>{title}</Title>}
    <Row>
      <Btn onClick={onToggle} disabled={isOn}>
        {onLabel}
      </Btn>
      <ToggleContainer>
        <TogglerLabel aria-label={ariaLabel}>
          <TogglerInput type={"checkbox"} checked={isOn} onChange={onToggle} />
          <ToggleBall isOn={isOn} />
        </TogglerLabel>
      </ToggleContainer>
      <Btn onClick={onToggle} disabled={!isOn}>
        {offLabel}
      </Btn>
    </Row>
  </Container>
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Btn = styled(TertiaryButton)`
  color: ${(p) => p.theme.colors.onSurfaceLowEmp};
  :disabled {
    color: ${(p) =>
      p.theme.name === "LIGHT"
        ? p.theme.colors.onBackground
        : p.theme.colors.secondary};
    opacity: 1;
  }

  min-width: 50px;
  font-size: 1rem;
`;

const TogglerInput = styled.input`
  position: absolute;
  width: 55px;
  height: 30px;
  border-radius: 10px;
  opacity: 0;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;

const TogglerLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;

const ToggleContainer = styled.div`
  position: relative;
  border-radius: 10px;
  background-color: black;
  background: ${(props) => props.theme.colors.backgroundGradient};
  background-size: 300% 300%;
  background-position: center;
  //background-size: cover;
  width: 55px;
  height: 27px;
  padding: 0px;
  margin: 0px;

  box-shadow: inset 0px 0px 1px 1px
    ${(p) =>
      p.theme.name === "DARK"
        ? "rgba(241, 241, 241,0.4)"
        : "rgb(18, 18, 18, 0.1)"};

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ToggleBall = styled.div<{ isOn: boolean }>`
  width: 26px;
  height: 27px;
  border-radius: 10px;

  background-color: ${(props) =>
    props.theme.name === "LIGHT" ? "white" : "#999"};

  box-shadow: ${(props) =>
    props.theme.name === "LIGHT"
      ? "inset -1px -1px 3px black"
      : "inset -1px -1px 3px black, inset 1px 1px 2px #DDD"};

  transform: ${(props) => (props.isOn ? "none" : "translateX(30px)")};
  transition: all 300ms ease-in-out;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // ${(p) => SurfaceElevation(p.theme.name, 1)};

  padding: 7px 5px 5px 5px;
  border-radius: 5px;
`;

const Title = styled(NumberSpan)`
  font-size: 0.9rem;
  color: ${(p) => p.theme.colors.onBackgroundLowEmp};
`;
