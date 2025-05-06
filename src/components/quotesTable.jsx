import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Eye, Printer, Pencil } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import CotizacionPDF from "./cotizacionPDF";
import ModalCreateQuote from "./modalSaveQuote";

const originalQuotes = [
  {
    id: "COT-2025-001",
    cliente: "Gasera del Norte",
    fecha: "10/04/2023",
    total: "$12,450.00",
    estatus: "Aceptada",
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
    estatus: "Rechazada",
    color: "red",
  },
  {
    id: "COT-2025-004",
    cliente: "Gasera del Norte",
    fecha: "10/04/2023",
    total: "$12,450.00",
    estatus: "Aceptada",
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

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const handleSaveQuote = (newQuote) => {
    console.log("Nueva cotización:", newQuote);
  };

  const handleDownloadPDF = async (quote) => {
    const blob = await pdf(<CotizacionPDF data={quote} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${quote.id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      name: "ID Cotización",
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
          className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[row.color]}`}
        >
          {row.estatus}
        </span>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex items-center justify-start gap-3 h-full">
          <Eye className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition" />
          <Printer
            className="w-4 h-4 text-gray-600 cursor-pointer hover:scale-110 transition"
            onClick={() => handleDownloadPDF(row)}
          />
          <Pencil className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition" />
        </div>
      ),
    },
  ];

  // 🔍 Filtrado combinado con useMemo
  const filteredQuotes = useMemo(() => {
    return originalQuotes.filter((quote) => {
      const matchesSearch = quote.id.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = selectedStatus ? quote.estatus === selectedStatus : true;
      const matchesClient = selectedClient ? quote.cliente === selectedClient : true;
      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [searchText, selectedStatus, selectedClient]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
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
          placeholder="Buscar cotización..."
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Filtrar por estatus</option>
          <option value="Aceptada">Aceptada</option>
          <option value="En proceso">En proceso</option>
          <option value="Rechazada">Rechazada</option>
        </select>
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
        data={filteredQuotes}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        highlightOnHover
        responsive
        striped
      />

      {/* Modal de creación */}
      <ModalCreateQuote
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveQuote}
      />
    </div>
  );
}
