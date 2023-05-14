import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";
import { ProfilePage } from "./pages/profilePage";
import { AddProduct } from "./pages/addProduct";
import { RegisterMerchant } from "./pages/merchant";
import { ProductID } from "./pages/productID";
import Verification, { verification } from "./pages/verificationPage";
import Admin from "./pages/admin";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegistrationForm /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/admin", element: <Admin /> },
  { path: "/addProduct", element: <AddProduct /> },
  { path: "/registerMerchant", element: <RegisterMerchant /> },
  { path: "/product/:id", element: <ProductID /> },
  { path: "/auth/verification/:token", element: <Verification /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
