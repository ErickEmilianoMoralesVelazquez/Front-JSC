import React, { useState, useEffect } from "react";
import {
  FileText,
  ClipboardList,
  LogOut,
  Menu,
  UserCircle,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Pedidos",
    icon: <ClipboardList size={18} />,
    path: "/dashboard/gasera/orders",
  },
  {
    label: "Cotizaciones",
    icon: <FileText size={18} />,
    path: "/dashboard/gasera/quotes",
  },
];

export default function SidebarGasera() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.nombre) {
            setUserName(data.nombre);
          }
        })
        .catch((err) => {
          console.error("Error al obtener el usuario:", err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Botón hamburguesa para móvil */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-black p-2 rounded-md shadow-md"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-black text-white px-5 py-6 flex flex-col justify-between z-40 transition-transform duration-300 transform
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex`}
      >
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-center w-full">
              <img
                src="/src/assets/images/image.png"
                alt="Logo"
                className="w-25 h-25 mb-2 mt-2 rounded-full"
              />
            </div>
            {userName && (
              <p className="text-center text-sm text-white mb-6 font-semibold">
                {userName}
              </p>
            )}
            <nav className="flex flex-col gap-3">
              {menuItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? "bg-white text-black font-semibold"
                        : "hover:bg-white/10 text-gray-200"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-4 mt-10 relative">
            <Link to="https://web.whatsapp.com/send?phone=7771681311&text=%C2%A1Hola">
              <div className="relative">
                <button
                  type="button"
                  onMouseEnter={() =>
                    window.innerWidth >= 768 && setShowPopover(true)
                  }
                  onMouseLeave={() =>
                    window.innerWidth >= 768 && setShowPopover(false)
                  }
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:scale-[1.02] transition"
                >
                  <UserCircle size={18} />
                  Contacto
                </button>

                {/* Popover personalizado */}
                <div
                  className={`hidden md:block absolute left-full ml-4 top-1/2 -translate-y-1/2 w-64 bg-white text-gray-500 rounded-lg shadow-lg border border-gray-200 transition-all duration-200 ${
                    showPopover ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-gray-200"></div>

                  <div className="relative z-10 bg-white rounded-lg overflow-hidden">
                    <div className="px-3 py-2 bg-black border-b border-black">
                      <h3 className="font-semibold text-white">
                        Asesor Jorges
                      </h3>
                    </div>
                    <div className="px-3 py-2">
                      <p>
                        ¿Necesitas ayuda? Contáctanos para recibir asesoría
                        personalizada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Botón cerrar sesión */}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-sm text-red-400 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
