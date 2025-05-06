import React, { useState } from "react";

export default function ModalCreateInvoice({ isOpen, onClose, onSave }) {
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Nueva Factura o Remisión</h2>
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
            const newInvoice = {
              documento: form.documento.value,
              clienteId: form.cliente.value,
              pedidoId: form.pedido.value,
              archivo: form.archivo.files[0],
            };
            onSave(newInvoice);
            setFileName("");
            form.reset();
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Nombre del documento</label>
            <input
              type="text"
              name="documento"
              required
              placeholder="Ej. FAC-2025-005.pdf"
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <select
              name="cliente"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            >
              <option value="">Selecciona un cliente</option>
              <option value="1">Cliente 1</option>
              <option value="2">Cliente 2</option>
              <option value="3">Cliente 3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Pedido relacionado</label>
            <select
              name="pedido"
              required
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            >
              <option value="">Selecciona un pedido</option>
              <option value="101">Pedido 101</option>
              <option value="102">Pedido 102</option>
              <option value="103">Pedido 103</option>
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
