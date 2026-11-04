import React from 'react';
import { X, Search, Globe, Calendar, Image as ImageIcon, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FactCheckingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FactCheckingModal: React.FC<FactCheckingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const strategies = [
    {
      icon: Search,
      color: 'text-blue-600 bg-blue-50',
      title: '1. Leitura Lateral (Abra novas abas)',
      desc: 'Não fique apenas na página da notícia. Abra uma nova aba no Google e pesquise: "o que outros veículos confiáveis e agências de checagem dizem sobre esse mesmo acontecimento?".'
    },
    {
      icon: Globe,
      color: 'text-emerald-600 bg-emerald-50',
      title: '2. Avalie a Fonte Original',
      desc: 'Verifique quem publicou. É uma agência governamental (.gov.br), instituição científica reconhecida (Fiocruz, NASA, USP), ou um blog desconhecido sem expediente editorial?'
    },
    {
      icon: Calendar,
      color: 'text-amber-600 bg-amber-50',
      title: '3. Cheque a Data e o Contexto',
      desc: 'Muitas notícias falsas pegam acontecimentos antigos reais de 5 ou 10 anos atrás e os publicam como se fossem de hoje para gerar pânico ou indignação.'
    },
    {
      icon: ImageIcon,
      color: 'text-indigo-600 bg-indigo-50',
      title: '4. Atenção a Detalhes e Números',
      desc: 'Nas fake news bem elaboradas, a mentira costuma estar escondida em um detalhe específico: uma data errada, um número exagerado, um local invertido ou uma causa falsa.'
    },
    {
      icon: ShieldCheck,
      color: 'text-rose-600 bg-rose-50',
      title: '5. Cuidado com Títulos Sensacionalistas',
      desc: 'Se o texto usa muitas exclamações, letras maiúsculas ou afirma que "ninguém quer que você saiba disso", desconfie imediatamente.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fact-modal-title"
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <CheckCircle2 className="w-4 h-4" />
              Guia de Investigação Digital
            </div>
            <h2 id="fact-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Como Checar Notícias na Prática
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 mt-4 leading-relaxed">
          Oriente os alunos a utilizarem estas cinco técnicas consagradas de alfabetização midiática durante a rodada de 2 minutos e 30 segundos:
        </p>

        <div className="mt-5 space-y-3.5">
          {strategies.map((strat, idx) => {
            const Icon = strat.icon;
            return (
              <div key={idx} className="flex gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${strat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{strat.title}</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{strat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
          >
            Entendido, fechar guia
          </button>
        </div>
      </div>
    </div>
  );
};
