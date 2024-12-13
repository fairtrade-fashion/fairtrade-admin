import Counter from "./components/counter";
import TopSellingProductsTable from "./components/product-table";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Counter />

      <div className="lg:col-span-2">
        <TopSellingProductsTable />
      </div>
    </div>
  );
}
