
import React from 'react';
import { Agent } from '../types';
import { Sparkles, MessageSquare, Bot, Cpu, Zap, Radio } from 'lucide-react';

interface AgentsSectionProps {
  agents: Agent[];
}

const AgentsSection: React.FC<AgentsSectionProps> = ({ agents }) => {
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
            <h3 className="text-[12px] uppercase tracking-[0.5em] font-extrabold text-[var(--navy)]">KI Agenten</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--holo-cyan)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--holo-cyan)]"></span>
              </span>
              <span className="text-[9px] mono text-[var(--muted)] uppercase tracking-[0.2em] font-bold">Status: Active_Listen</span>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-[var(--bg-paper)] border border-[var(--stroke)] rounded-xl">
          <Radio size={12} className="text-[var(--muted)]" />
          <span className="mono text-[8px] text-[var(--muted)] font-bold uppercase tracking-widest">Neural_Link: Stable</span>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
        {agents.map((agent) => {
          const isBazi = agent.type.toLowerCase().includes('bazi');
          const typeColor = isBazi ? 'var(--holo-cyan)' : 'var(--holo-violet)';
          
          return (
            <div key={agent.id} className="p-8 rounded-[2.5rem] bg-[var(--bg-paper)]/40 border border-[var(--stroke)] flex flex-col justify-between hover:border-[var(--holo-gold)] hover:bg-[var(--card-bg)] transition-all duration-500 group relative overflow-hidden shadow-sm hover:shadow-xl">
              {/* Subtle tech background element */}
              <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                <Cpu size={120} strokeWidth={0.5} />
              </div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="serif text-2xl font-medium text-[var(--navy)] tracking-tight group-hover:text-[var(--holo-gold)] transition-colors">{agent.name}</span>
                    
                    {/* Refined Type Badge */}
                    <div className="relative inline-flex items-center">
                      <div 
                        className="absolute inset-0 opacity-10 rounded-lg" 
                        style={{ backgroundColor: typeColor }}
                      />
                      <span 
                        className="relative px-3 py-1.5 rounded-lg border text-[9px] font-extrabold uppercase tracking-[0.2em] mono flex items-center gap-2"
                        style={{ 
                          borderColor: `${typeColor}44`,
                          color: typeColor 
                        }}
                      >
                        <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: typeColor }} />
                        {agent.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-[14px] text-[var(--muted)] mt-4 font-light leading-relaxed serif italic">
                    {agent.description}
                  </p>
                </div>
                
                {agent.premium && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-[var(--holo-gold)]/30 blur-md animate-pulse rounded-full" />
                    <Sparkles size={22} className="text-[var(--holo-gold)] relative z-10 group-hover:scale-125 transition-transform" />
                  </div>
                )}
              </div>
              
              <div className="relative z-10">
                <button className={`w-full py-4 rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 ${
                  agent.premium 
                    ? 'bg-[var(--navy)] text-[var(--card-bg)] hover:bg-[var(--holo-violet)] shadow-xl shadow-black/10' 
                    : 'bg-[var(--card-bg)] border border-[var(--stroke)] text-[var(--navy)] hover:border-[var(--holo-gold)] hover:bg-[var(--bg-paper)]'
                }`}>
                  {agent.premium ? (
                    <>
                      <Zap size={14} className="text-[var(--holo-gold)]" />
                      Live (Premium)
                    </>
                  ) : (
                    <>
                      <MessageSquare size={14} className="text-[var(--muted)] group-hover:text-[var(--holo-gold)]" />
                      Vorstellen
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

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
