import { AiFillAppstore, AiOutlineAppstore } from "react-icons/ai";
import { RiLuggageCartFill, RiLuggageCartLine } from "react-icons/ri";

export const routes = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: <AiFillAppstore className="h-6 w-6" />,
    icon2: <AiOutlineAppstore className="h-6 w-6" />,
  },
  {
    path: "/admin/products",
    label: "Products",
    icon: <RiLuggageCartFill className="h-6 w-6" />,
    icon2: <RiLuggageCartLine className="h-6 w-6" />,
  },
  //   {
  //     path: "/in-country/states",
  //     label: "States",
  //     icon: <IoGolfSharp className="h-6 w-6" />,
  //   },
  //   {
  //     path: "/in-country/revenue",
  //     label: "Revenue Assurance",
  //     icon: <FaSackDollar className="h-6 w-6" />,
  //   },
];
