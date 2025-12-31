
import React from 'react';
import Sidebar from './components/Sidebar';
import IdentityBadges from './components/IdentityBadges';
import DailyQuest from './components/DailyQuest';
import StatsCard from './components/StatsCard';
import LootSection from './components/LootSection';
import QuizzesCard from './components/QuizzesCard';
import AgentsSection from './components/AgentsSection';
import HoroscopeInput from './components/HoroscopeInput';
import { CORE_STATS, IDENTITY_DATA, QUIZZES, AGENTS } from './constants';
import { Search, Bell, Sparkles, Terminal, Activity } from 'lucide-react';

const App: React.FC = () => {
  const user = {
    name: 'JULIAN S.',
    level: 14,
    status: 'MISSION_SEEKER',
  };

  const handleCalculate = (data: any) => {
    console.log("Calculating for:", data);
  };

  return (
    <div className="min-h-screen">
      <Sidebar user={user} />
      
      <main className="pl-[260px] min-h-screen relative z-10">
        {/* Topbar / Editorial Header */}
        <header className="h-28 px-16 flex items-center justify-between border-b border-[#E6E0D8] bg-white/60 backdrop-blur-xl sticky top-0 z-50">
          <div>
             <h2 className="serif text-4xl font-light text-[#0E1B33] tracking-tight">Dein Character Sheet</h2>
             <div className="flex items-center gap-3 mt-1.5">
                <span className="mono text-[10px] text-[#5A6477] font-bold tracking-[0.3em] uppercase opacity-60">KI-generiert • Keine Vorhersage</span>
             </div>
          </div>
          
          <div className="flex items-center gap-12">
            <div className="relative group hidden lg:block">
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" size={16} />
               <input 
                 type="text" 
                 placeholder="Matrix durchsuchen..."
                 className="pl-14 pr-8 py-3.5 bg-[#F6F3EE] border border-[#E6E0D8] rounded-full text-xs font-medium focus:outline-none focus:border-[#C9A46A] w-72 transition-all"
               />
            </div>
            <button className="px-12 py-4 bg-[#0E1B33] text-white text-[11px] font-extrabold uppercase tracking-[0.4em] rounded-full hover:bg-[#8F7AD1] transition-all shadow-xl shadow-[#0E1B33]/10">
              UPGRADE
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-16 py-24 space-y-40">
          
          {/* Identity Section - Consolidated Badge */}
          <section className="animate-reveal" style={{ animationDelay: '0.1s' }}>
            <IdentityBadges data={IDENTITY_DATA} />
          </section>

          {/* Daily Quest & Agents - Symmetric Row */}
          <section className="grid grid-cols-12 gap-12 items-stretch">
            <div className="col-span-12 lg:col-span-8 h-full">
               <DailyQuest />
            </div>
            <div className="col-span-12 lg:col-span-4 h-full flex flex-col">
               <AgentsSection agents={AGENTS} />
            </div>
          </section>

          {/* Progress & Stats - High Contrast Block */}
          <section className="space-y-24 animate-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="text-center relative">
               <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">STATS</div>
               <div className="relative z-10">
                 <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[#C9A46A] mb-5">System-Status</div>
                 <h2 className="serif text-7xl font-light text-[#0E1B33] tracking-tighter">Entfaltungs-Matrix</h2>
               </div>
            </div>
            <StatsCard stats={CORE_STATS} />
          </section>

          {/* Loot & Quizzes - High Alignment Block */}
          <section className="space-y-24">
             <div className="text-center relative">
                <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">LOOT</div>
                <div className="relative z-10">
                  <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[#7AA7A1] mb-5">Inventory</div>
                  <h2 className="serif text-7xl font-light text-[#0E1B33] tracking-tighter">Mission & Belohnung</h2>
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

          {/* Data Input Section - Re-Calibration */}
          <section className="animate-reveal" style={{ animationDelay: '0.5s' }}>
            <div className="text-center mb-24 relative">
               <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">INPUT</div>
               <div className="relative z-10">
                 <div className="text-[11px] uppercase tracking-[0.8em] font-extrabold text-[#8F7AD1] mb-5">Calibration</div>
                 <h2 className="serif text-7xl font-light text-[#0E1B33] tracking-tighter">Matrix Rekonfiguration</h2>
               </div>
            </div>
            <HoroscopeInput onCalculate={handleCalculate} />
          </section>

          {/* Event Log Pill */}
          <div className="flex justify-center pt-12">
             <div className="px-8 py-4 bg-white border border-[#E6E0D8] rounded-full shadow-sm flex items-center gap-5 mono text-[10px] text-[#5A6477] font-bold uppercase tracking-[0.4em]">
                <Activity size={14} className="text-[#7AA7A1] animate-pulse" />
                event: cluster_completed ... +tile ... ts: {Date.now()}
             </div>
          </div>
        </div>

        {/* Premium Footer */}
        <footer className="p-20 mt-40 border-t border-[#E6E0D8] bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-4 h-4 rounded-full bg-[#7AA7A1] shadow-[0_0_15px_#7AA7A1]" />
              <span className="mono text-[11px] text-[#0E1B33] font-extrabold uppercase tracking-[0.5em]">
                ASTRO • CHARACTER • V10.4
              </span>
            </div>
            <div className="text-[10px] mono uppercase tracking-[0.4em] text-[#A1A1AA] font-medium text-center md:text-right">
              Berechnet ≠ Deutung • Nur Reflexion/Unterhaltung
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
