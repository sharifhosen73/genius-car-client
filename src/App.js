import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Routes/Routes";

function App() {
  return (
    <div className="max-w-5xl mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
