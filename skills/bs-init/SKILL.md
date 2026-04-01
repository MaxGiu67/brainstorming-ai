---
name: bs-init
description: "Inizializza struttura brainstorm/ nel progetto. Usa questa skill quando vuoi iniziare un brainstorming, creare la struttura, o dici bs init, inizia brainstorming, nuovo brainstorming, setup."
---

# bs-init — Inizializza Brainstorming

Crea la struttura `brainstorm/` per una nuova sessione di brainstorming.

## Workflow

1. Chiedi all'utente con AskUserQuestion:
   - **Nome progetto**: nome del progetto
   - **Descrizione breve**: 2-3 frasi
   - **Idea in una frase**: l'idea principale

2. Esegui lo script di inizializzazione:
   ```bash
   npx tsx "${CLAUDE_PLUGIN_ROOT}/scripts/init-brainstorm.ts" --name "<nome>" --description "<descrizione>" --idea "<idea>" --output-dir "$(pwd)"
   ```

3. Verifica che la struttura sia stata creata:
   ```
   brainstorm/
   ├── _status.md
   ├── _changelog.md
   └── 01-brainstorm.md
   ```

4. Conferma completamento e suggerisci il prossimo step.

## Output

```
Brainstorming inizializzato: "<nome progetto>"
→ Prossimo step: /bs-brainstorm per la sessione con il trio creativo
```

## Prossimo passo
→ `/bs-brainstorm` per la sessione di brainstorming strutturato
