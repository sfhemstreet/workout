import { AccountSettings } from "../../components/AccountSettings";
import { render } from "../test-utils/render";

test("AccountSettings renders authorized user inputs", () => {
  const accountSettings = render(
    <AccountSettings
      user={{
        id: "1",
        name: "mah_name",
        avatar: "https://robohash.org/mah_name",
        error: "",
        isAuthenticated: true,
        isLoading: false,
        workoutsCompleted: [],
      }}
      username={{
        onSubmit: () => {},
        onTypeName: () => {},
        isUnique: true,
        error: undefined,
      }}
      avatar={{
        onSubmit: () => {},
        onCheckUrl: () => {},
        isUrlOk: true,
        error: undefined,
      }}
      onClose={() => {}}
      onDeleteAccount={() => {}}
    />
  );

  const usernameInput = accountSettings.getByLabelText("Username") as HTMLInputElement;
  const avatarInput = accountSettings.getByLabelText("Avatar URL") as HTMLInputElement;

  expect(usernameInput.disabled).toBeFalsy();
  expect(avatarInput.disabled).toBeFalsy();

  expect(accountSettings).toMatchSnapshot();
});

test("AccountSettings disables inputs for non-authorized user", () => {
  const accountSettings = render(
    <AccountSettings
      user={{
        id: "2",
        name: "Temp User",
        avatar: "",
        error: "",
        isAuthenticated: false,
        isLoading: false,
        workoutsCompleted: [],
      }}
      username={{
        onSubmit: () => {},
        onTypeName: () => {},
        isUnique: true,
        error: undefined,
      }}
      avatar={{
        onSubmit: () => {},
        onCheckUrl: () => {},
        isUrlOk: true,
        error: undefined,
      }}
      onClose={() => {}}
      onDeleteAccount={() => {}}
    />
  );

  const usernameInput = accountSettings.getByLabelText("Username") as HTMLInputElement;
  const avatarInput = accountSettings.getByLabelText("Avatar URL") as HTMLInputElement;

  expect(usernameInput.disabled).toBeTruthy();
  expect(avatarInput.disabled).toBeTruthy();

  expect(accountSettings).toMatchSnapshot();
});
