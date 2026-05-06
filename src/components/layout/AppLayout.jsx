import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm relative">
        {/* Konten Halaman */}
        <main className="w-full">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
