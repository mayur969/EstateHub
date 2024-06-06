import HomePage from "./routes/homePage/homePage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import Layout from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader } from "./lib/loaders.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        {
          path: "/profile",
          element: <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProtectedRoute>
            <ProfileUpdatePage />
          </ProtectedRoute>,
        },
        {
          path: "/add",
          element: <ProtectedRoute>
            <NewPostPage />
          </ProtectedRoute>
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        }
      ]
    }
  ]);

  return (

    <RouterProvider router={router} />
  );
}

export default App;
