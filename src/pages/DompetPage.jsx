import { Award, Gift, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import useAppStore from '../store/useAppStore';
import { toast } from 'sonner';

export default function DompetPage() {
  const { points, redemptions, addRedemption } = useAppStore();

  const rewards = [
    { id: 1, title: 'Voucher GoPay Rp 10.000', points: 1000, icon: '🎫' },
    { id: 2, title: 'Diskon Belanja Sayur 15%', points: 500, icon: '🥦' },
    { id: 3, title: 'Bibit Pohon Mangga', points: 2000, icon: '🌱' },
    { id: 4, title: 'Tas Belanja Ramah Lingkungan', points: 1500, icon: '🛍️' },
  ];

  const handleRedeem = (reward) => {
    if (points >= reward.points) {
      if (addRedemption(reward.title, reward.points)) {
        toast.success('Penukaran Berhasil!', {
          description: `Kamu telah menukarkan ${reward.points} poin untuk ${reward.title}.`
        });
      }
    } else {
      toast.error('Poin tidak cukup', {
        description: `Kumpulkan ${reward.points - points} poin lagi untuk menukar item ini.`
      });
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen pb-24 md:pb-8">
      <div className="bg-gradient-to-br from-emerald-500 to-primary rounded-3xl p-6 md:p-10 text-white shadow-xl shadow-primary/20 mb-8 mt-2 md:mt-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
        <h2 className="text-emerald-50 font-medium mb-1">Saldo Poin Kamu</h2>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight">{points}</span>
          <span className="text-emerald-100 font-medium mb-2">EcoPoints</span>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-sm w-full">
            <Clock size={16} className="mr-2" /> Riwayat
          </Button>
        </div>
      </div>

      <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
        <Gift className="text-primary" /> Katalog Penukaran
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="text-3xl mb-3 bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center">
                {reward.icon}
              </div>
              <h4 className="font-semibold text-sm leading-tight text-slate-800 mb-2 flex-1">
                {reward.title}
              </h4>
              <div className="flex items-center gap-1.5 text-primary font-bold text-sm mb-4">
                <Award size={14} /> {reward.points}
              </div>
              <Button 
                variant={points >= reward.points ? "default" : "secondary"} 
                className="w-full text-xs h-9"
                onClick={() => handleRedeem(reward)}
              >
                Tukar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl flex gap-3 border border-blue-100">
        <AlertCircle className="shrink-0 mt-0.5" size={20} />
        <div className="text-sm leading-relaxed">
          <strong>Info:</strong> Scan lebih banyak sampah daur ulang untuk mendapatkan tambahan poin setiap harinya!
        </div>
      </div>
    </div>
  );
}
