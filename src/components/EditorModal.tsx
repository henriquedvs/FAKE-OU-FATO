import React, { useState } from 'react';
import { MatchConfig, PlayType, EducationLevel, DifficultyLevel } from '../types/game';
import { 
  Sliders, 
  X, 
  Play, 
  Users, 
  User, 
  HelpCircle, 
  Layers, 
  Sparkles, 
  Check, 
  GraduationCap, 
  Flame,
  Edit3,
  RotateCcw,
  Wand2
} from 'lucide-react';

interface EditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomMatch: (config: MatchConfig) => void;
  initialConfig?: MatchConfig;
}

const DEFAULT_COLORS = [
  '#2563eb', // Azul
  '#dc2626', // Vermelho
  '#d97706', // Âmbar
  '#16a34a', // Verde
  '#7c3aed', // Roxo
  '#0891b2', // Ciano
  '#db2777', // Rosa
  '#ea580c', // Laranja
];

export const EditorModal: React.FC<EditorModalProps> = ({
  isOpen,
  onClose,
  onStartCustomMatch,
  initialConfig
}) => {
  if (!isOpen) return null;

  const [totalRounds, setTotalRounds] = useState<number>(initialConfig?.totalRounds || 2);
  const [questionsPerRound, setQuestionsPerRound] = useState<number>(initialConfig?.questionsPerRound || 6);
  const [groupsCount, setGroupsCount] = useState<number>(initialConfig?.groupsCount || 4);
  const [playType, setPlayType] = useState<PlayType>(initialConfig?.playType || 'group');
  const [education, setEducation] = useState<EducationLevel | 'all'>(initialConfig?.education || 'all');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'all'>(initialConfig?.difficulty || 'all');
  const [customGroupNames, setCustomGroupNames] = useState<string[]>(
    initialConfig?.groupNames || Array.from({ length: 8 }, (_, i) => `Grupo 0${i + 1}`)
  );

  const totalQuestions = totalRounds * questionsPerRound;

  const handleGroupNameChange = (index: number, newName: string) => {
    setCustomGroupNames((prev) => {
      const copy = [...prev];
      copy[index] = newName;
      return copy;
    });
  };

  const handleStart = () => {
    onStartCustomMatch({
      totalRounds,
      questionsPerRound,
      groupsCount: playType === 'solo' ? 1 : groupsCount,
      groupNames: customGroupNames.slice(0, groupsCount),
      education,
      difficulty,
      playType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Sliders className="w-4 h-4" />
              <span>Modo Editor & Personalização</span>
            </div>
            <h2 id="editor-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Configurar Partida Personalizada
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Defina a quantidade de rodadas, perguntas por rodada, nível e número de equipes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Fechar editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6">
          {/* 1. Modo de Jogo: Grupos vs Solo */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Formato do Jogo</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPlayType('group')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  playType === 'group'
                    ? 'border-blue-600 bg-blue-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  playType === 'group' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Em Equipes (TV)</div>
                  <div className="text-[10px] text-slate-500">Com equipes competindo</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPlayType('solo')}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  playType === 'solo'
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  playType === 'solo' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Jogar Sozinho</div>
                  <div className="text-[10px] text-slate-500">Modo individual</div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Rodadas e Perguntas por Rodada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            {/* Número de Rodadas (1 a 5) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Número de Rodadas
                </label>
                <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
                  {totalRounds} {totalRounds === 1 ? 'rodada' : 'rodadas'} (máx 5)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setTotalRounds(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      totalRounds === num
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Perguntas por Rodada (1 a 7) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Perguntas por Rodada
                </label>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                  {questionsPerRound} {questionsPerRound === 1 ? 'pergunta' : 'perguntas'} (máx 7)
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionsPerRound(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      questionsPerRound === num
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resumo do total de perguntas calculadas */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900">
            <span className="font-semibold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Total calculado da partida:</span>
            </span>
            <span className="font-bold font-display text-sm">
              {totalRounds} {totalRounds === 1 ? 'rodada' : 'rodadas'} × {questionsPerRound} perguntas = <strong className="text-blue-700 text-base">{totalQuestions} notícias únicas</strong>
            </span>
          </div>

          {/* 3. Número de Grupos e Edição de Nomes (se playType === 'group') */}
          {playType === 'group' && (
            <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-600" />
                  <span>Número de Equipes / Grupos</span>
                </label>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-md">
                  {groupsCount} equipes (2 a 8)
                </span>
              </div>

              {/* Botões seletores de 2 a 8 grupos */}
              <div className="grid grid-cols-7 gap-1.5">
                {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGroupsCount(num)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      groupsCount === num
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Painel Completo de Edição dos Nomes das Equipes */}
              <div className="pt-3 border-t border-slate-200/80 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-extrabold uppercase tracking-wide">
                      Editar Nome dos Grupos
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const suggestions = [
                          'Detetives do Fato',
                          'Caçadores de Fake',
                          'Equipe Verdade',
                          'Checadores Digitais',
                          'Esquadrão Notícia',
                          'Fato em Foco',
                          'Faro Investigativo',
                          'Guardiões da Mídia'
                        ];
                        setCustomGroupNames((prev) => {
                          const updated = [...prev];
                          for (let i = 0; i < 8; i++) {
                            updated[i] = suggestions[i] || `Grupo 0${i + 1}`;
                          }
                          return updated;
                        });
                      }}
                      className="px-2 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200/70 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Preencher com nomes temáticos de jornalismo e checagem"
                    >
                      <Wand2 className="w-3 h-3 text-indigo-600" />
                      <span>Sugestões</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCustomGroupNames(Array.from({ length: 8 }, (_, i) => `Grupo 0${i + 1}`));
                      }}
                      className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Voltar para Grupo 01, Grupo 02..."
                    >
                      <RotateCcw className="w-3 h-3 text-slate-500" />
                      <span>Padrão</span>
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-tight">
                  Personalize o nome de cada equipe para a exibição no projetor/TV e no ranking final:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {Array.from({ length: groupsCount }, (_, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-slate-200 text-xs shadow-2xs hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span 
                          className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white shadow-xs" 
                          style={{ backgroundColor: DEFAULT_COLORS[i % DEFAULT_COLORS.length] }} 
                          title={`Cor da Equipe 0${i + 1}`}
                        />
                        <span className="font-bold text-slate-400 text-[11px]">
                          #{i + 1}
                        </span>
                      </div>

                      <input
                        type="text"
                        value={customGroupNames[i] !== undefined ? customGroupNames[i] : `Grupo 0${i + 1}`}
                        onChange={(e) => handleGroupNameChange(i, e.target.value)}
                        className="w-full text-xs font-bold text-slate-900 bg-slate-50/70 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-2.5 py-1.5 transition-all outline-hidden"
                        maxLength={24}
                        placeholder={`Nome do Grupo 0${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. Filtro de Etapa de Ensino */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Etapa de Ensino</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'all', label: 'Todas / Misto' },
                { id: 'fundamental', label: 'Fundamental' },
                { id: 'medio', label: 'Ensino Médio' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEducation(opt.id as EducationLevel | 'all')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    education === opt.id
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Filtro de Nível de Dificuldade */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Nível de Dificuldade</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'facil', label: 'Fácil' },
                { id: 'medio', label: 'Médio' },
                { id: 'dificil', label: 'Difícil' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDifficulty(opt.id as DifficultyLevel | 'all')}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                    difficulty === opt.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleStart}
            className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-google flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>INICIAR PARTIDA PERSONALIZADA ({totalQuestions} PERGUNTAS)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
