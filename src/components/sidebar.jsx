import React from 'react';
import { FileText, DollarSign, ClipboardList } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Revisión de pedidos', icon: <ClipboardList />, path: '/dashboard/superadmin' },
  { label: 'Cotizaciones', icon: <FileText />, path: '/dashboard/superadmin/quotes' },
  { label: 'Facturación/Remisión', icon: <DollarSign />, path: '/dashboard/superadmin/invoices' },
  { label: 'Backorder/Faltantes', icon: <ClipboardList />, path: '#' },
  { label: 'Pagos', icon: <DollarSign />, path: '/dashboard/superadmin/payments' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-black text-white p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold mb-6">Superadmin</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                isActive ? 'bg-red-100 text-black' : 'hover:bg-white/10'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
