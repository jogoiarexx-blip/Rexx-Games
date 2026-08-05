// ===== PATCH DE CORREÇÃO DE BUGS - DRAGON FURY V2 =====
// Aplique este script APÓS todos os outros scripts do jogo

(function() {
    console.log('🔧 Aplicando patches de correção...');
    
    // ================================
    // CORREÇÃO 1: Garantir que dragões escolta sejam desenhados
    // ================================
    if (typeof game !== 'undefined' && typeof escortManager !== 'undefined') {
        const originalGameDraw = game.draw;
        game.draw = function() {
            originalGameDraw.call(this);
            
            // Desenhar dragões escolta sempre que estiverem ativos
            if (escortManager.isActive()) {
                escortManager.drawAll();
            }
        };
        
        const originalGameUpdate = game.update;
        game.update = function() {
            originalGameUpdate.call(this);
            
            // Atualizar dragões escolta
            if (escortManager.isActive()) {
                escortManager.updateAll();
            }
        };
        
        console.log('✅ Patch de dragões escolta aplicado');
    }
    
    // ================================
    // CORREÇÃO 2: Garantir que telas sumam ao clicar
    // ================================
    if (typeof ui !== 'undefined') {
        const originalHideStageComplete = ui.hideStageComplete;
        ui.hideStageComplete = function() {
            console.log('🔄 Escondendo tela de Stage Complete...');
            
            // Limpar contador regressivo
            if (gameData.stageCompleteCountdown) {
                clearInterval(gameData.stageCompleteCountdown);
                gameData.stageCompleteCountdown = null;
            }
            
            // Limpar timer de transição automática
            if (gameData.stageCompleteTimer) {
                clearTimeout(gameData.stageCompleteTimer);
                gameData.stageCompleteTimer = null;
            }
            
            const stageCompleteDiv = document.getElementById('stage-complete');
            if (stageCompleteDiv) {
                stageCompleteDiv.style.display = 'none';
                console.log('✅ Tela de Stage Complete escondida');
            }
        };
        
        const originalHideGameOver = ui.hideGameOver;
        ui.hideGameOver = function() {
            console.log('🔄 Escondendo tela de Game Over...');
            const gameOverDiv = document.getElementById('game-over');
            if (gameOverDiv) {
                gameOverDiv.style.display = 'none';
                console.log('✅ Tela de Game Over escondida');
            }
        };
        
        console.log('✅ Patch de ocultação de telas aplicado');
    }
    
    // ================================
    // CORREÇÃO 3: Corrigir progressão de fases
    // ================================
    if (typeof game !== 'undefined' && typeof entities !== 'undefined') {
        // Armazenar a função original de spawn de boss
        const originalSpawnStageBoss = entities.spawnStageBoss;
        
        entities.spawnStageBoss = function() {
            // Verificação rigorosa antes de spawnar boss
            const currentStageData = stages[gameData.currentStage];
            
            if (!currentStageData) {
                console.error('❌ Dados da fase não encontrados!');
                return;
            }
            
            console.log(`🎯 Verificando spawn de boss:`);
            console.log(`   - Inimigos mortos: ${gameData.enemiesKilledThisStage}`);
            console.log(`   - Meta: ${currentStageData.targetKills}`);
            console.log(`   - Boss ativo: ${gameData.bossActive}`);
            
            // Só spawnar se atingiu o target E não há boss ativo
            if (gameData.enemiesKilledThisStage >= currentStageData.targetKills && 
                !gameData.bossActive) {
                
                console.log('✅ Condições atendidas, spawnando boss...');
                gameData.bossActive = true;
                
                // Chamar função original se existir
                if (originalSpawnStageBoss) {
                    originalSpawnStageBoss.call(this);
                }
            } else {
                console.log('⏳ Condições não atendidas ainda');
            }
        };
        
        console.log('✅ Patch de progressão de fases aplicado');
    }
    
    // ================================
    // CORREÇÃO 4: Adicionar validação ao incremento de inimigos mortos
    // ================================
    if (typeof entities !== 'undefined') {
        // Wrapper para garantir que contador funcione corretamente
        window.incrementEnemiesKilled = function() {
            gameData.enemiesKilledThisStage++;
            console.log(`💀 Inimigo morto! Total: ${gameData.enemiesKilledThisStage}/${gameData.stageTargetKills}`);
            
            // Atualizar HUD
            if (typeof ui !== 'undefined') {
                ui.updateHUD();
            }
        };
    }
    
    // ================================
    // CORREÇÃO 5: Melhorar feedback de upgrades
    // ================================
    if (typeof upgradeManager !== 'undefined') {
        const originalBuy = upgradeManager.buy;
        upgradeManager.buy = function(upgradeKey) {
            const result = originalBuy.call(this, upgradeKey);
            
            // Se é o upgrade de escorts e foi bem-sucedido
            if (upgradeKey === 'escorts' && result) {
                console.log('🐉 Upgrade de escorts comprado, ativando...');
                
                // Garantir ativação após pequeno delay
                setTimeout(() => {
                    if (typeof escortManager !== 'undefined') {
                        escortManager.activate();
                    }
                }, 200);
            }
            
            return result;
        };
        
        console.log('✅ Patch de upgrades aplicado');
    }
    
    // ================================
    // CORREÇÃO 6: Adicionar verificação de estado ao iniciar jogo
    // ================================
    if (typeof game !== 'undefined') {
        const originalStartGame = game.startGame;
        game.startGame = function() {
            console.log('🎮 Iniciando jogo...');
            
            // Limpar qualquer estado anterior
            if (gameData.stageCompleteTimer) {
                clearTimeout(gameData.stageCompleteTimer);
                gameData.stageCompleteTimer = null;
            }
            if (gameData.stageCompleteCountdown) {
                clearInterval(gameData.stageCompleteCountdown);
                gameData.stageCompleteCountdown = null;
            }
            
            // Esconder todas as telas
            document.getElementById('stage-complete').style.display = 'none';
            document.getElementById('game-over').style.display = 'none';
            document.getElementById('game-complete').style.display = 'none';
            
            // Chamar função original
            originalStartGame.call(this);
            
            console.log('✅ Jogo iniciado com sucesso');
        };
        
        console.log('✅ Patch de inicialização aplicado');
    }
    
    // ================================
    // CORREÇÃO 7: Validação adicional para o menu
    // ================================
    document.addEventListener('DOMContentLoaded', function() {
        // Verificar se todos os botões estão visíveis
        setTimeout(() => {
            const menuButtons = document.querySelectorAll('.menu-button');
            const menuContainer = document.getElementById('main-menu');
            
            if (menuButtons.length > 0 && menuContainer) {
                const containerHeight = menuContainer.offsetHeight;
                let totalButtonHeight = 0;
                
                menuButtons.forEach(btn => {
                    totalButtonHeight += btn.offsetHeight + 16; // altura + margin
                });
                
                if (totalButtonHeight > containerHeight * 0.8) {
                    console.warn('⚠️ Botões podem estar cortados!');
                    menuContainer.style.overflowY = 'auto';
                }
                
                console.log('✅ Validação de menu concluída');
            }
        }, 500);
    });
    
    // ================================
    // CORREÇÃO 8: Garantir que boss seja necessário para completar fase
    // ================================
    if (typeof game !== 'undefined') {
        const originalCompleteStage = game.completeStage;
        game.completeStage = function() {
            // Só permitir completar se o boss foi derrotado
            if (gameData.bossActive && gameEntities.boss !== null) {
                console.warn('⚠️ Boss ainda está ativo! Fase não pode ser completada.');
                return;
            }
            
            console.log('🎉 Fase completa!');
            
            // Chamar função original
            if (originalCompleteStage) {
                originalCompleteStage.call(this);
            }
        };
        
        console.log('✅ Patch de validação de completar fase aplicado');
    }
    
    console.log('🎉 Todos os patches aplicados com sucesso!');
    console.log('📋 Patches aplicados:');
    console.log('   1. ✅ Dragões escolta renderização');
    console.log('   2. ✅ Ocultação de telas');
    console.log('   3. ✅ Progressão de fases');
    console.log('   4. ✅ Contador de inimigos');
    console.log('   5. ✅ Feedback de upgrades');
    console.log('   6. ✅ Inicialização do jogo');
    console.log('   7. ✅ Validação de menu');
    console.log('   8. ✅ Validação de fase completa');
})();
