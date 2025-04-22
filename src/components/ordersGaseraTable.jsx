import React, { useState } from "react";
import DashboardGaseraCards from "./dashboardGaseraCards";
import ModalCreateOrder from "./modalCreateOrder";
import ModalEditOrder from "./modalEditOrder";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function OrdersGaseraTable() {
  const [orders, setOrders] = useState([
    {
      id: "#12345",
      fecha: "2023-10-04",
      total: "12450.00",
      estatus: "Completado",
      color: "green",
    },
    {
      id: "#12344",
      fecha: "2023-09-04",
      total: "8720.00",
      estatus: "En proceso",
      color: "yellow",
    },
    {
      id: "#12343",
      fecha: "2023-08-04",
      total: "15300.00",
      estatus: "Atrasado",
      color: "red",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const badgeColor = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [...prev, newOrder]);
    setIsOpen(false);
  };

  const handleEditOrder = (updatedOrder) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === updatedOrder.id ? { ...updatedOrder } : o))
    );
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <>
      <DashboardGaseraCards />

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Revisión de pedidos</h2>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
          >
            + Crear pedido
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar pedido..."
          className="mb-4 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-sm text-gray-700">
            <thead className="text-xs uppercase text-gray-500">
              <tr>
                <th className="text-left px-4 py-2">ID PEDIDO</th>
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
                  <td className="px-4 py-3">{order.fecha}</td>
                  <td className="px-4 py-3">
                    ${parseFloat(order.total).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        badgeColor[order.color]
                      }`}
                    >
                      {order.estatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-start h-full gap-3">
                      <Eye
                        className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition"
                        title="Ver detalles"
                      />
                      <Pencil
                        className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition"
                        title="Editar pedido"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsEditOpen(true);
                        }}
                      />
                      <Trash2
                        className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition"
                        title="Eliminar pedido"
                        onClick={() => setConfirmDeleteId(order.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

      {/* Modales */}
      <ModalCreateOrder
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCreate={handleAddOrder}
      />

      <ModalEditOrder
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditOrder}
        order={selectedOrder}
      />

      {/* Confirmación eliminación */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-4">¿Eliminar pedido?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción no se puede deshacer. ¿Deseas continuar?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
