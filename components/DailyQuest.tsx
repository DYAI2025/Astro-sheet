
import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Zap, Eye, Heart, Globe, Compass, RefreshCw, Star, Activity, Layers } from 'lucide-react';

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
  
  // Depth calculation for sorting
  // Since rotateX is 65deg, y-position on screen mostly determines visual depth
  const zDepth = Math.sin(radian) * (orbitRadius * 0.1); 
  const depthScale = 0.85 + (Math.sin(radian) + 1) * 0.15;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
      {/* Orbit Line - Fixed to lie flat on the plane */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2, transform: 'translateZ(-1px)' }}
      />
      
      {/* Planet Body Container */}
      <div 
        className="absolute top-1/2 left-1/2"
        style={{ 
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${zDepth}px) rotateX(-65deg) scale(${depthScale})`,
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          zIndex: Math.floor(zDepth + 100) // Secondary sorting fallback
        }}
      >
        <div 
          className="w-full h-full relative group/planet flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 3D SPHERE LAYERS */}
          
          {/* 1. Base Body Color */}
          <div 
            className="absolute inset-0 rounded-full transition-transform duration-500 group-hover/planet:scale-110"
            style={{ 
              backgroundColor: color,
              boxShadow: `0 0 ${size * 2}px ${color}33`
            }}
          />

          {/* 2. Global Illumination & Volume (Radial Gradient) */}
          <div 
            className="absolute inset-0 rounded-full z-10"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%), 
                           radial-gradient(circle at 70% 70%, rgba(0,0,0,0.5) 0%, transparent 80%)`
            }}
          />

          {/* 3. "Dark Side" Shadow - Always oriented away from the center (Sun) */}
          <div 
            className="absolute inset-[-1px] rounded-full z-[12] pointer-events-none"
            style={{
              background: `linear-gradient(${currentRotation + 180}deg, rgba(0,0,0,0.7) 0%, transparent 60%)`
            }}
          />
          
          {/* 4. Atmospheric Glow / Rim Lighting */}
          <div 
            className="absolute inset-[-4px] rounded-full blur-[6px] opacity-30 animate-pulse z-[5]"
            style={{ backgroundColor: color }}
          />

          {/* 5. High-Frequency Specular Highlight (The "Glint") */}
          <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/60 blur-[1px] rounded-full z-[15]" />

          {/* Rings - for Saturn etc */}
          {hasRings && (
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/20"
              style={{ 
                width: size * 4, 
                height: size * 1.2, 
                transform: 'rotateZ(15deg) rotateX(10deg)',
                boxShadow: '0 0 15px rgba(255,255,255,0.05)',
                background: 'radial-gradient(ellipse at center, transparent 35%, rgba(255,255,255,0.1) 60%, transparent 100%)',
                zIndex: -1
              }}
            />
          )}
          
          {/* Identification Label - Enhanced visibility */}
          <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-0 group-hover/planet:opacity-100 transition-all duration-500 translate-y-2 group-hover/planet:translate-y-0">
            <div className="w-[1px] h-3 bg-white/20" />
            <div className="mono text-[7px] text-white font-bold tracking-[0.2em] whitespace-nowrap bg-[var(--navy)]/80 backdrop-blur-sm px-2 py-1 rounded border border-white/10 uppercase">
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

        if (normalizedDiff < 12) list.push({ p1: i, p2: j, type: 'Conjunction', color: '#7AA7A1' });
        else if (Math.abs(normalizedDiff - 90) < 8) list.push({ p1: i, p2: j, type: 'Square', color: '#8F7AD1' });
        else if (Math.abs(normalizedDiff - 120) < 8) list.push({ p1: i, p2: j, type: 'Trine', color: '#C9A46A' });
      }
    }
    return list;
  }, [rotations]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 overflow-visible z-0" viewBox="-250 -250 500 500" style={{ transform: 'translateZ(-2px)' }}>
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
          <g key={idx} className="animate-reveal">
            <line 
              x1={x1} y1={y1} x2={x2} y2={y2} 
              stroke={aspect.color} 
              strokeWidth="1" 
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            <circle cx={x1} cy={y1} r="3" fill={aspect.color} className="shadow-lg" />
            <circle cx={x2} cy={y2} r="3" fill={aspect.color} className="shadow-lg" />
          </g>
        );
      })}
    </svg>
  );
};

