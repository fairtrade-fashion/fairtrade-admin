import Login from "@/domain/auth/component/login";
import AuthLayout from "@/domain/auth/layout/auth.layout";
import Categories from "@/domain/categories";
import Dashboard from "@/domain/dashboard";
import Products from "@/domain/products";
import AppLayout from "@/layout/applayout";
import { Navigate, RouteObject } from "react-router-dom";

// const checkAuth = () => {
//   if (Cookies.get("access_token") === undefined) {
//     return false;
//   }
//   return true;
// };

// const requireAuth = async () => {
//   if (!checkAuth()) {
//     throw redirect("/auth/login");
//   }
//   return null;
// };

export default function appRouter(): RouteObject[] {
  return [
    {
      path: "/",
      element: <Navigate to="/auth/login" />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AppLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "category",
          element: <Categories />,
        },
        {
          path: "products",
          element: <Products />,
        },
      ],
    },
  ];
}
