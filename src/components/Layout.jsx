import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const name = user?.username || user?.name || 'Admin';

  return (
    <div className="min-h-screen">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="rounded-lg border border-slate-200 p-2 lg:hidden">
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-700 sm:block">{name}</span>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-indigo-500 font-semibold uppercase text-white" title={user?.email}>
              {name[0]}
            </div>
            <button onClick={logout} aria-label="Log out" title="Log out"
              className="ml-1 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
              <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
