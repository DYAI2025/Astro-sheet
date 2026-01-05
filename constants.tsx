
import { Stat, Badge, QuizItem, Agent, MasterIdentity } from './types';

export const COLORS = {
  bg: '#000000',
  teal: '#6CA192',
  purple: '#8B5A8B',
  darkBlue: '#0F3045',
  darkGold: '#A77D38',
  gold: '#D2A95A',
  offWhite: '#F7F0E6',
  darkTeal: '#2D5A4C',
  deepCyan: '#053B3F',
  deepPurple: '#4A0E4E',
};

export const TRANSLATIONS = {
  de: {
    nav: {
      dashboard: 'Dashboard',
      profile: 'Profil',
      quizzes: 'Quizzes',
      agents: 'Agenten',
      premium: 'Premium',
      settings: 'Einstellungen',
      nightMode: 'Nachtmodus',
      dayMode: 'Tagmodus',
      transparency: 'Transparenz',
      transparencyNote: 'Dieses Dashboard dient ausschließlich der Reflexion und Unterhaltung.',
    },
    topbar: {
      title: 'Fusion Core-Matrix',
      analytics: 'KI-Analytik',
      search: 'Matrix durchsuchen...',
      upgrade: 'UPGRADE',
    },
    identity: {
      protocol: 'Master Identity Protocol',
      matrixTitle: 'Synthese_Matrix',
      matrixSub: 'Integrierte Astro-Sync-Engine',
      astroAlignment: 'ASTRO_ALIGNMENT',
      baziProtocols: 'Quantum_BaZi_Protocols',
      compatibility: 'Cross-System Kompatibilität',
      recalibrate: 'EINSIKT REKALIBRIEREN',
      confidence: 'Konfidenz',
      westernDynamics: 'Westliche Kern-Dynamik',
      baziResonance: 'BaZi Matrix Resonanz',
      verdict: 'Synthetisches Endurteil',
    },
    oracle: {
      watermark: 'ORAKEL',
      transit: 'Täglicher_Transit',
      title: 'Heutige Resonanz',
      energy: 'Energie',
      intuition: 'Intuition',
      feelings: 'Gefühle',
    },
    stats: {
      watermark: 'STATS',
      status: 'System-Status',
      title: 'Entfaltungs-Matrix',
      biometricTitle: 'Biometrische Matrix',
      biometricNote: 'Deine aktuelle Resonanz wird über 5 Kernparameter abgebildet.',
    },
    inventory: {
      watermark: 'INVENTAR',
      title: 'Mission & Belohnung',
      perksTitle: 'Kacheln & Perks',
      storage: 'Speicher: 2/24 Slots',
      unlock: 'Freischalten',
      nextSteps: 'Nächste Schritte',
      focus: 'Fokus: Entwicklung',
      tip: 'Analysten-Tipp:',
      continue: 'Quiz fortsetzen',
      newQuizzes: 'Neue Quizzes in',
    },
    agents: {
      title: 'KI Agenten',
      status: 'Status: Aktiv_Zuhören',
      link: 'Neural_Link: Stabil',
      chat: 'Chat öffnen',
      voiceInit: 'Voice Session Initialisierung',
      connecting: 'Verbindung wird hergestellt...',
      disconnect: 'Verbindung trennen',
    },
    input: {
      watermark: 'INPUT',
      calibration: 'Kalibrierung',
      title: 'Matrix Rekonfiguration',
      configTitle: 'Horoskop-Konfiguration',
      name: 'Profilname',
      location: 'Geburtsort',
      year: 'Geburtsjahr',
      date: 'Tag & Monat',
      time: 'Geburtszeit',
      unknown: 'Unbekannt',
      calculate: 'Horoskop berechnen',
    }
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      profile: 'Profile',
      quizzes: 'Quizzes',
      agents: 'Agents',
      premium: 'Premium',
      settings: 'Settings',
      nightMode: 'Night Mode',
      dayMode: 'Day Mode',
      transparency: 'Transparency',
      transparencyNote: 'This dashboard is strictly for reflection and entertainment purposes.',
    },
    topbar: {
      title: 'Fusion Core-Matrix',
      analytics: 'AI Analytics',
      search: 'Search Matrix...',
      upgrade: 'UPGRADE',
    },
    identity: {
      protocol: 'Master Identity Protocol',
      matrixTitle: 'Synthesis_Matrix',
      matrixSub: 'Integrated Astro-Sync Engine',
      astroAlignment: 'ASTRO_ALIGNMENT',
      baziProtocols: 'Quantum_BaZi_Protocols',
      compatibility: 'Cross-System Compatibility',
      recalibrate: 'RECALIBRATE INSIGHT',
      confidence: 'Confidence',
      westernDynamics: 'Western Core Dynamics',
      baziResonance: 'BaZi Matrix Resonance',
      verdict: 'Synthetic Final Verdict',
    },
    oracle: {
      watermark: 'ORACLE',
      transit: 'Daily_Transit',
      title: 'Today\'s Resonance',
      energy: 'Energy',
      intuition: 'Intuition',
      feelings: 'Feelings',
    },
    stats: {
      watermark: 'STATS',
      status: 'System Status',
      title: 'Unfolding Matrix',
      biometricTitle: 'Biometric Matrix',
      biometricNote: 'Your current resonance is mapped across 5 core parameters.',
    },
    inventory: {
      watermark: 'INVENTORY',
      title: 'Mission & Rewards',
      perksTitle: 'Tiles & Perks',
      storage: 'Storage: 2/24 Slots',
      unlock: 'Unlock',
      nextSteps: 'Next Steps',
      focus: 'Focus: Development',
      tip: 'Analyst Tip:',
      continue: 'Continue Quiz',
      newQuizzes: 'New Quizzes in',
    },
    agents: {
      title: 'AI Agents',
      status: 'Status: Active_Listen',
      link: 'Neural_Link: Stable',
      chat: 'Open Chat',
      voiceInit: 'Voice Session Initialization',
      connecting: 'Establishing connection...',
      disconnect: 'Disconnect',
    },
    input: {
      watermark: 'INPUT',
      calibration: 'Calibration',
      title: 'Matrix Reconfiguration',
      configTitle: 'Horoscope Configuration',
      name: 'Profile Name',
      location: 'Birth Place',
      year: 'Birth Year',
      date: 'Day & Month',
      time: 'Birth Time',
      unknown: 'Unknown',
      calculate: 'Calculate Horoscope',
    }
  }
};

