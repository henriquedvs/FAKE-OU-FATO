import React, { useEffect, useState, useRef } from 'react';
import { GroupScore, Question, PlayType } from '../types/game';
import { generateRankingCanvas } from '../utils/generateRankingImage';
import { Download, Copy, Check, X, Sparkles, Image as ImageIcon } from 'lucide-react';

interface RankingImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  groups: GroupScore[];
  questions: Question[];
  playType?: PlayType;
  soloScore?: number;
  soloCorrectCount?: number;
}

export const RankingImageModal: React.FC<RankingImageModalProps> = ({
  isOpen,
  onClose,
  groups,
  questions,
  playType = 'group',
  soloScore = 0,
  soloCorrectCount = 0
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      try {
        const canvas = generateRankingCanvas({
          groups,
          questions,
          playType,
          soloScore,
          soloCorrectCount
        });
        canvasRef.current = canvas;
        const dataUrl = canvas.toDataURL('image/png');
        setImageUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate ranking image:', err);
      }
    } else {
      setImageUrl(null);
      setIsCopied(false);
    }
  }, [isOpen, groups, questions, playType, soloScore, soloCorrectCount]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.download = `ranking-fake-ou-fato-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = imageUrl;
    link.click();
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        try {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2500);
        } catch {
          // If clipboard item write is blocked by iframe, fallback to alert or download
          handleDownload();
        }
      });
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 my-auto max-h-[95vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="image-modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Destaque & Certificado Oficial</span>
            </div>
            <h2 id="image-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              Imagem do Resultado com Ganhadores em Destaque
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pronto para compartilhar no projetor, imprimir ou enviar para as equipes e alunos.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview Container */}
        <div className="my-4 flex-1 overflow-auto rounded-2xl bg-slate-900/90 p-2 sm:p-4 border border-slate-700 flex items-center justify-center min-h-[300px]">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Resultado do Ranking com Ganhadores em Destaque" 
              className="max-h-[60vh] w-auto rounded-xl shadow-2xl object-contain border border-slate-800"
            />
          ) : (
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
              <span>Gerando imagem em alta resolução...</span>
            </div>
          )}
        </div>

        {/* Actions footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Imagem em alta resolução (1200 × 950 px) formato PNG</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Copiar imagem para a área de transferência"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600 stroke-[3]" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copiado!' : 'Copiar Imagem'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-google flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>BAIXAR IMAGEM (PNG)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
