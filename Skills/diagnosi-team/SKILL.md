---
name: diagnosi-team
description: Conduce una diagnosi strutturata di un team di lavoro — stadio di sviluppo (Tuckman), sicurezza psicologica, ruoli informali, sottogruppi, disfunzioni, conflitti — e produce una scheda team con punto di leva e interventi. Usala quando il team "non gira", ci sono tensioni o silenzi in riunione, il gruppo è stato appena rimescolato, le performance collettive calano, o serve una fotografia del clima prima di un cambiamento.
---

# Diagnosi team

Workflow di diagnosi di un gruppo di lavoro. Produce una **scheda team** riutilizzabile nel tempo,
non un parere una volta sola.

Lavora in **italiano**. Tono professionale, nessuna retorica motivazionale.

## Fase 1 — Raccolta (non salterla)

Chiedi all'utente, in un blocco unico, solo ciò che non sai già dalla conversazione:

1. **Composizione** — quante persone, ruoli, anzianità nel team, sedi
2. **Storia** — da quanto esiste in questa forma; cosa è cambiato negli ultimi 6 mesi
   (nuovi ingressi, uscite, nuovo capo, nuovo obiettivo, riorganizzazione, taglio budget)
3. **Il sintomo** — cosa ti ha fatto pensare che ci sia un problema, con un episodio concreto
4. **Riunioni** — chi parla, chi tace, il dissenso arriva in riunione o dopo nei corridoi
5. **Rapporto** — sei il capo diretto, un pari, un capo di capi
6. **Cosa hai già provato** e com'è andata

Se l'utente porta solo giudizi ("sono demotivati", "c'è una persona tossica"), **chiedi i
comportamenti osservabili** prima di procedere. Una diagnosi costruita su etichette è inutile.

Se mancano elementi ma ce n'è abbastanza per iniziare, procedi dichiarando le assunzioni.
Non fare più di 6 domande in totale.

## Fase 2 — Analisi

Applica le lenti in quest'ordine, perché l'ordine conta:

### a. Sicurezza psicologica (Edmondson) — si valuta per prima
Indizi: si ammettono errori? si fanno domande "ingenue"? il dissenso è pubblico?
chi tace e da quanto? cosa succede a chi sbaglia?

**Se la sicurezza è bassa, è lì che si interviene.** Qualunque altro intervento — team building,
nuovi processi, OKR — su un gruppo che non si sente sicuro produce teatro, non cambiamento.
Dillo esplicitamente e non proporre altro prima.

### b. Stadio di sviluppo (Tuckman)
Colloca il gruppo e **motiva con 2-3 indizi osservabili**, non per sensazione.

- **Forming** — dipendenza dal leader, cortesia di superficie, nessun conflitto visibile, domande su ruoli e regole → *il leader serve direttivo: struttura, scopo, confini*
- **Storming** — conflitto su priorità e metodo, sfida all'autorità, sottogruppi, "si lavorava meglio prima" → *non sedare il conflitto: farlo emergere e trasformarlo in norma. Lo storming evitato torna sempre, più tardi e peggio*
- **Norming** — norme condivise, fiducia iniziale, autoregolazione → *coaching, e protezione delle norme appena nate*
- **Performing** — autonomia alta, conflitto sul merito e non sulle persone, responsabilità condivisa → *delega e rimozione ostacoli*
- **Adjourning** — chiusura, disimpegno anticipato, lutto → *senso, riconoscimento, chiusura rituale*

**Verifica sempre le regressioni:** un nuovo membro, un nuovo capo, un obiettivo cambiato o un
taglio riportano il gruppo indietro, di solito a storming. Se è questo il caso, è la spiegazione
principale e va detta per prima.

### c. Struttura informale
Leader informale, gatekeeper dell'informazione, capro espiatorio, il "pompiere" che disinnesca
ogni conflitto impedendone la risoluzione, i nodi isolati.
Mappa i **sottogruppi** e le **linee di faglia**: anzianità, sede, provenienza da fusioni,
competenza tecnica, chi era candidato al ruolo che hai tu.
Con **Belbin**, cerca i gap di ruolo: manca chi chiude? manca chi mette in discussione?

### d. Disfunzioni (Lencioni)
Assenza di fiducia → paura del conflitto → mancanza di impegno → elusione delle responsabilità
→ disattenzione ai risultati.
Identifica **il livello più basso rotto**: si interviene lì, non più in alto. Lavorare sui
risultati quando è rotta la fiducia è il modo più comune di perdere sei mesi.

### e. Conflitto, se presente
Classificalo: di **compito**, di **processo**, di **relazione**, di **status**.
Il conflitto di compito è utile e va alimentato; quello di relazione va trasformato o contenuto.
Con **Thomas-Kilmann**, indica lo stile adatto (competere, collaborare, compromettere, evitare,
accomodare) e perché in questo caso gli altri sono sbagliati.

## Fase 3 — Output

Produci esattamente questa struttura:

```markdown
# Scheda team — <nome> · <data>

## Composizione
Tabella: persona (iniziali o ruolo) | ruolo | in team da | note

## Diagnosi
**Sicurezza psicologica:** <livello> — su cosa lo deduci
**Stadio Tuckman:** <stadio> — 2-3 indizi osservabili
**Regressione in corso:** sì/no — causa
**Livello Lencioni rotto:** <livello>
**Conflitto:** natura e stile di gestione adatto

## Mappa del gruppo
Ruoli informali, sottogruppi, linee di faglia, nodi isolati.
Dove la struttura reale differisce dall'organigramma.

## Ipotesi da verificare
Cosa non sai ancora, e **come** lo verifichi: quale domanda in 1:1, quale riunione osservare,
quale dato guardare (turnover, ritardi consegne, partecipazione).

## Il punto di leva
Uno. Con la ragione per cui è quello e non un altro.

## Interventi
3-5, sequenziati. Per ognuno: nome, chi lo conduce, durata, cosa produce.
Orizzonte: questa settimana / 30 giorni / 90 giorni.

## Cosa NON fare
Gli errori tipici in questo stadio, specifici per questo caso.

## Metriche di verifica
Cosa osservare a 30 e 90 giorni per sapere se funziona. Comportamenti, non sentiment.

## Follow-up aperti
Checklist con date.
```

## Fase 4 — Persistenza

Proponi di salvare la scheda come `team-<nome>.md` nella cartella di lavoro dell'utente.
Lo stadio di sviluppo di un gruppo **ha senso solo in serie storica**: alla diagnosi successiva
rileggi il file, confronta e aggiungi una sezione datata invece di riscrivere da zero.

Se la scheda contiene valutazioni su persone identificabili, avvisa che il file non va messo in
repo condivisi o pubblici, e suggerisci iniziali o soli ruoli.

## Limiti

- Non diagnostichi persone: nessuna etichetta psicologica o clinica. Solo comportamenti e impatti.
- Le motivazioni di chi non è nella stanza sono **ipotesi verificabili**, mai conclusioni.
- Se gli indizi sono troppo pochi, dillo e indica le 3 osservazioni da raccogliere prima.
- Se emergono molestie, discriminazione, rischi per la salute o questioni disciplinari:
  interrompi la diagnosi e indica l'escalation a HR. Non è materia di modelli di leadership.

## Correlati

Per gli interventi che ne derivano: `prepara-feedback` (conversazioni individuali),
`facilita-retrospettiva` (intervento collettivo), `prepara-1to1` (raccolta dati in profondità).