const SolarSystem3D: React.FC = () => {
  const planets: PlanetProps[] = [
    { name: 'MERCURY', size: 5, orbitRadius: 50, period: 10, color: '#A1A1AA', baseAngle: 45 },
    { name: 'VENUS', size: 8, orbitRadius: 75, period: 24, color: '#EAB308', baseAngle: 120 },
    { name: 'EARTH', size: 9, orbitRadius: 105, period: 36, color: '#7AA7A1', baseAngle: 0 },
    { name: 'MARS', size: 7, orbitRadius: 135, period: 58, color: '#C9A46A', baseAngle: 280 },
    { name: 'JUPITER', size: 16, orbitRadius: 175, period: 140, color: '#D4D4D8', baseAngle: 190 },
    { name: 'SATURN', size: 13, orbitRadius: 220, period: 280, color: '#FDE68A', hasRings: true, baseAngle: 60 },
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
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'rotateX(65deg)', transformStyle: 'preserve-3d' }}>
          
          {/* Aspects Layer */}
          <CelestialAspects rotations={rotations} planets={planets} />

          {/* Sun - Volumetric Star Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 z-20" style={{ transform: 'rotateX(-65deg)', transformStyle: 'preserve-3d' }}>
            {/* Outermost Atmospheric Glow */}
            <div className="absolute inset-[-40px] rounded-full bg-[#C9A46A]/20 blur-[50px] animate-pulse" />
            
            {/* Volumetric Spherical Shading for Sun */}
            <div className="absolute inset-0 rounded-full bg-[#C9A46A] shadow-[0_0_100px_#C9A46A,inset_0_0_30px_white] flex items-center justify-center overflow-hidden">
              {/* Dynamic Internal Plasma Texture effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A46A] via-white/40 to-[#C9A46A] opacity-40 mix-blend-overlay" />
              <div className="absolute inset-[-10px] border-[1px] border-white/20 rounded-full animate-spin-slow opacity-20" />
              <div className="absolute inset-[-20px] border-[1px] border-white/5 rounded-full" style={{ animation: 'rotate 20s linear infinite reverse' }} />
              
              {/* Central Heat Glare */}
              <div className="w-6 h-6 rounded-full bg-white/95 blur-[4px] shadow-[0_0_20px_white]" />
            </div>
          </div>

          {/* Background Grid / Calibration */}
          <div className="absolute w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none" />
          <div className="absolute w-[580px] h-[580px] border border-white/[0.04] rounded-full flex items-center justify-center pointer-events-none">
             <div className="w-full h-full border border-dashed border-white/[0.06] opacity-20 animate-spin-slow" />
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
    <div className="dark-premium-card p-12 h-full flex flex-col relative overflow-hidden group/daily">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8F7AD1]/10 blur-[180px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-white/10 pb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="p-4 bg-white/5 rounded-[1.8rem] border border-white/10 relative z-10 group-hover/daily:border-[#C9A46A]/50 transition-colors">
                <Star size={28} className="text-[#C9A46A]" />
              </div>
              <div className="absolute inset-0 bg-[#C9A46A]/20 blur-xl opacity-0 group-hover/daily:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-extrabold text-[#7AA7A1]">Celestial_Oracle</h3>
                <span className="mono text-[9px] text-white/30 uppercase flex items-center gap-2 bg-white/5 px-2 py-0.5 rounded">
                  <RefreshCw size={10} className="animate-spin" /> Live_Sync
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-help">
                  <span className="text-[#C9A46A] text-xl leading-none">♓</span>
                  <span className="mono text-[10px] text-white font-bold uppercase tracking-widest">Fische</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-help">
                  <span className="text-[#7AA7A1] text-xl leading-none">🐎</span>
                  <span className="mono text-[10px] text-white font-bold uppercase tracking-widest">Metall-Pferd</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right hidden lg:block">
            <div className="mono text-[10px] text-white/40 uppercase tracking-widest">{new Date().toLocaleDateString('de-DE')}</div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Activity size={10} className="text-[#7AA7A1] animate-pulse" />
              <div className="mono text-[9px] text-[#C9A46A] font-bold uppercase tracking-[0.4em]">Resonance: 99.4%</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 flex-grow items-center">
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-white/[0.01] rounded-[3rem] border border-white/5 relative group/viz overflow-hidden min-h-[500px]">
            {/* Background Stream Visual */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden mono text-[8px] text-white p-4 leading-relaxed">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap mb-1">
                  CALC_ORBIT_{i}: {Math.random().toFixed(8)} | VECTOR_ALPHA_{i}: {Math.random().toFixed(4)} | DEEP_VOLUME_SYNC
                </div>
              ))}
            </div>

            <SolarSystem3D />
            
            <div className="absolute bottom-10 flex gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7AA7A1]" />
                <span className="mono text-[7px] text-white/40 uppercase font-bold tracking-widest">Conjunction</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A46A]" />
                <span className="mono text-[7px] text-white/40 uppercase font-bold tracking-widest">Trine</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8F7AD1]" />
                <span className="mono text-[7px] text-white/40 uppercase font-bold tracking-widest">Square</span>
              </div>
            </div>
            
            <div className="mt-8 mono text-[8px] text-white/20 uppercase tracking-[0.6em] text-center z-10">Volumetric_Alignment_Core_v4.2</div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center relative">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Layers size={14} className="text-[#7AA7A1]" />
                <span className="mono text-[10px] text-[#7AA7A1] font-extrabold uppercase tracking-[0.4em]">Data_Insight_Module</span>
              </div>
              <h2 className="serif text-5xl xl:text-6xl font-light mb-8 leading-tight text-white tracking-tight">
                Intuition als Kompass.
              </h2>
              <div className="bg-white/[0.04] p-10 rounded-[2.5rem] border border-white/5 relative group transition-all hover:border-[#7AA7A1]/20 hover:bg-white/[0.06] shadow-2xl">
                <p className="text-white/80 text-xl xl:text-2xl leading-relaxed font-light italic serif">
                  "Die heutige Mars-Neptun Konjunktion verstärkt deine Empathie. Was sich wie Verwirrung anfühlt, ist in Wahrheit ein geschärfter Sinn für das Nicht-Sichtbare. Nutze die Energie des Metall-Pferdes, um diese Visionen in disziplinierte Taten zu verwandeln."
                </p>
                <div className="absolute top-4 right-4 opacity-10">
                  <Sparkles size={24} className="text-[#C9A46A]" />
                </div>
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-xl" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-10 border-t border-white/10">
              <SegmentedScale label="Energie" value={68} color="#C9A46A" />
              <SegmentedScale label="Intuition" value={94} color="#7AA7A1" />
              <SegmentedScale label="Gefühle" value={82} color="#8F7AD1" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:border-[#8F7AD1]/50 transition-colors">
                <Heart size={16} className="text-[#8F7AD1]" />
              </div>
              <div className="flex flex-col">
                <span className="mono text-[9px] text-white/40 uppercase tracking-widest font-bold">Fokus: Emotionale Integrität</span>
                <span className="mono text-[7px] text-[#7AA7A1] uppercase tracking-wider">Sync_Status: High</span>
              </div>
           </div>
           <button className="group/btn relative px-10 py-4 overflow-hidden rounded-full transition-all duration-500 shadow-xl">
              <div className="absolute inset-0 bg-white group-hover/btn:bg-[#C9A46A] transition-colors" />
              <div className="relative z-10 flex items-center gap-3 text-[#0E1B33] group-hover/btn:text-white">
                <Eye size={14} className="group-hover/btn:scale-110 transition-transform" /> 
                <span className="text-[10px] font-extrabold uppercase tracking-[0.5em]">Tiefenanalyse</span>
              </div>
           </button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
