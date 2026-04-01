# Brainstorming AI Strutturato

Tre agenti AI che ti aiutano a validare un'idea prima di investirci tempo e soldi.

## Come funziona

Il brainstorming segue 3 fasi con 3 agenti diversi:

1. **Esplosione** — Chiara (Divergent Explorer) genera 30-50 angoli diversi sulla tua idea, senza filtri e senza giudizio
2. **Demolizione** — Nicola (Devil's Advocate) prende quelle idee e cerca di distruggerle con ragioni di mercato, tecniche e di prodotto
3. **Sintesi** — Valentina (Synthesizer) prende le idee sopravvissute e le trasforma in 3 concept concreti con proposta MVP

Alla fine hai 3 concept validati, ognuno con: proposta di valore, differenziazione, target, MVP minimo, rischi e effort stimato.

## Installazione

### Claude Code (consigliato)

```bash
git clone https://github.com/MaxGiu67/brainstorming-ai.git
cd brainstorming-ai
bash install.sh
```

Riavvia Claude Code dopo l'installazione.

### Manuale

```bash
git clone https://github.com/MaxGiu67/brainstorming-ai.git
cd brainstorming-ai
for skill in skills/bs-*/; do
  ln -sf "$(pwd)/$skill" ~/.claude/skills/$(basename $skill)
done
```

## Uso

### 1. Inizializza

```
/bs-init
```

Ti chiede nome progetto, descrizione e idea. Crea la cartella `brainstorm/` con i template.

### 2. Brainstorming

```
/bs-brainstorm
```

Avvia il trio creativo. I 3 agenti lavorano in sequenza:
- Chiara esplode l'idea in 30-50 direzioni
- Nicola demolisce le idee deboli
- Valentina sintetizza in 3 concept con MVP

Il risultato viene salvato in `brainstorm/01-brainstorm.md`.

### 3. Stato

```
/bs-status
```

Mostra il progresso della sessione.

## Esempio

```
> /bs-init
Nome: FitTracker
Descrizione: App per tracciare allenamenti in palestra
Idea: Un'app che usa la fotocamera per contare le ripetizioni automaticamente

> /bs-brainstorm
[Chiara genera 42 idee in 7 categorie]
[Nicola demolisce 28 idee, ne sopravvivono 14]
[Valentina sintetizza in 3 concept:]

Concept 1: "RepCount" — Computer vision per conteggio rep
Concept 2: "GymBuddy" — Social fitness con sfide tra amici
Concept 3: "FormCheck" — AI coach che corregge la postura

Quale preferisci?
```

## Struttura file generati

```
brainstorm/
├── _status.md          # Progresso (auto-aggiornato)
├── _changelog.md       # Log decisioni
└── 01-brainstorm.md    # Output del trio (Divergenza → Sfida → Sintesi)
```

## Requisiti

- [Claude Code](https://claude.ai/code) (CLI)
- Node.js 18+ (per gli script TypeScript)
- Nessuna dipendenza npm da installare

## Disinstallazione

```bash
cd brainstorming-ai
bash install.sh --uninstall
```

## Licenza

MIT
