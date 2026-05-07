import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import SidebarNav from './SidebarNav';

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarNav />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 pb-20 md:pb-0">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm md:max-w-6xl md:bg-transparent md:shadow-none md:p-8 w-full relative">
          <main className="w-full h-full bg-white md:rounded-3xl md:shadow-sm md:min-h-[calc(100vh-4rem)] md:border md:border-slate-200 overflow-hidden relative">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
