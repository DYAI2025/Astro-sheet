
import React from 'react';
import { User, HelpCircle, Bot, Sparkles, Settings, AlertCircle, Compass, Monitor } from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps { user: UserProfile; }

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const navItems = [
    { icon: Compass, label: 'Navigation', active: true },
    { icon: Monitor, label: 'Data Stream' },
    { icon: User, label: 'Manifest' },
    { icon: Bot, label: 'AI Core' },
    { icon: Sparkles, label: 'Warp Drive', premium: true },
    { icon: Settings, label: 'Configs' },
  ];

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-white/10 bg-black flex flex-col p-8 z-50 glass-reflection">
      <div className="scanline" />
      <div className="mb-12 pt-4">
        <h1 className="serif text-4xl text-white font-light tracking-tighter flex items-baseline gap-1">
          ASTRO<span className="text-[#D2A95A] font-bold">.</span>
        </h1>
        <div className="text-[9px] mono uppercase tracking-[0.4em] text-[#6CA192] mt-2 font-bold">ENT-SPEC_V4</div>
      </div>

      <div className="bg-[#0F3045] rounded-xl p-6 mb-12 flex items-center gap-4 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#D2A95A]/10 blur-xl rounded-full" />
        <div className="w-12 h-12 rounded-lg bg-black border border-[#D2A95A]/40 flex items-center justify-center text-[#D2A95A] text-2xl serif glow-gold relative z-10">
          {user.name[0]}
        </div>
        <div className="relative z-10">
          <div className="text-sm font-bold text-white tracking-tight">{user.name}</div>
          <div className="text-[9px] text-[#6CA192] uppercase tracking-[0.2em] font-bold mt-1">Level {user.level}</div>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg transition-all duration-300 group relative overflow-hidden ${
              item.active 
                ? 'text-white' 
                : 'text-[#6CA192] hover:text-white hover:bg-white/5'
            }`}
          >
            {item.active && <div className="absolute inset-y-0 left-0 w-1 bg-[#D2A95A]" />}
            {item.active && <div className="absolute inset-0 bg-[#D2A95A]/5" />}
            <item.icon size={18} className={`relative z-10 transition-colors ${item.active ? 'text-[#D2A95A]' : ''} ${item.premium ? 'text-[#8B5A8B]' : ''}`} />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <div className="bg-[#0F3045]/40 rounded-xl p-5 text-[10px] leading-relaxed text-[#71717A] border border-white/5 backdrop-blur-md relative overflow-hidden">
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#6CA192]/10 blur-lg rounded-full" />
          <div className="flex items-center gap-2 mb-3 font-bold text-[#F7F0E6] uppercase tracking-[0.2em]">
            <AlertCircle size={14} className="text-[#D2A95A]" />
            SENSOR LOGS
          </div>
          <p className="font-medium text-[#6CA192] mb-1">DATA INTEGRITY: HIGH</p>
          <p className="opacity-60 text-[9px] italic">"The stars are not just maps, they are patterns of the soul."</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
