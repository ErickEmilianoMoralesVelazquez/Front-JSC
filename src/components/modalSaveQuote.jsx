import React, { useState } from "react";

export default function ModalSaveQuote({ isOpen, onClose, onSave }) {
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Nueva Cotización</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const newQuote = {
              cliente: form.cliente.value,
              fecha: form.fecha.value,
              total: form.total.value,
              estatus: form.estatus.value,
              archivo: form.archivo.files[0],
            };
            onSave(newQuote);
            setFileName("");
            form.reset();
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <input
              type="text"
              name="cliente"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              name="fecha"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Total</label>
            <input
              type="number"
              name="total"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Estatus</label>
            <select
              name="estatus"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            >
              <option value="">Selecciona</option>
              <option value="Completado">Completado</option>
              <option value="En proceso">En proceso</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Archivo (PDF/XML)</label>
            <input
              type="file"
              name="archivo"
              accept=".pdf,.xml"
              onChange={(e) =>
                setFileName(e.target.files[0] ? e.target.files[0].name : "")
              }
              className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer
              file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold
              file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            {fileName && (
              <p className="text-xs text-gray-500 mt-1">
                Archivo cargado: <strong>{fileName}</strong>
              </p>
            )}
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
