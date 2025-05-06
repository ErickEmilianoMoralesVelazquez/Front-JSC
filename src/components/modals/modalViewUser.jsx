import React from "react";

export default function ModalViewUser({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-bold mb-4">Detalle del Usuario</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.rol}</p>
          <p><strong>Fecha de registro:</strong> {user.fechaRegistro}</p>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
