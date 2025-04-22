import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Dialog, DialogTitle } from "@headlessui/react";

const initialBackorders = [
  {
    orden: "ORDEN DE COMPRA 0001",
    entrega: "2023-04-25",
    solicitud: "2023-04-20",
    guia: "1234567890",
    repartidor: "Carlos Jiménez",
  },
  {
    orden: "ORDEN DE COMPRA 0002",
    entrega: "2023-04-28",
    solicitud: "2023-04-22",
    guia: "0987654321",
    repartidor: "Laura Pérez",
  },
  {
    orden: "ORDEN DE COMPRA 0003",
    entrega: "2023-04-30",
    solicitud: "2023-04-24",
    guia: "1122334455",
    repartidor: "Miguel Sánchez",
  },
];

export default function BackordersTable() {
  const [search, setSearch] = useState("");
  const [guiaInput, setGuiaInput] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);

  const filtered = initialBackorders.filter((item) => {
    const matchSearch =
      item.orden.toLowerCase().includes(search.toLowerCase()) ||
      item.repartidor.toLowerCase().includes(search.toLowerCase());

    const matchGuia =
      guiaInput === "" || item.guia.toLowerCase().includes(guiaInput.toLowerCase());

    return matchSearch && matchGuia;
  });

  const openDetails = (item) => {
    setSelectedOrder(item);
    setOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-6">Backorders</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar orden o repartidor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
        <input
          type="text"
          placeholder="Filtrar por número de guía..."
          value={guiaInput}
          onChange={(e) => setGuiaInput(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm text-gray-700">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="text-left px-4 py-2">N° ORDEN</th>
              <th className="text-left px-4 py-2">FECHA ENTREGA</th>
              <th className="text-left px-4 py-2">FECHA SOLICITADA</th>
              <th className="text-left px-4 py-2">GUÍA</th>
              <th className="text-left px-4 py-2">REPARTIDOR</th>
              <th className="text-left px-4 py-2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b, idx) => (
              <tr key={idx} className="bg-gray-50 hover:bg-gray-100 transition rounded-lg">
                <td className="px-4 py-2 font-medium">{b.orden}</td>
                <td className="px-4 py-2">{b.entrega}</td>
                <td className="px-4 py-2">{b.solicitud}</td>
                <td className="px-4 py-2">{b.guia}</td>
                <td className="px-4 py-2">{b.repartidor}</td>
                <td className="px-4 py-2 flex justify-center items-center">
                  <Eye
                    className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition"
                    onClick={() => openDetails(b)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold mb-4">
              Detalles del Backorder
            </DialogTitle>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Orden:</strong> {selectedOrder?.orden}</p>
              <p><strong>Entrega estimada:</strong> {selectedOrder?.entrega}</p>
              <p><strong>Fecha solicitada:</strong> {selectedOrder?.solicitud}</p>
              <p><strong>Guía:</strong> {selectedOrder?.guia}</p>
              <p><strong>Repartidor:</strong> {selectedOrder?.repartidor}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-md text-sm"
              >
                Cerrar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
