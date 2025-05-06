import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Download, Printer, Pencil } from "lucide-react";
import ModalCreateInvoice from "../modals/modalSaveInvoice";

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

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const handleSave = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.doc.toLowerCase().includes(searchText.toLowerCase()) ||
        inv.pedido.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus = selectedStatus
        ? inv.estatus === selectedStatus
        : true;

      const matchesClient = selectedClient
        ? inv.cliente === selectedClient
        : true;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [searchText, selectedStatus, selectedClient, invoices]);

  const columns = [
    {
      name: "Documento",
      selector: (row) => row.doc,
      cell: (row) => (
        <span className="text-blue-600 underline cursor-pointer">
          {row.doc}
        </span>
      ),
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
          <Download className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition" />
          <Printer className="w-4 h-4 text-gray-600 cursor-pointer hover:scale-110 transition" />
          <Pencil className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition" />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
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
          placeholder="Buscar documento o pedido..."
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
          <option value="Completado">Completado</option>
          <option value="En proceso">En proceso</option>
          <option value="Atrasado">Atrasado</option>
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

      {/* Tabla con filtros activos */}
      <DataTable
        columns={columns}
        data={filteredInvoices}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        highlightOnHover
        responsive
        striped
      />

      {/* Modal */}
      <ModalCreateInvoice
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
