import { useTopSellingProductsQuery } from "../api/analytics.api";

const TopSellingProductsTable = () => {
  // Use the query hook to fetch data
  const { data, error, isLoading } = useTopSellingProductsQuery({ limit: 10 });

  if (isLoading) return <SkeletonLoader />;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="overflow-x-auto">
      <div className="lg:text-xl text-lg font-bold mb-4">
        Top Selling Products
      </div>
      <table className=" w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
            <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index: number) => (
            <tr
              key={item.productId}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 text-center px-4 py-2">
                {item.product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {item._sum.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                ₦{item._sum.price.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingProductsTable;

export const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Product Name</th>
            <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
            <th className="border border-gray-300 px-4 py-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <div className="h-4 bg-gray-300 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
