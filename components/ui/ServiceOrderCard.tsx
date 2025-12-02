import React from 'react';
import { ServiceOrder } from '../../types';
import { StatusBadge } from './StatusBadge';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

interface ServiceOrderCardProps {
  order: ServiceOrder;
  onClick: () => void;
}

export const ServiceOrderCard: React.FC<ServiceOrderCardProps> = ({ order, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 active:scale-[0.99] active:bg-slate-50 transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-3">
        <StatusBadge priority={order.priority} />
        <span className="text-xs text-slate-400 font-mono group-hover:text-blue-500 transition-colors">
          {order.id}
        </span>
      </div>
      
      <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">
        {order.title}
      </h3>
      
      <div className="flex items-center text-slate-500 text-sm mb-2">
        <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
        <span className="truncate">{order.location}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
        <div className="flex items-center text-xs text-slate-500">
          <Clock className="w-3 h-3 mr-1" />
          {new Date(order.dueDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
            <StatusBadge status={order.status} />
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
