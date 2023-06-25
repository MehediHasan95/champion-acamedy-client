import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
