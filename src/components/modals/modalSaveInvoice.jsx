import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Upload,
  FileText,
  Trash2,
  Check,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { toast } from "react-toastify";

export default function ModalSaveInvoice({
  isOpen,
  onClose,
  onSave,
  pedidosCotizados = [],
  pagosUtilizados = []
}) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedXmlFile, setUploadedXmlFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingXml, setIsDraggingXml] = useState(false);
  const [fileName, setFileName] = useState("");
  const [xmlFileName, setXmlFileName] = useState("");
  const [pedidos, setPedidos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [form, setForm] = useState({
    pedidoId: "",
    pagoId: ""
  });

  useEffect(() => {
    if (isOpen) {
      fetchPedidos();
      fetchPagos();
    }
  }, [isOpen]);

  const fetchPedidos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error al cargar pedidos");

      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error al cargar los pedidos");
    }
  };

  const fetchPagos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}payments`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Error al cargar pagos");

      const data = await response.json();
      setPagos(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error al cargar los pagos");
    }
  };

  const pedidosDisponibles = useMemo(() => {
    return pedidos.filter(p => !pedidosCotizados.includes(p.id));
  }, [pedidos, pedidosCotizados]);

  const pagosDisponibles = useMemo(() => {
    return pagos.filter(p => !pagosUtilizados.includes(p.id));
  }, [pagos, pagosUtilizados]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFile || !uploadedXmlFile) {
      toast.error("Debes seleccionar ambos archivos (PDF y XML)");
      return;
    }

    const newInvoice = {
      pedidoId: parseInt(form.pedidoId),
      pagoId: parseInt(form.pagoId),
      archivo_pdf: uploadedFile,
      archivo_xml: uploadedXmlFile
    };

    onSave(newInvoice);
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files?.[0] || e.dataTransfer.files?.[0];
    if (fileType === 'pdf' && file?.type === "application/pdf") {
      setUploadedFile(file);
      setFileName(file.name);
    } else if (fileType === 'xml' && file?.type === "text/xml") {
      setUploadedXmlFile(file);
      setXmlFileName(file.name);
    } else {
      toast.error(fileType === 'pdf' ? "El archivo debe ser PDF" : "El archivo debe ser XML");
    }
  };

  const handleDragOver = (e, type) => {
    e.preventDefault();
    type === 'pdf' ? setIsDragging(true) : setIsDraggingXml(true);
  };

  const handleDragLeave = (type) => {
    type === 'pdf' ? setIsDragging(false) : setIsDraggingXml(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    type === 'pdf' ? setIsDragging(false) : setIsDraggingXml(false);
    handleFileUpload(e, type);
  };

  const handleRemoveFile = (type) => {
    if (type === 'pdf') {
      setUploadedFile(null);
      setFileName("");
      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } else {
      setUploadedXmlFile(null);
      setXmlFileName("");
      const fileInput = document.getElementById("xml-upload");
      if (fileInput) fileInput.value = "";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Pedido */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <ShoppingCart size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500">Pedido</label>
                  <select
                    name="pedidoId"
                    value={form.pedidoId}
                    onChange={(e) =>
                      setForm({ ...form, pedidoId: e.target.value })
                    }
                    required
                    className="w-full px-3 py-1 border-b border-gray-300 border-0 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="">Selecciona un pedido</option>
                    {pedidosDisponibles.map((pedido) => (
                      <option key={pedido.id} value={pedido.id}>
                        Pedido #{pedido.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pago */}
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <DollarSign size={18} />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500">Pago</label>
                  <select
                    name="pagoId"
                    value={form.pagoId}
                    onChange={(e) =>
                      setForm({ ...form, pagoId: e.target.value })
                    }
                    required
                    className="w-full px-3 py-1 border-b border-gray-300 border-0 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="">Selecciona un pago</option>
                    {pagosDisponibles.map((pago) => (
                      <option key={pago.id} value={pago.id}>
                        Pago #{pago.id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Archivo */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Upload size={16} className="text-red-600" />
                  Archivo PDF
                </label>

                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      isDragging ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'pdf')}
                    onDragLeave={() => handleDragLeave('pdf')}
                    onDrop={(e) => handleDrop(e, 'pdf')}
                  >
                    <FileText size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="font-medium text-gray-700">
                      Arrastra y suelta tu archivo PDF aquí
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Solo se aceptan archivos PDF, máximo 10MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => handleFileUpload(e, 'pdf')}
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      Seleccionar archivo PDF
                    </label>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                          <Check size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{fileName}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('pdf')}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                        aria-label="Eliminar archivo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Archivo XML */}
              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                  <Upload size={16} className="text-red-600" />
                  Archivo XML
                </label>

                {!uploadedXmlFile ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      isDraggingXml ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                    onDragOver={(e) => handleDragOver(e, 'xml')}
                    onDragLeave={() => handleDragLeave('xml')}
                    onDrop={(e) => handleDrop(e, 'xml')}
                  >
                    <FileText size={40} className="mx-auto text-gray-400 mb-3" />
                    <p className="font-medium text-gray-700">
                      Arrastra y suelta tu archivo XML aquí
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Solo se aceptan archivos XML, máximo 10MB
                    </p>
                    <input
                      type="file"
                      accept=".xml"
                      className="hidden"
                      id="xml-upload"
                      onChange={(e) => handleFileUpload(e, 'xml')}
                    />
                    <label
                      htmlFor="xml-upload"
                      className="inline-block mt-4 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      Seleccionar archivo XML
                    </label>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full text-green-600">
                          <Check size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{xmlFileName}</p>
                          <p className="text-xs text-gray-500">
                            {(uploadedXmlFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile('xml')}
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                        aria-label="Eliminar archivo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-red-600 rounded-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}