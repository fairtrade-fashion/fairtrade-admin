import { Outlet } from "react-router-dom";
import back from "../../../assets/background-auth.svg";

export default function AuthLayout() {
  return (
    <div className="w-screen h-screen lg:grid grid-cols-3 bg-white">
      <div className="col-span-2 h-full w-full flex items-center justify-center">
        <Outlet />
      </div>
      <div
        style={{ backgroundImage: `url(${back})` }}
        className={`bg-center bg-cover bg-no-repeat bg-[url('../../../assets/background-auth.png')]`}
      ></div>
    </div>
  );
}
