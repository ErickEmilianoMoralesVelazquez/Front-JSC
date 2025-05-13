// src/context/ToastContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const showToast = useCallback(({ type = "success", title, message }) => {
    setToast({ type, title, message });
    setIsVisible(true);

    // Animación de salida y limpieza
    setTimeout(() => setIsVisible(false), 3500); // inicia salida
    setTimeout(() => setToast(null), 4000); // quita el componente
  }, []);

  const dismissToast = () => {
    setIsVisible(false);
    setTimeout(() => setToast(null), 300);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-6 right-6 z-50 w-full max-w-sm">
          <div
            role="alert"
            className={`rounded-md border border-gray-300 bg-white p-4 shadow-sm transition-all duration-300 ${
              isVisible ? "animate-slide-in" : "animate-slide-out"
            }`}
          >
            <div className="flex items-start gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={`size-6 ${
                  toast.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    toast.type === "success"
                      ? "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      : "M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                />
              </svg>

              <div className="flex-1">
                <strong className="font-medium text-gray-900">{toast.title}</strong>
                <p className="mt-0.5 text-sm text-gray-700">{toast.message}</p>
              </div>

              <button
                onClick={dismissToast}
                className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700"
                type="button"
                aria-label="Dismiss alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
