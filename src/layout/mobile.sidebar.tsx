// import { Button } from "@/components/general/common/Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/fairlogo.svg";
import { routes } from "@/utils/data.array";

export default function MobileSidebar() {
  const location = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="shrink-0 lg:hidden">
          <IoMenuSharp className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="flex bg-black text-white flex-col">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center w-full justify-center">
              <img src={logo} alt="" className="scale-75" />
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="grid gap-3   text-lg font-medium">
          {routes.map(({ path, icon, label, icon2 }) => {
            return (
              <SheetClose asChild key={path}>
                <Link
                  to={path}
                  className={cn(
                    "flex items-center gap-3 px-1 py-3 text-sm hover:border-white hover:border-l-4 ease-in-out hover:bg-black/10 cursor-pointer text-white transition-all ",
                    {
                      "bg-muted text-primary bg-white text-white border-white border-l-4 backdrop-filter backdrop-blur-sm bg-opacity-30 shadow-3xl ":
                        path === location.pathname,
                    }
                  )}
                >
                  <div>{path === location.pathname ? icon : icon2}</div>
                  <p
                    className={`transition-all duration-700 ease-in-out overflow-hidden`}
                  >
                    {label}
                  </p>
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
