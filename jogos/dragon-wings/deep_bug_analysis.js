const fs = require('fs');

console.log("=== ANÁLISE PROFUNDA DE BUGS ===\n");

const issues = [];

// Verificar collision-system.js
const collisionContent = fs.readFileSync('collision-system.js', 'utf-8');
const collisionLines = collisionContent.split('\n');

// Bug: splice em loop sem ajuste de índice
collisionLines.forEach((line, idx) => {
    if (line.includes('.splice(') && line.includes('index') && !line.includes('--')) {
        const prevLines = collisionLines.slice(Math.max(0, idx-5), idx).join('\n');
        if (prevLines.includes('forEach') || prevLines.includes('for')) {
            issues.push({
                file: 'collision-system.js',
                line: idx + 1,
                bug: 'SPLICE em forEach - pode pular elementos',
                severity: 'ALTA',
                fix: 'Usar loop reverso (for i-- ) ou filter()'
            });
        }
    }
});

// Verificar entities.js
const entitiesContent = fs.readFileSync('entities.js', 'utf-8');
if (!entitiesContent.includes('phase5_invasaoComica') && entitiesContent.includes('phase5_batalhaFinal')) {
    issues.push({
        file: 'entities.js',
        line: 63,
        bug: 'Nome de variável inconsistente',
        severity: 'MÉDIA',
        fix: 'Verificar se phase5_batalhaFinal está definida em phase5-invasao-cosmica.js'
    });
}

// Verificar game.js - timer de transição
const gameContent = fs.readFileSync('game.js', 'utf-8');
if (gameContent.includes('stageCompleteTimer') && !gameContent.includes('clearTimeout')) {
    const hasTimeout = gameContent.match(/clearTimeout.*stageCompleteTimer/);
    if (!hasTimeout) {
        issues.push({
            file: 'game.js',
            line: 159,
            bug: 'Timer pode não ser limpo corretamente',
            severity: 'BAIXA',
            fix: 'Já está corrigido nas linhas 172-175'
        });
    }
}

// Verificar player.js
if (fs.existsSync('player.js')) {
    const playerContent = fs.readFileSync('player.js', 'utf-8');
    if (!playerContent.includes('Math.max') && playerContent.includes('dragon.x -=')) {
        issues.push({
            file: 'player.js',
            bug: 'Jogador pode sair da tela',
            severity: 'MÉDIA',
            fix: 'Adicionar bounds checking'
        });
    }
}

console.log(`🔍 BUGS REAIS ENCONTRADOS: ${issues.length}\n`);

issues.forEach((issue, i) => {
    console.log(`${i+1}. [${issue.severity}] ${issue.file}:${issue.line || '??'}`);
    console.log(`   Bug: ${issue.bug}`);
    console.log(`   Fix: ${issue.fix}`);
    console.log('');
});

// Verificar arquivos faltantes
console.log("📁 VERIFICAÇÃO DE ARQUIVOS:");
const requiredFiles = [
    'phase1-ceu-sereno.js',
    'phase2-tempestade-iminente.js', 
    'phase3-furia-ardente.js',
    'phase4-abismo-sombrio.js',
    'phase5-invasao-cosmica.js'
];

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8');
        const varName = file.replace('.js', '').replace(/-/g, '_').replace('invasao_cosmica', 'batalhaFinal');
        if (content.includes(`const ${varName}`)) {
            console.log(`✅ ${file} - OK`);
        } else {
            console.log(`⚠️  ${file} - Nome de variável pode estar incorreto`);
        }
    } else {
        console.log(`❌ ${file} - FALTANDO`);
    }
});
