
import React from 'react';
import { useOmni } from '../../context';
import { StatusBadge } from '../ui/StatusBadge';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { ServiceOrder } from '../../types';

interface Props {
    onSelectOrder: (order: ServiceOrder) => void;
}

export const ContractorDashboard: React.FC<Props> = ({ onSelectOrder }) => {
  const { orders, user } = useOmni();

  // Filter for this user
  const myOrders = orders.filter(o => o.assigneeId === user?.id || !o.assigneeId); // Show unassigned too for demo

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Missions</h2>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">{myOrders.length} Pending</span>
        </div>

        {myOrders.map(order => (
            <div 
                key={order.id} 
                onClick={() => onSelectOrder(order)}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 active:scale-[0.98] transition-transform cursor-pointer"
            >
                <div className="flex justify-between items-start mb-3">
                    <StatusBadge priority={order.priority} />
                    <StatusBadge status={order.status} />
                </div>
                
                <h3 className="font-bold text-slate-900 mb-1">{order.title}</h3>
                
                <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                    <span className="truncate">{order.location}</span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center text-xs text-slate-400">
                        <Clock className="w-3 h-3 mr-1" />
                        Due {new Date(order.dueDate).toLocaleDateString()}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
            </div>
        ))}
    </div>
  );
};
