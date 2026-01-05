
import React from 'react';
import { User, Bot, Sparkles, Settings, AlertCircle, LayoutDashboard, PieChart, Moon, Sun, Languages } from 'lucide-react';
import { UserProfile } from '../types';
import { TRANSLATIONS } from '../constants';

interface SidebarProps { 
  user: UserProfile; 
  theme: 'light' | 'dark';
  language: 'de' | 'en';
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onNavigate: (label: string) => void;
  activeLabel: string;
}

const Sidebar: React.FC<SidebarProps> = ({ user, theme, language, onToggleTheme, onToggleLanguage, onNavigate, activeLabel }) => {
  const t = TRANSLATIONS[language];
  
  const navItems = [
    { icon: LayoutDashboard, label: t.nav.dashboard },
    { icon: User, label: t.nav.profile },
    { icon: PieChart, label: t.nav.quizzes },
    { icon: Bot, label: t.nav.agents },
    { icon: Sparkles, label: t.nav.premium, premium: true },
    { icon: Settings, label: t.nav.settings },
  ];

  return (
    <aside className="w-[280px] h-screen fixed left-0 top-0 border-r border-[var(--stroke)] bg-[var(--card-bg)] flex flex-col p-12 z-50 transition-all duration-500 overflow-hidden">
      {/* Sidebar background brushed effect */}
      <div className="absolute top-0 left-0 w-full h-48 bg-[var(--holo-yellow)]/10 blur-[80px] pointer-events-none"></div>

      <div className="mb-24 relative z-10 text-center md:text-left overflow-visible">
        <h1 className="serif text-4xl text-[var(--navy)] font-light tracking-tighter flex items-center justify-center md:justify-start gap-3 whitespace-nowrap">
          NAVIGATION
        </h1>
        <div className="text-[10px] mono uppercase tracking-[0.5em] text-[var(--muted)] mt-5 font-extrabold opacity-60">SYSTEM_REFL_v2.5</div>
      </div>

      <div className="bg-[var(--bg-paper)] rounded-[2.5rem] p-6 mb-16 flex items-center gap-5 border border-[var(--stroke)] group cursor-pointer hover:border-[var(--holo-gold)] hover:shadow-2xl transition-all shadow-lg relative z-10">
        <div className="w-14 h-14 rounded-[1.5rem] bg-[var(--navy)] flex items-center justify-center text-[var(--bg-paper)] text-2xl serif shadow-2xl transform transition-transform group-hover:scale-110">
          {user.name[0]}
        </div>
        <div className="flex-grow">
          <div className="text-sm font-extrabold text-[var(--navy)] tracking-tight">{user.name}</div>
          <div className="text-[10px] text-[var(--muted)] uppercase tracking-[0.3em] font-bold mt-1.5">Level {user.level}</div>
        </div>
      </div>

      <nav className="flex-1 space-y-4 relative z-10">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={`w-full flex items-center gap-6 px-8 py-5 rounded-[1.5rem] transition-all duration-300 relative overflow-hidden group ${
              activeLabel === item.label 
                ? 'bg-[var(--navy)] text-[var(--bg-paper)] shadow-2xl scale-[1.02]' 
                : 'text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--bg-paper)]'
            }`}
          >
            <item.icon size={20} className={`relative z-10 transition-colors ${activeLabel === item.label ? 'text-[var(--holo-cyan)]' : ''} ${item.premium ? 'text-[var(--holo-gold)]' : ''}`} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.4em] relative z-10">{item.label}</span>
            {item.premium && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--holo-gold)] shadow-[0_0_8px_var(--holo-gold)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-6 relative z-10">
        <div className="flex gap-4">
          <button 
            onClick={onToggleLanguage}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] border border-[var(--stroke)] text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--bg-paper)] transition-all group shadow-sm"
          >
            <Languages size={18} />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.4em]">{language.toUpperCase()}</span>
          </button>
          
          <button 
            onClick={onToggleTheme}
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] border border-[var(--stroke)] text-[var(--muted)] hover:text-[var(--navy)] hover:bg-[var(--bg-paper)] transition-all group shadow-sm"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span className="text-[11px] font-extrabold uppercase tracking-[0.4em]">{theme === 'light' ? 'Nacht' : 'Tag'}</span>
          </button>
        </div>

        <div className="bg-[var(--bg-paper)] rounded-[2.5rem] p-10 text-[12px] leading-relaxed text-[var(--navy)]/80 border border-[var(--stroke)] shadow-inner relative overflow-hidden">
          <div className="absolute -bottom-14 -right-14 w-40 h-40 bg-[var(--holo-gold)]/10 blur-[60px] rounded-full" />
          <div className="flex items-center gap-4 mb-5 font-extrabold text-[var(--navy)] uppercase tracking-[0.3em] opacity-90">
            <AlertCircle size={16} className="text-[var(--holo-gold)]" />
            {t.nav.transparency}
          </div>
          <p className="opacity-90 text-[11px] italic leading-relaxed font-medium">
            {t.nav.transparencyNote}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
