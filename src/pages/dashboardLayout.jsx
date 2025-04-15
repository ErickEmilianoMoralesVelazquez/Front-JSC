import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import React from "react";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}
