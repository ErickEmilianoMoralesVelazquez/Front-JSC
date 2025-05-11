import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Eye, Pencil, Plus, Trash2, AlertTriangle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ModalCreateUser from "../modals/modalCreateUser";
import ModalEditUser from "../modals/modalEditUser";
import ModalViewUser from "../modals/modalViewUser";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "—";
    const date = new Date(isoDate);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Solo usuarios activos (estado === true)
      const activeUsers = res.data.filter((user) => user.estado === "activo");
      setUsers(activeUsers);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3001/users/${confirmDeleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers((prev) => prev.filter((u) => u.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("No se pudo eliminar el usuario.");
    }
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || row.correo,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      sortable: true,
    },
    {
      name: "Registrado",
      selector: (row) => formatDate(row.fecha_creacion),
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
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        highlightOnHover
        responsive
        striped
      />

      <ModalCreateUser
        isOpen={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onSave={handleCreate}
      />
      <ModalEditUser
        isOpen={modalEditOpen}
        onClose={() => setModalEditOpen(false)}
        user={selectedUser}
        onSave={handleEdit}
      />
      <ModalViewUser
        isOpen={modalViewOpen}
        onClose={() => setModalViewOpen(false)}
        user={selectedUser}
      />

      <AnimatePresence>
        {confirmDeleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-100 relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-full text-red-600">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Confirmar eliminación
                  </h3>
                </div>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Cerrar modal"
                >
                  <X className="text-gray-500 hover:text-gray-700" size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className="text-red-500 mt-0.5 flex-shrink-0"
                      size={16}
                    />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        ¿Estás seguro de eliminar este usuario?
                      </p>
                      <p className="text-sm text-red-700 mt-1">
                        Esta acción es permanente y no se puede deshacer. Todos
                        los datos asociados se perderán.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-3"
              >
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Trash2 size={16} />
                  Eliminar definitivamente
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
