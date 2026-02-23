import { useState, useMemo } from "react";
import { useRental, Unit } from "../context/RentalContext";
import { CreditCard, Gamepad2, User, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

export default function Reserve() {
  const { units, addBooking } = useRental();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    unitId: "",
    customerName: "",
    durationHours: 1,
  });

  const availableUnits = useMemo(() => units.filter(u => u.status === 'available'), [units]);
  
  const selectedUnit = useMemo(() => 
    units.find(u => u.id === formData.unitId), 
    [units, formData.unitId]
  );

  const totalPrice = useMemo(() => {
    if (!selectedUnit) return 0;
    return selectedUnit.pricePerHour * formData.durationHours;
  }, [selectedUnit, formData.durationHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.unitId || !formData.customerName) return;

    addBooking({
      unitId: formData.unitId,
      customerName: formData.customerName,
      durationHours: formData.durationHours,
      totalCost: totalPrice,
      startTime: new Date(),
    });

    navigate("/my-rentals");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">New Reservation</h2>
        <p className="text-slate-500 text-sm">Select a console and set your duration.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Console Selection */}
        <div className="space-y-3" role="group" aria-labelledby="console-select-label">
          <label id="console-select-label" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Gamepad2 size={16} aria-hidden="true" /> Select Console
          </label>
          <div className="grid grid-cols-2 gap-3">
            {availableUnits.length > 0 ? (
              availableUnits.map(unit => (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, unitId: unit.id }))}
                  aria-pressed={formData.unitId === unit.id}
                  className={`p-3 rounded-2xl border-2 text-left transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none ${
                    formData.unitId === unit.id 
                      ? "border-blue-600 bg-blue-50/50 shadow-sm" 
                      : "border-slate-100 bg-white hover:border-slate-200"
                  }`}
                >
                  <p className={`font-bold text-sm ${formData.unitId === unit.id ? 'text-blue-700' : 'text-slate-800'}`}>
                    {unit.name}
                  </p>
                  <p className="text-xs text-slate-500">{unit.type}</p>
                  <p className="text-xs font-bold text-blue-600 mt-2">${unit.pricePerHour}/hr</p>
                </button>
              ))
            ) : (
              <div 
                className="col-span-2 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm text-center"
                role="alert"
              >
                All consoles are currently busy.
              </div>
            )}
          </div>
        </div>

        {/* Customer Name */}
        <div className="space-y-3">
          <label htmlFor="customer-name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User size={16} aria-hidden="true" /> Customer Name
          </label>
          <input
            id="customer-name"
            type="text"
            required
            value={formData.customerName}
            onChange={e => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            placeholder="Enter customer name"
            autoComplete="name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all outline-none focus-visible:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <label htmlFor="duration-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Clock size={16} aria-hidden="true" /> Duration (Hours)
          </label>
          <div className="flex items-center gap-4">
            <input
              id="duration-slider"
              type="range"
              min="1"
              max="12"
              step="1"
              value={formData.durationHours}
              onChange={e => setFormData(prev => ({ ...prev, durationHours: parseInt(e.target.value) }))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 outline-none"
              aria-valuemin={1}
              aria-valuemax={12}
              aria-valuenow={formData.durationHours}
              aria-valuetext={`${formData.durationHours} hours`}
            />
            <span className="w-12 text-center font-bold text-blue-700 bg-blue-50 py-1 rounded-lg border border-blue-200" aria-hidden="true">
              {formData.durationHours}h
            </span>
          </div>
          <div className="flex justify-between px-1 text-[10px] text-slate-400 font-medium" aria-hidden="true">
            <span>1h</span>
            <span>4h</span>
            <span>8h</span>
            <span>12h</span>
          </div>
        </div>

        {/* Summary Card */}
        <AnimatePresence>
          {formData.unitId && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-blue-600 rounded-2xl p-4 text-white shadow-xl shadow-blue-600/20"
              role="region"
              aria-labelledby="summary-title"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p id="summary-title" className="text-blue-100 text-xs uppercase tracking-widest font-bold">Total Price</p>
                  <p className="text-3xl font-black" aria-live="polite">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md" aria-hidden="true">
                  <CreditCard size={20} />
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-blue-100 bg-white/10 p-2 rounded-lg backdrop-blur-md">
                <CheckCircle2 size={14} aria-hidden="true" />
                <span>Selected {selectedUnit?.name} for {formData.durationHours} hours</span>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-white text-blue-600 font-bold py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-sm focus-visible:ring-2 focus-visible:ring-white outline-none"
              >
                Confirm Booking
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
