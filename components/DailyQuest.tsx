
import React from 'react';
import { Sparkles, ArrowRight, Zap, Eye } from 'lucide-react';

const DailyQuest: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#18181B] rounded-[2rem] p-10 text-white shadow-3xl border border-white/5 group transition-all duration-500 hover:border-[#22D3EE]/30">
      {/* Decorative Glows */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#22D3EE]/10 blur-[120px] rounded-full animate-pulse-soft" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C5A059]/5 blur-[100px] rounded-full" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#0A0A0B] rounded-lg border border-[#22D3EE]/40">
              <Zap size={14} className="text-[#22D3EE] glow-cyan" />
            </div>
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#71717A]">Aktueller Fokus</h3>
          </div>
          <div className="px-3 py-1 rounded-full border border-[#C5A059]/20 text-[8px] mono text-[#C5A059] uppercase tracking-widest">
            Premium
          </div>
        </div>

        <h2 className="serif text-4xl font-light mb-4 leading-tight">Die Kunst der Stille</h2>
        <p className="text-[#A1A1AA] text-sm mb-10 max-w-md font-light leading-relaxed">
          Dein Merkur-Transit deutet auf eine Phase der <span className="text-white">intuitiven Verarbeitung</span> hin. Vermeide Lärm.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[9px] text-[#71717A] uppercase tracking-widest font-bold">
              <div className="w-1 h-1 rounded-full bg-[#22D3EE]" />
              Ritual
            </div>
            <div className="p-5 bg-[#0A0A0B] rounded-2xl border border-white/5 text-xs text-[#E4E4E7] leading-relaxed">
              Zünde eine Kerze an und beobachte die Flamme für 5 Minuten ohne Gedanken.
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[9px] text-[#71717A] uppercase tracking-widest font-bold">
              <div className="w-1 h-1 rounded-full bg-[#C5A059]" />
              Reflexion
            </div>
            <div className="p-5 bg-[#0A0A0B] rounded-2xl border border-white/5 text-xs text-[#E4E4E7] leading-relaxed italic opacity-80">
              Welcher Teil deiner Wahrheit wird gerade im Schatten gehalten?
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-10 border-t border-white/5">
          <div className="mono text-[9px] text-[#71717A] uppercase tracking-[0.2em]">
            Sync: mercurius_alpha_9
          </div>
          <button className="flex items-center gap-3 px-8 py-4 bg-[#C5A059] text-[#0A0A0B] hover:bg-white transition-all duration-300 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group">
            Deep Dive
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
