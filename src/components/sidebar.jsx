import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  ClipboardList,
  LogOut,
  Menu,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Revisión de pedidos', icon: <ClipboardList size={18} />, path: '/dashboard/superadmin' },
  { label: 'Cotizaciones', icon: <FileText size={18} />, path: '/dashboard/superadmin/quotes' },
  { label: 'Facturación/Remisión', icon: <DollarSign size={18} />, path: '/dashboard/superadmin/invoices' },
  { label: 'Backorder/Faltantes', icon: <ClipboardList size={18} />, path: '#' },
  { label: 'Pagos', icon: <DollarSign size={18} />, path: '/dashboard/superadmin/payments' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    navigate('/');
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
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:flex`}
      >
        <div className="flex-1 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold mb-8 text-white tracking-tight">Superadmin</h2>
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
                        ? 'bg-white text-black font-semibold'
                        : 'hover:bg-white/10 text-gray-200'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="mt-10 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-sm text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
