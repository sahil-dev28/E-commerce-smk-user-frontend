import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import MainLayout from "./products/layout/MainLayout.tsx";
import ProductList from "./components/product/ProductList.tsx";
import ProductPage from "./components/product/id/ProductPage.tsx";
import RedirectUser from "./products/layout/RedirectUser.tsx";
import AuthLayout from "./products/layout/AuthLayout.tsx";
import UserRegister from "./auth/user/register/Register.tsx";
import SignUpSuccessPage from "./auth/user/sign-up-success/SIgn-Up-Success.tsx";
import Login from "./auth/user/login/Login.tsx";
import VerifyEmail from "./auth/user/verifyEmail/VerifyEmail.tsx";
import ProfileOverview from "./profile/ProfileOverview.tsx";
import WishListedProductList from "./components/product/wishlist/WishListedProduct.tsx";
import CartProductList from "./components/product/cart/CartProductList.tsx";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: (
      <RedirectUser isAuth={false}>
        <MainLayout />
      </RedirectUser>
    ),
    children: [
      {
        path: "/",
        element: <ProductList search="" />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/wishlist",
        element: <WishListedProductList />,
      },
      {
        path: "/profile",
        element: <ProfileOverview />,
      },
      {
        path: "/product/cart",
        element: <CartProductList />,
      },
    ],
  },
  {
    element: (
      <RedirectUser isAuth>
        <AuthLayout />
      </RedirectUser>
    ),
    children: [
      {
        path: "/auth/register",
        element: <UserRegister />,
      },
      {
        path: "/auth/sign-up-success",
        element: <SignUpSuccessPage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "auth/verify",
        element: <VerifyEmail />,
      },
      {
        path: "/",
        element: <ProductList search="" />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>,
);
