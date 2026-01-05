
import React, { useState } from 'react';
import { Sparkles, Sun, Heart, Star, Wand2, Flower2, Gem, Eye, MessageSquare, Zap, ArrowRight } from 'lucide-react';
import QuizPlayer from './QuizPlayer';

const CHARME_QUIZ_CONFIG = {
  meta: {
    id: "charme-signatur-quiz",
    title: "Die Kunst des Charmes",
    subtitle: "Entdecke deine einzigartige Signatur der Anziehung",
    estimated_duration: "3min",
    questions_count: 12
  },
  questions: [
    { id: "q1", context: "Der erste Eindruck", text: "Du betrittst einen Raum voller Fremder. Wie orientierst du dich?", options: [
      { text: "Ich scanne nach bekannten Gesichtern – und warte diskret.", scores: { warmth: 2, resonance: 4, authenticity: 4, presence: 4 } },
      { text: "Ich suche die unsicherste Person und gehe auf sie zu.", scores: { warmth: 5, resonance: 4, authenticity: 5, presence: 5 } },
      { text: "Ich positioniere mich gut sichtbar und starte ein Gespräch.", scores: { warmth: 3, resonance: 2, authenticity: 2, presence: 1 } },
      { text: "Ich beobachte die Dynamik – wo ist Energie, wo Spannung?", scores: { warmth: 3, resonance: 5, authenticity: 4, presence: 3 } }
    ]},
    { id: "q2", context: "Das Geheimnis des Lächelns", text: "Jemand erzählt einen Witz, der nicht lustig ist. Was tust du?", options: [
      { text: "Ich lache höflich mit – niemand soll sich unwohl fühlen.", scores: { warmth: 4, resonance: 3, authenticity: 2, presence: 4 } },
      { text: "Ich schmunzle, aber meine Augen verraten meine Ehrlichkeit.", scores: { warmth: 3, resonance: 4, authenticity: 5, presence: 3 } },
      { text: "Ich sage warm: 'Das war charmant versucht.'", scores: { warmth: 5, resonance: 3, authenticity: 4, presence: 4 } },
      { text: "Ich strahle Wärme aus und lenke geschickt auf ein neues Thema um.", scores: { warmth: 5, resonance: 2, authenticity: 3, presence: 2 } }
    ]},
    { id: "q3", context: "Die Kunst des Zuhörens", text: "Jemand erzählt von einem Problem. Wie hörst du zu?", options: [
      { text: "Ich stelle gezielte Fragen und biete Lösungen an.", scores: { warmth: 3, resonance: 1, authenticity: 3, presence: 2 } },
      { text: "Ich lehne mich vor und lasse die Stille wirken.", scores: { warmth: 5, resonance: 5, authenticity: 5, presence: 5 } },
      { text: "Ich teile eigene Erfahrungen zur Verbindung.", scores: { warmth: 4, resonance: 2, authenticity: 4, presence: 2 } },
      { text: "Ich nicke und zeige durch Präsenz mein Mitgefühl.", scores: { warmth: 4, resonance: 4, authenticity: 3, presence: 4 } }
    ]},
    { id: "q4", context: "Spannung im Raum", text: "Ein Streit entwickelt sich in deiner Gegenwart. Was tust du?", options: [
      { text: "Ich bringe Humor ein, um die Spannung zu brechen.", scores: { warmth: 4, resonance: 2, authenticity: 3, presence: 1 } },
      { text: "Ich gebe der ruhigeren Person Raum für ihre Perspektive.", scores: { warmth: 5, resonance: 4, authenticity: 4, presence: 5 } },
      { text: "Ich strahle eine ansteckende Ruhe aus.", scores: { warmth: 4, resonance: 5, authenticity: 4, presence: 5 } },
      { text: "Ich strukturiere das Gespräch diplomatisch.", scores: { warmth: 3, resonance: 1, authenticity: 3, presence: 3 } }
    ]},
    { id: "q5", context: "Der verletzliche Moment", text: "Du hast einen Fehler gemacht. Wie gehst du damit um?", options: [
      { text: "Ich lache offen über mich selbst.", scores: { warmth: 4, resonance: 3, authenticity: 5, presence: 2 } },
      { text: "Ich entschuldige mich aufrichtig und biete Hilfe an.", scores: { warmth: 5, resonance: 3, authenticity: 5, presence: 4 } },
      { text: "Ich erkläre den Kontext für besseres Verständnis.", scores: { warmth: 2, resonance: 1, authenticity: 3, presence: 2 } },
      { text: "Ich zeige kurz Betroffenheit und suche die Lösung.", scores: { warmth: 3, resonance: 2, authenticity: 2, presence: 2 } }
    ]},
    { id: "q6", context: "Das Kompliment", text: "Du willst jemanden ehrlich loben. Wie?", options: [
      { text: "Direkt und spezifisch: 'Das war brillant, weil...'", scores: { warmth: 4, resonance: 1, authenticity: 4, presence: 2 } },
      { text: "Mit warmem Blick und einer Hand auf der Schulter.", scores: { warmth: 5, resonance: 5, authenticity: 4, presence: 4 } },
      { text: "Nebenbei, fast beiläufig, um Verlegenheit zu vermeiden.", scores: { warmth: 3, resonance: 4, authenticity: 5, presence: 4 } },
      { text: "Spielerisch als Insider-Witz verpackt.", scores: { warmth: 4, resonance: 2, authenticity: 3, presence: 1 } }
    ]},
    { id: "q7", context: "Der Fremde", text: "Du sitzt neben einem Unbekannten. Was passiert?", options: [
      { text: "Ich warte auf einen natürlichen Moment der Resonanz.", scores: { warmth: 4, resonance: 5, authenticity: 5, presence: 4 } },
      { text: "Ich starte mit einer neugierigen, offenen Frage.", scores: { warmth: 5, resonance: 2, authenticity: 4, presence: 2 } },
      { text: "Ich bleibe still, sende aber offene Signale.", scores: { warmth: 3, resonance: 5, authenticity: 4, presence: 5 } },
      { text: "Ich kommentiere das Umfeld als Eisbrecher.", scores: { warmth: 4, resonance: 2, authenticity: 3, presence: 2 } }
    ]},
    { id: "q8", context: "Der schwere Tag", text: "Ein Freund hat schlechte Energie. Deine Reaktion?", options: [
      { text: "Direkt fragen: 'Was ist los?'", scores: { warmth: 4, resonance: 2, authenticity: 4, presence: 2 } },
      { text: "Einfach schweigend daneben sitzen.", scores: { warmth: 5, resonance: 5, authenticity: 5, presence: 5 } },
      { text: "Kaffee bringen und sagen: 'Du musst nicht reden.'", scores: { warmth: 5, resonance: 4, authenticity: 4, presence: 5 } },
      { text: "Versuchen, ihn spielerisch abzulenken.", scores: { warmth: 4, resonance: 2, authenticity: 3, presence: 1 } }
    ]},
    { id: "q9", context: "Im Rampenlicht", text: "Alle Augen auf dir. Dein Instinkt?", options: [
      { text: "Kurz genießen, dann den Fokus auf andere lenken.", scores: { warmth: 5, resonance: 3, authenticity: 4, presence: 3 } },
      { text: "Den Moment für etwas Bedeutungsvolles nutzen.", scores: { warmth: 3, resonance: 1, authenticity: 4, presence: 2 } },
      { text: "Spannung durch Überraschung brechen.", scores: { warmth: 4, resonance: 2, authenticity: 3, presence: 1 } },
      { text: "Still halten, lächeln und Ruhe sprechen lassen.", scores: { warmth: 3, resonance: 5, authenticity: 4, presence: 5 } }
    ]},
    { id: "q10", context: "Verbindung", text: "Jemand in der Gruppe wirkt unwohl. Was tust du?", options: [
      { text: "Diskret hingehen und leise nachfragen.", scores: { warmth: 5, resonance: 4, authenticity: 5, presence: 5 } },
      { text: "Geschickt ins Gespräch einbeziehen.", scores: { warmth: 5, resonance: 3, authenticity: 3, presence: 3 } },
      { text: "Präsenz in der Nähe als Sicherheitssignal geben.", scores: { warmth: 4, resonance: 5, authenticity: 4, presence: 5 } },
      { text: "Später unter vier Augen ansprechen.", scores: { warmth: 4, resonance: 3, authenticity: 4, presence: 4 } }
    ]},
    { id: "q11", context: "Worte & Stille", text: "Es wird emotional. Wie reagierst du?", options: [
      { text: "Verletzliche Geschichte teilen zur Gleichheit.", scores: { warmth: 4, resonance: 3, authenticity: 5, presence: 2 } },
      { text: "Den Raum schweigend in Präsenz halten.", scores: { warmth: 4, resonance: 5, authenticity: 4, presence: 5 } },
      { text: "In Worte fassen: 'Das berührt mich sehr.'", scores: { warmth: 5, resonance: 2, authenticity: 5, presence: 3 } },
      { text: "Behutsam weiterfragen, um Tiefe zu geben.", scores: { warmth: 5, resonance: 3, authenticity: 4, presence: 4 } }
    ]},
    { id: "q12", context: "Abschied", text: "Was sollen die Menschen nachher über dich denken?", options: [
      { text: "'Es war nie langweilig – sie hat Energie gebracht.'", scores: { warmth: 3, resonance: 2, authenticity: 3, presence: 1 } },
      { text: "'In ihrer Nähe habe ich mich wohler gefühlt.'", scores: { warmth: 5, resonance: 5, authenticity: 4, presence: 5 } },
      { text: "'Sie hat mich wirklich gesehen und verstanden.'", scores: { warmth: 5, resonance: 4, authenticity: 5, presence: 4 } },
      { text: "'Sie ist klug und charmant – mehr Zeit bitte.'", scores: { warmth: 4, resonance: 2, authenticity: 3, presence: 2 } }
    ]}
  ]
};

