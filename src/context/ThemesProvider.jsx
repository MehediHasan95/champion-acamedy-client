import { createContext, useEffect, useState } from "react";
export const ThemesContext = createContext(null);

function ThemesProvider({ children }) {
  const [themeChange, setThemeChange] = useState(false);

  useEffect(() => {
    const mainHTML = document.getElementsByTagName("html")[0];
    if (
      themeChange &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      mainHTML.setAttribute("data-theme", "dark");
      mainHTML.setAttribute("class", "dark");
    } else {
      mainHTML.setAttribute("data-theme", "light");
      mainHTML.setAttribute("class", "light");
    }
  }, [themeChange]);

  return (
    <ThemesContext.Provider value={{ themeChange, setThemeChange }}>
      {children}
    </ThemesContext.Provider>
  );
}

export default ThemesProvider;
