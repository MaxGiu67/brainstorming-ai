#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

interface ProjectConfig {
  name: string;
  description: string;
  idea: string;
  outputDir: string;
}

function parseArgs(): ProjectConfig {
  const args = process.argv.slice(2);
  let name = 'Nuovo Progetto';
  let description = 'Descrizione del progetto';
  let idea = '';
  let outputDir = './';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--name' && i + 1 < args.length) {
      name = args[i + 1];
      i++;
    } else if (args[i] === '--description' && i + 1 < args.length) {
      description = args[i + 1];
      i++;
    } else if (args[i] === '--idea' && i + 1 < args.length) {
      idea = args[i + 1];
      i++;
    } else if (args[i] === '--output-dir' && i + 1 < args.length) {
      outputDir = args[i + 1];
      i++;
    }
  }

  return { name, description, idea, outputDir };
}

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function main() {
  const config = parseArgs();
  const baseDir = path.join(config.outputDir, 'brainstorm');
  const now = new Date().toISOString();

  // Crea directory
  ensureDir(baseDir);

  // Crea _status.md
  const statusContent = `# Status Brainstorming: ${config.name}
Ultimo aggiornamento: ${now}

## Progetto
- **Nome**: ${config.name}
- **Descrizione**: ${config.description}
- **Idea**: ${config.idea || 'Da definire'}

## Stato Brainstorming
| Fase | File | Status | Progresso |
|------|------|--------|-----------|
| 1. Brainstorm | 01-brainstorm.md | ⏳ In attesa | 0% |
| 2. Problem Framing | 02-problem-framing.md | ⏳ In attesa | 0% |
| 3. MVP Scope | 04-mvp-scope.md | ⏳ In attesa | 0% |

## Prossimi Passi
1. Eseguire /bs-brainstorm per la sessione con il trio creativo
2. Scegliere il concept migliore tra i 3 proposti
3. Eseguire /bs-problem per definire il problema (JTBD)
4. Eseguire /bs-scope per decidere cosa costruire prima (MoSCoW)

---
_Ultimo aggiornamento: ${now}_
`;
  fs.writeFileSync(path.join(baseDir, '_status.md'), statusContent, 'utf-8');

  // Crea _changelog.md
  const changelogContent = `# Changelog Brainstorming: ${config.name}

## Formato
- **Data**: ISO timestamp
- **Agente**: nome agente
- **Decisione**: cosa è stato deciso/fatto
- **Contesto**: motivo/background

---

### Inizializzazione Brainstorming
- **Data**: ${now}
- **Agente**: init-brainstorm.ts
- **Decisione**: Creazione struttura iniziale brainstorm/
- **Contesto**: Progetto: ${config.name} — ${config.description}

---
`;
  fs.writeFileSync(path.join(baseDir, '_changelog.md'), changelogContent, 'utf-8');

  // Crea template 01-brainstorm.md
  const brainstormContent = `# Brainstorming: ${config.name}

> **Idea**: ${config.idea || 'Da definire'}

Sessione di brainstorming strutturato con trio: Divergent Explorer, Devil's Advocate, Synthesizer.

## Divergenza
_30-50 idee generate senza giudizio dal Divergent Explorer._

## Sfida
_Analisi critica delle idee con ragioni di mercato e tecniche dal Devil's Advocate._

## Sintesi
_3 concept solidi con proposta MVP per ciascuno dal Synthesizer._

---
_Generato da init-brainstorm.ts — ${now}_
`;
  fs.writeFileSync(path.join(baseDir, '01-brainstorm.md'), brainstormContent, 'utf-8');

  // Crea template 02-problem-framing.md
  const problemContent = `# Problem Framing: ${config.name}

Definizione del problema, JTBD, ipotesi testabili e metriche.

## Job-to-be-Done
_Quando [situazione], voglio [motivazione], così da [risultato atteso]._

## Ipotesi Testabili
### H1 — Critica
_Ipotesi fondamentale che, se falsa, invalida l'MVP._

### H2 — Importante
_Ipotesi significativa per il successo._

### H3 — Nice-to-have
_Ipotesi che arricchisce ma non è bloccante._

## Metriche
| Metrica | Target | Come misurare |
|---------|--------|---------------|
| Activation rate | — | — |
| Retention D7 | — | — |
| Retention D30 | — | — |
| Task success rate | — | — |

---
_Generato da init-brainstorm.ts — ${now}_
`;
  fs.writeFileSync(path.join(baseDir, '02-problem-framing.md'), problemContent, 'utf-8');

  // Crea template 04-mvp-scope.md
  const scopeContent = `# MVP Scope: ${config.name}

Definizione scope MVP con MoSCoW e anti-scope.

## MoSCoW
### Must Have
| Feature | Giustificazione (H/rischio) | Effort |
|---------|---------------------------|--------|

### Should Have
| Feature | Motivo |
|---------|--------|

### Could Have
| Feature | Motivo |
|---------|--------|

### Won't Have (Anti-Scope)
| Feature | Motivo esclusione |
|---------|------------------|

## Milestone
### MVP (v0.1)
_Scope minimo per validare H1._

### v0.2
_Estensioni prioritarie._

### v0.3
_Evoluzione successiva._

---
_Generato da init-brainstorm.ts — ${now}_
`;
  fs.writeFileSync(path.join(baseDir, '04-mvp-scope.md'), scopeContent, 'utf-8');

  // Stampa riepilogo
  console.log('\n✅ Brainstorming inizializzato con successo!\n');
  console.log(`📁 Nome: ${config.name}`);
  console.log(`📝 Descrizione: ${config.description}`);
  console.log(`💡 Idea: ${config.idea || 'Da definire'}`);
  console.log(`📂 Percorso base: ${baseDir}\n`);
  console.log('File creati:');
  console.log('  ✓ 01-brainstorm.md');
  console.log('  ✓ 02-problem-framing.md');
  console.log('  ✓ 04-mvp-scope.md');
  console.log('  ✓ _status.md');
  console.log('  ✓ _changelog.md');
  console.log('\n→ Prossimo passo: esegui /bs-brainstorm per la sessione con il trio creativo');
}

main();
