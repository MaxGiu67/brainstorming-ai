#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

function parseArgs(): string {
  const args = process.argv.slice(2);
  let brainstormDir = './brainstorm';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--brainstorm-dir' && i + 1 < args.length) {
      brainstormDir = args[i + 1];
      i++;
    }
  }

  return brainstormDir;
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

function main() {
  const brainstormDir = parseArgs();

  if (!fs.existsSync(brainstormDir)) {
    console.error(`❌ Directory ${brainstormDir} non trovata!`);
    process.exit(1);
  }

  // Analizza 01-brainstorm.md
  const brainstormFile = path.join(brainstormDir, '01-brainstorm.md');
  let hasContent = false;
  let progress = 0;
  let status = '⏳ In attesa';

  if (fs.existsSync(brainstormFile)) {
    const content = fs.readFileSync(brainstormFile, 'utf-8');
    const words = countWords(content);

    hasContent = words > 100;
    progress = Math.min(100, Math.round((words / 300) * 100));

    if (!hasContent) status = '⏳ In attesa';
    else if (progress < 30) status = '🔄 Bozza';
    else if (progress < 70) status = '📝 In lavorazione';
    else status = '✅ Completato';
  }

  // Leggi info progetto dal _status.md esistente
  let projectName = 'Progetto';
  const existingStatusPath = path.join(brainstormDir, '_status.md');
  if (fs.existsSync(existingStatusPath)) {
    const existingContent = fs.readFileSync(existingStatusPath, 'utf-8');
    const nameMatch = existingContent.match(/\*\*Nome\*\*:\s*(.+)/);
    if (nameMatch) {
      projectName = nameMatch[1].trim();
    }
  }

  // Costruisci status
  const now = new Date().toISOString();
  let tableContent = `# Status Brainstorming: ${projectName}\nUltimo aggiornamento: ${now}\n\n`;

  // Mantieni info progetto
  if (fs.existsSync(existingStatusPath)) {
    const existingContent = fs.readFileSync(existingStatusPath, 'utf-8');
    const projectSection = existingContent.match(/## Progetto\n([\s\S]*?)(?=\n## Stato)/);
    if (projectSection) {
      tableContent += `## Progetto\n${projectSection[1]}`;
    }
  }

  const progressBar = `${'█'.repeat(Math.floor(progress / 10))}${'░'.repeat(10 - Math.floor(progress / 10))} ${progress}%`;

  tableContent += '## Stato Brainstorming\n';
  tableContent += '| Fase | File | Status | Progresso |\n';
  tableContent += '|------|------|--------|----------|\n';
  tableContent += `| Brainstorm | 01-brainstorm.md | ${status} | ${progressBar} |\n`;

  tableContent += '\n## Prossimi Passi\n';
  if (!hasContent) {
    tableContent += '1. Eseguire /bs-brainstorm per la sessione con il trio creativo\n';
  } else if (progress < 100) {
    tableContent += '1. Completare la sessione di brainstorming\n';
    tableContent += '2. Scegliere il concept migliore\n';
  } else {
    tableContent += '1. Scegliere il concept migliore tra i 3 proposti\n';
    tableContent += '2. Approfondire il concept scelto\n';
  }

  tableContent += `\n---\n_Ultimo aggiornamento: ${now}_\n`;

  // Scrivi _status.md
  fs.writeFileSync(existingStatusPath, tableContent, 'utf-8');

  // Stampa riepilogo
  console.log(`\n✅ Status brainstorming aggiornato!`);
  console.log(`Brainstorm: ${status} (${progress}%)`);
  console.log(`\n→ File salvato: ${existingStatusPath}`);
}

main();
