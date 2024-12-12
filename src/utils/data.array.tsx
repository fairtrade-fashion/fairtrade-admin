import {
  AiFillAppstore,
  AiFillProduct,
  AiOutlineAppstore,
} from "react-icons/ai";
import { RiLuggageCartFill, RiLuggageCartLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { FaClipboardList, FaUser } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoGolfSharp } from "react-icons/io5";

export const routes = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: <AiFillAppstore className="h-6 w-6" />,
    icon2: <AiOutlineAppstore className="h-6 w-6" />,
  },
  {
    path: "/admin/category",
    label: "Category",
    icon: <HiClipboardDocumentList className="h-6 w-6" />,
    icon2: <HiOutlineClipboardDocumentList className="h-6 w-6" />,
  },
  {
    path: "/admin/products",
    label: "Products",
    icon: <RiLuggageCartFill className="h-6 w-6" />,
    icon2: <RiLuggageCartLine className="h-6 w-6" />,
  },
  {
    path: "/admin/orders",
    label: "Orders",
    icon: <IoGolfSharp className="h-6 w-6" />,
    icon2: <IoGolfSharp className="h-6 w-6" />,
  },
  {
    path: "/admin/admin",
    label: "Admin",
    icon: <FaUser className="h-6 w-6" />,
    icon2: <FaUser className="h-6 w-6" />,
  },
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
