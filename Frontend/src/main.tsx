import { createRoot } from "react-dom/client";
import "./index.css";
import Watch from "./Watch";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import App from "./App.tsx";
import Total from "./Total.tsx";
import Landing from "./Landing.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/Netflix",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  { path: "/home", element: <Total /> },
  { path: "/watch", element: <Watch /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);
