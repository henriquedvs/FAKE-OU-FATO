import React from 'react';
import { GroupScore, PlayType } from '../types/game';
import { Play, Award, CheckCircle2, ArrowRight, User, Trophy, Sparkles } from 'lucide-react';

interface RoundTransitionScreenProps {
  groups: GroupScore[];
  onStartRound2: () => void; // Called to begin the next round
  playType?: PlayType;
  soloScore?: number;
  soloCorrectCount?: number;
  completedRound?: number;
  nextRound?: number;
  totalRounds?: number;
  questionsPerRound?: number;
}

export const RoundTransitionScreen: React.FC<RoundTransitionScreenProps> = ({
  groups,
  onStartRound2,
  playType = 'group',
  soloScore = 0,
  soloCorrectCount = 0,
  completedRound = 1,
  nextRound = 2,
  totalRounds = 2,
  questionsPerRound = 6
}) => {
  const isSolo = playType === 'solo';
  const sortedGroups = [...groups].sort((a, b) => b.score - a.score);
  const questionsCompleted = completedRound * questionsPerRound;

  return (
    <div className="min-h-[calc(100vh-61px)] flex flex-col justify-center items-center py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-google border border-slate-200/90 text-center space-y-6">
        {/* Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Etapa 0{completedRound} Concluída {totalRounds > 1 ? `de 0${totalRounds}` : ''}</span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display">
            FIM DA RODADA 0{completedRound}!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            {isSolo ? (
              <span>
                Você concluiu as perguntas desta etapa com sucesso! Confira sua pontuação antes de iniciar a{' '}
                <strong>RODADA 0{nextRound} — {questionsPerRound} {questionsPerRound === 1 ? 'PERGUNTA' : 'PERGUNTAS'}</strong>.
              </span>
            ) : (
              <span>
                As notícias da rodada foram investigadas. Confira a pontuação parcial das equipes antes de iniciar a{' '}
                <strong>RODADA 0{nextRound} — {questionsPerRound} {questionsPerRound === 1 ? 'PERGUNTA' : 'PERGUNTAS'}</strong>.
              </span>
            )}
          </p>
        </div>

        {/* Partial Results Card: Solo vs Group */}
        {isSolo ? (
          <div className="bg-gradient-to-br from-emerald-50 via-white to-blue-50/40 rounded-2xl p-6 border-2 border-emerald-200 max-w-lg mx-auto text-center space-y-4 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <User className="w-4 h-4" />
              <span>Seu Desempenho Parcial (Rodada 0{completedRound})</span>
            </div>

            <div className="p-4 rounded-xl bg-white/80 border border-emerald-100 shadow-xs">
              <span className="text-xs text-slate-500 font-semibold block mb-1">Pontuação Acumulada</span>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display font-black text-4xl text-slate-900">{soloScore}</span>
                <span className="text-sm font-bold text-slate-500 uppercase">pontos</span>
              </div>
              <div className="mt-2 text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {soloCorrectCount} de {questionsCompleted} notícias checadas com acerto ({questionsCompleted > 0 ? Math.round((soloCorrectCount / questionsCompleted) * 100) : 0}%)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Mais {questionsPerRound} notícias inéditas testarão seu faro investigativo na Rodada 0{nextRound}!
            </p>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 text-left">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Classificação Parcial (Fim da Rodada 0{completedRound})
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Pontuação Acumulada
              </span>
            </div>

            <div className="space-y-2.5">
              {sortedGroups.map((group, index) => {
                const isLeader = index === 0 && group.score > 0;
                return (
                  <div
                    key={group.id}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      isLeader
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-slate-400 text-sm w-5 text-center">
                        #{index + 1}
                      </span>
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0"
                        style={{ backgroundColor: group.color }}
                      />
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm sm:text-base">
                          {group.name}
                        </span>
                        {isLeader && (
                          <Award className="w-4 h-4 text-amber-500 shrink-0" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-lg sm:text-xl text-slate-900">
                        {group.score}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">pts</span>
                      <span className="text-[11px] text-slate-400 ml-2 hidden sm:inline">
                        ({group.correctCount} acertos)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Start Next Round Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onStartRound2}
            className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-google flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>INICIAR RODADA 0{nextRound} — {questionsPerRound} {questionsPerRound === 1 ? 'PERGUNTA' : 'PERGUNTAS'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
