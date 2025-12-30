
import React, { useState, useEffect } from 'react';
import { Badge } from '../types';
import { Sparkles, Star, ChevronRight, Globe, CircleDot, Layers, Wind, Zap, Info, Flame, TreeDeciduous, Waves, Mountain, Diamond, Scan, X, Cpu, Activity, Box, ZapOff, Database } from 'lucide-react';
import { ZODIAC_SHIELDS, ZODIAC_DATA, COLORS } from '../constants';

interface IdentityBadgesProps {
  badges: Badge[];
}

const LensFlare: React.FC<{ delay?: string; color?: string }> = ({ delay = '0s', color = '#6CA192' }) => (
  <div 
    className="absolute w-64 h-1 bg-white/20 blur-[60px] pointer-events-none rotate-45 animate-flare"
    style={{ animationDelay: delay, backgroundColor: color }}
  />
);

const CosmicBackdrop: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.5rem]">
      {/* Sun Corona */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D2A95A]/20 blur-[80px] rounded-full animate-pulse-slow" />
      
      {/* Light Beams */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-0 animate-sweep" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-[#6CA192]/10 to-transparent rotate-45 animate-sweep-delayed" />
      
      {/* Eclipse 3D Animation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
        {/* The "Sun" */}
        <div className="absolute inset-0 bg-[#D2A95A] rounded-full blur-[2px] shadow-[0_0_60px_#D2A95A]" />
        {/* The "Moon" moving across */}
        <div className="absolute inset-0 bg-black rounded-full shadow-inner animate-eclipse-path" />
      </div>

      {/* Lens Flares */}
      <div className="absolute top-1/4 left-1/4">
        <LensFlare delay="0s" color="#D2A95A" />
      </div>
      <div className="absolute bottom-1/4 right-1/4">
        <LensFlare delay="2s" color="#6CA192" />
      </div>
    </div>
  );
};

