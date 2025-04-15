import React, { useState } from "react";
import { Eye, Printer, Pencil } from "lucide-react";
import ModalCreateQuote from "./modalSaveQuote"; // Make sure the path is correct

const quotes = [
  {
    id: "COT-2025-001",
    cliente: "Gasera del Norte",
    fecha: "10/04/2023",
    total: "$12,450.00",
    estatus: "Completado",
    color: "green",
  },
  {
    id: "COT-2025-002",
    cliente: "Gasolinera Sureste",
    fecha: "09/04/2023",
    total: "$8,720.00",
    estatus: "En proceso",
    color: "yellow",
  },
  {
    id: "COT-2025-003",
    cliente: "Distribuidora Central",
    fecha: "08/04/2023",
    total: "$15,300.00",
    estatus: "Atrasado",
    color: "red",
  },
  {
    id: "COT-2025-004",
    cliente: "Gasera del Norte",
    fecha: "10/04/2023",
    total: "$12,450.00",
    estatus: "Completado",
    color: "green",
  },
];

const badgeColor = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

export default function QuotesTable() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSaveQuote = (newQuote) => {
    console.log("Nueva cotización:", newQuote);
    // Aquí puedes actualizar el estado global o llamar a la API
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión de Cotizaciones</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span> Nueva Cotización
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar pedido..."
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full">
          <option>Filtrar por estatus</option>
          <option>Completado</option>
          <option>En proceso</option>
          <option>Atrasado</option>
        </select>
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full">
          <option>Filtrar por cliente</option>
          <option>Gasera del Norte</option>
          <option>Gasolinera Sureste</option>
          <option>Distribuidora Central</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
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
            {quotes.map((q, idx) => (
              <tr key={idx} className="bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-4 py-2">{q.id}</td>
                <td className="px-4 py-2">{q.cliente}</td>
                <td className="px-4 py-2">{q.fecha}</td>
                <td className="px-4 py-2">{q.total}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[q.color]}`}
                  >
                    {q.estatus}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-3">
                  <Eye className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition" />
                  <Printer className="w-4 h-4 text-gray-600 cursor-pointer hover:scale-110 transition" />
                  <Pencil className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-6 flex justify-end space-x-2 text-sm">
        <button className="w-9 h-9 border rounded-md">&lt;</button>
        <button className="w-9 h-9 border rounded-md">1</button>
        <button className="w-9 h-9 bg-red-500 text-white rounded-md">2</button>
        <button className="w-9 h-9 border rounded-md">3</button>
        <button className="w-9 h-9 border rounded-md">&gt;</button>
      </div>

      {/* Modal */}
      <ModalCreateQuote
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveQuote}
      />
    </div>
  );
}
