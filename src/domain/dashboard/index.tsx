import Analytics from "./components/analytics";
import Counter from "./components/counter";
import TopCartProduct from "./components/top.cat";

export default function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-5">
      <Counter />

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div className="lg:col-span-2">
          <Analytics />
        </div>

        <div className="lg:col-span-1">
          <TopCartProduct />
        </div>
      </div>
    </div>
  );
}
