import { cn } from "@/lib/utils";
import { routes } from "@/utils/data.array";
import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/fairlogo.svg";

export default function AppSideBar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className={`bg-black hidden h-full transition-all duration-700 ease-in-out lg:flex flex-col relative ${
        isExpanded ? "w-[250px]" : "w-[50px]"
      }`}
    >
      <div className="h-40 w-full flex justify-center">
        <img
          src={logo}
          alt="fair-trade logo"
          className={`w-40 transition-all duration-700 ease-in-out overflow-hidden ${
            isExpanded ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0 "
          }`}
        />
      </div>

      <div>
        {routes.map(({ path, label, icon, icon2 }) => (
          <Link
            to={path}
            key={path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-lg hover:border-white hover:border-l-4 ease-in-out hover:bg-black/10 text-white transition-all cursor-pointer",
              {
                "bg-muted text-white bg-black/30 border-white border-l-4 backdrop-filter backdrop-blur-sm bg-opacity-30 shadow-3xl ":
                  path === location.pathname,
              }
            )}
          >
            <div>{path === location.pathname ? icon : icon2}</div>
            <p
              className={`transition-all duration-700 ease-in-out overflow-hidden ${
                isExpanded ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              {label}
            </p>
          </Link>
        ))}
      </div>
      <button
        onClick={toggleSidebar}
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        className="p-2 m-2 bg-white rounded-md hover:bg-gray-200 self-end absolute bottom-0"
      >
        {isExpanded ? "<<" : ">>"}
      </button>
    </div>
  );
}
