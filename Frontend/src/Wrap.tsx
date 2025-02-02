import App from "./App.tsx";
import Total from "./Total.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import Watch from "./Watch.tsx";
import UserContextProvider from "./UserContextProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
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
  {path:'/watch',element:<Watch/>}
]);
function Wrap(){
    return (
        <UserContextProvider>
        <RouterProvider router={router}></RouterProvider>
        </UserContextProvider>
    );
}

export default Wrap;

