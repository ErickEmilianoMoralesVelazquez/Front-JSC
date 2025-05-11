import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Shield, Calendar, Save, Info } from "lucide-react";

export default function ModalEditUser({ isOpen, onClose, user = {}, onSave }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "Gasera",
    fechaRegistro: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || "",
        nombre: user.nombre || "",
        correo: user.email || user.correo || "",
        rol: user.rol || "Gasera",
        fechaRegistro: user.fechaRegistro || user.fecha_creacion || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, email: form.correo });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
                  Editar Usuario
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {form.id ? `ID: ${form.id}` : "Nuevo usuario"}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Nombre completo</p>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1 border-b border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  />
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
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Correo electrónico</p>
                  <input
                    name="correo"
                    type="email"
                    value={form.correo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-1 border-b border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  />
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
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Rol del usuario</p>
                  <select
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border-b border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="Gasera">Gasera</option>
                    <option value="Superadmin">Superadmin</option>
                    <option value="Representante Gasera">Representante Gasera</option>
                  </select>
                </div>
              </motion.div>

              {form.fechaRegistro && (
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
                    <p className="text-sm font-medium text-gray-900">{form.fechaRegistro}</p>
                  </div>
                </motion.div>
              )}

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
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <Save size={16} />
                    Guardar
                  </button>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}