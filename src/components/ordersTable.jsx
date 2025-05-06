import React from "react";
import DataTable from "react-data-table-component"; // ✅ Importación necesaria
import DashboardCards from "./dashboardCards";

export default function OrdersTable() {
  const orders = [
    {
      id: "#12345",
      cliente: "Gasera del Norte",
      fecha: "10/04/2023",
      total: "$12,450.00",
      estatus: "Completado",
      color: "green",
    },
    {
      id: "#12344",
      cliente: "Gasolinera Sureste",
      fecha: "09/04/2023",
      total: "$8,720.00",
      estatus: "En proceso",
      color: "yellow",
    },
    {
      id: "#12343",
      cliente: "Distribuidora Central",
      fecha: "08/04/2023",
      total: "$15,300.00",
      estatus: "Atrasado",
      color: "red",
    },
  ];

  const badgeColor = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <>
      <DashboardCards />
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6">Revisión de pedidos</h2>

        <input
          type="text"
          placeholder="Buscar pedido..."
          className="mb-4 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <DataTable
          columns={[
            {
              name: "ID Pedido",
              selector: (row) => row.id,
              sortable: true,
            },
            {
              name: "Cliente",
              selector: (row) => row.cliente,
              sortable: true,
            },
            {
              name: "Fecha",
              selector: (row) => row.fecha,
            },
            {
              name: "Total",
              selector: (row) => row.total,
            },
            {
              name: "Estatus",
              cell: (row) => (
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    badgeColor[row.color]
                  }`}
                >
                  {row.estatus}
                </span>
              ),
            },
          ]}
          data={orders}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: "Filas por página",
            rangeSeparatorText: "de",
          }}
          highlightOnHover
          responsive
          striped
        />
      </div>
    </>
  );
}
