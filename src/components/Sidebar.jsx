import { NavLink } from 'react-router-dom';
import { LayoutGrid, Users, Archive, Plus, FileText, ShoppingCart, Settings, Store, X } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/dashboard/users', label: 'Users', icon: Users },
  { to: '/dashboard/products', label: 'Products', icon: Archive, end: true },
  { to: '/dashboard/products/new', label: 'Add Product', icon: Plus },
  { to: '/dashboard/orders', label: 'Orders', icon: FileText },
  { to: '/dashboard/carts', label: 'Carts', icon: ShoppingCart },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-slate-300 transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-500 text-white"><Store size={22} /></div>
          <div className="flex-1">
            <p className="font-bold leading-tight text-white">KODA STORE</p>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="lg:hidden"><X size={20} /></button>
        </div>

        <p className="px-6 pb-2 pt-6 text-xs font-medium tracking-wide text-slate-500">MAIN MENU</p>
        <nav className="flex-1 space-y-1 px-3">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-indigo-500/15 text-white' : 'hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={20} /> {label}
            </NavLink>
          ))}
        </nav>

        <p className="border-t border-white/10 px-6 py-4 text-xs text-slate-500">© 2026 KODA Store</p>
      </aside>
    </>
  );
}
