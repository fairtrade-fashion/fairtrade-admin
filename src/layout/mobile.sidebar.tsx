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
import { Link, useLocation} from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/fairlogo.svg";
import { routes } from "@/utils/data.array";
// import { LogOutIcon } from "lucide-react";
// import { useState } from "react";
// import { createPortal } from "react-dom";
// import DemoModal from "@/components/demo-modal";
// import { IoMdClose } from "react-icons/io";
// import { Button } from "@/components/button";
// import { toast } from "sonner";

export default function MobileSidebar() {
  const location = useLocation();
  // const [isLogoutModal, setIsLogoutModal] = useState(false);

  // const openModal = () => {
  //   setIsLogoutModal(true);
  // };

  // const closeModal = () => {
  //   setIsLogoutModal(false);
  // };

  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     localStorage.removeItem("userItem"); // Clear user data
  //     setIsLogoutModal(false);
  //     toast.success("Logout Successful");
  //     navigate("/");
  //   } catch (err) {
  //     toast.error("Logout Failed");
  //   }
  // };

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
          <div>
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
          </div>
          {/* <button className="p-2" onClick={openModal}>
            <p className="flex items-center text-white gap-2">
              <span>
                <LogOutIcon />
              </span>
              <span>Logout</span>
            </p>
          </button> */}
        </nav>

        {/* {isLogoutModal &&
          createPortal(
            <DemoModal isOpen={openModal}>
              <div className="mx-auto flex max-w-[500px] flex-col gap-4 rounded-xl bg-white p-4 text-xs lg:gap-8 lg:p-8 lg:text-sm">
                <div className="mb-2 flex items-center justify-between lg:flex-row">
                  <p className="text-base font-bold capitalize lg:text-[24px] ">
                    {" "}
                  </p>

                  <button onClick={closeModal} className="text-brown-500">
                    <IoMdClose />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-4 justify-center text-center">
                  <p className="font-bold text-2xl">LOGOUT</p>
                  <p className="text-lg">Are you sure you want to logout?</p>
                </div>

                <div className="mt-8 w-full h-full flex items-center justify-center gap-5">
                  <Button
                    onClick={handleLogout}
                    className="text-lg border border-gray-300 text-white rounded-lg bg-green-500 hover:bg-green-700"
                  >
                    Logout
                  </Button>
                  <Button
                    className="text-lg border border-gray-300 rounded-lg"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DemoModal>,
            document.body
          )} */}
      </SheetContent>
    </Sheet>
  );
}
