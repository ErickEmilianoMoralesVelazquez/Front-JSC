import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null); // 'terminos', 'dashboards', or null

  const toggleSubmenu = (name) => {
    setSubmenuOpen(submenuOpen === name ? null : name);
  };

  return (
    <nav className="bg-[#111719] text-white w-full shadow-sm z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 relative">
        {/* Logo */}
        <span className="text-lg md:text-xl font-bold whitespace-nowrap">
          Servicios Corporativos Flotillas
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center space-x-6 text-sm">
          <li>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">
              Manual
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">
              Capacitaciones
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => toggleSubmenu("terminos")}
              className="flex items-center gap-1 hover:text-blue-500 whitespace-nowrap"
            >
              Términos y Condiciones <ChevronDownIcon className="w-4 h-4" />
            </button>
            {submenuOpen === "terminos" && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black rounded-md shadow-md px-4 py-2 z-50">
                <a href="#" className="block px-2 py-1 hover:text-blue-600">
                  Pólizas
                </a>
              </div>
            )}
          </li>
          <li>
            <a href="#" className="hover:text-blue-500 whitespace-nowrap">
              Contacto
            </a>
          </li>
          <li className="relative">
            <button
              onClick={() => toggleSubmenu("dashboards")}
              className="flex items-center gap-1 hover:text-blue-500 whitespace-nowrap"
            >
              Dashboards <ChevronDownIcon className="w-4 h-4" />
            </button>
            {submenuOpen === "dashboards" && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-black rounded-md shadow-md px-4 py-2 z-50">
                <Link
                  to="/dashboard/superadmin"
                  className="block px-2 py-1 hover:text-blue-600"
                >
                  Dashboard SuperAdmin
                </Link>
                <a href="#" className="block px-2 py-1 hover:text-blue-600">
                  Dashboard Gasera
                </a>
              </div>
            )}
          </li>
        </ul>

        {/* Login (desktop) */}
        <div className="hidden md:block ml-4">
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
          >
            Iniciar sesión
          </a>
        </div>

        {/* Botón móvil */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center p-2 text-sm text-gray-400 hover:bg-gray-700 rounded-lg"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="px-4 pb-4 md:hidden text-sm space-y-1">
          <a href="#" className="block py-2 hover:text-blue-500">
            Manual
          </a>
          <a href="#" className="block py-2 hover:text-blue-500">
            Capacitaciones
          </a>

          {/* Submenú móvil - Términos */}
          <div>
            <button
              onClick={() => toggleSubmenu("terminos")}
              className="w-full text-left flex items-center justify-between py-2 hover:text-blue-500"
            >
              Términos y Condiciones <ChevronDownIcon className="w-4 h-4" />
            </button>
            {submenuOpen === "terminos" && (
              <div className="pl-4 space-y-1">
                <a href="#" className="block py-1 hover:text-blue-400">
                  Pólizas
                </a>
              </div>
            )}
          </div>

          <a href="#" className="block py-2 hover:text-blue-500">
            Contacto
          </a>

          {/* Submenú móvil - Dashboards */}
          <div>
            <button
              onClick={() => toggleSubmenu("dashboards")}
              className="w-full text-left flex items-center justify-between py-2 hover:text-blue-500"
            >
              Dashboards <ChevronDownIcon className="w-4 h-4" />
            </button>
            {submenuOpen === "dashboards" && (
              <div className="pl-4 space-y-1">
                <Link
                  to="/dashboard/superadmin"
                  className="block py-1 hover:text-blue-400"
                >
                  Dashboard SuperAdmin
                </Link>
                <a href="#" className="block py-1 hover:text-blue-400">
                  Dashboard Gasera
                </a>
              </div>
            )}
          </div>

          {/* Login móvil */}
          <a
            href="/login"
            className="block bg-blue-600 hover:bg-blue-700 text-white text-center px-4 py-2 rounded-md mt-2"
          >
            Iniciar sesión
          </a>
        </div>
      )}
    </nav>
  );
}
