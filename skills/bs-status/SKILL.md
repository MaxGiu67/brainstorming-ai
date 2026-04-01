---
name: bs-status
description: "Mostra dashboard stato brainstorming. Usa questa skill quando vuoi vedere lo stato, il progresso, o dici bs status, stato brainstorming, a che punto siamo, progresso."
---

# bs-status — Dashboard Brainstorming

Mostra lo stato di avanzamento del brainstorming con progresso visuale.

## Prerequisiti
- `brainstorm/` deve esistere

## Workflow

1. **Leggi** `brainstorm/_status.md` per lo stato corrente.

2. **Analizza** il file `01-brainstorm.md` per determinare completamento reale:
   - Conta parole, verifica sezioni compilate (Divergenza, Sfida, Sintesi)

3. **Mostra dashboard** con formato visuale:

   ```
   ## Brainstorming: [Nome Progetto]

   | Fase | Status | Progresso |
   |------|--------|-----------|
   | Brainstorm | ✅ Completato | ██████████ 100% |
   ```

4. **Suggerisci prossimi step** in base allo stato:
   - Se non iniziato → `/bs-brainstorm`
   - Se completato → "Scegli un concept e sviluppalo"

## Output
Dashboard testuale nella chat (non scrive file).
