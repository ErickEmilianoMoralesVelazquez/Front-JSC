import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.vfs;

const Cotizacion = () => {
  const datos = {
    folio: "VT-COT0082-130325",
    fecha: "14/03/2025",
    validoHasta: "14/04/2025",
    moneda: "MXN",
    clienteId: "1955",
    nombreCliente: "FERNANDO CRIOLLO // LIC. CRESCENCIO",
    compania: "GAS URBANO // COBAMA",
    email: "admin@gasurbano.com.mx",
    productos: [
      { codigo: "779904", descripcion: "BUJIA ESTANDAR SILVERADO", presentacion: "PIEZA", disponibilidad: "PEDIDO", cantidad: 24, precio: 58.0, subtotal: 1392.0 },
      { codigo: "C-7971", descripcion: "FILTRO DE ACEITE", presentacion: "PIEZA", disponibilidad: "EXISTENCIA", cantidad: 3, precio: 71.55, subtotal: 214.65 },
      { codigo: "A-6523", descripcion: "FILTRO DE AIRE", presentacion: "PIEZA", disponibilidad: "EXISTENCIA", cantidad: 3, precio: 180.31, subtotal: 540.92 },
    ],
    subtotal: 2147.57,
    iva: 343.61,
    total: 2491.18,
  };

  const base64Background = ""; // 🔥 Aquí debes pegar tu base64 real largo

  const handleDownloadPDF = () => {
    const docDefinition = {
      pageSize: 'A4',
      background: [
        {
          image: base64Background,
          width: 595,
          height: 842
        }
      ],
      content: [
        {
          absolutePosition: { x: 40, y: 90 },
          text: [
            { text: `Cliente ID: ${datos.clienteId}\n`, fontSize: 9 },
            { text: `Nombre: ${datos.nombreCliente}\n`, fontSize: 9 },
            { text: `Compañía: ${datos.compania}\n`, fontSize: 9 },
            { text: `Email: ${datos.email}\n`, fontSize: 9 }
          ]
        },
        {
          absolutePosition: { x: 450, y: 90 },
          text: [
            { text: `FOLIO: ${datos.folio}\n`, bold: true, fontSize: 9 },
            { text: `FECHA: ${datos.fecha}\n`, fontSize: 9 },
            { text: `VÁLIDO HASTA: ${datos.validoHasta}\n`, fontSize: 9 },
            { text: `MONEDA: ${datos.moneda}\n`, fontSize: 9 }
          ]
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Clave', style: 'tableHeader' },
                { text: 'Descripción', style: 'tableHeader' },
                { text: 'Presentación', style: 'tableHeader' },
                { text: 'Disponibilidad', style: 'tableHeader' },
                { text: 'Q', style: 'tableHeader' },
                { text: 'P. Unitario', style: 'tableHeader' },
                { text: 'Total Partida', style: 'tableHeader' }
              ],
              ...datos.productos.map(item => ([
                item.codigo,
                item.descripcion,
                item.presentacion,
                item.disponibilidad,
                item.cantidad,
                `$${item.precio.toFixed(2)}`,
                `$${item.subtotal.toFixed(2)}`
              ]))
            ]
          },
          layout: 'lightHorizontalLines',
          margin: [0, 200, 0, 0]
        },
        {
          absolutePosition: { x: 400, y: 700 },
          table: {
            body: [
              ['Subtotal', `$${datos.subtotal.toFixed(2)}`],
              ['IVA', `$${datos.iva.toFixed(2)}`],
              [{ text: 'Total', bold: true }, { text: `$${datos.total.toFixed(2)}`, bold: true }]
            ]
          },
          layout: 'noBorders'
        }
      ],
      styles: {
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black'
        }
      }
    };

    pdfMake.createPdf(docDefinition).download(`${datos.folio}.pdf`);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={handleDownloadPDF}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
      >
        Descargar PDF
      </button>
    </div>
  );
};

export default Cotizacion;