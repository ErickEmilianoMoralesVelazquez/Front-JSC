import React from "react";

const steps = [
  {
    number: 1,
    title: "Pedido",
    description: "Generas un pedido acorde a tus necesidades.",
  },
  {
    number: 2,
    title: "Cotización",
    description: "Enviamos una cotización sobre tu pedido solicitado.",
  },
  {
    number: 3,
    title: "Pago",
    description: "Establece tu fecha aproximado de pago.",
  },
  {
    number: 4,
    title: "Entrega",
    description: "Enviamos tu pedido y solo recibes en tu dirección.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="w-full py-12 px-6 flex flex-col items-center justify-center md:mt-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full max-w-6xl text-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center px-4"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full text-xl font-semibold mb-6 shadow-md ">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-900 text-base">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
