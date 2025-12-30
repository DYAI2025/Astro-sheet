
import React from 'react';
import { CheckCircle, Play, ChevronRight } from 'lucide-react';
import { QuizItem } from '../types';

interface QuizzesCardProps { quizzes: QuizItem[]; }

const QuizzesCard: React.FC<QuizzesCardProps> = ({ quizzes }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-[#E9DCC9] shadow-sm h-full">
      <h3 className="serif text-2xl text-[#0E1B33] mb-8">Nächste Schritte</h3>
      <div className="space-y-8">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="relative">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${quiz.status === 'completed' ? 'bg-[#7AA7A1]/10 text-[#7AA7A1]' : 'bg-[#C9A46A]/10 text-[#C9A46A]'}`}>
                  {quiz.status === 'completed' ? <CheckCircle size={14} /> : <Play size={12} fill="currentColor" />}
                </div>
                <span className="text-sm font-semibold text-[#0E1B33]">{quiz.title}</span>
              </div>
              <span className="mono text-[10px] font-bold text-[#7AA7A1]">
                {quiz.status === 'completed' ? 'Done' : `${quiz.progress}%`}
              </span>
            </div>
            
            {quiz.recommendation && (
              <div className="pl-11 mb-4">
                <p className="text-[11px] text-[#5A6477] italic leading-relaxed mb-4">
                  Analysten-Tipp: Schärfe deine <span className="text-[#0E1B33] font-bold underline decoration-[#C9A46A]/30">{quiz.recommendation}</span> für präzisere Ergebnisse.
                </p>
                <button className="flex items-center justify-center gap-3 w-full py-3 bg-[#F6F3EE] hover:bg-[#0E1B33] hover:text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all group">
                  Quiz fortsetzen
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
            <div className="h-[1px] w-full bg-[#F6F3EE]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesCard;
