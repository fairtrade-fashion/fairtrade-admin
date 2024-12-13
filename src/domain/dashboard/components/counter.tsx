// import { counterData } from "@/utils/data.array";
import {
  useTotalCustomersQuery,
  useTotalOrdersQuery,
  useTotalProductsQuery,
  useTotalSalesQuery,
} from "../api/analytics.api";
import { GiReceiveMoney } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { AiFillProduct } from "react-icons/ai";

export default function Counter() {
  const { data: totalSales } = useTotalSalesQuery();
  const { data: totalOrder } = useTotalOrdersQuery();
  const { data: totalCustomers } = useTotalCustomersQuery();
  const { data: totalProducts } = useTotalProductsQuery();
  return (
    <main className="w-full h-full">
      <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-5">
        <div className="bg-white rounded p-4 drop-shadow">
          <div className="flex justify-between items-center">
            <h2 className="lg:text-lg font-bold capitalize text-gray-700">
              Total Sales
            </h2>
            <p className={`text-green-500`}>
              <GiReceiveMoney size={20} />
            </p>
          </div>
          <p> {totalSales?.total_sales}</p>
        </div>
        <div className="bg-white rounded p-4 drop-shadow">
          <div className="flex justify-between items-center">
            <h2 className="lg:text-lg font-bold capitalize text-gray-700">
              Total Order
            </h2>
            <p className={`text-purple-500`}>
              <FaClipboardList size={20} />
            </p>
          </div>
          {/* <p> {totalOrder?.total_order}</p> */}
          <p>{totalOrder?.total_orders}</p>
        </div>
        <div className="bg-white rounded p-4 drop-shadow">
          <div className="flex justify-between items-center">
            <h2 className="lg:text-lg font-bold capitalize text-gray-700">
              Total Customers
            </h2>
            <p className={`text-blue-500`}>
              <ImUsers size={20} />
            </p>
          </div>
          <p> {totalCustomers?.total_customers}</p>
        </div>
        <div className="bg-white rounded p-4 drop-shadow">
          <div className="flex justify-between items-center">
            <h2 className="lg:text-lg font-bold capitalize text-gray-700">
              Total Products
            </h2>
            <p className={`text-red-500`}>
              <AiFillProduct size={20} />
            </p>
          </div>
          <p> {totalProducts?.total_products}</p>
        </div>
      </div>
    </main>
  );
}
