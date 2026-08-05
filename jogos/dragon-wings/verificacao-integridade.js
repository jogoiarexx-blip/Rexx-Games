// ===== SCRIPT DE VERIFICAÇÃO DE INTEGRIDADE - DRAGON FURY V2 =====
// Cole este código no Console do navegador (F12) para verificar o estado do jogo

(function() {
    console.clear();
    console.log('═══════════════════════════════════════════════════');
    console.log('🔍 DRAGON FURY - VERIFICAÇÃO DE INTEGRIDADE');
    console.log('═══════════════════════════════════════════════════\n');
    
    let totalChecks = 0;
    let passedChecks = 0;
    let criticalErrors = 0;
    
    function check(name, condition, critical = false) {
        totalChecks++;
        if (condition) {
            console.log(`✅ ${name}`);
            passedChecks++;
            return true;
        } else {
            if (critical) {
                console.error(`❌ CRÍTICO: ${name}`);
                criticalErrors++;
            } else {
                console.warn(`⚠️  ${name}`);
            }
            return false;
        }
    }
    
    console.log('📦 VERIFICANDO OBJETOS GLOBAIS\n');
    console.log('────────────────────────────────────────────────────');
    
    // Objetos fundamentais
    check('gameData existe', typeof gameData !== 'undefined', true);
    check('gameStats existe', typeof gameStats !== 'undefined', true);
    check('gameEntities existe', typeof gameEntities !== 'undefined', true);
    check('dragon existe', typeof dragon !== 'undefined', true);
    check('game existe', typeof game !== 'undefined', true);
    check('ui existe', typeof ui !== 'undefined', true);
    check('entities existe', typeof entities !== 'undefined', true);
    
    console.log('\n🎮 VERIFICANDO SISTEMAS DE JOGO\n');
    console.log('────────────────────────────────────────────────────');
    
    // Sistemas de jogo
    check('stages definido', typeof stages !== 'undefined', true);
    check('upgrades definido', typeof upgrades !== 'undefined');
    check('achievements definido', typeof achievements !== 'undefined');
    check('achievementManager existe', typeof achievementManager !== 'undefined');
    check('upgradeManager existe', typeof upgradeManager !== 'undefined');
    check('rankSystem existe', typeof rankSystem !== 'undefined');
    
    console.log('\n🐉 VERIFICANDO SISTEMAS ESPECIAIS\n');
    console.log('────────────────────────────────────────────────────');
    
    // Sistemas especiais
    check('escortManager existe', typeof escortManager !== 'undefined', true);
    check('BaseBoss existe', typeof BaseBoss !== 'undefined');
    check('bossVisualEnhancements existe', typeof bossVisualEnhancements !== 'undefined');
    check('phaseTransitions existe', typeof phaseTransitions !== 'undefined');
    check('parallaxSystem existe', typeof parallaxSystem !== 'undefined');
    check('phaseEffects existe', typeof phaseEffects !== 'undefined');
    
    console.log('\n🎨 VERIFICANDO EFEITOS VISUAIS\n');
    console.log('────────────────────────────────────────────────────');
    
    check('visualEffects existe', typeof visualEffects !== 'undefined');
    check('coinEffects existe', typeof coinEffects !== 'undefined');
    check('powerUpEffects existe', typeof powerUpEffects !== 'undefined');
    check('enemyVisualEffects existe', typeof enemyVisualEffects !== 'undefined');
    
    console.log('\n📊 VERIFICANDO ESTRUTURAS DE DADOS\n');
    console.log('────────────────────────────────────────────────────');
    
    if (typeof gameData !== 'undefined') {
        check('gameData.canvas existe', gameData.canvas !== null && gameData.canvas !== undefined);
        check('gameData.ctx existe', gameData.ctx !== null && gameData.ctx !== undefined);
        check('gameData.gameState definido', gameData.gameState !== undefined);
    }
    
    if (typeof gameEntities !== 'undefined') {
        check('gameEntities.fireballs é array', Array.isArray(gameEntities.fireballs));
        check('gameEntities.enemies é array', Array.isArray(gameEntities.enemies));
        check('gameEntities.particles é array', Array.isArray(gameEntities.particles));
        check('gameEntities.coins é array', Array.isArray(gameEntities.coins));
        check('gameEntities.powerups é array', Array.isArray(gameEntities.powerups));
    }
    
    console.log('\n🎯 VERIFICANDO DRAGÕES ESCOLTA\n');
    console.log('────────────────────────────────────────────────────');
    
    if (typeof escortManager !== 'undefined') {
        check('escortManager inicializado', escortManager.initialized === true);
        check('escortManager.escorts é array', Array.isArray(escortManager.escorts));
        check('escortManager.activate é função', typeof escortManager.activate === 'function');
        check('escortManager.updateAll é função', typeof escortManager.updateAll === 'function');
        check('escortManager.drawAll é função', typeof escortManager.drawAll === 'function');
        
        const escortsActive = escortManager.escorts.length > 0;
        console.log(escortsActive ? 
            `✨ ${escortManager.escorts.length} dragões escolta ativos` : 
            '💤 Dragões escolta inativos (compre o upgrade para ativar)');
    }
    
    console.log('\n👾 VERIFICANDO SISTEMA DE BOSSES\n');
    console.log('────────────────────────────────────────────────────');
    
    if (typeof BaseBoss !== 'undefined') {
        check('BaseBoss.prototype.draw existe', typeof BaseBoss.prototype.draw === 'function');
        check('BaseBoss.prototype.update existe', typeof BaseBoss.prototype.update === 'function');
        check('BaseBoss.prototype.takeDamage existe', typeof BaseBoss.prototype.takeDamage === 'function');
    }
    
    if (typeof bossVisualEnhancements !== 'undefined') {
        check('Boss: drawPhaseAura existe', typeof bossVisualEnhancements.drawPhaseAura === 'function');
        check('Boss: drawOrbitingParticles existe', typeof bossVisualEnhancements.drawOrbitingParticles === 'function');
        check('Boss: drawAnimatedEyes existe', typeof bossVisualEnhancements.drawAnimatedEyes === 'function');
        check('Boss: drawEnhancedHealthBar existe', typeof bossVisualEnhancements.drawEnhancedHealthBar === 'function');
    }
    
    console.log('\n🎪 VERIFICANDO FUNÇÕES DO GAME\n');
    console.log('────────────────────────────────────────────────────');
    
    if (typeof game !== 'undefined') {
        check('game.init é função', typeof game.init === 'function');
        check('game.startGame é função', typeof game.startGame === 'function');
        check('game.update é função', typeof game.update === 'function');
        check('game.draw é função', typeof game.draw === 'function');
        check('game.loop é função', typeof game.loop === 'function');
        check('game.pauseGame é função', typeof game.pauseGame === 'function');
        check('game.resumeGame é função', typeof game.resumeGame === 'function');
        check('game.gameOver é função', typeof game.gameOver === 'function');
        check('game.completeStage é função', typeof game.completeStage === 'function');
        check('game.nextStage é função', typeof game.nextStage === 'function');
    }
    
    console.log('\n🖼️  VERIFICANDO ELEMENTOS HTML\n');
    console.log('────────────────────────────────────────────────────');
    
    check('Canvas #gameCanvas existe', document.getElementById('gameCanvas') !== null, true);
    check('Menu #main-menu existe', document.getElementById('main-menu') !== null, true);
    check('HUD #hud existe', document.getElementById('hud') !== null);
    check('Stage Complete #stage-complete existe', document.getElementById('stage-complete') !== null);
    check('Game Over #game-over existe', document.getElementById('game-over') !== null);
    check('Pause Menu #pause-menu existe', document.getElementById('pause-menu') !== null);
    
    console.log('\n🔧 VERIFICANDO PATCHES APLICADOS\n');
    console.log('────────────────────────────────────────────────────');
    
    // Verificar se patches foram aplicados (se game.draw foi modificado)
    if (typeof game !== 'undefined' && typeof escortManager !== 'undefined') {
        const gameDrawString = game.draw.toString();
        const patchApplied = gameDrawString.includes('escortManager') || 
                           gameDrawString.includes('drawAll');
        check('Patch de dragões escolta aplicado', patchApplied);
    }
    
    // Verificar se UI patches foram aplicados
    if (typeof ui !== 'undefined') {
        const hideStageString = ui.hideStageComplete.toString();
        const uiPatchApplied = hideStageString.includes('stageCompleteCountdown') ||
                              hideStageString.includes('clearInterval');
        check('Patch de UI aplicado', uiPatchApplied);
    }
    
    console.log('\n📈 VERIFICANDO ESTADO DO JOGO\n');
    console.log('────────────────────────────────────────────────────');
    
    if (typeof gameData !== 'undefined') {
        console.log(`   Estado: ${gameData.gameState || 'Não definido'}`);
        console.log(`   Fase Atual: ${gameData.currentStage || 'Não iniciado'}`);
        console.log(`   Boss Ativo: ${gameData.bossActive ? 'Sim' : 'Não'}`);
    }
    
    if (typeof gameStats !== 'undefined') {
        console.log(`   Moedas: ${gameStats.coins || 0}`);
        console.log(`   Pontuação: ${gameStats.score || 0}`);
        console.log(`   Vida: ${gameStats.health || 100}`);
        console.log(`   Poder de Fogo: ${gameStats.firepower || 1}`);
    }
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📊 RESULTADO DA VERIFICAÇÃO');
    console.log('═══════════════════════════════════════════════════\n');
    
    const percentage = Math.round((passedChecks / totalChecks) * 100);
    
    console.log(`Total de Verificações: ${totalChecks}`);
    console.log(`Passaram: ${passedChecks} (${percentage}%)`);
    console.log(`Falharam: ${totalChecks - passedChecks}`);
    console.log(`Erros Críticos: ${criticalErrors}\n`);
    
    if (criticalErrors > 0) {
        console.error('❌ ERROS CRÍTICOS DETECTADOS!');
        console.error('   O jogo pode não funcionar corretamente.');
        console.error('   Verifique se todos os arquivos foram carregados.\n');
    } else if (percentage >= 95) {
        console.log('✅ EXCELENTE! Sistema está funcionando perfeitamente!');
        console.log('   Todos os componentes críticos estão presentes.\n');
    } else if (percentage >= 80) {
        console.log('⚠️  BOM, mas alguns componentes opcionais estão faltando.');
        console.log('   O jogo deve funcionar, mas pode ter funcionalidades limitadas.\n');
    } else {
        console.warn('⚠️  ATENÇÃO! Muitos componentes estão faltando.');
        console.warn('   Verifique se todos os scripts foram carregados corretamente.\n');
    }
    
    console.log('═══════════════════════════════════════════════════');
    
    // Retornar objeto com resultado
    return {
        total: totalChecks,
        passed: passedChecks,
        failed: totalChecks - passedChecks,
        critical: criticalErrors,
        percentage: percentage,
        healthy: criticalErrors === 0 && percentage >= 80
    };
})();
