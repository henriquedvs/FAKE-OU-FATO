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
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { if (currentScreen !== 'playing' || confirm('Deseja voltar para a tela inicial?')) onResetGame(); }}>
            <div className="flex items-center -space-x-1">
              <span className="w-3 h-3 rounded-full bg-[#ea4335]" title="Fake" />
              <span className="w-3 h-3 rounded-full bg-[#34a853]" title="Fato" />
              <span className="w-3 h-3 rounded-full bg-[#4285f4]" />
              <span className="w-3 h-3 rounded-full bg-[#fbbc05]" />
            </div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 font-display select-none">
              FAKE <span className="text-slate-400 font-semibold text-sm">OU</span> <span className="text-emerald-600">FATO?</span>
            </h1>
          </div>

          {isPlaying && (
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 text-xs text-slate-600">
              {playType === 'solo' && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                  Solo
                </span>
              )}
              <span className="font-bold text-slate-900 uppercase">
                RODADA 0{currentRound} {totalRounds > 1 ? `DE 0${totalRounds}` : ''} — {questionsPerRound} {questionsPerRound === 1 ? 'PERGUNTA' : 'PERGUNTAS'}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Pergunta {(currentQuestionIndex % questionsPerRound) + 1} de {questionsPerRound}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-400">Total: {currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
          )}
        </div>

        {/* Global Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isPlaying && (
            <button
              onClick={() => {
                if (window.confirm('Tem certeza de que deseja reiniciar toda a partida? Todas as pontuações serão zeradas.')) {
                  onResetGame();
                }
              }}
              title="Reiniciar partida"
              className="px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reiniciar</span>
            </button>
          )}

          <button
            onClick={onOpenFactModal}
            className="px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 rounded-lg border border-blue-200/60 transition-colors flex items-center gap-1.5"
            title="Dicas de Checagem"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dicas de Checagem</span>
          </button>

          {playType === 'group' && (
            <button
              onClick={onOpenTeacherModal}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Guia do Professor"
              aria-label="Guia do Professor"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onToggleSound}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={soundEnabled ? 'Silenciar efeitos de som' : 'Ativar efeitos de som'}
            aria-label={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            aria-label="Alternar tela cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-blue-600" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
