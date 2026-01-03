
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MasterIdentity } from '../types';
import { 
  Sparkles, Zap, Star, CircleDot, Cpu, Layers, Hexagon, Database, 
  Trees, Flame, Mountain, Waves, Shield, 
  Orbit, Sun, Moon, Wand2, Loader2, Target
} from 'lucide-react';
import SigilPortrait from './SigilPortrait';
import { ZODIAC_DATA, ZodiacInfo } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface IdentityBadgesProps {
  data: MasterIdentity;
}

const ELEMENT_ICONS: Record<string, any> = {
  holz: Trees,
  wood: Trees,
  feuer: Flame,
  fire: Flame,
  erde: Mountain,
  earth: Mountain,
  metall: Shield,
  metal: Shield,
  wasser: Waves,
  water: Waves,
};

const getElementIcon = (elementName: string) => {
  const normalized = elementName.toLowerCase();
  for (const key in ELEMENT_ICONS) {
    if (normalized.includes(key)) return ELEMENT_ICONS[key];
  }
  return null;
};

const ElementBadge: React.FC<{ name: string }> = ({ name }) => {
  const Icon = getElementIcon(name);
  return (
    <span className="inline-flex items-center gap-2">
      {Icon && <Icon size={12} className="text-[var(--holo-gold)]" />}
      <span>{name}</span>
    </span>
  );
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

const ZodiacBadge: React.FC<{ sign: string; prefix?: string }> = ({ sign, prefix }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const normalizedSign = sign.toLowerCase().trim();
  const infoKey = signMap[normalizedSign];
  const info = infoKey ? ZODIAC_DATA[infoKey] : null;

  return (
    <div 
      className="relative inline-flex items-center gap-3 ml-4 first:ml-0 cursor-help group/zodiac"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <div className="w-10 h-10 rounded-full bg-[var(--navy)] flex items-center justify-center text-[var(--holo-gold)] text-xl shadow-lg border border-[var(--holo-gold)]/30 group-hover/zodiac:scale-110 group-hover/zodiac:border-[var(--holo-gold)] group-hover/zodiac:shadow-[var(--holo-gold)]/20 transition-all duration-300 select-none">
        {getZodiacSymbol(sign)}
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="opacity-40 font-bold mono text-[8px] uppercase tracking-widest mb-0.5">{prefix}</span>
        <span className="text-[var(--navy)] font-bold text-xs uppercase tracking-tight">{sign}</span>
      </div>
      
      {showTooltip && info && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 w-60 bg-[var(--navy)]/95 backdrop-blur-xl text-[var(--card-bg)] p-6 rounded-[2.5rem] shadow-2xl z-[100] animate-reveal border border-white/10 ring-1 ring-white/5">
          <div className="flex items-center gap-4 mb-4 border-b border-white/10 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--holo-gold)] text-3xl">
              {getZodiacSymbol(sign)}
            </div>
            <div className="flex flex-col">
              <span className="mono text-[12px] font-bold uppercase tracking-[0.2em]">{sign}</span>
              <span className="mono text-[8px] text-white/40 uppercase tracking-widest mt-0.5">Westliche Matrix</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="mono text-[8px] uppercase opacity-40 tracking-wider">Herrscher</span>
              <span className="text-[12px] font-bold text-[var(--holo-cyan)]">{info.ruler}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="mono text-[8px] uppercase opacity-40 tracking-wider">Element</span>
              <span className="text-[12px] font-bold text-[var(--holo-gold)]">{info.element}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="mono text-[8px] uppercase opacity-40 tracking-wider">Modalität</span>
              <span className="text-[12px] font-bold text-[var(--holo-violet)]">{info.modality}</span>
            </div>
            <div className="pt-3 border-t border-white/5">
              <p className="text-[10px] text-white/60 italic leading-relaxed font-light">
                {info.keywords}
              </p>
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--navy)]/95 backdrop-blur-xl rotate-45 border-r border-b border-white/10 -mt-2" />
        </div>
      )}
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: React.ReactNode; icon: any; isBazi?: boolean }> = ({ label, value, icon: Icon, isBazi }) => (
  <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-[var(--stroke)] last:border-0 px-4 transition-all duration-500 group relative rounded-2xl overflow-hidden ${isBazi ? 'ml-6 pl-8 bg-[var(--holo-cyan)]/[0.03] border-l-0 hover:bg-[var(--holo-cyan)]/[0.06] shadow-[inset_0_0_20px_rgba(122,167,161,0.05)]' : 'hover:bg-[var(--navy)]/[0.02]'}`}>
    {isBazi && (
      <>
        <div className="absolute left-0 top-2 bottom-2 w-[4px] rounded-full bg-gradient-to-b from-[var(--holo-violet)] via-[var(--holo-cyan)] to-[var(--holo-gold)] opacity-90 shadow-[0_0_15px_var(--holo-cyan)] group-hover:shadow-[0_0_25px_var(--holo-cyan)] transition-shadow duration-500 animate-pulse" />
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-[var(--holo-cyan)]/5 blur-[50px] rounded-full group-hover:bg-[var(--holo-cyan)]/10 transition-colors" />
      </>
    )}
    
    <div className="flex items-center gap-4 mb-2 sm:mb-0 relative z-10">
      <div className={`p-2.5 bg-[var(--card-bg)] rounded-xl border transition-all duration-300 shadow-sm ${isBazi ? 'border-[var(--holo-cyan)]/30 group-hover:border-[var(--holo-cyan)] group-hover:scale-110' : 'border-[var(--stroke)] group-hover:border-[var(--holo-gold)]'}`}>
        <Icon size={14} className={`transition-colors ${isBazi ? 'text-[var(--holo-cyan)]' : 'text-[var(--muted)] group-hover:text-[var(--navy)]'}`} />
      </div>
      <div className="flex flex-col">
        <span className={`mono text-[10px] font-bold uppercase tracking-[0.4em] transition-colors ${isBazi ? 'text-[var(--holo-cyan)]' : 'text-[var(--muted)]'}`}>{label}</span>
        {isBazi && (
          <span className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1 h-1 rounded-full bg-[var(--holo-cyan)] animate-ping" />
            <span className="mono text-[7px] text-[var(--holo-cyan)]/60 uppercase tracking-[0.2em] font-extrabold">QUANTUM_DECODED</span>
          </span>
        )}
      </div>
    </div>
    
    <div className={`text-sm text-[var(--navy)] font-bold tracking-tight text-right sm:max-w-[70%] transition-all relative z-10 ${isBazi ? 'bg-white/40 dark:bg-black/40 backdrop-blur-md px-8 py-3.5 rounded-2xl border border-[var(--holo-cyan)]/10 shadow-[0_4px_15px_rgba(122,167,161,0.08)] group-hover:border-[var(--holo-cyan)]/40 group-hover:shadow-[0_8px_25px_rgba(122,167,161,0.15)] flex items-center gap-3' : ''}`}>
      {isBazi && <Cpu size={12} className="text-[var(--holo-cyan)]/50 animate-spin-slow" />}
      <span className="relative z-10">{value}</span>
    </div>
  </div>
);

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

  // Fix: Initializing sunInfo, moonInfo, and ascInfo with a default ZodiacInfo object to prevent property access errors on an empty object type.
  const emptyZodiac: ZodiacInfo = { ruler: '', element: '', modality: '', keywords: '' };
  const sunInfo = ZODIAC_DATA[signMap[konstellation.sun.toLowerCase()]] || emptyZodiac;
  const moonInfo = ZODIAC_DATA[signMap[konstellation.moon.toLowerCase()]] || emptyZodiac;
  const ascInfo = ZODIAC_DATA[signMap[konstellation.rising.toLowerCase()]] || emptyZodiac;

  return (
    <div className="relative w-full aspect-video bg-[#0E1B33] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl mt-12 group/align cursor-crosshair" style={{ perspective: '800px' }}>
      {/* Deep Space Atmosphere Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(122,167,161,0.1),transparent_70%)] opacity-50" />
      
      {/* Background Orbital Plane Grid */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 200" style={{ transform: 'rotateX(35deg)' }}>
           {Array.from({ length: 24 }).map((_, i) => (
             <line 
               key={i} 
               x1="200" y1="100" 
               x2={200 + Math.cos((i * 15 * Math.PI) / 180) * 400} 
               y2={100 + Math.sin((i * 15 * Math.PI) / 180) * 400} 
               stroke="white" strokeWidth="0.3" strokeDasharray="2 12" 
             />
           ))}
           <circle cx="200" cy="100" r="50" fill="none" stroke="white" strokeWidth="0.15" />
           <circle cx="200" cy="100" r="80" fill="none" stroke="white" strokeWidth="0.15" />
           <circle cx="200" cy="100" r="110" fill="none" stroke="white" strokeWidth="0.15" />
        </svg>
      </div>

      {/* Dynamic Lens Flares System */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60">
        <div 
          className="absolute w-40 h-40 rounded-full bg-[var(--holo-cyan)]/10 blur-[60px]"
          style={{ 
            left: `${sun.x / 4}%`, 
            top: `${sun.y / 2}%`,
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(ticks * 0.002) * 0.2})` 
          }}
        />
        <div 
          className="absolute w-20 h-20 rounded-full bg-[var(--holo-violet)]/10 blur-[40px]"
          style={{ 
            left: `${moon.x / 4 + 10}%`, 
            top: `${moon.y / 2 - 10}%`,
            transform: `translate(-50%, -50%) scale(${0.8 + Math.cos(ticks * 0.003) * 0.1})` 
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 400 200" className="w-full h-full p-10 overflow-visible">
          <defs>
            <radialGradient id="sunGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="white" />
              <stop offset="25%" stopColor="var(--holo-gold)" />
              <stop offset="100%" stopColor="#4d3211" />
            </radialGradient>
            <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#e3dff5" />
              <stop offset="60%" stopColor="#8F7AD1" />
              <stop offset="100%" stopColor="#221c38" />
            </radialGradient>
            <radialGradient id="ascGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#d5e8e6" />
              <stop offset="60%" stopColor="var(--holo-cyan)" />
              <stop offset="100%" stopColor="#1a2b29" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Ruling Data - Background Floating Text */}
          <g className="opacity-40 mono text-[5px] fill-white/80 font-bold uppercase tracking-widest pointer-events-none">
            <text x={sun.x + 15} y={sun.y - 15}>RULER: {sunInfo.ruler}</text>
            <text x={sun.x + 15} y={sun.y - 8}>ELEM: {sunInfo.element}</text>
            
            <text x={moon.x + 12} y={moon.y + 15}>RULER: {moonInfo.ruler}</text>
            <text x={moon.x + 12} y={moon.y + 22}>ELEM: {moonInfo.element}</text>

            <text x={asc.x - 40} y={asc.y - 5}>AC_RULER: {ascInfo.ruler}</text>
          </g>

          {/* Aspect Lines */}
          <g className="transition-all duration-700 opacity-60">
            {sunMoonAspect && (
              <line 
                x1={sun.x} y1={sun.y} x2={moon.x} y2={moon.y} 
                stroke={sunMoonAspect.color} strokeWidth="0.8" strokeDasharray="5 3" 
                className="animate-pulse"
              />
            )}
            {moonAscAspect && (
              <line 
                x1={moon.x} y1={moon.y} x2={asc.x} y2={asc.y} 
                stroke={moonAscAspect.color} strokeWidth="0.8" strokeDasharray="5 3" 
                className="animate-pulse"
              />
            )}
          </g>

          {/* Core Calibration Center */}
          <circle cx="200" cy="100" r="5" fill="var(--holo-gold)" filter="url(#glow)" className="animate-pulse" />
          <circle cx="200" cy="100" r="180" fill="none" stroke="white" strokeWidth="0.05" opacity="0.1" />

          {/* Volumetric Sun (Slow Eclipse Movement) */}
          <g className="transition-transform duration-500 ease-out">
            <circle cx={sun.x} cy={sun.y} r="14" fill="url(#sunGrad)" filter="url(#glow)" />
            {/* Corona / Glare Ring */}
            <circle cx={sun.x} cy={sun.y} r="18" fill="none" stroke="var(--holo-gold)" strokeWidth="0.4" strokeDasharray="4 8" className="animate-spin-slow" />
            <text x={sun.x} y={sun.y + 3} textAnchor="middle" className="text-[10px] fill-[var(--navy)] select-none font-extrabold">☉</text>
          </g>

          {/* Volumetric Moon (Phased Shading) */}
          <g>
            <circle cx={moon.x} cy={moon.y} r="9" fill="url(#moonGrad)" filter="url(#glow)" />
            {/* Eclipse Shadow Overlay */}
            <path 
              d={`M ${moon.x - 9} ${moon.y} A 9 9 0 0 1 ${moon.x + 9} ${moon.y} A 6 9 0 0 0 ${moon.x - 9} ${moon.y}`} 
              fill="rgba(0,0,0,0.4)" 
              transform={`rotate(${(ticks * 0.05) % 360} ${moon.x} ${moon.y})`}
            />
            <text x={moon.x} y={moon.y + 3} textAnchor="middle" className="text-[9px] fill-white/90 select-none font-extrabold">☽</text>
          </g>

          {/* Volumetric ASC Point (Rising Light Beam) */}
          <g>
            <circle cx={asc.x} cy={asc.y} r="7" fill="url(#ascGrad)" filter="url(#glow)" />
            <text x={asc.x} y={asc.y + 2.5} textAnchor="middle" className="text-[6px] fill-white select-none font-extrabold">AC</text>
            {/* Light Beam Indicator */}
            <line 
              x1={asc.x} y1={asc.y} x2={asc.x + 40} y2={asc.y - 40} 
              stroke="var(--holo-cyan)" strokeWidth="0.2" opacity="0.3" 
            />
          </g>
        </svg>
      </div>

      {/* Top Indicators */}
      <div className="absolute top-8 left-10 flex items-center gap-4">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-[var(--holo-cyan)] animate-ping" />
           <span className="mono text-[10px] font-extrabold text-white/60 uppercase tracking-[0.5em]">Live_Transit_Orbital</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10" />
        <div className="mono text-[9px] text-[var(--holo-gold)] font-bold uppercase tracking-widest">
           Resonance: High
        </div>
      </div>

      {/* Side Status Panel */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-3 text-right">
        <div className="mono text-[8px] text-white/40 uppercase tracking-[0.3em] font-bold">
           Celestial_Engine: V4.1_DeepVolume
        </div>
        <div className="flex gap-1.5">
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className={`w-3 h-1 rounded-full ${i < 3 ? 'bg-[var(--holo-gold)]' : 'bg-white/10'}`} />
           ))}
        </div>
      </div>
    </div>
  );
};

