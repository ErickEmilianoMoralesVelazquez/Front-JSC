import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import DashboardGaseraCards from "./dashboardGaseraCards";
import ModalCreateOrder from "./modalCreateOrder";
import ModalEditOrder from "./modalEditOrder";
import ModalUploadImage from "./modalUploadImage";
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

  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
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

  const handleUploadImage = () => {
    const fakeId = `#IMG${Date.now().toString().slice(-4)}`;
    const today = new Date().toISOString().split("T")[0];
    const newOrder = {
      id: fakeId,
      fecha: today,
      total: "Por asignar",
      estatus: "Subido como imagen",
      color: "yellow",
    };
    setOrders((prev) => [...prev, newOrder]);
    setIsUploadImageOpen(false);
  };

  const handleDelete = () => {
    setOrders((prev) => prev.filter((o) => o.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.id.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, orders]);

  const columns = [
    {
      name: "ID Pedido",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Total",
      selector: (row) =>
        isNaN(row.total) ? row.total : `$${parseFloat(row.total).toFixed(2)}`,
    },
    {
      name: "Estatus",
      cell: (row) => (
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[row.color]}`}
        >
          {row.estatus}
        </span>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex items-center justify-start h-full gap-3">
          <Eye
            className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition"
            title="Ver detalles"
          />
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition"
            title="Editar pedido"
            onClick={() => {
              setSelectedOrder(row);
              setIsEditOpen(true);
            }}
          />
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition"
            title="Eliminar pedido"
            onClick={() => setConfirmDeleteId(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DashboardGaseraCards />

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Revisión de pedidos</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
            >
              + Crear pedido
            </button>
            <button
              onClick={() => setIsUploadImageOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
            >
              Pedido por Imagen
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Buscar pedido..."
          className="mb-4 w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <DataTable
          columns={columns}
          data={filteredOrders}
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
      <ModalUploadImage
        isOpen={isUploadImageOpen}
        onClose={() => setIsUploadImageOpen(false)}
        onUpload={handleUploadImage}
      />

      {/* Confirmación de eliminación */}
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
