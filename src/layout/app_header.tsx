import { useLocation } from "react-router-dom";
import MobileSidebar from "./mobile.sidebar";

export default function AppHeader() {
  const location = useLocation();
  return (
    <header className=" h-fit  flex items-center bg-slate-100 w-full fixed">
      <nav className=" flex flex-col lg:flex-row gap-2 lg:items-center p-4  w-full justify-between">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-xl  uppercase text-slate-900">
            {location.pathname.includes("dashboard")
              ? "Dashboard"
              : location.pathname.includes("products")
              ? "Products"
              : location.pathname.includes("states")
              ? "States"
              : location.pathname.includes("revenue")
              ? "Revenue Assurance"
              : null}
          </h1>
          <MobileSidebar />
        </div>
      </nav>
    </header>
  );
}
