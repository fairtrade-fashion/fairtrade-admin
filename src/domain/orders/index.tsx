import { Outlet } from "react-router-dom";
import OrdersTable from "./components/order_table";

export default function OrdersView() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
