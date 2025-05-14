import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Download, Printer, Pencil } from "lucide-react";
import ModalCreateInvoice from "../modals/modalSaveInvoice";
import { toast } from "react-toastify";

const badgeColor = {
  pendiente: "bg-yellow-100 text-yellow-700",
  emitida: "bg-blue-100 text-blue-700",
  pagada: "bg-green-100 text-green-700",
  cancelada: "bg-red-100 text-red-700"
};

export default function InvoicesTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/invoices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al cargar facturas");

      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Error al cargar las facturas");
    }
  };

  const handleSave = async (newInvoice) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("pedido_id", newInvoice.pedidoId);
      formData.append("pago_id", newInvoice.pagoId);

      if (newInvoice.archivo.type === "application/pdf") {
        formData.append("factura_pdf", newInvoice.archivo);
      } else if (newInvoice.archivo.type === "text/xml") {
        formData.append("factura_xml", newInvoice.archivo);
      }

      const response = await fetch("http://localhost:3001/invoices", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear la factura");
      }

      toast.success("Factura creada exitosamente");
      fetchInvoices();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error(error.message || "Error al crear la factura");
    }
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        (inv.doc?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (inv.pedido?.toLowerCase() || "").includes(searchText.toLowerCase());

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
      name: "Factura",
      selector: (row) => row.url?.split('/').pop() || 'Sin archivo',
      cell: (row) => (
        <div className="group relative">
          <span className="text-blue-600 underline cursor-pointer">
            {row.url?.split('/').pop() || 'Sin archivo'}
          </span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
            Descargar factura
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Pedido",
      selector: (row) => `#${row.pedido_id}`,
      sortable: true,
    },
    {
      name: "Fecha Emisión",
      selector: (row) => new Date(row.fecha_creacion).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      sortable: true,
    },
    {
      name: "Estado Factura",
      cell: (row) => (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[row.estado]}`}>
          {row.estado.toUpperCase()}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Estado Pago",
      cell: (row) => (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeColor[row.Payment?.estado || 'pendiente']}`}>
          {(row.Payment?.estado || 'PENDIENTE').toUpperCase()}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="group relative">
            <Download 
              className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={() => handleDownload(row)}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Descargar factura
            </div>
          </div>

          <div className="group relative">
            <Printer 
              className="w-4 h-4 text-gray-600 cursor-pointer hover:scale-110 transition"
              onClick={() => handlePrint(row)}
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
              Imprimir factura
            </div>
          </div>

          {row.estado !== 'cancelada' && (
            <div className="group relative">
              <Pencil 
                className="w-4 h-4 text-yellow-500 cursor-pointer hover:scale-110 transition"
                onClick={() => handleEdit(row)}
              />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                Editar factura
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
        <h2 className="text-xl font-bold">Gestión de Facturas</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
        >
          <span className="text-lg font-bold">+</span> Nueva Factura
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por número de factura o pedido..."
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-full"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="border border-gray-300 px-3 py-2 rounded-lg text-sm w-full"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Filtrar por estado de factura</option>
          <option value="emitida">Emitida</option>
          <option value="pendiente">Pendiente</option>
          <option value="pagada">Pagada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* Tabla */}
      <DataTable
        columns={columns}
        data={filteredInvoices}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        noDataComponent="No hay facturas disponibles"
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