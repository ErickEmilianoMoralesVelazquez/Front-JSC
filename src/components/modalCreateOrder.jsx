import React, { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import RequisitionPDF from "./requisitionPdf";

export default function ModalCreateOrder({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({
    id: "",
    fecha: "",
    indicaciones: "",
    items: [],
  });

  const [item, setItem] = useState({ nombre: "", cantidad: "" });
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!item.nombre.trim() || !item.cantidad || isNaN(item.cantidad)) return;
    setForm({
      ...form,
      items: [...form.items, { ...item }],
    });
    setItem({ nombre: "", cantidad: "" });
  };

  const removeItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.id.trim()) newErrors.id = "El ID es requerido";
    if (!form.fecha) {
      newErrors.fecha = "La fecha es requerida";
    } else if (form.fecha < today) {
      newErrors.fecha = "La fecha no puede ser anterior a hoy";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      onCreate({
        ...form,
        estatus: "Pendiente",
        color: "yellow",
      });

      // ⬇️ Generar y descargar PDF al crear
      const blob = await pdf(<RequisitionPDF form={form} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pedido-${form.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Resetear el formulario y cerrar modal
      setForm({ id: "", fecha: "", indicaciones: "", items: [] });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-xl">
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
            {errors.id && (
              <p className="text-red-500 text-xs mt-1">{errors.id}</p>
            )}
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
            {errors.fecha && (
              <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>
            )}
          </div>

          {/* Indicaciones de facturación */}
          <div>
            <textarea
              name="indicaciones"
              placeholder="Indicaciones de facturación"
              value={form.indicaciones}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>

          {/* Items */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Agregar items
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del item"
                value={item.nombre}
                onChange={handleItemChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={item.cantidad}
                onChange={handleItemChange}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <button
                type="button"
                onClick={addItem}
                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
              >
                Agregar
              </button>
            </div>
            {form.items.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {form.items.map((it, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded-md"
                  >
                    <span>
                      {it.nombre} - {it.cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-500 text-xs"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

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
