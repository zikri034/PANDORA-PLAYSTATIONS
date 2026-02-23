import { useRental, Unit } from "../context/RentalContext";
import { Monitor, CircleDot, Clock, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Dashboard() {
  const { units } = useRental();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center" aria-live="polite">
        <h2 className="text-2xl font-bold">PS Unit Status</h2>
        <div className="flex gap-2 text-xs font-medium" aria-label="Current unit availability counts">
          <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200">
            <CircleDot size={10} aria-hidden="true" /> {units.filter(u => u.status === 'available').length} Available
          </span>
          <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-200">
            <Clock size={10} aria-hidden="true" /> {units.filter(u => u.status === 'rented').length} In Use
          </span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-48 rounded-3xl overflow-hidden shadow-lg border border-slate-200 group"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1644571580854-114d7d8fa383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGF5c3RhdGlvbiUyMGNvbnNvbGUlMjBkdWFsc2Vuc2UlMjBjb250cm9sbGVyfGVufDF8fHx8MTc3MTQxOTkzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="PlayStation 5 console with DualSense controller"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-5">
          <p className="text-white font-black text-xl leading-tight">Next-Gen Gaming Experience</p>
          <p className="text-blue-300 text-xs font-bold uppercase tracking-wider">Premium PS5 & PS4 Pro Units</p>
        </div>
      </motion.div>

      <section className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck size={18} className="text-blue-600" /> Why Reserve Ahead?
        </h3>
        <ul className="grid grid-cols-1 gap-3">
          {[
            { title: "Guaranteed Spot", desc: "No more waiting in line for your favorite console.", icon: CheckCircle2 },
            { title: "Real-time Tracking", desc: "See exactly when units become available.", icon: Monitor },
            { title: "Smart Notifications", desc: "Get alerted 10 minutes before your session ends.", icon: Clock }
          ].map((benefit, i) => (
            <li key={i} className="flex gap-3 items-start">
              <div className="mt-0.5 p-1 bg-blue-50 text-blue-600 rounded-md">
                <benefit.icon size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">{benefit.title}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">{benefit.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-4" role="list">
        {units.map((unit, index) => (
          <UnitCard key={unit.id} unit={unit} index={index} />
        ))}
      </div>
    </div>
  );
}

function UnitCard({ unit, index }: { unit: Unit; index: number }) {
  const statusStyles = {
    available: "bg-green-500",
    rented: "bg-red-500",
    maintenance: "bg-amber-500",
  };

  const statusLabel = {
    available: "Ready to Play",
    rented: "Occupied",
    maintenance: "Under Repair",
  };

  const Icon = {
    available: ShieldCheck,
    rented: Clock,
    maintenance: AlertCircle,
  }[unit.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow`}
      role="listitem"
      aria-labelledby={`unit-title-${unit.id}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className={`p-3 rounded-xl ${unit.status === 'available' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}
            aria-hidden="true"
          >
            <Monitor size={24} />
          </div>
          <div>
            <h3 id={`unit-title-${unit.id}`} className="font-bold text-lg">{unit.name}</h3>
            <p className="text-xs text-slate-500" aria-label={`Console type ${unit.type} at ${unit.pricePerHour} dollars per hour`}>
              {unit.type} • ${unit.pricePerHour}/hr
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span 
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider ${statusStyles[unit.status]}`}
            role="status"
          >
            <Icon size={12} aria-hidden="true" />
            {statusLabel[unit.status]}
          </span>
        </div>
      </div>

      {unit.status === 'rented' && (
        <div className="mt-4 pt-3 border-t border-dashed border-slate-100 flex items-center gap-2 text-xs text-slate-500 italic" aria-live="polite">
          <Clock size={12} aria-hidden="true" />
          Current session ending soon...
        </div>
      )}
    </motion.div>
  );
}
