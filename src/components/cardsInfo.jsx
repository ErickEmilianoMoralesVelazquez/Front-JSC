import React from "react";
import {
  ClipboardList,
  CreditCard,
  Truck,
  BarChart2,
  Clock,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    title: "Gestión de pedidos",
    description:
      "Digitaliza todo el proceso de pedidos desde la solicitud hasta la entrega.",
    icon: <ClipboardList className="text-white w-6 h-6" />,
  },
  {
    title: "Pagos simplificados",
    description: "Flexibilidad de pagos además de facturación.",
    icon: <CreditCard className="text-white w-6 h-6" />,
  },
  {
    title: "Logística y entregas",
    description: "Seguimiento de envíos y optimización de estatus por pedido.",
    icon: <Truck className="text-white w-6 h-6" />,
  },
  {
    title: "Análisis de datos",
    description:
      "Informes detallados y métricas para tomar mejores decisiones.",
    icon: <BarChart2 className="text-white w-6 h-6" />,
  },
  {
    title: "Control en cualquier momento",
    description:
      "Monitoreo constante de todos los procesos desde cualquier dispositivo.",
    icon: <Clock className="text-white w-6 h-6" />,
  },
  {
    title: "Trazabilidad completa",
    description:
      "Historial detallado de cada transacción y acción en el sistema.",
    icon: <CheckCircle className="text-white w-6 h-6" />,
  },
];

export default function CardsInfo() {
  return (
    <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 py-10">
      {features.map((item, idx) => (
        <div
          key={idx}
          className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <div className="flex justify-center">
            <div className="bg-red-600 p-3 rounded-full mb-4">{item.icon}</div>
          </div>
          <h3 className="text-center font-bold text-lg mb-2">{item.title}</h3>
          <p className="text-center text-sm text-gray-600">
            {item.description}
          </p>
        </div>
      ))}
    </section>
  );
}