const AURA_QUIZ_CONFIG = {
  meta: {
    id: "aura-farben-quiz",
    title: "Deine Aurafarben",
    subtitle: "Entdecke das unsichtbare Licht deiner Seele",
    estimated_duration: "3min",
    question_count: 12
  },
  questions: [
    { id: "q1", context: "ENERGIEFLUSS", text: "Du wachst früh morgens auf. Was passiert?", options: [
      { text: "Gedanken kommen lassen, der Tag kann warten.", scores: { energiefluss: 1 } },
      { text: "Handy checken aus purer Neugier.", scores: { energiefluss: 4 } },
      { text: "Sofort aufstehen und loslegen.", scores: { energiefluss: 5 } },
      { text: "Erstmal spüren: Wie fühlt sich heute an?", scores: { energiefluss: 2 } }
    ]},
    { id: "q2", context: "ENERGIEFLUSS", text: "Ein Tag allein. Ohne Plan. Was tust du?", options: [
      { text: "Stille genießen, Lesen, Sein.", scores: { energiefluss: 1 } },
      { text: "Ins Café gehen, Menschen beobachten.", scores: { energiefluss: 3 } },
      { text: "Jemanden anrufen, Energie teilen.", scores: { energiefluss: 5 } },
      { text: "Ein aufgeschobenes Projekt angehen.", scores: { energiefluss: 2 } }
    ]},
    { id: "q3", context: "ENERGIEFLUSS", text: "Erschöpft nach einem langen Tag. Wie aufladen?", options: [
      { text: "Absolute Ruhe, Welt aus.", scores: { energiefluss: 1 } },
      { text: "Ruhiger Spaziergang ohne Ziel.", scores: { energiefluss: 2 } },
      { text: "Alles einem Vertrauten erzählen.", scores: { energiefluss: 4 } },
      { text: "Unter Freunde gehen zum Aufladen.", scores: { energiefluss: 5 } }
    ]},
    { id: "q4", context: "RHYTHMUS", text: "Ein Projekt läuft anders als geplant. Deine Reaktion?", options: [
      { text: "Anpassen. Pläne sind nur Richtungen.", scores: { rhythmus: 5 } },
      { text: "Innehalten, Strategie kurz überdenken.", scores: { rhythmus: 3 } },
      { text: "Zurück zum Plan, Struktur gibt Sicherheit.", scores: { rhythmus: 1 } },
      { text: "Chance sehen für neue Umwege.", scores: { rhythmus: 4 } }
    ]},
    { id: "q5", context: "RHYTHMUS", text: "Raum voller Fremder. Dein Instinkt?", options: [
      { text: "Erstmal beobachten, Dynamik scannen.", scores: { rhythmus: 1 } },
      { text: "Vertraute Aufgabe oder Ecke suchen.", scores: { rhythmus: 2 } },
      { text: "Auf die erste offene Person zugehen.", scores: { rhythmus: 4 } },
      { text: "Treiben lassen, kein Druck.", scores: { rhythmus: 5 } }
    ]},
    { id: "q6", context: "RHYTHMUS", text: "Dein idealer Lebensweg als Metapher?", options: [
      { text: "Ein tiefes, geschütztes Tal.", scores: { rhythmus: 1 } },
      { text: "Ein stetig fließender Fluss.", scores: { rhythmus: 3 } },
      { text: "Ein Vogel, der von Ast zu Ast springt.", scores: { rhythmus: 5 } },
      { text: "Ein Baum mit tiefen Wurzeln.", scores: { rhythmus: 2 } }
    ]},
    { id: "q7", context: "WAHRNEHMUNG", text: "Eine wichtige Entscheidung steht an. Wie?", options: [
      { text: "Fakten sammeln, Pro-Contra-Liste.", scores: { wahrnehmung: 1 } },
      { text: "In den Bauch spüren. Die Antwort ist da.", scores: { wahrnehmung: 5 } },
      { text: "Mit respektierten Menschen sprechen.", scores: { wahrnehmung: 3 } },
      { text: "Nacht drüber schlafen und loslassen.", scores: { wahrnehmung: 4 } }
    ]},
    { id: "q8", context: "WAHRNEHMUNG", text: "Erste Begegnung. Was nimmst du wahr?", options: [
      { text: "Körpersprache und Energie.", scores: { wahrnehmung: 5 } },
      { text: "Wortwahl und Tonfall.", scores: { wahrnehmung: 2 } },
      { text: "Interaktion mit der Umgebung.", scores: { wahrnehmung: 1 } },
      { text: "Das reine Gefühl der Passung.", scores: { wahrnehmung: 4 } }
    ]},
    { id: "q9", context: "WAHRNEHMUNG", text: "Deine erfolgreichsten Momente kamen durch...", options: [
      { text: "Sorgfältige Vorbereitung und Plan.", scores: { wahrnehmung: 1 } },
      { text: "Plötzliche Gewissheit im Tun.", scores: { wahrnehmung: 5 } },
      { text: "Auf andere hören zum richtigen Zeitpunkt.", scores: { wahrnehmung: 3 } },
      { text: "Vorbereitung trifft auf Instinkt.", scores: { wahrnehmung: 4 } }
    ]},
    { id: "q10", context: "RESONANZ", text: "Ein Freund hat Kummer. Wie reagierst du?", options: [
      { text: "Zuhören und Raum schweigend halten.", scores: { resonanz: 1 } },
      { text: "Den Schmerz fast körperlich mitfühlen.", scores: { resonanz: 2 } },
      { text: "Lösungen und Perspektiven anbieten.", scores: { resonanz: 4 } },
      { text: "Eigene Erfahrungen zur Stütze teilen.", scores: { resonanz: 5 } }
    ]},
    { id: "q11", context: "RESONANZ", text: "Du betrittst eine angespannte Atmosphäre.", options: [
      { text: "Sofort spüren: 'Hier war was.'", scores: { resonanz: 1 } },
      { text: "Erst bemerken, wenn jemand spricht.", scores: { resonanz: 4 } },
      { text: "Wahrnehmen, aber bei mir bleiben.", scores: { resonanz: 5 } },
      { text: "Die Schwere mitnehmen und aufsaugen.", scores: { resonanz: 2 } }
    ]},
    { id: "q12", context: "RESONANZ", text: "Deine natürliche Position in einer Gruppe?", options: [
      { text: "Der Ruhepol, an dem man sich hält.", scores: { resonanz: 1 } },
      { text: "Anpassungsfähig, füllt die Lücke.", scores: { resonanz: 2 } },
      { text: "Der Motor, der Ideen vorantreibt.", scores: { resonanz: 5 } },
      { text: "Der Verbinder, der Brücken baut.", scores: { resonanz: 4 } }
    ]}
  ]
};

