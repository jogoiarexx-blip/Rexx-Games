// Script para análise de bugs do Dragon Fury

const fs = require('fs');

console.log('🔍 ANALISANDO BUGS DO DRAGON FURY\n');

// 1. Verificar se dragon-escorts está carregado no HTML
const html = fs.readFileSync('index-advanced.html', 'utf8');
const escortLoaded = html.includes('dragon-escorts.js');
console.log(`✓ dragon-escorts.js carregado no HTML: ${escortLoaded ? '✅' : '❌'}`);

// 2. Verificar ordem de carregamento dos scripts
const scriptOrder = html.match(/<script src="([^"]+)"><\/script>/g);
console.log('\n📋 ORDEM DE CARREGAMENTO DOS SCRIPTS:');
scriptOrder.forEach((script, index) => {
    const filename = script.match(/src="([^"]+)"/)[1];
    console.log(`${index + 1}. ${filename}`);
});

// 3. Verificar dependências críticas
console.log('\n🔗 DEPENDÊNCIAS CRÍTICAS:');

const files = {
    'dragon-escorts.js': ['dragon', 'gameData', 'gameEntities', 'upgrades'],
    'integration.js': ['escortManager', 'phaseSystem', 'spawnSystem'],
    'upgrades.js': ['gameStats', 'ui', 'achievementManager'],
    'game.js': ['dragon', 'gameData', 'gameStats']
};

for (const [file, deps] of Object.entries(files)) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        console.log(`\n📄 ${file}:`);
        deps.forEach(dep => {
            const found = content.includes(dep);
            console.log(`  ${dep}: ${found ? '✅' : '❌'}`);
        });
    } catch (err) {
        console.log(`  ❌ Arquivo não encontrado: ${file}`);
    }
}

// 4. Verificar inicialização do escortManager
console.log('\n🎯 VERIFICANDO INICIALIZAÇÃO DO ESCORT MANAGER:');
const escortsContent = fs.readFileSync('dragon-escorts.js', 'utf8');
console.log(`  - Classe DragaoEscolta definida: ${escortsContent.includes('class DragaoEscolta') ? '✅' : '❌'}`);
console.log(`  - escortManager.init() definido: ${escortsContent.includes('init()') ? '✅' : '❌'}`);
console.log(`  - escortManager.activate() definido: ${escortsContent.includes('activate()') ? '✅' : '❌'}`);
console.log(`  - Exportado para window: ${escortsContent.includes('window.escortManager') ? '✅' : '❌'}`);

// 5. Verificar integração no game loop
const integrationContent = fs.readFileSync('integration.js', 'utf8');
console.log('\n🔄 INTEGRAÇÃO NO GAME LOOP:');
console.log(`  - escortManager.updateAll() no update: ${integrationContent.includes('escortManager.updateAll()') ? '✅' : '❌'}`);
console.log(`  - escortManager.drawAll() no draw: ${integrationContent.includes('escortManager.drawAll()') ? '✅' : '❌'}`);
console.log(`  - escortManager.init() no reset: ${integrationContent.includes('escortManager.init()') ? '✅' : '❌'}`);
console.log(`  - Verificação isActive(): ${integrationContent.includes('escortManager.isActive()') ? '✅' : '❌'}`);

// 6. Verificar sistema de upgrades
const upgradesContent = fs.readFileSync('upgrades.js', 'utf8');
console.log('\n⚡ SISTEMA DE UPGRADES:');
console.log(`  - Caso especial 'escorts': ${upgradesContent.includes("upgradeKey === 'escorts'") ? '✅' : '❌'}`);
console.log(`  - Chamada escortManager.activate(): ${upgradesContent.includes('escortManager.activate()') ? '✅' : '❌'}`);

// 7. Procurar por erros comuns
console.log('\n⚠️  POSSÍVEIS PROBLEMAS:');

const issues = [];

// Verificar se player.js define 'dragon'
const playerContent = fs.readFileSync('player.js', 'utf8');
if (!playerContent.includes('const dragon =') && !playerContent.includes('let dragon =') && !playerContent.includes('var dragon =')) {
    issues.push('❌ Variável "dragon" pode não estar definida em player.js');
} else {
    console.log('  ✅ Variável "dragon" encontrada em player.js');
}

// Verificar se data.js define gameData e gameStats
const dataContent = fs.readFileSync('data.js', 'utf8');
if (!dataContent.includes('gameData')) {
    issues.push('❌ Objeto "gameData" pode não estar definido em data.js');
}
if (!dataContent.includes('gameStats')) {
    issues.push('❌ Objeto "gameStats" pode não estar definido em data.js');
}

// Verificar se upgrades está definido antes de dragon-escorts.js
const upgradesIndex = scriptOrder.findIndex(s => s.includes('upgrades.js'));
const escortsIndex = scriptOrder.findIndex(s => s.includes('dragon-escorts.js'));
if (upgradesIndex > escortsIndex) {
    issues.push('❌ upgrades.js está sendo carregado DEPOIS de dragon-escorts.js');
}

// Verificar se entities.js define gameEntities
const entitiesContent = fs.readFileSync('entities.js', 'utf8');
if (!entitiesContent.includes('gameEntities')) {
    issues.push('❌ Objeto "gameEntities" pode não estar definido em entities.js');
}

if (issues.length > 0) {
    issues.forEach(issue => console.log(`  ${issue}`));
} else {
    console.log('  ✅ Nenhum problema crítico detectado');
}

console.log('\n📊 RESUMO DA ANÁLISE:');
console.log('================================');
console.log(`Total de arquivos JavaScript: ${scriptOrder.length}`);
console.log(`Problemas encontrados: ${issues.length}`);
console.log('================================\n');
