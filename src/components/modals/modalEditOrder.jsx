import React, { useState, useEffect } from "react";

export default function ModalEditOrder({ isOpen, onClose, onSave, order }) {
  const [form, setForm] = useState({ id: "", fecha: "", total: "" });
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (order) setForm(order);
  }, [order]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.id.trim()) newErrors.id = "El ID es requerido";
    if (!form.fecha || form.fecha < today) newErrors.fecha = "Fecha inválida";
    if (!form.total.trim() || isNaN(form.total) || parseFloat(form.total) <= 0)
      newErrors.total = "Total debe ser un número positivo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({ ...form });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h3 className="text-lg font-semibold mb-4">Editar pedido</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="id"
              value={form.id}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.id ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm`}
              placeholder="ID del pedido"
              required
            />
            {errors.id && <p className="text-red-500 text-xs">{errors.id}</p>}
          </div>
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
            {errors.fecha && <p className="text-red-500 text-xs">{errors.fecha}</p>}
          </div>
          <div>
            <input
              type="number"
              name="total"
              value={form.total}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={`w-full px-4 py-2 border ${
                errors.total ? "border-red-500" : "border-gray-300"
              } rounded-md text-sm`}
              placeholder="$ Monto total"
              required
            />
            {errors.total && <p className="text-red-500 text-xs">{errors.total}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
