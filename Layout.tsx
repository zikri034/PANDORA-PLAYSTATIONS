import { Outlet, NavLink } from "react-router";
import { Home, Calendar, History, Settings } from "lucide-react";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
        <h1 className="text-xl font-bold text-blue-600">PS Rent Pro</h1>
      </header>

      <main id="main-content" className="flex-1 pb-20 overflow-auto focus:outline-none" tabIndex={-1}>
        <div className="max-w-md mx-auto p-4">
          <Outlet />
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2 pb-safe flex justify-between items-center z-10" aria-label="Main Navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="View Console Status"
        >
          <Home size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Status</span>
        </NavLink>

        <NavLink
          to="/reserve"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="Reserve a Console"
        >
          <Calendar size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Reserve</span>
        </NavLink>

        <NavLink
          to="/my-rentals"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="My Rental History"
        >
          <History size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Rentals</span>
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg p-1 ${
              isActive ? "text-blue-600" : "text-slate-400"
            }`
          }
          aria-label="Admin Settings"
        >
          <Settings size={20} aria-hidden="true" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Admin</span>
        </NavLink>
      </nav>

      <Toaster position="top-center" richColors />
    </div>
  );
}
