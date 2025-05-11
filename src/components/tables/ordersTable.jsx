import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

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
    { name: "Usuario ID", selector: (row) => row.usuario_id },
    {
      name: "Fecha de creación",
      selector: (row) =>
        new Date(row.fecha_creacion).toLocaleDateString("es-MX"),
    },
    { name: "Estado", selector: (row) => row.estado },
    {
      name: "Fecha actualización",
      selector: (row) =>
        new Date(row.fecha_actualizacion).toLocaleDateString("es-MX"),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => {
            const baseUrl = "http://localhost:3001";
            const pdfPath = row.archivo_pdf.startsWith("/")
              ? row.archivo_pdf
              : `/${row.archivo_pdf}`;
            window.open(`${baseUrl}${pdfPath}`, "_blank");
          }}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
