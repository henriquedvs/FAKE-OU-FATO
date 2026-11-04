import React from 'react';
import { X, Tv, Laptop, Clock, Trophy, HelpCircle } from 'lucide-react';

interface TeacherHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherHelpModal: React.FC<TeacherHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-modal-title"
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
              <HelpCircle className="w-4 h-4" />
              Orientações para o Professor
            </div>
            <h2 id="teacher-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Como Conduzir a Atividade na Sala
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

        <div className="mt-4 space-y-4">
          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-blue-900">1. Projeção na Televisão</h3>
              <p className="text-xs text-blue-800/90 mt-0.5 leading-relaxed">
                Abra esta tela na TV ou projetor em modo tela cheia. O cronômetro de 2 minutos e 30 segundos começará automaticamente a cada pergunta apresentada.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">2. Quatro Grupos de Estudantes</h3>
              <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                Divida a turma em 4 equipes (Grupo 01, Grupo 02, Grupo 03 e Grupo 04). Cada grupo deve utilizar um computador com internet para pesquisar fontes confiáveis e discutir se a notícia é FATO ou FAKE.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900">3. Investigação e Voto dos Grupos</h3>
              <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">
                Ao término dos 2m30s (ou quando todos terminarem a pesquisa), cada equipe levanta sua plaquinha ou escreve no papel sua resposta: FATO ou FAKE.
              </p>
            </div>
          </div>

          <div className="flex gap-3.5 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-purple-900">4. Revelação e Pontuação (+10 pontos)</h3>
              <p className="text-xs text-purple-800/90 mt-0.5 leading-relaxed">
                O professor clica em <strong>"REVELAR RESPOSTA"</strong>. O sistema mostra o veredito, a explicação educativa e a fonte. Em seguida, selecione os grupos que acertaram e confirme a pontuação para avançar.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm"
          >
            Fechar Instruções
          </button>
        </div>
      </div>
    </div>
  );
};
