import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Logo y nombre */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center gap-3"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Jorges Logo"
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Jorges - Servicios Corporativas Flotillas
            </span>
          </a>

          {/* Navegación */}
          <ul className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline">About</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        {/* Línea divisoria */}
        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Copyright */}
        <span className="text-sm text-gray-500 text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Jorges™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
