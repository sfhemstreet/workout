import * as Txt from "../../components/Txt";
import { render } from "../test-utils/render";

test("Txt components render properly", () => {
  const components = render(
    <div id="txt-test-div">
      <Txt.H1 padding="10000px">Test H1</Txt.H1>
      <Txt.H2 margin="10000rem">Test H2</Txt.H2>
      <Txt.H3>Test H3</Txt.H3>
      <Txt.H4 padding="666px" margin="666px" textAlign="center">Test H4</Txt.H4>
      <Txt.H5 textAlign="right">Test H5</Txt.H5>
      <Txt.LowEmpSpan margin="10000px">Test LowEmpSpan</Txt.LowEmpSpan>
      <Txt.NumberSpan>Test NumberSpan</Txt.NumberSpan>
      <Txt.P>Test P</Txt.P>
    </div>
  );

  expect(components).toMatchSnapshot();
});