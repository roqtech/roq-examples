import { createCustomTheme } from "@roq/ui-react";

export const roqThemeLight = createCustomTheme({
  name: "ROQ Custom Theme",
  base: {
    primary: "#207be5",
    secondary: "#1f2b48",
  },
  spacing: {
    borderRadius: "16px",
  },
  typography: {
    family: "'Lato', sans-serif",
  },
});
