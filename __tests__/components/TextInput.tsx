import { TextInput } from "../../components/TextInput";
import { fireEvent, render } from "../test-utils/render";

test("TextInput renders properly", () => {
  const inputValues = {
    "1": "hello",
    "2": "greg@gmail.com",
    "3": "password",
    "textarea": "Text area text here"
  }
  const inputs = render(<div>
    <TextInput 
      id="1"
      value={inputValues[1]}
      onChange={(value) => inputValues[1] = value}
      label="1"
      placeholder="1"
    />
    <TextInput 
      id="2"
      value={inputValues[2]}
      onChange={(value) => inputValues[2] = value}
      label="2"
      placeholder="2"
      isEmail
    />
    <TextInput 
      id="3"
      value={inputValues[3]}
      onChange={(value) => inputValues[3] = value}
      label="3"
      placeholder="3"
      isPassword
    />
    <TextInput 
      id="outlined"
      value={""}
      onChange={() => {}}
      label="Outlined"
      placeholder="outlined"
      isOutlined
    />
    <TextInput 
      id="textarea"
      value={inputValues['textarea']}
      onChange={(value) => inputValues['textarea'] = value}
      label="TextArea"
      placeholder="TextArea"
      isTextArea
    />
  </div>);

  const input1 = inputs.getByLabelText("1") as HTMLInputElement;
  const input2 = inputs.getByLabelText("2") as HTMLInputElement;
  const input3 = inputs.getByLabelText("3") as HTMLInputElement;
  const textArea = inputs.getByLabelText("TextArea") as HTMLTextAreaElement;

  const toggleVisibilityBtn = inputs.getByRole("button");

  expect(input1.value).toBe(inputValues[1]);
  expect(input2.value).toBe(inputValues[2]);
  expect(input3.value).toBe(inputValues[3]);
  expect(textArea.value).toBe(inputValues.textarea);
  expect(input3.type).toBe("password");

  fireEvent.change(input1, { target: { value: "change 1" }});
  fireEvent.change(input2, { target: { value: "change 2" }});
  fireEvent.change(input3, { target: { value: "change 3" }});
  fireEvent.change(textArea, { target: { value: "change text area" }});
  fireEvent.click(toggleVisibilityBtn);

  expect(inputValues[1]).toBe("change 1");
  expect(inputValues[2]).toBe("change 2");
  expect(inputValues[3]).toBe("change 3");
  expect(inputValues.textarea).toBe("change text area");
  expect(input3.type).toBe("text");
  
  expect(inputs).toMatchSnapshot();
})