import { createContext, useEffect, useState } from "react";
export const ThemesContext = createContext(null);

function ThemesProvider({ children }) {
  const [themes, setThemes] = useState(false);

  useEffect(() => {
    const mainHTML = document.getElementsByTagName("html")[0];

    if (themes && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      mainHTML.setAttribute("data-theme", "dark");
      mainHTML.setAttribute("class", "dark");
    } else {
      mainHTML.setAttribute("data-theme", "light");
      mainHTML.setAttribute("class", "light");
    }
  }, [themes]);

  return (
    <ThemesContext.Provider value={{ themes, setThemes }}>
      {children}
    </ThemesContext.Provider>
  );
}

export default ThemesProvider;
