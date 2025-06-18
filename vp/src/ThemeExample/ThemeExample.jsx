import React, { useState } from "react";
import useTheme from "./useTheme";
export default function ThemeExample() {
  const [dark, toggleTheme] = useTheme();
  return (
    <button onClick={toggleTheme}>
      Toggle to {dark ? "Light" : "Dark"} Mode
    </button>
  );
}
