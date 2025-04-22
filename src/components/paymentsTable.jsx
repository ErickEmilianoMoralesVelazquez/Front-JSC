import React from "react";
import { Eye, Printer, Pencil, Download } from "lucide-react";

const payments = [
  {
    id: "FAC-2025-01.pdf",
    cliente: "Gasera del Norte",
    creacion: "10/04/2023",
    pedido: "PED-2025-001",
    estatus: "Pagado",
    color: "green",
  },
  {
    id: "FAC-2025-02.pdf",
    cliente: "Gasolinera Sureste",
    creacion: "09/04/2023",
    pedido: "PED-2025-002",
    estatus: "En proceso",
    color: "yellow",
  },
  {
    id: "FAC-2025-03.pdf",
    cliente: "Distribuidora Central",
    creacion: "08/04/2023",
    pedido: "PED-2025-003",
    estatus: "Atrasado",
    color: "red",
  },
  {
    id: "FAC-2025-04.pdf",
    cliente: "Gasera del Norte",
    creacion: "10/04/2023",
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

export default function PaymentsTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
        <h2 className="text-xl font-bold">Gestión de Pagos</h2>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
          <Download className="w-4 h-4" /> Exportar tabla
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar pedido..."
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full">
          <option>Filtrar por fecha de pago</option>
        </select>
        <select className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full">
          <option>Filtrar por cliente</option>
          <option>Gasera del Norte</option>
          <option>Gasolinera Sureste</option>
          <option>Distribuidora Central</option>
        </select>
      </div>

      {/* Tabla única con diseño fluido */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-sm text-gray-700">
          <thead className="text-xs uppercase text-gray-500">
            <tr>
              <th className="text-left px-4 py-2">FACTURA</th>
              <th className="text-left px-4 py-2">CLIENTE</th>
              <th className="text-left px-4 py-2">CREACIÓN</th>
              <th className="text-left px-4 py-2">PEDIDO</th>
              <th className="text-left px-4 py-2">ESTATUS</th>
              <th className="text-left px-4 py-2">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={idx} className="bg-gray-50 hover:bg-gray-100 transition">
                <td className="px-4 py-3 text-blue-600 underline cursor-pointer">
                  {p.id}
                </td>
                <td className="px-4 py-3">{p.cliente}</td>
                <td className="px-4 py-3">{p.creacion}</td>
                <td className="px-4 py-3">{p.pedido}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[p.color]}`}>
                    {p.estatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition" />
                    <Printer className="w-4 h-4 text-gray-600 cursor-pointer hover:scale-110 transition" />
                    <Pencil className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end space-x-2 text-sm">
        <button className="w-9 h-9 border rounded-md">&lt;</button>
        <button className="w-9 h-9 border rounded-md">1</button>
        <button className="w-9 h-9 bg-red-500 text-white rounded-md">2</button>
        <button className="w-9 h-9 border rounded-md">3</button>
        <button className="w-9 h-9 border rounded-md">&gt;</button>
      </div>
    </div>
  );
}
