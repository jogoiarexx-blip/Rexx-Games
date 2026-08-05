// ===== MELHORIAS VISUAIS PARA BOSSES - DRAGON FURY V2 =====

// Extensão para adicionar efeitos visuais aprimorados aos bosses
const bossVisualEnhancements = {
    
    // Aura pulsante ao redor do boss baseada na fase
    drawPhaseAura(ctx, boss) {
        const centerX = boss.x + boss.width / 2;
        const centerY = boss.y + boss.height / 2;
        const time = Date.now() * 0.001;
        
        // Cor da aura baseada na fase
        const phaseColors = {
            1: { inner: 'rgba(138, 43, 226, 0.3)', outer: 'rgba(138, 43, 226, 0)' },
            2: { inner: 'rgba(255, 69, 0, 0.4)', outer: 'rgba(255, 69, 0, 0)' },
            3: { inner: 'rgba(220, 20, 60, 0.5)', outer: 'rgba(220, 20, 60, 0)' }
        };
        
        const colors = phaseColors[boss.phase] || phaseColors[1];
        const pulseSize = Math.sin(time * 2) * 20 + 80;
        
        // Múltiplos anéis de aura
        for (let i = 0; i < 3; i++) {
            const radius = pulseSize + (i * 25);
            const alpha = 0.3 - (i * 0.1);
            
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );
            gradient.addColorStop(0, colors.inner.replace('0.', String(alpha) + '.'));
            gradient.addColorStop(1, colors.outer);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
        }
    },
    
    // Partículas orbitando o boss
    drawOrbitingParticles(ctx, boss) {
        if (!boss.orbitParticles) {
            boss.orbitParticles = [];
            const particleCount = boss.phase * 6;
            
            for (let i = 0; i < particleCount; i++) {
                boss.orbitParticles.push({
                    angle: (Math.PI * 2 / particleCount) * i,
                    distance: 80 + Math.random() * 40,
                    speed: 0.02 + Math.random() * 0.02,
                    size: 3 + Math.random() * 4,
                    color: boss.color,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }
        
        const centerX = boss.x + boss.width / 2;
        const centerY = boss.y + boss.height / 2;
        
        boss.orbitParticles.forEach(particle => {
            particle.angle += particle.speed;
            const wobble = Math.sin(Date.now() * 0.003 + particle.phase) * 10;
            const distance = particle.distance + wobble;
            
            const x = centerX + Math.cos(particle.angle) * distance;
            const y = centerY + Math.sin(particle.angle) * distance;
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = particle.color;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Traço atrás da partícula
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            const trailLength = 15;
            const trailX = x - Math.cos(particle.angle) * trailLength;
            const trailY = y - Math.sin(particle.angle) * trailLength;
            ctx.moveTo(x, y);
            ctx.lineTo(trailX, trailY);
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
        
        ctx.shadowBlur = 0;
    },
    
    // Olhos brilhantes e animados
    drawAnimatedEyes(ctx, boss) {
        const centerX = boss.x + boss.width / 2;
        const eyeY = boss.y + boss.height * 0.35;
        const eyeSpacing = boss.width * 0.25;
        const eyeSize = boss.width * 0.08;
        const time = Date.now() * 0.001;
        
        // Determinar cor dos olhos baseada na fase
        const eyeColors = {
            1: '#FF00FF',
            2: '#FF4500',
            3: '#FF0000'
        };
        const eyeColor = eyeColors[boss.phase] || '#FF00FF';
        
        // Piscar ocasionalmente
        const blinkTime = Math.sin(time * 0.5);
        const eyeHeight = blinkTime > 0.98 ? eyeSize * 0.2 : eyeSize;
        
        // Olho esquerdo
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = eyeColor;
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.ellipse(centerX - eyeSpacing, eyeY, eyeSize, eyeHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupila
        if (eyeHeight === eyeSize) {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(centerX - eyeSpacing, eyeY, eyeSize * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(centerX - eyeSpacing, eyeY, eyeSize * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Olho direito
        ctx.fillStyle = eyeColor;
        ctx.beginPath();
        ctx.ellipse(centerX + eyeSpacing, eyeY, eyeSize, eyeHeight, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Pupila
        if (eyeHeight === eyeSize) {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(centerX + eyeSpacing, eyeY, eyeSize * 0.4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(centerX + eyeSpacing, eyeY, eyeSize * 0.2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    },
    
    // Barra de vida aprimorada com efeitos
    drawEnhancedHealthBar(ctx, boss) {
        const barWidth = boss.width + 40;
        const barHeight = 12;
        const barX = boss.x + boss.width / 2 - barWidth / 2;
        const barY = boss.y - 30;
        
        // Sombra da barra
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(barX + 2, barY + 2, barWidth, barHeight);
        
        // Borda externa
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY, barWidth, barHeight);
        
        // Fundo da barra
        ctx.fillStyle = 'rgba(100, 0, 0, 0.8)';
        ctx.fillRect(barX + 2, barY + 2, barWidth - 4, barHeight - 4);
        
        // Barra de vida com gradiente
        const healthPercent = boss.health / boss.maxHealth;
        const healthWidth = (barWidth - 4) * healthPercent;
        
        // Cor baseada na porcentagem de vida
        let color1, color2;
        if (healthPercent > 0.66) {
            color1 = '#00FF00';
            color2 = '#7FFF00';
        } else if (healthPercent > 0.33) {
            color1 = '#FFD700';
            color2 = '#FFA500';
        } else {
            color1 = '#FF4500';
            color2 = '#FF0000';
        }
        
        const gradient = ctx.createLinearGradient(barX + 2, 0, barX + 2 + healthWidth, 0);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        ctx.fillStyle = gradient;
        ctx.fillRect(barX + 2, barY + 2, healthWidth, barHeight - 4);
        
        // Efeito de brilho na barra
        const glowGradient = ctx.createLinearGradient(0, barY, 0, barY + barHeight);
        glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        glowGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(barX + 2, barY + 2, healthWidth, (barHeight - 4) / 2);
        
        // Nome do boss
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.strokeText(boss.name, barX + barWidth / 2, barY - 8);
        ctx.fillText(boss.name, barX + barWidth / 2, barY - 8);
        
        // Indicador de fase
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#FF00FF';
        ctx.strokeText(`Fase ${boss.phase}/${boss.maxPhases}`, barX + barWidth / 2, barY + barHeight + 18);
        ctx.fillText(`Fase ${boss.phase}/${boss.maxPhases}`, barX + barWidth / 2, barY + barHeight + 18);
    },
    
    // Efeito de transição de fase
    drawPhaseTransitionEffect(ctx, boss) {
        if (!boss.phaseTransitionTime) return;
        
        const elapsed = Date.now() - boss.phaseTransitionTime;
        if (elapsed > 2000) {
            boss.phaseTransitionTime = null;
            return;
        }
        
        const centerX = boss.x + boss.width / 2;
        const centerY = boss.y + boss.height / 2;
        const radius = (elapsed / 2000) * 200;
        const alpha = 1 - (elapsed / 2000);
        
        // Onda de choque circular
        ctx.strokeStyle = `rgba(255, 0, 255, ${alpha})`;
        ctx.lineWidth = 5;
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#FF00FF';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        // Partículas explodindo
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const distance = radius * 0.7;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            
            ctx.fillStyle = `rgba(255, 0, 255, ${alpha * 0.8})`;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.shadowBlur = 0;
    },
    
    // Aplicar todas as melhorias visuais
    enhanceBossDraw(ctx, boss) {
        // Aura de fase
        this.drawPhaseAura(ctx, boss);
        
        // Partículas orbitantes
        this.drawOrbitingParticles(ctx, boss);
        
        // Efeito de transição de fase
        this.drawPhaseTransitionEffect(ctx, boss);
    },
    
    // Adicionar após o desenho do boss
    enhanceBossAfterDraw(ctx, boss) {
        // Olhos animados
        this.drawAnimatedEyes(ctx, boss);
        
        // Barra de vida aprimorada
        this.drawEnhancedHealthBar(ctx, boss);
    }
};

// Hook para adicionar ao BaseBoss.draw()
if (typeof BaseBoss !== 'undefined') {
    const originalDraw = BaseBoss.prototype.draw;
    BaseBoss.prototype.draw = function() {
        const ctx = gameData.ctx;
        
        // Melhorias antes do desenho
        bossVisualEnhancements.enhanceBossDraw(ctx, this);
        
        // Desenho original
        if (originalDraw) {
            originalDraw.call(this);
        }
        
        // Melhorias após o desenho
        bossVisualEnhancements.enhanceBossAfterDraw(ctx, this);
    };
    
    // Hook para onPhaseChange
    const originalOnPhaseChange = BaseBoss.prototype.onPhaseChange;
    BaseBoss.prototype.onPhaseChange = function() {
        this.phaseTransitionTime = Date.now();
        
        // Executar lógica original
        if (originalOnPhaseChange) {
            originalOnPhaseChange.call(this);
        }
    };
    
    console.log('✨ Melhorias visuais de boss aplicadas!');
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.bossVisualEnhancements = bossVisualEnhancements;
}
