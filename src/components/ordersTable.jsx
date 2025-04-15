import React from "react";
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

        {/* Vista de tabla para pantallas medianas en adelante */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full border-separate border-spacing-y-2 text-sm text-gray-700">
            <thead className="text-xs uppercase text-gray-500">
              <tr>
                <th className="text-left px-4 py-2">ID PEDIDO</th>
                <th className="text-left px-4 py-2">CLIENTE</th>
                <th className="text-left px-4 py-2">FECHA</th>
                <th className="text-left px-4 py-2">TOTAL</th>
                <th className="text-left px-4 py-2">ESTATUS</th>
                <th className="text-left px-4 py-2">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr
                  key={idx}
                  className="bg-gray-50 hover:bg-gray-100 transition rounded-lg"
                >
                  <td className="px-4 py-3 font-medium">{order.id}</td>
                  <td className="px-4 py-3">{order.cliente}</td>
                  <td className="px-4 py-3">{order.fecha}</td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[order.color]}`}
                    >
                      {order.estatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-red-600 hover:underline mr-3">
                      Detalles
                    </button>
                    <button className="text-gray-400 hover:underline">
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista móvil como tarjetas */}
        <div className="md:hidden space-y-4">
          {orders.map((order, idx) => (
            <div
              key={idx}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="text-sm font-medium">
                <strong>ID:</strong> {order.id}
              </p>
              <p className="text-sm">
                <strong>Cliente:</strong> {order.cliente}
              </p>
              <p className="text-sm">
                <strong>Fecha:</strong> {order.fecha}
              </p>
              <p className="text-sm">
                <strong>Total:</strong> {order.total}
              </p>
              <p className="text-sm mb-2">
                <strong>Estatus:</strong>{" "}
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[order.color]}`}
                >
                  {order.estatus}
                </span>
              </p>
              <div className="flex justify-start gap-3">
                <button className="text-red-600 text-sm underline">
                  Detalles
                </button>
                <button className="text-gray-400 text-sm underline">
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-6 flex justify-end space-x-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              className={`w-9 h-9 border rounded-md ${
                n === 2
                  ? "bg-red-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
