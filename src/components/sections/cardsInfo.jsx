import React from "react";

const cards = [
  {
    img: "/images/Icono1.png",
    title: "GESTIÓN DE PEDIDOS",
    desc: "Digitaliza todo el proceso de pedidos desde la solicitud hasta la entrega.",
  },
  {
    img: "/images/Icono2.png",
    title: "PAGOS SIMPLIFICADOS",
    desc: "Flexibilidad de pagos además de facturación.",
  },
  {
    img: "/images/Icono3.png",
    title: "LOGÍSTICA Y ENTREGAS",
    desc: "Seguimiento de envíos y optimización de estatus por pedido.",
  },
  {
    img: "/images/Icono4.png",
    title: "ANÁLISIS DE DATOS",
    desc: "Informes detallados y métricas para tomar mejores decisiones.",
  },
  {
    img: "/images/Icono5.png",
    title: "CONTROL EN CUALQUIER MOMENTO",
    desc: "Monitoreo constante de todos los procesos desde cualquier dispositivo.",
  },
  {
    img: "/images/Icono6.png",
    title: "TRAZABILIDAD COMPLETA",
    desc: "Historial detallado de cada transacción y acción en el sistema.",
  },
];

export default function CardsInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto mt-10">
      {cards.map((card, index) => (
        <div key={index} className="flex flex-col items-center text-center relative">
          <img src={card.img} alt={card.title} className="w-40 h-37 mb-4 z-10" />
          <div className="bg-whit  p-4 pt-6 -mt-6 w-full max-w-xs">
            <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-t-xl text-center font-bold text-sm text-gray-800 py-2">
              {card.title}
            </div>
            <div className="bg-white py-2 rounded-b-xl shadow-lg px-2">
            <p className="mt-2 text-sm font-semibold text-gray-800">{card.desc}</p>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
