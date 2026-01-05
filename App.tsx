
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import IdentityBadges from './components/IdentityBadges';
import DailyQuest from './components/DailyQuest';
import StatsCard from './components/StatsCard';
import LootSection from './components/LootSection';
import QuizzesCard from './components/QuizzesCard';
import AgentsSection from './components/AgentsSection';
import HoroscopeInput from './components/HoroscopeInput';
import QuizzesPage from './components/QuizzesPage'; // Added QuizzesPage
import { CORE_STATS, IDENTITY_DATA, QUIZZES, AGENTS } from './constants';
import { Search, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeView, setActiveView] = useState<'dashboard' | 'quizzes'>('dashboard');

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

  const handleCalculate = (data: any) => {
    console.log("Calculating for:", data);
  };

  // Improved sidebar integration
  const navigate = (view: string) => {
    if (view === 'Dashboard') setActiveView('dashboard');
    if (view === 'Quizzes') setActiveView('quizzes');
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-[var(--bg-paper)]">
      {/* Sidebar now needs a way to trigger view changes */}
      <Sidebar 
        user={user} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
        onNavigate={(label) => {
          if (label === 'Dashboard') setActiveView('dashboard');
          if (label === 'Quizzes') setActiveView('quizzes');
        }}
        activeLabel={activeView === 'dashboard' ? 'Dashboard' : 'Quizzes'}
      />
      
      <main className="pl-[280px] min-h-screen relative z-10 transition-colors duration-500">
        {/* Content Area */}
        {activeView === 'dashboard' ? (
          <>
            {/* Topbar / Editorial Header */}
            <header className="h-28 px-16 flex items-center justify-between border-b border-[var(--stroke)] bg-[var(--card-bg)]/60 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-500 overflow-visible">
              <div className="max-w-full overflow-hidden">
                 <h2 className="serif text-4xl font-light text-[var(--navy)] tracking-tight truncate">Fusion Core-Matrix</h2>
                 <div className="flex items-center gap-3 mt-1.5">
                    <span className="mono text-[10px] text-[var(--muted)] font-bold tracking-[0.3em] uppercase opacity-60">KI-generiert • Keine Vorhersage</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-12 shrink-0">
                <div className="relative group hidden lg:block">
                   <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={16} />
                   <input 
                     type="text" 
                     placeholder="Matrix durchsuchen..."
                     className="pl-14 pr-8 py-3.5 bg-[var(--input-bg)] border border-[var(--stroke)] rounded-full text-xs font-medium focus:outline-none focus:border-[var(--holo-gold)] w-72 transition-all text-[var(--navy)]"
                   />
                </div>
                <button className="px-12 py-4 bg-[var(--navy)] text-[var(--card-bg)] text-[11px] font-extrabold uppercase tracking-[0.4em] rounded-full hover:bg-[var(--holo-violet)] transition-all shadow-xl shadow-black/10">
                  UPGRADE
                </button>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-16 py-24 space-y-40 animate-reveal">
              {/* Identity Section */}
              <section>
                <IdentityBadges data={IDENTITY_DATA} />
              </section>

              {/* Daily Horoscope */}
              <section className="space-y-24">
                 <div className="text-center relative">
                    <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">ORACLE</div>
                    <div className="relative z-10">
                      <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[var(--holo-cyan)] mb-5">Daily_Transit</div>
                      <h2 className="serif text-7xl font-light text-[var(--navy)] tracking-tighter">Heutige Resonanz</h2>
                    </div>
                 </div>
                 
                 <div className="space-y-12">
                   <DailyQuest />
                   <AgentsSection agents={AGENTS} />
                 </div>
              </section>

              {/* Stats */}
              <section className="space-y-24">
                <div className="text-center relative">
                   <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">STATS</div>
                   <div className="relative z-10">
                     <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[var(--holo-gold)] mb-5">System-Status</div>
                     <h2 className="serif text-7xl font-light text-[var(--navy)] tracking-tighter">Entfaltungs-Matrix</h2>
                   </div>
                </div>
                <StatsCard stats={CORE_STATS} />
              </section>

              {/* Loot & Quizzes */}
              <section className="space-y-24">
                 <div className="text-center relative">
                    <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">LOOT</div>
                    <div className="relative z-10">
                      <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[var(--holo-cyan)] mb-5">Inventory</div>
                      <h2 className="serif text-7xl font-light text-[var(--navy)] tracking-tighter">Mission & Belohnung</h2>
                    </div>
                 </div>
                 <div className="grid grid-cols-12 gap-12 items-stretch">
                   <div className="col-span-12 lg:col-span-8 flex flex-col">
                     <LootSection />
                   </div>
                   <div className="col-span-12 lg:col-span-4 h-full flex flex-col">
                     <QuizzesCard quizzes={QUIZZES} />
                   </div>
                 </div>
              </section>

              {/* Data Input */}
              <section>
                <div className="text-center mb-24 relative">
                   <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">INPUT</div>
                   <div className="relative z-10">
                     <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[var(--holo-violet)] mb-5">Calibration</div>
                     <h2 className="serif text-7xl font-light text-[var(--navy)] tracking-tighter">Matrix Rekonfiguration</h2>
                   </div>
                </div>
                <HoroscopeInput onCalculate={handleCalculate} />
              </section>

              {/* Event Log Pill */}
              <div className="flex justify-center pt-12">
                 <div className="px-8 py-4 bg-[var(--card-bg)] border border-[var(--stroke)] rounded-full shadow-sm flex items-center gap-5 mono text-[10px] text-[var(--muted)] font-bold uppercase tracking-[0.4em]">
                    <Activity size={14} className="text-[var(--holo-cyan)] animate-pulse" />
                    event: dashboard_active ... ts: {Date.now()}
                 </div>
              </div>
            </div>
          </>
        ) : (
          <QuizzesPage />
        )}

        {/* Premium Footer */}
        <footer className="p-20 mt-40 border-t border-[var(--stroke)] bg-[var(--card-bg)] relative overflow-hidden transition-colors duration-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-4 h-4 rounded-full bg-[var(--holo-cyan)] shadow-[0_0_15px_var(--holo-cyan)]" />
              <span className="mono text-[11px] text-[var(--navy)] font-extrabold uppercase tracking-[0.5em]">
                ASTRO • CHARACTER • V10.4
              </span>
            </div>
            <div className="text-[10px] mono uppercase tracking-[0.4em] text-[var(--muted)] font-medium text-center md:text-right">
              Berechnet ≠ Deutung • Nur Reflexion/Unterhaltung
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
