import * as Btns from "../../components/Buttons";
import { render } from "../test-utils/render";

test("Buttons render properly", () => {
  const components = render(
    <div id="buttons-test-div">
      <Btns.ArrowButton onClick={() => {}} direction={"Up"} />
      <Btns.ArrowButton onClick={() => {}} direction={"Down"} />
      <Btns.ArrowButton onClick={() => {}} direction={"Up"} isDisabled={true} />

      <Btns.Hamburger onClick={() => {}} />

      <Btns.InlineButton>Inline Button can be long</Btns.InlineButton>

      <Btns.SecondaryButton>Sec Btn</Btns.SecondaryButton>

      <Btns.SelectableInlineButton isSelected>
        Selected
      </Btns.SelectableInlineButton>

      <Btns.SmallRoundButton>+</Btns.SmallRoundButton>

      <Btns.SubmitButton>Submit</Btns.SubmitButton>

      <Btns.TertiaryButton>3rd Btn</Btns.TertiaryButton>
    </div>
  );

  expect(components).toMatchSnapshot();
});
