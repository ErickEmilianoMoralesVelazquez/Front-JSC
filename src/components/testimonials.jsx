import React from "react";

const testimonials = [
  {
    quote:
      "Hemos reducido los tiempos de procesamiento de pedidos en un 70% y mejorado la satisfacción de nuestros clientes.",
    name: "Erick Morales",
    role: "Director de Operaciones"
  },
  {
    quote:
      "Hemos reducido los tiempos de procesamiento de pedidos en un 70% y mejorado la satisfacción de nuestros clientes.",
    name: "Erick Morales",
    role: "Director de Operaciones"
  },
  {
    quote:
      "Hemos reducido los tiempos de procesamiento de pedidos en un 70% y mejorado la satisfacción de nuestros clientes.",
    name: "Erick Morales",
    role: "Director de Operaciones"
  }
];

export default function Testimonials() {
  return (
    <section className="w-full py-10 px-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl w-full">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="border rounded-lg p-6 text-left bg-white shadow-sm hover:shadow-md transition"
          >
            <p className="italic text-gray-600 mb-6">“{t.quote}”</p>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300" />
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