const ZodiacShield: React.FC<{ 
  badge: Badge; 
  isActive?: boolean;
  onClick?: () => void;
}> = ({ badge, isActive, onClick }) => {
  const imageUrl = badge.signKey ? ZODIAC_SHIELDS[badge.signKey] : null;
  const info = badge.signKey ? ZODIAC_DATA[badge.signKey] : null;
  
  return (
    <div 
      className={`relative flex flex-col items-center group cursor-pointer transition-all duration-500 ${isActive ? 'translate-y-[-12px]' : ''}`}
      onClick={onClick}
    >
      {/* High-Tech Tooltip */}
      {info && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
          <div className="bg-[#0F3045] border border-[#6CA192] rounded-lg px-4 py-2 shadow-[0_0_20px_rgba(108,161,146,0.4)] backdrop-blur-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex flex-col gap-1 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <CircleDot size={10} className="text-[#D2A95A]" />
                <span className="text-[9px] mono font-bold text-white uppercase tracking-widest">{info.ruler}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={10} className="text-[#6CA192]" />
                <span className="text-[9px] mono font-bold text-white uppercase tracking-widest">{info.element}</span>
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0F3045] border-r border-b border-[#6CA192] rotate-45" />
          </div>
        </div>
      )}

      {/* Active Selection Glow Layers */}
      {isActive && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#D2A95A]/20 blur-2xl rounded-full animate-pulse pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-[#D2A95A]/40 rounded-full animate-ping-slow pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-dashed border-[#6CA192]/60 rounded-full animate-spin-slow pointer-events-none" />
        </>
      )}

      <div className={`
        relative rounded-full overflow-hidden transition-all duration-700 p-[3px] glass-reflection z-10
        ${isActive ? 'w-24 h-24 ring-2 ring-[#D2A95A] ring-offset-4 ring-offset-black shadow-[0_0_40px_rgba(210,169,90,0.6)]' : 'w-20 h-20 border border-white/20 group-hover:border-[#6CA192]/60 shadow-none'}
      `}>
        <div className="w-full h-full rounded-full overflow-hidden relative bg-[#0F3045]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={badge.label} 
              className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'scale-125' : 'scale-110 opacity-70 group-hover:opacity-100'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Star size={18} className="text-[#D2A95A]" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10 pointer-events-none" />
        </div>
      </div>

      <div className="mt-6 text-center z-10">
        <div className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 ${isActive ? 'text-[#D2A95A] glow-gold scale-110' : 'text-[#6CA192]'}`}>
          {badge.label.split(': ')[1] || badge.label}
        </div>
        <div className={`text-[8px] mono uppercase tracking-widest transition-opacity duration-500 mt-1 ${isActive ? 'text-white opacity-80' : 'text-[#F7F0E6] opacity-40'}`}>
          {badge.subType || 'Essenz'}
        </div>
      </div>
    </div>
  );
};

const BRANCH_ELEMENTS: Record<string, { element: string, icon: any, color: string }> = {
  'Tiger': { element: 'Holz', icon: TreeDeciduous, color: '#6CA192' },
  'Hahn': { element: 'Metall', icon: Diamond, color: '#A1A1AA' },
  'Schwein': { element: 'Wasser', icon: Waves, color: '#22D3EE' },
  'Ratte': { element: 'Wasser', icon: Waves, color: '#22D3EE' },
  'Drache': { element: 'Erde', icon: Mountain, color: '#D2A95A' },
  'Schlange': { element: 'Feuer', icon: Flame, color: '#D2A95A' },
  'Pferd': { element: 'Feuer', icon: Flame, color: '#D2A95A' },
  'Ziege': { element: 'Erde', icon: Mountain, color: '#D2A95A' },
  'Affe': { element: 'Metall', icon: Diamond, color: '#A1A1AA' },
  'Hund': { element: 'Erde', icon: Mountain, color: '#D2A95A' },
  'Ochse': { element: 'Erde', icon: Mountain, color: '#D2A95A' },
  'Hase': { element: 'Holz', icon: TreeDeciduous, color: '#6CA192' }
};

const STEM_ATTRIBUTES: Record<string, { quality: string, polarity: string, icon: any }> = {
  'Holz': { quality: 'Expansion', polarity: 'Yang', icon: TreeDeciduous },
  'Metall': { quality: 'Präzision', polarity: 'Yin', icon: Diamond },
  'Wasser': { quality: 'Intuition', polarity: 'Yin', icon: Waves },
  'Erde': { quality: 'Zentrum', polarity: 'Yang', icon: Mountain },
  'Feuer': { quality: 'Dynamik', polarity: 'Yang', icon: Flame },
};

const PILLAR_METADATA = [
  { role: 'Jahr', detail: 'Ahnen-Matrix' },
  { role: 'Monat', detail: 'Karriere-Pfad' },
  { role: 'Tag', detail: 'Selbst-Kern' },
  { role: 'Stunde', detail: 'Zukunfts-Orbit' }
];

const IdentityBadges: React.FC<IdentityBadgesProps> = ({ badges }) => {
  const [activePillarIndex, setActivePillarIndex] = useState<number | null>(null);
  const [activeWesternIndex, setActiveWesternIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState(false);
  
  const westernBadges = badges.filter(b => b.type === 'western');
  const baziBadges = badges.filter(b => b.type === 'bazi');
  const activeWesternBadge = westernBadges[activeWesternIndex];
  const activeWesternData = activeWesternBadge?.signKey ? ZODIAC_DATA[activeWesternBadge.signKey] : null;

  const handlePillarClick = (idx: number) => {
    setIsScanning(true);
    setActivePillarIndex(idx);
    // Simulate complex scan before showing modal content
    setTimeout(() => setIsScanning(false), 800);
  };

  const getPillarDetails = (label: string) => {
    const parts = label.split('-');
    const stemName = parts[0] || 'Unbekannt';
    const branchName = parts[1] || 'Unbekannt';
    const stemInfo = STEM_ATTRIBUTES[stemName] || { quality: 'Neutral', polarity: 'Yang', icon: CircleDot };
    const branchInfo = BRANCH_ELEMENTS[branchName] || { element: 'Neutral', icon: CircleDot, color: '#6CA192' };
    return { stemName, branchName, ...stemInfo, ...branchInfo };
  };

  return (
    <div className="relative pt-24 pb-16 animate-reveal">
      {/* Background Title */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center pointer-events-none opacity-10">
        <div className="cluster-title serif uppercase tracking-[1em]">KOSMOS_LINK</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Western Profile Cards */}
        <div className="lg:col-span-6 flex flex-col items-center space-y-12">
          <div className="flex items-center gap-10 mb-4 h-32">
            {westernBadges.map((badge, idx) => (
              <ZodiacShield 
                key={idx} 
                badge={badge} 
                isActive={activeWesternIndex === idx}
                onClick={() => setActiveWesternIndex(idx)}
              />
            ))}
          </div>

          <div className="w-full bg-[#0F3045]/40 rounded-[2.5rem] p-12 border-l-4 border-[#6CA192] relative overflow-hidden glass-reflection group shadow-3xl backdrop-blur-xl min-h-[400px]">
             {/* Dynamic Cosmic Background */}
             <CosmicBackdrop />
             
             <div className="relative z-20">
               <div className="scanline" />
               <div className="flex justify-between items-start mb-10">
                 <div>
                   <h4 className="serif text-4xl text-white font-light tracking-tight mb-2">
                     {activeWesternBadge?.signKey?.toUpperCase()} <span className="text-[#6CA192]/60 font-thin">Matrix</span>
                   </h4>
                   <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-[#D2A95A] animate-pulse shadow-[0_0_8px_#D2A95A]" />
                     <span className="mono text-[10px] text-[#6CA192] font-bold tracking-[0.4em] uppercase">Active_Bio_Sync</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-3 px-4 py-2 bg-black/40 rounded-lg border border-white/10 backdrop-blur-md">
                   <Activity size={12} className="text-[#D2A95A] animate-pulse" />
                   <span className="mono text-[9px] text-[#F7F0E6] font-medium tracking-widest uppercase">Signal_Locked</span>
                 </div>
               </div>
               
               <p className="text-lg text-[#F7F0E6] italic opacity-90 mb-12 border-l-2 border-[#D2A95A] pl-8 py-3 leading-relaxed font-light max-w-md">
                 "{activeWesternData?.keywords}"
               </p>

               <div className="grid grid-cols-2 gap-8">
                 <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-[#D2A95A]/40 transition-all duration-500 group/item">
                   <div className="w-14 h-14 rounded-full bg-[#D2A95A]/10 border border-[#D2A95A]/30 flex items-center justify-center text-[#D2A95A] glow-gold group-hover/item:scale-110 transition-transform">
                      <CircleDot size={24} />
                   </div>
                   <div>
                     <div className="text-[10px] mono text-[#6CA192] uppercase tracking-[0.2em] font-bold mb-1">Ruling Force</div>
                     <div className="text-xl font-light text-white tracking-tight">{activeWesternData?.ruler}</div>
                   </div>
                 </div>
                 <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-[#6CA192]/40 transition-all duration-500 group/item">
                   <div className="w-14 h-14 rounded-full bg-[#6CA192]/10 border border-[#6CA192]/30 flex items-center justify-center text-[#6CA192] glow-teal group-hover/item:scale-110 transition-transform">
                      <Globe size={24} />
                   </div>
                   <div>
                     <div className="text-[10px] mono text-[#6CA192] uppercase tracking-[0.2em] font-bold mb-1">Elemental Unit</div>
                     <div className="text-xl font-light text-white tracking-tight">{activeWesternData?.element}</div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* BaZi Selector Grid */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
           <div className="grid grid-cols-2 gap-6">
             {baziBadges.map((badge, idx) => {
               const baziDetails = getPillarDetails(badge.label);
               return (
                 <div key={idx} className="relative group">
                   {/* Hover Tooltip Overlay */}
                   <div className="absolute bottom-full left-0 w-full mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 translate-y-4 group-hover:translate-y-0">
                      <div className="bg-[#0F3045] border border-[#D2A95A] rounded-2xl p-6 shadow-[0_0_30px_rgba(210,169,90,0.3)] backdrop-blur-2xl overflow-hidden relative">
                        <div className="scanline opacity-30" />
                        <div className="flex items-center gap-3 mb-4">
                           <Database size={12} className="text-[#D2A95A]" />
                           <span className="text-[9px] mono font-bold text-[#D2A95A] uppercase tracking-[0.3em]">PILLAR_DECODE_0{idx+1}</span>
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center border-b border-white/10 pb-2">
                             <span className="text-[9px] mono text-[#6CA192] uppercase font-bold">Stem</span>
                             <span className="text-xs text-white font-medium">{baziDetails.stemName} ({baziDetails.polarity})</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-white/10 pb-2">
                             <span className="text-[9px] mono text-[#6CA192] uppercase font-bold">Branch</span>
                             <span className="text-xs text-white font-medium">{baziDetails.branchName}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-[9px] mono text-[#6CA192] uppercase font-bold">Element</span>
                             <div className="flex items-center gap-2">
                               <baziDetails.icon size={10} className="text-[#D2A95A]" />
                               <span className="text-xs text-white font-medium">{baziDetails.element}</span>
                             </div>
                           </div>
                        </div>
                      </div>
                   </div>

                   <button
                     onClick={() => handlePillarClick(idx)}
                     className="w-full relative bg-black/40 p-10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:translate-y-[-4px] text-left border border-white/5 group-hover:border-[#D2A95A]/60"
                   >
                     <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-[#6CA192]/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
                     </div>

                     <div className="absolute top-0 right-0 p-4 opacity-40 group-hover:opacity-100 group-hover:text-[#D2A95A] transition-all">
                        <Scan size={16} />
                     </div>

                     <div className="relative z-10">
                       <div className="text-[11px] mono text-[#6CA192] font-bold uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#6CA192] rounded-full animate-pulse" />
                          PILLAR_{idx + 1}
                       </div>
                       <h5 className="serif text-4xl text-white font-light group-hover:text-[#D2A95A] transition-colors duration-500">{badge.label}</h5>
                       <div className="mt-5 flex items-center gap-3 text-[10px] mono uppercase tracking-widest text-[#6CA192]/60 font-bold group-hover:text-[#F7F0E6]/80 transition-colors">
                          <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          {PILLAR_METADATA[idx].detail}
                       </div>
                     </div>

                     <div className="glass-reflection absolute inset-0 pointer-events-none" />
                   </button>
                 </div>
               );
             })}
           </div>
        </div>
      </div>

      {/* AI Synergy Insight Section */}
      <div className="mt-20 bg-[#0F3045]/40 rounded-[3rem] p-16 border border-[#6CA192]/30 relative overflow-hidden group shadow-3xl backdrop-blur-xl">
        <div className="scanline opacity-30" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-12 animate-[warp-shine_6s_infinite]" />
        </div>
        
        <div className="relative z-10 flex flex-col lg:row items-center justify-between gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-black/60 rounded-2xl border border-[#D2A95A]/40 shadow-[0_0_25px_rgba(210,169,90,0.2)]">
                <Sparkles size={28} className="text-[#D2A95A] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm mono font-bold text-[#D2A95A] uppercase tracking-[0.8em] glow-gold">Synergy Analysis</span>
                <span className="text-[10px] mono text-[#6CA192] uppercase tracking-[0.4em] font-medium opacity-60">Cross-System Compatibility Protocol</span>
              </div>
            </div>
            
            <h4 className="serif text-5xl text-white font-light leading-snug mb-6 max-w-3xl">
              Dein <span className="text-[#D2A95A] font-medium underline decoration-[#D2A95A]/30 underline-offset-8">{activeWesternBadge?.signKey?.toUpperCase()}</span> Kern resoniert heute mit einer <span className="text-[#6CA192] font-medium italic">89%igen Präzision</span> innerhalb der {baziBadges[0]?.label}-Matrix.
            </h4>
            <p className="text-base text-[#F7F0E6]/70 leading-relaxed font-light max-w-2xl">
              Die energetische Signatur zwischen deinem westlichen Element und der aktuellen BaZi-Phase zeigt eine harmonische Kopplung.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-5 bg-black/40 p-12 rounded-[2.5rem] border border-white/5 backdrop-blur-md relative overflow-hidden min-w-[300px]">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#6CA192] to-transparent" />
             <div className="mono text-[11px] text-[#6CA192] uppercase tracking-[0.5em] font-bold mb-2">RESONANCE_INDEX</div>
             <div className="text-8xl font-light text-white tracking-tighter flex items-baseline">
                0.89<span className="text-2xl text-[#D2A95A] font-bold ml-2">μ</span>
             </div>
          </div>
        </div>
      </div>

      {/* Interrogation Modal */}
      {activePillarIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-reveal">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setActivePillarIndex(null)} />
          <div className="relative w-full max-w-2xl bg-[#0F3045] rounded-[2.5rem] border-2 border-[#6CA192] shadow-[0_0_60px_rgba(108,161,146,0.3)] overflow-hidden glass-reflection p-16">
            <div className="scanline" />
            <div className="relative z-20">
              <div className="flex justify-between items-start mb-16">
                <div>
                   <div className="flex items-center gap-4 mb-4">
                     <Cpu size={20} className="text-[#D2A95A] glow-gold" />
                     <span className="text-[11px] mono font-bold text-[#6CA192] uppercase tracking-[0.8em]">Core_Analysis_Interrogation</span>
                   </div>
                   <h2 className="serif text-7xl text-white font-light tracking-tighter">
                     {baziBadges[activePillarIndex]?.label}
                   </h2>
                </div>
                <button onClick={() => setActivePillarIndex(null)} className="p-4 bg-black/40 rounded-xl border border-white/20 text-white hover:border-[#D2A95A] hover:text-[#D2A95A] transition-all">
                  <X size={28} />
                </button>
              </div>

              {isScanning ? (
                <div className="h-80 flex flex-col items-center justify-center gap-8">
                  <div className="relative w-32 h-32 animate-spin-slow">
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#D2A95A] border-transparent" />
                    <Scan className="absolute inset-0 m-auto text-white opacity-20" size={40} />
                  </div>
                  <div className="mono text-[12px] text-[#6CA192] tracking-[1.2em] animate-pulse">DECRYPTING_PILLAR</div>
                </div>
              ) : (
                <div className="space-y-16 animate-reveal">
                  <p className="text-[#F7F0E6] opacity-70 italic font-light">
                    Analyse der energetischen Ausrichtung für diesen spezifischen Locus in deiner Matrix.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes warp-shine {
          0% { transform: translate(-30%, -30%) rotate(15deg); }
          50% { transform: translate(10%, 10%) rotate(15deg); }
          100% { transform: translate(-30%, -30%) rotate(15deg); }
        }
        @keyframes sweep {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0; }
        }
        @keyframes sweep-delayed {
          0% { transform: translate(-50%, -50%) rotate(45deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translate(-50%, -50%) rotate(405deg); opacity: 0; }
        }
        @keyframes flare {
          0% { transform: scaleX(0) rotate(45deg); opacity: 0; }
          50% { transform: scaleX(1.5) rotate(45deg); opacity: 0.4; }
          100% { transform: scaleX(0) rotate(45deg); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
        }
        @keyframes eclipse-path {
          0% { transform: translateX(110%) scale(1); }
          50% { transform: translateX(0%) scale(1.05); }
          100% { transform: translateX(-110%) scale(1); }
        }
        @keyframes ping-slow {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        .animate-sweep { animation: sweep 12s linear infinite; }
        .animate-sweep-delayed { animation: sweep-delayed 15s linear infinite; }
        .animate-flare { animation: flare 8s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-eclipse-path { animation: eclipse-path 30s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
};

export default IdentityBadges;
