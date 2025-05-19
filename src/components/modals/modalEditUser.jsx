import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Shield, CalendarCheck } from "lucide-react";

export default function ModalEditUser({ isOpen, onClose, user, onSave }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "cliente",
    fechaRegistro: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || "",
        nombre: user.nombre || "",
        correo: user.correo || "",
        rol: user.rol || "cliente",
        fechaRegistro: user.fechaRegistro || "",
        password: "", // limpia
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: form.id,
      nombre: form.nombre,
      correo: form.correo,
      rol: form.rol,
    };

    if (form.password.trim() !== "") {
      payload.password = form.password;
    }

    onSave(payload);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white p-6 rounded-xl w-full max-w-lg shadow-2xl border border-gray-100 relative"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Editar usuario
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="text-gray-500 hover:text-gray-700" size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <motion.div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Nombre</p>
                  <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border-b border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  />
                </div>
              </motion.div>

              {/* Correo */}
              <motion.div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Correo</p>
                  <input
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border-b border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  />
                </div>
              </motion.div>

              {/* Nueva contraseña */}
              <motion.div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Shield size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Nueva contraseña</p>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className="w-full px-3 py-1 border-b border-0 border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  />
                </div>
              </motion.div>

              {/* Rol */}
              <motion.div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Shield size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Rol</p>
                  <select
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                    className="w-full px-3 py-1 border-b border-0 border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </motion.div>

              {/* Botones */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

