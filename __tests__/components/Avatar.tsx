import { Avatar } from "../../components/Avatar";
import { fireEvent, render } from "../test-utils/test-util";

test("Avatar renders properly", () => {
  const onclick = jest.fn();

  const avatar = render(
    <Avatar
      isLoading={false}
      src="https://robohash.org/test"
      onClick={onclick}
    />
  );

  const btn = avatar.getAllByRole("button")[0];

  fireEvent.click(btn);

  expect(onclick).toBeCalled();

  expect(avatar).toMatchSnapshot;
});

test("Avatar isLoading renders properly", () => {
  const avatar = render(<Avatar isLoading={true} src="" />);

  expect(avatar).toMatchSnapshot;
});
