import { Home, History, ScanLine, Wallet, User, Leaf } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function SidebarNav() {
  const navItems = [
    { icon: Home, label: 'Beranda', path: '/beranda' },
    { icon: ScanLine, label: 'Scan', path: '/scan', isMain: true },
    { icon: History, label: 'Aktivitas', path: '/aktifitas' },
    { icon: Wallet, label: 'Dompet', path: '/dompet' },
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Leaf size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">EcoScan</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item, index) => {
          if (item.isMain) {
             return (
              <NavLink 
                key={index} 
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`
                }
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
              </NavLink>
             );
          }

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-100 text-slate-900 font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <NavLink
          to="/profil"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive 
                ? 'bg-slate-100 text-slate-900 font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`
          }
        >
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
            <User size={16} />
          </div>
          <span className="font-medium">Profil Saya</span>
        </NavLink>
      </div>
    </aside>
  );
}
