import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import DashboardLayout from "./pages/dashboardLayout";
import OrdersTable from "./components/ordersTable";
import Quotes from "./components/quotesTable";
import InvoicesTable from "./components/invoicesTable";
import PaymentsTable from "./components/paymentsTable";

import DashboardLayoutGasera from "./pages/dashboardLayoutGasera";
import OrdersGaseraTable from "./components/ordersGaseraTable";
import QuotesGaseraTable from "./components/quotesGaseraTable";

import MyLogin from "./pages/login";
import React from "react";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<MyLogin />} />

        {/* Privado con layout de dashboard */}
        <Route path="/dashboard/superadmin" element={<DashboardLayout />}>
          <Route index element={<OrdersTable />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="invoices" element={<InvoicesTable />} />
          <Route path="payments" element={<PaymentsTable />} />
        </Route>

        {/* Privado con layout de dashboard gasera */}
        <Route path="/dashboard/gasera" element={<DashboardLayoutGasera />}>
          <Route index path="orders" element={<OrdersGaseraTable />} />
          <Route path="quotes" element={<QuotesGaseraTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
