
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
import { Search, Bell, Sparkles, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const user = {
    name: 'JULIAN S.',
    level: 14,
    status: 'MISSION_SEEKER',
  };

  const handleCalculate = (data: any) => {
    console.log("Calculating for:", data);
    // In a real app, this would fetch new planetary data
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-[#6CA192]/30">
      <Sidebar user={user} />
      
      <main className="pl-[260px] min-h-screen relative">
        {/* Animated Scanline for whole screen */}
        <div className="scanline opacity-20" />

        {/* Topbar / LCARS HUD Style */}
        <header className="h-24 px-12 flex items-center justify-between border-b border-white/10 glass-reflection">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-[#0F3045] rounded-lg border border-[#6CA192]/40">
              <Terminal size={20} className="text-[#6CA192]" />
            </div>
            <div>
               <h2 className="serif text-3xl font-light text-white tracking-wide">KOMMANDO-ZENTRALE</h2>
               <div className="mono text-[8px] text-[#6CA192] font-bold tracking-[0.6em] mt-1">U.S.S. ASTRO • DECK 04</div>
            </div>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-8 text-[#6CA192] mono text-[10px] font-bold tracking-[0.3em]">
              <button className="hover:text-white transition-colors uppercase">Sensors_Active</button>
              <button className="hover:text-white transition-colors uppercase">Quartz_Sync: OK</button>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all relative group">
              <Bell size={20} className="text-white" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-[#D2A95A] rounded-full shadow-[0_0_10px_#D2A95A]" />
            </button>
            <button className="px-8 py-3 bg-[#D2A95A] text-black text-[11px] font-extrabold uppercase tracking-[0.3em] rounded-md hover:bg-white transition-all shadow-xl">
              UPGRADE_SHIP
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto px-10 py-16 space-y-32">
          
          {/* Identity Section - Now uses the single consolidated badge */}
          <section className="animate-reveal" style={{ animationDelay: '0.1s' }}>
            <IdentityBadges data={IDENTITY_DATA} />
          </section>

          {/* Progress & Stats */}
          <section className="space-y-16 animate-reveal" style={{ animationDelay: '0.3s' }}>
            <div className="text-center relative">
               <div className="cluster-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]">STATS</div>
               <div className="relative z-10">
                 <div className="text-[11px] uppercase tracking-[0.6em] font-extrabold text-[#D2A95A] mb-4 glow-gold">System-Status</div>
                 <h2 className="serif text-6xl font-light text-white tracking-tighter">Entfaltungs-Matrix</h2>
               </div>
            </div>
            <StatsCard stats={CORE_STATS} />
          </section>

          {/* Daily Quest & Agents */}
          <section className="grid grid-cols-12 gap-10 items-start">
            <div className="col-span-12 lg:col-span-8">
               <DailyQuest />
            </div>
            <div className="col-span-12 lg:col-span-4">
               <AgentsSection agents={AGENTS} />
            </div>
          </section>

          {/* Loot & Quizzes */}
          <section className="space-y-16">
             <div className="text-center relative">
                <div className="text-[11px] uppercase tracking-[0.6em] font-extrabold text-[#6CA192] mb-4">Archives</div>
                <h2 className="serif text-6xl font-light text-white tracking-tighter">Mission & Belohnung</h2>
             </div>
             <div className="grid grid-cols-12 gap-10">
               <div className="col-span-12 lg:col-span-8">
                 <LootSection />
               </div>
               <div className="col-span-12 lg:col-span-4">
                 <QuizzesCard quizzes={QUIZZES} />
               </div>
             </div>
          </section>

          {/* Data Input Section */}
          <section className="animate-reveal" style={{ animationDelay: '0.5s' }}>
            <div className="text-center mb-16 relative">
               <div className="text-[11px] uppercase tracking-[0.6em] font-extrabold text-[#D2A95A] mb-4 glow-gold">Config_Module</div>
               <h2 className="serif text-6xl font-light text-white tracking-tighter">Matrix Rekonfiguration</h2>
            </div>
            <HoroscopeInput onCalculate={handleCalculate} />
          </section>

        </div>

        {/* High-Tech Footer */}
        <footer className="p-16 mt-32 border-t border-white/10 bg-black/40 backdrop-blur-xl glass-reflection">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#6CA192] animate-pulse shadow-[0_0_10px_#6CA192]" />
              <span className="mono text-[10px] text-[#6CA192] font-bold uppercase tracking-[0.2em]">
                MISSION_CLOCK: {new Date().toLocaleTimeString()} • PROTOCOL_V9.2
              </span>
            </div>
            <div className="text-[10px] mono uppercase tracking-[0.4em] text-[#71717A] font-bold">
              © 2025 ASTRO_SHEET • Boldly Exploring Inner Space
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
