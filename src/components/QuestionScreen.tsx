import React, { useState, useEffect, useRef } from 'react';
import { Question, GroupScore, PlayType } from '../types/game';
import { FullScreenReveal } from './FullScreenReveal';
import { ScoreBoard } from './ScoreBoard';
import { sounds } from '../utils/audio';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Plus, 
  Eye, 
  SlidersHorizontal,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Trophy,
  Target
} from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  questionIndex: number; // 0-indexed
  round: number;
  roundQuestionIndex: number;
  groups: GroupScore[];
  onAwardPoints: (groupIds: string[]) => void;
  onNextQuestion: () => void;
  onRestartQuestion: () => void;
  soundEnabled: boolean;
  playType?: PlayType;
  soloScore?: number;
  soloCorrectCount?: number;
  onSoloVote?: (choice: 'FATO' | 'FAKE') => void;
  totalRounds?: number;
  questionsPerRound?: number;
  totalQuestions?: number;
  investigationTimeMinutes?: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  questionIndex,
  round,
  roundQuestionIndex,
  groups,
  onAwardPoints,
  onNextQuestion,
  onRestartQuestion,
  soundEnabled,
  playType = 'group',
  soloScore = 0,
  soloCorrectCount = 0,
  onSoloVote,
  totalRounds = 2,
  questionsPerRound = 6,
  totalQuestions = 12,
  investigationTimeMinutes = 2.5
}) => {
  // Dynamic total investigation time in seconds (e.g. 2.5 min = 150s)
  const totalInvestigationTime = Math.round(investigationTimeMinutes * 60);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(totalInvestigationTime);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Reveal state
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  // Scoring state for group mode
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isScoreConfirmed, setIsScoreConfirmed] = useState<boolean>(false);
  const [awardedGroupIds, setAwardedGroupIds] = useState<string[]>([]);

  // Solo mode state
  const [soloChoice, setSoloChoice] = useState<'FATO' | 'FAKE' | null>(null);

  // Sound ref to prevent multiple triggers
  const lastTickTime = useRef<number | null>(null);

  // Reset local question state when question prop changes or duration changes
  useEffect(() => {
    setTimeLeft(totalInvestigationTime);
    setIsTimerRunning(true);
    setIsAnswerRevealed(false);
    setSelectedGroups([]);
    setIsScoreConfirmed(false);
    setAwardedGroupIds([]);
    setSoloChoice(null);
    lastTickTime.current = null;
  }, [question.id, totalInvestigationTime]);

  // Timer interval countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            if (soundEnabled) {
              sounds.playTimeUp();
            }
            return 0;
          }
          // Sound tick in last 5 seconds
          if (prev <= 6 && prev > 1 && soundEnabled && lastTickTime.current !== prev) {
            lastTickTime.current = prev;
            sounds.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, soundEnabled]);

  // Format time mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Reveal handler (for group or admin)
  const handleReveal = () => {
    setIsAnswerRevealed(true);
    setIsTimerRunning(false); // Stop countdown when revealed

    if (soundEnabled) {
      if (question.classification === 'FATO') {
        sounds.playFatoReveal();
      } else {
        sounds.playFakeReveal();
      }
    }
  };

  // Solo player submits vote
  const handleSoloVoteAction = (choice: 'FATO' | 'FAKE') => {
    setSoloChoice(choice);
    setIsTimerRunning(false);
    setIsAnswerRevealed(true);

    if (onSoloVote) {
      onSoloVote(choice);
    }

    if (soundEnabled) {
      if (choice === question.classification) {
        sounds.playFatoReveal();
      } else {
        sounds.playFakeReveal();
      }
    }
  };

  // Toggle group selection for scoring (Group mode)
  const toggleGroupSelection = (groupId: string) => {
    if (isScoreConfirmed) return; // Locked once confirmed
    setSelectedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  // Confirm scoring (Group mode)
  const handleConfirmScore = () => {
    onAwardPoints(selectedGroups);
    setAwardedGroupIds(selectedGroups);
    setIsScoreConfirmed(true);

    if (soundEnabled && selectedGroups.length > 0) {
      sounds.playScoreAdd();
    }
  };

  // Re-open selection if teacher made a mistake
  const handleEditScore = () => {
    if (isScoreConfirmed) {
      setIsScoreConfirmed(false);
    }
  };

  // Add 30 seconds to timer for debate
  const handleAdd30s = () => {
    setTimeLeft((prev) => Math.min(prev + 30, totalInvestigationTime + 180));
  };

  // Reset timer
  const handleResetTimer = () => {
    setTimeLeft(totalInvestigationTime);
    setIsTimerRunning(true);
  };

  const isSolo = playType === 'solo';

  return (
    <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 2xl:px-12 py-3 sm:py-6 2xl:py-8 pb-36 sm:pb-12 space-y-4 sm:space-y-6 2xl:space-y-8">
      {/* Top Banner: Round and Question Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pb-3 2xl:pb-4 border-b border-slate-200">
        <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm 2xl:text-base text-slate-700">
          <span className="font-extrabold text-slate-900 bg-blue-100 text-blue-900 px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-xl text-xs sm:text-sm 2xl:text-base uppercase tracking-wide">
            RODADA 0{round} {totalRounds > 1 ? `DE 0${totalRounds}` : ''} — {questionsPerRound} {questionsPerRound === 1 ? 'PERGUNTA' : 'PERGUNTAS'}
          </span>
          <span className="font-bold text-slate-900 2xl:text-lg">
            Pergunta {String(roundQuestionIndex + 1).padStart(2, '0')} de {String(questionsPerRound).padStart(2, '0')}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-500 text-xs 2xl:text-sm">
            Notícia {questionIndex + 1} de {totalQuestions}
          </span>
          {isSolo && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] 2xl:text-xs font-black uppercase tracking-wider">
              Modo Solo
            </span>
          )}
        </div>

        {/* Level and Category metadata */}
        <div className="flex items-center gap-2 text-xs 2xl:text-sm text-slate-500">
          <span className="capitalize font-semibold text-slate-700 2xl:text-slate-800">{question.category}</span>
          <span aria-hidden="true">·</span>
          <span>
            {question.educationLevel === 'fundamental' ? 'Ensino Fundamental' : 'Ensino Médio'}
          </span>
          <span aria-hidden="true">·</span>
          <span className="capitalize font-medium">Nível {question.difficulty}</span>
        </div>
      </div>

      {/* Main Grid: Question Area + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8 items-start">
        {/* Main 3-column area */}
        <main className="lg:col-span-3 space-y-4 sm:space-y-6 2xl:space-y-8">
          {/* Question / News Presentation Card */}
          <section 
            aria-labelledby="question-headline"
            className="bg-white rounded-3xl p-4 sm:p-8 md:p-10 2xl:p-12 shadow-google border border-slate-200/90 relative overflow-hidden"
          >
            {/* Top Indicator & Digital Investigation Timer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 2xl:pb-8 mb-4 sm:mb-6 2xl:mb-8 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-xs 2xl:text-sm font-bold uppercase tracking-wider text-slate-500">
                  {isSolo ? 'Investigação Individual' : 'Notícia sob Investigação dos Grupos'}
                </span>
              </div>

              {/* Digital Investigation Timer (High contrast & TV legible) */}
              <div 
                role="timer"
                aria-label="Cronômetro de Investigação"
                className={`inline-flex items-center gap-2.5 sm:gap-3 2xl:gap-4 px-3.5 sm:px-4 2xl:px-6 py-1.5 sm:py-2 2xl:py-3 rounded-2xl border transition-all ${
                  timeLeft === 0
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-timer-urgency'
                    : timeLeft <= 30
                    ? 'bg-amber-50 border-amber-300 text-amber-800 animate-timer-urgency'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <Clock className={`w-5 h-5 2xl:w-7 2xl:h-7 ${timeLeft <= 30 ? 'text-rose-600' : 'text-blue-600'}`} />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl 2xl:text-4xl font-black font-display tracking-tight">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold uppercase tracking-wider text-slate-400">
                    {timeLeft === 0 ? 'Tempo Esgotado' : 'Restantes'}
                  </span>
                </div>
              </div>
            </div>

            {/* News Headline (Scales up for TV / Projector reading from 5-10 meters) */}
            <h2 id="question-headline" className="text-xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black text-slate-900 font-display leading-tight tracking-tight">
              {question.title}
            </h2>

            {/* News Statement for Students to Investigate */}
            <div className="mt-4 sm:mt-6 2xl:mt-8 p-4 sm:p-8 2xl:p-10 rounded-2xl bg-slate-50 border-2 border-slate-200/70 text-slate-800 shadow-inner">
              <p className="text-lg sm:text-2xl md:text-3xl 2xl:text-4xl font-medium leading-relaxed sm:leading-relaxed 2xl:leading-relaxed text-slate-900">
                "{question.text}"
              </p>
            </div>

            {/* Solo Player Interactive Decision Buttons */}
            {isSolo ? (
              <div className="mt-6 sm:mt-8 2xl:mt-10 pt-4 sm:pt-6 border-t border-slate-100">
                <div className="text-center mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm 2xl:text-base font-bold uppercase tracking-wider text-slate-600 block">
                    Qual é o seu veredito? Escolha uma opção para checar:
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 2xl:gap-6 max-w-xl 2xl:max-w-2xl mx-auto">
                  {/* FATO button */}
                  <button
                    type="button"
                    onClick={() => handleSoloVoteAction('FATO')}
                    className="p-4 sm:p-5 2xl:p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-600 text-emerald-900 hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center justify-center gap-3 cursor-pointer group min-h-[52px]"
                  >
                    <CheckCircle2 className="w-6 h-6 2xl:w-8 2xl:h-8 text-emerald-600 group-hover:text-white transition-colors" />
                    <span className="font-display font-black text-xl sm:text-2xl 2xl:text-3xl tracking-wider uppercase">
                      É FATO!
                    </span>
                  </button>

                  {/* FAKE button */}
                  <button
                    type="button"
                    onClick={() => handleSoloVoteAction('FAKE')}
                    className="p-4 sm:p-5 2xl:p-6 rounded-2xl border-2 border-rose-500 bg-rose-50 hover:bg-rose-600 text-rose-900 hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-sm flex items-center justify-center gap-3 cursor-pointer group min-h-[52px]"
                  >
                    <XCircle className="w-6 h-6 2xl:w-8 2xl:h-8 text-rose-600 group-hover:text-white transition-colors" />
                    <span className="font-display font-black text-xl sm:text-2xl 2xl:text-3xl tracking-wider uppercase">
                      É FAKE!
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* Group prompt status */
              <div className="mt-4 sm:mt-6 2xl:mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm 2xl:text-base text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Missão dos Grupos:</span>
                  <span>Pesquisem na internet se esta notícia é <strong>FATO</strong> ou <strong>FAKE</strong>.</span>
                </div>
                {timeLeft === 0 && !isAnswerRevealed && (
                  <span className="px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-lg bg-rose-600 text-white font-bold animate-pulse text-xs 2xl:text-sm">
                    Atenção: Os grupos devem declarar o voto agora!
                  </span>
                )}
              </div>
            )}
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          {isSolo ? (
            /* Solo Player Score Widget */
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-google space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Seu Desempenho
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                  Solo
                </span>
              </div>

              {/* Total Points */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-xs text-slate-500 font-semibold block mb-0.5">Pontuação Atual</span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display font-black text-3xl text-slate-900">{soloScore}</span>
                  <span className="text-xs font-bold text-slate-500">pts</span>
                </div>
                <span className="text-[11px] text-slate-400">10 pontos por acerto</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[11px] text-emerald-700 font-semibold block">Acertos</span>
                  <span className="font-display font-black text-emerald-900 text-lg">
                    {soloCorrectCount} <span className="text-xs font-normal text-emerald-700">/ {totalQuestions}</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                  <span className="text-[11px] text-blue-700 font-semibold block">Progresso</span>
                  <span className="font-display font-black text-blue-900 text-lg">
                    {questionIndex + 1} <span className="text-xs font-normal text-blue-700">/ {totalQuestions}</span>
                  </span>
                </div>
              </div>

              {/* Fact checking tip */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                💡 <strong>Dica Solo:</strong> Abra uma nova aba para pesquisar palavras-chave antes de confirmar seu veredito.
              </div>
            </div>
          ) : (
            /* Groups Scoreboard */
            <>
              <ScoreBoard 
                groups={groups} 
                awardedGroupIds={awardedGroupIds} 
              />

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Regra de Pontuação</span>
                </div>
                <p className="leading-relaxed">
                  Cada grupo que acertar o veredito (FATO ou FAKE) recebe <strong>10 pontos</strong>. O professor seleciona as equipes que acertaram na tela cheia de revelação.
                </p>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Admin / Player Docked Bottom Control Bar */}
      <section 
        aria-label="Controles da Pergunta"
        className="sticky bottom-2 sm:bottom-4 z-40 bg-slate-900/95 backdrop-blur text-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 2xl:p-6 shadow-2xl border border-slate-700"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Controls: Timer Tools & Reset */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-black uppercase tracking-wider text-slate-400 mr-1 sm:mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              {isSolo ? 'Controles' : 'Painel Moderador'}
            </span>

            {/* Timer controls */}
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-2.5 sm:px-3 py-1.5 2xl:px-4 2xl:py-2 bg-slate-800 hover:bg-slate-700 text-xs 2xl:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer min-h-[36px]"
              title={isTimerRunning ? 'Pausar Cronômetro' : 'Continuar Cronômetro'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-400" /> : <Play className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-400" />}
              <span>{isTimerRunning ? 'Pausar' : 'Iniciar'}</span>
            </button>

            <button
              onClick={handleAdd30s}
              className="px-2.5 sm:px-3 py-1.5 2xl:px-4 2xl:py-2 bg-slate-800 hover:bg-slate-700 text-xs 2xl:text-sm font-semibold rounded-xl flex items-center gap-1 transition-colors border border-slate-700 cursor-pointer min-h-[36px]"
              title="Adicionar +30 segundos"
            >
              <Plus className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-blue-400" />
              <span>+30s</span>
            </button>

            <button
              onClick={handleResetTimer}
              className="px-2.5 sm:px-3 py-1.5 2xl:px-4 2xl:py-2 bg-slate-800 hover:bg-slate-700 text-xs 2xl:text-sm font-semibold rounded-xl flex items-center gap-1 transition-colors border border-slate-700 text-slate-300 cursor-pointer min-h-[36px]"
              title={`Reiniciar cronômetro para ${formatTime(totalInvestigationTime)}`}
            >
              <RotateCcw className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" />
              <span>{formatTime(totalInvestigationTime)}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Deseja reiniciar esta pergunta e o cronômetro?')) {
                  onRestartQuestion();
                }
              }}
              className="px-2.5 sm:px-3 py-1.5 2xl:px-4 2xl:py-2 bg-slate-800/70 hover:bg-slate-800 text-xs 2xl:text-sm font-semibold rounded-xl flex items-center gap-1 transition-colors border border-slate-700 text-slate-400 hover:text-slate-200 cursor-pointer min-h-[36px]"
              title="Reiniciar esta pergunta"
            >
              <RotateCcw className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Reiniciar Pergunta</span>
              <span className="sm:hidden">Reiniciar</span>
            </button>
          </div>

          {/* Action button */}
          <div className="w-full sm:w-auto flex justify-end">
            {!isSolo ? (
              <button
                type="button"
                onClick={handleReveal}
                className="w-full sm:w-auto px-6 sm:px-8 2xl:px-10 py-3 sm:py-3.5 2xl:py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm 2xl:text-base uppercase tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:scale-102 cursor-pointer ring-2 ring-blue-400/40 min-h-[44px]"
              >
                <Eye className="w-4 h-4 2xl:w-5 2xl:h-5" />
                <span>REVELAR RESPOSTA</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReveal}
                className="w-full sm:w-auto px-4 sm:px-5 py-2.5 2xl:px-6 2xl:py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs 2xl:text-sm rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-slate-700 cursor-pointer min-h-[40px]"
                title="Pular direto para a revelação da resposta sem pontuar"
              >
                <Eye className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
                <span>Ver Resposta Direta</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 100% Full-Screen Revelation View when Admin clicks Reveal or Solo player votes */}
      {isAnswerRevealed && (
        <FullScreenReveal
          question={question}
          round={round}
          questionIndex={questionIndex}
          roundQuestionIndex={roundQuestionIndex}
          groups={groups}
          selectedGroups={selectedGroups}
          isScoreConfirmed={isScoreConfirmed}
          onToggleGroup={toggleGroupSelection}
          onConfirmScore={handleConfirmScore}
          onEditScore={handleEditScore}
          onNextQuestion={onNextQuestion}
          onCloseReveal={() => setIsAnswerRevealed(false)}
          playType={playType}
          soloPlayerChoice={soloChoice}
          soloScore={soloScore}
          soloCorrectCount={soloCorrectCount}
          totalRounds={totalRounds}
          questionsPerRound={questionsPerRound}
          totalQuestions={totalQuestions}
        />
      )}
    </div>
  );
};
