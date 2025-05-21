import React, { useState, useMemo, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Download, Printer, Pencil } from "lucide-react";
import ModalCreateInvoice from "../modals/modalSaveInvoice";
import { toast } from "react-toastify";

const badgeColor = {
  pendiente: "bg-yellow-100 text-yellow-700",
  emitida: "bg-blue-100 text-blue-700",
  pagada: "bg-green-100 text-green-700",
  cancelada: "bg-red-100 text-red-700",
};

export default function InvoicesTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClient, setSelectedClient] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchInvoices();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}users/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      toast.error("Error al cargar los usuarios");
    }
  };

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al cargar facturas");

      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Error al cargar las facturas");
    }
  };

  const handleSave = async (newInvoice) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("pedido_id", newInvoice.pedidoId);
      formData.append("pago_id", newInvoice.pagoId);

      if (newInvoice.archivo.type === "application/pdf") {
        formData.append("factura_pdf", newInvoice.archivo);
      } else if (newInvoice.archivo.type === "text/xml") {
        formData.append("factura_xml", newInvoice.archivo);
      }

      const response = await fetch(`${import.meta.env.VITE_URL_BACKEND}invoices`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al crear la factura");
      }

      toast.success("Factura creada exitosamente");
      fetchInvoices();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating invoice:", error);
      toast.error(error.message || "Error al crear la factura");
    }
  };

  const pedidosCotizados = useMemo(() => {
    return invoices.map((inv) => inv.pedido_id);
  }, [invoices]);

  const pagosUtilizados = useMemo(() => {
    return invoices.map((inv) => inv.pago_id).filter(Boolean);
  }, [invoices]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        (inv.Order?.archivo_pdf?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        String(inv.pedido_id).includes(searchText);

      const matchesStatus = selectedStatus
        ? inv.estado === selectedStatus
        : true;

      const matchesClient = selectedClient
        ? inv.Order?.usuario_id === parseInt(selectedClient)
        : true;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [searchText, selectedStatus, selectedClient, invoices]);

  const columns = [
    {
      name: "Documento",
      selector: (row) =>
        row.Order?.archivo_pdf?.split("/").pop() || "Sin documento",
      cell: (row) => (
        <button
          onClick={() =>
            row.Order?.archivo_url &&
            window.open(row.Order.archivo_url, "_blank")
          }
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
          title="Ver PDF del pedido"
          disabled={!row.Order?.archivo_url}
        >
          <span>Ver Pedido</span>
        </button>
      ),
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => {
        const user = users.find((u) => u.id === row.Order?.usuario_id);
        return (
          user?.nombre ||
          user?.correo ||
          `Usuario ${row.Order?.usuario_id}` ||
          "Sin cliente"
        );
      },
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => new Date(row.fecha_subida).toLocaleDateString("es-MX"),
      sortable: true,
    },
    {
      name: "Factura",
      selector: (row) => row.url?.split("/").pop() || "Sin archivo",
      cell: (row) => (
        <button
          onClick={() =>
            row.archivo_url && window.open(row.archivo_url, "_blank")
          }
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition flex items-center gap-2"
          title="Ver Factura"
          disabled={!row.archivo_url}
        >
          <span>Ver Factura</span>
        </button>
      ),
      sortable: true,
    },
    {
      name: "Pedido",
      selector: (row) => `#${row.pedido_id}`,
      sortable: true,
    },
    {
      name: "Fecha Emisión",
      selector: (row) =>
        new Date(row.fecha_creacion).toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sortable: true,
    },
    {
      name: "Estado Factura",
      cell: (row) => (
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            badgeColor[row.estado]
          }`}
        >
          {row.estado.toUpperCase()}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Estado Pago",
      cell: (row) => (
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            badgeColor[row.Payment?.estado || "pendiente"]
          }`}
        >
          {(row.Payment?.estado || "PENDIENTE").toUpperCase()}
        </span>
      ),
      sortable: true,
    },
    // {
    //   name: "Acciones",
    //   cell: (row) => (
    //     <div className="flex items-center gap-3">
    //       <Printer onClick={() => handlePrint(row)} />
    //       <Download onClick={() => handleDownload(row)} />
    //       <Pencil onClick={() => handleEdit(row)} />
    //     </div>
    //   ),
    // },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => user.rol === 'cliente');
  }, [users]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold">Gestión de Facturas</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
        >
          <span className="text-lg font-bold">+</span> Nueva Factura
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por documento o pedido..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        >
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="emitida">Emitida</option>
          <option value="pagada">Pagada</option>
          <option value="cancelada">Cancelada</option>
        </select>

        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm w-full"
        >
          <option value="">Todos los clientes</option>
          {filteredUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombre || user.correo || `Usuario ${user.id}`}
            </option>
          ))}
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filteredInvoices}
        pagination
        highlightOnHover
        responsive
        striped
      />

      <ModalCreateInvoice
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        pedidosCotizados={pedidosCotizados}
        pagosUtilizados={pagosUtilizados}
      />
    </div>
  );
}