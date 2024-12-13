import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { OrderRoot } from "../model/order.model";
import { Button } from "@/components/button";
import { useState } from "react";
import { useGetOrderQuery } from "../api/order.api";
import { IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { SkeletonLoader } from "@/domain/dashboard/components/product-table";

const OrdersTable: React.FC = () => {
  const [page, setPage] = useState(0);
  const [take] = useState(10);
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    isError,
  } = useGetOrderQuery({
    skip: page * take,
    take,
  });

  if (isLoading) return <SkeletonLoader />;
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">Error loading orders</div>
    );

  const handleViewOrder = (orderId: string) => {
    navigate(`/admin/orders/order-detail/${orderId}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto text-xs lg:text-base">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border text-left">User Name</th>
                <th className="p-2 border text-left">Order ID</th>
                <th className="p-2 border text-left">Status</th>
                <th className="p-2 border text-left">Payment Ref</th>
                <th className="p-2 border text-left">Street Address</th>
                <th className="p-2 border text-left">State</th>
                <th className="p-2 border text-left">Created At</th>
                <th className="p-2 border text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order: OrderRoot) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="p-2 border truncate">
                      {order.shippingAddress?.fullName || "N/A"}
                    </td>
                    <td className="p-2 border truncate">{order.id}</td>
                    <td className="p-2 border truncate">{order.status}</td>
                    <td className="p-2 border truncate">
                      {order.paymentReference}
                    </td>
                    <td className="p-2 border truncate">
                      {order.shippingAddress?.streetAddress || "N/A"}
                    </td>
                    <td className="p-2 border truncate">
                      {order.shippingAddress?.state || "N/A"}
                    </td>
                    <td className="p-2 border truncate">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td
                      onClick={() => handleViewOrder(order.id)}
                      className="p-2 bg-green-100 border flex items-center justify-center cursor-pointer gap-2"
                    >
                      <span>View Order</span>
                      <span>
                        <IoEye />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            variant="outline"
          >
            Previous
          </Button>
          <span>Page {page + 1}</span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={!orders || orders.length < take}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default OrdersTable;
