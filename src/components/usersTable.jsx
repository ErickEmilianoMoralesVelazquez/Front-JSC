import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Eye, Pencil, Trash2, Plus } from "lucide-react";
import ModalCreateUser from "./modalCreateUser";
import ModalEditUser from "./modalEditUser";
import ModalViewUser from "./modalViewUser";

const initialUsers = [
  {
    id: 1,
    nombre: "Aldair Vargas",
    email: "aldair@example.com",
    rol: "Superadmin",
    fechaRegistro: "2023-04-01",
  },
  {
    id: 2,
    nombre: "Erick Mendoza",
    email: "erick@example.com",
    rol: "Representante Gasera",
    fechaRegistro: "2023-04-05",
  },
];

export default function UsersTable() {
  const [users, setUsers] = useState(initialUsers);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      sortable: true,
    },
    {
      name: "Registrado",
      selector: (row) => row.fechaRegistro,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Eye
            className="w-4 h-4 text-blue-500 cursor-pointer"
            onClick={() => {
              setSelectedUser(row);
              setModalViewOpen(true);
            }}
          />
          <Pencil
            className="w-4 h-4 text-yellow-500 cursor-pointer"
            onClick={() => {
              setSelectedUser(row);
              setModalEditOpen(true);
            }}
          />
          <Trash2
            className="w-4 h-4 text-red-500 cursor-pointer"
            onClick={() => setConfirmDeleteId(row.id)}
          />
        </div>
      ),
    },
  ];

  const handleCreate = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setModalCreateOpen(false);
  };

  const handleEdit = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setModalEditOpen(false);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
        <button
          onClick={() => setModalCreateOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Crear usuario
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        pagination
        paginationComponentOptions={{ rowsPerPageText: "Filas por página", rangeSeparatorText: "de" }}
        highlightOnHover
        responsive
        striped
      />

      <ModalCreateUser isOpen={modalCreateOpen} onClose={() => setModalCreateOpen(false)} onSave={handleCreate} />
      <ModalEditUser isOpen={modalEditOpen} onClose={() => setModalEditOpen(false)} user={selectedUser} onSave={handleEdit} />
      <ModalViewUser isOpen={modalViewOpen} onClose={() => setModalViewOpen(false)} user={selectedUser} />

      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-4">¿Eliminar usuario?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 bg-gray-200 rounded-md">
                Cancelar
              </button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
