
import React from 'react';
import { useOmni } from '../../context';
import { LogOut, LayoutDashboard, CalendarDays, Hexagon } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: 'dashboard' | 'schedule';
  onNavigate: (page: 'dashboard' | 'schedule') => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePage, onNavigate }) => {
  const { logout, user } = useOmni();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
           <Hexagon className="text-blue-500 w-6 h-6" strokeWidth={2} />
           <div>
             <h1 className="font-bold text-lg tracking-tight">OmniFlow</h1>
             <p className="text-xs text-slate-400">Admin Console</p>
           </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
            <button 
                onClick={() => onNavigate('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
                <LayoutDashboard className="w-5 h-5" />
                <span className="font-medium">OS Management</span>
            </button>
            <button 
                onClick={() => onNavigate('schedule')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activePage === 'schedule' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
                <CalendarDays className="w-5 h-5" />
                <span className="font-medium">Visual Schedule</span>
            </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
            <div className="bg-slate-800 rounded-xl p-4 mb-4">
                <p className="text-xs text-slate-400 uppercase font-bold mb-1">Signed in as</p>
                <p className="text-sm font-semibold text-white">{user?.name}</p>
            </div>
            <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 py-3 rounded-xl transition-colors font-medium text-sm"
            >
                <LogOut className="w-4 h-4" /> Sign Out
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};
