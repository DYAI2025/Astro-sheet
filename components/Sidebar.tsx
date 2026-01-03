
import React from 'react';
import { User, HelpCircle, Bot, Sparkles, Settings, AlertCircle, LayoutDashboard, PieChart, Moon, Sun } from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps { 
  user: UserProfile; 
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, theme, onToggleTheme }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: User, label: 'Profil' },
    { icon: PieChart, label: 'Quizzes' },
    { icon: Bot, label: 'Agenten' },
    { icon: Sparkles, label: 'Premium', premium: true },
    { icon: Settings, label: 'Einstellungen' },
  ];

  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 border-r border-[var(--stroke)] bg-[var(--card-bg)] flex flex-col p-10 z-50 transition-colors duration-500">
      <div className="mb-20">
        <h1 className="serif text-3xl text-[var(--navy)] font-light tracking-tighter flex items-center gap-2">
          ASTRO<span className="w-2 h-2 rounded-full bg-[var(--holo-gold)]"></span>CHARACTER
        </h1>
        <div className="text-[9px] mono uppercase tracking-[0.5em] text-[var(--muted)] mt-3 font-bold opacity-60">REFL_PROTOCOL_v1</div>
      </div>

      <div className="bg-[var(--bg-paper)] rounded-3xl p-6 mb-16 flex items-center gap-4 border border-[var(--stroke)] group cursor-pointer hover:border-[var(--holo-gold)] transition-all shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[var(--navy)] flex items-center justify-center text-[var(--card-bg)] text-xl serif shadow-lg transform transition-transform group-hover:scale-105">
          {user.name[0]}
        </div>
        <div>
          <div className="text-sm font-bold text-[var(--navy)] tracking-tight">{user.name}</div>
          <div className="text-[9px] text-[var(--muted)] uppercase tracking-[0.2em] font-bold mt-1">Level {user.level}</div>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-5 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
              item.active 
                ? 'bg-[var(--navy)] text-[var(--card-bg)] shadow-xl shadow-black/20' 
                : 'text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--bg-paper)]'
            }`}
          >
            <item.icon size={18} className={`relative z-10 transition-colors ${item.active ? 'text-[var(--holo-cyan)]' : ''} ${item.premium ? 'text-[var(--holo-gold)]' : ''}`} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em] relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <button 
          onClick={onToggleTheme}
          className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border border-[var(--stroke)] text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--bg-paper)] transition-all group"
        >
          <div className="flex items-center gap-5">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span className="text-[11px] font-extrabold uppercase tracking-[0.3em]">{theme === 'light' ? 'Nachtmodus' : 'Tagmodus'}</span>
          </div>
          <div className={`w-8 h-4 rounded-full p-1 flex items-center transition-colors ${theme === 'dark' ? 'bg-[var(--holo-cyan)]' : 'bg-[var(--stroke)]'}`}>
            <div className={`w-2 h-2 rounded-full bg-[var(--card-bg)] shadow-sm transition-transform ${theme === 'dark' ? 'translate-x-4' : 'translate-x-0'}`} />
          </div>
        </button>

        <div className="bg-[var(--navy)] rounded-[2rem] p-8 text-[11px] leading-relaxed text-[var(--card-bg)]/50 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--holo-gold)]/10 blur-3xl rounded-full" />
          <div className="flex items-center gap-3 mb-4 font-bold text-[var(--card-bg)] uppercase tracking-[0.3em]">
            <AlertCircle size={14} className="text-[var(--holo-gold)]" />
            Transparenz
          </div>
          <p className="font-bold text-[var(--card-bg)] mb-2 uppercase tracking-wide">Berechnet ≠ Deutung</p>
          <p className="opacity-60 text-[10px] italic leading-snug">
            Dieses Dashboard dient ausschließlich der Reflexion und Unterhaltung.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
