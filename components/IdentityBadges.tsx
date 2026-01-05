
import React, { useState, useEffect, useRef } from 'react';
import { MasterIdentity, BaZiPillarData } from '../types';
import { 
  Sparkles, Zap, Star, Cpu, Hexagon, Database, 
  Sun, Wand2, Loader2, Info, Boxes, Terminal, Shield,
  Flame, Mountain, Wind, Waves, Compass, ChevronDown, ChevronUp
} from 'lucide-react';
import SigilPortrait from './SigilPortrait';
import { ZODIAC_DATA, ZodiacInfo } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface IdentityBadgesProps {
  data: MasterIdentity;
}

const RULER_GLYPHS: Record<string, string> = {
  'Sonne': '☉',
  'Mond': '☽',
  'Merkur': '☿',
  'Venus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturn': '♄',
  'Uranus': '♅',
  'Neptun': '♆',
  'Pluto': '♇',
};

const POINT_GLYPHS: Record<string, string> = {
  'Sonne': '☉',
  'Mond': '☽',
  'Rising': 'ASC',
};

const ELEMENT_ICONS: Record<string, any> = {
  'Feuer': Flame,
  'Erde': Mountain,
  'Luft': Wind,
  'Wasser': Waves,
};

const signMap: Record<string, string> = {
  'widder': 'aries', 'aries': 'aries',
  'stier': 'taurus', 'taurus': 'taurus',
  'zwilling': 'gemini', 'gemini': 'gemini',
  'krebs': 'cancer', 'cancer': 'cancer',
  'löwe': 'leo', 'leo': 'leo',
  'jungfrau': 'virgo', 'virgo': 'virgo',
  'waage': 'libra', 'libra': 'libra',
  'skorpion': 'scorpio', 'scorpio': 'scorpio',
  'schütze': 'sagittarius', 'sagittarius': 'sagittarius',
  'steinbock': 'capricorn', 'capricorn': 'capricorn',
  'wassermann': 'aquarius', 'aquarius': 'aquarius',
  'fische': 'pisces', 'pisces': 'pisces'
};

const getZodiacSymbol = (sign: string) => {
  const normalized = sign.toLowerCase();
  if (normalized.includes('widder') || normalized.includes('aries')) return '♈';
  if (normalized.includes('stier') || normalized.includes('taurus')) return '♉';
  if (normalized.includes('zwilling') || normalized.includes('gemini')) return '♊';
  if (normalized.includes('krebs') || normalized.includes('cancer')) return '♋';
  if (normalized.includes('löwe') || normalized.includes('leo')) return '♌';
  if (normalized.includes('jungfrau') || normalized.includes('virgo')) return '♍';
  if (normalized.includes('waage') || normalized.includes('libra')) return '♎';
  if (normalized.includes('skorpion') || normalized.includes('scorpio')) return '♏';
  if (normalized.includes('schütze') || normalized.includes('sagittarius')) return '♐';
  if (normalized.includes('steinbock') || normalized.includes('capricorn')) return '♑';
  if (normalized.includes('wassermann') || normalized.includes('aquarius')) return '♒';
  if (normalized.includes('fische') || normalized.includes('pisces')) return '♓';
  return '✧';
};

const getRulerGlyphs = (rulerStr: string) => {
  if (!rulerStr) return '';
  return rulerStr.split('/').map(r => RULER_GLYPHS[r.trim()] || r.trim()).join(' ');
};

