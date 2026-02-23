import { useRental } from "../context/RentalContext";
import { 
  Settings, 
  Plus, 
  LayoutDashboard, 
  Database, 
  Info, 
  RefreshCw,
  User,
  Shield,
  Moon,
  Bell,
  ChevronRight,
  LogOut
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Admin() {
  const { units, bookings } = useRental();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const totalRevenue = bookings
    .filter(b => b.status === 'completed')
    .reduce((acc, curr) => acc + curr.totalCost, 0);

  const stats = [
    { label: "Total Units", value: units.length, icon: LayoutDashboard, color: "text-blue-600" },
    { label: "Active Rentals", value: units.filter(u => u.status === 'rented').length, icon: Database, color: "text-red-600" },
    { label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: Plus, color: "text-green-600" },
  ];

  const settingsOptions = [
    { 
      id: 'profile',
      label: "Profile", 
      icon: User, 
      description: "Manage your personal info",
      action: () => toast.info("Profile settings opened")
    },
    { 
      id: 'account',
      label: "Account", 
      icon: Shield, 
      description: "Security and password",
      action: () => toast.info("Account security settings opened")
    },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="text-blue-600" /> Settings
        </h2>
        <div className="text-xs text-slate-400 font-medium bg-white px-3 py-1 border border-slate-200 rounded-full flex items-center gap-2">
          <RefreshCw size={12} className="text-blue-500 animate-spin" /> Live Updates
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-3 gap-3">
           {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-1"
            >
              <div className={`p-2 bg-slate-50 rounded-xl ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
              <p className="text-sm font-black text-slate-800">{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Settings Sections */}
      <div className="space-y-6">
        {/* User Management */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">User Management</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden" role="list">
            {settingsOptions.map((opt, idx) => (
              <button
                key={opt.id}
                onClick={opt.action}
                role="listitem"
                className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors focus-visible:bg-slate-50 outline-none ${idx !== settingsOptions.length - 1 ? 'border-b border-slate-50' : ''}`}
                aria-label={`${opt.label}: ${opt.description}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg" aria-hidden="true">
                    <opt.icon size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">{opt.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{opt.description}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-300" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">App Preferences</h3>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg" aria-hidden="true">
                  <Bell size={18} />
                </div>
                <div>
                  <p id="notif-label" className="text-sm font-bold text-slate-800">Notifications</p>
                  <p className="text-[10px] text-slate-400 font-medium">Rental alerts & status</p>
                </div>
              </div>
              <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                role="switch"
                aria-checked={notificationsEnabled}
                aria-labelledby="notif-label"
                className={`w-10 h-5 rounded-full transition-colors relative focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none ${notificationsEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${notificationsEnabled ? 'left-6' : 'left-1'}`} />
                <span className="sr-only">{notificationsEnabled ? 'On' : 'Off'}</span>
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg" aria-hidden="true">
                  <Moon size={18} />
                </div>
                <div>
                  <p id="dark-label" className="text-sm font-bold text-slate-800">Dark Mode</p>
                  <p className="text-[10px] text-slate-400 font-medium">Reduce eye strain</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsDarkMode(!isDarkMode);
                  toast.success(`Theme changed to ${!isDarkMode ? 'Dark' : 'Light'}`);
                }}
                role="switch"
                aria-checked={isDarkMode}
                aria-labelledby="dark-label"
                className={`w-10 h-5 rounded-full transition-colors relative focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none ${isDarkMode ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isDarkMode ? 'left-6' : 'left-1'}`} />
                <span className="sr-only">{isDarkMode ? 'On' : 'Off'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-2">
          <button 
            onClick={() => toast.error("Logout feature not implemented in demo")}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold bg-red-50 hover:bg-red-100 rounded-2xl border border-red-100 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 outline-none"
          >
            <LogOut size={18} aria-hidden="true" /> Logout Session
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Info size={14} /> System Information
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            This application is currently running in <strong>Demo Mode</strong>. Data is stored in your browser's local state.
          </p>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs space-y-2">
            <p className="flex justify-between">
              <span className="text-slate-400">Database Driver</span>
              <span className="text-white font-mono">React Context (Memory)</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-400">Notification Push</span>
              <span className="text-white font-mono font-bold text-blue-400">ENABLED (TOAST)</span>
            </p>
          </div>
        </div>
        
        <div className="absolute -bottom-10 -right-10 opacity-10">
          <Settings size={200} />
        </div>
      </div>
    </div>
  );
}
