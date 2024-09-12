import { useState } from "react";
import ColorsTab from "./colors";
import ProductTab from "./products";
import SizeTab from "./size";

export default function TabHeader() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    // update the state to tab2
    setActiveTab("tab3");
  };

  return (
    <div>
      {" "}
      <div className=" h-full mt-4">
        <ul className="flex  bg-white p-2 w-fit gap-4 rounded">
          <li
            onClick={handleTab1}
            className={`p-1 cursor-pointer capitalize px-4 ${
              activeTab === "tab1" ? "bg-black rounded text-white " : ""
            }`}
          >
            product
          </li>
          <li
            onClick={handleTab2}
            className={`p-1 cursor-pointer capitalize px-4 ${
              activeTab === "tab2" ? "bg-black rounded text-white" : ""
            }`}
          >
            colors
          </li>

          <li
            onClick={handleTab3}
            className={`p-1 cursor-pointer capitalize px-4 ${
              activeTab === "tab3" ? "bg-black rounded text-white" : ""
            }`}
          >
            size
          </li>
        </ul>
      </div>
      <div className="h-full mt-6">
        {activeTab === "tab1" ? (
          <ProductTab />
        ) : activeTab === "tab2" ? (
          <ColorsTab />
        ) : (
          <SizeTab />
        )}
      </div>
    </div>
  );
}
