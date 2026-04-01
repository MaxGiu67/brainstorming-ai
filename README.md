# Brainstorming AI Strutturato

Sei agenti AI che ti aiutano a passare da un'idea grezza a un perimetro MVP validato.

## Il percorso

```
Idea grezza
  │
  ▼
/bs-brainstorm ── Chiara esplode 30-50 idee
                  Nicola demolisce le deboli
                  Valentina sintetizza in 3 concept
  │
  ▼
/bs-problem ───── Matteo definisce il problema reale
                  JTBD, ipotesi testabili, metriche
  │
  ▼
/bs-scope ─────── Andrea decide cosa costruire prima
                  MoSCoW, anti-scope, milestone
  │
  ▼
"So SE l'idea regge e COSA costruire."
```

## Gli agenti

| Nome | Ruolo | Cosa fa |
|------|-------|---------|
| **Alessandro** | Orchestratore | Coordina il flusso, decide chi parla quando |
| **Chiara** | Divergent Explorer | Genera decine di idee senza filtro |
| **Nicola** | Devil's Advocate | Cerca di distruggere ogni idea debole |
| **Valentina** | Synthesizer | Converge su concept concreti con proposta MVP |
| **Matteo** | Problem Framer | Definisce il problema con JTBD e ipotesi testabili |
| **Andrea** | MVP Scoper | Prioritizza con MoSCoW: cosa dentro, cosa fuori |

Parla con loro direttamente usando `/bs-chat` e `@nome`.

## Installazione

### Opzione 1: Claude Code (CLI)

```bash
git clone https://github.com/MaxGiu67/brainstorming-ai.git
cd brainstorming-ai
bash install.sh
```

Riavvia Claude Code dopo l'installazione.

Per disinstallare:
```bash
bash install.sh --uninstall
```

### Opzione 2: Cowork (marketplace)

1. Apri **Cowork** nel browser
2. Vai su **Impostazioni** > **Plugin** > **Personale**
3. Clicca **Aggiungi marketplace**
4. Incolla: `MaxGiu67/brainstorming-ai`
5. Clicca **Sincronizza**
6. Installa il plugin dalla lista

Dopo l'installazione le 6 skill appaiono tra i comandi disponibili.

## Uso rapido

### 1. Inizializza

```
/bs-init
```

Ti chiede nome progetto, descrizione e idea. Crea la cartella `brainstorm/` con i template.

### 2. Brainstorming (trio creativo)

```
/bs-brainstorm
```

I 3 agenti lavorano in sequenza:
- **Chiara** esplode l'idea in 30-50 direzioni
- **Nicola** demolisce le idee deboli con ragioni concrete
- **Valentina** sintetizza in 3 concept con proposta MVP

### 3. Parla con gli agenti

```
/bs-chat
@Nicola cosa ne pensi del Concept 2?
@Valentina puoi approfondire il MVP del Concept 1?
@tutti quale concept ha più potenziale?
```

### 4. Problem Framing

```
/bs-problem
```

**Matteo** ti guida a definire il problema reale: JTBD, ipotesi testabili (H1/H2/H3), metriche di successo.

### 5. MVP Scoping

```
/bs-scope
```

**Andrea** prioritizza con MoSCoW: Must Have, Should Have, Could Have, Won't Have (anti-scope). Definisce milestone MVP.

### 6. Stato

```
/bs-status
```

Mostra il progresso di ogni fase.

## Esempio di sessione

```
> /bs-init
Nome: FitTracker
Idea: App che usa la fotocamera per contare le ripetizioni in palestra

> /bs-brainstorm
[Chiara genera 42 idee in 7 categorie]
[Nicola demolisce 28 idee, ne sopravvivono 14]
[Valentina sintetizza:]

Concept 1: "RepCount" — Computer vision per conteggio rep
Concept 2: "GymBuddy" — Social fitness con sfide tra amici
Concept 3: "FormCheck" — AI coach che corregge la postura

> /bs-chat
@Nicola quale concept ha meno rischi tecnici?

### Nicola (Devil's Advocate)
GymBuddy. Il social fitness è un problema risolto (UX),
non servono modelli ML custom. RepCount e FormCheck
dipendono dalla qualità del modello vision — se non funziona
bene al primo uso, l'utente non torna.

> /bs-problem
[Matteo: 6 domande → JTBD + 3 ipotesi + metriche]

> /bs-scope
[Andrea: 4 Must Have, 3 Should, 2 Could, 5 Won't Have]
```

## Struttura file generati

```
brainstorm/
├── _status.md              # Progresso (auto-aggiornato)
├── _changelog.md           # Log decisioni
├── 01-brainstorm.md        # Divergenza → Sfida → Sintesi
├── 02-problem-framing.md   # JTBD, ipotesi H1/H2/H3, metriche
└── 04-mvp-scope.md         # MoSCoW, anti-scope, milestone
```

## Requisiti

- [Claude Code](https://claude.ai/code) (CLI) oppure Cowork
- Node.js 18+ (per gli script TypeScript)
- Nessuna dipendenza npm da installare

## Disinstallazione

**Claude Code:**
```bash
cd brainstorming-ai
bash install.sh --uninstall
```

**Cowork:** Vai su Impostazioni > Plugin > brainstorming-ai > Disinstalla

## Licenza

MIT
