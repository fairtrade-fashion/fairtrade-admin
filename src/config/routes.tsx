import Login from "@/domain/auth/component/login";
import AuthLayout from "@/domain/auth/layout/auth.layout";
import Categories from "@/domain/categories";
import Dashboard from "@/domain/dashboard";
import OrdersView from "@/domain/orders";
import OrderDetail from "@/domain/orders/components/order_detail";
import OrderModuleView from "@/domain/orders/components/order_view";
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
        {
          path: "orders",
          element: <OrdersView />,
          children: [
            { path: "", element: <OrderModuleView /> },
            { path: "order-detail/:id", element: <OrderDetail /> },
          ],
        },
      ],
    },
  ];
}
