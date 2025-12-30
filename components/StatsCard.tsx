
import React from 'react';
import SigilPortrait from './SigilPortrait';
import { Stat } from '../types';

interface StatsCardProps { stats: Stat[]; }

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="bg-[#0F3045]/30 rounded-[2.5rem] p-12 border border-white/10 shadow-3xl relative overflow-hidden glass-reflection backdrop-blur-xl">
      <div className="scanline" />
      <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <div className="relative">
          <SigilPortrait />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-full">
             <div className="mono text-[10px] text-[#6CA192] font-bold uppercase tracking-[0.4em] mb-1">CORE_SYNC</div>
             <div className="text-xl text-white font-light">CALIBRATED</div>
          </div>
        </div>

        <div className="flex-grow w-full">
          <div className="flex justify-between items-baseline mb-12 pb-6 border-b border-white/10">
            <h3 className="serif text-4xl text-white font-light">Substanz</h3>
            <span className="mono text-[10px] text-[#6CA192] font-bold uppercase tracking-[0.5em]">SYSTEM_SCAN: OK</span>
          </div>

          <div className="space-y-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.4em]">
                  <span className="text-[#6CA192]">{stat.label}</span>
                  <span className="text-[#D2A95A] glow-gold">{stat.value}%</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full relative overflow-hidden border border-white/5">
                  <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#D2A95A] to-[#6CA192] transition-all duration-[2500ms] ease-out shadow-[0_0_15px_rgba(108,161,146,0.6)]"
                    style={{ width: `${stat.value}%` }}
                  />
                  {/* Animated Glint */}
                  <div className="absolute top-0 left-0 h-full w-20 bg-white/20 blur-md -skew-x-12 animate-[glint_3s_infinite]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes glint {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
      `}</style>
    </div>
  );
};

export default StatsCard;
