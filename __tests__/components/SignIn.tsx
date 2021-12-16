import { SignIn } from "../../components/SignIn";
import { INVALID_EMAIL, INVALID_PASSWORD } from "../../components/SignIn/constants";
import { fireEvent, render } from "../test-utils/render";

test("SignIn inputs render input", () => {
  const signin = render(
    <SignIn
      onSubmit={() => {}}
      isLoading={false}
      onClose={() => {}}
      signin={{ error: undefined }}
      register={{
        isUsernameUnique: true,
        error: undefined,
        onInputUsername: () => {},
        isShowing: false,
      }}
      forgottenPassword={{
        onSubmit: () => {},
        onToggle: () => {},
        success: undefined,
        isShowing: false,
      }}
    />
  );

  const emailInput = signin.getByLabelText("Email") as HTMLInputElement;
  const passwordInput = signin.getByLabelText("Password") as HTMLInputElement;

  fireEvent.change(emailInput, { target: { value: "fake@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "password1!" } });

  expect(emailInput.value).toBe("fake@gmail.com");
  expect(passwordInput.value).toBe("password1!");

  expect(signin).toMatchSnapshot();
});

test("SignIn inputs render error messages", () => {
  const signin = render(
    <SignIn
      onSubmit={() => {}}
      isLoading={false}
      onClose={() => {}}
      signin={{ error: undefined }}
      register={{
        isUsernameUnique: true,
        error: undefined,
        onInputUsername: () => {},
        isShowing: false,
      }}
      forgottenPassword={{
        onSubmit: () => {},
        onToggle: () => {},
        success: undefined,
        isShowing: false,
      }}
    />
  );

  const emailInput = signin.getByLabelText("Email") as HTMLInputElement;
  const passwordInput = signin.getByLabelText("Password") as HTMLInputElement;

  fireEvent.change(emailInput, { target: { value: "bad@email.x" } });
  fireEvent.change(passwordInput, { target: { value: "badPass" } });

  setTimeout(() => {
    const emailError = signin.getByDisplayValue(INVALID_EMAIL);
    const passwordError = signin.getByDisplayValue(INVALID_PASSWORD);

    expect(emailError).toBeInstanceOf(HTMLElement);
    expect(passwordError).toBeInstanceOf(HTMLElement);

    expect(signin).toMatchSnapshot();
  }, 600)
});

test("SignIn renders registration screen", () => {
  const signin = render(
    <SignIn
      onSubmit={() => {}}
      isLoading={false}
      onClose={() => {}}
      signin={{ error: undefined }}
      register={{
        isUsernameUnique: true,
        error: undefined,
        onInputUsername: () => {},
        isShowing: true,
      }}
      forgottenPassword={{
        onSubmit: () => {},
        onToggle: () => {},
        success: undefined,
        isShowing: false,
      }}
    />
  );

  expect(signin).toMatchSnapshot();
});

test("SignIn renders forgot password screen", () => {
  const signin = render(
    <SignIn
      onSubmit={() => {}}
      isLoading={false}
      onClose={() => {}}
      signin={{ error: undefined }}
      register={{
        isUsernameUnique: true,
        error: undefined,
        onInputUsername: () => {},
        isShowing: false,
      }}
      forgottenPassword={{
        onSubmit: () => {},
        onToggle: () => {},
        success: undefined,
        isShowing: true,
      }}
    />
  );

  expect(signin).toMatchSnapshot();
});

test("SignIn renders loading screen", () => {
  const signin = render(
    <SignIn
      onSubmit={() => {}}
      isLoading={true}
      onClose={() => {}}
      signin={{ error: undefined }}
      register={{
        isUsernameUnique: true,
        error: undefined,
        onInputUsername: () => {},
        isShowing: false,
      }}
      forgottenPassword={{
        onSubmit: () => {},
        onToggle: () => {},
        success: undefined,
        isShowing: false,
      }}
    />
  );

  expect(signin).toMatchSnapshot();
});
