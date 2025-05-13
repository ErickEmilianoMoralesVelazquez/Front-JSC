import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  FileText,
  Calendar,
  DollarSign,
  ClipboardCheck,
  Info,
} from "lucide-react";

export default function ModalDetails({ isOpen, onClose, data }) {
  if (!isOpen || !data) return null;

  const statusColor = {
    pendiente: "bg-yellow-100 text-yellow-700",
    aceptada: "bg-green-100 text-green-700",
    rechazada: "bg-red-100 text-red-700",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-100 relative"
        >
          {/* Header con botón de cerrar */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="text-red-600" size={24} />
                Detalle de Cotización
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Información completa de la cotización
              </p>
            </div>
            <button
              onClick={onClose}
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
              transition={{ delay: 0.1 }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <FileText size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">
                  ID de cotización
                </p>
                <p className="font-medium text-gray-900">{data.id}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Fecha</p>
                <p className="font-medium text-gray-900">
                  {data.fecha_creacion}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <ClipboardCheck size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Estatus</p>
                <p
                  className={`font-medium px-3 py-1 rounded-full text-sm ${
                    statusColor[data.estado]
                  }`}
                >
                  {data.estado}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer con acciones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center"
          >
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Info size={14} />
              <span>Haz clic fuera del modal para cerrar</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
