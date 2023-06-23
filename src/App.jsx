import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import "./App.css";
import { useContext } from "react";
import { ThemesContext } from "./context/ThemesProvider";

function App() {
  const { themes } = useContext(ThemesContext);
  console.log(themes);
  return (
    <div data-theme={themes}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
