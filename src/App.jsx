import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import DashboardLayout from "./pages/dashboardLayout";
import OrdersTable from "./components/ordersTable";
import Quotes from "./components/quotesTable";
import InvoicesTable from "./components/invoicesTable";
import PaymentsTable from "./components/paymentsTable";
import React from "react";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Público */}
        <Route path="/" element={<Landing />} />

        {/* Privado con layout de dashboard */}
        <Route path="/dashboard/superadmin" element={<DashboardLayout />}>
          <Route index element={<OrdersTable />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="invoices" element={<InvoicesTable />} />
          <Route path="payments" element={<PaymentsTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
