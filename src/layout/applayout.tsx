import { Outlet, Navigate } from "react-router-dom";
import AppHeader from "./app_header";
import AppSideBar from "./app_sidebar";
import { fetchToken } from "@/config/token";

export default function AppLayout() {
  // Add a function to check if the user is authenticated
  const isAuthenticated = () => {
    // Implement your authentication check here
    // For example, check if a token exists in localStorage
    return fetchToken("access_token") !== null;
  };

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  // If authenticated, render the layout
  return (
    <div className="w-full min-h-screen bg-gray-100 flex">
      <aside className="h-full">
        <AppSideBar />
      </aside>

      <main className="w-full">
        <div>
          <AppHeader />
        </div>

        <div className="mt-[100px] p-4 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
