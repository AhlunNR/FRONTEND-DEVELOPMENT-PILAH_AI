import { Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-8 shadow-lg shadow-primary/30">
        <Leaf size={48} />
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
        EcoScan
      </h1>
      
      <p className="text-lg text-slate-600 mb-8 max-w-sm">
        Asisten Cerdas Daur Ulang Anda. Kenali jenis sampah dan selamatkan bumi, satu *scan* setiap harinya.
      </p>

      <Button asChild size="lg" className="w-full max-w-sm h-14 text-lg rounded-xl">
        <Link to="/beranda">
          Mulai Sekarang
          <ArrowRight className="ml-2" />
        </Link>
      </Button>
    </div>
  );
}
