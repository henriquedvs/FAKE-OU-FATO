import React, { useState, useMemo } from 'react';
import { QUESTIONS_DATABASE } from '../data/questions';
import { 
  ArrowLeft, 
  Search, 
  ExternalLink, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Tag, 
  Sparkles,
  Info,
  Check,
  RotateCcw
} from 'lucide-react';

interface QuestionsCatalogScreenProps {
  onBackToHome: () => void;
}

export const QuestionsCatalogScreen: React.FC<QuestionsCatalogScreenProps> = ({
  onBackToHome
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedClassification, setSelectedClassification] = useState<'all' | 'FATO' | 'FAKE'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'fundamental' | 'medio'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'facil' | 'medio' | 'dificil'>('all');

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set<string>();
    QUESTIONS_DATABASE.forEach((q) => {
      if (q.category) set.add(q.category);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATABASE.filter((q) => {
      // Classification filter
      if (selectedClassification !== 'all' && q.classification !== selectedClassification) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && q.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && q.educationLevel !== selectedLevel) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(term);
        const matchesText = q.text.toLowerCase().includes(term);
        const matchesExplanation = q.explanation.toLowerCase().includes(term);
        const matchesSource = q.sourceName.toLowerCase().includes(term);
        const matchesCategory = q.category.toLowerCase().includes(term);
        const matchesAlteration = q.alterationDetail?.toLowerCase().includes(term) || false;
        return matchesTitle || matchesText || matchesExplanation || matchesSource || matchesCategory || matchesAlteration;
      }

      return true;
    });
  }, [searchTerm, selectedCategory, selectedClassification, selectedLevel, selectedDifficulty]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedClassification('all');
    setSelectedLevel('all');
    setSelectedDifficulty('all');
  };

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedCategory !== 'all' || 
    selectedClassification !== 'all' || 
    selectedLevel !== 'all' || 
    selectedDifficulty !== 'all';

  return (
    <div className="min-h-[calc(100vh-61px)] py-4 sm:py-8 2xl:py-12 px-3 sm:px-6 lg:px-8 2xl:px-12 max-w-6xl 2xl:max-w-7xl mx-auto space-y-4 sm:space-y-6 2xl:space-y-8">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-slate-200">
        <div>
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs 2xl:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors mb-2 cursor-pointer group min-h-[36px]"
          >
            <ArrowLeft className="w-4 h-4 2xl:w-5 2xl:h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Voltar para a Página Inicial</span>
          </button>
          
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <h1 className="text-xl sm:text-3xl md:text-4xl 2xl:text-5xl font-black text-slate-900 font-display tracking-tight">
              Banco Completo de Notícias Verificadas
            </h1>
            <span className="px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs 2xl:text-sm font-black">
              {QUESTIONS_DATABASE.length} notícias
            </span>
          </div>
          <p className="text-xs sm:text-sm 2xl:text-base text-slate-500 mt-1 max-w-3xl">
            Catálogo pedagógico com todas as notícias reais, fakes com alterações propositais, explicações detalhadas e fontes verificáveis com links.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="self-start sm:self-auto px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs 2xl:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[36px]"
          >
            <RotateCcw className="w-3.5 h-3.5 2xl:w-4 2xl:h-4" />
            <span>Limpar Filtros</span>
          </button>
        )}
      </div>

      {/* Filter and Search Controls */}
      <section aria-label="Filtros de busca" className="bg-white rounded-3xl p-4 sm:p-6 2xl:p-8 border border-slate-200/90 shadow-google space-y-4 2xl:space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por palavra-chave, tema, fonte (G1, UOL, Folha, Lupa...) ou detalhe da notícia..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-100 rounded-2xl text-sm font-medium text-slate-800 transition-all outline-hidden"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Categories Horizontal Chips */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span>Filtrar por Categoria:</span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              Todas ({QUESTIONS_DATABASE.length})
            </button>
            {categories.map((cat) => {
              const count = QUESTIONS_DATABASE.filter((q) => q.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? 'all' : cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`ml-1.5 text-[10px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary filters: Classificação, Ensino, Dificuldade */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          {/* Fato ou Fake */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Classificação:
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'FATO', label: 'Fatos' },
                { id: 'FAKE', label: 'Fakes' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedClassification(opt.id as any)}
                  className={`py-1.5 px-2 rounded-lg font-bold border transition-all cursor-pointer text-center ${
                    selectedClassification === opt.id
                      ? opt.id === 'FATO'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : opt.id === 'FAKE'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-800 text-white border-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Etapa de Ensino */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Etapa Escolar:
            </label>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'fundamental', label: 'Fundam.' },
                { id: 'medio', label: 'Médio' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedLevel(opt.id as any)}
                  className={`py-1.5 px-2 rounded-lg font-bold border transition-all cursor-pointer text-center ${
                    selectedLevel === opt.id
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dificuldade */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Dificuldade:
            </label>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'all', label: 'Todas' },
                { id: 'facil', label: 'Fácil' },
                { id: 'medio', label: 'Médio' },
                { id: 'dificil', label: 'Difícil' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(opt.id as any)}
                  className={`py-1.5 px-1 rounded-lg font-bold border transition-all cursor-pointer text-center ${
                    selectedDifficulty === opt.id
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
        <span>
          Mostrando <strong>{filteredQuestions.length}</strong> de <strong>{QUESTIONS_DATABASE.length}</strong> notícias cadastradas
        </span>
        {filteredQuestions.length === 0 && (
          <span className="text-rose-600">Nenhuma notícia encontrada com os filtros atuais.</span>
        )}
      </div>

      {/* Questions Grid / List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isFato = q.classification === 'FATO';

          return (
            <article 
              key={q.id}
              className={`bg-white rounded-3xl p-5 sm:p-7 border-2 transition-all shadow-google hover:shadow-google-hover space-y-4 ${
                isFato ? 'border-emerald-200/80 hover:border-emerald-400' : 'border-rose-200/80 hover:border-rose-400'
              }`}
            >
              {/* Question Metadata & Classification Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center flex-wrap gap-2 text-xs">
                  <span className="font-extrabold text-slate-400 text-xs">
                    #{idx + 1}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    {q.category}
                  </span>

                  <span className="text-slate-300" aria-hidden="true">·</span>

                  <span className="text-slate-600 font-medium">
                    {q.educationLevel === 'fundamental' ? 'Ensino Fundamental' : 'Ensino Médio'}
                  </span>

                  <span className="text-slate-300" aria-hidden="true">·</span>

                  <span className="text-slate-500 capitalize">
                    Nível {q.difficulty}
                  </span>
                </div>

                {/* Big Pill: FATO or FAKE */}
                <div className="self-start sm:self-auto shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-2xs ${
                    isFato
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {isFato ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                    <span>{isFato ? 'É FATO!' : 'É FAKE!'}</span>
                  </span>
                </div>
              </div>

              {/* Title & Headline Statement */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display leading-snug">
                  {q.title}
                </h2>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Notícia apresentada para os alunos investigarem:
                  </span>
                  <p className="text-base sm:text-lg font-medium leading-relaxed italic text-slate-900">
                    "{q.text}"
                  </p>
                </div>
              </div>

              {/* Fake Alteration Detail Callout (if FAKE) */}
              {!isFato && q.alterationDetail && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <Info className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Detalhe Propositalmente Adulterado:</span>
                  </div>
                  <p className="leading-relaxed">
                    {q.alterationDetail}
                  </p>
                </div>
              )}

              {/* Pedagogical Explanation & Real Info */}
              <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100 space-y-2">
                  <div>
                    <strong className="text-slate-900 font-bold block mb-0.5">Explicação Detalhada:</strong>
                    <p className="leading-relaxed text-slate-600">
                      {q.explanation}
                    </p>
                  </div>

                  {q.originalOrCorrectedInfo && (
                    <div className="pt-2 border-t border-slate-200/60">
                      <strong className="text-slate-900 font-bold block mb-0.5">
                        {isFato ? 'Fato Comprovado:' : 'Informação Real e Corrigida:'}
                      </strong>
                      <p className="leading-relaxed text-slate-800 font-medium">
                        {q.originalOrCorrectedInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Source Verification Badge & URL */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-slate-800">Fonte Oficial Verificada:</span>
                  <span>{q.sourceName}</span>
                </div>

                {q.sourceUrl && (
                  <a
                    href={q.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors shrink-0"
                    title={`Acessar notícia original em ${q.sourceName}`}
                  >
                    <span>Acessar fonte ({q.sourceName.split('/')[0].trim()})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Back Button */}
      <div className="pt-6 pb-8 text-center">
        <button
          type="button"
          onClick={onBackToHome}
          className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-google inline-flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a Página Inicial</span>
        </button>
      </div>
    </div>
  );
};
