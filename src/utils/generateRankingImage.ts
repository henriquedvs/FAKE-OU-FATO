import { GroupScore, Question, PlayType } from '../types/game';

interface GenerateImageOptions {
  groups: GroupScore[];
  questions: Question[];
  playType?: PlayType;
  soloScore?: number;
  soloCorrectCount?: number;
}

export function generateRankingCanvas(options: GenerateImageOptions): HTMLCanvasElement {
  const { groups, questions, playType = 'group', soloScore = 0, soloCorrectCount = 0 } = options;
  const isSolo = playType === 'solo';

  const width = 1200;
  const height = 950;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#090d16');
  bgGrad.addColorStop(0.5, '#0f172a');
  bgGrad.addColorStop(1, '#1e293b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Decorative border
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // Subtle golden inner corner accents
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(35, 60);
  ctx.lineTo(35, 35);
  ctx.lineTo(60, 35);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(width - 60, 35);
  ctx.lineTo(width - 35, 35);
  ctx.lineTo(width - 35, 60);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(35, height - 60);
  ctx.lineTo(35, height - 35);
  ctx.lineTo(60, height - 35);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(width - 60, height - 35);
  ctx.lineTo(width - 35, height - 35);
  ctx.lineTo(width - 35, height - 60);
  ctx.stroke();

  // 2. Header Brand Logo: 4 colorful dots + "FAKE OU FATO?"
  const startX = 70;
  const startY = 70;

  // 4 colored dots
  const dotRadius = 9;
  ctx.fillStyle = '#ea4335';
  ctx.beginPath();
  ctx.arc(startX, startY, dotRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#34a853';
  ctx.beginPath();
  ctx.arc(startX + 18, startY, dotRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#4285f4';
  ctx.beginPath();
  ctx.arc(startX + 36, startY, dotRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fbbc05';
  ctx.beginPath();
  ctx.arc(startX + 54, startY, dotRadius, 0, Math.PI * 2);
  ctx.fill();

  // Brand title
  ctx.font = '900 32px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('FAKE', startX + 80, startY + 11);

  ctx.font = '700 22px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('OU', startX + 172, startY + 11);

  ctx.font = '900 32px sans-serif';
  ctx.fillStyle = '#34d399';
  ctx.fillText('FATO?', startX + 215, startY + 11);

  // Top Right Date and Category Badge
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  ctx.font = '700 14px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'right';
  ctx.fillText(`ATIVIDADE DE EDUCAÇÃO DIGITAL · ${dateStr}`, width - 70, startY + 8);
  ctx.textAlign = 'left';

  // Divider line
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 110);
  ctx.lineTo(width - 60, 110);
  ctx.stroke();

  // 3. Subtitle / Headline
  ctx.font = '900 38px sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(isSolo ? 'CERTIFICADO DE INVESTIGAÇÃO INDIVIDUAL' : 'CLASSIFICAÇÃO OFICIAL DO RANKING', 70, 160);

  const totalQuestions = questions.length;
  ctx.font = '500 16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText(`Partida finalizada com ${totalQuestions} notícias reais investigadas contra fake news e desinformação`, 70, 190);

  if (!isSolo) {
    // Standings calculation
    const sorted = [...groups].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.correctCount - a.correctCount;
    });

    const ranked = sorted.map((grp, idx, arr) => {
      const strictlyHigher = arr.filter((g) => g.score > grp.score).length;
      return { ...grp, rank: strictlyHigher + 1 };
    });

    const winners = ranked.filter((g) => g.rank === 1);
    const isTie = winners.length > 1;

    // 4. DESTAQUE DOS GANHADORES (Highlighted Golden Card)
    const winnerCardX = 70;
    const winnerCardY = 220;
    const winnerCardW = width - 140;
    const winnerCardH = 200;

    // Golden gradient fill
    const winnerGrad = ctx.createLinearGradient(winnerCardX, winnerCardY, winnerCardX + winnerCardW, winnerCardY + winnerCardH);
    winnerGrad.addColorStop(0, '#78350f');
    winnerGrad.addColorStop(0.3, '#451a03');
    winnerGrad.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = winnerGrad;
    roundRect(ctx, winnerCardX, winnerCardY, winnerCardW, winnerCardH, 24, true, false);

    // Glowing golden border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    roundRect(ctx, winnerCardX, winnerCardY, winnerCardW, winnerCardH, 24, false, true);

    // Winner header tag
    ctx.fillStyle = '#fbbf24';
    ctx.font = '900 16px sans-serif';
    ctx.fillText(isTie ? '🏆 EMPATE NO TOPO — CAMPEÕES DA PARTIDA' : '🏆 1º LUGAR — GRANDE CAMPEÃO DA INVESTIGAÇÃO', winnerCardX + 35, winnerCardY + 45);

    // Winner team name(s) in huge bold
    const winnerNames = winners.map((w) => w.name).join(' & ');
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px sans-serif';
    // Truncate if too long
    const displayWinnerName = winnerNames.length > 36 ? winnerNames.substring(0, 36) + '...' : winnerNames;
    ctx.fillText(displayWinnerName, winnerCardX + 35, winnerCardY + 105);

    // Winner score highlight
    const topScore = winners[0]?.score || 0;
    const topCount = winners[0]?.correctCount || 0;
    const pct = totalQuestions > 0 ? Math.round((topCount / totalQuestions) * 100) : 0;

    // Score pill
    ctx.fillStyle = '#f59e0b';
    roundRect(ctx, winnerCardX + 35, winnerCardY + 130, 200, 44, 12, true, false);
    ctx.fillStyle = '#000000';
    ctx.font = '900 20px sans-serif';
    ctx.fillText(`${topScore} PONTOS`, winnerCardX + 55, winnerCardY + 158);

    // Stats detail
    ctx.fillStyle = '#fef3c7';
    ctx.font = '700 18px sans-serif';
    ctx.fillText(`${topCount} de ${totalQuestions} notícias checadas com sucesso (${pct}% de precisão)`, winnerCardX + 255, winnerCardY + 158);

    // 5. Complete Standings Table (All groups)
    const tableY = 460;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '800 14px sans-serif';
    ctx.fillText('CLASSIFICAÇÃO GERAL DE TODAS AS EQUIPES:', 70, tableY - 15);

    // Draw row cards for each team
    const rowHeight = 48;
    const rowGap = 10;
    const maxRows = 8;
    const displayGroups = ranked.slice(0, maxRows);

    displayGroups.forEach((grp, idx) => {
      const curY = tableY + idx * (rowHeight + rowGap);
      const isFirst = grp.rank === 1;

      // Row background
      ctx.fillStyle = isFirst ? 'rgba(245, 158, 11, 0.15)' : '#0f172a';
      roundRect(ctx, 70, curY, width - 140, rowHeight, 14, true, false);

      ctx.strokeStyle = isFirst ? '#f59e0b' : '#334155';
      ctx.lineWidth = isFirst ? 2 : 1;
      roundRect(ctx, 70, curY, width - 140, rowHeight, 14, false, true);

      // Rank badge
      ctx.fillStyle = isFirst ? '#f59e0b' : '#94a3b8';
      ctx.font = '900 16px sans-serif';
      ctx.fillText(`${grp.rank}º`, 95, curY + 30);

      // Group color dot
      ctx.fillStyle = grp.color || '#2563eb';
      ctx.beginPath();
      ctx.arc(145, curY + 24, 7, 0, Math.PI * 2);
      ctx.fill();

      // Group name
      ctx.fillStyle = isFirst ? '#ffffff' : '#e2e8f0';
      ctx.font = isFirst ? '800 18px sans-serif' : '700 16px sans-serif';
      ctx.fillText(grp.name, 165, curY + 30);

      // Group stats on right
      ctx.textAlign = 'right';
      ctx.fillStyle = isFirst ? '#fbbf24' : '#ffffff';
      ctx.font = '900 18px sans-serif';
      ctx.fillText(`${grp.score} pts`, width - 95, curY + 30);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 14px sans-serif';
      ctx.fillText(`(${grp.correctCount}/${totalQuestions} acertos)`, width - 190, curY + 30);
      ctx.textAlign = 'left';
    });

  } else {
    // SOLO MODE IMAGE CARD
    const soloCardX = 70;
    const soloCardY = 230;
    const soloCardW = width - 140;
    const soloCardH = 400;

    const soloGrad = ctx.createLinearGradient(soloCardX, soloCardY, soloCardX + soloCardW, soloCardY + soloCardH);
    soloGrad.addColorStop(0, '#064e3b');
    soloGrad.addColorStop(0.5, '#0f172a');
    soloGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = soloGrad;
    roundRect(ctx, soloCardX, soloCardY, soloCardW, soloCardH, 24, true, false);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    roundRect(ctx, soloCardX, soloCardY, soloCardW, soloCardH, 24, false, true);

    ctx.fillStyle = '#34d399';
    ctx.font = '900 18px sans-serif';
    ctx.fillText('🔍 DESEMPENHO INDIVIDUAL DO INVESTIGADOR', soloCardX + 50, soloCardY + 60);

    // Title determination
    let title = 'Mestre da Checagem Digital';
    let subtitle = 'Nível Máximo · Visão Crítica e Olhar Analítico';
    if (soloScore < 40) {
      title = 'Aprendiz de Verificação';
      subtitle = 'Início da Jornada Investigativa';
    } else if (soloScore < 70) {
      title = 'Investigador em Treinamento';
      subtitle = 'Bom Desempenho e Constante Evolução';
    } else if (soloScore < 100) {
      title = 'Detetive Digital Avançado';
      subtitle = 'Alto Rendimento e Rigor Investigativo';
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px sans-serif';
    ctx.fillText(title, soloCardX + 50, soloCardY + 120);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = '600 18px sans-serif';
    ctx.fillText(subtitle, soloCardX + 50, soloCardY + 160);

    // Stat boxes
    const boxW = 280;
    const boxH = 120;
    const boxY = soloCardY + 200;

    // Score box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    roundRect(ctx, soloCardX + 50, boxY, boxW, boxH, 16, true, false);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    roundRect(ctx, soloCardX + 50, boxY, boxW, boxH, 16, false, true);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 14px sans-serif';
    ctx.fillText('PONTUAÇÃO TOTAL', soloCardX + 75, boxY + 40);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 44px sans-serif';
    ctx.fillText(`${soloScore} pts`, soloCardX + 75, boxY + 95);

    // Correct count box
    roundRect(ctx, soloCardX + 360, boxY, boxW, boxH, 16, true, false);
    roundRect(ctx, soloCardX + 360, boxY, boxW, boxH, 16, false, true);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 14px sans-serif';
    ctx.fillText('ACERTOS NA CHECAGEM', soloCardX + 385, boxY + 40);

    const pct = totalQuestions > 0 ? Math.round((soloCorrectCount / totalQuestions) * 100) : 0;
    ctx.fillStyle = '#34d399';
    ctx.font = '900 44px sans-serif';
    ctx.fillText(`${soloCorrectCount}/${totalQuestions}`, soloCardX + 385, boxY + 95);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '700 18px sans-serif';
    ctx.fillText(`(${pct}%)`, soloCardX + 530, boxY + 95);
  }

  // 6. Bottom Footer
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, height - 70);
  ctx.lineTo(width - 60, height - 70);
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 14px sans-serif';
  ctx.fillText('✓ Certificado emitido pela atividade pedagógica FAKE OU FATO? · Verificação crítica e combate à desinformação', 70, height - 40);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 14px sans-serif';
  ctx.fillText('Educação Digital Escolar', width - 70, height - 40);
  ctx.textAlign = 'left';

  return canvas;
}

// Helper to draw rounded rectangle in canvas
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: boolean,
  stroke: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
