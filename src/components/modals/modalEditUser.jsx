import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function ModalEditUser({ isOpen, onClose, user = {}, onSave }) {
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    correo: "",
    rol: "Gasera",
    fechaRegistro: "", // <-- importante para no perderlo
  });

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || "",
        nombre: user.nombre || "",
        correo: user.email || "", // asegúrate de usar el mismo campo
        rol: user.rol || "Gasera",
        fechaRegistro: user.fechaRegistro || "", // conservarlo
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, email: form.correo }); // por si usas "email" en el resto del sistema
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-lg font-semibold mb-4">
            Editar Usuario
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Correo</label>
              <input
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Rol</label>
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-red-500"
              >
                <option value="Gasera">Gasera</option>
                <option value="Superadmin">Superadmin</option>
                <option value="Representante Gasera">Representante Gasera</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
              >
                Actualizar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
