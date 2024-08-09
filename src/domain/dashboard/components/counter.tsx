import { counterData } from "@/utils/data.array";

export default function Counter() {
  return (
    <main className="w-full h-full">
      <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-5">
        {counterData.map((items, i) => (
          <div key={i} className="bg-white rounded p-4 drop-shadow">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold capitalize text-gray-700">
                {items.title}
              </h2>
              <p className={`${items.color} ${items.background} p-2 rounded`}>
                {items.icon}
              </p>
            </div>
            <p>{items.count.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
