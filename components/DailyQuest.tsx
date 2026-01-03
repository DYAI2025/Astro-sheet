
import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Zap, Eye, Heart, Globe, Compass, RefreshCw, Star, Activity, Layers } from 'lucide-react';

const SegmentedScale: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => {
  const segments = 18;
  const activeSegments = Math.round((value / 100) * segments);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-2">
        <span className="mono text-[10px] font-extrabold text-[var(--navy)]/70 uppercase tracking-[0.3em]">{label}</span>
        <span className="mono text-[11px] font-bold text-[var(--navy)]" style={{ color }}>{value}%</span>
      </div>
      <div className="flex gap-2 h-2 w-full">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 rounded-sm transition-all duration-1000"
            style={{ 
              backgroundColor: i < activeSegments ? color : 'rgba(0,0,0,0.08)',
              boxShadow: i < activeSegments ? `0 0 12px ${color}44` : 'none',
              opacity: i < activeSegments ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface PlanetProps {
  name: string;
  size: number;
  orbitRadius: number;
  period: number; 
  color: string;
  hasRings?: boolean;
  baseAngle: number;
}

const Planet3D: React.FC<PlanetProps & { currentRotation: number }> = ({ name, size, orbitRadius, color, hasRings, currentRotation }) => {
  const radian = (currentRotation * Math.PI) / 180;
  const x = Math.cos(radian) * orbitRadius;
  const y = Math.sin(radian) * orbitRadius;
  
  const zDepth = Math.sin(radian) * (orbitRadius * 0.15); 
  const depthScale = 0.8 + (Math.sin(radian) + 1) * 0.2;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2, transform: 'translateZ(-1px)' }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2"
        style={{ 
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${zDepth}px) rotateX(-65deg) scale(${depthScale})`,
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          zIndex: Math.floor(zDepth + 200)
        }}
      >
        <div 
          className="w-full h-full relative group/planet flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div 
            className="absolute inset-0 rounded-full transition-all duration-700 group-hover/planet:scale-125"
            style={{ 
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${color}88`
            }}
          />
          <div className="absolute inset-0 rounded-full z-10" style={{ background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7) 0%, transparent 80%), radial-gradient(circle at 75% 75%, rgba(0,0,0,0.5) 0%, transparent 90%)` }} />
          <div className="absolute top-[12%] left-[12%] w-[35%] h-[35%] bg-white/40 blur-[2px] rounded-full z-[15]" />
          
          <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 group-hover/planet:opacity-100 transition-all duration-500 translate-y-3 group-hover/planet:translate-y-0">
            <div className="mono text-[8px] text-white font-extrabold tracking-[0.3em] whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 uppercase shadow-2xl">
              {name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CelestialAspects: React.FC<{ rotations: number[]; planets: PlanetProps[] }> = ({ rotations, planets }) => {
  const aspects = useMemo(() => {
    const list: any[] = [];
    for (let i = 0; i < rotations.length; i++) {
      for (let j = i + 1; j < rotations.length; j++) {
        const diff = Math.abs(rotations[i] - rotations[j]) % 360;
        const normalizedDiff = diff > 180 ? 360 - diff : diff;
        if (normalizedDiff < 10) list.push({ p1: i, p2: j, type: 'Conjunction', color: 'rgba(255,255,255,0.9)' });
        else if (Math.abs(normalizedDiff - 90) < 6) list.push({ p1: i, p2: j, type: 'Square', color: 'rgba(220,212,245,0.7)' });
        else if (Math.abs(normalizedDiff - 120) < 6) list.push({ p1: i, p2: j, type: 'Trine', color: 'rgba(251,228,161,0.7)' });
      }
    }
    return list;
  }, [rotations]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 overflow-visible z-0" viewBox="-250 -250 500 500" style={{ transform: 'translateZ(-10px)' }}>
      {aspects.map((aspect, idx) => {
        const rad1 = (rotations[aspect.p1] * Math.PI) / 180;
        const rad2 = (rotations[aspect.p2] * Math.PI) / 180;
        const r1 = planets[aspect.p1].orbitRadius;
        const r2 = planets[aspect.p2].orbitRadius;
        const x1 = Math.cos(rad1) * r1;
        const y1 = Math.sin(rad1) * r1;
        const x2 = Math.cos(rad2) * r2;
        const y2 = Math.sin(rad2) * r2;
        return (
          <line 
            key={idx}
            x1={x1} y1={y1} x2={x2} y2={y2} 
            stroke={aspect.color} 
            strokeWidth="0.75" 
            strokeDasharray="6 6"
            className="animate-pulse"
          />
        );
      })}
    </svg>
  );
};

const SolarSystem3D: React.FC = () => {
  const planets: PlanetProps[] = [
    { name: 'MERCURY', size: 6, orbitRadius: 55, period: 12, color: '#9CA3AF', baseAngle: 45 },
    { name: 'VENUS', size: 9, orbitRadius: 85, period: 28, color: '#FDE68A', baseAngle: 120 },
    { name: 'EARTH', size: 10, orbitRadius: 115, period: 42, color: '#22D3EE', baseAngle: 0 },
    { name: 'MARS', size: 8, orbitRadius: 150, period: 68, color: '#FBBF24', baseAngle: 280 },
    { name: 'JUPITER', size: 20, orbitRadius: 200, period: 160, color: '#E5E7EB', baseAngle: 190 },
    { name: 'SATURN', size: 16, orbitRadius: 260, period: 320, color: '#FEF9C3', hasRings: true, baseAngle: 60 },
  ];

  const [rotations, setRotations] = useState<number[]>(planets.map(p => p.baseAngle));

  useEffect(() => {
    let frameId: number;
    const start = Date.now() / 1000;
    const animate = () => {
      const now = Date.now() / 1000;
      const elapsed = now - start;
      const newRotations = planets.map(p => (p.baseAngle + (elapsed * (360 / p.period))) % 360);
      setRotations(newRotations);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}>
        <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'rotateX(65deg)', transformStyle: 'preserve-3d' }}>
          <CelestialAspects rotations={rotations} planets={planets} />
          {/* Central Star - The Sun */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-20" style={{ transform: 'rotateX(-65deg)', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-[-60px] rounded-full bg-[var(--holo-gold)]/30 blur-[60px] animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-[var(--holo-gold)] shadow-[inset_0_0_30px_white,0_0_40px_var(--holo-gold)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/40 opacity-80 mix-blend-overlay" />
              <div className="w-8 h-8 rounded-full bg-white/95 blur-[4px]" />
            </div>
          </div>
          {planets.map((p, i) => (
            <Planet3D key={p.name} {...p} currentRotation={rotations[i]} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DailyQuest: React.FC = () => {
  return (
    <div className="premium-card p-16 h-full flex flex-col relative overflow-hidden group/daily bg-[var(--card-bg)] transition-all duration-700">
      {/* Golden Cut Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--holo-cyan)]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[var(--holo-yellow)]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header - Symmetrical & High Contrast */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 border-b border-[var(--stroke)] pb-12">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="p-6 bg-[var(--bg-paper)] rounded-[2.2rem] border border-[var(--stroke)] relative z-10 group-hover/daily:border-[var(--holo-gold)] transition-all shadow-xl scale-110">
                <Star size={32} className="text-[var(--holo-gold)]" />
              </div>
              <div className="absolute inset-0 bg-[var(--holo-gold)]/20 blur-2xl animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-5">
                <h3 className="text-[14px] uppercase tracking-[0.6em] font-extrabold text-[var(--navy)]/80">Celestial_Oracle_Core</h3>
                <span className="mono text-[10px] text-[var(--holo-cyan)] uppercase flex items-center gap-3 bg-[var(--navy)] px-4 py-1 rounded-full border border-white/10 shadow-lg">
                  <RefreshCw size={12} className="animate-spin" /> Live_Field_Sync
                </span>
              </div>
              <div className="flex items-center gap-6 mt-5">
                <div className="flex items-center gap-4 px-6 py-2.5 rounded-full bg-[var(--bg-paper)] border border-[var(--stroke)] shadow-lg hover:border-[var(--holo-gold)] transition-colors cursor-pointer group/sign">
                  <span className="text-[var(--holo-gold)] text-3xl leading-none group-hover/sign:scale-125 transition-transform">♓</span>
                  <span className="mono text-[12px] text-[var(--navy)] font-extrabold uppercase tracking-[0.4em]">Fische_Matrix</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right hidden lg:block space-y-3">
            <div className="mono text-[12px] text-[var(--navy)] uppercase tracking-[0.3em] font-bold opacity-80">{new Date().toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div className="flex items-center justify-end gap-3">
              <Activity size={14} className="text-[var(--holo-cyan)] animate-pulse" />
              <div className="mono text-[11px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-[0.4em]">Synchronization: 99.8%</div>
            </div>
          </div>
        </div>

        {/* Content Area - 1.618 Harmonics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 flex-grow items-center">
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 bg-[#01040D] rounded-[4rem] border border-white/10 relative overflow-hidden aspect-[1.4] shadow-[0_40px_120px_rgba(0,0,0,0.6)] group/viewport">
            {/* Cinematic Space Nebula */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1e1b4b_0%,transparent_60%)] opacity-90 mix-blend-screen" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,#4c1d95_0%,transparent_50%)] opacity-80 mix-blend-screen" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#083344_0%,transparent_70%)] opacity-70 mix-blend-screen" />
            
            <div className="absolute inset-0 opacity-[0.3] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay animate-pulse" />

            {/* Floating Dust Particles */}
            <div className="absolute inset-0 opacity-[0.6] pointer-events-none">
              <div className="absolute top-[15%] left-[20%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
              <div className="absolute top-[45%] left-[85%] w-0.5 h-0.5 bg-white rounded-full animate-pulse [animation-delay:1.2s]" />
              <div className="absolute top-[75%] left-[35%] w-1.5 h-1.5 bg-[var(--holo-gold)] rounded-full blur-[2px] animate-pulse [animation-delay:1.8s]" />
              <div className="absolute top-[25%] left-[65%] w-1 h-1 bg-[var(--holo-cyan)] rounded-full animate-pulse [animation-delay:2.4s]" />
            </div>
            
            <SolarSystem3D />
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center relative space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <Layers size={18} className="text-[var(--holo-cyan)]" />
                <span className="mono text-[12px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-[0.4em]">Oracle_Insight_Buffer</span>
              </div>
              <h2 className="serif text-5xl xl:text-7xl font-light mb-10 leading-[1.15] text-[var(--navy)] tracking-tighter drop-shadow-sm">
                Intuition als<br/>leuchtender<br/>Kompass.
              </h2>
              <div className="bg-[var(--bg-paper)]/80 p-12 rounded-[3.5rem] border border-[var(--stroke)] relative group transition-all hover:bg-[var(--bg-paper)] hover:translate-y-[-5px] shadow-2xl">
                <div className="absolute -top-4 -left-4 p-3 bg-[var(--navy)] text-[var(--bg-paper)] rounded-full shadow-lg border border-white/10">
                  <Sparkles size={16} />
                </div>
                <p className="text-[var(--navy)]/100 text-2xl xl:text-3xl leading-relaxed font-light italic serif">
                  "Die heutige Mars-Neptun Konjunktion verstärkt deine Empathie. Was sich wie Verwirrung anfühlt, ist in Wahrheit ein geschärfter Sinn für das Nicht-Sichtbare."
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-12 border-t border-[var(--stroke)]">
              <SegmentedScale label="Energie" value={68} color="var(--holo-gold)" />
              <SegmentedScale label="Intuition" value={94} color="var(--holo-cyan)" />
              <SegmentedScale label="Gefühle" value={82} color="var(--holo-violet)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
