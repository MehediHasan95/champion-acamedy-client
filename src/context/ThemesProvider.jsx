import { createContext, useState } from "react";

export const ThemesContext = createContext(null);
function ThemesProvider({ children }) {
  const [themes, setThemes] = useState("light");

  const dest = { themes, setThemes };
  return (
    <ThemesContext.Provider value={dest}>{children}</ThemesContext.Provider>
  );
}

export default ThemesProvider;
