import React from 'react';
import { GroupScore } from '../types/game';
import { Users, Award } from 'lucide-react';

interface ScoreBoardProps {
  groups: GroupScore[];
  awardedGroupIds?: string[];
  isCompact?: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ groups, awardedGroupIds = [], isCompact = false }) => {
  // Sort by score to highlight leaders while maintaining fixed identifiers
  const sortedLeaders = [...groups].sort((a, b) => b.score - a.score);
  const highestScore = sortedLeaders[0]?.score || 0;

  return (
    <aside 
      aria-label="Placar dos Grupos"
      className={`bg-white/95 backdrop-blur border border-slate-200/80 rounded-2xl shadow-google transition-all ${
        isCompact ? 'p-2 sm:p-2.5' : 'p-3 sm:p-4 2xl:p-5'
      }`}
    >
      <div className="flex items-center justify-between pb-2 mb-2 2xl:pb-3 2xl:mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 2xl:w-7 2xl:h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
          </div>
          <span className="text-xs 2xl:text-sm font-bold uppercase tracking-wider text-slate-600">
            Placar dos Grupos
          </span>
        </div>
        <span className="text-[11px] 2xl:text-xs text-slate-400 font-medium">
          {groups.length} Equipes
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-1.5 sm:gap-2 2xl:gap-3">
        {groups.map((group) => {
          const isAwardedJustNow = awardedGroupIds.includes(group.id);
          const isLeader = group.score > 0 && group.score === highestScore;

          return (
            <div
              key={group.id}
              className={`relative flex items-center justify-between p-2 sm:p-2.5 2xl:p-3 rounded-xl border transition-all duration-300 ${
                isAwardedJustNow
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-sm scale-102 ring-2 ring-emerald-200'
                  : 'bg-slate-50/60 border-slate-200/70 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 2xl:w-4 2xl:h-4 rounded-full shrink-0"
                  style={{ backgroundColor: group.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm 2xl:text-base font-bold text-slate-800 truncate">
                      {group.name}
                    </span>
                    {isLeader && (
                      <span title="Líder atual">
                        <Award className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-amber-500 shrink-0" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] 2xl:text-xs text-slate-500 block truncate">
                    {group.correctCount} {group.correctCount === 1 ? 'acerto' : 'acertos'}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-0.5 pl-2 shrink-0">
                <span className="font-display font-black text-base sm:text-lg 2xl:text-xl text-slate-900">
                  {group.score}
                </span>
                <span className="text-[10px] 2xl:text-xs font-semibold text-slate-500">pts</span>
              </div>

              {isAwardedJustNow && (
                <span className="absolute -top-2 -right-1 bg-emerald-600 text-white text-[10px] 2xl:text-xs font-black px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                  +10
                </span>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