const QuizzesPage: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<any>(null);

  const clusters = [
    {
      title: "Naturkind",
      watermark: "NATUR",
      progress: 0,
      quizzes: [
        { id: 'aura', title: 'Deine Aura-Farbe', desc: 'Welche Farbe umgibt deine Seele?', icon: Sun, config: AURA_QUIZ_CONFIG },
        { id: 'animal', title: 'Dein Krafttier', desc: 'Welcher uralte Wächter schlummert in dir?', icon: Wand2 },
        { id: 'flower', title: 'Dein inneres Blumenwesen', desc: 'Wie blühst du in dieser Welt auf?', icon: Flower2 },
        { id: 'crystal', title: 'Dein Energiestein', desc: 'Welcher Kristall resoniert mit deiner Seele?', icon: Gem },
      ]
    },
    {
      title: "Mentalist",
      watermark: "SEELE",
      progress: 0,
      quizzes: [
        { id: 'love', title: 'Die 5 Sprachen der Liebe', desc: 'Welche Sprache spricht dein Herz?', icon: Heart },
        { id: 'charm', title: 'Die Kunst des Charmes', desc: 'Wie verzauberst du die Menschen um dich?', icon: Star, config: CHARME_QUIZ_CONFIG },
        { id: 'eq', title: 'Deine Emotionale Signatur', desc: 'Wie transformierst du Gefühle in Kraft?', icon: Eye },
      ]
    }
  ];

  return (
    <div className="min-h-screen py-32 px-12 bg-[#FEFDF9] relative overflow-hidden transition-all duration-700">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] select-none overflow-hidden flex flex-col items-center justify-center gap-20">
        {clusters.map((c, i) => (
          <div key={i} className="cluster-title text-center whitespace-nowrap">{c.watermark}</div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto space-y-40 relative z-10">
        <div className="text-center space-y-8">
           <div className="flex items-center justify-center gap-6 mb-6">
             <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[var(--holo-gold)]" />
             <div className="w-2.5 h-2.5 rounded-full bg-[var(--holo-gold)] shadow-[0_0_15px_var(--holo-gold)]" />
             <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[var(--holo-gold)]" />
           </div>
           <h1 className="serif text-8xl text-[var(--navy)] font-light tracking-tighter leading-none">Entdecke Dich Selbst</h1>
           <p className="text-[var(--muted)] text-2xl italic serif max-w-2xl mx-auto opacity-80 leading-relaxed">
             Mysterium und Klarheit vereint. Finde deine wahre Natur durch tiefenpsychologische Kalibrierung.
           </p>
        </div>

        {clusters.map((cluster) => (
          <div key={cluster.title} className="space-y-20">
            <div className="text-center relative">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cluster-title opacity-[0.04] pointer-events-none uppercase">
                 {cluster.watermark}
               </div>
               <div className="relative z-10 space-y-6">
                 <div className="text-[11px] mono uppercase tracking-[0.8em] text-[var(--muted)] font-extrabold opacity-60">Cluster_Definition</div>
                 <h2 className="serif text-6xl text-[var(--navy)] tracking-tight">{cluster.title}</h2>
                 <div className="flex flex-col items-center gap-3 mt-8">
                    <div className="text-[10px] mono uppercase text-[var(--muted)] font-bold tracking-[0.3em]">System_Progress: {cluster.progress}%</div>
                    <div className="w-60 h-0.5 bg-[var(--stroke)] rounded-full overflow-hidden shadow-inner">
                       <div className="h-full bg-gradient-to-r from-[var(--holo-cyan)] to-[var(--holo-gold)]" style={{ width: `${cluster.progress}%` }} />
                    </div>
                 </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {cluster.quizzes.map((quiz) => (
                <div 
                  key={quiz.id}
                  onClick={() => quiz.config && setActiveQuiz(quiz.config)}
                  className={`bg-white/80 backdrop-blur-sm border border-[var(--stroke)] rounded-[2.5rem] p-10 flex flex-col items-center text-center group transition-all duration-700 relative overflow-hidden ${quiz.config ? 'cursor-pointer hover:border-[var(--holo-gold)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2' : 'opacity-60'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative mb-12">
                    <div className="w-28 h-28 rounded-[2.2rem] bg-[var(--bg-paper)] flex items-center justify-center border border-[var(--stroke)] relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 shadow-sm group-hover:shadow-xl">
                       <quiz.icon size={48} className={`text-[var(--muted)] transition-colors duration-700 ${quiz.config ? 'group-hover:text-[var(--holo-gold)]' : ''}`} />
                    </div>
                    <div className="absolute inset-0 bg-[var(--holo-gold)]/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  <div className="space-y-5 mb-12 flex-grow relative z-10">
                    <h3 className="text-base font-bold text-[var(--navy)] tracking-tight uppercase">{quiz.title}</h3>
                    <p className="text-[12px] text-[var(--muted)] leading-relaxed serif italic opacity-80">{quiz.desc}</p>
                  </div>

                  <div className="w-full pt-8 border-t border-[var(--stroke)] relative z-10">
                    <span className={`text-[10px] mono uppercase font-extrabold tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 ${quiz.config ? 'text-[var(--navy)] group-hover:text-[var(--holo-gold)]' : 'text-gray-300'}`}>
                      {quiz.config ? (
                        <>
                          Analyse starten <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      ) : 'Status: Locked'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-40">
           <div className="bg-white/80 backdrop-blur-xl border border-[var(--stroke)] rounded-[4rem] p-20 flex flex-col lg:flex-row items-center gap-20 group hover:shadow-2xl transition-all duration-1000 relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--holo-cyan),transparent_70%)] opacity-0 group-hover:opacity-5 transition-opacity" />
             
             <div className="w-56 h-56 rounded-full border border-[var(--stroke)] bg-[var(--bg-paper)] flex items-center justify-center p-10 relative">
                <div className="absolute inset-0 bg-[var(--holo-gold)]/5 blur-[50px] animate-pulse" />
                <div className="w-full h-full rounded-full border-[1px] border-[var(--holo-gold)]/40 border-dashed animate-[rotate_180s_linear_infinite] flex items-center justify-center">
                   <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[var(--holo-cyan)]/20 to-[var(--holo-gold)]/20 shadow-inner" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <Star size={32} className="text-[var(--holo-gold)]" />
                </div>
             </div>
             
             <div className="flex-grow space-y-8 text-center lg:text-left relative z-10">
                <h2 className="serif text-6xl text-[var(--navy)] tracking-tighter leading-none">Dein Schicksal im Kosmos</h2>
                <p className="text-xl text-[var(--muted)] max-w-xl italic serif leading-relaxed opacity-80">
                  Tritt in unsere Astrologie-Sphäre ein und entdecke die kosmischen Muster deiner Existenz. Synchronisiere deine Seele mit den Sternen.
                </p>
                <button className="text-[11px] mono uppercase font-extrabold text-[var(--navy)] hover:text-[var(--holo-gold)] transition-all flex items-center gap-4 py-4 px-10 border border-[var(--stroke)] rounded-full hover:bg-[var(--bg-paper)]">
                  Zu den Sternen fliegen <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
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
