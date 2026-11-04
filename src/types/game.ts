export type GameModeType = 'aleatorio' | 'ensino' | 'dificuldade';

export type EducationLevel = 'fundamental' | 'medio';

export type DifficultyLevel = 'facil' | 'medio' | 'dificil';

export type ClassificationType = 'FATO' | 'FAKE';

export interface Question {
  id: string;
  title: string;
  text: string;
  classification: ClassificationType;
  explanation: string;
  originalOrCorrectedInfo: string;
  sourceName: string;
  sourceUrl: string;
  educationLevel: EducationLevel;
  difficulty: DifficultyLevel;
  category: string;
  alterationDetail?: string; // What specific detail was changed in FAKE
}

export interface GroupScore {
  id: string;
  name: string;
  color: string;
  score: number;
  correctCount: number;
}

export type GameScreen = 
  | 'home' 
  | 'editor'
  | 'playing' 
  | 'round_transition' 
  | 'final_ranking'
  | 'questions_catalog';

export type PlayType = 'group' | 'solo';

export interface MatchConfig {
  totalRounds: number; // 1 to 5
  questionsPerRound: number; // 1 to 7
  groupsCount: number; // 2 to 8
  groupNames?: string[];
  education?: EducationLevel | 'all';
  difficulty?: DifficultyLevel | 'all';
  playType: PlayType;
  investigationTimeMinutes?: number; // Minutes per question (e.g., 1, 2, 2.5, 3, 5)
}

export const DEFAULT_MATCH_CONFIG: MatchConfig = {
  totalRounds: 2,
  questionsPerRound: 6,
  groupsCount: 4,
  education: 'all',
  difficulty: 'all',
  playType: 'group',
  investigationTimeMinutes: 2.5 // Default 2 min 30 s
};

export interface GameSettings {
  playType: PlayType;
  mode: GameModeType;
  selectedEducation?: EducationLevel;
  selectedDifficulty?: DifficultyLevel;
}

export interface QuestionResult {
  questionId: string;
  awardedGroupIds: string[];
}
