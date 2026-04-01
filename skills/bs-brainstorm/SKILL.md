---
name: bs-brainstorm
description: "Sessione di brainstorming strutturato con trio creativo (3 agenti AI). Usa questa skill quando vuoi fare brainstorming, generare idee, esplorare possibilità, validare un'idea, o dici brainstorm, genera idee, esplora idee, sessione creativa."
---

# bs-brainstorm — Trio Creativo

Sessione di brainstorming strutturato con 3 agenti AI specializzati: Divergent Explorer (esplosione idee), Devil's Advocate (demolizione critica), Synthesizer (sintesi in concept).

## Prerequisiti
- `brainstorm/` deve esistere (esegui `/bs-init` se non c'è)

## Workflow

### Modalità Cowork (Team)
1. Crea team Cowork `bs-brainstorm-<timestamp>`
2. Spawn 3 agenti con dependency chain:
   - **divergent-explorer** → scrive sezione "Divergenza" in `01-brainstorm.md`
   - **devils-advocate** → attende divergenza, poi scrive "Sfida"
   - **synthesizer** → attende sfida, poi scrive "Sintesi" con 3 concept

### Modalità Singola (senza Cowork)
1. **Fase Divergenza** — Agisci come Divergent Explorer:
   - Leggi contesto e idea del progetto da `brainstorm/01-brainstorm.md`
   - Genera 30-50 idee/angoli senza giudizio
   - Organizza per categorie (feature, modello business, tecnologia, UX, distribuzione)
   - Scrivi sezione "Divergenza" in `01-brainstorm.md`

2. **Fase Sfida** — Agisci come Devil's Advocate:
   - Leggi le idee generate
   - Per ogni idea/categoria principale, sfida con ragioni di mercato e tecniche
   - Identifica: rischi, competitor che già lo fanno, complessità nascoste
   - Scrivi sezione "Sfida" in `01-brainstorm.md`

3. **Fase Sintesi** — Agisci come Synthesizer:
   - Leggi divergenza e sfida
   - Convergi su 3 concept solidi (combinando idee sopravvissute alla sfida)
   - Per ogni concept: nome, proposta di valore, differenziazione, MVP minimo
   - Scrivi sezione "Sintesi" in `01-brainstorm.md`

4. **Chiedi all'utente** quale concept preferisce (o se vuole esplorare di più)

## Modalità Auto
Se `$ARGUMENTS` contiene `--auto`:
- Salta scelta utente del concept
- Seleziona automaticamente Concept #1

## Output
File: `brainstorm/01-brainstorm.md` (1000-1500 parole) con 3 sezioni:
- Divergenza (idee grezze)
- Sfida (analisi critica)
- Sintesi (3 concept con proposta MVP)

## Prossimo passo
→ `/bs-problem` per definire il problema reale del concept scelto (JTBD, ipotesi testabili, metriche)
→ `/bs-chat` per parlare con gli agenti e approfondire (es. `@Nicola cosa ne pensi del Concept 2?`)
