import { useTheme } from "@emotion/react";
import { render } from "../test-utils/test-util";

test("AppThemeProvider provides themeType to children", () => {

  const ReturnsThemeType = () => {
    const theme = useTheme();
    return <input title="1" value={theme.name} readOnly={true} />;
  }

  const themeComponent = render(<ReturnsThemeType />)
  const input = themeComponent.getByTitle("1") as HTMLInputElement;

  // Default theme is 'DARK' in testing env
  expect(input.value).toBe("DARK");
})