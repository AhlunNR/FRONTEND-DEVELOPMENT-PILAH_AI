import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import useAppStore from '../store/useAppStore';
import { Leaf, Box, Trash2, Battery, Wine, FileText, ChevronRight } from 'lucide-react';

const categoryIcons = {
  plastic: { icon: Battery, color: 'text-blue-500', bg: 'bg-blue-100' },
  metal: { icon: Box, color: 'text-slate-500', bg: 'bg-slate-100' },
  paper: { icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  cardboard: { icon: Box, color: 'text-amber-500', bg: 'bg-amber-100' },
  glass: { icon: Wine, color: 'text-cyan-500', bg: 'bg-cyan-100' },
  trash: { icon: Trash2, color: 'text-red-500', bg: 'bg-red-100' },
};

export default function AktifitasPage() {
  const scans = useAppStore(state => state.scans);

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 md:pb-8">
      <h1 className="text-2xl font-bold text-slate-900 mt-4 md:mt-0 mb-2">Riwayat Aktivitas</h1>
      <p className="text-slate-500 text-sm mb-6">Jejak kontribusi daur ulangmu</p>

      {scans.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-300">
            <Leaf size={40} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Belum ada aktivitas</h3>
          <p className="text-slate-500 text-sm">Mulai scan sampah pertamamu untuk melihat riwayat di sini.</p>
        </div>
      ) : (
        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          {scans.map((scan) => {
            const config = categoryIcons[scan.label] || categoryIcons.trash;
            const Icon = config.icon;
            
            return (
              <div key={scan.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-white border-4 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${config.bg} ${config.color}`}>
                  <Icon size={16} />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl shadow-sm bg-white border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 capitalize">{scan.label}</h4>
                    <span className="text-[10px] font-medium text-slate-500">
                      {formatDistanceToNow(new Date(scan.timestamp), { addSuffix: true, locale: id })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">{scan.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      <Leaf size={12} /> +{scan.points} Poin
                    </div>
                    <button className="text-slate-400 hover:text-primary p-1">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
