import React, { useState } from 'react';
import { 
  Shuffle, 
  GraduationCap, 
  Flame, 
  Play, 
  HelpCircle, 
  BookOpen, 
  Tv, 
  ArrowRight, 
  Check, 
  Users, 
  User, 
  Sparkles, 
  SlidersHorizontal,
  Search,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EducationLevel, DifficultyLevel, PlayType } from '../types/game';

interface HomeScreenProps {
  onStartGame: (
    playType: PlayType,
    mode: 'aleatorio' | 'ensino' | 'dificuldade',
    education?: EducationLevel,
    difficulty?: DifficultyLevel
  ) => void;
  onOpenFactModal: () => void;
  onOpenTeacherModal: () => void;
  onOpenEditor: () => void;
  onOpenCatalog: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onOpenFactModal,
  onOpenTeacherModal,
  onOpenEditor,
  onOpenCatalog
}) => {
  const [playType, setPlayType] = useState<PlayType>('group');
  const [selectedTab, setSelectedTab] = useState<'aleatorio' | 'ensino' | 'dificuldade'>('aleatorio');
  const [selectedEducation, setSelectedEducation] = useState<EducationLevel>('fundamental');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medio');

  const handleStart = () => {
    if (selectedTab === 'aleatorio') {
      onStartGame(playType, 'aleatorio');
    } else if (selectedTab === 'ensino') {
      onStartGame(playType, 'ensino', selectedEducation);
    } else {
      onStartGame(playType, 'dificuldade', undefined, selectedDifficulty);
    }
  };

  const isSolo = playType === 'solo';

  return (
    <div className="min-h-[calc(100vh-61px)] flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Hero Header */}
      <header className="w-full text-center space-y-3 pt-1">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Educação Digital · Investigação & Combate à Desinformação</span>
        </div>

        {/* Brand Logo - Preserved Exactly */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 font-display">
          FAKE <span className="text-slate-400 font-bold text-3xl sm:text-4xl">OU</span>{' '}
          <span className="text-emerald-600">FATO?</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Atividade interativa de checagem com notícias reais, fontes verificáveis e adulterações propositais para exercitar o pensamento crítico.
        </p>

        {/* Feature Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-1 text-[11px] font-semibold text-slate-500">
          <span
            role="button"
            tabIndex={0}
            onClick={onOpenCatalog}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenCatalog(); }}
            className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 shadow-2xs text-slate-700 hover:text-blue-700 transition-all cursor-pointer underline decoration-dotted hover:decoration-solid underline-offset-2"
            title="Clique neste texto para explorar todas as 66 notícias verificadas, fontes, links e filtros por categorias"
          >
            66 Notícias Verificadas (G1, UOL, Folha, Lupa, Aos Fatos...)
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            Exibição em TV ou Projetor
          </span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 shadow-2xs">
            Até 8 Equipes ou Modo Solo
          </span>
        </div>
      </header>

      {/* Main Interactive Configuration Hub */}
      <main className="bg-white rounded-3xl p-5 sm:p-8 shadow-google border border-slate-200/90 space-y-6">
        {/* Step 1: Format Selector (Em Equipes vs Jogar Sozinho) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">1</span>
              <span>Escolha o Formato da Atividade</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Em Grupos */}
            <button
              type="button"
              onClick={() => setPlayType('group')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                !isSolo
                  ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  !isSolo ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                      Em Equipes (TV / Sala de Aula)
                    </span>
                    {!isSolo && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Projete na TV da sala. As equipes pesquisam em computadores separados e disputam no placar com painel do moderador.
                  </p>
                </div>
              </div>
            </button>

            {/* Jogar Sozinho */}
            <button
              type="button"
              onClick={() => setPlayType('solo')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                isSolo
                  ? 'border-emerald-600 bg-emerald-50/50 shadow-xs ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  isSolo ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                }`}>
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                        Jogar Sozinho (Individual)
                      </span>
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase rounded-md">
                        Novo
                      </span>
                    </div>
                    {isSolo && <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    Você é o detetive! Vote diretamente se cada notícia é FATO ou FAKE, acumule pontos e descubra sua patente de checagem.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Mode Selector (Aleatório, Ensino, Dificuldade) */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[11px]">2</span>
              <span>Selecione a Modalidade das Perguntas</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
              Partida padrão: 2 rodadas com 6 perguntas cada (12 ao todo)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. JOGO ALEATÓRIO */}
            <button
              type="button"
              onClick={() => setSelectedTab('aleatorio')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                selectedTab === 'aleatorio'
                  ? 'border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedTab === 'aleatorio' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  <Shuffle className="w-4 h-4" />
                </div>
                {selectedTab === 'aleatorio' && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">JOGO ALEATÓRIO</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Mistura equilibrada do Fundamental e Médio em todas as dificuldades.
              </p>
            </button>

            {/* 2. ESCOLHER ENSINO */}
            <button
              type="button"
              onClick={() => setSelectedTab('ensino')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                selectedTab === 'ensino'
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedTab === 'ensino' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                {selectedTab === 'ensino' && (
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">ESCOLHER ENSINO</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Filtre por etapa pedagógica: Ensino Fundamental ou Médio.
              </p>
            </button>

            {/* 3. ESCOLHER DIFICULDADE */}
            <button
              type="button"
              onClick={() => setSelectedTab('dificuldade')}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                selectedTab === 'dificuldade'
                  ? 'border-amber-500 bg-amber-50/40 shadow-xs ring-1 ring-amber-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedTab === 'dificuldade' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  <Flame className="w-4 h-4" />
                </div>
                {selectedTab === 'dificuldade' && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">ESCOLHER DIFICULDADE</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Filtre pelo nível investigativo: Fácil, Médio ou Difícil.
              </p>
            </button>
          </div>

          {/* Sub-selector for Ensino */}
          {selectedTab === 'ensino' && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                Selecione a etapa escolar desejada:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedEducation('fundamental')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedEducation === 'fundamental'
                      ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs ring-1 ring-emerald-500'
                      : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">Ensino Fundamental</div>
                    <div className="text-xs text-slate-500">Curiosidades, natureza, corpo humano e ciência</div>
                  </div>
                  {selectedEducation === 'fundamental' && <Check className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedEducation('medio')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                    selectedEducation === 'medio'
                      ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs ring-1 ring-emerald-500'
                      : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm">Ensino Médio</div>
                    <div className="text-xs text-slate-500">História, geopolítica, ciência e tecnologia</div>
                  </div>
                  {selectedEducation === 'medio' && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            </div>
          )}

          {/* Sub-selector for Dificuldade */}
          {selectedTab === 'dificuldade' && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                Selecione o nível de desafio das notícias:
              </span>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {(['facil', 'medio', 'dificil'] as DifficultyLevel[]).map((dif) => {
                  const labels: Record<DifficultyLevel, { name: string; desc: string }> = {
                    facil: { name: 'Fácil', desc: 'Fatos bem conhecidos' },
                    medio: { name: 'Médio', desc: 'Exige pesquisa atenta' },
                    dificil: { name: 'Difícil', desc: 'Adulterações sutis' }
                  };

                  return (
                    <button
                      key={dif}
                      type="button"
                      onClick={() => setSelectedDifficulty(dif)}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-center border transition-all cursor-pointer ${
                        selectedDifficulty === dif
                          ? 'bg-white border-amber-500 text-amber-900 shadow-xs ring-1 ring-amber-500'
                          : 'bg-white/70 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div>{labels[dif].name}</div>
                      <div className="text-[10px] font-normal text-slate-500 hidden sm:block">
                        {labels[dif].desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Special Feature Card: Modo Editor (Personalizado) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  Modo Editor de Partidas
                </span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[9px] font-black uppercase">
                  Personalizado
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 leading-relaxed mt-0.5">
                Escolha até <strong>5 rodadas</strong>, até <strong>7 perguntas</strong>, <strong>tempo de pesquisa (1 a 5 min)</strong> e de <strong>2 a 8 equipes</strong> com nomes customizados.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenEditor}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 border border-indigo-400/40"
          >
            <span>ABRIR EDITOR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Start Game Action CTA */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="font-bold text-slate-700">Configuração Padrão:</span>
            <span>2 Rodadas</span>
            <span aria-hidden="true">·</span>
            <span>6 Perguntas cada</span>
            <span aria-hidden="true">·</span>
            <span>Total: 12 Notícias</span>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className={`w-full sm:w-auto px-10 py-4 text-white font-black text-base uppercase tracking-wider rounded-2xl shadow-google flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 cursor-pointer ${
              isSolo
                ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {isSolo ? <Sparkles className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            <span>{isSolo ? 'Iniciar Jogo Sozinho' : 'Iniciar Partida na TV'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </main>

      {/* Classroom Dynamic / How It Works Cards */}
      <section aria-label="Como funciona a dinâmica" className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs text-slate-600">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Tv className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-900 block font-bold mb-0.5">1. Apresentação na TV</strong>
            Exiba a notícia na tela da sala. Um cronômetro de 2m30s orienta o tempo de debate e análise.
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-900 block font-bold mb-0.5">2. Pesquisa Digital dos Alunos</strong>
            Os estudantes investigam no Google, verificam fontes originais e procuram adulterações sutis.
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-slate-900 block font-bold mb-0.5">3. Revelação & Placar</strong>
            Revele em tela cheia com a explicação oficial e link da fonte, pontuando +10 pts para cada acerto.
          </div>
        </div>
      </section>

      {/* Secondary Teacher & Student Modals Links */}
      <footer className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 pb-2">
        <button
          onClick={onOpenFactModal}
          className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Consultar Dicas de Checagem Digital</span>
        </button>
        <span>·</span>
        <button
          onClick={onOpenTeacherModal}
          className="hover:text-blue-600 hover:underline cursor-pointer flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Guia de Dinâmica para o Professor</span>
        </button>
      </footer>
    </div>
  );
};
