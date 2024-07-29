import { Outlet } from "react-router-dom";
import AppHeader from "./app_header";
import AppSideBar from "./app_sidebar";

export default function AppLayout() {
  return (
    <div className="w-screen h-screen flex">
      <aside className="h-full">
        <AppSideBar />
      </aside>

      <main>
        <div>
          <AppHeader />
        </div>

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
