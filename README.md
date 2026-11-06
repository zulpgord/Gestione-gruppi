# Gestione gruppi

Set di agent per **Claude Code** / **Claude Agent SDK** a supporto del people management:
lettura delle dinamiche di gruppo, preparazione dei feedback, gestione del cambiamento
organizzativo e comunicazione interna.

Un agent orchestratore convoca quattro specialisti e restituisce una risposta unica e operativa:
diagnosi → ipotesi da verificare → piano a 7/30/90 giorni → le parole da dire → rischi.

## Contenuto

I file degli agent sono in [`Gestione gruppi/`](./Gestione%20gruppi).

| File | Ruolo | Modelli |
|---|---|---|
| `people-manager.md` | **Orchestratore** — punto d'ingresso, fa la diagnosi, convoca i sub-agent e sintetizza | base teorica completa |
| `group-dynamics-analyst.md` | Legge il gruppo: stadio di sviluppo, ruoli informali, sottogruppi, conflitti, clima | Tuckman, Edmondson, Lencioni, Belbin, Thomas-Kilmann |
| `feedback-coach.md` | Scrive lo script della conversazione, incluse le risposte alle reazioni probabili | SCARF, SBI, DESC, Crucial Conversations, Radical Candor, GROW |
| `change-architect.md` | Roadmap di cambiamento: coalizione, quick win, neutral zone, metriche di adozione | Kotter 8 steps, ADKAR, Lewin, Bridges, SCARF |
| `communication-strategist.md` | Mappa stakeholder, sequenza temporale, testi pronti per canale, Q&A scomode | SCARF applicato al wording |

## Installazione

Copia i cinque file `.md` in una delle due posizioni:

```bash
# globali, disponibili in ogni progetto
cp "Gestione gruppi"/*.md ~/.claude/agents/

# oppure di progetto, versionabili con il repo
cp "Gestione gruppi"/*.md <radice-progetto>/.claude/agents/
```

Non serve registrarli: il riconoscimento avviene dal frontmatter YAML in testa a ogni file.

## Uso

Non c'è bisogno di invocarli per nome. Descrivi la situazione e `people-manager` si attiva da
solo — la sua `description` intercetta frasi come *"il team non gira"*, *"devo dare un feedback"*,
*"riorganizzazione"*, *"non adottano il nuovo processo"*, *"c'è tensione fra due persone"*.

In alternativa, esplicito:

```
usa people-manager: il team si è rimescolato due mesi fa e le riunioni sono diventate silenziose
usa feedback-coach: devo preparare un richiamo su ritardi ripetuti
usa change-architect: stiamo introducendo un nuovo gestionale e metà reparto lo aggira
```

I sub-agent sono invocabili anche singolarmente, quando sai già quale angolo ti serve.

## Modelli di riferimento

- **Tuckman** — forming / storming / norming / performing / adjourning, incluse le regressioni
  provocate da nuovo membro, nuovo capo o nuovo obiettivo
- **SCARF** (Rock) — Status, Certainty, Autonomy, Relatedness, Fairness: usato sia come risk
  assessment prima di una conversazione difficile, sia per spiegare le resistenze al cambiamento
- **Kotter** — gli 8 step come struttura del piano di change
- **ADKAR** — usato come diagnostica: dove si è rotta la catena determina l'intervento
  (un problema di *Desire* non si risolve con più formazione)
- **Lewin** (unfreeze / change / refreeze) e **Bridges** (ending → neutral zone → new beginning)
- **Edmondson** (sicurezza psicologica), **Lencioni** (5 disfunzioni), **Belbin**,
  **Thomas-Kilmann**, **Radical Candor**, **Crucial Conversations**, **GROW**,
  **Situational Leadership**

## Note di configurazione

- Gli agent sono su `model: opus` — sono task di giudizio, non di volume. Per contenere i costi,
  i quattro sub-agent funzionano bene anche su `sonnet`: basta cambiare il campo `model:`.
- `people-manager` ha il tool `Agent` nel frontmatter: serve per convocare i sub-agent.
  Se l'ambiente di destinazione non consente il nesting, l'orchestrazione cade e l'agent
  principale risponde da solo — funziona comunque, perché ha la base teorica completa,
  ma si perde la profondità degli specialisti.
- I sub-agent partono a freddo e non vedono la conversazione: l'orchestratore passa loro il
  contesto. Se li invochi singolarmente, il contesto completo lo dai tu.
- Per team seguiti nel tempo, `people-manager` propone di tenere un file di lavoro
  `team-<nome>.md` con composizione, stadio Tuckman e storico degli interventi: lo stadio di
  sviluppo di un gruppo ha senso solo in serie storica.

## Limiti dichiarati

Ogni agent ha una sezione **Limiti** con vincoli espliciti, ed è una scelta di progetto:
senza quei vincoli questo tipo di agent tende a produrre consigli che funzionano *contro*
le persone invece che con loro.

- nessuna diagnosi clinica o etichetta psicologica sulle persone — solo comportamenti e impatti
- nessuno script manipolatorio o costruito per ottenere adesione con pressione indebita
- nessun piano di change o comunicazione che richieda di occultare informazioni rilevanti
- escalation esplicita a HR / legale su molestie, discriminazione, rischi per la salute,
  procedimenti disciplinari e obblighi di informazione e consultazione sindacale

Questi agent supportano il giudizio di un manager, non lo sostituiscono: la responsabilità
delle decisioni sulle persone resta di chi le prende.
