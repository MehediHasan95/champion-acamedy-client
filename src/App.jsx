import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