export const CORE_STATS: Stat[] = [
  { label: 'Energie-Aufladung', value: 84 },
  { label: 'Bindung', value: 52 },
  { label: 'Kommunikation', value: 91 },
  { label: 'Struktur', value: 70 },
  { label: 'Analyse ↔ Intuition', value: 48 },
];

export const IDENTITY_DATA: MasterIdentity = {
  tierkreis: "Metall Pferd",
  monatstier: "Ziege (Wei)",
  tagestier: "Holz-Hahn (Yi You)",
  stundenMeister: "Metall (Jahr), Yin-Wasser (Tag-Meister)",
  element: "Metall / Wasser Hybrid",
  konstellation: {
    sun: "Fische",
    moon: "Skorpion",
    rising: "Waage"
  },
  bedeutung: "Spannungsfeld zwischen hoher Sensibilität (Wasser) und rationaler Struktur (Metall); diplomatische Fassade (Waage) als Schutzschild; Bedürfnis nach Autonomie (Pferd/Wassermann)."
};

export const IDENTITY_BADGES: Badge[] = [
  { label: 'Sonne: Steinbock', type: 'western', subType: 'sun', signKey: 'capricorn' },
  { label: 'Mond: Stier', type: 'western', subType: 'moon', signKey: 'taurus' },
  { label: 'AC: Skorpion', type: 'western', subType: 'rising', signKey: 'scorpio' },
  { label: 'Holz-Tiger', type: 'bazi' },
  { label: 'Metall-Hahn', type: 'bazi' },
  { label: 'Wasser-Schwein', type: 'bazi' },
  { label: 'Erde-Ratte', type: 'bazi' },
];

