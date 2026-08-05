const fs = require('fs');

console.log("=== ANÁLISE DE BUGS - DRAGON FURY ===\n");

const files = fs.readdirSync('.').filter(f => f.endsWith('.js') && f !== 'analyze_bugs.js');

const bugs = [];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    
    lines.forEach((line, idx) => {
        const lineNum = idx + 1;
        
        // Bug 1: Comparação com undefined sem typeof
        if (line.match(/[^typeof\s]undefined/) && !line.includes('typeof') && !line.includes('//')) {
            bugs.push({
                file,
                line: lineNum,
                type: 'COMPARAÇÃO UNSAFE',
                code: line.trim(),
                severity: 'MÉDIA'
            });
        }
        
        // Bug 2: Splice dentro de loop sem decremento
        if (line.includes('.splice(') && !line.includes('i--') && lines[idx-1] && lines[idx-1].includes('for')) {
            bugs.push({
                file,
                line: lineNum,
                type: 'SPLICE EM LOOP',
                code: line.trim(),
                severity: 'ALTA'
            });
        }
        
        // Bug 3: Division by zero potencial
        if (line.match(/\/\s*\(/)) {
            bugs.push({
                file,
                line: lineNum,
                type: 'DIVISÃO POTENCIAL POR ZERO',
                code: line.trim(),
                severity: 'MÉDIA'
            });
        }
        
        // Bug 4: parseFloat/parseInt sem validação
        if ((line.includes('parseFloat') || line.includes('parseInt')) && !lines[idx+1]?.includes('isNaN')) {
            bugs.push({
                file,
                line: lineNum,
                type: 'PARSE SEM VALIDAÇÃO',
                code: line.trim(),
                severity: 'BAIXA'
            });
        }
    });
});

// Agrupar por severidade
const highBugs = bugs.filter(b => b.severity === 'ALTA');
const medBugs = bugs.filter(b => b.severity === 'MÉDIA');
const lowBugs = bugs.filter(b => b.severity === 'BAIXA');

console.log(`🔴 BUGS DE ALTA SEVERIDADE: ${highBugs.length}`);
highBugs.slice(0, 10).forEach(b => {
    console.log(`  ${b.file}:${b.line} - ${b.type}`);
    console.log(`    ${b.code.substring(0, 80)}`);
});

console.log(`\n🟡 BUGS DE MÉDIA SEVERIDADE: ${medBugs.length}`);
medBugs.slice(0, 10).forEach(b => {
    console.log(`  ${b.file}:${b.line} - ${b.type}`);
});

console.log(`\n🟢 BUGS DE BAIXA SEVERIDADE: ${lowBugs.length}`);

console.log(`\n📊 TOTAL: ${bugs.length} potenciais bugs encontrados`);
