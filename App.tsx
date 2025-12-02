'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, MapPin, Camera, CheckCircle, Clock, 
  LogOut, User, Menu, X, AlertCircle, Calendar, 
  Edit, Save, Plus, Image as ImageIcon, Trash2 
} from 'lucide-react';

// --- 1. DEFINIÇÕES DE TIPO (DENTRO DO ARQUIVO PARA NÃO DAR ERRO) ---
type UserRole = 'admin' | 'contractor';

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface ServiceOrder {
  id: string;
  title: string;
  location: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'done';
  description: string;
  sla?: string;
  evidenceImage?: string;
}

// --- 2. DADOS MOCKADOS (DENTRO DO ARQUIVO) ---
const INITIAL_ORDERS: ServiceOrder[] = [
  { id: 'OS-8842', title: 'Manutenção Chiller', location: 'Setor B', priority: 'high', status: 'pending', description: 'Verificar pressão e filtros.', sla: '4h' },
  { id: 'OS-8845', title: 'Iluminação Externa', location: 'Estacionamento', priority: 'medium', status: 'in_progress', description: 'Trocar refletores.', sla: '12h' },
  { id: 'OS-8890', title: 'Vazamento Vestiário', location: 'Vestiário Térreo', priority: 'low', status: 'done', description: 'Reparo hidráulico.', sla: 'Finalizado' }
];

// --- 3. COMPONENTES UI SIMPLES ---
const Button = ({ children, onClick, variant = 'primary', disabled = false, className = '' }: any) => {
  const base = "px-4 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2";
  const styles: any = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300",
    secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
    danger: "bg-red-50 text-red-600 hover:bg-red-100"
  };
  return <button onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${className}`}>{children}</button>;
};

const Badge = ({ type }: { type: string }) => {
  const colors: any = {
    high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-blue-100 text-blue-700",
    pending: "bg-slate-100 text-slate-600", in_progress: "bg-blue-50 text-blue-600", done: "bg-emerald-100 text-emerald-700"
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${colors[type] || 'bg-gray-100'}`}>{type.replace('_', ' ')}</span>;
};

