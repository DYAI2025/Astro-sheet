
import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Eye, Heart, Globe, Compass, RefreshCw } from 'lucide-react';

const SegmentedScale: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => {
  const segments = 15;
  const activeSegments = Math.round((value / 100) * segments);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <span className="mono text-[9px] font-bold text-white/50 uppercase tracking-[0.3em]">{label}</span>
        <span className="mono text-[10px] font-bold text-white" style={{ color }}>{value}%</span>
      </div>
      <div className="flex gap-1 h-2 w-full">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 rounded-sm transition-all duration-1000"
            style={{ 
              backgroundColor: i < activeSegments ? color : 'rgba(255,255,255,0.05)',
              boxShadow: i < activeSegments ? `0 0 10px ${color}44` : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const PlanetaryOrbits: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center">
      {/* Background Rings */}
      <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow" />
      <div className="absolute inset-8 border border-white/10 rounded-full" style={{ animationDirection: 'reverse', animationDuration: '120s' }} />
      <div className="absolute inset-16 border border-white/5 rounded-full animate-spin-slow" style={{ animationDuration: '240s' }} />
      
      {/* Central Sun */}
      <div className="w-4 h-4 bg-[#C9A46A] rounded-full shadow-[0_0_30px_#C9A46A] z-20" />
      
      {/* Moving Planets (Symbolic) */}
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '45s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#7AA7A1] rounded-full shadow-[0_0_15px_#7AA7A1]" />
      </div>
      <div className="absolute inset-8 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '80s' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#8F7AD1] rounded-full shadow-[0_0_15px_#8F7AD1]" />
      </div>
      <div className="absolute inset-20 animate-spin-slow" style={{ animationDuration: '150s' }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#C9A46A] rounded-full shadow-[0_0_15px_#C9A46A]" />
      </div>

      {/* Aspect Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
        <line x1="50" y1="5" x2="85" y2="70" stroke="white" strokeWidth="0.2" strokeDasharray="1 2" />
        <line x1="15" y1="30" x2="85" y2="70" stroke="#7AA7A1" strokeWidth="0.3" />
        <line x1="50" y1="95" x2="15" y2="30" stroke="#C9A46A" strokeWidth="0.2" />
      </svg>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 mono text-[7px] text-white/30 uppercase tracking-widest text-center">
        Realtime_Celestial_Engine_v4
      </div>
    </div>
  );
};

const DailyQuest: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="dark-premium-card p-12 h-full flex flex-col relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#8F7AD1]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#7AA7A1]/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-10">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white/5 rounded-[1.5rem] border border-white/10 shadow-inner">
              <Globe size={24} className="text-[#7AA7A1]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-extrabold text-[#7AA7A1]">Tageshoroskop</h3>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="mono text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <RefreshCw size={10} className="animate-spin" /> Live Sync
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                   <span className="text-[#C9A46A] text-sm">♓</span>
                   <span className="mono text-[9px] text-white font-bold uppercase tracking-wider">Fische</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
                   <span className="text-[#7AA7A1] text-sm">🐎</span>
                   <span className="mono text-[9px] text-white font-bold uppercase tracking-wider">Metall Pferd</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="text-right">
              <div className="mono text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">Datum: {new Date().toLocaleDateString('de-DE')}</div>
              <div className="mono text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold mt-1">Siderische Zeit: 14:23:09</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-grow">
          {/* Left: Planetary Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white/[0.02] rounded-[3rem] border border-white/5">
            <div className="mono text-[9px] text-white/20 uppercase tracking-[0.6em] mb-8 font-extrabold">Konstellation_Alpha</div>
            <PlanetaryOrbits />
            <div className="mt-8 flex gap-3">
              {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#C9A46A]/20" />)}
            </div>
          </div>

          {/* Right: Horoscope Text & Scales */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-6">
                <Compass size={14} className="text-[#C9A46A]" />
                <span className="mono text-[10px] text-[#C9A46A] font-extrabold uppercase tracking-[0.4em]">Deine heutige Resonanz</span>
              </div>
              
              <h2 className="serif text-4xl lg:text-5xl font-light mb-8 leading-tight text-white tracking-tight">
                Die Strömung der Intuition nutzen.
              </h2>
              
              <div className="bg-white/[0.03] p-8 rounded-[2rem] border border-white/5 relative group hover:border-[#7AA7A1]/30 transition-all duration-500">
                <p className="text-white/80 text-lg leading-relaxed font-light italic serif">
                  "Merkur bildet heute einen harmonischen Aspekt zu deiner Geburts-Sonne. Dies ist der ideale Zeitpunkt, um komplexe Emotionen in klare Worte zu fassen. Vertraue auf die subtilen Impulse deines Unterbewusstseins – sie leiten dich präziser als jeder rationale Plan."
                </p>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles size={24} className="text-white" />
                </div>
              </div>
            </div>

            {/* Scale Bars Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-10 border-t border-white/10">
              <SegmentedScale label="Energie" value={75} color="#C9A46A" />
              <SegmentedScale label="Intuition" value={92} color="#7AA7A1" />
              <SegmentedScale label="Gefühle" value={84} color="#8F7AD1" />
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 border-t border-white/5 opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Heart size={16} className="text-[#8F7AD1]" />
             </div>
             <div className="mono text-[9px] text-white/40 uppercase tracking-[0.3em] font-bold leading-tight">
                Fokus des Tages:<br/>Selbstakzeptanz
             </div>
          </div>
          <button className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white text-white hover:text-[#0E1B33] border border-white/10 transition-all duration-500 rounded-full text-[10px] font-extrabold uppercase tracking-[0.5em] flex items-center justify-center gap-3">
            <Eye size={14} /> Details ansehen
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
