
import React, { useState } from 'react';
import { Agent } from '../types';
import { Sparkles, MessageSquare, Bot, Cpu, Zap, Radio, MoreHorizontal, Sigma, ChevronRight, Mic } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface AgentsSectionProps {
  agents: Agent[];
  language: 'de' | 'en';
}

const AgentsSection: React.FC<AgentsSectionProps> = ({ agents, language }) => {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const t = TRANSLATIONS[language];

  return (
    <div className="premium-card p-10 flex flex-col h-full transition-colors duration-500">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-12 border-b border-[var(--stroke)] pb-8">
        <div className="flex items-center gap-5">
          <div className="relative group/icon">
            <div className="p-3.5 bg-[var(--navy)] rounded-2xl relative z-10 shadow-lg group-hover/icon:scale-110 transition-transform">
               <Bot size={22} className="text-[var(--holo-cyan)]" />
            </div>
            <div className="absolute inset-0 bg-[var(--holo-cyan)]/20 blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity" />
          </div>
          <div>
            <h3 className="text-[12px] uppercase tracking-[0.5em] font-extrabold text-[var(--navy)]">{t.agents.title}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--holo-cyan)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--holo-cyan)]"></span>
              </span>
              <span className="text-[9px] mono text-[var(--muted)] uppercase tracking-[0.2em] font-bold">{t.agents.status}</span>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-[var(--bg-paper)] border border-[var(--stroke)] rounded-xl">
          <Radio size={12} className="text-[var(--muted)]" />
          <span className="mono text-[8px] text-[var(--muted)] font-bold uppercase tracking-widest">{t.agents.link}</span>
        </div>
      </div>

      {/* Agents Grid - Redesigned to match the mockup */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-grow">
        {agents.map((agent) => {
          const isVika = agent.id === 'vika';
          const gradientClass = isVika 
            ? 'bg-gradient-to-br from-[var(--card-bg)] via-[var(--card-bg)] to-[var(--holo-violet)]/10' 
            : 'bg-gradient-to-br from-[var(--card-bg)] via-[var(--card-bg)] to-[var(--holo-gold)]/10';

          return (
            <div 
              key={agent.id} 
              className={`p-10 rounded-[3rem] border border-[var(--stroke)] flex flex-col justify-between hover:shadow-2xl transition-all duration-700 group relative overflow-hidden ${gradientClass}`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-full bg-[var(--bg-paper)] border border-[var(--stroke)] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <Sigma size={20} className="text-[var(--navy)]" />
                  </div>
                  <div>
                    <div className="mono text-[10px] text-[var(--muted)] font-extrabold uppercase tracking-[0.3em] mb-1">
                      {agent.type}
                    </div>
                    <h4 className="text-3xl font-bold text-[var(--navy)] tracking-tight">
                      {agent.name}
                    </h4>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-[var(--bg-paper)] flex items-center justify-center hover:bg-[var(--card-bg)] transition-colors border border-[var(--stroke)]">
                  <MoreHorizontal size={18} className="text-[var(--muted)]" />
                </button>
              </div>

              {/* Subtitle & Description */}
              <div className="relative z-10 mb-8">
                <div className="text-[13px] font-semibold text-[var(--muted)] mb-4 px-1">
                  {language === 'de' ? agent.subtitle : (
                    agent.id === 'atlas' ? 'Zodiac · Ascendant · Houses · Aspects' : 'Four Pillars · Elements · 10 Gods · Cycles'
                  )}
                </div>
                <p className="text-[15px] text-[var(--navy)]/80 leading-relaxed font-light">
                   {language === 'de' ? agent.description : (
                     agent.id === 'atlas' 
                      ? 'Mathematically precise calculation -> Symbolism translated into clear patterns.' 
                      : 'Time-based dynamics (Elements & Cycles) -> Structured profile of your resources.'
                   )}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10 relative z-10">
                {agent.tags?.map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-[var(--bg-paper)] rounded-full text-[11px] font-medium text-[var(--muted)] border border-[var(--stroke)]">
                    {language === 'de' ? tag : (
                      tag === 'präzise' ? 'precise' :
                      tag === 'systemisch' ? 'systemic' :
                      tag === 'klar' ? 'clear' :
                      tag === 'Zyklen' ? 'cycles' :
                      tag === 'Elemente' ? 'elements' :
                      tag === 'Timing' ? 'timing' : tag
                    )}
                  </span>
                ))}
              </div>

              {/* Stats Block */}
              <div className="bg-[var(--bg-paper)] p-6 rounded-[2rem] border border-[var(--stroke)] mb-8 relative z-10 flex justify-between items-center group/stats">
                <div>
                  <div className="mono text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold mb-1">
                    {language === 'de' ? agent.statLabel : (agent.statLabel === 'Resonanz' ? 'Resonance' : 'Energy')}
                  </div>
                  <div className="text-3xl font-bold text-[var(--navy)]">
                    {agent.statValue}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--stroke)] flex items-center justify-center shadow-sm group-hover/stats:rotate-12 transition-transform">
                  {isVika ? <Radio size={20} className="text-[var(--navy)]" /> : <Sparkles size={20} className="text-[var(--navy)]" />}
                </div>
              </div>

              {/* Chat Button - Navy Styling */}
              <div className="relative z-10">
                <button 
                  onClick={() => setActiveAgent(agent.id)}
                  className="w-full py-5 bg-[#020617] text-white rounded-[1.8rem] text-[12px] font-bold flex items-center justify-between px-8 hover:bg-[var(--navy)] hover:text-[var(--bg-paper)] transition-all shadow-xl group/btn"
                >
                  <span className="flex items-center gap-4">
                    {agent.premium && <Mic size={16} className="text-[var(--holo-cyan)]" />}
                    {t.agents.chat}
                  </span>
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Decorative Blur Backgrounds */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--card-bg)] opacity-40 blur-3xl pointer-events-none" />
              {isVika && (
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[var(--holo-violet)]/10 blur-3xl rounded-full pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {activeAgent && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center animate-reveal p-6">
           <div className="bg-[var(--card-bg)] w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl border border-[var(--stroke)] relative">
              <button 
                onClick={() => setActiveAgent(null)}
                className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors z-20"
              >
                <MoreHorizontal size={24} className="text-[var(--navy)]" />
              </button>
              <div className="p-16 text-center space-y-10">
                 <div className="w-24 h-24 rounded-full bg-[var(--navy)] mx-auto flex items-center justify-center shadow-xl">
                    <Mic size={32} className="text-[var(--holo-cyan)] animate-pulse" />
                 </div>
                 <div className="space-y-4">
                    <h3 className="serif text-4xl text-[var(--navy)] font-light">{t.agents.voiceInit}</h3>
                    <p className="text-[var(--muted)] leading-relaxed">
                       {t.agents.connecting}
                    </p>
                 </div>
                 <div className="p-10 border border-dashed border-[var(--stroke)] rounded-[2.5rem] bg-[var(--bg-paper)]">
                    <p className="mono text-[10px] text-[var(--muted)] uppercase tracking-widest font-bold">
                       [ElevenLabs_Widget_Container]
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--holo-cyan)] animate-bounce" />
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--holo-cyan)] animate-bounce [animation-delay:0.2s]" />
                       <span className="w-1.5 h-1.5 rounded-full bg-[var(--holo-cyan)] animate-bounce [animation-delay:0.4s]" />
                    </div>
                 </div>
                 <button 
                   onClick={() => setActiveAgent(null)}
                   className="w-full py-5 bg-[var(--navy)] text-[var(--bg-paper)] rounded-2xl text-[11px] font-extrabold uppercase tracking-[0.4em]"
                 >
                   {t.agents.disconnect}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-10 pt-8 border-t border-[var(--stroke)] flex items-center justify-between">
         <span className="mono text-[8px] text-[var(--muted)] uppercase tracking-[0.4em] font-bold">Quantum_Core: Ready</span>
         <div className="flex gap-2">
            <div className="w-1 h-1 rounded-full bg-[var(--stroke)]" />
            <div className="w-1 h-1 rounded-full bg-[var(--holo-gold)]" />
            <div className="w-1 h-1 rounded-full bg-[var(--stroke)]" />
         </div>
      </div>
    </div>
  );
};

export default AgentsSection;
