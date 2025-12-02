
import React, { useState } from 'react';
import { useOmni } from '../../context';
import { ServiceOrder, OSStatus } from '../../types';
import { StatusBadge } from '../ui/StatusBadge';
import { ChevronLeft, MapPin, Camera, CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  order: ServiceOrder;
  onBack: () => void;
}

export const ContractorExecution: React.FC<Props> = ({ order, onBack }) => {
  const { completeOrder } = useOmni();
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(order.evidenceImage || null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEvidenceFile(file);
      // Create local preview
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = async () => {
    if (!evidenceFile) return;
    setIsSubmitting(true);
    await completeOrder(order.id, notes, evidenceFile);
    setIsSubmitting(false);
    onBack();
  };

  const isCompleted = order.status === OSStatus.COMPLETED;

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Sticky Header */}
      <div className="bg-white sticky top-0 px-4 py-3 flex items-center gap-3 border-b border-slate-200 z-10 shadow-sm">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-slate-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex-1">
            <div className="text-[10px] font-mono text-slate-400">{order.id}</div>
            <h1 className="font-bold text-slate-900 leading-tight truncate w-64">{order.title}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
             <div className="flex justify-between items-start mb-4">
                <StatusBadge priority={order.priority} />
                <StatusBadge status={order.status} />
             </div>
             <p className="text-sm text-slate-600 leading-relaxed mb-4">{order.description}</p>
             <div className="flex items-center gap-2 text-sm font-medium text-slate-800 bg-slate-50 p-3 rounded-lg">
                <MapPin className="w-4 h-4 text-slate-400" />
                {order.location}
             </div>
        </div>

        {/* Action / Evidence Section */}
        <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Execution Evidence</h3>
            
            <div className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all ${evidenceFile || previewUrl ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white'}`}>
                {previewUrl ? (
                    <div className="relative w-full">
                        <img src={previewUrl} alt="Evidence" className="rounded-xl max-h-64 mx-auto object-cover shadow-md" />
                        {!isCompleted && (
                            <button onClick={() => { setEvidenceFile(null); setPreviewUrl(null); }} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                                <span className="text-xs font-bold px-2 text-rose-500">Remove</span>
                            </button>
                        )}
                        <div className="mt-3 flex items-center justify-center gap-2 text-emerald-700 font-bold text-sm">
                            <CheckCircle className="w-4 h-4" /> Evidence Captured
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                            <Camera className="w-7 h-7 text-blue-500" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">Photo Required</h4>
                        <p className="text-xs text-slate-500 mb-4 max-w-[200px]">You must upload a photo of the completed work to finish this mission.</p>
                        <label className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform cursor-pointer">
                            Take Photo
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
                        </label>
                    </>
                )}
            </div>
        </div>

        {/* Completion Form */}
        {!isCompleted && (
            <div className="space-y-3 pt-2">
                <textarea 
                    placeholder="Add technical notes..." 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px]"
                />
                
                <button 
                    onClick={handleFinish}
                    disabled={!evidenceFile || isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all ${!evidenceFile ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98]'}`}
                >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                    {isSubmitting ? 'Syncing...' : 'Complete Mission'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
