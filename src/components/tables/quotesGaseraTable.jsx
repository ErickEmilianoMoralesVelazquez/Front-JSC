import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Eye, CheckCircle, XCircle, X, DollarSign, Calendar, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ModalDetails from "../modals/modalDetails";

const badgeColor = {
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
};

export default function QuotesGaseraTable() {
  const [quotes, setQuotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [quoteToUpdate, setQuoteToUpdate] = useState(null);
  const [currentAction, setCurrentAction] = useState(null);
  const [securityCode, setSecurityCode] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [quoteIdToPay, setQuoteIdToPay] = useState(null);
  const [paymentDate, setPaymentDate] = useState("");
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/quotations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const mapped = data.map((q) => ({
        id: `COT-${q.id}`,
        fecha: new Date(q.fecha_creacion).toLocaleDateString("es-MX"),
        estatus:
          q.estado === "aceptada"
            ? "Aceptada"
            : q.estado === "rechazada"
            ? "Rechazada"
            : "Pendiente",
        color:
          q.estado === "aceptada"
            ? "green"
            : q.estado === "rechazada"
            ? "red"
            : "yellow",
        fecha_pago: q.fecha_pago_aproximada
          ? new Date(q.fecha_pago_aproximada).toLocaleDateString("es-MX")
          : "No asignada",
        raw: q,
      }));

      setQuotes(mapped);
    } catch (err) {
      console.error("Error al obtener cotizaciones:", err);
    }
  };

  const handleOpenModal = (quote) => {
    setSelectedQuote(quote.raw);
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
                status === "Aceptada"
                  ? "green"
                  : status === "Rechazada"
                  ? "red"
                  : "yellow",
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

  const confirmCodeAndUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const idNumerico = parseInt(quoteToUpdate?.id?.replace("COT-", ""), 10);

      const endpoint =
        currentAction === "Aceptada"
          ? `http://localhost:3001/quotations/${idNumerico}/accept`
          : `http://localhost:3001/quotations/${idNumerico}/reject`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clave_secreta: securityCode }),
      });

      if (!res.ok) {
        setErrorCode("Código incorrecto o acción no permitida.");
        return;
      }

      updateStatus(quoteToUpdate.id, currentAction);
      setShowCodeDialog(false);
    } catch (err) {
      console.error("Error al actualizar cotización:", err);
      setErrorCode("Hubo un error al confirmar. Intenta nuevamente.");
    }
  };

  const openPaymentModal = (quoteId) => {
    setQuoteIdToPay(parseInt(quoteId.replace("COT-", "")));
    setPaymentDate("");
    setDateError("");
    setShowPaymentDialog(true);
  };

  const handlePaymentDateSubmit = async () => {
    if (!paymentDate) {
      setDateError("Debes seleccionar una fecha válida");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3001/quotations/${quoteIdToPay}/set-payment-date`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fecha_pago_aproximada: paymentDate }),
      });

      if (!res.ok) throw new Error("Error al asignar la fecha");

      const data = await res.json();
      console.log("Respuesta del servidor:", data);
      setShowPaymentDialog(false);
      fetchQuotes();
    } catch (err) {
      console.error("Error:", err);
      setDateError("Error al asignar la fecha");
    }
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchSearch = q.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "" || q.estatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const columns = [
    {
      name: "ID Cotización",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Estatus",
      cell: (row) => (
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            badgeColor[row.color]
          }`}
        >
          {row.estatus}
        </span>
      ),
    },
    {
      name: "Fecha de Pago",
      selector: (row) => row.fecha_pago,
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
          <DollarSign
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => openPaymentModal(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md w-full max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">Gestión de Cotizaciones</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar cotización..."
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
      </div>

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

      <ModalDetails
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        data={selectedQuote}
      />

      {/* Modal de Fecha de Pago */}
      <AnimatePresence>
        {showPaymentDialog && (
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
              {/* Header con icono */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Asignar fecha de pago
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Seleccione la fecha de pago para esta cotización
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentDialog(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="text-gray-500 hover:text-gray-700" size={20} />
                </button>
              </div>

              {/* Contenido */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-green-100 rounded-full text-green-600">
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      Fecha de pago
                    </p>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border-b rounded-lg border-gray-300 bg-transparent focus:border-green-500 focus:outline-none text-sm font-medium text-gray-900"
                      value={paymentDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        setPaymentDate(e.target.value);
                        setDateError("");
                      }}
                    />
                  </div>
                </motion.div>

                {dateError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 text-sm text-red-500 bg-red-50 p-2 rounded-lg"
                  >
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{dateError}</span>
                  </motion.div>
                )}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3"
              >
                <button
                  onClick={() => setShowPaymentDialog(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePaymentDateSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Check size={16} />
                  Confirmar fecha
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
