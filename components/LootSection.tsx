
import React from 'react';
import { Lock, Package, Star } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface LootSectionProps {
  onNavigate?: () => void;
  language: 'de' | 'en';
}

const LootSection: React.FC<LootSectionProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  
  const perks = [
    { 
      title: language === 'de' ? 'Naturkind' : 'Nature Child', 
      subtitle: language === 'de' ? 'Seelenstein: Amethyst' : 'Soulstone: Amethyst', 
      active: true, 
      rarity: 'COMMON' 
    },
    { 
      title: 'Mentalist', 
      subtitle: language === 'de' ? 'Love Language: Qualität' : 'Love Language: Quality', 
      active: true, 
      rarity: 'RARE' 
    },
    { 
      title: language === 'de' ? 'Neue Kachel' : 'New Tile', 
      subtitle: language === 'de' ? 'Sperre aufheben' : 'Unlock barrier', 
      active: false, 
      rarity: 'UNKNOWN' 
    },
  ];

  return (
    <div className="premium-card p-10 h-full flex flex-col transition-colors duration-500">
       <div className="flex items-center gap-4 mb-10 border-b border-[var(--stroke)] pb-8">
        <div className="p-3 bg-[var(--bg-paper)] rounded-xl border border-[var(--stroke)]">
           <Package size={20} className="text-[var(--navy)]" />
        </div>
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-[var(--muted)]">{t.inventory.perksTitle}</h3>
          <div className="text-[9px] mono text-[var(--muted)] opacity-60 mt-1">{t.inventory.storage}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
        {perks.map((perk, idx) => (
          <div
            key={idx}
            onClick={perk.active ? onNavigate : undefined}
            className={`p-10 rounded-[2.5rem] border transition-all flex flex-col items-center text-center justify-between group relative overflow-hidden ${
              perk.active 
                ? 'bg-[var(--card-bg)] border-[var(--stroke)] shadow-sm cursor-pointer hover:border-[var(--holo-gold)] hover:shadow-xl hover:-translate-y-1' 
                : 'bg-transparent border-dashed border-[var(--stroke)] hover:bg-[var(--card-bg)]/40'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-inner transition-all group-hover:scale-110 ${perk.active ? 'bg-[var(--bg-paper)] border border-[var(--stroke)]' : 'bg-transparent border border-dashed border-[var(--stroke)] opacity-40'}`}>
               <div className="absolute inset-0 bg-[var(--card-bg)]/40 rounded-2xl pointer-events-none" />
               {perk.active ? (
                 <Star 
                    size={28} 
                    className={perk.rarity === 'RARE' ? 'text-[var(--holo-gold)] drop-shadow-[0_0_8px_rgba(251,228,161,0.5)]' : 'text-[#7AA7A1]'} 
                 />
               ) : (
                 <div className="relative">
                    <Lock size={20} className="text-[var(--muted)]" />
                    <div className="absolute inset-0 blur-md bg-[var(--muted)]/20" />
                 </div>
               )}
            </div>

            <div className="space-y-3">
              <span className={`text-[12px] font-extrabold uppercase tracking-[0.3em] block ${perk.active ? 'text-[var(--navy)]' : 'text-[var(--muted)] opacity-60'}`}>
                {perk.title}
              </span>
              <span className="text-[11px] text-[var(--muted)] font-medium block leading-relaxed italic serif px-2">{perk.subtitle}</span>
            </div>

            <div className="mt-12 pt-5 border-t border-[var(--stroke)] w-full relative z-10">
               <span className={`mono text-[9px] uppercase tracking-[0.5em] font-extrabold ${perk.active ? (perk.rarity === 'RARE' ? 'text-[var(--holo-gold)]' : 'text-[#7AA7A1]') : 'text-[var(--muted)] opacity-40'}`}>
                  {perk.rarity}
               </span>
            </div>

            {!perk.active && (
              <button className="mt-8 px-8 py-3 bg-[var(--navy)] text-[var(--bg-paper)] rounded-full text-[10px] font-extrabold uppercase tracking-[0.3em] transition-all hover:bg-[var(--holo-violet)] shadow-lg active:scale-95">
                {t.inventory.unlock}
              </button>
            )}
            
            {perk.active && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-30 transition-opacity">
                <Star size={12} className="text-[var(--holo-gold)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LootSection;
