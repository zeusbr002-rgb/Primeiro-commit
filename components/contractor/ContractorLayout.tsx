
import React from 'react';
import { useOmni } from '../../context';
import { LogOut, CheckCircle, CalendarDays, Hexagon } from 'lucide-react';

interface ContractorLayoutProps {
  children: React.ReactNode;
  activePage: 'dashboard' | 'schedule';
  onNavigate: (page: 'dashboard' | 'schedule') => void;
}

export const ContractorLayout: React.FC<ContractorLayoutProps> = ({ children, activePage, onNavigate }) => {
  const { logout, user } = useOmni();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
        {/* Mobile Header */}
        <header className="bg-slate-900 text-white px-5 py-6 sticky top-0 z-20 shadow-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Hexagon className="text-blue-500 w-5 h-5" strokeWidth={2.5} />
                    <h1 className="text-lg font-bold tracking-tight">OmniFlow</h1>
                </div>
                <button onClick={logout} className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
                    <LogOut className="w-4 h-4 text-slate-300" />
                </button>
            </div>
            <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-900/50 border-2 border-slate-800">
                    {user?.initials}
                </div>
                <div>
                    <p className="text-xs text-slate-400">Welcome back,</p>
                    <p className="text-sm font-bold">{user?.name}</p>
                </div>
            </div>
        </header>

        {/* Content */}
        <main className="p-4">
            {children}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center z-30 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => onNavigate('dashboard')}
                className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all ${activePage === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
            >
                <CheckCircle className={`w-6 h-6 mb-1 ${activePage === 'dashboard' ? 'fill-blue-100' : ''}`} />
                <span className="text-[10px] font-bold">My Tasks</span>
            </button>
            <div className="w-px h-8 bg-slate-100"></div>
            <button 
                onClick={() => onNavigate('schedule')}
                className={`flex-1 flex flex-col items-center p-2 rounded-xl transition-all ${activePage === 'schedule' ? 'text-blue-600' : 'text-slate-400'}`}
            >
                <CalendarDays className={`w-6 h-6 mb-1 ${activePage === 'schedule' ? 'fill-blue-100' : ''}`} />
                <span className="text-[10px] font-bold">Schedule</span>
            </button>
        </div>
    </div>
  );
};
