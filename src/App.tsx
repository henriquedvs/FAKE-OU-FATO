import { useState } from 'react';
import { GameScreen, GroupScore, Question, EducationLevel, DifficultyLevel, PlayType, MatchConfig, DEFAULT_MATCH_CONFIG } from './types/game';
import { selectGameQuestions } from './data/questions';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { RoundTransitionScreen } from './components/RoundTransitionScreen';
import { FinalRankingScreen } from './components/FinalRankingScreen';
import { FactCheckingModal } from './components/FactCheckingModal';
import { TeacherHelpModal } from './components/TeacherHelpModal';
import { EditorModal } from './components/EditorModal';
import { QuestionsCatalogScreen } from './components/QuestionsCatalogScreen';
import { sounds } from './utils/audio';

const INITIAL_GROUPS: GroupScore[] = [
  { id: 'g1', name: 'Grupo 01', color: '#2563eb', score: 0, correctCount: 0 },
  { id: 'g2', name: 'Grupo 02', color: '#dc2626', score: 0, correctCount: 0 },
  { id: 'g3', name: 'Grupo 03', color: '#d97706', score: 0, correctCount: 0 },
  { id: 'g4', name: 'Grupo 04', color: '#16a34a', score: 0, correctCount: 0 },
];

const GROUP_PALETTE = ['#2563eb', '#dc2626', '#d97706', '#16a34a', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('home');
  const [playType, setPlayType] = useState<PlayType>('group');
  const [matchConfig, setMatchConfig] = useState<MatchConfig>(DEFAULT_MATCH_CONFIG);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const [groups, setGroups] = useState<GroupScore[]>(INITIAL_GROUPS);
  const [soloScore, setSoloScore] = useState<number>(0);
  const [soloCorrectCount, setSoloCorrectCount] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFactModalOpen, setIsFactModalOpen] = useState<boolean>(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  
  // Track awarded points per question index for group mode
  const [awardedHistory, setAwardedHistory] = useState<Record<number, string[]>>({});
  // Track solo choices per question index
  const [soloHistory, setSoloHistory] = useState<Record<number, { choice: 'FATO' | 'FAKE'; isCorrect: boolean }>>({});

  // Toggle sound
  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sounds.enabled = nextState;
  };

  // Start standard game from HomeScreen
  const handleStartGame = (
    selectedPlayType: PlayType,
    mode: 'aleatorio' | 'ensino' | 'dificuldade',
    education?: EducationLevel,
    difficulty?: DifficultyLevel
  ) => {
    const config: MatchConfig = {
      totalRounds: 2,
      questionsPerRound: 6,
      groupsCount: 4,
      groupNames: ['Grupo 01', 'Grupo 02', 'Grupo 03', 'Grupo 04'],
      education: education || 'all',
      difficulty: difficulty || 'all',
      playType: selectedPlayType
    };

    setMatchConfig(config);
    setPlayType(selectedPlayType);

    const gameQuestions = selectGameQuestions(mode, education, difficulty, 12);
    setQuestions(gameQuestions);
    setGroups(INITIAL_GROUPS.map((g) => ({ ...g, score: 0, correctCount: 0 })));
    setSoloScore(0);
    setSoloCorrectCount(0);
    setCurrentQuestionIndex(0);
    setAwardedHistory({});
    setSoloHistory({});
    setScreen('playing');
  };

  // Start custom match from EditorModal
  const handleStartCustomMatch = (config: MatchConfig) => {
    setMatchConfig(config);
    setPlayType(config.playType);

    const totalNeeded = config.totalRounds * config.questionsPerRound;
    const gameQuestions = selectGameQuestions('custom', config.education, config.difficulty, totalNeeded);
    setQuestions(gameQuestions);

    if (config.playType === 'group') {
      const customGroups: GroupScore[] = [];
      for (let i = 0; i < config.groupsCount; i++) {
        customGroups.push({
          id: `g${i + 1}`,
          name: (config.groupNames && config.groupNames[i]) || `Grupo ${String(i + 1).padStart(2, '0')}`,
          color: GROUP_PALETTE[i % GROUP_PALETTE.length],
          score: 0,
          correctCount: 0,
        });
      }
      setGroups(customGroups);
    } else {
      setGroups(INITIAL_GROUPS.map((g) => ({ ...g, score: 0, correctCount: 0 })));
    }

    setSoloScore(0);
    setSoloCorrectCount(0);
    setCurrentQuestionIndex(0);
    setAwardedHistory({});
    setSoloHistory({});
    setScreen('playing');
  };

  // Award points to selected groups (+10 points each) - Group Mode
  const handleAwardPoints = (selectedGroupIds: string[]) => {
    const previousAward = awardedHistory[currentQuestionIndex] || [];
    
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        const wasPreviouslyAwarded = previousAward.includes(group.id);
        const isNowAwarded = selectedGroupIds.includes(group.id);

        let newScore = group.score;
        let newCount = group.correctCount;

        if (wasPreviouslyAwarded && !isNowAwarded) {
          newScore = Math.max(0, newScore - 10);
          newCount = Math.max(0, newCount - 1);
        } else if (!wasPreviouslyAwarded && isNowAwarded) {
          newScore += 10;
          newCount += 1;
        }

        return {
          ...group,
          score: newScore,
          correctCount: newCount,
        };
      })
    );

    setAwardedHistory((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedGroupIds,
    }));
  };

  // Solo Mode: Record individual player vote
  const handleSoloVote = (choice: 'FATO' | 'FAKE') => {
    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return;

    const isCorrect = choice === currentQ.classification;
    const previous = soloHistory[currentQuestionIndex];

    if (!previous) {
      if (isCorrect) {
        setSoloScore((prev) => prev + 10);
        setSoloCorrectCount((prev) => prev + 1);
      }
    } else {
      // Adjusted if re-voted
      if (previous.isCorrect && !isCorrect) {
        setSoloScore((prev) => Math.max(0, prev - 10));
        setSoloCorrectCount((prev) => Math.max(0, prev - 1));
      } else if (!previous.isCorrect && isCorrect) {
        setSoloScore((prev) => prev + 10);
        setSoloCorrectCount((prev) => prev + 1);
      }
    }

    setSoloHistory((prev) => ({
      ...prev,
      [currentQuestionIndex]: { choice, isCorrect }
    }));
  };

  // Advance to next question or screen
  const handleNextQuestion = () => {
    const totalQuestions = matchConfig.totalRounds * matchConfig.questionsPerRound;
    const isLastQuestion = currentQuestionIndex + 1 >= totalQuestions;
    const isEndOfRound = (currentQuestionIndex + 1) % matchConfig.questionsPerRound === 0;

    if (isLastQuestion) {
      setScreen('final_ranking');
    } else if (isEndOfRound) {
      setScreen('round_transition');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Transition from current round to next round
  const handleStartNextRound = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
    setScreen('playing');
  };

  // Restart current question
  const handleRestartQuestion = () => {
    if (playType === 'group') {
      const previouslyAwarded = awardedHistory[currentQuestionIndex] || [];
      if (previouslyAwarded.length > 0) {
        setGroups((prev) =>
          prev.map((g) => ({
            ...g,
            score: previouslyAwarded.includes(g.id) ? Math.max(0, g.score - 10) : g.score,
            correctCount: previouslyAwarded.includes(g.id) ? Math.max(0, g.correctCount - 1) : g.correctCount,
          }))
        );
        setAwardedHistory((prev) => {
          const updated = { ...prev };
          delete updated[currentQuestionIndex];
          return updated;
        });
      }
    } else {
      const prevSolo = soloHistory[currentQuestionIndex];
      if (prevSolo && prevSolo.isCorrect) {
        setSoloScore((prev) => Math.max(0, prev - 10));
        setSoloCorrectCount((prev) => Math.max(0, prev - 1));
      }
      setSoloHistory((prev) => {
        const updated = { ...prev };
        delete updated[currentQuestionIndex];
        return updated;
      });
    }
  };

  // Reset entire game to home screen
  const handleResetGame = () => {
    setGroups(INITIAL_GROUPS.map((g) => ({ ...g, score: 0, correctCount: 0 })));
    setSoloScore(0);
    setSoloCorrectCount(0);
    setCurrentQuestionIndex(0);
    setAwardedHistory({});
    setSoloHistory({});
    setScreen('home');
  };

  // Derived dynamic metrics
  const totalQuestions = matchConfig.totalRounds * matchConfig.questionsPerRound;
  const currentRound = Math.floor(currentQuestionIndex / matchConfig.questionsPerRound) + 1;
  const roundQuestionIndex = currentQuestionIndex % matchConfig.questionsPerRound;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header
        currentScreen={screen}
        currentRound={currentRound}
        currentQuestionIndex={currentQuestionIndex}
        totalRounds={matchConfig.totalRounds}
        questionsPerRound={matchConfig.questionsPerRound}
        totalQuestions={totalQuestions}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenFactModal={() => setIsFactModalOpen(true)}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onResetGame={handleResetGame}
        playType={playType}
      />

      <div className="flex-1">
        {screen === 'home' && (
          <HomeScreen
            onStartGame={handleStartGame}
            onOpenFactModal={() => setIsFactModalOpen(true)}
            onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
            onOpenEditor={() => setIsEditorOpen(true)}
            onOpenCatalog={() => setScreen('questions_catalog')}
          />
        )}

        {screen === 'questions_catalog' && (
          <QuestionsCatalogScreen
            onBackToHome={() => setScreen('home')}
          />
        )}

        {screen === 'playing' && currentQuestion && (
          <QuestionScreen
            key={currentQuestion.id}
            question={currentQuestion}
            questionIndex={currentQuestionIndex}
            round={currentRound}
            roundQuestionIndex={roundQuestionIndex}
            groups={groups}
            onAwardPoints={handleAwardPoints}
            onNextQuestion={handleNextQuestion}
            onRestartQuestion={handleRestartQuestion}
            soundEnabled={soundEnabled}
            playType={playType}
            soloScore={soloScore}
            soloCorrectCount={soloCorrectCount}
            onSoloVote={handleSoloVote}
            totalRounds={matchConfig.totalRounds}
            questionsPerRound={matchConfig.questionsPerRound}
            totalQuestions={totalQuestions}
          />
        )}

        {screen === 'round_transition' && (
          <RoundTransitionScreen
            groups={groups}
            onStartRound2={handleStartNextRound}
            playType={playType}
            soloScore={soloScore}
            soloCorrectCount={soloCorrectCount}
            completedRound={currentRound}
            nextRound={currentRound + 1}
            totalRounds={matchConfig.totalRounds}
            questionsPerRound={matchConfig.questionsPerRound}
          />
        )}

        {screen === 'final_ranking' && (
          <FinalRankingScreen
            groups={groups}
            questions={questions}
            onNewGame={handleResetGame}
            soundEnabled={soundEnabled}
            playType={playType}
            soloScore={soloScore}
            soloCorrectCount={soloCorrectCount}
          />
        )}
      </div>

      {/* Floating or Modal Helpers */}
      <FactCheckingModal
        isOpen={isFactModalOpen}
        onClose={() => setIsFactModalOpen(false)}
      />

      <TeacherHelpModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      />

      <EditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onStartCustomMatch={handleStartCustomMatch}
        initialConfig={matchConfig}
      />
    </div>
  );
}