export const QUIZZES: QuizItem[] = [
  { id: '1', title: 'Naturkind', status: 'completed' },
  { id: '2', title: 'Mentalist', status: 'in_progress', progress: 45, recommendation: 'Reflexions-Tiefe' },
];

export const AGENTS: Agent[] = [
  { 
    id: 'atlas', 
    name: 'Celestial Analyst', 
    type: 'DATA_INSIGHT_MODULE', 
    subtitle: 'Sternzeichen · Aszendent · Häuser · Aspekte',
    description: 'Mathematisch präzise Berechnung -> Symbolik in klare Muster übersetzt (Persönlichkeit, Beziehung, Berufung).',
    tags: ['präzise', 'systemisch', 'klar'],
    statLabel: 'Resonanz',
    statValue: '99.4%'
  },
  { 
    id: 'vika', 
    name: 'BaZi Strategist', 
    type: 'QUANTUM_BAZI_PROTOCOLS', 
    subtitle: 'Vier Säulen · Elemente · 10 Götter · Zyklen',
    description: 'Zeitbasierte Dynamik (Elemente & Zyklen) -> strukturiertes Profil deiner Ressourcen, Spannungen und Timing-Fenster.',
    tags: ['Zyklen', 'Elemente', 'Timing'],
    statLabel: 'Energie',
    statValue: '92%',
    premium: true 
  },
];

export interface ZodiacInfo {
  ruler: string;
  element: string;
  modality: string;
  keywords: string;
}

export const ZODIAC_DATA: Record<string, ZodiacInfo> = {
  capricorn: { ruler: 'Saturn', element: 'Erde', modality: 'Kardinal', keywords: 'Struktur • Ambition • Zeit' },
  taurus: { ruler: 'Venus', element: 'Erde', modality: 'Fix', keywords: 'Materie • Wert • Genuss' },
  scorpio: { ruler: 'Mars / Pluto', element: 'Wasser', modality: 'Fix', keywords: 'Tiefe • Macht • Geheimnis' },
  leo: { ruler: 'Sonne', element: 'Feuer', modality: 'Fix', keywords: 'Zentrum • Glanz • Herz' },
  sagittarius: { ruler: 'Jupiter', element: 'Feuer', modality: 'Veränderlich', keywords: 'Weite • Wahrheit • Ziel' },
  virgo: { ruler: 'Merkur', element: 'Erde', modality: 'Veränderlich', keywords: 'Detail • Ordnung • Geist' },
  gemini: { ruler: 'Merkur', element: 'Luft', modality: 'Veränderlich', keywords: 'Dualität • Brücke • Wort' },
  aquarius: { ruler: 'Saturn / Uranus', element: 'Luft', modality: 'Fix', keywords: 'Netzwerk • Morgen • Freiheit' },
  pisces: { ruler: 'Jupiter / Neptun', element: 'Wasser', modality: 'Veränderlich', keywords: 'Traum • Einheit • Stille' },
  cancer: { ruler: 'Mond', element: 'Wasser', modality: 'Kardinal', keywords: 'Wurzel • Gefühl • Schutz' },
  libra: { ruler: 'Venus', element: 'Luft', modality: 'Kardinal', keywords: 'Waage • Harmonie • Du' },
  aries: { ruler: 'Mars', element: 'Feuer', modality: 'Kardinal', keywords: 'Ich • Wille • Initial' },
};

export const ZODIAC_SHIELDS: Record<string, string> = {
  leo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=60',
  sagittarius: 'https://images.unsplash.com/photo-1506318137071-a8e063b4b477?w=400&auto=format&fit=crop&q=60',
  taurus: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=60',
  virgo: 'https://images.unsplash.com/photo-1464802686167-b939a67e06a1?w=400&auto=format&fit=crop&q=60',
  gemini: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&auto=format&fit=crop&q=60',
  aquarius: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop&q=60',
  scorpio: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400&auto=format&fit=crop&q=60',
  pisces: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=400&auto=format&fit=crop&q=60',
  cancer: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=400&auto=format&fit=crop&q=60',
  libra: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&auto=format&fit=crop&q=60',
  capricorn: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&auto=format&fit=crop&q=60',
  aries: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&auto=format&fit=crop&q=60',
};
