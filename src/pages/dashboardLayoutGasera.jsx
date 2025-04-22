import SidebarGasera from "../components/sidebarGasera";
import { Outlet } from "react-router-dom";
import React from "react";

export default function DashboardLayout() {
  return (
    <div className="flex w-full overflow-x-hidden">
      <SidebarGasera />
      <main className="flex-1 bg-gray-100 min-h-screen px-4 py-6 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
