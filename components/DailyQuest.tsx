
import React, { useEffect, useState, useMemo } from 'react';
import { Sparkles, Zap, Eye, Heart, Globe, Compass, RefreshCw, Star, Activity, Layers } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

const SegmentedScale: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => {
  const segments = 15;
  const activeSegments = Math.round((value / 100) * segments);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <span className="mono text-[9px] font-extrabold text-[var(--navy)]/70 uppercase tracking-[0.2em] truncate">{label}</span>
        <span className="mono text-[10px] font-bold text-[var(--navy)]" style={{ color }}>{value}%</span>
      </div>
      <div className="flex gap-1.5 h-1.5 w-full">
        {Array.from({ length: segments }).map((_, i) => (
          <div 
            key={i} 
            className="flex-1 rounded-sm transition-all duration-1000"
            style={{ 
              backgroundColor: i < activeSegments ? color : 'rgba(0,0,0,0.08)',
              opacity: i < activeSegments ? 1 : 0.2
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
  const zDepth = Math.sin(radian) * (orbitRadius * 0.1); 
  const depthScale = 0.8 + ((Math.sin(radian) + 1) / 2) * 0.4;

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
        style={{ width: orbitRadius * 2, height: orbitRadius * 2, transform: 'translateZ(-1px)' }}
      />
      
      <div 
        className="absolute top-1/2 left-1/2"
        style={{ 
          transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${zDepth}px) rotateX(-65deg) scale(${depthScale})`,
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          zIndex: Math.floor(zDepth + 500)
        }}
      >
        <div className="w-full h-full relative group/planet flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          <div className="absolute inset-[-2px] rounded-full opacity-30 blur-[4px] group-hover/planet:opacity-60" style={{ backgroundColor: color }} />
          <div className="absolute inset-0 rounded-full shadow-xl" style={{ background: `radial-gradient(circle at 30% 30%, white 0%, ${color} 40%, rgba(0,0,0,0.8) 100%)` }} />
          {hasRings && (
            <div className="absolute w-[200%] h-[100%] border-[2px] border-[var(--holo-gold)]/20 rounded-full" style={{ transform: 'rotateX(75deg)' }} />
          )}
        </div>
      </div>
    </div>
  );
};

const CelestialAspects: React.FC<{ rotations: number[]; planets: PlanetProps[] }> = ({ rotations, planets }) => {
  const aspects = useMemo(() => {
    const list: any[] = [];
    for (let i = 0; i < Math.min(rotations.length, 4); i++) {
      for (let j = i + 1; j < Math.min(rotations.length, 4); j++) {
        const diff = Math.abs(rotations[i] - rotations[j]) % 360;
        const normalizedDiff = diff > 180 ? 360 - diff : diff;
        if (normalizedDiff < 15) list.push({ p1: i, p2: j, color: 'rgba(255,255,255,0.4)' });
      }
    }
    return list;
  }, [rotations]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 overflow-visible" viewBox="-300 -300 600 600">
      {aspects.map((aspect, idx) => {
        const rad1 = (rotations[aspect.p1] * Math.PI) / 180;
        const rad2 = (rotations[aspect.p2] * Math.PI) / 180;
        const r1 = planets[aspect.p1].orbitRadius;
        const r2 = planets[aspect.p2].orbitRadius;
        return (
          <line 
            key={idx}
            x1={Math.cos(rad1) * r1} y1={Math.sin(rad1) * r1} 
            x2={Math.cos(rad2) * r2} y2={Math.sin(rad2) * r2} 
            stroke={aspect.color} strokeWidth="1" strokeDasharray="4 4"
          />
        );
      })}
    </svg>
  );
};

const SolarSystem3D: React.FC = () => {
  const planets: PlanetProps[] = [
    { name: 'MERCURY', size: 4, orbitRadius: 50, period: 10, color: '#9CA3AF', baseAngle: 45 },
    { name: 'VENUS', size: 7, orbitRadius: 80, period: 25, color: '#FDE68A', baseAngle: 120 },
    { name: 'EARTH', size: 8, orbitRadius: 110, period: 40, color: '#22D3EE', baseAngle: 0 },
    { name: 'MARS', size: 6, orbitRadius: 140, period: 60, color: '#F87171', baseAngle: 280 },
    { name: 'JUPITER', size: 16, orbitRadius: 180, period: 140, color: '#D4D4D8', baseAngle: 190 },
    { name: 'SATURN', size: 14, orbitRadius: 220, period: 280, color: '#FDE68A', hasRings: true, baseAngle: 60 },
  ];

  const [rotations, setRotations] = useState<number[]>(planets.map(p => p.baseAngle));

  useEffect(() => {
    let frameId: number;
    const start = Date.now() / 1000;
    const animate = () => {
      const now = Date.now() / 1000;
      const elapsed = now - start;
      setRotations(planets.map(p => (p.baseAngle + (elapsed * (180 / p.period))) % 360));
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'rotateX(65deg)', transformStyle: 'preserve-3d' }}>
        <CelestialAspects rotations={rotations} planets={planets} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-50" style={{ transform: 'rotateX(-65deg)' }}>
          <div className="absolute inset-[-30px] rounded-full bg-[var(--holo-gold)]/10 blur-[30px] animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-[var(--holo-gold)] shadow-[inset_0_0_20px_white,0_0_40px_var(--holo-gold)] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,white_0%,#F59E0B_50%,#B45309_100%)]" />
          </div>
        </div>
        {planets.map((p, i) => (
          <Planet3D key={p.name} {...p} currentRotation={rotations[i]} />
        ))}
      </div>
    </div>
  );
};

interface DailyQuestProps {
  language: 'de' | 'en';
}

const DailyQuest: React.FC<DailyQuestProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="premium-card p-8 md:p-12 lg:p-16 h-full flex flex-col relative overflow-hidden bg-[var(--card-bg)] transition-all duration-700 min-h-[600px] md:min-h-[700px]">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--holo-cyan)]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 border-b border-[var(--stroke)] pb-10">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-[var(--bg-paper)] rounded-2xl border border-[var(--stroke)] shadow-lg shrink-0">
              <Star size={24} className="text-[var(--holo-gold)]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h3 className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-extrabold text-[var(--navy)]/80 truncate">Celestial_Oracle</h3>
                <span className="hidden md:flex items-center gap-2 bg-[var(--navy)] px-3 py-1 rounded-full border border-white/10 mono text-[8px] text-[var(--holo-cyan)] font-bold uppercase tracking-widest shrink-0">
                  Live_Sync
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-[var(--stroke)] shadow-sm">
                  <span className="text-[var(--holo-gold)] text-xl leading-none">♓</span>
                  <span className="mono text-[10px] md:text-[11px] text-[var(--navy)] font-extrabold uppercase tracking-[0.3em]">{language === 'de' ? 'Fische_Core' : 'Pisces_Core'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block text-right">
            <div className="mono text-[11px] text-[var(--navy)] uppercase tracking-[0.2em] font-bold opacity-70">FIELD_SYNCHRONIZATION</div>
            <div className="flex items-center justify-end gap-2 mt-2">
              <Activity size={12} className="text-[var(--holo-cyan)] animate-pulse" />
              <div className="mono text-[10px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-widest">STABLE_CONNECT: 99%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-20 flex-grow items-center">
          <div className="xl:col-span-7 flex items-center justify-center bg-[#01040D] rounded-[2.5rem] md:rounded-[4rem] border border-white/10 relative overflow-hidden aspect-video md:aspect-[1.6] xl:aspect-[1.4] shadow-2xl shrink-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1e1b4b_0%,transparent_60%)]" />
            <SolarSystem3D />
          </div>

          <div className="xl:col-span-5 flex flex-col justify-center space-y-10 xl:space-y-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Layers size={16} className="text-[var(--holo-cyan)]" />
                <span className="mono text-[10px] md:text-[11px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-[0.3em]">{t.oracle.transit}</span>
              </div>
              <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-tight text-[var(--navy)] tracking-tighter">
                {language === 'de' ? (
                  <>Intuition als<br/>leuchtender<br/>Kompass.</>
                ) : (
                  <>Intuition as<br/>a luminous<br/>compass.</>
                )}
              </h2>
              <div className="bg-[var(--bg-paper)]/80 p-8 md:p-10 rounded-[2.5rem] border border-[var(--stroke)] shadow-sm relative">
                <p className="text-[var(--navy)]/100 text-xl md:text-2xl leading-relaxed font-light italic serif">
                   {language === 'de' 
                    ? '"Die heutige Konstellation verstärkt deine Empathie. Was sich wie Verwirrung anfühlt, ist in Wahrheit ein geschärfter Sinn für das Nicht-Sichtbare."'
                    : '"Today\'s constellation heightens your empathy. What feels like confusion is actually a sharpened sense for the unseen."'
                   }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-[var(--stroke)]">
              <SegmentedScale label={t.oracle.energy} value={68} color="var(--holo-gold)" />
              <SegmentedScale label={t.oracle.intuition} value={94} color="var(--holo-cyan)" />
              <SegmentedScale label={t.oracle.feelings} value={82} color="var(--holo-violet)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;
