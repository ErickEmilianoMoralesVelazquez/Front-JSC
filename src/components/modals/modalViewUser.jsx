import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Shield, Calendar, Info } from "lucide-react";

export default function ModalViewUser({ isOpen, onClose, user }) {
  return (
    <AnimatePresence>
      {isOpen && user && (
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
                  <User className="text-red-600" size={24} />
                  Información del Usuario
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Detalles completos del perfil
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

            {/* Contenido del usuario */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Nombre completo</p>
                  <p className="font-medium text-gray-900">{user.nombre}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Correo electrónico</p>
                  <p className="font-medium text-gray-900">{user.correo}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Rol del usuario</p>
                  <p className="font-medium text-gray-900 capitalize">{user.rol.toLowerCase()}</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Fecha de registro</p>
                  <p className="font-medium text-gray-900">{user.fecha_creacion}</p>
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
      )}
    </AnimatePresence>
  );
}