
import React from 'react';
import AgentsSection from './AgentsSection';
import { AGENTS, TRANSLATIONS } from '../constants';

interface AgentsPageProps {
  language: 'de' | 'en';
}

const AgentsPage: React.FC<AgentsPageProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen py-16 md:py-32 px-6 md:px-12 bg-[var(--bg-paper)] relative overflow-hidden transition-all duration-700">
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none overflow-hidden flex flex-col items-center justify-center">
        <div className="cluster-title text-center whitespace-nowrap text-6xl md:text-8xl lg:text-9xl uppercase">
          {language === 'de' ? 'AGENTEN' : 'AGENTS'}
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-24 md:space-y-40 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-6 md:space-y-8">
           <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
             <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--holo-cyan)]" />
             <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[var(--holo-cyan)] shadow-[0_0_15px_var(--holo-cyan)]" />
             <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--holo-cyan)]" />
           </div>
           <h1 className="serif text-5xl md:text-7xl lg:text-8xl text-[var(--navy)] font-light tracking-tighter leading-none">
              {language === 'de' ? 'Künstliche Intelligenz' : 'Artificial Intelligence'}
           </h1>
           <p className="text-[var(--muted)] text-lg md:text-xl lg:text-2xl italic serif max-w-2xl mx-auto opacity-80 leading-relaxed">
             {language === 'de' 
               ? 'Synchronisiere dich mit unseren spezialisierten KI-Modulen für tiefe Einblicke in deine kosmische Matrix.'
               : 'Synchronize with our specialized AI modules for deep insights into your cosmic matrix.'}
           </p>
        </div>

        {/* Main Content */}
        <section className="animate-reveal">
          <AgentsSection agents={AGENTS} language={language} />
        </section>

        {/* Footer info box */}
        <div className="pt-20">
          <div className="bg-[var(--card-bg)]/80 backdrop-blur-xl border border-[var(--stroke)] rounded-[3rem] p-10 md:p-16 flex flex-col items-center text-center space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--holo-violet),transparent_60%)] opacity-[0.03]" />
            <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--bg-paper)] border border-[var(--stroke)] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
               <div className="w-3 h-3 bg-[var(--holo-gold)] rounded-full animate-pulse shadow-[0_0_10px_var(--holo-gold)]" />
            </div>
            <div className="space-y-4">
              <h3 className="serif text-3xl text-[var(--navy)]">Neural Sync Status</h3>
              <p className="text-[var(--muted)] max-w-md italic serif leading-relaxed opacity-80">
                {language === 'de' 
                  ? 'Alle Agenten sind mit der aktuellen Celestial Database synchronisiert. Die Latenz beträgt 24ms.' 
                  : 'All agents are synchronized with the current Celestial Database. Latency is 24ms.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;
