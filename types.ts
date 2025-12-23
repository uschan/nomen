export interface UserInput {
  name: string;
  occupation: string;
  background?: string; // e.g., Urban, Rural
  location: string;
  persona: 'sage' | 'psychologist' | 'mentor' | 'colloquial';
}

interface BaseAnalysisResult {
  id: string;
  timestamp: number;
  userInput: UserInput;
  prologue: string;   // Introductory Judgment
  summary: string;    // The poetic summary/conclusion
  advice: string;     // Actionable advice
  finalQuestion: string; // Ultimate Question
  visualPrompt: string; // Used to generate the image
  imageUrl?: string;  // The generated image Base64
  
  // VIRAL & PHILOSOPHICAL FEATURES
  goldValue?: number; // Name valuation
  dailyMantra?: string; // Daily advice
  
  // NEW: Spiral Philosophy Features
  timeline?: { year: string; title: string; choice: string }[]; // Decision Nodes
  energyTotem?: { kanji: string; meaning: string }; // The anchor for "Action"
}

// For Sage, Psychologist, Mentor (Original 4 Layers)
export interface StandardAnalysisResult extends BaseAnalysisResult {
  mode: 'standard';
  imagery: string;   // Layer 1
  energy: string;    // Layer 2
  psychology: string; // Layer 3
  sociology: string;  // Layer 4
}

// For Colloquial/Deep Analysis (Case Study Structure)
export interface DeepAnalysisResult extends BaseAnalysisResult {
  mode: 'deep';
  // Layer 1: Imagery Decomposition
  imageryDetail: {
    literal: string;      // 字面
    energy: string;       // 五行/能量
    metaphor: string;     // 玄学隐喻
  };
  // Layer 2: Personality Portrait
  personalityDetail: {
    selfPerception: string; // 自我认知
    socialStrategy: string; // 社交策略
    mindset: string;        // 心态
  };
  // Layer 3: Fortune Projection
  fortuneDetail: {
    wealth: string;         // 财运
    relationships: string;  // 情感
    hiddenWorries: string;  // 隐忧
  };
}

export type AnalysisResult = StandardAnalysisResult | DeepAnalysisResult;

export enum AppState {
  LANDING = 'LANDING',
  HOME = 'HOME',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
  HISTORY = 'HISTORY'
}