// --- 4. APLICAÇÃO PRINCIPAL ---
export default function OmniSystem() {
  // Estados
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<ServiceOrder[]>(INITIAL_ORDERS);
  const [scheduleImages, setScheduleImages] = useState<string[]>([]);
  
  // Login State
  const [username, setUsername] = useState('');
  
  // View State
  const [view, setView] = useState<'dashboard' | 'schedule'>('dashboard');
  const [selectedOS, setSelectedOS] = useState<ServiceOrder | null>(null);

  // --- HYDRATION FIX (O SEGREDO DA TELA BRANCA) ---
  useEffect(() => {
    setIsMounted(true);
    // Tentar recuperar sessão
    const savedUser = localStorage.getItem('omni_user_v2');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Persistência simples
  useEffect(() => {
    if (isMounted && user) {
      localStorage.setItem('omni_user_v2', JSON.stringify(user));
    }
  }, [user, isMounted]);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = username === 'X' ? 'admin' : 'contractor';
    const newUser: User = { 
      id: role === 'admin' ? 'ADM-01' : 'CON-01', 
      name: role === 'admin' ? 'Administrador' : username, 
      role 
    };
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('omni_user_v2');
    setView('dashboard');
    setUsername('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'schedule' | 'evidence') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'schedule') {
          setScheduleImages([...scheduleImages, reader.result as string]);
        } else if (type === 'evidence' && selectedOS) {
          // Atualizar OS
          const updated = orders.map(o => o.id === selectedOS.id ? { ...o, status: 'done' as const, evidenceImage: reader.result as string } : o);
          setOrders(updated);
          setSelectedOS(null);
          alert("OS Concluída com sucesso!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- RENDERIZAÇÃO ---

  // 1. Previne Erro de Server-Side (Tela Branca)
  if (!isMounted) return <div className="min-h-screen flex items-center justify-center">Carregando OMNI...</div>;

  // 2. Tela de Login
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-center mb-6"><div className="bg-blue-600 p-3 rounded-xl"><LayoutDashboard className="text-white w-8 h-8"/></div></div>
          <h1 className="text-2xl font-bold text-center text-slate-800">OMNI SYSTEM</h1>
          <p className="text-center text-slate-500 text-sm mb-6">Acesso Corporativo</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700">Usuário</label>
              <input 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Digite 'X' para Admin" 
              />
            </div>
            <Button className="w-full py-3">Entrar</Button>
          </form>
          <p className="text-xs text-center text-slate-400 mt-4">Dica: Use <b>X</b> para Administrador</p>
        </div>
      </div>
    );
  }

  // 3. Layout Admin
  if (user.role === 'admin') {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="font-bold text-slate-800 flex items-center gap-2"><LayoutDashboard className="text-blue-600"/> OMNI Admin</div>
          <div className="flex gap-4">
             <button onClick={() => setView('dashboard')} className={`text-sm font-medium ${view === 'dashboard' ? 'text-blue-600' : 'text-slate-500'}`}>Ordens</button>
             <button onClick={() => setView('schedule')} className={`text-sm font-medium ${view === 'schedule' ? 'text-blue-600' : 'text-slate-500'}`}>Cronograma</button>
             <button onClick={handleLogout} className="text-red-600"><LogOut size={18}/></button>
          </div>
        </nav>
        
        <main className="p-6 max-w-5xl mx-auto">
          {view === 'dashboard' ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800">Painel de Controle</h2>
              <div className="bg-white rounded-xl shadow border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 border-b">
                    <tr><th className="p-4">ID</th><th className="p-4">Descrição</th><th className="p-4">Status</th></tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map(os => (
                      <tr key={os.id}>
                        <td className="p-4 font-mono font-medium">{os.id}</td>
                        <td className="p-4">{os.title}<div className="text-xs text-slate-400">{os.location}</div></td>
                        <td className="p-4"><Badge type={os.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Cronograma Visual</h2>
              <div className="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center mb-6">
                <input type="file" id="schUpload" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'schedule')} />
                <label htmlFor="schUpload" className="cursor-pointer flex flex-col items-center gap-2 text-slate-500 hover:text-blue-600">
                  <ImageIcon size={32}/>
                  <span>Clique para adicionar imagem ao cronograma</span>
                </label>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {scheduleImages.map((img, i) => (
                  <img key={i} src={img} className="rounded-lg shadow border" />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // 4. Layout Encarregado (Mobile)
  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <header className="bg-slate-900 text-white p-6 rounded-b-3xl shadow-lg mb-4">
        <div className="flex justify-between items-start">
          <div><p className="text-slate-400 text-xs uppercase">Encarregado</p><h1 className="text-xl font-bold">{user.name}</h1></div>
          <button onClick={handleLogout} className="bg-slate-800 p-2 rounded-full"><LogOut size={18}/></button>
        </div>
      </header>

      <div className="px-4">
        {selectedOS ? (
          <div className="bg-white rounded-xl shadow p-4 animate-in fade-in zoom-in duration-300">
            <button onClick={() => setSelectedOS(null)} className="mb-4 text-sm text-slate-500 font-medium">&larr; Voltar</button>
            <div className="flex justify-between items-start mb-2"><h2 className="text-xl font-bold text-slate-800">{selectedOS.title}</h2><Badge type={selectedOS.priority}/></div>
            <p className="text-slate-600 text-sm mb-4">{selectedOS.description}</p>
            <div className="bg-slate-50 p-3 rounded mb-6 text-sm flex gap-2 text-slate-500"><MapPin size={16}/> {selectedOS.location}</div>
            
            {selectedOS.status !== 'done' ? (
              <div className="border-t pt-4">
                <label className="block text-sm font-medium mb-2">Evidência Obrigatória</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 relative">
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'evidence')} />
                  <Camera className="mx-auto text-slate-400 mb-2"/>
                  <span className="text-xs text-slate-500 block">Toque para tirar foto</span>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded font-bold text-center flex items-center justify-center gap-2"><CheckCircle/> Concluído</div>
            )}
          </div>
        ) : (
          <>
            {view === 'dashboard' ? (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Suas Demandas</h3>
                {orders.map(os => (
                  <div key={os.id} onClick={() => setSelectedOS(os)} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-l-blue-500 active:scale-95 transition">
                    <div className="flex justify-between mb-1"><span className="text-[10px] font-bold text-slate-400">{os.id}</span><Badge type={os.status}/></div>
                    <h4 className="font-bold text-slate-800">{os.title}</h4>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wider">Cronograma</h3>
                {scheduleImages.length === 0 && <p className="text-center text-slate-400 text-sm py-8">Nenhuma imagem disponível.</p>}
                {scheduleImages.map((img, i) => <img key={i} src={img} className="w-full rounded-lg shadow-sm" />)}
              </div>
            )}
          </>
        )}
      </div>

      {!selectedOS && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <button onClick={() => setView('dashboard')} className={`flex flex-col items-center ${view === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}><LayoutDashboard size={24}/><span className="text-[10px] font-medium">Tarefas</span></button>
          <button onClick={() => setView('schedule')} className={`flex flex-col items-center ${view === 'schedule' ? 'text-blue-600' : 'text-slate-400'}`}><Calendar size={24}/><span className="text-[10px] font-medium">Cronograma</span></button>
        </nav>
      )}
    </div>
  );
}
