import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import ModalSaveQuote from "../modals/modalSaveQuote";
import { FilePlus, Eye } from "lucide-react";

const badgeColors = {
  pendiente: "bg-yellow-100 text-yellow-700",
  aceptada: "bg-green-100 text-green-700",
  rechazada: "bg-red-100 text-red-700",
};

export default function QuotesTable() {
  const [quotes, setQuotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/quotations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener cotizaciones");

      const data = await res.json();

      const mapped = data.map((quote) => ({
        id: quote.id,
        clienteNombre: quote.Order?.usuario?.nombre || quote.Order?.usuario?.correo || `ID ${quote.pedido_id}`,
        pedidoId: quote.pedido_id,
        estado: quote.estado,
        archivoUrl: quote.archivo_cotizacion || "",
        fecha: new Date(quote.fecha_creacion).toLocaleDateString("es-MX"),
      }));

      setQuotes(mapped);
    } catch (error) {
      console.error("Error al cargar cotizaciones:", error);
    }
  };

  const handleSaveQuote = async (newQuote) => {
    try {
      const formData = new FormData();
      if (newQuote.tipoArchivo === "pdf") {
        formData.append("documento_pdf", newQuote.archivo);
      } else if (newQuote.tipoArchivo === "xml") {
        formData.append("documento_xml", newQuote.archivo);
      } else {
        alert("Tipo de archivo no válido.");
        return;
      }

      formData.append("pedido_id", newQuote.pedidoId);
      formData.append("monto", "0");
      formData.append("descripcion", "Cotización generada por admin");

      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/quotations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir cotización");

      const { quotation } = await res.json();

      const newEntry = {
        id: quotation.id,
        clienteNombre: newQuote.clienteNombre,
        pedidoId: newQuote.pedidoId,
        archivoUrl: quotation.documento_url,
        fecha: new Date().toLocaleDateString("es-MX"),
      };

      setQuotes((prev) => [...prev, newEntry]);
    } catch (error) {
      console.error("Error al guardar cotización:", error);
      alert("No se pudo guardar la cotización.");
    }
  };

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) =>
      q.pedidoId.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, quotes]);

  const columns = [
    { name: "ID Cotización", selector: (row) => row.id, sortable: true },
    { name: "Cliente", selector: (row) => row.clienteNombre },
    { name: "Pedido", selector: (row) => row.pedidoId },
    {
      name: "Estado",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            badgeColors[row.estado] || "bg-gray-100 text-gray-700"
          }`}
        >
          {row.estado}
        </span>
      ),
    },
    { name: "Fecha", selector: (row) => row.fecha },
    {
      name: "Acciones",
      cell: (row) => (
        <Eye
          onClick={() => window.open(row.archivoUrl, "_blank")}
          className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer"
          title="Ver cotización"
        />
      ),
      ignoreRowClick: true,
      center: true,
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Cotizaciones</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md flex items-center gap-2"
        >
          <FilePlus size={16} />
          Nueva cotización
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar por ID de pedido..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
      />

      <DataTable
        columns={columns}
        data={filteredQuotes}
        pagination
        highlightOnHover
        responsive
        striped
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página",
          rangeSeparatorText: "de",
        }}
      />

      <ModalSaveQuote
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuote}
      />
    </div>
  );
}
