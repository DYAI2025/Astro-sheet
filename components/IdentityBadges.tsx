
import React, { useState, useEffect, useRef } from 'react';
import { MasterIdentity, BaZiPillarData } from '../types';
import { 
  Sparkles, Zap, Star, Cpu, Hexagon, Database, 
  Sun, Wand2, Loader2, Info, Boxes, Terminal, Shield,
  Flame, Mountain, Wind, Waves, Compass, ChevronDown, ChevronUp,
  Workflow
} from 'lucide-react';
import SigilPortrait from './SigilPortrait';
import { ZODIAC_DATA, ZodiacInfo, TRANSLATIONS } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface IdentityBadgesProps {
  data: MasterIdentity;
  language: 'de' | 'en';
}

const RULER_GLYPHS: Record<string, string> = {
  'Sonne': '☉',
  'Mond': '☽',
  'Merkur': '☿',
  'Venus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturn': '♄',
  'Uranus': '♅',
  'Neptun': '♆',
  'Pluto': '♇',
};

const POINT_GLYPHS: Record<string, string> = {
  'Sonne': '☉',
  'Mond': '☽',
  'Rising': 'ASC',
};

const ELEMENT_ICONS: Record<string, any> = {
  'Feuer': Flame,
  'Erde': Mountain,
  'Luft': Wind,
  'Wasser': Waves,
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

const getRulerGlyphs = (rulerStr: string) => {
  if (!rulerStr) return '';
  return rulerStr.split('/').map(r => RULER_GLYPHS[r.trim()] || r.trim()).join(' ');
};

const ZodiacBadge: React.FC<{ sign: string; prefix?: string }> = ({ sign, prefix }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const normalizedSign = sign.toLowerCase().trim();
  const infoKey = signMap[normalizedSign];
  const info = infoKey ? ZODIAC_DATA[infoKey] : null;

  const pointGlyph = prefix ? POINT_GLYPHS[prefix] : null;
  const rulerGlyph = info?.ruler ? getRulerGlyphs(info.ruler) : null;
  const ElementIcon = info?.element ? ELEMENT_ICONS[info.element] : Compass;

  return (
    <div 
      className="relative flex items-center gap-4 md:gap-6 cursor-help group/zodiac transition-all w-full py-3 md:py-4 border-b border-[var(--stroke)] last:border-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => !isSticky && setShowTooltip(false)}
      onClick={() => setIsSticky(!isSticky)}
    >
      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-3xl shadow-lg border transition-all duration-300 select-none ${
        showTooltip || isSticky 
          ? 'bg-[var(--holo-violet)] text-[var(--navy)] border-[var(--holo-violet)] scale-105 shadow-[0_0_20px_var(--holo-violet)]' 
          : 'bg-[var(--bg-paper)] text-[var(--holo-violet)] border-[var(--stroke)] group-hover/zodiac:border-[var(--holo-violet)]'
      }`}>
        {getZodiacSymbol(sign)}
      </div>
      <div className="flex flex-col items-start justify-center min-w-0">
        <div className="flex items-center gap-2 md:gap-3 mb-1">
          <span className="text-[var(--holo-gold)] text-[10px] md:text-xs font-bold leading-none">{pointGlyph}</span>
          <span className="opacity-60 font-bold mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-[var(--muted)]">
            {prefix}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap overflow-hidden">
          <span className="text-[var(--navy)] font-bold text-sm md:text-lg uppercase tracking-tight truncate">{sign}</span>
          <span className="text-[var(--holo-violet)] text-base md:text-xl leading-none opacity-40 group-hover/zodiac:opacity-100 transition-opacity">
            {getZodiacSymbol(sign)}
          </span>
          {rulerGlyph && <span className="hidden md:inline text-[var(--muted)] text-[10px] mono opacity-40 group-hover/zodiac:opacity-100 transition-opacity">({rulerGlyph})</span>}
        </div>
      </div>
      
      {(showTooltip || isSticky) && info && (
        <div className="absolute left-[105%] top-0 w-64 md:w-72 bg-[var(--card-bg)]/98 backdrop-blur-2xl text-[var(--navy)] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-[100] animate-reveal border border-[var(--stroke)]">
          <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-6 border-b border-[var(--stroke)] pb-5 md:pb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.25rem] bg-[var(--bg-paper)] flex items-center justify-center text-[var(--holo-gold)] text-2xl md:text-4xl shadow-inner border border-[var(--stroke)]">
              {getZodiacSymbol(sign)}
            </div>
            <div className="min-w-0">
              <span className="mono text-sm md:text-[16px] font-bold uppercase tracking-[0.1em] text-[var(--navy)] block truncate">{sign}</span>
              <span className="mono text-[8px] md:text-[9px] text-[var(--holo-cyan)] uppercase tracking-[0.3em] font-extrabold mt-1">Matrix_Sync</span>
            </div>
          </div>
          
          <div className="space-y-4 md:space-y-5 text-xs md:text-sm">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun size={10} className="text-[var(--holo-gold)]" />
                <span className="mono text-[9px] uppercase opacity-70 tracking-widest font-bold">Herrscher</span>
              </div>
              <span className="font-bold text-[var(--navy)] text-right">{info.ruler}</span>
            </div>
            
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <ElementIcon size={10} className="text-[var(--holo-cyan)]" />
                <span className="mono text-[9px] uppercase opacity-70 tracking-widest font-bold">Element</span>
              </div>
              <span className="font-bold text-[var(--navy)] uppercase tracking-wide">{info.element}</span>
            </div>

            <div className="pt-5 mt-4 border-t border-[var(--stroke)]">
              <p className="text-[11px] md:text-[12px] text-[var(--muted)] italic leading-relaxed serif bg-[var(--bg-paper)] p-3 md:p-4 rounded-xl border border-[var(--stroke)] text-center">
                {info.keywords}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BaZiPillar: React.FC<{ data: BaZiPillarData; active: boolean; onClick: () => void }> = ({ data, active, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative group/pillar-container w-full">
      <div className={`absolute -inset-[2px] rounded-[2.2rem] opacity-0 transition-all duration-700 pointer-events-none z-0 ${
        active 
          ? 'opacity-100 bg-gradient-to-br from-[var(--holo-gold)] via-[var(--holo-cyan)] to-[var(--holo-violet)] animate-[holo-shimmer_6s_linear_infinite] shadow-lg' 
          : 'group-hover/pillar-container:opacity-100 bg-gradient-to-r from-transparent via-[var(--holo-cyan)]/30 to-transparent'
      }`} style={{ backgroundSize: '200% 200%' }} />
      
      <div 
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => !active && setShowTooltip(false)}
        className={`relative cursor-pointer py-5 md:py-7 px-6 md:px-10 rounded-[2rem] border transition-all duration-700 overflow-hidden group/pillar z-10 ${
          active 
            ? 'border-transparent bg-[var(--navy)]/95 backdrop-blur-xl scale-[1.01] shadow-xl' 
            : 'bg-[var(--card-bg)] border-[var(--stroke)] hover:bg-[var(--bg-paper)] hover:border-transparent shadow-sm'
        }`}
      >
        <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-700 ${active ? 'bg-[var(--holo-gold)]' : 'bg-[var(--stroke)]'}`} />

        <div className="flex justify-between items-center relative z-10 gap-4">
          <div className="flex items-center gap-4 md:gap-6 min-w-0">
             <div className={`p-3 md:p-4 rounded-xl border transition-all duration-500 shrink-0 ${active ? 'bg-white/10 border-white/20' : 'bg-[var(--bg-paper)] border-[var(--stroke)]'}`}>
                <Cpu size={18} className={active ? 'text-[var(--holo-cyan)]' : 'text-[var(--muted)]'} />
             </div>
             <div className="min-w-0">
                <span className={`mono text-[8px] md:text-[9px] font-extrabold uppercase tracking-[0.3em] block mb-1 transition-colors ${active ? 'text-white/60' : 'text-[var(--muted)]'}`}>
                  {data.label} Pillar
                </span>
                <span className={`text-lg md:text-2xl font-bold tracking-tight transition-colors serif truncate block ${active ? 'text-white' : 'text-[var(--navy)]'}`}>
                  {data.value}
                </span>
             </div>
          </div>
          <div className={`flex items-center gap-3 shrink-0 ${active ? 'text-white' : 'text-[var(--muted)]'}`}>
             <Info size={16} className="opacity-40 group-hover/pillar:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${active ? 'grid-rows-[1fr] opacity-100 mt-6 md:mt-10' : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'}`}>
        <div className="overflow-hidden min-h-0">
          <div className="p-8 md:p-14 bg-[var(--card-bg)] text-[var(--navy)] rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-[var(--stroke)] relative overflow-hidden">
            <div className="relative z-10 space-y-8 md:space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--stroke)] pb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[var(--holo-cyan)] to-[var(--holo-gold)]" />
                   <span className="mono text-[10px] md:text-[12px] font-extrabold uppercase tracking-[0.4em]">System_Readout</span>
                </div>
                <span className="mono text-[9px] text-[var(--muted)] uppercase tracking-[0.2em] font-bold">Protocol_V2.5.4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="p-6 md:p-8 rounded-[2rem] bg-[var(--bg-paper)] border border-[var(--stroke)]">
                   <span className="mono text-[9px] text-[var(--muted)] uppercase tracking-widest block mb-4 font-extrabold">Neural_Resonance</span>
                   <div className="flex flex-wrap gap-3">
                      {data.hiddenStems.split('/').map((s, i) => (
                        <div key={i} className="px-4 py-2 bg-[var(--card-bg)] rounded-lg border border-[var(--stroke)] mono text-[11px] font-bold shadow-sm">{s.trim()}</div>
                      ))}
                   </div>
                </div>
                <div className="p-6 md:p-8 rounded-[2rem] bg-[var(--bg-paper)] border border-[var(--stroke)]">
                   <span className="mono text-[9px] text-[var(--muted)] uppercase tracking-widest block mb-4 font-extrabold">Spirit Domain</span>
                   <div className="flex items-center gap-4">
                      <div className="p-4 bg-[var(--holo-gold)]/10 rounded-xl border border-[var(--holo-gold)]/20 shadow-sm"><Shield size={24} className="text-[var(--holo-gold)]" /></div>
                      <span className="mono text-[14px] font-extrabold text-[var(--navy)] uppercase tracking-wider">{data.aspect}</span>
                   </div>
                </div>
              </div>

              <div className="bg-[var(--bg-paper)] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border border-[var(--stroke)] shadow-inner text-center">
                <p className="serif italic text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[var(--navy)]/95 font-light">
                   "{data.description}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const IdentityBadges: React.FC<IdentityBadgesProps> = ({ data, language }) => {
  const [shineKey, setShineKey] = useState(0);
  const [aiInsight, setAiInsight] = useState(data.bedeutung);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeBaZiPillar, setActiveBaZiPillar] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = TRANSLATIONS[language];

  const baZiData: BaZiPillarData[] = [
    { label: language === 'de' ? 'Jahr' : 'Year', value: data.tierkreis, hiddenStems: 'Ji / Ding / Yi', aspect: language === 'de' ? 'Äußere Welt' : 'External World', description: language === 'de' ? 'Die Jahressäule repräsentiert deine Wurzeln und deine Vorfahren.' : 'The Year Pillar represents your roots and ancestors.' },
    { label: language === 'de' ? 'Monat' : 'Month', value: data.monatstier, hiddenStems: 'Ji / Ding / Yi', aspect: language === 'de' ? 'Karriere & Eltern' : 'Career & Parents', description: language === 'de' ? 'Die Monatssäule diktiert dein Arbeitsumfeld.' : 'The Month Pillar dictates your work environment.' },
    { label: language === 'de' ? 'Tag' : 'Day', value: data.tagestier, hiddenStems: 'Xin', aspect: language === 'de' ? 'Das Selbst' : 'The Self', description: language === 'de' ? 'Die Tagessäule ist der Kern deiner Identität.' : 'The Day Pillar is the core of your identity.' }
  ];

  const generateDeepInsight = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const promptText = language === 'de' 
        ? `Führe eine tiefgehende, vergleichende Analyse zwischen der westlichen Astrologie (Sonne ${data.konstellation.sun}, Mond ${data.konstellation.moon}, AC ${data.konstellation.rising}) und der BaZi-Metaphysik (Tierkreis ${data.tierkreis}) durch. Formuliere die Erkenntnis in einem poetischen, modernem und psychologisch scharfsinnigen Ton (ca. 50 Wörter).`
        : `Perform a deep comparative analysis between Western astrology (Sun ${data.konstellation.sun}, Moon ${data.konstellation.moon}, AC ${data.konstellation.rising}) and BaZi metaphysics (Zodiac ${data.tierkreis}). Formulate the insight in a poetic, modern, and psychologically sharp tone (approx. 50 words).`;
      
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: promptText });
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
    <div className="relative animate-reveal transition-all duration-700 w-full overflow-hidden px-1">
      <div className="max-w-[1400px] mx-auto premium-card">
        <div key={shineKey} className="scan-shine-effect" />

        <div className="grid grid-cols-1 xl:grid-cols-12 min-h-[600px] md:min-h-[700px]">
          {/* Left Profile Section */}
          <div className="xl:col-span-5 p-8 md:p-12 lg:p-16 xl:border-r border-[var(--stroke)] flex flex-col items-center justify-center relative bg-[var(--bg-paper)] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.12] pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--holo-gold),transparent_60%)]"></div>
            
            <div className="relative mb-12 scale-90 md:scale-100"><SigilPortrait /></div>
            
            <div className="text-center relative z-10 space-y-4">
              <div className="mono text-[9px] md:text-[11px] text-[var(--holo-gold)] font-extrabold uppercase tracking-[0.5em] mb-2 md:mb-4">{t.identity.protocol}</div>
              <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[var(--navy)] font-light tracking-tighter uppercase leading-tight mb-4 break-words">
                {data.tierkreis}<br/>{data.konstellation.sun}
              </h2>
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-[var(--stroke)] to-transparent mx-auto" />
            </div>
          </div>

          {/* Right Data Section */}
          <div className="xl:col-span-7 p-6 md:p-12 lg:p-16 flex flex-col bg-[var(--card-bg)] transition-colors duration-500 relative">
            <div className="mb-12 border-b border-[var(--stroke)] pb-8 md:pb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 md:gap-8">
                <div className="p-4 md:p-5 bg-[var(--bg-paper)] rounded-2xl md:rounded-[2rem] shadow-lg border border-[var(--stroke)] shrink-0">
                  <Database size={24} className="text-[var(--navy)]" />
                </div>
                <div>
                  <h3 className="serif text-3xl md:text-4xl text-[var(--navy)] font-medium tracking-tight leading-none mb-2">{t.identity.matrixTitle}</h3>
                  <div className="mono text-[9px] md:text-[11px] text-[var(--muted)] uppercase tracking-[0.2em] md:tracking-[0.3em] font-extrabold opacity-70">{t.identity.matrixSub}</div>
                </div>
              </div>
            </div>

            {/* Westliche Konstellation Section */}
            <div className="mb-12 p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-[var(--bg-paper)]/60 border border-[var(--stroke)] relative">
               <div className="absolute top-0 right-6 md:right-10 -translate-y-1/2 px-5 md:px-8 py-2 md:py-3 bg-[var(--navy)] text-[var(--bg-paper)] mono text-[9px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] rounded-full shadow-lg z-20">
                 {t.identity.astroAlignment}
               </div>
               <div className="flex flex-col gap-1 bg-[var(--card-bg)] p-4 md:p-6 lg:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-[var(--stroke)]/50 shadow-sm">
                  <ZodiacBadge prefix={language === 'de' ? 'Sonne' : 'Sun'} sign={data.konstellation.sun} />
                  <ZodiacBadge prefix={language === 'de' ? 'Mond' : 'Moon'} sign={data.konstellation.moon} />
                  <ZodiacBadge prefix={language === 'de' ? 'Rising' : 'Rising'} sign={data.konstellation.rising} />
               </div>
            </div>

            {/* BaZi Pillars Section */}
            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-4 px-4">
                 <Zap size={20} className="text-[var(--holo-cyan)]" />
                 <span className="mono text-[10px] md:text-[12px] text-[var(--navy)] font-extrabold uppercase tracking-[0.4em] md:tracking-[0.5em]">{t.identity.baziProtocols}</span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:gap-8">
                {baZiData.map((pillar, idx) => (
                  <BaZiPillar 
                    key={pillar.label} 
                    data={pillar} 
                    active={activeBaZiPillar === idx}
                    onClick={() => setActiveBaZiPillar(activeBaZiPillar === idx ? null : idx)}
                  />
                ))}
              </div>
            </div>

            {/* AI Synergy Section */}
            <div className="relative mt-24">
              <div 
                className={`bg-[var(--bg-paper)] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 lg:p-16 border border-[var(--stroke)] relative overflow-hidden transition-all duration-700 hover:shadow-xl group ${isExpanded ? 'bg-[var(--card-bg)] shadow-2xl' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <div className="relative z-10 cursor-pointer flex flex-col items-center text-center">
                  <div className="w-full mb-8 border-b border-[var(--stroke)] pb-8 flex flex-col items-center">
                    <h3 className="serif text-2xl md:text-3xl font-light text-[var(--navy)] tracking-tight uppercase mb-6">{t.identity.compatibility}</h3>
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                      <div className="flex flex-col">
                        <span className="mono text-[8px] text-[var(--muted)] font-bold uppercase tracking-widest mb-1">Model_Engine</span>
                        <span className="mono text-[10px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-widest">CALCULATED_V2.5</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="mono text-[8px] text-[var(--muted)] font-bold uppercase tracking-widest mb-1">{t.identity.confidence}</span>
                        <span className="mono text-[10px] text-[var(--holo-gold)] font-extrabold uppercase tracking-widest animate-pulse">99.1%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full relative overflow-hidden transition-all duration-700 ease-in-out" style={{ maxHeight: isExpanded ? '1500px' : '200px' }}>
                    <p className={`text-[var(--navy)] italic font-light leading-snug serif text-xl md:text-2xl lg:text-3xl mb-8 transition-all duration-700 ${isExpanded ? 'opacity-100' : 'opacity-80 line-clamp-3'}`}>
                      "{aiInsight}"
                    </p>
                    {isExpanded && (
                      <div className="animate-reveal space-y-8 pt-8 border-t border-[var(--stroke)] text-left">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-[var(--bg-paper)] p-6 rounded-2xl border border-[var(--stroke)]">
                            <span className="mono text-[9px] text-[var(--holo-cyan)] font-extrabold uppercase tracking-widest block mb-3">{t.identity.westernDynamics}</span>
                            <p className="text-xs md:text-sm text-[var(--navy)]/80 leading-relaxed font-light">
                              {language === 'de' ? `Die Kombination von ${data.konstellation.sun} und ${data.konstellation.moon} deutet auf eine tiefgreifende intuitive Resonanz hin. Der AC wirkt stabilisierend.` : `The combination of ${data.konstellation.sun} and ${data.konstellation.moon} indicates profound intuitive resonance. The rising sign acts as a stabilizer.`}
                            </p>
                          </div>
                          <div className="bg-[var(--bg-paper)] p-6 rounded-2xl border border-[var(--stroke)]">
                            <span className="mono text-[9px] text-[var(--holo-gold)] font-extrabold uppercase tracking-widest block mb-3">{t.identity.baziResonance}</span>
                            <p className="text-xs md:text-sm text-[var(--navy)]/80 leading-relaxed font-light">
                               {language === 'de' ? `Das ${data.tierkreis} bringt Struktur in das Profil. Es ist die "eiserne Faust im Samthandschuh".` : `The ${data.tierkreis} brings structure to the profile. It represents the "iron fist in a velvet glove".`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex flex-col items-center gap-6 w-full">
                    <button 
                      onClick={(e) => { e.stopPropagation(); generateDeepInsight(); }} 
                      disabled={isGenerating} 
                      className="px-8 md:px-12 py-4 md:py-6 bg-[var(--navy)] text-[var(--bg-paper)] rounded-full mono text-[11px] md:text-[13px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-[var(--holo-violet)] transition-all shadow-xl active:scale-95"
                    >
                      {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />} 
                      {t.identity.recalibrate}
                    </button>
                    <div className="text-[var(--muted)] flex flex-col items-center gap-1 opacity-50">
                       <span className="mono text-[8px] font-bold uppercase tracking-widest">{isExpanded ? (language === 'de' ? 'Einklappen' : 'Collapse') : (language === 'de' ? 'Ausklappen' : 'Expand')} Subsystem</span>
                       {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
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
