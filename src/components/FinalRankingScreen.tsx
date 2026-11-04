import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GroupScore, Question, PlayType } from '../types/game';
import { sounds } from '../utils/audio';
import { Trophy, Medal, RotateCcw, ChevronDown, ChevronUp, ExternalLink, Award, Sparkles, User, CheckCircle2, Target, Image as ImageIcon } from 'lucide-react';
import { RankingImageModal } from './RankingImageModal';

interface FinalRankingScreenProps {
  groups: GroupScore[];
  questions: Question[];
  onNewGame: () => void;
  soundEnabled: boolean;
  playType?: PlayType;
  soloScore?: number;
  soloCorrectCount?: number;
}

export const FinalRankingScreen: React.FC<FinalRankingScreenProps> = ({
  groups,
  questions,
  onNewGame,
  soundEnabled,
  playType = 'group',
  soloScore = 0,
  soloCorrectCount = 0
}) => {
  const [showReview, setShowReview] = useState<boolean>(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const isSolo = playType === 'solo';

  // Trigger celebration on mount
  useEffect(() => {
    if (soundEnabled) {
      sounds.playVictory();
    }

    try {
      // Fire confetti bursts
      const count = 200;
      const defaults = {
        origin: { y: 0.7 }
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    } catch {
      // Confetti failover safe
    }
  }, [soundEnabled]);

  // Compute standings with tie handling for group mode
  const sorted = [...groups].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.correctCount - a.correctCount;
  });

  const rankedGroups = sorted.map((grp, idx, arr) => {
    const strictlyHigher = arr.filter((g) => g.score > grp.score).length;
    return {
      ...grp,
      rank: strictlyHigher + 1
    };
  });

  const winners = rankedGroups.filter((g) => g.rank === 1);
  const isMultipleWinners = winners.length > 1;

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          label: '1º LUGAR — CAMPEÃO',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          icon: Trophy,
          iconColor: 'text-amber-500'
        };
      case 2:
        return {
          label: '2º LUGAR',
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: Medal,
          iconColor: 'text-slate-500'
        };
      case 3:
        return {
          label: '3º LUGAR',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Medal,
          iconColor: 'text-amber-700'
        };
      default:
        return {
          label: `${rank}º LUGAR`,
          bg: 'bg-slate-50 text-slate-600 border-slate-200',
          icon: Award,
          iconColor: 'text-slate-400'
        };
    }
  };

  // Solo detective title determination
  const getSoloRankTitle = (score: number) => {
    if (score >= 100) {
      return {
        title: 'Mestre da Checagem Digital',
        badge: 'Nível Máximo · Especialista',
        desc: 'Sensacional! Você demonstrou olhar analítico apurado e excelente faro para identificar detalhes adulterados e notícias autênticas.',
        bg: 'bg-gradient-to-br from-amber-50 via-white to-amber-100/60 border-amber-400 text-amber-950',
        icon: Trophy,
        iconColor: 'text-amber-500'
      };
    } else if (score >= 70) {
      return {
        title: 'Detetive Digital Avançado',
        badge: 'Alto Rendimento',
        desc: 'Excelente trabalho! Você identificou a grande maioria das informações e demonstrou forte senso crítico.',
        bg: 'bg-gradient-to-br from-blue-50 via-white to-blue-100/60 border-blue-400 text-blue-950',
        icon: Medal,
        iconColor: 'text-blue-600'
      };
    } else if (score >= 40) {
      return {
        title: 'Investigador em Treinamento',
        badge: 'Em Evolução',
        desc: 'Bom desempenho! Continue atento a datas, nomes e números para aprimorar ainda mais sua verificação.',
        bg: 'bg-gradient-to-br from-emerald-50 via-white to-emerald-100/60 border-emerald-400 text-emerald-950',
        icon: Award,
        iconColor: 'text-emerald-600'
      };
    } else {
      return {
        title: 'Aprendiz de Verificação',
        badge: 'Início da Jornada',
        desc: 'A prática leva à perfeição! Use as dicas de leitura lateral e consulte as fontes com calma na próxima partida.',
        bg: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 border-slate-300 text-slate-800',
        icon: Award,
        iconColor: 'text-slate-500'
      };
    }
  };

  const totalQuestions = questions.length;
  const maxPossibleScore = totalQuestions * 10;
  const soloRankInfo = getSoloRankTitle(soloScore);
  const SoloIcon = soloRankInfo.icon;

  return (
    <div className="min-h-[calc(100vh-61px)] py-4 sm:py-8 2xl:py-12 px-3 sm:px-6 lg:px-8 2xl:px-12 max-w-5xl 2xl:max-w-7xl mx-auto space-y-5 sm:space-y-8 2xl:space-y-10">
      {/* Header Announcement */}
      <div className="text-center space-y-2.5 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs 2xl:text-sm font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="w-4 h-4 2xl:w-5 2xl:h-5 text-amber-500" />
          <span>Partida Finalizada — {totalQuestions} {totalQuestions === 1 ? 'Notícia Investigada' : 'Notícias Investigadas'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black text-slate-900 font-display tracking-tight">
          {isSolo ? 'SEU RESULTADO INDIVIDUAL' : 'RANKING FINAL'}
        </h1>

        <p className="text-sm sm:text-lg 2xl:text-xl text-slate-600 max-w-2xl 2xl:max-w-3xl mx-auto leading-relaxed">
          {isSolo ? (
            <span>Você concluiu a jornada de verificação das {totalQuestions} notícias reais e adulteradas!</span>
          ) : isMultipleWinners ? (
            <span>Tivemos um empate memorável no topo do pódio! Parabéns às equipes vencedoras!</span>
          ) : (
            <span>
              Parabéns ao <strong>{winners[0]?.name}</strong>, grande campeão da investigação de desinformação!
            </span>
          )}
        </p>
      </div>

      {/* Main Content: Solo Card or Group Podium */}
      {isSolo ? (
        /* Solo Performance Card */
        <div className={`p-6 sm:p-10 rounded-3xl border-2 shadow-google-hover max-w-2xl mx-auto space-y-6 ${soloRankInfo.bg}`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-slate-200 flex items-center justify-center shrink-0">
              <SoloIcon className={`w-10 h-10 ${soloRankInfo.iconColor}`} />
            </div>

            <div className="space-y-1">
              <span className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 border border-slate-200 shadow-2xs">
                {soloRankInfo.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-slate-900">
                {soloRankInfo.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                {soloRankInfo.desc}
              </p>
            </div>
          </div>

          {/* Score highlight numbers */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200/60">
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Pontuação Final</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display font-black text-4xl text-slate-900">{soloScore}</span>
                <span className="text-xs font-bold text-slate-500">/ {maxPossibleScore} pts</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200 text-center">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Taxa de Acertos</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display font-black text-4xl text-emerald-700">{soloCorrectCount}</span>
                <span className="text-xs font-bold text-slate-500">
                  / {totalQuestions} ({totalQuestions > 0 ? Math.round((soloCorrectCount / totalQuestions) * 100) : 0}%)
                </span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>Aproveitamento da Checagem</span>
              <span>{maxPossibleScore > 0 ? Math.round((soloScore / maxPossibleScore) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-1000"
                style={{ width: `${maxPossibleScore > 0 ? Math.min((soloScore / maxPossibleScore) * 100, 100) : 0}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Podium Cards for the 4 Groups */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rankedGroups.map((group) => {
            const badge = getRankBadge(group.rank);
            const Icon = badge.icon;
            const isFirst = group.rank === 1;

            return (
              <div
                key={group.id}
                className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
                  isFirst
                    ? 'bg-gradient-to-br from-amber-50 via-white to-amber-50/40 border-amber-400 shadow-google-hover ring-2 ring-amber-300/60'
                    : 'bg-white border-slate-200 shadow-google'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${badge.bg}`}
                    >
                      <Icon className={`w-6 h-6 ${badge.iconColor}`} />
                    </div>

                    <div>
                      <span
                        className={`inline-block text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-1 ${badge.bg}`}
                      >
                        {badge.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: group.color }}
                        />
                        <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                          {group.name}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1">
                      <span className="font-display font-black text-3xl sm:text-4xl text-slate-900">
                        {group.score}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase">pts</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      {group.correctCount} de {totalQuestions} acertos ({totalQuestions > 0 ? Math.round((group.correctCount / totalQuestions) * 100) : 0}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold mb-1">
                    <span>Aproveitamento da Equipe</span>
                    <span>{group.score} / {maxPossibleScore} pontos possíveis</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isFirst ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${maxPossibleScore > 0 ? Math.min((group.score / maxPossibleScore) * 100, 100) : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Actions: Start New Game & Export Image */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4">
        <button
          type="button"
          onClick={() => setIsImageModalOpen(true)}
          className="w-full sm:w-auto px-6 sm:px-7 2xl:px-9 py-3.5 sm:py-4 2xl:py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm 2xl:text-base uppercase tracking-wider rounded-2xl shadow-google flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-amber-400/30 min-h-[48px]"
          title="Criar e baixar imagem oficial com o resultado e os ganhadores em destaque"
        >
          <ImageIcon className="w-4 h-4 2xl:w-5 2xl:h-5" />
          <span>GERAR IMAGEM DO RANKING</span>
        </button>

        <button
          type="button"
          onClick={onNewGame}
          className="w-full sm:w-auto px-6 sm:px-7 2xl:px-9 py-3.5 sm:py-4 2xl:py-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs sm:text-sm 2xl:text-base uppercase tracking-wider rounded-2xl shadow-google flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer min-h-[48px]"
        >
          <RotateCcw className="w-4 h-4 2xl:w-5 2xl:h-5" />
          <span>INICIAR NOVA PARTIDA</span>
        </button>

        <button
          type="button"
          onClick={() => setShowReview(!showReview)}
          className="w-full sm:w-auto px-5 sm:px-6 2xl:px-8 py-3.5 sm:py-4 2xl:py-5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm 2xl:text-base rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer min-h-[48px]"
        >
          <span>{showReview ? `Ocultar Relatório (${totalQuestions} Notícias)` : `Ver Relatório Completo (${totalQuestions} Notícias)`}</span>
          {showReview ? <ChevronUp className="w-4 h-4 2xl:w-5 2xl:h-5" /> : <ChevronDown className="w-4 h-4 2xl:w-5 2xl:h-5" />}
        </button>
      </div>

      {/* Modal to Preview, Download or Copy the Ranking Image */}
      <RankingImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        groups={groups}
        questions={questions}
        playType={playType}
        soloScore={soloScore}
        soloCorrectCount={soloCorrectCount}
      />

      {/* Collapsible Educational Report with All 12 Questions & Verified Sources */}
      {showReview && (
        <section 
          aria-labelledby="report-heading"
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-google border border-slate-200/90 space-y-4 animate-in fade-in duration-300"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 id="report-heading" className="text-xl font-black text-slate-900 font-display">
              Relatório Pedagógico das Notícias Investigadas
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Revise os fatos reais, as alterações encontradas e as fontes oficiais verificadas.
            </p>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const isFato = q.classification === 'FATO';
              return (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <span
                        className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                          isFato
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {q.classification}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {q.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm">
                      {q.title}
                    </h3>

                    <p className="text-xs text-slate-700 italic">
                      "{q.text}"
                    </p>

                    <p className="text-xs text-slate-600 mt-1">
                      <strong>Explicação:</strong> {q.explanation}
                    </p>
                  </div>

                  <div className="text-right shrink-0 pt-1">
                    <span className="text-[11px] text-slate-500 font-medium block">
                      Fonte: {q.sourceName}
                    </span>
                    {q.sourceUrl && (
                      <a
                        href={q.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:underline mt-1 font-semibold"
                      >
                        <span>Acessar fonte</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
