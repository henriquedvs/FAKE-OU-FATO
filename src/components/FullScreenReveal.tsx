import React, { useEffect } from 'react';
import { Question, GroupScore, PlayType } from '../types/game';
import { 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Check, 
  ArrowRight, 
  RotateCcw,
  BookCheck,
  AlertTriangle,
  Sparkles,
  Trophy
} from 'lucide-react';

interface FullScreenRevealProps {
  question: Question;
  round: number;
  totalRounds?: number;
  questionIndex: number;
  roundQuestionIndex: number;
  questionsPerRound?: number;
  totalQuestions?: number;
  groups: GroupScore[];
  selectedGroups: string[];
  isScoreConfirmed: boolean;
  onToggleGroup: (groupId: string) => void;
  onConfirmScore: () => void;
  onEditScore: () => void;
  onNextQuestion: () => void;
  onCloseReveal: () => void;
  playType?: PlayType;
  soloPlayerChoice?: 'FATO' | 'FAKE' | null;
  soloScore?: number;
  soloCorrectCount?: number;
}

export const FullScreenReveal: React.FC<FullScreenRevealProps> = ({
  question,
  round,
  totalRounds = 2,
  questionIndex,
  roundQuestionIndex,
  questionsPerRound = 6,
  totalQuestions = 12,
  groups,
  selectedGroups,
  isScoreConfirmed,
  onToggleGroup,
  onConfirmScore,
  onEditScore,
  onNextQuestion,
  onCloseReveal,
  playType = 'group',
  soloPlayerChoice = null,
  soloScore = 0,
  soloCorrectCount = 0
}) => {
  const isFato = question.classification === 'FATO';
  const isLastQuestionOfGame = questionIndex + 1 >= totalQuestions;
  const isLastQuestionOfCurrentRound = (questionIndex + 1) % questionsPerRound === 0;
  const isSolo = playType === 'solo';
  const isSoloCorrect = isSolo && soloPlayerChoice === question.classification;

  // Lock body & html scroll so the background cannot scroll or push the viewport
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const nextButtonText = isLastQuestionOfGame
    ? (isSolo ? 'VER MEU RESULTADO FINAL' : 'VER RESULTADO FINAL')
    : isLastQuestionOfCurrentRound
    ? `IR PARA A RODADA 0${round + 1}`
    : 'PRÓXIMA PERGUNTA';

  return (
    <div 
      className={`fixed inset-0 z-50 h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
        isFato 
          ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white' 
          : 'bg-gradient-to-br from-rose-600 via-red-700 to-red-950 text-white'
      }`}
    >
      {/* 1. TOP HEADER STRIP (Compact & strictly shrink-0) */}
      <header className="w-full px-3 sm:px-6 2xl:px-12 py-1.5 sm:py-2.5 2xl:py-3.5 flex items-center justify-between border-b border-white/15 bg-black/15 backdrop-blur-xs shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm 2xl:text-base">
          <span className="font-black uppercase tracking-wider px-2.5 py-0.5 sm:py-1 2xl:px-4 2xl:py-1.5 rounded-lg sm:rounded-xl bg-white/20 text-white">
            RODADA 0{round} DE 0{totalRounds} — {questionsPerRound} PERGUNTAS
          </span>
          <span className="font-semibold text-white/90 hidden sm:inline">
            Pergunta 0{roundQuestionIndex + 1} de 0{questionsPerRound}
          </span>
          <span className="text-white/60 hidden sm:inline">·</span>
          <span className="text-white/80 hidden md:inline">
            {question.category} ({question.educationLevel === 'fundamental' ? 'Ensino Fundamental' : 'Ensino Médio'})
          </span>
        </div>

        {/* Live Scoreboard Summary in top bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isSolo ? (
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-xl sm:rounded-2xl bg-black/25 border border-white/15 text-xs 2xl:text-sm">
              <Trophy className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-300 shrink-0" />
              <span className="text-white/80 font-medium hidden sm:inline">Pontuação:</span>
              <span className="font-display font-black text-amber-300 text-xs sm:text-sm 2xl:text-base">{soloScore} pts</span>
              <span className="text-white/50">·</span>
              <span className="text-white/80 font-semibold">{soloCorrectCount}/{totalQuestions}</span>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-2xl bg-black/20 border border-white/10 text-xs 2xl:text-sm">
              <span className="text-white/70 font-semibold text-[11px] 2xl:text-xs uppercase tracking-wider mr-1">Placar:</span>
              {groups.map((g) => (
                <span key={g.id} className="flex items-center gap-1 font-bold text-white text-xs 2xl:text-sm">
                  <span className="w-2 h-2 2xl:w-2.5 2xl:h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span>{g.name}:</span>
                  <span className="font-mono text-amber-300">{g.score}</span>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={onCloseReveal}
            className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-xs 2xl:text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 border border-white/10 cursor-pointer"
            title="Voltar à tela da notícia"
          >
            <RotateCcw className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" />
            <span className="hidden sm:inline">Ver Pergunta</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN CENTER HERO AREA (Flex-1 with min-h-0 and overflow-hidden to NEVER exceed screen) */}
      <main className="flex-1 min-h-0 w-full max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 2xl:px-16 py-1.5 sm:py-2.5 flex flex-col items-center justify-between sm:justify-center gap-1.5 sm:gap-2.5 overflow-hidden">
        {/* Giant Classification Announcement (Fluid scaling for phone, TV, projector, PC) */}
        <div className="text-center space-y-0.5 sm:space-y-1.5 shrink-0 max-w-full">
          {/* Solo Mode Result feedback pill */}
          {isSolo && soloPlayerChoice && (
            <div className="mb-0.5 sm:mb-1 inline-flex items-center gap-2 px-3 sm:px-4 py-0.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider shadow-md">
              {isSoloCorrect ? (
                <span className="bg-amber-300 text-slate-950 px-2.5 sm:px-3 py-0.5 rounded-full flex items-center gap-1.5 font-black text-xs sm:text-sm">
                  <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
                  VOCÊ ACERTOU! (+10 PONTOS)
                </span>
              ) : (
                <span className="bg-slate-900/80 text-rose-200 border border-rose-400 px-2.5 sm:px-3 py-0.5 rounded-full flex items-center gap-1.5 text-xs sm:text-sm">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  VOCÊ ERROU (Sua resposta: {soloPlayerChoice})
                </span>
              )}
            </div>
          )}

          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/25 text-white text-[11px] sm:text-xs 2xl:text-sm font-bold tracking-wider uppercase backdrop-blur-xs">
            {isFato ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-200" />
                <span>Veredito Oficial da Checagem</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-200" />
                <span>Veredito Oficial da Checagem</span>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black font-display tracking-tight drop-shadow-xl animate-stamp leading-none">
            {isFato ? 'É FATO!' : 'É FAKE!'}
          </h1>

          <p className="text-xs sm:text-base 2xl:text-xl font-bold text-white/95 max-w-3xl 2xl:max-w-4xl mx-auto leading-snug line-clamp-1 sm:line-clamp-2 px-2">
            "{question.title}"
          </p>
        </div>

        {/* Informação e Explicação Educativa (flex-1 min-h-0 with internal scrollbar, GUARANTEEING footer is NEVER pushed down) */}
        <div className="w-full flex-1 min-h-0 bg-black/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 2xl:p-6 border border-white/20 shadow-2xl overflow-y-auto custom-reveal-scrollbar space-y-2 sm:space-y-3">
          {/* FAKE breakdown or FATO confirmation */}
          {!isFato ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
              {/* Onde estava a adulteração */}
              <div className="p-2.5 sm:p-3.5 2xl:p-4 rounded-xl bg-black/25 border border-white/10 space-y-1">
                <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold uppercase tracking-wider text-rose-200 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-rose-300 shrink-0" />
                  O que foi adulterado na notícia:
                </span>
                <p className="text-xs sm:text-sm 2xl:text-base font-medium text-white leading-relaxed">
                  {question.alterationDetail || 'Um detalhe essencial da notícia foi modificado intencionalmente.'}
                </p>
              </div>

              {/* Informação Correta */}
              <div className="p-2.5 sm:p-3.5 2xl:p-4 rounded-xl bg-black/25 border border-white/10 space-y-1">
                <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-300 shrink-0" />
                  Informação Correta e Autêntica:
                </span>
                <p className="text-xs sm:text-sm 2xl:text-base font-bold text-white leading-relaxed">
                  {question.originalOrCorrectedInfo}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-2.5 sm:p-3.5 2xl:p-4 rounded-xl bg-black/25 border border-white/10">
              <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-300 shrink-0" />
                Confirmação Científica & Histórica:
              </span>
              <p className="text-xs sm:text-sm 2xl:text-base font-bold text-white leading-relaxed">
                {question.originalOrCorrectedInfo}
              </p>
            </div>
          )}

          {/* Explicação da Notícia */}
          <div className="p-2.5 sm:p-3.5 2xl:p-4 rounded-xl bg-black/20 border border-white/10 space-y-1">
            <span className="text-[10px] sm:text-xs 2xl:text-sm font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
              <BookCheck className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-300 shrink-0" />
              Explicação Educativa:
            </span>
            <p className="text-xs sm:text-sm 2xl:text-base text-white/95 leading-relaxed font-normal">
              {question.explanation}
            </p>
          </div>

          {/* Fonte oficial */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1.5 sm:pt-2 border-t border-white/10 text-xs 2xl:text-sm text-white/80">
            <div>
              <span className="font-bold text-white/70 uppercase text-[10px] 2xl:text-xs tracking-wider mr-1">Fonte Verificada:</span>
              <span className="font-semibold text-white">{question.sourceName}</span>
            </div>
            {question.sourceUrl && (
              <a
                href={question.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] 2xl:text-xs text-amber-200 hover:text-white hover:underline font-semibold"
              >
                <span>Consultar Referência Oficial</span>
                <ExternalLink className="w-3 h-3 2xl:w-3.5 2xl:h-3.5" />
              </a>
            )}
          </div>
        </div>
      </main>

      {/* 3. BOTTOM CONTROL BAR (Always 100% visible in viewport without scrolling, strictly shrink-0) */}
      <footer className="w-full bg-black/40 backdrop-blur-lg border-t border-white/20 px-3 sm:px-6 2xl:px-12 py-2 sm:py-3 2xl:py-3.5 shrink-0 z-10">
        <div className="max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-3">
          {/* Solo Mode summary OR Group selection controls */}
          {isSolo ? (
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm 2xl:text-base text-white font-medium">
              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 border border-white/20 font-bold flex items-center gap-2">
                <span>Modo Jogar Sozinho</span>
                <span>·</span>
                <span className="text-amber-300 font-extrabold">{soloScore} Pontos</span>
              </span>
              <span className="text-white/80 hidden sm:inline">
                {isSoloCorrect ? 'Resposta correta registrada!' : 'Continue firme na próxima!'}
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5 sm:gap-2.5 w-full md:w-auto">
              <span className="text-[11px] sm:text-xs 2xl:text-sm font-bold text-white/90 uppercase tracking-wider shrink-0">
                Equipes que acertaram:
              </span>

              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center max-h-[64px] sm:max-h-none overflow-y-auto custom-reveal-scrollbar py-0.5">
                {groups.map((group) => {
                  const isSelected = selectedGroups.includes(group.id);
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => onToggleGroup(group.id)}
                      disabled={isScoreConfirmed}
                      className={`px-2 py-0.5 sm:px-3 sm:py-1.5 2xl:px-4 2xl:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs 2xl:text-sm font-bold transition-all flex items-center gap-1 sm:gap-1.5 border min-h-[30px] sm:min-h-[36px] ${
                        isSelected
                          ? 'bg-white text-slate-900 border-white shadow-md font-black'
                          : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                      } ${isScoreConfirmed ? 'opacity-85 cursor-default' : 'cursor-pointer'}`}
                    >
                      <span
                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 2xl:w-3 2xl:h-3 rounded-full shrink-0"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="truncate max-w-[90px] sm:max-w-none">{group.name}</span>
                      {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3] text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Confirm Score button or Edit button */}
              {!isScoreConfirmed ? (
                <button
                  type="button"
                  onClick={onConfirmScore}
                  className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 2xl:px-5 2xl:py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] sm:text-xs 2xl:text-sm uppercase tracking-wider rounded-lg sm:rounded-xl shadow-lg flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer ring-2 ring-emerald-300 min-h-[32px] sm:min-h-[36px] shrink-0"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-slate-950 stroke-[3] shrink-0" />
                  <span>Confirmar Pontos (+10)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onEditScore}
                  className="text-xs 2xl:text-sm text-white/80 hover:text-white underline px-2 py-0.5 cursor-pointer shrink-0"
                >
                  Editar Acertos
                </button>
              )}
            </div>
          )}

          {/* Next Question Button (Large, prominent, strictly visible without scrolling) */}
          <div className="w-full md:w-auto flex justify-center md:justify-end shrink-0">
            <button
              type="button"
              onClick={onNextQuestion}
              disabled={!isSolo && !isScoreConfirmed}
              className={`w-full md:w-auto px-5 sm:px-8 2xl:px-10 py-2 sm:py-2.5 2xl:py-3.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm 2xl:text-base uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl min-h-[42px] sm:min-h-[46px] shrink-0 ${
                isSolo || isScoreConfirmed
                  ? 'bg-white text-slate-900 hover:bg-slate-100 hover:scale-102 cursor-pointer ring-4 ring-white/30'
                  : 'bg-white/20 text-white/40 cursor-not-allowed border border-white/10'
              }`}
              title={
                !isSolo && !isScoreConfirmed
                  ? 'Marque os grupos e clique em Confirmar Pontos para avançar'
                  : 'Avançar para a próxima etapa'
              }
            >
              <span>{nextButtonText}</span>
              <ArrowRight className="w-4 h-4 2xl:w-5 2xl:h-5 ml-1 shrink-0" />
            </button>
          </div>
        </div>

        {/* Small subtle help reminder if points not confirmed in group mode */}
        {!isSolo && !isScoreConfirmed && (
          <div className="text-[10px] sm:text-[11px] 2xl:text-xs text-white/80 text-center mt-1">
            Selecione as equipes que acertaram a resposta e clique em <strong>Confirmar Pontos</strong> para liberar o botão de avançar.
          </div>
        )}
      </footer>
    </div>
  );
};
