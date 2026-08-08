// ===== GEO-UTILS: helpers de polígonos para inimigos e bosses =====
// 🔧 NOVO: antes, a maioria dos corpos de inimigos/bosses era desenhada com
// ctx.arc()/ctx.ellipse() (curvas lisas). Estas funções desenham polígonos
// regulares (e "gemas" com pontas) que são usadas no lugar dessas curvas
// para dar um visual mais facetado/anguloso aos inimigos e chefes.

// Desenha (sem preencher/traçar) um polígono regular de N lados,
// centrado em (x, y), com raio `radius` e rotação opcional em radianos.
function drawPolygonPath(ctx, x, y, radius, sides, rotation = 0) {
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i + rotation;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
}

// Desenha um polígono "gema/estrela": alterna entre raio externo e interno
// a cada vértice, criando pontas — bom para núcleos/cristais mais agressivos.
function drawGemPath(ctx, x, y, outerRadius, innerRadius, points, rotation = 0) {
    ctx.beginPath();
    const total = points * 2;
    for (let i = 0; i < total; i++) {
        const angle = (Math.PI / points) * i + rotation;
        const r = (i % 2 === 0) ? outerRadius : innerRadius;
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
}

// Atalho: polígono já preenchido com o fillStyle atual
function fillPolygon(ctx, x, y, radius, sides, rotation = 0) {
    drawPolygonPath(ctx, x, y, radius, sides, rotation);
    ctx.fill();
}

// Atalho: pequeno diamante (losango) — usado em detalhes pequenos
// (escamas, cristais) que antes eram pontinhos circulares (ctx.arc).
function fillDiamond(ctx, x, y, radius, rotation = 0) {
    fillPolygon(ctx, x, y, radius, 4, rotation + Math.PI / 4);
}

if (typeof window !== 'undefined') {
    window.drawPolygonPath = drawPolygonPath;
    window.drawGemPath = drawGemPath;
    window.fillPolygon = fillPolygon;
    window.fillDiamond = fillDiamond;
}
