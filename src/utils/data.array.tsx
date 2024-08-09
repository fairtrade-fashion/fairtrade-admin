import {
  AiFillAppstore,
  AiFillProduct,
  AiOutlineAppstore,
} from "react-icons/ai";
import { RiLuggageCartFill, RiLuggageCartLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

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

export const counterData = [
  {
    title: "total sales",
    icon: <GiReceiveMoney size={30} />,
    count: 20000,
    color: "text-green-500",
    background: "bg-green-100",
  },
  {
    title: "total order",
    icon: <FaClipboardList size={30} />,
    count: 20000,
    color: "text-blue-500",
    background: "bg-blue-100",
  },
  {
    title: "total customers",
    icon: <ImUsers size={30} />,
    count: 20000,
    color: "text-orange-500",
    background: "bg-orange-100",
  },
  {
    title: "total products",
    icon: <AiFillProduct size={30} />,
    count: 20000,
    color: "text-[#B91372]",
    background: "bg-[#B91372]/10",
  },
];
