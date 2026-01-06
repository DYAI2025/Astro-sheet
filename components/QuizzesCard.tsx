
import React from 'react';
import { CheckCircle, Play, ChevronRight, GraduationCap } from 'lucide-react';
import { QuizItem } from '../types';
import { TRANSLATIONS } from '../constants';

interface QuizzesCardProps { 
  quizzes: QuizItem[]; 
  onNavigate?: () => void;
  language: 'de' | 'en';
}

const QuizzesCard: React.FC<QuizzesCardProps> = ({ quizzes, onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  
  return (
    <div className="premium-card p-10 h-full flex flex-col transition-colors duration-500">
      <div className="flex items-center gap-4 mb-10 border-b border-[var(--stroke)] pb-8">
        <div className="p-3 bg-[var(--bg-paper)] rounded-xl border border-[var(--stroke)]">
           <GraduationCap size={20} className="text-[var(--navy)]" />
        </div>
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.4em] font-extrabold text-[var(--muted)]">{t.inventory.nextSteps}</h3>
          <div className="text-[9px] mono text-[var(--muted)] opacity-60 mt-1">{t.inventory.focus}</div>
        </div>
      </div>

      <div className="space-y-12 flex-grow">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="relative group cursor-pointer" onClick={onNavigate}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${quiz.status === 'completed' ? 'bg-[#7AA7A1]/10 text-[#7AA7A1] border-[#7AA7A1]/20' : 'bg-[var(--holo-gold)]/10 text-[var(--holo-gold)] border-[var(--holo-gold)]/20 group-hover:bg-[var(--holo-gold)] group-hover:text-[var(--navy)] shadow-sm'}`}>
                  {quiz.status === 'completed' ? <CheckCircle size={20} /> : <Play size={18} fill="currentColor" />}
                </div>
                <span className="text-[15px] font-bold text-[var(--navy)] tracking-tight group-hover:text-[var(--holo-gold)] transition-colors">
                   {language === 'de' ? quiz.title : (quiz.title === 'Naturkind' ? 'Nature Child' : quiz.title)}
                </span>
              </div>
              <span className={`mono text-[10px] font-extrabold uppercase tracking-widest ${quiz.status === 'completed' ? 'text-[#7AA7A1]' : 'text-[var(--muted)] opacity-60'}`}>
                {quiz.status === 'completed' ? 'DONE' : `${quiz.progress}%`}
              </span>
            </div>
            
            {quiz.recommendation && (
              <div className="pl-16">
                <p className="text-[13px] text-[var(--muted)] italic leading-relaxed mb-8 font-light serif">
                  {t.inventory.tip} <span className="text-[var(--navy)] font-bold underline decoration-[var(--holo-gold)]/30">{language === 'de' ? quiz.recommendation : 'Reflection-Depth'}</span>.
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate?.(); }}
                  className="flex items-center justify-center gap-5 w-full py-5 bg-[var(--bg-paper)] hover:bg-[var(--navy)] hover:text-white rounded-2xl border border-[var(--stroke)] text-[10px] font-extrabold uppercase tracking-[0.4em] transition-all group/btn shadow-sm"
                >
                  {t.inventory.continue}
                  <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
            <div className="mt-10 h-px w-full bg-[var(--stroke)] opacity-40 last:hidden" />
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-[var(--bg-paper)] rounded-[2rem] border border-[var(--stroke)] text-center relative overflow-hidden group/timer">
         <div className="absolute inset-0 bg-[var(--holo-gold)]/5 opacity-0 group-hover/timer:opacity-100 transition-opacity" />
         <p className="mono text-[9px] text-[var(--muted)] uppercase tracking-[0.3em] font-extrabold relative z-10">
            {t.inventory.newQuizzes} 14:23h
         </p>
      </div>
    </div>
  );
};

export default QuizzesCard;