const IdentityBadges: React.FC<IdentityBadgesProps> = ({ data }) => {
  const [shineKey, setShineKey] = useState(0);
  const [aiInsight, setAiInsight] = useState(data.bedeutung);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDeepInsight = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const promptText = `Analysiere Sonne ${data.konstellation.sun}, Mond ${data.konstellation.moon}, AC ${data.konstellation.rising} und BaZi Tierkreis ${data.tierkreis} in einem poetischen, modernem Ton (ca. 40 Wörter). Fokus auf die Dynamik zwischen den Systemen.`;
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
    <div className="relative animate-reveal transition-colors duration-500">
      <div className="absolute -top-16 left-0 w-full flex justify-center pointer-events-none">
        <div className="cluster-title serif uppercase tracking-[1.2em]">MANIFESTO</div>
      </div>

      <div className="max-w-5xl mx-auto premium-card">
        <div key={shineKey} className="scan-shine-effect" />

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          <div className="lg:col-span-5 p-12 lg:border-r border-[var(--stroke)] flex flex-col items-center justify-center relative bg-[var(--bg-paper)]/40 transition-colors duration-500">
            <div className="absolute top-10 left-10 flex items-center gap-3">
              <Hexagon size={16} className="text-[var(--holo-gold)]" />
              <span className="mono text-[9px] text-[var(--muted)] font-bold tracking-[0.4em] uppercase">Core_Matrix</span>
            </div>
            <div className="relative mb-12"><SigilPortrait /></div>
            <div className="text-center relative z-10">
              <div className="mono text-[10px] text-[var(--holo-gold)] font-extrabold uppercase tracking-[0.6em] mb-4">Master Identity</div>
              <h2 className="serif text-4xl text-[var(--navy)] font-light tracking-tighter uppercase leading-tight mb-2">
                {data.tierkreis} {data.konstellation.sun}
              </h2>
            </div>
          </div>

          <div className="lg:col-span-7 p-14 flex flex-col justify-center bg-[var(--card-bg)] transition-colors duration-500">
            <div className="flex justify-between items-center mb-10 border-b border-[var(--stroke)] pb-6">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-[var(--navy)] rounded-2xl">
                  <Database size={20} className="text-[var(--holo-cyan)]" />
                </div>
                <div>
                  <h3 className="serif text-2xl text-[var(--navy)] font-medium tracking-tight">Charakter-Synthese</h3>
                  <div className="mono text-[9px] text-[var(--muted)] uppercase tracking-widest mt-1">Astro_Bazi_Feed</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-10">
              <DataRow label="Monatstier" value={data.monatstier} icon={CircleDot} isBazi />
              <DataRow label="Tagestier" value={data.tagestier} icon={Zap} isBazi />
              <DataRow label="Element" value={<ElementBadge name={data.element} />} icon={Layers} />
              <DataRow 
                label="Konstellation" 
                value={
                  <div className="flex flex-wrap justify-end gap-x-8 gap-y-6">
                    <ZodiacBadge prefix="Sonne" sign={data.konstellation.sun} />
                    <ZodiacBadge prefix="Mond" sign={data.konstellation.moon} />
                    <ZodiacBadge prefix="Rising" sign={data.konstellation.rising} />
                  </div>
                } 
                icon={Star} 
              />
            </div>

            {/* Enhanced Visualization Block */}
            <PlanetaryVisualization konstellation={data.konstellation} />

            {/* AI Synergy Section */}
            <div className="relative mt-24 group/ai">
              <div className="absolute -top-6 left-10 px-6 py-2.5 bg-[var(--navy)] text-[var(--card-bg)] mono text-[11px] font-bold uppercase tracking-[0.4em] rounded-full shadow-xl z-20 border border-white/10 flex items-center gap-3">
                <Sparkles size={14} className="text-[var(--holo-violet)] animate-pulse" />
                Synergy_Analysis
              </div>
              <div className="bg-[var(--bg-paper)] rounded-[3rem] p-16 border border-[var(--stroke)] relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-[var(--holo-gold)]/20">
                <div className="relative z-10">
                  <h3 className="serif text-3xl font-light text-[var(--navy)] tracking-tight mb-8 border-b border-[var(--stroke)] pb-6 uppercase flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-[var(--holo-cyan)]"></span>
                    Cross-System Compatibility
                  </h3>
                  <p className="text-[var(--navy)] italic font-light leading-relaxed serif text-3xl">"{aiInsight}"</p>
                  <button onClick={generateDeepInsight} disabled={isGenerating} className="mt-12 px-10 py-5 bg-[var(--navy)] text-[var(--card-bg)] rounded-2xl mono text-[11px] font-extrabold uppercase tracking-[0.4em] flex items-center gap-3 hover:scale-105 hover:bg-[var(--holo-violet)] transition-all shadow-xl shadow-black/10">
                    {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />} Deep_Calibration
                  </button>
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
