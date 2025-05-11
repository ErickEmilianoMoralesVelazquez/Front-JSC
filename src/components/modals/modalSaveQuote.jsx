import React, { useState, useEffect } from "react";

export default function ModalSaveQuote({ isOpen, onClose, onSave }) {
  const [fileName, setFileName] = useState("");
  const [archivoTipo, setArchivoTipo] = useState("");
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedClienteId, setSelectedClienteId] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchClientes();
      setPedidos([]);
      setSelectedClienteId("");
      setFileName("");
      setArchivoTipo("");
    }
  }, [isOpen]);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Error al obtener clientes");

      const data = await res.json();
      const soloClientes = data.filter((u) => u.rol === "cliente");
      setClientes(soloClientes);
    } catch (err) {
      console.error("Error al obtener clientes:", err);
      setClientes([]);
    }
  };

  const fetchPedidosByCliente = async (clienteId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3001/orders/by-client/${clienteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      const pendientes = data.filter((p) => p.estado === "pendiente");
      setPedidos(pendientes);
    } catch (err) {
      console.error("Error al obtener pedidos del cliente:", err);
    }
  };

  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    setSelectedClienteId(clienteId);
    if (clienteId) fetchPedidosByCliente(clienteId);
    else setPedidos([]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const type = file.type;
    if (type === "application/pdf") {
      setArchivoTipo("pdf");
    } else if (type === "application/xml" || type === "text/xml") {
      setArchivoTipo("xml");
    } else {
      alert("Solo se permiten archivos PDF o XML");
      e.target.value = "";
      setArchivoTipo("");
      return;
    }

    setFileName(file.name);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Nueva Cotización</h2>
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
            const newQuote = {
              clienteId: form.cliente.value,
              pedidoId: form.pedido.value,
              archivo: form.archivo.files[0],
              tipoArchivo: archivoTipo,
            };
            onSave(newQuote);
            setFileName("");
            onClose();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Cliente</label>
            <select
              name="cliente"
              required
              value={selectedClienteId}
              onChange={handleClienteChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            >
              <option value="">Selecciona un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre || cliente.correo || `ID ${cliente.id}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Pedido pendiente</label>
            <select
              name="pedido"
              required
              disabled={!selectedClienteId}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md text-sm"
            >
              <option value="">Selecciona un pedido</option>
              {pedidos.map((pedido) => (
                <option key={pedido.id} value={pedido.id}>
                  Pedido #{pedido.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Archivo (PDF o XML)
            </label>
            <input
              type="file"
              name="archivo"
              accept=".pdf,.xml"
              required
              onChange={handleFileChange}
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
