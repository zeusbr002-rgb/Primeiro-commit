
import React, { useState } from 'react';
import { useOmni } from '../../context';
import { UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react';

export const AdminSchedule: React.FC = () => {
  const { schedules, addSchedule } = useOmni();
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && title) {
      setIsUploading(true);
      await addSchedule(title, e.target.files[0]);
      setIsUploading(false);
      setTitle('');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Visual Schedules</h2>
        <p className="text-slate-500">Upload shift plans and visual guides for contractors.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
        <h3 className="font-bold text-slate-900 mb-4">Upload New Schedule</h3>
        <div className="flex gap-4 items-end">
            <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Schedule Title</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    placeholder="e.g. November Maintenance Plan"
                    className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>
            <div className="flex-1 relative">
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={!title || isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                 />
                 <button 
                    disabled={!title || isUploading}
                    className={`w-full p-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${!title ? 'bg-slate-100 text-slate-400' : 'bg-blue-600 text-white shadow-lg'}`}
                 >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                    {isUploading ? 'Processing...' : 'Select Image to Upload'}
                 </button>
            </div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2">* Images are stored locally in the browser for this demo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map(item => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm group">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                        {new Date(item.uploadedAt).toLocaleDateString()}
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">Uploaded by {item.uploadedBy}</p>
                </div>
            </div>
        ))}
        {schedules.length === 0 && (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
                <p>No schedules uploaded yet.</p>
            </div>
        )}
      </div>
    </div>
  );
};
