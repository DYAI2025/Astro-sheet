
export interface Stat {
  label: string;
  value: number; // 0-100
  suffix?: string;
}

export interface UserProfile {
  name: string;
  level: number;
  status: string;
}

export interface Badge {
  label: string;
  type: 'western' | 'bazi';
  subType?: 'sun' | 'moon' | 'rising';
  signKey?: string;
  icon?: string;
}

export interface MasterIdentity {
  tierkreis: string;
  monatstier: string;
  tagestier: string;
  stundenMeister: string;
  element: string;
  konstellation: {
    sun: string;
    moon: string;
    rising: string;
  };
  bedeutung: string;
}

/**
 * Interface representing a specific pillar in BaZi astrology (Year, Month, or Day).
 */
export interface BaZiPillarData {
  label: string;
  value: string;
  hiddenStems: string;
  aspect: string;
  description: string;
}

export interface QuizItem {
  id: string;
  title: string;
  status: 'completed' | 'in_progress';
  progress?: number;
  recommendation?: string;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  statLabel?: string;
  statValue?: string;
  premium?: boolean;
}

export interface QuizDefinition {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image?: string;
  icon?: string;
  config: any; // The full JSON config provided
}
