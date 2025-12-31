
import React from 'react';
import { Stat } from '../types';
import { Activity, ShieldCheck } from 'lucide-react';

interface StatsCardProps { stats: Stat[]; }

const SegmentedBar: React.FC<{ value: number }> = ({ value }) => {
  const totalSegments = 20;
  const activeSegments = Math.round((value / 100) * totalSegments);
  
  return (
    <div className="segmented-bar">
      {Array.from({ length: totalSegments }).map((_, i) => (
        <div 
          key={i} 
          className={`segment transition-all duration-700 delay-[${i * 30}ms] ${i < activeSegments ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="premium-card p-14">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
        <div className="max-w-xs space-y-8">
          <div className="p-4 bg-[#0E1B33] inline-flex rounded-2xl">
            <Activity className="text-[#7AA7A1]" size={24} />
          </div>
          <div>
            <h3 className="serif text-5xl font-light text-[#0E1B33] leading-tight">Biometrische Matrix</h3>
            <p className="text-sm text-[#5A6477] mt-4 font-light leading-relaxed">
              Deine aktuelle Resonanz wird über 5 Kernparameter abgebildet. Jede Veränderung im Transit-Feld beeinflusst diese Werte in Echtzeit.
            </p>
          </div>
          <div className="flex items-center gap-3 py-3 border-y border-[#E6E0D8]">
            <ShieldCheck size={14} className="text-[#C9A46A]" />
            <span className="mono text-[9px] text-[#5A6477] font-bold uppercase tracking-[0.3em]">Integrity_Check: Passed</span>
          </div>
        </div>

        <div className="flex-grow w-full space-y-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-4 group">
              <div className="flex justify-between items-baseline px-1">
                <span className="mono text-[11px] font-extrabold text-[#0E1B33] uppercase tracking-[0.4em]">{stat.label}</span>
                <span className="mono text-[11px] font-bold text-[#C9A46A] tracking-[0.1em]">{stat.value}%</span>
              </div>
              <SegmentedBar value={stat.value} />
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-8 opacity-40">
             <div className="flex gap-2">
                {[0, 1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E6E0D8]" />)}
             </div>
             <span className="mono text-[8px] text-[#5A6477] font-bold uppercase tracking-[0.4em]">Reference: Natal_Matrix_v1.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
