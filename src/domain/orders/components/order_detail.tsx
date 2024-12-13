import { useGetOrderByIdQuery, useOrderStatusMutation } from "../api/order.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ProductDetailsSkeleton } from "@/domain/products/components/products/components/view_product";
import { toast } from "sonner";
import useErrorHandler from "@/domain/categories/hooks/handle_submit.hooks";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery({
    id: id || "",
  });

  const [updateOrderStatus] = useOrderStatusMutation();
  const [newStatus, setNewStatus] = useState("");
  const handleError = useErrorHandler();

  const handleStatusChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newStatus || !id) return;

    console.log("New status:", newStatus);
    console.log("id:", id);

    try {
      await updateOrderStatus({ orderId: id, status: newStatus }).unwrap();
      toast.success("Order status updated successfully!");
      navigate(0); // Reload the page to reflect updated data
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }
  if (isError)
    return (
      <div className="p-4 text-center text-red-500">
        Error loading order details
      </div>
    );
  if (!order) return <div className="p-4 text-center">Order not found</div>;

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={() => navigate("/admin/orders")}
        className="mb-4"
      >
        Back to Orders
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Order Details - #{order.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-bold mb-2">Order Information</h3>
              <div className="space-y-2">
                <p>
                  Status: <span className="font-medium">{order.status}</span>
                </p>
                <p>
                  Total: <span className="font-medium">₦{order.total}</span>
                </p>
                <p>
                  Payment Reference:{" "}
                  <span className="font-medium">{order.paymentReference}</span>
                </p>
                <p>
                  Date:{" "}
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold mb-2">Customer Information</h3>
              <div className="space-y-2">
                <p>
                  Name: <span className="font-medium">{order.user.name}</span>
                </p>
                <p>
                  Email: <span className="font-medium">{order.user.email}</span>
                </p>
              </div>

              <form className="space-y-2" onSubmit={handleStatusChange}>
                <p>Change order status to: </p>
                <div className="flex flex-col lg:flex-row gap-4 w-full items-center">
                  <select
                    className="border border-gray-300 rounded p-2 w-full"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="PAID">Paid</option>
                    <option value="PROCESSING">Processing</option>
                  </select>
                  <Button
                    className="outline bg-gray-700 hover:bg-gray-600 w-full"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border text-left">Product</th>
                    <th className="p-2 border text-left">Price</th>
                    <th className="p-2 border text-left">Quantity</th>
                    <th className="p-2 border text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-2 border">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.product.sku}
                          </p>
                        </div>
                      </td>
                      <td className="p-2 border">₦{item.price}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">
                        ₦{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="p-2 border text-right font-bold">
                      Total:
                    </td>
                    <td className="p-2 border font-bold">₦{order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
