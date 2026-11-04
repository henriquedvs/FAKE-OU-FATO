import React from 'react';
import { Question } from '../types/game';
import { CheckCircle2, AlertTriangle, ExternalLink, ShieldAlert, Sparkles, BookCheck } from 'lucide-react';

interface RevealCardProps {
  question: Question;
}

export const RevealCard: React.FC<RevealCardProps> = ({ question }) => {
  const isFato = question.classification === 'FATO';

  return (
    <section 
      aria-labelledby="verdict-heading"
      className={`rounded-3xl p-6 sm:p-8 transition-all duration-500 shadow-google-hover border-2 ${
        isFato 
          ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-emerald-400' 
          : 'bg-gradient-to-b from-rose-600 to-rose-700 text-white border-rose-400'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-white/20">
        {/* Stamp & Classification Title */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          {/* Animated Stamp Badge */}
          <div 
            className={`animate-stamp inline-block px-6 py-2.5 rounded-2xl border-4 font-display font-black text-3xl sm:text-4xl tracking-widest uppercase shadow-2xl ${
              isFato 
                ? 'bg-white text-emerald-700 border-white rotate-[-4deg]' 
                : 'bg-white text-rose-700 border-white rotate-[-4deg]'
            }`}
          >
            {isFato ? '✓ FATO' : '✕ FAKE'}
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/90 text-xs uppercase font-bold tracking-wider">
              {isFato ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Notícia ou Informação Autêntica</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-amber-300" />
                  <span>Notícia ou Informação com Adulteração</span>
                </>
              )}
            </div>
            <h2 id="verdict-heading" className="text-xl sm:text-2xl font-black mt-1 font-display text-white">
              {question.title}
            </h2>
          </div>
        </div>

        {/* Education Category / Source Info */}
        <div className="text-center md:text-right shrink-0">
          <span className="inline-block px-3 py-1 rounded-full bg-black/20 text-white text-xs font-semibold backdrop-blur-xs">
            {question.category}
          </span>
        </div>
      </div>

      {/* Educational Content Area */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        {/* Left Column: Alteration or Confirmation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/15 backdrop-blur border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
            {isFato ? (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Confirmação Científica / Histórica</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-300" />
                <span>Onde Estava a Alteração?</span>
              </>
            )}
          </div>

          <p className="text-sm font-medium leading-relaxed text-white">
            {isFato 
              ? question.originalOrCorrectedInfo 
              : question.alterationDetail || 'Um detalhe essencial da notícia foi adulterado propositalmente.'
            }
          </p>

          {!isFato && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 block mb-0.5">
                Informação Correta:
              </span>
              <p className="text-sm text-white font-semibold">
                {question.originalOrCorrectedInfo}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Complete Educational Explanation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/15 backdrop-blur border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
            <BookCheck className="w-4 h-4 text-white" />
            <span>Explicação da Checagem</span>
          </div>

          <p className="text-sm leading-relaxed text-white/95">
            {question.explanation}
          </p>
        </div>
      </div>

      {/* Official Verifiable Source */}
      <div className="mt-5 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-white/90 text-center sm:text-left">
          <span className="font-bold uppercase tracking-wider text-[11px] text-white/80">Fonte Verificada:</span>
          <span className="font-semibold text-white">{question.sourceName}</span>
        </div>

        {question.sourceUrl && (
          <a
            href={question.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs transition-colors"
          >
            <span>Consultar Referência</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </section>
  );
};
