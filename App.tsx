
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import IdentityBadges from './components/IdentityBadges';
import DailyQuest from './components/DailyQuest';
import StatsCard from './components/StatsCard';
import LootSection from './components/LootSection';
import QuizzesCard from './components/QuizzesCard';
import AgentsSection from './components/AgentsSection';
import HoroscopeInput from './components/HoroscopeInput';
import QuizzesPage from './components/QuizzesPage';
import AgentsPage from './components/AgentsPage';
import { CORE_STATS, IDENTITY_DATA, QUIZZES, AGENTS, TRANSLATIONS } from './constants';
import { Search, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [activeView, setActiveView] = useState<'dashboard' | 'quizzes' | 'agents'>('dashboard');

  const t = TRANSLATIONS[language];

  const user = {
    name: 'JULIAN S.',
    level: 14,
    status: 'MISSION_SEEKER',
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(prev => prev === 'de' ? 'en' : 'de');

  const handleCalculate = (data: any) => {
    console.log("Calculating for:", data);
  };

  const navigateToQuizzes = () => setActiveView('quizzes');
  const navigateToAgents = () => setActiveView('agents');

  const navMap: Record<string, string> = {
    [t.nav.dashboard]: 'Dashboard',
    [t.nav.quizzes]: 'Quizzes',
    [t.nav.agents]: 'Agents',
    'Dashboard': 'Dashboard',
    'Quizzes': 'Quizzes',
    'Agents': 'Agents'
  };

  const getActiveLabel = () => {
    if (activeView === 'dashboard') return t.nav.dashboard;
    if (activeView === 'quizzes') return t.nav.quizzes;
    if (activeView === 'agents') return t.nav.agents;
    return t.nav.dashboard;
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[var(--bg-paper)] overflow-x-hidden">
      <Sidebar 
        user={user} 
        theme={theme} 
        language={language}
        onToggleTheme={toggleTheme} 
        onToggleLanguage={toggleLanguage}
        onNavigate={(label) => {
          const internalLabel = navMap[label] || label;
          if (internalLabel === 'Dashboard') setActiveView('dashboard');
          if (internalLabel === 'Quizzes') setActiveView('quizzes');
          if (internalLabel === 'Agents') setActiveView('agents');
        }}
        activeLabel={getActiveLabel()}
      />
      
      <main className="pl-0 lg:pl-[280px] min-h-screen relative z-10 transition-colors duration-500 w-full overflow-hidden">
        {activeView === 'dashboard' && (
          <>
            {/* Optimized Topbar */}
            <header className="h-24 px-6 md:px-12 lg:px-16 flex items-center justify-between border-b border-[var(--stroke)] bg-[var(--card-bg)]/60 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500">
              <div className="min-w-0">
                 <h2 className="serif text-2xl md:text-3xl lg:text-4xl font-light text-[var(--navy)] tracking-tight truncate">{t.topbar.title}</h2>
                 <div className="flex items-center gap-2 mt-1">
                    <span className="mono text-[9px] text-[var(--muted)] font-bold tracking-[0.2em] uppercase opacity-60">{t.topbar.analytics} • v2.5.4</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-8 shrink-0">
                <div className="relative group hidden xl:block">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={14} />
                   <input 
                     type="text" 
                     placeholder={t.topbar.search}
                     className="pl-11 pr-6 py-2.5 bg-[var(--input-bg)] border border-[var(--stroke)] rounded-full text-[11px] font-medium focus:outline-none focus:border-[var(--holo-gold)] w-64 transition-all text-[var(--navy)]"
                   />
                </div>
                <button className="px-6 md:px-10 py-3 bg-[var(--navy)] text-[var(--card-bg)] text-[10px] font-extrabold uppercase tracking-[0.3em] rounded-full hover:bg-[var(--holo-violet)] transition-all shadow-lg active:scale-95">
                  {t.topbar.upgrade}
                </button>
              </div>
            </header>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-24 space-y-24 md:space-y-40 animate-reveal">
              {/* Identity Section */}
              <section className="w-full">
                <IdentityBadges data={IDENTITY_DATA} language={language} />
              </section>

              {/* Daily Horoscope */}
              <section className="space-y-16 md:space-y-24">
                 <div className="text-center relative py-12">
                    <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-5xl md:text-8xl opacity-[0.03] uppercase">{t.oracle.watermark}</div>
                    <div className="relative z-10">
                      <div className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-extrabold text-[var(--holo-cyan)] mb-4">{t.oracle.transit}</div>
                      <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-light text-[var(--navy)] tracking-tighter">{t.oracle.title}</h2>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 gap-8 md:gap-12">
                   <DailyQuest language={language} />
                   <div onClick={navigateToAgents} className="cursor-pointer">
                    <AgentsSection agents={AGENTS} language={language} />
                   </div>
                 </div>
              </section>

              {/* Stats */}
              <section className="space-y-16 md:space-y-24">
                <div className="text-center relative py-12">
                   <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-5xl md:text-8xl opacity-[0.03] uppercase">{t.stats.watermark}</div>
                   <div className="relative z-10">
                     <div className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-extrabold text-[var(--holo-gold)] mb-4">{t.stats.status}</div>
                     <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-light text-[var(--navy)] tracking-tighter">{t.stats.title}</h2>
                   </div>
                </div>
                <StatsCard stats={CORE_STATS} language={language} />
              </section>

              {/* Loot & Quizzes */}
              <section className="space-y-16 md:space-y-24">
                 <div className="text-center relative py-12">
                    <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-5xl md:text-8xl opacity-[0.03] uppercase">{t.inventory.watermark}</div>
                    <div className="relative z-10">
                      <div className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-extrabold text-[var(--muted)] mb-4">{t.inventory.watermark}</div>
                      <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-light text-[var(--navy)] tracking-tighter">{t.inventory.title}</h2>
                    </div>
                 </div>
                 <div className="grid grid-cols-12 gap-8 md:gap-12 items-stretch">
                   <div className="col-span-12 xl:col-span-8">
                     <LootSection onNavigate={navigateToQuizzes} language={language} />
                   </div>
                   <div className="col-span-12 xl:col-span-4 h-full">
                     <QuizzesCard quizzes={QUIZZES} onNavigate={navigateToQuizzes} language={language} />
                   </div>
                 </div>
              </section>

              {/* Data Input */}
              <section className="py-12">
                <div className="text-center mb-16 md:mb-24 relative">
                   <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none text-5xl md:text-8xl opacity-[0.03] uppercase">{t.input.watermark}</div>
                   <div className="relative z-10">
                     <div className="text-[10px] md:text-[11px] uppercase tracking-[0.6em] md:tracking-[0.8em] font-extrabold text-[var(--holo-violet)] mb-4">{t.input.calibration}</div>
                     <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-light text-[var(--navy)] tracking-tighter">{t.input.title}</h2>
                   </div>
                </div>
                <HoroscopeInput onCalculate={handleCalculate} language={language} />
              </section>

              {/* Event Log Pill */}
              <div className="flex justify-center pt-8">
                 <div className="px-6 py-3 bg-[var(--card-bg)] border border-[var(--stroke)] rounded-full shadow-sm flex items-center gap-4 mono text-[9px] text-[var(--muted)] font-bold uppercase tracking-[0.3em]">
                    <Activity size={12} className="text-[var(--holo-cyan)] animate-pulse" />
                    status: operational_sync ... ts: {Date.now()}
                 </div>
              </div>
            </div>
          </>
        )}

        {activeView === 'quizzes' && <QuizzesPage language={language} />}
        {activeView === 'agents' && <AgentsPage language={language} />}

        {/* Premium Footer */}
        <footer className="px-6 md:px-12 lg:px-20 py-16 mt-24 border-t border-[var(--stroke)] bg-[var(--card-bg)] relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-[var(--holo-cyan)] shadow-[0_0_10px_var(--holo-cyan)]" />
              <span className="mono text-[10px] text-[var(--navy)] font-extrabold uppercase tracking-[0.4em]">
                ASTRO • CHARACTER • ENGINE
              </span>
            </div>
            <div className="text-[9px] mono uppercase tracking-[0.3em] text-[var(--muted)] font-medium text-center md:text-right">
              SYSTEM_AUTH_V10.4 • ANALYTICAL_REFLECTIONS_ONLY
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
