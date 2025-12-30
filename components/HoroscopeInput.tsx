
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Sparkles, Loader2, Search, CheckCircle2 } from 'lucide-react';

interface HoroscopeInputProps {
  onCalculate: (data: any) => void;
}

const HoroscopeInput: React.FC<HoroscopeInputProps> = ({ onCalculate }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    timeUnknown: false,
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate calculation process
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      onCalculate(formData);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="relative group max-w-4xl mx-auto mb-20">
      <div className="absolute inset-0 bg-gradient-to-r from-[#D2A95A]/20 via-[#6CA192]/20 to-[#D2A95A]/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
      
      <div className="relative bg-[#0F3045]/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 p-10 overflow-hidden glass-reflection shadow-3xl">
        <div className="scanline opacity-10" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={18} className="text-[#D2A95A] animate-pulse" />
              <span className="mono text-[10px] text-[#6CA192] font-bold tracking-[0.5em] uppercase">Initial_Data_Entry</span>
            </div>
            <h2 className="serif text-4xl text-white font-light">Horoskop-Konfiguration</h2>
          </div>
          <div className="px-4 py-2 bg-black/40 rounded-lg border border-[#6CA192]/20 mono text-[9px] text-[#6CA192] tracking-widest uppercase">
            Status: Ready_For_Input
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Name */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 mono text-[10px] text-[#6CA192] uppercase font-bold tracking-widest ml-1">
              <User size={12} /> Profil-Identität
            </label>
            <input
              type="text"
              placeholder="Z.B. JULIAN S."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D2A95A]/60 transition-all focus:ring-1 focus:ring-[#D2A95A]/20"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Birth Place */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 mono text-[10px] text-[#6CA192] uppercase font-bold tracking-widest ml-1">
              <MapPin size={12} /> Geburtsort
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Stadt, Land eingeben..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 pl-12 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D2A95A]/60 transition-all"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            </div>
          </div>

          {/* Birth Date */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 mono text-[10px] text-[#6CA192] uppercase font-bold tracking-widest ml-1">
              <Calendar size={12} /> Geburtsdatum
            </label>
            <input
              type="date"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#D2A95A]/60 transition-all [color-scheme:dark]"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          {/* Birth Time */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="flex items-center gap-2 mono text-[10px] text-[#6CA192] uppercase font-bold tracking-widest">
                <Clock size={12} /> Geburtszeit
              </label>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, timeUnknown: !formData.timeUnknown })}
                className={`text-[9px] mono uppercase tracking-widest font-bold transition-colors ${formData.timeUnknown ? 'text-[#D2A95A]' : 'text-white/40 hover:text-white'}`}
              >
                {formData.timeUnknown ? '[X] Unbekannt' : '[ ] Unbekannt'}
              </button>
            </div>
            <input
              type="time"
              disabled={formData.timeUnknown}
              className={`w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none transition-all [color-scheme:dark] ${formData.timeUnknown ? 'opacity-30 cursor-not-allowed' : 'focus:border-[#D2A95A]/60'}`}
              value={formData.timeUnknown ? '12:00' : formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required={!formData.timeUnknown}
            />
          </div>

          {/* Action Button */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full relative py-5 rounded-2xl text-[12px] font-extrabold uppercase tracking-[0.5em] transition-all overflow-hidden flex items-center justify-center gap-3
                ${loading 
                  ? 'bg-white/5 text-white/50 cursor-wait' 
                  : success 
                    ? 'bg-[#6CA192] text-black' 
                    : 'bg-[#D2A95A] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  BERECHNE_MATRIX...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={18} />
                  CALCULATION_COMPLETE
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Horoskop berechnen
                </>
              )}
              
              {/* Shine effect on button */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[glint_4s_infinite]" />
            </button>
            <div className="mt-4 text-center">
              <span className="mono text-[8px] text-[#6CA192] uppercase tracking-[0.4em] opacity-60">
                Precision: high_fidelity • Source: swiss_ephemeris_v2
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HoroscopeInput;
