import { Home, History, ScanLine, Wallet, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const navItems = [
    { icon: Home, label: 'Beranda', path: '/beranda' },
    { icon: History, label: 'Aktivitas', path: '/aktifitas' },
    { icon: ScanLine, label: 'Scan', path: '/scan', isMain: true },
    { icon: Wallet, label: 'Dompet', path: '/dompet' },
    { icon: User, label: 'Saya', path: '/profil' }, // Link to user profile
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-2 py-2 flex justify-between items-center z-50">
      <div className="max-w-md w-full mx-auto flex justify-between items-center relative">
        {navItems.map((item, index) => {
          if (item.isMain) {
            return (
              <NavLink 
                key={index} 
                to={item.path}
                className={({ isActive }) => 
                  `flex flex-col items-center justify-center -mt-6 ${isActive ? 'text-primary' : 'text-slate-500'}`
                }
              >
                <div className="bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <item.icon size={28} />
                </div>
                <span className="text-[10px] font-medium mt-1">Scan</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 min-w-[64px] ${
                  isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              <item.icon size={20} className="mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
