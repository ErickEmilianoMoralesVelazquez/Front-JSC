import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

export default function ModalCreateUser({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    // asignar fecha actual
    fechaRegistro: new Date().toISOString().split("T")[0],
    rol: "Gasera",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoUsuario = {
      id: Date.now(),
      nombre: form.nombre,
      correo: form.correo,
      email: form.correo, // 👈 necesario para que el campo "email" se use en la tabla
      rol: form.rol,
      fechaRegistro: new Date().toISOString().split("T")[0],
    };
    onSave(nuevoUsuario);
    setForm({ nombre: "", correo: "", rol: "Gasera" });
    onClose();
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-lg font-semibold mb-4">
            Crear Usuario
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
                placeholder="Ej. Juan Pérez"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                placeholder="ejemplo@correo.com"
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Rol</label>
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="Gasera">Gasera</option>
                <option value="Superadmin">Superadmin</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
              >
                Guardar
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
