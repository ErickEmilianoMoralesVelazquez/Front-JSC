import Sidebar from '../components/sidebar';
import DashboardCards from '../components/dashboardCards';
import OrdersTable from '../components/ordersTable';
import React from 'react';


export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <DashboardCards />
        <OrdersTable />
      </main>
    </div>
  );
}
