
import React, { useState } from 'react';
import { MasterIdentity } from '../types';
import { Sparkles, Zap, Star, CircleDot, Cpu, Layers, Hexagon, Database, Activity, Info, ChevronRight, ShieldCheck } from 'lucide-react';
import SigilPortrait from './SigilPortrait';
import { ZODIAC_DATA } from '../constants';

interface IdentityBadgesProps {
  data: MasterIdentity;
}

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
  return '';
};

const ZodiacBadge: React.FC<{ sign: string; prefix?: string }> = ({ sign, prefix }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const normalizedSign = sign.toLowerCase().trim();
  const infoKey = signMap[normalizedSign];
  const info = infoKey ? ZODIAC_DATA[infoKey] : null;

  return (
    <div 
      className="relative inline-flex items-center gap-1.5 ml-2 first:ml-0 cursor-help group/zodiac"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <span className="opacity-40 font-medium">{prefix}</span>
      <span className="text-[#0E1B33] font-bold">{sign}</span>
      <span className="text-[#C9A46A] text-lg leading-none select-none" title={sign}>{getZodiacSymbol(sign)}</span>
      
      {/* Tooltip */}
      {showTooltip && info && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 bg-[#0E1B33] text-white p-4 rounded-2xl shadow-2xl z-[100] animate-reveal pointer-events-none border border-white/10">
          <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
            <span className="text-[#C9A46A] text-xl">{getZodiacSymbol(sign)}</span>
            <span className="mono text-[10px] font-bold uppercase tracking-widest">{sign}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="mono text-[8px] uppercase text-white/40 tracking-wider">Herrscher</span>
              <span className="text-[11px] font-bold text-[#7AA7A1]">{info.ruler}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="mono text-[8px] uppercase text-white/40 tracking-wider">Element</span>
              <span className="text-[11px] font-bold text-[#C9A46A]">{info.element}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="mono text-[8px] uppercase text-white/40 tracking-wider">Modalität</span>
              <span className="text-[11px] font-bold text-[#8F7AD1]">{info.modality}</span>
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0E1B33] rotate-45 border-r border-b border-white/10 -mt-1.5" />
        </div>
      )}
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: React.ReactNode; icon: any; isBazi?: boolean }> = ({ label, value, icon: Icon, isBazi }) => (
  <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-[#E6E0D8]/60 last:border-0 hover:bg-[#0E1B33]/[0.02] px-2 transition-all duration-300 group ${isBazi ? 'relative' : ''}`}>
    <div className="flex items-center gap-4 mb-2 sm:mb-0">
      <div className={`p-2 bg-white rounded-lg border border-[#E6E0D8] group-hover:border-[#C9A46A] transition-colors shadow-sm ${isBazi ? 'bg-gradient-to-br from-white to-[#F6F3EE]' : ''}`}>
        <Icon size={14} className={`text-[#5A6477] group-hover:text-[#0E1B33] ${isBazi ? 'text-[#7AA7A1]' : ''}`} />
      </div>
      <div className="flex flex-col">
        <span className="mono text-[10px] text-[#5A6477] font-bold uppercase tracking-[0.4em]">{label}</span>
        {isBazi && <span className="mono text-[7px] text-[#C9A46A] uppercase tracking-[0.2em] font-bold">BAZI_PROTOCOL</span>}
      </div>
    </div>
    <div className={`text-sm text-[#0E1B33] font-bold tracking-tight text-right sm:max-w-[70%] ${isBazi ? 'bg-[#F6F3EE] px-3 py-1 rounded-lg border border-[#E6E0D8]/40' : ''}`}>
      {value}
    </div>
  </div>
);

const IdentityBadges: React.FC<IdentityBadgesProps> = ({ data }) => {
  const [activePillar, setActivePillar] = useState<number | null>(0);

  // Formatting as requested: "MetallPferd & Fisch mit AC Waage"
  const sunSign = data.konstellation.sun.endsWith('e') ? data.konstellation.sun.slice(0, -1) : data.konstellation.sun;
  const combinedHeader = `${data.tierkreis.replace(/\s/g, '')} & ${sunSign} mit AC ${data.konstellation.rising}`;

  // BaZi Pillars Placeholder Data
  const pillars = [
    { label: 'JAHR', title: 'Ancestry', stem: 'Metal (Geng)', branch: 'Horse (Wu)', element: 'Yang Metal', aspect: 'Social Image' },
    { label: 'MONAT', title: 'Parents', stem: 'Earth (Ji)', branch: 'Goat (Wei)', element: 'Yin Earth', aspect: 'Career/Drive' },
    { label: 'TAG', title: 'Self', stem: 'Water (Gui)', branch: 'Rooster (You)', element: 'Yin Water', aspect: 'Inner Core' },
    { label: 'STUNDE', title: 'Future', stem: 'Metal (Xin)', branch: 'Pig (Hai)', element: 'Yin Metal', aspect: 'Ideals/Kids' },
  ];

  return (
    <div className="relative animate-reveal">
      <div className="absolute -top-16 left-0 w-full flex justify-center pointer-events-none">
        <div className="cluster-title serif uppercase tracking-[1.2em]">MANIFESTO</div>
      </div>

      <div className="max-w-5xl mx-auto premium-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left: Sigil & Primary Rank */}
          <div className="lg:col-span-5 p-12 lg:border-r border-[#E6E0D8] flex flex-col items-center justify-center relative bg-[#F6F3EE]/40">
            <div className="absolute top-10 left-10 flex items-center gap-3">
              <Hexagon size={16} className="text-[#C9A46A]" />
              <span className="mono text-[9px] text-[#5A6477] font-bold tracking-[0.4em] uppercase">Core_Matrix</span>
            </div>
            
            <div className="relative mb-12">
              <SigilPortrait />
            </div>

            <div className="text-center">
              <div className="mono text-[10px] text-[#C9A46A] font-extrabold uppercase tracking-[0.6em] mb-4">Master Identity</div>
              <h2 className="serif text-4xl text-[#0E1B33] font-light tracking-tighter uppercase leading-tight mb-2">
                {combinedHeader}
              </h2>
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="w-8 h-[1px] bg-[#E6E0D8]" />
                <span className="text-[#5A6477] mono text-[9px] font-bold tracking-[0.3em] uppercase opacity-60">Status: Verified</span>
                <div className="w-8 h-[1px] bg-[#E6E0D8]" />
              </div>
            </div>
          </div>

          {/* Right: Synthesis Data */}
          <div className="lg:col-span-7 p-14 flex flex-col justify-center">
            <div className="flex justify-between items-center mb-10 border-b border-[#E6E0D8] pb-6">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-[#0E1B33] rounded-2xl">
                  <Database size={20} className="text-[#7AA7A1]" />
                </div>
                <div>
                  <h3 className="serif text-2xl text-[#0E1B33] font-medium tracking-tight">Charakter-Synthese</h3>
                  <div className="mono text-[9px] text-[#5A6477] uppercase tracking-widest mt-1">Multi-Domain Astrology Feed</div>
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-10">
              <DataRow label="Monatstier" value={data.monatstier} icon={CircleDot} isBazi />
              <DataRow label="Tagestier" value={data.tagestier} icon={Zap} isBazi />
              <DataRow label="Stunden Meister" value={data.stundenMeister} icon={Cpu} isBazi />
              <DataRow label="Element" value={data.element} icon={Layers} />
              <DataRow 
                label="Konstellation" 
                value={
                  <div className="flex flex-wrap justify-end gap-y-2">
                    <ZodiacBadge prefix="Sonne in" sign={data.konstellation.sun} />
                    <span className="mx-2 opacity-20 hidden sm:inline">|</span>
                    <ZodiacBadge prefix="Mond im" sign={data.konstellation.moon} />
                    <span className="mx-2 opacity-20 hidden sm:inline">|</span>
                    <ZodiacBadge prefix="AC" sign={data.konstellation.rising} />
                  </div>
                } 
                icon={Star} 
              />
            </div>

            {/* BaZi Four Pillars Matrix */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="mono text-[10px] text-[#5A6477] font-bold uppercase tracking-[0.4em]">Four Pillars Matrix</span>
                <div className="h-[1px] flex-grow bg-[#E6E0D8]" />
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-[#C9A46A]" />
                  <span className="mono text-[8px] uppercase tracking-widest font-bold text-[#A1A1AA]">BaZi Core</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {pillars.map((p, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={() => setActivePillar(idx)}
                    onClick={() => setActivePillar(idx)}
                    className={`relative flex flex-col items-center py-4 rounded-xl border transition-all duration-300 overflow-hidden group/pillar ${
                      activePillar === idx 
                        ? 'bg-[#0E1B33] border-[#0E1B33] text-white shadow-xl translate-y-[-2px]' 
                        : 'bg-white border-[#E6E0D8] text-[#5A6477] hover:border-[#C9A46A] hover:bg-[#F6F3EE]'
                    }`}
                  >
                    {/* Holo Edge for distinction */}
                    <div className={`absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-500 ${
                      activePillar === idx ? 'opacity-100' : 'opacity-30 group-hover/pillar:opacity-60'
                    }`} style={{ background: 'linear-gradient(90deg, #8F7AD1, #7AA7A1, #C9A46A)' }} />
                    
                    <span className="mono text-[9px] font-bold tracking-widest mb-1">{p.label}</span>
                    <span className="text-[10px] opacity-60 uppercase font-medium">{p.title}</span>
                  </button>
                ))}
              </div>

              {/* Pillar Detail Pane */}
              <div className="bg-[#F6F3EE] rounded-2xl p-6 border border-[#E6E0D8] min-h-[140px] flex flex-col justify-center transition-all duration-500 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Hexagon size={120} />
                </div>
                
                {activePillar !== null ? (
                  <div className="animate-reveal relative z-10" key={activePillar}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="mono text-[10px] font-bold text-[#C9A46A] uppercase tracking-widest">{pillars[activePillar].element}</span>
                        <h5 className="serif text-2xl text-[#0E1B33] leading-none mt-1">{pillars[activePillar].aspect}</h5>
                      </div>
                      <div className="bg-white px-3 py-1.5 rounded-lg border border-[#E6E0D8] flex items-center gap-2 shadow-sm">
                        <Activity size={12} className="text-[#7AA7A1]" />
                        <span className="mono text-[8px] uppercase font-bold text-[#5A6477]">Matrix Feed</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <span className="mono text-[8px] uppercase text-[#5A6477] block font-bold opacity-60 tracking-wider">Heavenly Stem</span>
                        <span className="text-sm font-bold text-[#0E1B33] bg-white/50 px-2 py-1 rounded border border-[#E6E0D8]/40 inline-block">{pillars[activePillar].stem}</span>
                      </div>
                      <div className="space-y-1.5">
                        <span className="mono text-[8px] uppercase text-[#5A6477] block font-bold opacity-60 tracking-wider">Earthly Branch</span>
                        <span className="text-sm font-bold text-[#0E1B33] bg-white/50 px-2 py-1 rounded border border-[#E6E0D8]/40 inline-block">{pillars[activePillar].branch}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-[#A1A1AA] gap-3">
                    <ChevronRight size={14} className="animate-pulse" />
                    <span className="mono text-[10px] uppercase tracking-widest">Select Pillar to Inspect</span>
                  </div>
                )}
              </div>
            </div>

            {/* Interpretation Insight */}
            <div className="relative">
              <div className="absolute top-5 left-8 px-3 py-1 bg-[#C9A46A] text-white mono text-[10px] font-bold uppercase tracking-[0.3em] rounded-md shadow-lg z-10">
                Insight
              </div>
              <div className="bg-[#F6F3EE] rounded-[2rem] p-10 border border-[#C9A46A]/20 relative overflow-hidden group shadow-sm">
                <h4 className="mono text-[10px] font-extrabold text-[#C9A46A] uppercase tracking-[0.4em] mb-4 opacity-80 flex items-center gap-2">
                  <Sparkles size={12} />
                  Synergy Analysis
                </h4>
                <p className="text-[#0E1B33] italic font-light leading-relaxed serif text-xl relative z-10">
                  "{data.bedeutung}"
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-[0.05]">
                  <Sparkles size={40} />
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
