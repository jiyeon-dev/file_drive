import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./layout/Base";
import AuthLayout from "./layout/Auth";
import SignInPage from "./page/SignIn";
import SignUpPage from "./page/SignUp";
import MainPage from "./page/Main";
import FilesPage from "./page/Files";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "signIn",
        element: <SignInPage />,
      },
      {
        path: "signUp",
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "files",
        element: <FilesPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
