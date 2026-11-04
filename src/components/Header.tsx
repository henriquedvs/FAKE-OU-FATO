import React from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, BookOpen, HelpCircle, RotateCcw } from 'lucide-react';
import { GameScreen, PlayType } from '../types/game';

interface HeaderProps {
  currentScreen: GameScreen;
  currentRound: number;
  currentQuestionIndex: number;
  totalRounds?: number;
  questionsPerRound?: number;
  totalQuestions?: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenFactModal: () => void;
  onOpenTeacherModal: () => void;
  onResetGame: () => void;
  playType?: PlayType;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  currentRound,
  currentQuestionIndex,
  totalRounds = 2,
  questionsPerRound = 6,
  totalQuestions = 12,
  soundEnabled,
  onToggleSound,
  onOpenFactModal,
  onOpenTeacherModal,
  onResetGame,
  playType = 'group'
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const isPlaying = currentScreen === 'playing';

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur border-b border-slate-200/80 px-3 sm:px-6 lg:px-8 2xl:px-12 py-2.5 sm:py-3 2xl:py-4 transition-all">
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div 
            className="flex items-center gap-1.5 cursor-pointer shrink-0" 
            onClick={() => { if (currentScreen !== 'playing' || confirm('Deseja voltar para a tela inicial?')) onResetGame(); }}
            title="Voltar ao início"
          >
            <div className="flex items-center -space-x-1 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-[#ea4335]" title="Fake" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-[#34a853]" title="Fato" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-[#4285f4]" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-4 2xl:h-4 rounded-full bg-[#fbbc05]" />
            </div>
            <h1 className="text-base sm:text-xl 2xl:text-2xl font-black tracking-tight text-slate-900 font-display select-none whitespace-nowrap">
              FAKE <span className="text-slate-400 font-semibold text-xs sm:text-sm 2xl:text-base">OU</span> <span className="text-emerald-600">FATO?</span>
            </h1>
          </div>

          {isPlaying && (
            <div className="hidden md:flex items-center gap-2 pl-3 2xl:pl-5 border-l border-slate-200 text-xs 2xl:text-sm text-slate-600 truncate">
              {playType === 'solo' && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] 2xl:text-xs font-black uppercase tracking-wider shrink-0">
                  Solo
                </span>
              )}
              <span className="font-bold text-slate-900 uppercase whitespace-nowrap">
                RODADA 0{currentRound} {totalRounds > 1 ? `DE 0${totalRounds}` : ''} — {questionsPerRound} {questionsPerRound === 1 ? 'PERGUNTA' : 'PERGUNTAS'}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="whitespace-nowrap">Pergunta {(currentQuestionIndex % questionsPerRound) + 1} de {questionsPerRound}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-400 whitespace-nowrap">Total: {currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
          )}
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {isPlaying && (
            <button
              onClick={() => {
                if (window.confirm('Tem certeza de que deseja reiniciar toda a partida? Todas as pontuações serão zeradas.')) {
                  onResetGame();
                }
              }}
              title="Reiniciar partida"
              className="px-2.5 sm:px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs 2xl:text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] 2xl:min-h-[44px]"
            >
              <RotateCcw className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          )}

          <button
            onClick={onOpenFactModal}
            className="px-2.5 sm:px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs 2xl:text-sm font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 rounded-xl border border-blue-200/60 transition-colors flex items-center gap-1.5 cursor-pointer min-h-[36px] 2xl:min-h-[44px]"
            title="Dicas de Checagem"
          >
            <BookOpen className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span className="hidden sm:inline">Dicas de Checagem</span>
          </button>

          {playType === 'group' && (
            <button
              onClick={onOpenTeacherModal}
              className="p-2 2xl:p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer min-h-[36px] min-w-[36px] 2xl:min-h-[44px] 2xl:min-w-[44px] flex items-center justify-center"
              title="Guia do Professor"
              aria-label="Guia do Professor"
            >
              <HelpCircle className="w-4 h-4 2xl:w-5 2xl:h-5" />
            </button>
          )}

          <button
            onClick={onToggleSound}
            className="p-2 2xl:p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer min-h-[36px] min-w-[36px] 2xl:min-h-[44px] 2xl:min-w-[44px] flex items-center justify-center"
            title={soundEnabled ? 'Silenciar efeitos de som' : 'Ativar efeitos de som'}
            aria-label={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-emerald-600" /> : <VolumeX className="w-4 h-4 2xl:w-5 2xl:h-5 text-slate-400" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 2xl:p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer min-h-[36px] min-w-[36px] 2xl:min-h-[44px] 2xl:min-w-[44px] flex items-center justify-center"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia para TV ou Projetor'}
            aria-label="Alternar tela cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 2xl:w-5 2xl:h-5 text-blue-600" /> : <Maximize2 className="w-4 h-4 2xl:w-5 2xl:h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
