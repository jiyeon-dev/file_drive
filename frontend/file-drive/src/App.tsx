import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BaseLayout from "./layout/Base";
import AuthLayout from "./layout/Auth";
import SignInPage from "./page/SignIn";
import SignUpPage from "./page/SignUp";
import MainPage from "./page/Main";
import FilesPage, { loader as filesLoader } from "./page/Files";
import TrashPage, { loader as trashLoader } from "./page/Trash";
import FavoritesPage, { loader as favoriteLoader } from "./page/Favorites";

const queryClient = new QueryClient();

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
        loader: filesLoader,
      },
      {
        path: "trash",
        element: <TrashPage />,
        loader: trashLoader,
      },
      {
        path: "favorites",
        element: <FavoritesPage />,
        loader: favoriteLoader,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
