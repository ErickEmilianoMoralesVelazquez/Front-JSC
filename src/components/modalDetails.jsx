
import React from "react";

export default function ModalDetails({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Detalle de Cotización</h2>
        <div className="text-sm space-y-2">
          <p><strong>ID:</strong> {data?.id}</p>
          <p><strong>Fecha:</strong> {data?.fecha}</p>
          <p><strong>Total:</strong> {data?.total}</p>
          <p><strong>Estatus:</strong> {data?.estatus}</p>
          {/* Puedes añadir más detalles aquí */}
        </div>
      </div>
    </div>
  );
}
