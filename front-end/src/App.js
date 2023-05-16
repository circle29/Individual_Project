import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";
import { ProfilePage } from "./pages/profilePage";
import Verification, { verification } from "./pages/verificationPage";
import { PostList } from "./pages/postList";
import { PostDetail } from "./pages/postDetail";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <PostList />,
    errorElement: <ErrorPage />,
  },
  { path: "/", element: <LoginForm /> },
  { path: "/register", element: <RegistrationForm /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/auth/verification/:token", element: <Verification /> },
  { path: "/post/:id", element: <PostDetail /> },
  { path: "/post", element: <PostList /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
