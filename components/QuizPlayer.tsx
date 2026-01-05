
import React, { useState, useMemo } from 'react';
import { X, ArrowLeft, ArrowRight, Sparkles, Share2, RefreshCcw } from 'lucide-react';

interface QuizPlayerProps {
  quiz: any;
  onClose: () => void;
}

const QuizPlayer: React.FC<QuizPlayerProps> = ({ quiz, onClose }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = quiz.questions;
  const quizId = quiz.meta.id;

  const handleStart = () => setStep('questions');

  const handleSelect = (optionIdx: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIdx] = optionIdx;
    setAnswers(newAnswers);
    
    // Auto-advance for better UX after a short delay
    setTimeout(() => {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setStep('results');
      }
    }, 400);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setStep('results');
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const resultData = useMemo(() => {
    if (step !== 'results') return null;

    // Generic Scoring: sum all dimensions
    const rawScores: any = {};
    answers.forEach((ansIdx, qIdx) => {
      const opt = questions[qIdx].options[ansIdx];
      if (opt.scores) {
        Object.keys(opt.scores).forEach(key => {
          rawScores[key] = (rawScores[key] || 0) + opt.scores[key];
        });
      }
    });

    if (quizId === 'charme-signatur-quiz') {
      // Normalization to 1-5 scale
      const maxPerDim = questions.length * 5;
      const normalized: any = {};
      Object.keys(rawScores).forEach(dim => {
        normalized[dim] = Math.round((rawScores[dim] / maxPerDim) * 4) + 1;
      });

      // Simple profile matcher based on conditions
      let bestMatch: any = null;
      let highestMatchScore = -1;

      // Extract profiles from config or hardcode the logic for matching
      const profiles = [
        { id: 'herzoffner', title: 'Der Herzöffner', tag: 'In deiner Gegenwart tauen selbst Eisberge auf.' },
        { id: 'magnetische', title: 'Die Magnetische', tag: 'Du erhellst Räume, ohne das Licht zu suchen.' },
        { id: 'stiller-verzauberer', title: 'Der Stille Verzauberer', tag: 'Dein Schweigen spricht lauter als Worte.' },
        { id: 'diplomat', title: 'Der Diplomat', tag: 'Du bist der Klebstoff der Gruppe.' },
        { id: 'esprit-funke', title: 'Der Esprit-Funke', tag: 'Dein Witz öffnet alle Türen.' },
        { id: 'praesenz-anker', title: 'Der Präsenz-Anker', tag: 'In deiner Nähe findet der Sturm sein Auge.' }
      ];

      // Logic: Highest average dimension usually wins in this simplified matching
      const winnerKey = Object.keys(normalized).reduce((a, b) => normalized[a] > normalized[b] ? a : b);
      if (winnerKey === 'warmth') bestMatch = profiles[0];
      else if (winnerKey === 'resonance') bestMatch = profiles[2];
      else if (winnerKey === 'authenticity') bestMatch = profiles[4];
      else bestMatch = profiles[1];

      return { type: 'charme', title: bestMatch.title, tagline: bestMatch.tag, scores: normalized };
    }

    if (quizId === 'aura-farben-quiz') {
      const maxPerDim = 15; // 3 questions per dim
      const normalized: any = {};
      Object.keys(rawScores).forEach(dim => {
        normalized[dim] = rawScores[dim] / maxPerDim;
      });

      // Basic highest dimension wins for color mapping
      const colors: any = {
        energiefluss: { title: 'Leuchtendes Rot', tag: 'Pure Lebensenergie.' },
        rhythmus: { title: 'Warmes Orange', tag: 'Der kreative Strom.' },
        wahrnehmung: { title: 'Mystisches Indigo', tag: 'Der Wanderer zwischen Welten.' },
        resonanz: { title: 'Tiefes Grün', tag: 'Der stille Heiler.' }
      };

      const winnerDim = Object.keys(normalized).reduce((a, b) => normalized[a] > normalized[b] ? a : b);
      const match = colors[winnerDim] || { title: 'Klares Blau', tag: 'Die ruhige Wahrheit.' };

      return { type: 'aura', title: match.title, tagline: match.tag, scores: normalized };
    }

    // Default Fallbacks
    return { type: 'generic', title: 'Analyse abgeschlossen', tagline: 'Du hast neue Einsichten gewonnen.', scores: rawScores };
  }, [step, answers, questions, quizId]);

  const progress = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-xl bg-[var(--card-bg)] rounded-[3rem] shadow-2xl overflow-hidden relative border border-[var(--stroke)] animate-reveal">
        <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-black/5 rounded-full transition-colors z-20">
          <X size={24} className="text-[var(--navy)]" />
        </button>

        <div className="p-12 md:p-16 h-[85vh] overflow-y-auto custom-scrollbar flex flex-col">
          {step === 'intro' && (
            <div className="flex flex-col items-center text-center justify-center h-full space-y-10">
              <div className="w-40 h-40 rounded-full bg-[var(--holo-gold)]/20 flex items-center justify-center border border-[var(--holo-gold)] shadow-2xl relative">
                 <Sparkles className="text-[var(--holo-gold)] animate-pulse" size={64} />
                 <div className="absolute inset-0 bg-[var(--card-bg)]/20 blur-xl rounded-full" />
              </div>
              <div className="space-y-6">
                <h2 className="serif text-6xl text-[var(--navy)] leading-tight">{quiz.meta.title}</h2>
                <p className="text-[var(--muted)] text-xl leading-relaxed max-w-sm mx-auto serif italic">{quiz.meta.subtitle}</p>
              </div>
              <div className="flex gap-12 text-[11px] mono uppercase tracking-[0.4em] font-bold text-[var(--muted)] border-y border-[var(--stroke)] py-4">
                <span>🎯 {quiz.meta.questions_count || quiz.meta.question_count} Fragen</span>
                <span>⏱️ {quiz.meta.estimated_duration}</span>
              </div>
              <button 
                onClick={handleStart}
                className="px-16 py-6 bg-[var(--navy)] text-[var(--bg-paper)] rounded-[2rem] text-sm font-bold uppercase tracking-[0.4em] hover:bg-[var(--holo-violet)] hover:text-[var(--navy)] transition-all shadow-2xl transform hover:scale-105 active:scale-95"
              >
                Calibration starten
              </button>
            </div>
          )}

          {step === 'questions' && (
            <div className="flex flex-col h-full">
              <div className="mb-14 space-y-4">
                <div className="flex justify-between text-[11px] mono uppercase font-extrabold text-[var(--muted)] tracking-[0.3em]">
                  <span>Processing: Input_{currentIdx + 1}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1 w-full bg-[var(--stroke)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--holo-cyan)] to-[var(--holo-violet)] transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="flex-grow space-y-12">
                <div className="bg-[var(--card-bg)]/60 backdrop-blur-sm p-10 rounded-[2.5rem] border border-[var(--stroke)] shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                     <Sparkles size={120} className="text-[var(--navy)]" />
                   </div>
                   <div className="text-[10px] mono uppercase text-[var(--holo-gold)] mb-6 tracking-[0.5em] font-extrabold opacity-70">
                     {questions[currentIdx].context || questions[currentIdx].scenario || 'Situation_Buffer'}
                   </div>
                   <h3 className="serif text-4xl text-[var(--navy)] leading-snug font-light">{questions[currentIdx].text}</h3>
                </div>

                <div className="space-y-5">
                  {questions[currentIdx].options.map((opt: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left p-8 rounded-[1.8rem] border transition-all duration-500 relative group overflow-hidden ${
                        answers[currentIdx] === i 
                          ? 'bg-[var(--navy)] border-[var(--navy)] text-[var(--bg-paper)] shadow-2xl scale-[1.02]' 
                          : 'bg-[var(--card-bg)] border-[var(--stroke)] text-[var(--navy)] hover:border-[var(--holo-gold)] hover:shadow-lg'
                      }`}
                    >
                      <div className="relative z-10 flex items-center gap-6">
                        <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] mono font-bold ${answers[currentIdx] === i ? 'bg-[var(--bg-paper)]/10 border-[var(--bg-paper)]/20' : 'bg-[var(--bg-paper)] border-[var(--stroke)] text-[var(--muted)]'}`}>
                          0{i + 1}
                        </div>
                        <p className="text-[15px] font-medium leading-relaxed flex-1">{opt.text}</p>
                      </div>
                      {answers[currentIdx] === i && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg-paper)]/5 to-transparent -translate-x-full animate-[scan-shine_2s_infinite]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-16 flex gap-6">
                <button 
                  onClick={handleBack}
                  disabled={currentIdx === 0}
                  className="flex-1 py-5 border border-[var(--stroke)] rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.4em] disabled:opacity-20 hover:bg-[var(--bg-paper)] text-[var(--navy)] transition-all flex items-center justify-center gap-3"
                >
                  <ArrowLeft size={16} /> Zurück
                </button>
                <button 
                  onClick={handleNext}
                  disabled={answers[currentIdx] === undefined}
                  className="flex-1 py-5 bg-[var(--navy)] text-[var(--bg-paper)] rounded-2xl text-[10px] font-extrabold uppercase tracking-[0.4em] disabled:opacity-20 shadow-xl flex items-center justify-center gap-3 hover:bg-opacity-90"
                >
                  {currentIdx === questions.length - 1 ? 'Analyse_Finish' : 'Nächster_Schritt'} <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 'results' && resultData && (
            <div className="flex flex-col items-center space-y-14 animate-reveal">
              <div className="text-center space-y-6">
                <div className="inline-flex px-6 py-2 bg-[var(--navy)] text-[var(--holo-gold)] rounded-full text-[10px] mono uppercase tracking-[0.6em] font-extrabold shadow-xl">
                  Sync_Complete
                </div>
                <h2 className="serif text-7xl text-[var(--navy)] leading-none tracking-tighter">
                  {resultData.title}
                </h2>
                <p className="text-[var(--muted)] italic serif text-2xl max-w-sm mx-auto opacity-80">
                  "{resultData.tagline}"
                </p>
              </div>

              <div className="w-full space-y-10 bg-[var(--card-bg)] p-12 rounded-[4rem] border border-[var(--stroke)] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--holo-cyan)] via-[var(--holo-gold)] to-[var(--holo-violet)]" />
                
                <div className="space-y-8">
                  {Object.keys(resultData.scores).map((key) => (
                    <div key={key} className="space-y-3 group">
                      <div className="flex justify-between items-baseline px-1">
                        <span className="text-[11px] mono uppercase font-extrabold text-[var(--muted)] tracking-[0.4em] group-hover:text-[var(--navy)] transition-colors">
                          {key}
                        </span>
                        <span className="mono text-xs font-bold text-[var(--navy)]">
                          {typeof resultData.scores[key] === 'number' && resultData.scores[key] < 1 
                            ? Math.round(resultData.scores[key] * 100) + '%'
                            : resultData.scores[key]}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--bg-paper)] rounded-full overflow-hidden border border-[var(--stroke)]">
                         <div 
                           className="h-full bg-[var(--navy)] transition-all duration-1000 ease-out" 
                           style={{ width: `${typeof resultData.scores[key] === 'number' && resultData.scores[key] <= 5 
                             ? (resultData.scores[key] / 5) * 100 
                             : (resultData.scores[key] * 100)}%` }} 
                         />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 w-full pt-10 border-t border-[var(--stroke)]">
                <button className="w-full py-6 bg-[var(--navy)] text-[var(--bg-paper)] rounded-[2rem] text-xs font-extrabold uppercase tracking-[0.5em] flex items-center justify-center gap-4 shadow-2xl hover:bg-[var(--holo-violet)] hover:text-[var(--navy)] transition-all">
                  <Share2 size={18} /> Signatur teilen
                </button>
                <button 
                  onClick={() => {
                    setStep('intro');
                    setCurrentIdx(0);
                    setAnswers([]);
                  }}
                  className="w-full py-6 border border-[var(--stroke)] text-[var(--navy)] rounded-[2rem] text-xs font-extrabold uppercase tracking-[0.5em] flex items-center justify-center gap-4 hover:bg-[var(--bg-paper)] transition-all"
                >
                  <RefreshCcw size={18} /> Matrix Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;
