import React, { useState } from "react";

export default function ModalCreateOrder({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    id: "",
    fecha: "",
    total: "",
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.id.trim()) newErrors.id = "El ID es requerido";

    if (!form.fecha) {
      newErrors.fecha = "La fecha es requerida";
    } else if (form.fecha < today) {
      newErrors.fecha = "La fecha no puede ser anterior a hoy";
    }

    if (!form.total.trim()) {
      newErrors.total = "El total es requerido";
    } else if (isNaN(form.total) || parseFloat(form.total) <= 0) {
      newErrors.total = "Debe ser un número positivo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onCreate({
        ...form,
        estatus: "Pendiente",
        color: "yellow",
      });
      setForm({ id: "", fecha: "", total: "" });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Nuevo pedido</h3>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ID del pedido */}
          <div>
            <input
              type="text"
              name="id"
              placeholder="ID del pedido"
              value={form.id}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.id ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm`}
              required
            />
            {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id}</p>}
          </div>

          {/* Fecha */}
          <div>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              min={today}
              className={`w-full px-4 py-2 border ${
                errors.fecha ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm`}
              required
            />
            {errors.fecha && <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>}
          </div>

          {/* Total */}
          <div>
            <input
              type="number"
              name="total"
              placeholder="$ Monto total"
              value={form.total}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border ${
                errors.total ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm`}
              required
            />
            {errors.total && <p className="text-red-500 text-xs mt-1">{errors.total}</p>}
          </div>

          {/* Estado oculto */}
          <input type="hidden" name="estatus" value="Pendiente" />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Crear pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
