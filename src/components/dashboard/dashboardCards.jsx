import { CalendarDays, FileText, DollarSign, Users } from 'lucide-react';
import React from 'react';


const cards = [
  { label: 'Pedidos Hoy', value: 24, icon: <CalendarDays className="text-red-500" /> },
  { label: 'Cotizaciones', value: 18, icon: <FileText className="text-yellow-400" /> },
  { label: 'Pagos pendientes', value: 24, icon: <DollarSign className="text-red-600" /> },
  { label: 'Usuarios', value: 15, icon: <Users className="text-yellow-500" /> },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white shadow-sm p-4 rounded-lg border-t-4 border-red-400">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <h3 className="text-xl font-bold">{card.value}</h3>
            </div>
            <div className="bg-red-50 p-2 rounded-full">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
