
import React from 'react';
import { MasterIdentity } from '../types';
import { Sparkles, Zap, Shield, Globe, Star, CircleDot, Cpu, Info, Activity, Database } from 'lucide-react';
import SigilPortrait from './SigilPortrait';

interface IdentityBadgesProps {
  data: MasterIdentity;
}

const DataRow: React.FC<{ label: string; value: string; icon: any; accent?: string }> = ({ label, value, icon: Icon, accent = "#6CA192" }) => (
  <div className="group/row flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 rounded-lg transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-black/40 rounded-lg border border-white/10 group-hover/row:border-[#D2A95A]/40 transition-colors">
        <Icon size={14} className="text-[#6CA192] group-hover/row:text-[#D2A95A] transition-colors" />
      </div>
      <span className="mono text-[10px] text-[#6CA192] font-bold uppercase tracking-[0.3em]">{label}</span>
    </div>
    <span className="text-sm text-white font-medium tracking-wide text-right">{value}</span>
  </div>
);

const IdentityBadges: React.FC<IdentityBadgesProps> = ({ data }) => {
  return (
    <div className="relative animate-reveal">
      {/* Background Section Title */}
      <div className="absolute -top-12 left-0 w-full flex flex-col items-center pointer-events-none opacity-[0.03]">
        <div className="cluster-title serif uppercase tracking-[1em]">IDENTITY_CORE</div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative bg-[#0F3045]/40 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden glass-reflection shadow-3xl">
          <div className="scanline opacity-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Portrait & Visual Identity */}
            <div className="lg:col-span-5 p-12 lg:border-r border-white/10 flex flex-col items-center justify-center relative">
               <div className="absolute top-8 left-8 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-[#D2A95A] animate-pulse shadow-[0_0_10px_#D2A95A]" />
                 <span className="mono text-[9px] text-[#6CA192] font-bold tracking-[0.4em] uppercase">Visual_ID: LOCKED</span>
               </div>
               
               <div className="relative mb-8 transform hover:scale-105 transition-transform duration-700">
                 <SigilPortrait />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0F3045] via-transparent to-transparent pointer-events-none" />
               </div>

               <div className="text-center">
                 <h2 className="serif text-5xl text-white font-light tracking-tight mb-2 uppercase">{data.tierkreis}</h2>
                 <div className="flex items-center justify-center gap-3">
                    <span className="px-3 py-1 bg-[#D2A95A]/10 border border-[#D2A95A]/30 rounded text-[#D2A95A] mono text-[9px] font-bold uppercase tracking-widest">Year_Matrix</span>
                    <span className="text-[#6CA192] mono text-[9px] opacity-40">SYSTEM_ID: BZ-293</span>
                 </div>
               </div>
            </div>

            {/* Right: Analytical Grid */}
            <div className="lg:col-span-7 p-12 bg-black/20">
               <div className="flex justify-between items-center mb-10">
                 <div className="flex items-center gap-4">
                   <div className="p-3 bg-black/40 rounded-xl border border-[#6CA192]/40">
                     <Database size={18} className="text-[#6CA192]" />
                   </div>
                   <div>
                     <div className="mono text-[10px] text-[#D2A95A] font-bold uppercase tracking-[0.4em] glow-gold">Manifestation Matrix</div>
                     <div className="text-[9px] mono text-[#6CA192] uppercase tracking-[0.2em] opacity-60">Combined BaZi & Western Feed</div>
                   </div>
                 </div>
                 <div className="px-4 py-2 bg-[#6CA192]/10 border border-[#6CA192]/20 rounded-lg flex items-center gap-2">
                   <Activity size={12} className="text-[#6CA192] animate-pulse" />
                   <span className="mono text-[9px] text-white font-bold tracking-widest uppercase">SYNC_OK</span>
                 </div>
               </div>

               <div className="space-y-1 mb-12">
                 <DataRow label="Monatstier" value={data.monatstier} icon={CircleDot} />
                 <DataRow label="Tagestier" value={data.tagestier} icon={Zap} />
                 <DataRow label="Stunden Meister" value={data.stundenMeister} icon={Cpu} />
                 <DataRow label="Element" value={data.element} icon={Globe} />
                 <DataRow label="Konstellation" value={`☉ ${data.konstellation.sun}, ☾ ${data.konstellation.moon}, AC ${data.konstellation.rising}`} icon={Star} />
               </div>

               {/* Interpretation Block */}
               <div className="relative group">
                 <div className="absolute -top-4 -left-2 px-3 py-1 bg-[#D2A95A] text-black mono text-[9px] font-extrabold uppercase tracking-[0.3em] rounded-sm z-10 shadow-xl">
                   Synergie_Insight
                 </div>
                 <div className="bg-[#0F3045]/60 rounded-2xl p-8 border border-[#D2A95A]/30 relative overflow-hidden group-hover:border-[#D2A95A]/60 transition-all duration-500">
                    <div className="scanline opacity-20" />
                    <p className="text-white/80 italic font-light leading-relaxed serif text-xl relative z-10">
                      "{data.bedeutung}"
                    </p>
                    <div className="absolute bottom-4 right-4 text-[#D2A95A]/40">
                      <Sparkles size={16} />
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* Technical Deco Footer for Badge */}
        <div className="flex justify-between items-center mt-6 px-8">
           <div className="flex gap-4">
              {[0, 1, 2].map(i => <div key={i} className="w-8 h-1 bg-[#6CA192]/20 rounded-full" />)}
           </div>
           <div className="mono text-[8px] text-[#6CA192] font-bold uppercase tracking-[0.5em] opacity-40">
              SECURE_PROFILE_ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}
           </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityBadges;
