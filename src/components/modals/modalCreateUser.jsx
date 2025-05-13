import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Shield, Key, Eye, EyeOff, Save, Info } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModalCreateUser({ isOpen, onClose, onSave }) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    rol: "cliente",
    clave_secreta: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        nombre: form.nombre,
        correo: form.correo,
        contraseña: form.contraseña || "12345678",
        rol: form.rol,
      };

      if (form.rol === "cliente") {
        payload.clave_secreta = form.clave_secreta;
      }

      const res = await axios.post(
        "http://localhost:3001/auth/register",
        payload
      );

      onSave(res.data);
      setForm({
        nombre: "",
        correo: "",
        rol: "cliente",
        clave_secreta: "",
        contraseña: "",
      });
      onClose();
    } catch (error) {
      console.error(
        "Error al crear usuario:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error al crear usuario");
    }
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
                  Crear Usuario
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Complete los datos del nuevo usuario
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
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-3 py-1 border-b border-gray-300 border-0 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
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
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3 py-1 border-b border-gray-300 border-0 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
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
                    className="w-full px-3 py-1 border-b border-gray-300 border-0 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                  >
                    <option value="cliente">Gasera</option>
                    <option value="admin">Superadmin</option>
                  </select>
                </div>
              </motion.div>

              {form.rol === "cliente" && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="p-2 bg-red-100 rounded-full text-red-600">
                    <Key size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500">Clave secreta</p>
                    <input
                      name="clave_secreta"
                      value={form.clave_secreta}
                      onChange={handleChange}
                      required
                      placeholder="Clave secreta de acceso"
                      className="w-full px-3 py-1 border-b border-gray-300 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-red-100 rounded-full text-red-600">
                  <Key size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-500">Contraseña</p>
                  <div className="relative">
                    <input
                      name="contraseña"
                      type={showPassword ? "text" : "password"}
                      value={form.contraseña}
                      onChange={handleChange}
                      placeholder="Opcional: 12345678 por defecto"
                      className="w-full px-3 py-1 border-b border-gray-300 border-0 bg-transparent focus:border-red-500 focus:outline-none text-sm font-medium text-gray-900 pr-8"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Footer con acciones */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
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