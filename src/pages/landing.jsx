import React from "react";
import Carousel from "../components/carousel";
import CardsInfo from "../components/cardsInfo";
import ProcessSteps from "../components/processSteps";
import Testimonials from "../components/testimonials";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Carousel />

      <div className="w-full py-12 flex flex-col items-center justify-center text-center md:mt-15">
        <h1 className="font-bold text-5xl mb-2">Características principales</h1>
        <p className="text-gray-500 max-w-3xl text-1xl mt-5">
          Nuestra plataforma ofrece todas las herramientas que necesitas para
          optimizar tus procesos de negocio.
        </p>
        <CardsInfo />
      </div>

      <div className="w-full py-5 flex flex-col items-center justify-center text-center md:mt-10">
        <h1 className="font-bold text-5xl mb-2">Cómo funciona?</h1>
        <p className="text-gray-500 max-w-3xl text-1xl md:mb-10 px-2">
          Un proceso simple y eficiente para transformar tu negocio.
        </p>
        <ProcessSteps />
      </div>

      <div className="w-full py-12 flex flex-col items-center justify-center text-center md:mt-10">
        <h1 className="font-bold text-5xl mb-2">
          Lo que dicen nuestros clientes
        </h1>
        <p className="text-gray-500 max-w-3xl text-1xl md:mb-10 px-2">
          Empresas que ya han transformado sus procesos con nosotros.
        </p>
        <Testimonials />
      </div>

      <div className="w-full py-5 flex flex-col items-center justify-center text-center md:mt-10 mb-10">
        <h1 className="font-bold text-5xl mb-2">
          ¿Estás listo para transformar tu negocio?
        </h1>
        <p className="text-gray-500 max-w-3xl text-1xl">
          Registrate y comienza a optimizar tus procesos de negocio.
        </p>
        <button className="border border-red-600 text-red-600 py-2 px-4 rounded-full mt-5 hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
          Registrarme
        </button>
      </div>
      <Footer />
    </div>
  );
}
