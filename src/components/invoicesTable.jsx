import { Eye, Printer, Pencil, Download } from "lucide-react";
import React, { useState } from "react";
import ModalCreateInvoice from "./modalSaveInvoice"; // ajusta la ruta si es necesario

const invoicesData = [
  {
    doc: "FAC-2025-01.pdf",
    cliente: "Gasera del Norte",
    fecha: "10/04/2023",
    pedido: "PED-2025-001",
    estatus: "Completado",
    color: "green",
  },
  {
    doc: "FAC-2025-02.pdf",
    cliente: "Gasolinera Sureste",
    fecha: "09/04/2023",
    pedido: "PED-2025-002",
    estatus: "En proceso",
    color: "yellow",
  },
  {
    doc: "FAC-2025-03.pdf",
    cliente: "Distribuidora Central",
    fecha: "08/04/2023",
    pedido: "PED-2025-003",
    estatus: "Atrasado",
    color: "red",
  },
  {
    doc: "FAC-2025-04.pdf",
    cliente: "Gasera del Norte",
    fecha: "10/04/2023",
    pedido: "PED-2025-004",
    estatus: "Completado",
    color: "green",
  },
];

const badgeColor = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

export default function InvoicesTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState(invoicesData);

  const handleSave = (newInvoice) => {
    setInvoices([...invoices, newInvoice]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Gestión de Facturas y Remisiones</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
        >
          <span className="text-lg font-bold">+</span> Nueva Factura
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
              <th className="text-left px-4 py-2">DOCUMENTO</th>
              <th className="text-left px-4 py-2">CLIENTE</th>
              <th className="text-left px-4 py-2">FECHA</th>
              <th className="text-left px-4 py-2">PEDIDO</th>
              <th className="text-left px-4 py-2">ESTATUS</th>
              <th className="text-left px-4 py-2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, idx) => (
              <tr key={idx} className="bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">{inv.doc}</td>
                <td className="px-4 py-2">{inv.cliente}</td>
                <td className="px-4 py-2">{inv.fecha}</td>
                <td className="px-4 py-2">{inv.pedido}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[inv.color]}`}
                  >
                    {inv.estatus}
                  </span>
                </td>
                <td className="px-4 py-2 flex items-center gap-3">
                  <Download className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition" />
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

      <ModalCreateInvoice
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
