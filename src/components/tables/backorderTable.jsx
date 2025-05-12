import React, { useState } from "react";
import { Eye, Calendar, ClipboardCheck, Truck, Package, FileText, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

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

      {/* Modal de detalles con diseño tipo ModalDetails */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-100 relative"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Package className="text-red-600" size={24} />
                        Detalle de Envio
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Información completa del pedido en envio
                      </p>
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Cerrar modal"
                    >
                      <X className="text-gray-500 hover:text-gray-700" size={20} />
                    </button>
                  </div>

                  {/* Contenido del modal */}
                  <div className="space-y-4 text-sm text-gray-700">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Orden de compra</p>
                        <p className="font-medium">{selectedOrder?.orden}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Entrega estimada</p>
                        <p className="font-medium">{selectedOrder?.entrega}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                        <ClipboardCheck size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fecha solicitada</p>
                        <p className="font-medium">{selectedOrder?.solicitud}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                        <Truck size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Número de guía</p>
                        <p className="font-medium">{selectedOrder?.guia}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full text-red-600">
                        <UserIcon />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Repartidor</p>
                        <p className="font-medium">{selectedOrder?.repartidor}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-100 text-right">
                    <button
                      onClick={() => setOpen(false)}
                      className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Cerrar
                    </button>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}

function UserIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.003 9.003 0 0112 15c2.003 0 3.847.66 5.273 1.766M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
