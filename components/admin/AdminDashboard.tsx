
import React, { useState } from 'react';
import { useOmni } from '../../context';
import { StatusBadge } from '../ui/StatusBadge';
import { ServiceOrder, OSStatus, OSPriority } from '../../types';
import { Search, Edit2, Plus, X, Save } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { orders, updateOrder, createOrder } = useOmni();
  const [editingOrder, setEditingOrder] = useState<ServiceOrder | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Stats
  const stats = {
    total: orders.length,
    open: orders.filter(o => o.status === OSStatus.OPEN).length,
    completed: orders.filter(o => o.status === OSStatus.COMPLETED).length
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    updateOrder(editingOrder.id, editingOrder);
    setEditingOrder(null);
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Service Orders</h2>
                <p className="text-slate-500">Manage field operations and assignments.</p>
            </div>
            <button 
                onClick={() => setIsCreating(true)} // Simple create mock for demo
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg"
            >
                <Plus className="w-4 h-4" /> New Order
            </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase">Total Volume</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-blue-500 text-xs font-bold uppercase">Active / Open</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.open}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-emerald-500 text-xs font-bold uppercase">Completed</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.completed}</p>
            </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
                <Search className="w-4 h-4 text-slate-400" />
                <input placeholder="Search ID or Location..." className="bg-transparent text-sm outline-none flex-1" />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
                        <tr>
                            <th className="px-6 py-4 font-bold">ID</th>
                            <th className="px-6 py-4 font-bold">Details</th>
                            <th className="px-6 py-4 font-bold">Priority</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-500">{order.id}</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{order.title}</div>
                                    <div className="text-slate-500 text-xs mt-0.5">{order.location}</div>
                                </td>
                                <td className="px-6 py-4"><StatusBadge priority={order.priority} /></td>
                                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                <td className="px-6 py-4">
                                    <button 
                                        onClick={() => setEditingOrder({...order})}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 hover:border-blue-300 bg-blue-50 px-3 py-1.5 rounded-lg transition-all flex items-center gap-2"
                                    >
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Edit Modal */}
        {editingOrder && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-900">Edit Order {editingOrder.id}</h3>
                        <button onClick={() => setEditingOrder(null)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <form onSubmit={handleSave} className="p-6 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                            <textarea 
                                className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                                value={editingOrder.description}
                                onChange={e => setEditingOrder({...editingOrder, description: e.target.value})}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Priority</label>
                                <select 
                                    className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                                    value={editingOrder.priority}
                                    onChange={e => setEditingOrder({...editingOrder, priority: e.target.value as OSPriority})}
                                >
                                    {Object.values(OSPriority).map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                <input 
                                    className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                                    value={editingOrder.location}
                                    onChange={e => setEditingOrder({...editingOrder, location: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="pt-4 flex gap-3">
                            <button type="button" onClick={() => setEditingOrder(null)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl">Cancel</button>
                            <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                                <Save className="w-4 h-4" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};
