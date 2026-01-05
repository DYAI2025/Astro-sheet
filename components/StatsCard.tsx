
import React, { useEffect, useState } from 'react';
import { Stat } from '../types';
import { Activity, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface StatsCardProps { 
  stats: Stat[];
  language: 'de' | 'en';
}

const SegmentedBar: React.FC<{ value: number }> = ({ value }) => {
  const totalSegments = 20;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  const activeSegments = Math.round((displayValue / 100) * totalSegments);
  
  return (
    <div className="segmented-bar">
      {Array.from({ length: totalSegments }).map((_, i) => (
        <div 
          key={i} 
          className={`segment transition-all duration-300 ${i < activeSegments ? 'active scale-y-110' : 'opacity-40'}`}
          style={{ 
            transitionDelay: `${i * 25}ms`,
            backgroundColor: i < activeSegments ? 'var(--navy)' : 'var(--stroke)'
          }}
        />
      ))}
    </div>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({ stats, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div className="premium-card p-14 transition-colors duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
        <div className="max-w-xs space-y-8">
          <div className="p-4 bg-[var(--navy)] inline-flex rounded-2xl shadow-lg">
            <Activity className="text-[var(--holo-cyan)]" size={24} />
          </div>
          <div>
            <h3 className="serif text-5xl font-light text-[var(--navy)] leading-tight">{t.stats.biometricTitle}</h3>
            <p className="text-sm text-[var(--muted)] mt-4 font-light leading-relaxed">
              {t.stats.biometricNote}
            </p>
          </div>
          <div className="flex items-center gap-3 py-3 border-y border-[var(--stroke)]">
            <ShieldCheck size={14} className="text-[var(--holo-gold)]" />
            <span className="mono text-[9px] text-[var(--muted)] font-bold uppercase tracking-[0.3em]">Integrity_Check: Passed</span>
          </div>
        </div>

        <div className="flex-grow w-full space-y-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="flex justify-between items-baseline px-1">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-[var(--holo-cyan)] opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="mono text-[11px] font-extrabold text-[var(--navy)] uppercase tracking-[0.4em] group-hover:text-[var(--holo-cyan)] transition-colors cursor-default">
                     {language === 'de' ? stat.label : (
                       stat.label === 'Energie-Aufladung' ? 'Energy Charging' :
                       stat.label === 'Bindung' ? 'Bonding' :
                       stat.label === 'Kommunikation' ? 'Communication' :
                       stat.label === 'Struktur' ? 'Structure' :
                       stat.label === 'Analyse ↔ Intuition' ? 'Analysis ↔ Intuition' : stat.label
                     )}
                   </span>
                </div>
                <span className="mono text-[11px] font-bold text-[var(--holo-gold)] tracking-[0.1em]">{stat.value}%</span>
              </div>
              <SegmentedBar value={stat.value} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
