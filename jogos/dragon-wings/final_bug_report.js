const fs = require('fs');

console.log("╔═══════════════════════════════════════════════════════════╗");
console.log("║         🐛 RELATÓRIO COMPLETO DE BUGS - DRAGON FURY      ║");
console.log("╚═══════════════════════════════════════════════════════════╝\n");

const bugs = [];
const warnings = [];
const goodPractices = [];

// 1. Verificar collision-system.js - splice em forEach
const collisionContent = fs.readFileSync('collision-system.js', 'utf-8');
const collisionLines = collisionContent.split('\n');

collisionLines.forEach((line, idx) => {
    // Bug crítico: splice dentro de forEach
    if (line.match(/\.forEach.*\(.*index/i)) {
        for (let i = idx; i < Math.min(idx + 10, collisionLines.length); i++) {
            if (collisionLines[i].includes('.splice(index')) {
                bugs.push({
                    id: 'BUG-001',
                    file: 'collision-system.js',
                    line: i + 1,
                    severity: '🔴 CRÍTICO',
                    title: 'splice() dentro de forEach()',
                    description: 'Usar splice em forEach pode pular elementos',
                    impact: 'Colisões podem não ser detectadas corretamente',
                    fix: 'Usar loop reverso ou filter()'
                });
                break;
            }
        }
    }
});

// 2. Verificar player.js - bounds checking
if (fs.existsSync('player.js')) {
    const playerContent = fs.readFileSync('player.js', 'utf-8');
    const playerLines = playerContent.split('\n');
    
    let hasBoundsCheck = false;
    playerLines.forEach((line, idx) => {
        if (line.includes('dragon.x') && (line.includes('Math.max') || line.includes('Math.min'))) {
            hasBoundsCheck = true;
        }
    });
    
    if (hasBoundsCheck) {
        goodPractices.push('✅ player.js tem bounds checking');
    }
}

// 3. Verificar rank-system.js - divisão por zero
if (fs.existsSync('rank-system.js')) {
    const rankContent = fs.readFileSync('rank-system.js', 'utf-8');
    const rankLines = rankContent.split('\n');
    
    rankLines.forEach((line, idx) => {
        if (line.match(/\/\s*\w+\s*[;\)]/) && !line.includes('//')) {
            const hasCheck = rankLines.slice(Math.max(0, idx-3), idx).some(l => 
                l.includes('=== 0') || l.includes('!== 0') || l.includes('Math.max')
            );
            if (!hasCheck) {
                warnings.push({
                    id: 'WARN-001',
                    file: 'rank-system.js',
                    line: idx + 1,
                    severity: '🟡 AVISO',
                    title: 'Possível divisão por zero',
                    fix: 'Adicionar verificação ou usar Math.max(1, value)'
                });
            }
        }
    });
}

// 4. Verificar entities.js - referências de fase
const entitiesContent = fs.readFileSync('entities.js', 'utf-8');
const expectedPhases = [
    'phase1_ceuSereno',
    'phase2_tempestadeIminente',
    'phase3_furiaArdente',
    'phase4_abismoSombrio',
    'phase5_batalhaFinal'
];

expectedPhases.forEach((phaseName, i) => {
    if (!entitiesContent.includes(phaseName)) {
        bugs.push({
            id: `BUG-00${i+2}`,
            file: 'entities.js',
            line: 59 + i,
            severity: '🔴 CRÍTICO',
            title: `Referência incorreta para ${phaseName}`,
            description: `O arquivo entities.js não referencia ${phaseName} corretamente`,
            fix: `Adicionar referência: ${i+1}: typeof ${phaseName} !== 'undefined' ? ${phaseName} : null`
        });
    }
});

// 5. Verificar consistência de nomes
console.log("📊 ESTATÍSTICAS:\n");
console.log(`   Arquivos JavaScript: ${fs.readdirSync('.').filter(f => f.endsWith('.js')).length}`);
console.log(`   Linhas totais: ~${fs.readdirSync('.').filter(f => f.endsWith('.js')).reduce((sum, f) => {
    return sum + fs.readFileSync(f, 'utf-8').split('\n').length;
}, 0)}`);

console.log("\n🔴 BUGS CRÍTICOS ENCONTRADOS: " + bugs.length + "\n");
bugs.forEach(bug => {
    console.log(`[${bug.id}] ${bug.file}:${bug.line}`);
    console.log(`    ${bug.severity} ${bug.title}`);
    console.log(`    Descrição: ${bug.description || bug.impact}`);
    console.log(`    Correção: ${bug.fix}`);
    console.log('');
});

console.log("🟡 AVISOS: " + warnings.length + "\n");
warnings.slice(0, 5).forEach(warn => {
    console.log(`[${warn.id}] ${warn.file}:${warn.line}`);
    console.log(`    ${warn.title}`);
    console.log(`    Fix: ${warn.fix}`);
    console.log('');
});

console.log("✅ BOAS PRÁTICAS: " + goodPractices.length + "\n");
goodPractices.forEach(gp => console.log(`   ${gp}`));

console.log("\n" + "=".repeat(60));
console.log("RESUMO:");
console.log(`   🔴 Bugs Críticos: ${bugs.length}`);
console.log(`   🟡 Avisos: ${warnings.length}`);
console.log(`   ✅ Boas Práticas: ${goodPractices.length}`);
console.log("=".repeat(60));
