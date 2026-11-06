# Gestione gruppi

Set di agent per **Claude Code** / **Claude Agent SDK** a supporto del people management:
lettura delle dinamiche di gruppo, preparazione dei feedback, gestione del cambiamento
organizzativo e comunicazione interna.

Due componenti, con usi diversi:

- **5 agent** — un orchestratore che convoca quattro specialisti e restituisce una risposta
  unica e operativa: diagnosi → ipotesi da verificare → piano a 7/30/90 giorni → le parole da
  dire → rischi. Serve quando la situazione è confusa e va capita.
- **8 skill** — workflow ripetibili con raccolta guidata, template e output standard.
  Servono quando sai già cosa devi fare e vuoi farlo bene ogni volta.

> L'agent *ragiona* sulla situazione. La skill *esegue una procedura*.
> Se non sai da dove partire, descrivi il problema e lascia lavorare `people-manager`.
> Se sai già che devi preparare un feedback o un piano di change, chiama la skill.

## Agent

I file sono in [`Gestione gruppi/`](./Gestione%20gruppi).

| File | Ruolo | Modelli |
|---|---|---|
| `people-manager.md` | **Orchestratore** — punto d'ingresso, fa la diagnosi, convoca i sub-agent e sintetizza | base teorica completa |
| `group-dynamics-analyst.md` | Legge il gruppo: stadio di sviluppo, ruoli informali, sottogruppi, conflitti, clima | Tuckman, Edmondson, Lencioni, Belbin, Thomas-Kilmann |
| `feedback-coach.md` | Scrive lo script della conversazione, incluse le risposte alle reazioni probabili | SCARF, SBI, DESC, Crucial Conversations, Radical Candor, GROW |
| `change-architect.md` | Roadmap di cambiamento: coalizione, quick win, neutral zone, metriche di adozione | Kotter 8 steps, ADKAR, Lewin, Bridges, SCARF |
| `communication-strategist.md` | Mappa stakeholder, sequenza temporale, testi pronti per canale, Q&A scomode | SCARF applicato al wording |

## Skill

I file sono in [`Skills/`](./Skills), una cartella per skill con dentro `SKILL.md`.

| Skill | Cosa produce | Quando |
|---|---|---|
| `diagnosi-team` | scheda team con stadio Tuckman, punto di leva, interventi, metriche | il team non gira, silenzi in riunione, gruppo rimescolato |
| `prepara-feedback` | lo script della conversazione, con le risposte alle reazioni probabili | feedback correttivo o di riconoscimento, richiamo, review |
| `prepara-1to1` | agenda, domande scelte, cosa ascoltare, follow-up | 1:1 ricorrente, check-in su carico o motivazione, carriera |
| `gestisci-conflitto` | classificazione, interessi vs posizioni, percorso di mediazione | due persone non si parlano, due team si rimpallano |
| `facilita-retrospettiva` | scaletta minuto per minuto, domande, cosa fare se si blocca | retrospettiva, team charter, norm-setting, workshop |
| `piano-cambiamento` | roadmap a fasi con owner, quick win, metriche di adozione | riorganizzazione, nuovo gestionale, adozione mancata |
| `annuncio-organizzativo` | mappa stakeholder, sequenza, testi pronti per canale, Q&A | annuncio, cattiva notizia, cascading, town hall |
| `inserimento-nuovo` | piano 30/60/90 **più** l'adattamento del gruppo che riceve | nuovo assunto, trasferimento interno, nuovo manager |

Le skill si richiamano a vicenda dove ha senso: `diagnosi-team` precede
`facilita-retrospettiva` (il format si scegli sullo stadio del gruppo), e `piano-cambiamento`
precede `annuncio-organizzativo` (la comunicazione esegue il piano, non lo sostituisce).

## Uso da telefono (voce)

Istruzioni in [`Mobile/`](./Mobile). In sintesi: un Progetto su claude.ai con le istruzioni
di [`Mobile/ISTRUZIONI-PROGETTO.md`](./Mobile/ISTRUZIONI-PROGETTO.md) — che fondono i cinque
agent in un unico set riscritto per il parlato — più le skill caricate come zip.

Il criterio di progetto: **a voce la diagnosi e la prima mossa, per iscritto il piano.**
Uno script di feedback o una roadmap a fasi letti ad alta voce sono inascoltabili, quindi le
istruzioni tengono i turni parlati brevi e producono il documento strutturato solo su richiesta.

```bash
./Mobile/crea-zip-skills.sh      # genera gli 8 zip da caricare
```

## Installazione (desktop, Claude Code)

```bash
# agent — globali, disponibili in ogni progetto
cp "Gestione gruppi"/*.md ~/.claude/agents/

# skill — una cartella per skill
cp -R Skills/* ~/.claude/skills/
```

Per installarli solo su un progetto, usa `<radice-progetto>/.claude/agents/` e
`<radice-progetto>/.claude/skills/`.

Non serve registrare nulla: il riconoscimento avviene dal frontmatter YAML in testa a ogni file.

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

Le skill si invocano con lo slash, oppure si attivano da sole sulla descrizione:

```
/diagnosi-team
/prepara-feedback
/piano-cambiamento
```

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