const ZodiacBadge: React.FC<{ sign: string; prefix?: string }> = ({ sign, prefix }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const normalizedSign = sign.toLowerCase().trim();
  const infoKey = signMap[normalizedSign];
  const info = infoKey ? ZODIAC_DATA[infoKey] : null;

  const pointGlyph = prefix ? POINT_GLYPHS[prefix] : null;
  const rulerGlyph = info?.ruler ? getRulerGlyphs(info.ruler) : null;
  const ElementIcon = info?.element ? ELEMENT_ICONS[info.element] : Compass;

  return (
    <div 
      className="relative flex items-center gap-6 cursor-help group/zodiac transition-all w-full py-4 border-b border-[var(--stroke)] last:border-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => !isSticky && setShowTooltip(false)}
      onClick={() => setIsSticky(!isSticky)}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border transition-all duration-300 select-none ${
        showTooltip || isSticky 
          ? 'bg-[var(--holo-violet)] text-[var(--navy)] border-[var(--holo-violet)] scale-105 shadow-[0_0_25px_var(--holo-violet)]' 
          : 'bg-[var(--bg-paper)] text-[var(--holo-violet)] border-[var(--stroke)] group-hover/zodiac:border-[var(--holo-violet)] group-hover/zodiac:scale-105'
      }`}>
        {getZodiacSymbol(sign)}
      </div>
      <div className="flex flex-col items-start justify-center">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-[var(--holo-gold)] text-xs font-bold leading-none">{pointGlyph}</span>
          <span className="opacity-60 font-bold mono text-[9px] uppercase tracking-[0.3em] text-[var(--muted)]">
            {prefix}
          </span>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="text-[var(--navy)] font-bold text-lg uppercase tracking-tight">{sign}</span>
          <span className="text-[var(--holo-violet)] text-xl leading-none opacity-40 group-hover/zodiac:opacity-100 transition-opacity">
            {getZodiacSymbol(sign)}
          </span>
          {rulerGlyph && <span className="text-[var(--muted)] text-[10px] mono opacity-40 group-hover/zodiac:opacity-100 transition-opacity">({rulerGlyph})</span>}
        </div>
      </div>
      
      {(showTooltip || isSticky) && info && (
        <div className="absolute left-[110%] top-0 w-72 bg-[var(--card-bg)]/98 backdrop-blur-2xl text-[var(--navy)] p-8 rounded-[2.5rem] shadow-[0_25px_80px_rgba(0,0,0,0.2)] z-[100] animate-reveal border border-[var(--stroke)] ring-1 ring-white/10">
          <div className="flex items-center gap-5 mb-6 border-b border-[var(--stroke)] pb-6">
            <div className="w-16 h-16 rounded-[1.25rem] bg-[var(--bg-paper)] flex items-center justify-center text-[var(--holo-gold)] text-4xl shadow-inner border border-[var(--stroke)]">
              {getZodiacSymbol(sign)}
            </div>
            <div className="flex flex-col">
              <span className="mono text-[16px] font-bold uppercase tracking-[0.15em] text-[var(--navy)]">{sign}</span>
              <span className="mono text-[9px] text-[var(--holo-cyan)] uppercase tracking-[0.4em] font-extrabold mt-1">Matrix_Sync_v2</span>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Sun size={12} className="text-[var(--holo-gold)]" />
                <span className="mono text-[10px] uppercase opacity-70 tracking-widest font-bold">Herrscher</span>
              </div>
              <span className="text-[13px] font-bold text-[var(--navy)] flex items-center gap-3">
                <span className="text-[11px] mono p-1.5 bg-[var(--bg-paper)] rounded-lg leading-none border border-[var(--stroke)]">{rulerGlyph}</span> 
                {info.ruler}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ElementIcon size={12} className="text-[var(--holo-cyan)]" />
                <span className="mono text-[10px] uppercase opacity-70 tracking-widest font-bold">Element</span>
              </div>
              <span className="text-[13px] font-bold text-[var(--navy)] uppercase tracking-wide">
                {info.element}
              </span>
            </div>

            <div className="pt-6 mt-4 border-t border-[var(--stroke)]">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={10} className="text-[var(--holo-gold)]" />
                <span className="mono text-[8px] text-[var(--muted)] uppercase tracking-[0.3em] font-extrabold">Essenz_Kernel</span>
              </div>
              <p className="text-[12px] text-[var(--muted)] italic leading-relaxed font-light serif bg-[var(--bg-paper)] p-4 rounded-2xl border border-[var(--stroke)] text-center">
                {info.keywords}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BaZiPillar: React.FC<{ data: BaZiPillarData; active: boolean; onClick: () => void }> = ({ data, active, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group/pillar-container">
      {/* Active Glowing Ring */}
      <div className={`absolute -inset-[4px] rounded-[2.3rem] opacity-0 transition-all duration-700 pointer-events-none z-0 ${
        active 
          ? 'opacity-100 bg-gradient-to-br from-[var(--holo-gold)] via-[var(--holo-cyan)] to-[var(--holo-violet)] animate-[holo-shimmer_6s_linear_infinite] shadow-[0_0_40px_rgba(182,237,242,0.5)]' 
          : 'group-hover/pillar-container:opacity-30 bg-gradient-to-r from-[var(--stroke)] to-[var(--holo-cyan)]/30'
      }`} 
      style={{ backgroundSize: '200% 200%' }}
      />
      
      <div className={`absolute inset-0 rounded-[2rem] pointer-events-none z-[5] bg-white transition-opacity duration-700 ${
        active ? 'opacity-10' : 'opacity-0'
      }`} />

      <div 
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => !active && setShowTooltip(false)}
        className={`relative cursor-pointer py-7 px-12 rounded-[2rem] border transition-all duration-700 overflow-hidden group/pillar z-10 ${
          active 
            ? 'border-transparent bg-white/5 backdrop-blur-3xl scale-[1.02]' 
            : 'bg-[var(--bg-paper)] border-[var(--stroke)] hover:bg-[var(--card-bg)] hover:border-transparent hover:translate-x-1.5 shadow-sm'
        }`}
      >
        {active && (
          <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[scan-shine_3s_infinite_ease-in-out]" />
          </div>
        )}

        <div className={`absolute left-0 top-0 bottom-0 w-2 transition-all duration-700 ${
          active ? 'bg-gradient-to-b from-[var(--holo-cyan)] via-[var(--holo-gold)] to-[var(--holo-violet)]' : 'bg-[var(--stroke)] opacity-40'
        }`} />

        <div className="flex justify-between items-center relative z-10">
          <div className="flex items-center gap-8">
             <div className={`p-4 rounded-2xl border transition-all duration-500 ${
               active 
                ? 'bg-[var(--navy)] border-[var(--navy)] scale-110 shadow-2xl' 
                : 'bg-[var(--bg-paper)] border-[var(--stroke)] group-hover/pillar:border-transparent'
             }`}>
                <Cpu size={22} className={active ? 'text-[var(--holo-cyan)]' : 'text-[var(--muted)] group-hover/pillar:text-[var(--holo-cyan)]'} />
             </div>
             <div>
                <span className={`mono text-[11px] font-extrabold uppercase tracking-[0.5em] block mb-2 transition-colors ${active ? 'text-[var(--holo-gold)]' : 'text-[var(--muted)]'}`}>
                  {data.label} Pillar
                </span>
                <span className={`text-2xl font-bold tracking-tighter transition-colors ${active ? 'text-[var(--navy)]' : 'text-[var(--navy)]/90'}`}>
                  {data.value}
                </span>
             </div>
          </div>
          <div className={`flex items-center gap-6 transition-all duration-700 ${active ? 'translate-x-4' : ''}`}>
             <div className={`flex flex-col items-end opacity-0 group-hover/pillar:opacity-100 transition-opacity ${active ? 'opacity-100' : ''}`}>
               <span className="mono text-[9px] font-bold uppercase tracking-widest text-[var(--muted)]">Matrix_Core</span>
               <span className={`mono text-[10px] font-extrabold uppercase tracking-widest ${active ? 'text-[var(--holo-cyan)]' : 'text-[var(--navy)]'}`}>0x{Math.floor(Math.random() * 999)}</span>
             </div>
             <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border border-[var(--stroke)] ${active ? 'bg-[var(--holo-gold)] text-[var(--bg-paper)] rotate-180 border-transparent' : 'bg-[var(--bg-paper)] text-[var(--muted)]'}`}>
               <Info size={16} />
             </div>
          </div>
        </div>

        {showTooltip && !active && (
          <div className="absolute left-[85%] bottom-[120%] mb-4 w-72 bg-[var(--card-bg)]/98 backdrop-blur-3xl text-[var(--navy)] p-8 rounded-[3rem] shadow-[0_40px_90px_rgba(0,0,0,0.3)] z-[100] animate-reveal border border-[var(--stroke)]">
             <div className="flex items-center gap-4 mb-6 border-b border-[var(--stroke)] pb-5">
                <Terminal size={16} className="text-[var(--holo-cyan)]" />
                <span className="mono text-[11px] font-extrabold uppercase tracking-[0.25em]">Subsystem_Info</span>
             </div>
             <div className="space-y-6">
                <div>
                   <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-3 font-bold opacity-70">Hidden Elements</span>
                   <div className="flex flex-wrap gap-3">
                      {data.hiddenStems.split('/').map((stem, i) => (
                        <span key={i} className="px-4 py-1.5 bg-[var(--bg-paper)] rounded-xl border border-[var(--stroke)] mono text-[11px] font-bold text-[var(--navy)] shadow-inner">{stem.trim()}</span>
                      ))}
                   </div>
                </div>
                <div className="pt-2">
                   <span className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] block mb-3 font-bold opacity-70">Spirit Domain</span>
                   <div className="flex items-center gap-3 p-4 bg-[var(--bg-paper)] rounded-2xl border border-[var(--stroke)]">
                     <Shield size={14} className="text-[var(--holo-gold)]" />
                     <span className="mono text-[11px] font-extrabold text-[var(--navy)] uppercase tracking-wider">{data.aspect}</span>
                   </div>
                </div>
             </div>
             <div className="absolute top-full left-12 w-5 h-5 bg-[var(--card-bg)] rotate-45 -mt-2.5 border-r border-b border-[var(--stroke)]" />
          </div>
        )}
      </div>

      {/* Smooth Expansion Panel with Staggered Content */}
      <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? 'grid-rows-[1fr] opacity-100 mt-10' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>
        <div className="overflow-hidden min-h-0">
          <div className="p-14 bg-[var(--card-bg)] text-[var(--navy)] rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-[var(--stroke)] relative overflow-hidden z-20">
            {/* Subtle animated background glow when expanded */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <div className="absolute top-0 right-0 p-16"><Boxes size={320} strokeWidth={0.2} /></div>
              <div className="absolute -bottom-24 -left-24 w-[30rem] h-[30rem] bg-[var(--holo-yellow)] blur-[120px] rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--holo-cyan)]/5 via-transparent to-[var(--holo-violet)]/5" />
            </div>
            
            <div className="relative z-10">
              {/* Stagger Step 1: Header */}
              <div className={`flex items-center justify-between mb-14 border-b border-[var(--stroke)] pb-10 transition-all duration-700 delay-100 ${active ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-center gap-6">
                   <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--holo-cyan)] via-[var(--holo-gold)] to-transparent" />
                   <span className="mono text-[12px] font-extrabold uppercase tracking-[0.5em] text-[var(--navy)]">System_Reconstruction</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-2.5 h-2.5 rounded-full bg-[var(--holo-gold)] animate-pulse shadow-[0_0_10px_var(--holo-gold)]" />
                   <span className="mono text-[11px] text-[var(--muted)] uppercase tracking-[0.3em] font-bold">Calculation_Optimal</span>
                </div>
              </div>

              {/* Stagger Step 2: Grid Panels */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 transition-all duration-700 delay-300 ${active ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="p-10 rounded-[2.5rem] bg-[var(--bg-paper)]/50 border border-[var(--stroke)] transition-all shadow-inner group/panel">
                   <span className="mono text-[11px] text-[var(--muted)] uppercase tracking-widest block mb-6 font-extrabold group-hover/panel:text-[var(--holo-cyan)]">Neural_Resonance</span>
                   <div className="flex flex-wrap gap-5">
                      {data.hiddenStems.split('/').map((s, i) => (
                        <div key={i} className="flex flex-col items-center">
                           <div className="w-16 h-16 rounded-3xl bg-[var(--card-bg)] border border-[var(--stroke)] flex items-center justify-center mb-3.5 shadow-lg group-hover/panel:scale-105 transition-transform">
                              <span className="text-[var(--navy)] font-bold text-lg">{s.trim()[0]}</span>
                           </div>
                           <span className="mono text-[10px] text-[var(--muted)] font-bold uppercase tracking-widest opacity-60">{s.trim()}</span>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-[var(--bg-paper)]/50 border border-[var(--stroke)] transition-all shadow-inner group/panel">
                   <span className="mono text-[11px] text-[var(--muted)] uppercase tracking-widest block mb-6 font-extrabold group-hover/panel:text-[var(--holo-gold)]">Functional_Alignment</span>
                   <div className="flex items-center gap-8">
                      <div className="p-6 bg-[var(--holo-gold)]/10 rounded-[1.5rem] border border-[var(--holo-gold)]/20 shadow-xl group-hover/panel:rotate-6 transition-transform">
                         <Shield size={32} className="text-[var(--holo-gold)]" />
                      </div>
                      <div>
                         <span className="mono text-[16px] font-extrabold text-[var(--navy)] block uppercase tracking-[0.1em] mb-2">{data.aspect}</span>
                         <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[var(--muted)] mono font-bold uppercase tracking-widest">Protocol_State: Nominal</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Stagger Step 3: Description Text */}
              <div className={`bg-[var(--bg-paper)] p-12 rounded-[3.5rem] border border-[var(--stroke)] relative shadow-inner group/text text-center transition-all duration-700 delay-500 ${active ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="absolute top-8 right-12 opacity-30"><Sparkles size={50} className="text-[var(--holo-gold)] group-hover/text:rotate-12 transition-transform" /></div>
                <p className="serif italic text-4xl leading-relaxed text-[var(--navy)]/95 font-light">
                   "{data.description}"
                </p>
                <div className="mt-12 flex gap-2">
                   {Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-1000 ${i < 6 ? 'bg-[var(--holo-cyan)]/30' : 'bg-[var(--stroke)]'}`} />
                   ))}
                   <div className="h-1.5 flex-1 rounded-full bg-[var(--holo-gold)] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanetaryVisualization: React.FC<{ konstellation: any }> = ({ konstellation }) => {
  const [ticks, setTicks] = useState(0);
  const requestRef = useRef<number>(0);
  
  const animate = (time: number) => {
    setTicks(time);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const getBodyPos = (baseAngle: number, radius: number, speedMult: number) => {
    const angle = (baseAngle + (ticks * 0.005 * speedMult)) % 360;
    const rad = (angle * Math.PI) / 180;
    return {
      x: 200 + Math.cos(rad) * radius,
      y: 100 + Math.sin(rad) * radius,
      angle
    };
  };

  const sun = getBodyPos(45, 65, 1);
  const moon = getBodyPos(180, 80, 1.4);
  const asc = getBodyPos(300, 50, 0.8);

  const checkAspect = (a1: number, a2: number) => {
    const diff = Math.abs(a1 - a2) % 180;
    const normDiff = diff > 90 ? 180 - diff : diff;
    if (normDiff < 5) return { type: 'Conjunction', color: 'var(--holo-gold)' };
    if (Math.abs(normDiff - 90) < 5) return { type: 'Square', color: 'var(--holo-violet)' };
    return null;
  };

  const sunMoonAspect = checkAspect(sun.angle, moon.angle);
  const moonAscAspect = checkAspect(moon.angle, asc.angle);

  const emptyZodiac: ZodiacInfo = { ruler: '', element: '', modality: '', keywords: '' };
  const sunInfo = ZODIAC_DATA[signMap[konstellation.sun.toLowerCase()]] || emptyZodiac;
  const moonInfo = ZODIAC_DATA[signMap[konstellation.moon.toLowerCase()]] || emptyZodiac;
  const ascInfo = ZODIAC_DATA[signMap[konstellation.rising.toLowerCase()]] || emptyZodiac;

  return (
    <div className="relative w-full aspect-[1.618] bg-[#020617] rounded-[3.5rem] overflow-hidden border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] mt-20 group/align cursor-crosshair">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1e1b4b_0%,transparent_60%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#4c1d95_0%,transparent_50%)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#083344_0%,transparent_70%)] opacity-60" />
      
      <div className="absolute inset-0 opacity-[0.25] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay animate-pulse" />

      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ transform: 'rotateX(40deg)' }}>
           {Array.from({ length: 36 }).map((_, i) => (
             <line 
               key={i} 
               x1="200" y1="100" 
               x2={200 + Math.cos((i * 10 * Math.PI) / 180) * 450} 
               y2={100 + Math.sin((i * 10 * Math.PI) / 180) * 450} 
               stroke="white" strokeWidth="0.3" strokeDasharray="2 12" 
             />
           ))}
           <circle cx="200" cy="100" r="65" fill="none" stroke="white" strokeWidth="0.2" />
           <circle cx="200" cy="100" r="100" fill="none" stroke="white" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full p-12 overflow-visible">
          <defs>
            <radialGradient id="sunGrad" cx="35%" cy="35%" r="65%"><stop offset="0%" stopColor="white" /><stop offset="25%" stopColor="var(--holo-gold)" /><stop offset="100%" stopColor="#D97706" /></radialGradient>
            <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#F5F3FF" /><stop offset="60%" stopColor="#C7D2FE" /><stop offset="100%" stopColor="#4338CA" /></radialGradient>
            <radialGradient id="ascGrad" cx="30%" cy="30%" r="70%"><stop offset="0%" stopColor="#ECFEFF" /><stop offset="60%" stopColor="var(--holo-cyan)" /><stop offset="100%" stopColor="#0891B2" /></radialGradient>
          </defs>
          <g className="opacity-60 mono text-[6px] fill-white font-bold uppercase tracking-[0.3em] pointer-events-none">
            <text x={sun.x + 18} y={sun.y - 18}>RULER_SOL: {sunInfo.ruler}</text>
            <text x={moon.x + 15} y={moon.y + 18}>RULER_LUN: {moonInfo.ruler}</text>
            <text x={asc.x - 50} y={asc.y - 8}>AC_ASC: {ascInfo.ruler}</text>
          </g>
          <g className="transition-all duration-1000 opacity-40">
            {sunMoonAspect && <line x1={sun.x} y1={sun.y} x2={moon.x} y2={moon.y} stroke="var(--holo-gold)" strokeWidth="0.8" strokeDasharray="5 5" className="animate-pulse" />}
            {moonAscAspect && <line x1={moon.x} y1={moon.y} x2={asc.x} y2={asc.y} stroke="var(--holo-cyan)" strokeWidth="0.8" strokeDasharray="5 5" className="animate-pulse" />}
          </g>
          <circle cx="200" cy="100" r="5" fill="var(--holo-gold)" opacity="0.8" className="shadow-[0_0_20px_var(--holo-gold)]" />
          <g><circle cx={sun.x} cy={sun.y} r="16" fill="url(#sunGrad)" className="shadow-2xl" /><text x={sun.x} y={sun.y + 3.5} textAnchor="middle" className="text-[12px] fill-white select-none font-extrabold">☉</text></g>
          <g><circle cx={moon.x} cy={moon.y} r="11" fill="url(#moonGrad)" className="shadow-2xl" /><text x={moon.x} y={moon.y + 3.5} textAnchor="middle" className="text-[10px] fill-white select-none font-extrabold">☽</text></g>
          <g><circle cx={asc.x} cy={asc.y} r="9" fill="url(#ascGrad)" className="shadow-2xl" /><text x={asc.x} y={asc.y + 3} textAnchor="middle" className="text-[8px] fill-white select-none font-extrabold tracking-tighter">ASC</text></g>
        </svg>
      </div>

      <div className="absolute top-12 left-14 flex items-center gap-6">
        <div className="w-3 h-3 rounded-full bg-[var(--holo-cyan)] animate-pulse shadow-[0_0_20px_var(--holo-cyan)]" />
        <span className="mono text-[11px] font-extrabold text-white/80 uppercase tracking-[0.6em]">Celestial_Transit_Sync_v2.5</span>
      </div>
    </div>
  );
};

const IdentityBadges: React.FC<IdentityBadgesProps> = ({ data }) => {
  const [shineKey, setShineKey] = useState(0);
  const [aiInsight, setAiInsight] = useState(data.bedeutung);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeBaZiPillar, setActiveBaZiPillar] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const baZiData: BaZiPillarData[] = [
    { label: 'Year', value: data.tierkreis, hiddenStems: 'Ji / Ding / Yi', aspect: 'Äußere Welt', description: 'Die Jahressäule repräsentiert deine Wurzeln, deine Vorfahren und wie die Welt dich auf den ersten Blick wahrnimmt.' },
    { label: 'Month', value: data.monatstier, hiddenStems: 'Ji / Ding / Yi', aspect: 'Karriere & Eltern', description: 'Die Monatssäule diktiert dein Arbeitsumfeld und deine Beziehung zu Autoritäten.' },
    { label: 'Day', value: data.tagestier, hiddenStems: 'Xin', aspect: 'Das Selbst', description: 'Die Tagessäule ist der Kern deiner Identität. Sie zeigt dein innerstes Wesen.' }
  ];

  const generateDeepInsight = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const promptText = `Führe eine tiefgehende, vergleichende Analyse zwischen der westlichen Astrologie (Sonne ${data.konstellation.sun}, Mond ${data.konstellation.moon}, AC ${data.konstellation.rising}) und der BaZi-Metaphysik (Tierkreis ${data.tierkreis}) durch. Identifiziere spezifische Synergien und archaische Kontraste zwischen den Elementen und Archetypen beider Systeme. Formuliere die Erkenntnis in einem poetischen, modernem und psychologisch scharfsinnigen Ton (ca. 50 Wörter).`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: promptText,
      });
      const text = response.text;
      if (text) setAiInsight(text.trim());
      setShineKey(p => p + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative animate-reveal transition-all duration-700">
      <div className="absolute -top-20 left-0 w-full flex justify-center pointer-events-none">
        <div className="cluster-title serif uppercase tracking-[1.5em] opacity-[0.05]">RESONANCE</div>
      </div>

      <div className="max-w-6xl mx-auto premium-card">
        <div key={shineKey} className="scan-shine-effect" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[700px]">
          {/* Left Profile Section */}
          <div className="lg:col-span-5 p-16 lg:border-r border-[var(--stroke)] flex flex-col items-center justify-center relative bg-[var(--bg-paper)] transition-colors duration-500">
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--holo-gold),transparent_60%)]"></div>
            
            <div className="absolute top-14 left-14 flex items-center gap-5">
              <Hexagon size={22} className="text-[var(--holo-gold)]" />
              <span className="mono text-[11px] text-[var(--muted)] font-extrabold tracking-[0.5em] uppercase opacity-80">Core_Profile</span>
            </div>
            
            <div className="relative mb-16 scale-110"><SigilPortrait /></div>
            
            <div className="text-center relative z-10 space-y-4">
              <div className="mono text-[11px] text-[var(--holo-gold)] font-extrabold uppercase tracking-[0.6em] mb-4">Master Identity Protocol</div>
              <h2 className="serif text-5xl text-[var(--navy)] font-light tracking-tighter uppercase leading-tight mb-4">
                {data.tierkreis}<br/>{data.konstellation.sun}
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--stroke)] to-transparent mx-auto" />
            </div>
          </div>

          {/* Right Data Section */}
          <div className="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center bg-[var(--card-bg)] transition-colors duration-500 relative">
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle_at_bottom_left,var(--holo-cyan),transparent_70%)]"></div>

            <div className="flex justify-between items-center mb-16 border-b border-[var(--stroke)] pb-12">
              <div className="flex items-center gap-8">
                <div className="p-5 bg-[var(--bg-paper)] rounded-[2rem] shadow-xl border border-[var(--stroke)] relative group/icon overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--holo-cyan)]/15 animate-pulse" />
                  <Database size={30} className="text-[var(--navy)] relative z-10 group-hover/icon:rotate-12 transition-transform" />
                </div>
                <div>
                  <h3 className="serif text-4xl text-[var(--navy)] font-medium tracking-tight leading-none mb-3">Synthese_Matrix</h3>
                  <div className="mono text-[11px] text-[var(--muted)] uppercase tracking-[0.3em] font-extrabold opacity-70">Integrated_Astro_Sync_Engine</div>
                </div>
              </div>
            </div>

            {/* Westliche Konstellation Section */}
            <div className="mb-16 p-8 lg:p-12 rounded-[3rem] bg-[var(--bg-paper)]/60 border border-[var(--stroke)] relative group/astro-box transition-all hover:border-[var(--holo-gold)]/40 shadow-inner overflow-visible">
               <div className="absolute top-0 right-10 -translate-y-1/2 px-8 py-3 bg-[var(--navy)] text-[var(--bg-paper)] mono text-[11px] font-extrabold uppercase tracking-[0.4em] rounded-full shadow-2xl z-20">
                 ASTRO_ALIGNMENT
               </div>
               <div className="flex items-center gap-5 mb-8 px-2">
                  <Star size={20} className="text-[var(--holo-gold)] animate-spin-slow" />
                  <span className="mono text-[12px] text-[var(--navy)] font-extrabold uppercase tracking-[0.5em]">Celestial_Alignment_Module</span>
               </div>
               <div className="flex flex-col gap-1 bg-[var(--card-bg)]/40 p-4 lg:p-8 rounded-[2rem] border border-[var(--stroke)]/50">
                  <ZodiacBadge prefix="Sonne" sign={data.konstellation.sun} />
                  <ZodiacBadge prefix="Mond" sign={data.konstellation.moon} />
                  <ZodiacBadge prefix="Rising" sign={data.konstellation.rising} />
               </div>
            </div>

            {/* BaZi Pillars Section */}
            <div className="space-y-10 mb-16">
              <div className="flex items-center gap-6 mb-8 px-6">
                 <Zap size={22} className="text-[var(--holo-cyan)]" />
                 <span className="mono text-[12px] text-[var(--navy)] font-extrabold uppercase tracking-[0.5em]">Quantum_BaZi_Protocols</span>
              </div>
              {baZiData.map((pillar, idx) => (
                <BaZiPillar 
                  key={pillar.label} 
                  data={pillar} 
                  active={activeBaZiPillar === idx}
                  onClick={() => setActiveBaZiPillar(activeBaZiPillar === idx ? null : idx)}
                />
              ))}
            </div>

            <PlanetaryVisualization konstellation={data.konstellation} />

            {/* AI Synergy Section */}
            <div className="relative mt-40 group/ai">
              <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 px-12 py-5 bg-[var(--navy)] text-[var(--bg-paper)] mono text-[13px] font-extrabold uppercase tracking-[0.5em] rounded-full shadow-[0_25px_60px_rgba(0,0,0,0.3)] z-30 border border-white/20 flex items-center gap-5 animate-reveal whitespace-nowrap">
                <Sparkles size={18} className="text-[var(--holo-gold)]" />
                SYNERGY ANALYSIS
              </div>
              
              <div 
                className={`bg-[var(--bg-paper)] rounded-[4rem] lg:rounded-[5rem] p-10 md:p-16 lg:p-20 pt-28 border border-[var(--stroke)] relative overflow-hidden transition-all duration-1000 hover:shadow-[0_40px_120px_rgba(0,0,0,0.1)] hover:border-[var(--holo-gold)]/30 group ${isExpanded ? 'bg-white shadow-2xl border-[var(--holo-gold)]/50' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="absolute -right-24 -top-24 w-[35rem] h-[35rem] bg-[var(--holo-violet)]/20 blur-[130px] rounded-full pointer-events-none" />
                <div className="absolute -left-24 bottom-0 w-[30rem] h-[30rem] bg-[var(--holo-cyan)]/20 blur-[110px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 cursor-pointer flex flex-col items-center text-center">
                  <div className="w-full mb-10 border-b border-[var(--stroke)] pb-10 flex flex-col items-center overflow-hidden">
                    <h3 className="serif text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-light text-[var(--navy)] tracking-tight uppercase mb-8 break-words max-w-full">
                      Cross-System Compatibility
                    </h3>
                    
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                      <div className="flex flex-col transition-all duration-500 group-hover:translate-x-1">
                        <span className="mono text-[9px] text-[var(--muted)] font-bold uppercase tracking-[0.3em] mb-2">Model_Engine</span>
                        <span className="mono text-[11px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-[0.2em]">CALCULATED_V2.5_ASTRO</span>
                      </div>
                      <div className="hidden md:block w-px h-10 bg-[var(--stroke)]" />
                      <div className="flex flex-col group/score transition-all duration-500">
                        <span className="mono text-[9px] text-[var(--muted)] font-bold uppercase tracking-[0.3em] mb-2">Confidence Score</span>
                        <div className="flex items-center gap-4 transition-all duration-300 group-hover:scale-105">
                          <span className="mono text-[12px] text-[var(--holo-gold)] font-extrabold uppercase tracking-widest animate-pulse">99.1%</span>
                          <div className="w-20 h-1 bg-[var(--stroke)] rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-[var(--holo-cyan)] to-[var(--holo-gold)] animate-[pulse_1.5s_infinite]" style={{ width: '99%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full relative overflow-hidden transition-all duration-700 ease-in-out" style={{ maxHeight: isExpanded ? '1200px' : '280px' }}>
                    <p className={`text-[var(--navy)] italic font-light leading-snug serif text-3xl md:text-4xl lg:text-3xl xl:text-4xl mb-12 drop-shadow-sm transition-all duration-700 break-words px-4 ${isExpanded ? 'text-2xl md:text-3xl' : ''}`}>
                      "{aiInsight}"
                    </p>
                    
                    {isExpanded && (
                      <div className="animate-reveal space-y-10 pt-10 border-t border-[var(--stroke)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                          <div className="bg-[var(--bg-paper)]/50 p-6 lg:p-10 rounded-[2rem] border border-[var(--stroke)]">
                            <span className="mono text-[10px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-widest block mb-4">Western Core Dynamics</span>
                            <p className="text-[14px] lg:text-[16px] text-[var(--navy)]/80 leading-relaxed font-light">
                              Die Kombination von {data.konstellation.sun} (Ego) und {data.konstellation.moon} (Emotionalität) deutet auf eine tiefgreifende intuitive Resonanz hin. Der {data.konstellation.rising}-Aszendent wirkt hierbei als stabilisierendes Element, das die oft intensiven Wasser-Energien in diplomatische und ästhetische Bahnen lenkt.
                            </p>
                          </div>
                          <div className="bg-[var(--bg-paper)]/50 p-6 lg:p-10 rounded-[2rem] border border-[var(--stroke)]">
                            <span className="mono text-[10px] text-[var(--holo-gold)] font-extrabold uppercase tracking-widest block mb-4">BaZi Matrix Resonance</span>
                            <p className="text-[14px] lg:text-[16px] text-[var(--navy)]/80 leading-relaxed font-light">
                              Das {data.tierkreis} bringt eine metallene Härte und Struktur in das Profil, die einen faszinierenden Kontrast zur fischigen Durchlässigkeit bildet. Es ist die "eiserne Faust im Samthandschuh" – eine Konfiguration, die sowohl enorme Ausdauer als auch tiefstes Verständnis für andere ermöglicht.
                            </p>
                          </div>
                        </div>
                        <div className="bg-[var(--navy)] text-[var(--bg-paper)] p-8 lg:p-12 rounded-[2.5rem] shadow-2xl text-left">
                          <div className="flex items-center gap-4 mb-6">
                            <Zap size={18} className="text-[var(--holo-cyan)]" />
                            <span className="mono text-[11px] font-extrabold uppercase tracking-[0.4em]">Synthetic Final Verdict</span>
                          </div>
                          <p className="text-[18px] lg:text-[22px] font-light italic leading-relaxed">
                            "Deine wahre Stärke liegt in der Fähigkeit, komplexe emotionale Landschaften zu navigieren, ohne dabei deine strukturelle Integrität zu verlieren. Du bist ein Brückenbauer zwischen den Welten des Fühlens und des Handelns."
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-12 flex flex-col items-center gap-8 w-full">
                    <button 
                      onClick={(e) => { e.stopPropagation(); generateDeepInsight(); }} 
                      disabled={isGenerating} 
                      className="px-16 lg:px-24 py-6 lg:py-8 bg-[var(--navy)] text-[var(--bg-paper)] rounded-[3rem] mono text-[13px] font-extrabold uppercase tracking-[0.5em] flex items-center justify-center gap-6 hover:scale-105 hover:bg-[var(--holo-violet)] transition-all shadow-2xl active:scale-95 group/btn mx-auto"
                    >
                      {isGenerating ? <Loader2 size={24} className="animate-spin" /> : <Wand2 size={20} className="group-hover/btn:rotate-12 transition-transform" />} 
                      EXECUTE_RECALIBRATION
                    </button>
                    
                    <div className="flex flex-col items-center gap-2">
                       <span className="mono text-[9px] text-[var(--muted)] font-bold uppercase tracking-[0.3em] animate-pulse">
                         {isExpanded ? 'Click_to_Collapse_Subsystem_Logs' : 'Click_to_Expand_Subsystem_Logs'}
                       </span>
                       <div className="text-[var(--muted)] transition-all duration-500 group-hover:text-[var(--holo-gold)]">
                          {isExpanded ? <ChevronUp size={20} strokeWidth={1.5} /> : <ChevronDown size={20} strokeWidth={1.5} />}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityBadges;
