
import React from 'react';
import { Lock } from 'lucide-react';

const LootSection: React.FC = () => {
  const perks = [
    { title: 'Naturkind', subtitle: 'Seelenstein: Amethyst', active: true },
    { title: 'Mentalist', subtitle: 'Love Language: Qualität', active: true },
    { title: 'Neue Kachel', subtitle: 'Erkunde dein Potenzial', active: false },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#5A6477]">Kacheln (Loot/Perks)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {perks.map((perk, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              perk.active 
                ? 'bg-white border-[#E6E0D8] shadow-sm hover:border-[#8F7AD1]' 
                : 'bg-transparent border-dashed border-[#E6E0D8] group hover:bg-white/40'
            }`}
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <span className={`text-xs font-bold uppercase tracking-wide ${perk.active ? 'text-[#0E1B33]' : 'text-[#5A6477]'}`}>
                  {perk.title}
                </span>
                {!perk.active && <Lock size={12} className="text-[#5A6477]" />}
              </div>
              <span className="text-[10px] text-[#5A6477]">{perk.subtitle}</span>
            </div>
            {!perk.active && (
              <button className="mt-4 text-[10px] font-bold text-[#8F7AD1] uppercase tracking-tighter">
                freischalten
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LootSection;
