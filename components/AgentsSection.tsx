
import React from 'react';
import { Agent } from '../types';
import { Sparkles, MessageSquare } from 'lucide-react';

interface AgentsSectionProps {
  agents: Agent[];
}

const AgentsSection: React.FC<AgentsSectionProps> = ({ agents }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E6E0D8] shadow-sm">
      <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#5A6477] mb-6">KI Agenten</h3>
      <div className="space-y-4">
        {agents.map((agent) => (
          <div key={agent.id} className="p-4 rounded-xl bg-[#F6F3EE]/50 border border-[#E6E0D8] flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#0E1B33] tracking-tighter">{agent.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#E6E0D8] text-[#5A6477] font-medium uppercase tracking-widest">
                    {agent.type}
                  </span>
                </div>
                <p className="text-[11px] text-[#5A6477] mt-1">{agent.description}</p>
              </div>
              {agent.premium && <Sparkles size={14} className="text-[#C9A46A]" />}
            </div>
            
            <button className={`w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
              agent.premium 
                ? 'bg-[#0E1B33] text-white hover:shadow-lg hover:shadow-[#0E1B33]/20' 
                : 'bg-white border border-[#E6E0D8] text-[#0E1B33] hover:border-[#8F7AD1]'
            }`}>
              {agent.premium ? 'Live (Premium)' : 'Vorstellen'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentsSection;
