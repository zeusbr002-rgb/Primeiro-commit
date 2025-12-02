
import React from 'react';
import { useOmni } from '../../context';
import { Image as ImageIcon } from 'lucide-react';

export const ContractorSchedule: React.FC = () => {
  const { schedules } = useOmni();

  return (
    <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4">
            <h3 className="text-blue-900 font-bold text-sm">Shift Plan</h3>
            <p className="text-blue-700 text-xs mt-1">Reference the visual guides below for your weekly rotation.</p>
        </div>

        {schedules.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
                <img src={item.imageUrl} alt={item.title} className="w-full" />
                <div className="p-4">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">Posted {new Date(item.uploadedAt).toLocaleDateString()}</p>
                </div>
            </div>
        ))}

        {schedules.length === 0 && (
            <div className="text-center py-12 text-slate-400">
                <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>No schedules available.</p>
            </div>
        )}
    </div>
  );
};
