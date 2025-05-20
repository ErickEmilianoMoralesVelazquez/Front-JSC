import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Eye, DollarSign } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

const badgeColor = {
  pendiente: "bg-yellow-100 text-yellow-700",
  aceptado: "bg-green-100 text-green-700",
  rechazado: "bg-red-100 text-red-700",
  cotizado: "bg-blue-100 text-blue-700",
};

export default function PaymentsTable() {
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [montoAPagar, setMontoAPagar] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/users/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener usuarios");

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error al cargar los usuarios");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener pedidos");

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error al cargar los pedidos");
    }
  };

  const handleRegisterPayment = async () => {
    try {
      if (!montoAPagar || montoAPagar <= 0) {
        toast.error("Por favor ingresa un monto válido");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/payments/${selectedOrderId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ monto: parseFloat(montoAPagar) }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al registrar el pago");
      }

      toast.success("Pago registrado exitosamente");
      setIsModalOpen(false);
      setMontoAPagar("");
      setSelectedOrderId(null);
      fetchOrders();
    } catch (error) {
      console.error("Error registering payment:", error);
      toast.error(error.message || "Error al registrar el pago");
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.id
        .toString()
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesClient = selectedClient
        ? order.usuario?.nombre === selectedClient
        : true;
      return matchesSearch && matchesClient;
    });
  }, [searchText, selectedClient, orders]);

  const uniqueClients = useMemo(() => {
    const clients = [
      ...new Set(orders.map((order) => order.usuario?.nombre).filter(Boolean)),
    ];
    return clients.sort();
  }, [orders]);

  const columns = [
    {
      name: "ID Pedido",
      selector: (row) => row.Envio?.Order?.id || row.envio_id,
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => {
        const userId = row.Envio?.Order?.usuario_id;
        const user = users.find((u) => u.id === userId);
        return user?.nombre || "Sin cliente";
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) =>
        new Date(row.fecha_creacion).toLocaleDateString("es-MX"),
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            badgeColor[row.estado] || "bg-gray-100 text-gray-700"
          }`}
        >
          {row.estado.toUpperCase()}
        </span>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex items-center gap-3">
          {/* <Eye
            className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110 transition"
            onClick={() => window.open(row.archivo_url, "_blank")}
            title="Ver pedido"
          /> */}
          {row.estado === "pendiente" && (
            <button
              onClick={() => {
                setSelectedOrderId(row.id);
                setMontoAPagar(row.monto_total || ""); // solo si lo tienes
                setIsModalOpen(true);
              }}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              title="Registrar pago"
            >
              <DollarSign className="w-3 h-3" />
              Pagado
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Gestión de Pagos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por ID de pedido..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm"
        />

        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm"
        >
          <option value="">Todos los clientes</option>
          {uniqueClients.map((client) => (
            <option key={client} value={client}>
              {client}
            </option>
          ))}
        </select>
      </div>

      {/* Modal de Registro de Pago */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Registrar Pago</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto del pago
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={montoAPagar}
                  onChange={(e) => setMontoAPagar(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border rounded-md"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setMontoAPagar("");
                  setSelectedOrderId(null);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegisterPayment}
                className="px-4 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Confirmar Pago
              </button>
            </div>
          </div>
        </div>
      )}

      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
}