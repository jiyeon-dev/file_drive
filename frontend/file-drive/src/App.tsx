import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "./layout/Base";
import AuthLayout from "./layout/Auth";
import SignInPage from "./page/SignIn";
import MainPage from "./page/Main";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignInPage />,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
