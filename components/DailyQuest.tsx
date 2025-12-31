
import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Eye, Heart, Globe, Compass, RefreshCw, Star } from 'lucide-react';

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

const Planet3D: React.FC<PlanetProps> = ({ name, size, orbitRadius, period, color, hasRings, baseAngle }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frameId: number;
    const start = Date.now() / 1000;
    const animate = () => {
      const now = Date.now() / 1000;
      const elapsed = now - start;
      const angle = baseAngle + (elapsed * (360 / period));
      setRotation(angle);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [period, baseAngle]);

  const radian = (rotation * Math.PI) / 180;
  const x = Math.cos(radian) * orbitRadius;
  const y = Math.sin(radian) * orbitRadius;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
      {/* Orbit Line */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2 }}
      />
      
      {/* Planet Body */}
      <div 
        className="absolute top-1/2 left-1/2"
        style={{ 
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0px) rotateX(-65deg)`,
          width: size,
          height: size
        }}
      >
        <div 
          className="w-full h-full rounded-full shadow-lg relative group/planet"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}88`,
            border: '1px solid rgba(255,255,255,0.3)'
          }}
        >
          {hasRings && (
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] border-white/20"
              style={{ width: size * 2.2, height: size * 0.6, transform: 'rotateZ(25deg)' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const SolarSystem3D: React.FC = () => {
  const planets: PlanetProps[] = [
    { name: 'MERCURY', size: 3, orbitRadius: 35, period: 10, color: '#A1A1AA', baseAngle: 45 },
    { name: 'VENUS', size: 5, orbitRadius: 55, period: 22, color: '#EAB308', baseAngle: 120 },
    { name: 'EARTH', size: 6, orbitRadius: 80, period: 35, color: '#7AA7A1', baseAngle: 0 },
    { name: 'MARS', size: 4, orbitRadius: 100, period: 65, color: '#C9A46A', baseAngle: 280 },
    { name: 'JUPITER', size: 10, orbitRadius: 130, period: 160, color: '#D4D4D8', baseAngle: 190 },
    { name: 'SATURN', size: 9, orbitRadius: 165, period: 300, color: '#FDE68A', hasRings: true, baseAngle: 60 },
  ];

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'rotateX(65deg)', transformStyle: 'preserve-3d' }}>
          {/* Sun */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#C9A46A] z-20 shadow-[0_0_60px_#C9A46A]">
            <div className="absolute inset-0 rounded-full animate-pulse bg-white/30 blur-sm" />
          </div>

          {/* Zodiac Ring Decor */}
          <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full" />
          <div className="absolute w-[510px] h-[510px] border border-white/10 rounded-full border-dashed opacity-30" />

          {planets.map(p => <Planet3D key={p.name} {...p} />)}
        </div>
      </div>
    </div>
  );
};

const DailyQuest: React.FC = () => {
  return (
    <div className="dark-premium-card p-12 h-full flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8F7AD1]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Prominent Zodiac Signs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-white/10 pb-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/5 rounded-[1.8rem] border border-white/10">
              <Star size={28} className="text-[#C9A46A]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-[12px] uppercase tracking-[0.5em] font-extrabold text-[#7AA7A1]">Tageshoroskop</h3>
                <span className="mono text-[9px] text-white/30 uppercase flex items-center gap-2">
                  <RefreshCw size={10} className="animate-spin" /> Live_Transit
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[#C9A46A] text-xl leading-none">♓</span>
                  <span className="mono text-[10px] text-white font-bold uppercase tracking-widest">Fische</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="text-[#7AA7A1] text-xl leading-none">🐎</span>
                  <span className="mono text-[10px] text-white font-bold uppercase tracking-widest">Metall-Pferd</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right hidden lg:block">
            <div className="mono text-[10px] text-white/40 uppercase tracking-widest">{new Date().toLocaleDateString('de-DE')}</div>
            <div className="mono text-[9px] text-[#C9A46A] font-bold uppercase tracking-[0.4em] mt-1">Siderische Zeit: Synchron</div>
          </div>
        </div>

        {/* Content: 3D Visualization & Text - Adjusted to 6:6 Spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 flex-grow items-center">
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-white/[0.01] rounded-[3rem] border border-white/5">
            <SolarSystem3D />
            <div className="mt-4 mono text-[8px] text-white/20 uppercase tracking-[0.6em] text-center">Celestial_Engine_v2.5</div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <Compass size={14} className="text-[#7AA7A1]" />
                <span className="mono text-[10px] text-[#7AA7A1] font-extrabold uppercase tracking-[0.4em]">Kosmische Strömung</span>
              </div>
              <h2 className="serif text-5xl xl:text-6xl font-light mb-8 leading-tight text-white tracking-tight">
                Intuition als Kompass.
              </h2>
              <div className="bg-white/[0.04] p-10 rounded-[2.5rem] border border-white/5 relative group transition-all hover:border-[#7AA7A1]/20">
                <p className="text-white/80 text-xl xl:text-2xl leading-relaxed font-light italic serif">
                  "Die heutige Mars-Neptun Konjunktion verstärkt deine Empathie. Was sich wie Verwirrung anfühlt, ist in Wahrheit ein geschärfter Sinn für das Nicht-Sichtbare. Nutze die Energie des Metall-Pferdes, um diese Visionen in disziplinierte Taten zu verwandeln."
                </p>
                <div className="absolute top-4 right-4 opacity-10">
                  <Sparkles size={24} className="text-[#C9A46A]" />
                </div>
              </div>
            </div>

            {/* Strengths Scales */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-10 border-t border-white/10">
              <SegmentedScale label="Energie" value={68} color="#C9A46A" />
              <SegmentedScale label="Intuition" value={94} color="#7AA7A1" />
              <SegmentedScale label="Gefühle" value={82} color="#8F7AD1" />
            </div>
          </div>
        </div>

        {/* Footer: Interactive Action */}
        <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Heart size={16} className="text-[#8F7AD1]" />
              </div>
              <span className="mono text-[9px] text-white/40 uppercase tracking-widest font-bold">Fokus: Emotionale Integrität</span>
           </div>
           <button className="px-10 py-4 bg-white hover:bg-[#C9A46A] text-[#0E1B33] hover:text-white transition-all duration-500 rounded-full text-[10px] font-extrabold uppercase tracking-[0.5em] flex items-center gap-3 shadow-xl">
              <Eye size={14} /> Tiefenanalyse
           </button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
