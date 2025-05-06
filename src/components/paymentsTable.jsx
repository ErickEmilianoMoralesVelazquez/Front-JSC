import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Eye, Printer, Pencil, Download } from "lucide-react";
import * as XLSX from "xlsx";

const paymentsData = [
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
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const filteredPayments = useMemo(() => {
    return paymentsData.filter((p) => {
      const matchesSearch =
        p.pedido.toLowerCase().includes(searchText.toLowerCase()) ||
        p.id.toLowerCase().includes(searchText.toLowerCase());

      const matchesClient = selectedClient
        ? p.cliente === selectedClient
        : true;

      return matchesSearch && matchesClient;
    });
  }, [searchText, selectedClient]);

  const handleExportToExcel = () => {
    const data = filteredPayments.map((p) => ({
      Factura: p.id,
      Cliente: p.cliente,
      "Fecha de creación": p.creacion,
      Pedido: p.pedido,
      Estatus: p.estatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pagos");
    XLSX.writeFile(workbook, "pagos.xlsx");
  };

  const columns = [
    {
      name: "Factura",
      selector: (row) => row.id,
      cell: (row) => (
        <span className="text-blue-600 underline cursor-pointer">{row.id}</span>
      ),
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => row.cliente,
      sortable: true,
    },
    {
      name: "Creación",
      selector: (row) => row.creacion,
    },
    {
      name: "Pedido",
      selector: (row) => row.pedido,
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
        <div className="flex items-center gap-3">
          <Eye className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition" />
          <Printer className="w-4 h-4 text-gray-600 cursor-pointer hover:scale-110 transition" />
          <Pencil className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
        <h2 className="text-xl font-bold">Gestión de Pagos</h2>
        <button
          onClick={handleExportToExcel}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
        >
          <Download className="w-4 h-4" /> Exportar tabla
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar pedido o factura..."
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div></div> {/* Reservado para futuros filtros */}
        <select
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          <option value="">Filtrar por cliente</option>
          <option value="Gasera del Norte">Gasera del Norte</option>
          <option value="Gasolinera Sureste">Gasolinera Sureste</option>
          <option value="Distribuidora Central">Distribuidora Central</option>
        </select>
      </div>

      {/* Tabla */}
      <DataTable
        columns={columns}
        data={filteredPayments}
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
  );
}
