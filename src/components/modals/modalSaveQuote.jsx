import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trash,
  FileText,
  User,
  ShoppingCart,
  FileInput,
  Save,
  Check,
} from "lucide-react";

export default function ModalSaveQuote({ isOpen, onClose, onSave }) {
  const [fileName, setFileName] = useState("");
  const [archivoTipo, setArchivoTipo] = useState("");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchClientes();
      setPedidos([]);
      setSelectedClienteId("");
      setFileName("");
      setArchivoTipo("");
      setArchivoSeleccionado(null);
    }
  }, [isOpen]);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener clientes");

      const data = await res.json();
      const soloClientes = data.filter(
        (u) => u.rol === "cliente" && u.estado === "activo"
      );
      setClientes(soloClientes);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
      setClientes([]);
    }
  };

  const fetchPedidosByCliente = async (clienteId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/orders/by-client/${clienteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      const pendientes = data.filter((p) => p.estado === "pendiente");
      setPedidos(pendientes);
    } catch (err) {
      console.error("Error al obtener pedidos del cliente:", err);
    }
  };

  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    setSelectedClienteId(clienteId);
    if (clienteId) fetchPedidosByCliente(clienteId);
    else setPedidos([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type;
    if (type === "application/pdf") {
      setArchivoTipo("pdf");
    } else if (type === "application/xml" || type === "text/xml") {
      setArchivoTipo("xml");
    } else {
      alert("Solo se permiten archivos PDF o XML");
      e.target.value = "";
      setArchivoTipo("");
      return;
    }

    setFileName(file.name);
    setArchivoSeleccionado(file);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-xl w-full max-w-md shadow-2xl  relative"
          >
            {/* Header */}
            <div className="bg-red-700 p-5 text-white rounded-t-xl">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <FileText className="text-white" size={24} />
                  <h2 className="text-xl font-bold">Nueva Cotización</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newQuote = {
                  clienteId: form.cliente.value,
                  pedidoId: form.pedido.value,
                  archivo: archivoSeleccionado,
                  tipoArchivo: archivoTipo,
                };
                onSave(newQuote);
                setFileName("");
                setArchivoSeleccionado(null);
                onClose();
              }}
              className="p-5 space-y-4"
            >
              {/* Cliente */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500">
                    Cliente
                  </label>
                  <select
                    name="cliente"
                    required
                    value={selectedClienteId}
                    onChange={handleClienteChange}
                    className="w-full px-3 py-1 border-b border-0 border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="">Selecciona un cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre || cliente.correo || `ID ${cliente.id}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pedido */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <ShoppingCart size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500">
                    Pedido pendiente
                  </label>
                  <select
                    name="pedido"
                    required
                    disabled={!selectedClienteId}
                    className="w-full px-3 py-1 border-b border-0 border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="">Selecciona un pedido</option>
                    {pedidos.map((pedido) => (
                      <option key={pedido.id} value={pedido.id}>
                        Pedido #{pedido.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Archivo */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <FileInput size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Archivo PDF o XML
                  </label>

                  {!fileName ? (
                    <>
                      <input
                        type="file"
                        accept=".pdf,.xml"
                        required
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="block w-full px-4 py-2 bg-gray-100 text-center text-sm text-gray-700 border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 transition"
                      >
                        Seleccionar archivo
                      </label>
                    </>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                          <Check size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {fileName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Archivo listo para enviar
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFileName("");
                          setArchivoTipo("");
                          setArchivoSeleccionado(null);
                          const input = document.getElementById("file-upload");
                          if (input) input.value = "";
                        }}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Save size={16} />
                  Guardar Cotización
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}