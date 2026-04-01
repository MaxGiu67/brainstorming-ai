#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

interface PhaseStatus {
  name: string;
  file: string;
  hasContent: boolean;
  progress: number;
  status: string;
}

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

function analyzeFile(filePath: string): { hasContent: boolean; progress: number } {
  if (!fs.existsSync(filePath)) {
    return { hasContent: false, progress: 0 };
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const words = countWords(content);

  const hasContent = words > 100;
  const progress = Math.min(100, Math.round((words / 300) * 100));

  return { hasContent, progress };
}

function determineStatus(hasContent: boolean, progress: number): string {
  if (!hasContent) return '⏳ In attesa';
  if (progress < 30) return '🔄 Bozza';
  if (progress < 70) return '📝 In lavorazione';
  return '✅ Completato';
}

function main() {
  const brainstormDir = parseArgs();

  if (!fs.existsSync(brainstormDir)) {
    console.error(`❌ Directory ${brainstormDir} non trovata!`);
    process.exit(1);
  }

  // Definisci fasi
  const phases: [string, string][] = [
    ['Brainstorm', '01-brainstorm.md'],
    ['Problem Framing', '02-problem-framing.md'],
    ['MVP Scope', '04-mvp-scope.md'],
  ];

  const phaseStatuses: PhaseStatus[] = [];

  phases.forEach(([name, file]) => {
    const filePath = path.join(brainstormDir, file);
    const { hasContent, progress } = analyzeFile(filePath);
    const status = determineStatus(hasContent, progress);

    phaseStatuses.push({ name, file, hasContent, progress, status });
  });

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

  tableContent += '## Stato Brainstorming\n';
  tableContent += '| Fase | File | Status | Progresso |\n';
  tableContent += '|------|------|--------|----------|\n';

  phaseStatuses.forEach((ps, i) => {
    const progressBar = `${'█'.repeat(Math.floor(ps.progress / 10))}${'░'.repeat(10 - Math.floor(ps.progress / 10))} ${ps.progress}%`;
    tableContent += `| ${i + 1}. ${ps.name} | ${ps.file} | ${ps.status} | ${progressBar} |\n`;
  });

  // Determina prossimi passi
  const completedCount = phaseStatuses.filter(ps => ps.progress >= 70).length;
  const firstIncomplete = phaseStatuses.find(ps => ps.progress < 70);

  tableContent += '\n## Prossimi Passi\n';
  if (completedCount === 0) {
    tableContent += '1. Eseguire /bs-brainstorm per la sessione con il trio creativo\n';
  } else if (completedCount === 1) {
    tableContent += '1. Eseguire /bs-problem per definire il problema (JTBD, ipotesi)\n';
  } else if (completedCount === 2) {
    tableContent += '1. Eseguire /bs-scope per decidere cosa costruire prima (MoSCoW)\n';
  } else {
    tableContent += '1. Perimetro MVP completato!\n';
    tableContent += '2. Sai SE l\'idea regge e COSA costruire.\n';
  }

  tableContent += `\n---\n_Ultimo aggiornamento: ${now}_\n`;

  // Scrivi _status.md
  fs.writeFileSync(existingStatusPath, tableContent, 'utf-8');

  // Stampa riepilogo
  console.log(`\n✅ Status brainstorming aggiornato!`);
  phaseStatuses.forEach((ps, i) => {
    console.log(`${i + 1}. ${ps.name}: ${ps.status} (${ps.progress}%)`);
  });
  console.log(`\n→ File salvato: ${existingStatusPath}`);
}

main();
