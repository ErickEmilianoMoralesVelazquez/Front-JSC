import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Eye, CheckCircle, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ModalDetails from "../modals/modalDetails";

const initialQuotes = [
  { id: "COT-2025-001", fecha: "10/04/2023", total: "$12,450.00", estatus: "Pendiente", color: "yellow" },
  { id: "COT-2025-002", fecha: "09/04/2023", total: "$8,720.00", estatus: "Pendiente", color: "yellow" },
  { id: "COT-2025-003", fecha: "08/04/2023", total: "$15,300.00", estatus: "Pendiente", color: "yellow" },
  { id: "COT-2025-004", fecha: "10/04/2023", total: "$12,450.00", estatus: "Pendiente", color: "yellow" },
];

const badgeColor = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

export default function QuotesGaseraTable() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [quoteToUpdate, setQuoteToUpdate] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [securityCode, setSecurityCode] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const handleOpenModal = (quote) => {
    setSelectedQuote(quote);
    setOpenModal(true);
  };

  const updateStatus = (id, status) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              estatus: status,
              color:
                status === "Aceptada" ? "green" : status === "Rechazada" ? "red" : "yellow",
            }
          : q
      )
    );
  };

  const promptStatusChange = (quote, status) => {
    setQuoteToUpdate(quote);
    setCurrentAction(status);
    setSecurityCode("");
    setErrorCode("");
    setShowCodeDialog(true);
  };

  const confirmCodeAndUpdate = () => {
    if (securityCode === "JORGES2025") {
      updateStatus(quoteToUpdate.id, currentAction);
      setShowCodeDialog(false);
    } else {
      setErrorCode("Código incorrecto. Inténtalo de nuevo.");
    }
  };

  const parseAmount = (amountStr) => parseFloat(amountStr.replace(/[$,]/g, ""));

  const filteredQuotes = quotes.filter((q) => {
    const matchSearch = q.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "" || q.estatus === statusFilter;
    const amount = parseAmount(q.total);
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    const matchPrice = amount >= min && amount <= max;
    return matchSearch && matchStatus && matchPrice;
  });

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
      selector: (row) => row.total,
      sortable: true,
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
        <div className="flex gap-2">
          <Eye
            className="w-4 h-4 text-blue-500 cursor-pointer"
            onClick={() => handleOpenModal(row)}
          />
          <CheckCircle
            className="w-4 h-4 text-green-500 cursor-pointer"
            onClick={() => promptStatusChange(row, "Aceptada")}
          />
          <XCircle
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => promptStatusChange(row, "Rechazada")}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Gestión de Cotizaciones</h2>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar pedido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        >
          <option value="">Filtrar por estatus</option>
          <option value="Aceptada">Aceptada</option>
          <option value="Rechazada">Rechazada</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <input
          type="number"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
        <input
          type="number"
          placeholder="Precio máximo"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredQuotes}
        pagination
        highlightOnHover
        striped
        responsive
        persistTableHead
        noDataComponent="No se encontraron cotizaciones."
      />

      {/* Modal de detalles */}
      <ModalDetails isOpen={openModal} onClose={() => setOpenModal(false)} data={selectedQuote} />

      {/* Modal de código de seguridad */}
      {showCodeDialog && (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-100 relative"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              {currentAction === "Aceptada" ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <XCircle className="text-red-600" size={24} />
              )}
              Confirmar {currentAction === "Aceptada" ? "aceptación" : "rechazo"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              ID de cotización: {quoteToUpdate?.id}
            </p>
          </div>
          <button
            onClick={() => setShowCodeDialog(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <p className="text-sm text-gray-600">
              Ingresa el código de seguridad para {currentAction === "Aceptada" ? "aceptar" : "rechazar"} esta cotización.
            </p>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Código de seguridad"
                value={securityCode}
                onChange={(e) => {
                  setSecurityCode(e.target.value);
                  setErrorCode("");
                }}
              />
              {errorCode && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-1"
                >
                  {errorCode}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3"
        >
          <button
            onClick={() => setShowCodeDialog(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={confirmCodeAndUpdate}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
              currentAction === "Aceptada" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            Confirmar {currentAction === "Aceptada" ? "aceptación" : "rechazo"}
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
)}
    </div>
  );
}
