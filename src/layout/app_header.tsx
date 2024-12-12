import { useLocation } from "react-router-dom";
import MobileSidebar from "./mobile.sidebar";

export default function AppHeader() {
  const location = useLocation();
  return (
    <header className="h-fit flex items-center bg-white w-full fixed py-3 z-30">
      <nav className=" flex flex-col lg:flex-row gap-2 lg:items-center p-4  w-full justify-between">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-2xl  uppercase text-slate-900">
            {location.pathname.includes("dashboard")
              ? "Dashboard"
              : location.pathname.includes("products")
              ? "Products"
              : location.pathname.includes("category")
              ? "Category"
              : location.pathname.includes("orders")
              ? "Orders"
              : location.pathname.includes("admin")
              ? "Admin"
              : null}
          </h1>
          <MobileSidebar />
        </div>
      </nav>
    </header>
  );
}
