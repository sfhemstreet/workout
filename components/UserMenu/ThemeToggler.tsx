import React from "react";

import { ThemeType } from "../../types";
import { Toggler } from "../Toggler";

type ThemeTogglerProps = {
  currentTheme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeToggler = ({
  currentTheme,
  toggleTheme,
}: ThemeTogglerProps) => (
  <Toggler
    title="Theme"
    onToggle={toggleTheme}
    isOn={currentTheme !== "LIGHT"}
    onLabel="Dark"
    offLabel="Light"
    ariaLabel={`Change color theme from ${currentTheme.toLowerCase()} to ${(currentTheme ===
    "LIGHT"
      ? "DARK"
      : "LIGHT"
    ).toLowerCase()}.`}
  />
);
