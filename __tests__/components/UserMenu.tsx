import { UserMenu } from "../../components/UserMenu";
import { render } from "../test-utils/test-util";

test("UserMenu renders", () => {
  const userMenu = render(
    <UserMenu 
      isOpen={true} 
      isSoundOn={true} 
      themeType={"DARK"} 
      actions={{
        signIn: () => {},
        signOut: () => {},
        toggleTheme: () => {},
        toggleSideBar: () => {},
        toggleSound: () => {},
        toggleSettings: () => {}
      }} 
      user={{
        id: "1",
        name: "Test",
        avatar: "",
        isAuthenticated: false,
        error: "",
        isLoading: false,
        workoutsCompleted: []
      }}
    />
  );

  expect(userMenu).toMatchSnapshot();
});
