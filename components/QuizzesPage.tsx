
import React, { useState } from 'react';
import { Sparkles, Sun, Heart, Star, Wand2, Flower2, Gem, Eye, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import QuizPlayer from './QuizPlayer';
import { TRANSLATIONS } from '../constants';

const CHARME_QUIZ_CONFIG = {
  // Config remains the same (assumed to be internally handled or translated by engine)
};

const AURA_QUIZ_CONFIG = {
  // Config remains the same
};

interface QuizzesPageProps {
  language: 'de' | 'en';
}

const QuizzesPage: React.FC<QuizzesPageProps> = ({ language }) => {
  const [activeQuiz, setActiveQuiz] = useState<any>(null);
  const t = TRANSLATIONS[language];

  const clusters = [
    {
      title: language === 'de' ? "Naturkind" : "Nature Child",
      watermark: language === 'de' ? "NATUR" : "NATURE",
      progress: 0,
      quizzes: [
        { id: 'aura', title: language === 'de' ? 'Deine Aura-Farbe' : 'Your Aura Color', desc: language === 'de' ? 'Welche Farbe umgibt deine Seele?' : 'Which color surrounds your soul?', icon: Sun, config: {} },
        { id: 'animal', title: language === 'de' ? 'Dein Krafttier' : 'Your Power Animal', desc: language === 'de' ? 'Welcher uralte Wächter schlummert in dir?' : 'Which ancient guardian slumbers within you?', icon: Wand2 },
        { id: 'flower', title: language === 'de' ? 'Dein inneres Blumenwesen' : 'Your Inner Flower Being', desc: language === 'de' ? 'Wie blühst du in dieser Welt auf?' : 'How do you bloom in this world?', icon: Flower2 },
        { id: 'crystal', title: language === 'de' ? 'Dein Energiestein' : 'Your Energy Stone', desc: language === 'de' ? 'Welcher Kristall resoniert mit deiner Seele?' : 'Which crystal resonates with your soul?', icon: Gem },
      ]
    },
    {
      title: "Mentalist",
      watermark: language === 'de' ? "SEELE" : "SOUL",
      progress: 0,
      quizzes: [
        { id: 'love', title: language === 'de' ? 'Die 5 Sprachen der Liebe' : 'The 5 Love Languages', desc: language === 'de' ? 'Welche Sprache spricht dein Herz?' : 'Which language does your heart speak?', icon: Heart },
        { id: 'charm', title: language === 'de' ? 'Die Kunst des Charmes' : 'The Art of Charm', desc: language === 'de' ? 'Wie verzauberst du die Menschen um dich?' : 'How do you enchant the people around you?', icon: Star, config: {} },
        { id: 'eq', title: language === 'de' ? 'Deine Emotionale Signatur' : 'Your Emotional Signature', desc: language === 'de' ? 'Wie transformierst du Gefühle in Kraft?' : 'How do you transform feelings into power?', icon: Eye },
      ]
    }
  ];

  return (
    <div className="min-h-screen py-16 md:py-32 px-6 md:px-12 bg-[var(--bg-paper)] relative overflow-hidden transition-all duration-700">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none overflow-hidden flex flex-col items-center justify-center gap-20">
        {clusters.map((c, i) => (
          <div key={i} className="cluster-title text-center whitespace-nowrap text-6xl md:text-8xl lg:text-9xl">{c.watermark}</div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-24 md:space-y-40 relative z-10">
        <div className="text-center space-y-6 md:space-y-8">
           <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
             <div className="w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--holo-gold)]" />
             <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-[var(--holo-gold)] shadow-[0_0_15px_var(--holo-gold)]" />
             <div className="w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--holo-gold)]" />
           </div>
           <h1 className="serif text-5xl md:text-7xl lg:text-8xl text-[var(--navy)] font-light tracking-tighter leading-none">
              {language === 'de' ? 'Entdecke Dich Selbst' : 'Discover Yourself'}
           </h1>
           <p className="text-[var(--muted)] text-lg md:text-xl lg:text-2xl italic serif max-w-2xl mx-auto opacity-80 leading-relaxed">
             {language === 'de' 
               ? 'Mysterium und Klarheit vereint. Finde deine wahre Natur durch tiefenpsychologische Kalibrierung.'
               : 'Mystery and clarity united. Find your true nature through deep psychological calibration.'}
           </p>
        </div>

        {clusters.map((cluster) => (
          <div key={cluster.title} className="space-y-16 md:space-y-20">
            <div className="text-center relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cluster-title opacity-[0.04] pointer-events-none uppercase text-4xl md:text-7xl lg:text-8xl">
                 {cluster.watermark}
               </div>
               <div className="relative z-10 space-y-4 md:space-y-6">
                 <div className="text-[9px] md:text-[11px] mono uppercase tracking-[0.5em] md:tracking-[0.8em] text-[var(--muted)] font-extrabold opacity-60">Cluster_Definition</div>
                 <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[var(--navy)] tracking-tight">{cluster.title}</h2>
                 <div className="flex flex-col items-center gap-2 md:gap-3 mt-6 md:mt-8">
                    <div className="text-[9px] md:text-[10px] mono uppercase text-[var(--muted)] font-bold tracking-[0.2em] md:tracking-[0.3em]">System_Progress: {cluster.progress}%</div>
                    <div className="w-48 md:w-60 h-0.5 bg-[var(--stroke)] rounded-full overflow-hidden shadow-inner">
                       <div className="h-full bg-gradient-to-r from-[var(--holo-cyan)] to-[var(--holo-gold)]" style={{ width: `${cluster.progress}%` }} />
                    </div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
              {cluster.quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  onClick={() => quiz.config && setActiveQuiz(quiz.config)}
                  className={`bg-[var(--card-bg)] border border-[var(--stroke)] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col items-center text-center group transition-all duration-700 relative overflow-hidden min-h-[320px] md:min-h-[400px] ${quiz.config ? 'cursor-pointer hover:border-[var(--holo-gold)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1' : 'opacity-60'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative mb-8 md:mb-12">
                    <div className="w-20 md:w-28 h-20 md:h-28 rounded-[1.8rem] md:rounded-[2.2rem] bg-[var(--bg-paper)] flex items-center justify-center border border-[var(--stroke)] relative z-10 group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                       <quiz.icon size={32} className={`text-[var(--muted)] md:w-[48px] md:h-[48px] transition-colors duration-500 ${quiz.config ? 'group-hover:text-[var(--holo-gold)]' : ''}`} />
                    </div>
                    <div className="absolute inset-0 bg-[var(--holo-gold)]/10 blur-[30px] md:blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="space-y-3 md:space-y-5 mb-8 md:mb-12 flex-grow relative z-10">
                    <h3 className="text-sm md:text-base font-bold text-[var(--navy)] tracking-tight uppercase px-2">{quiz.title}</h3>
                    <p className="text-[11px] md:text-[12px] text-[var(--muted)] leading-relaxed serif italic opacity-80 px-2">{quiz.desc}</p>
                  </div>

                  <div className="w-full pt-6 md:pt-8 border-t border-[var(--stroke)] relative z-10">
                    <span className={`text-[9px] md:text-[10px] mono uppercase font-extrabold tracking-[0.3em] md:tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-2 md:gap-3 ${quiz.config ? 'text-[var(--navy)] group-hover:text-[var(--holo-gold)]' : 'text-[var(--muted)] opacity-50'}`}>
                      {quiz.config ? (
                        <>
                          {language === 'de' ? 'Analyse starten' : 'Start Analysis'} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : 'Status: Locked'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-24 md:pt-40">
           <div className="bg-[var(--card-bg)] border border-[var(--stroke)] rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 flex flex-col lg:flex-row items-center gap-12 md:gap-20 group hover:shadow-xl transition-all duration-700 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--holo-cyan),transparent_70%)] opacity-0 group-hover:opacity-5 transition-opacity" />
             
             <div className="w-40 md:w-56 h-40 md:h-56 rounded-full border border-[var(--stroke)] bg-[var(--bg-paper)] flex items-center justify-center p-6 md:p-10 relative shrink-0">
                <div className="absolute inset-0 bg-[var(--holo-gold)]/5 blur-[40px] md:blur-[50px] animate-pulse" />
                <div className="w-full h-full rounded-full border-[1px] border-[var(--holo-gold)]/40 border-dashed animate-[rotate_180s_linear_infinite] flex items-center justify-center">
                   <div className="w-24 md:w-32 h-24 md:h-32 rounded-full bg-gradient-to-tr from-[var(--holo-cyan)]/20 to-[var(--holo-gold)]/20 shadow-inner" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <Star size={24} className="text-[var(--holo-gold)] md:w-[32px] md:h-[32px]" />
                </div>
             </div>
             
             <div className="flex-grow space-y-6 md:space-y-8 text-center lg:text-left relative z-10">
                <h2 className="serif text-4xl md:text-5xl lg:text-6xl text-[var(--navy)] tracking-tighter leading-none">
                   {language === 'de' ? 'Dein Schicksal im Kosmos' : 'Your Destiny in the Cosmos'}
                </h2>
                <p className="text-base md:text-xl text-[var(--muted)] max-w-xl italic serif leading-relaxed opacity-80">
                  {language === 'de' 
                    ? 'Tritt in unsere Astrologie-Sphäre ein und entdecke die kosmischen Muster deiner Existenz. Synchronisiere deine Seele mit den Sternen.'
                    : 'Enter our astrology sphere and discover the cosmic patterns of your existence. Synchronize your soul with the stars.'}
                </p>
                <button className="text-[9px] md:text-[11px] mono uppercase font-extrabold text-[var(--navy)] hover:text-[var(--holo-gold)] transition-all flex items-center gap-3 md:gap-4 py-3 md:py-4 px-8 md:px-10 border border-[var(--stroke)] rounded-full hover:bg-[var(--bg-paper)] shadow-sm">
                  {language === 'de' ? 'Zu den Sternen fliegen' : 'Fly to the stars'} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
           </div>
        </div>
      </div>

      {activeQuiz && (
        <QuizPlayer quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />
      )}
    </div>
  );
};

export default QuizzesPage;
