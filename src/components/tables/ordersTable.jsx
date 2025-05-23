import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const badgeColors = {
  pendiente: "bg-yellow-100 text-yellow-700",
  aceptado: "bg-green-100 text-green-700",
  rechazado: "bg-red-100 text-red-700",
  cotizado: "bg-green-100 text-green-700",
};

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3001/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  // Filtro por estado y fechas
  useEffect(() => {
    let data = [...orders];

    if (estadoFilter) {
      data = data.filter((order) => order.estado === estadoFilter);
    }

    if (fechaDesde) {
      data = data.filter(
        (order) => new Date(order.fecha_creacion) >= new Date(fechaDesde)
      );
    }

    if (fechaHasta) {
      data = data.filter(
        (order) => new Date(order.fecha_creacion) <= new Date(fechaHasta)
      );
    }

    setFilteredOrders(data);
  }, [estadoFilter, fechaDesde, fechaHasta, orders]);

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { 
      name: "Usuario",
      selector: (row) => row.usuario?.nombre || row.nombre || `Usuario ${row.usuario_id}`,
      sortable: true 
    },
    {
      name: "Fecha de creación",
      selector: (row) =>
        new Date(row.fecha_creacion).toLocaleDateString("es-MX"),
    },
    {
      name: "Estado",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            badgeColors[row.estado] || "bg-gray-100 text-gray-700"
          }`}
        >
          {row.estado.toUpperCase()}
        </span>
      ),
    },
    {
      name: "Fecha actualización",
      selector: (row) =>
        new Date(row.fecha_actualizacion).toLocaleDateString("es-MX"),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => window.open(row.archivo_url, "_blank")}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-blue-700 transition"
          title="Ver PDF"
        >
          Ver PDF
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Pedidos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="completado">Completado</option>
          <option value="rechazado">Rechazado</option>
          <option value="cotizado">Cotizado</option>
        </select>

        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm"
        />

        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
}
