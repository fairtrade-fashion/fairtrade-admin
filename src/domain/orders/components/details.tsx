import { useGetOrderByIdQuery } from "../api/order.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { useNavigate, useParams } from "react-router-dom";

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

  if (isLoading)
    return <div className="p-4 text-center">Loading order details...</div>;
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
        onClick={() => navigate("/orders")}
        className="mb-4"
      >
        Back to Orders
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Order Details - #{order.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
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
            <div>
              <h3 className="font-bold mb-2">Customer Information</h3>
              <div className="space-y-2">
                <p>
                  Name: <span className="font-medium">{order.user.name}</span>
                </p>
                <p>
                  Email: <span className="font-medium">{order.user.email}</span>
                </p>
              </div>
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
                      <td className="p-2 border">${item.price}</td>
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
