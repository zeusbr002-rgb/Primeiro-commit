
import React, { useState } from 'react';
import { useOmni } from '../context';
import { Hexagon, ArrowRight, Loader2, User, KeyRound } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useOmni();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setLoading(true);
    await login(username);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/50 mb-4 transform rotate-3 hover:rotate-6 transition-transform">
                <Hexagon className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">OmniFlow</h1>
            <p className="text-blue-200/80 text-sm mt-1">Enterprise Service Management</p>
        </div>

        <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Identify Yourself</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-start gap-3">
                        <KeyRound className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-800">
                            <p className="font-bold mb-1">Access Control Logic:</p>
                            <ul className="list-disc list-inside space-y-1 opacity-80">
                                <li>Input <strong>"X"</strong> for Admin Access</li>
                                <li>Input <strong>Anything Else</strong> for Contractor</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Access System <ArrowRight className="w-5 h-5 ml-2" /></>}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};
