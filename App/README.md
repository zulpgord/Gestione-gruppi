# App (Artifact)

`gestione-gruppi.html` è il sorgente dell'app pubblicata come Artifact privato su claude.ai:
**https://claude.ai/artifact/7aczbLrtrGQkHj4j1jhrVW**

Non è un file da aprire nel browser: funziona solo dentro il viewer di Claude, perché usa
le *runtime capabilities* dell'Artifact.

## Cosa fa

- **Dettatura in entrata.** Il microfono della tastiera del telefono è a livello di sistema
  operativo, quindi funziona in qualunque campo di testo. La Web Speech API per l'ascolto,
  invece, non è disponibile: il frame degli Artifact rifiuta le device API e il microfono
  non è fra le capability concesse.
- **Due registri.** *A voce*: turni di 2-5 frasi, una domanda per volta, nessuna tabella,
  modelli non nominati. *Scritto*: il documento completo con titoli, tabelle e script.
  Cambiano le istruzioni inviate, non solo lo stile.
- **Lettura ad alta voce** della risposta (`speechSynthesis`, voce it-IT quando presente).
- **Schede dei team** nel database dell'Artifact: si salvano dalle risposte e si allegano a
  una conversazione nuova, così lo stadio di un gruppo resta in serie storica.

## Versione 2 — follow-up, contesto, ripresa

- **Impegni con le date.** Sotto una risposta, *Archivia* fa estrarre a Claude la scheda del
  team e gli impegni concreti (chi, cosa, entro quando), traducendo "questa settimana" o
  "a 90 giorni" in date vere. Li correggi, li salvi, e restano nella vista **Aperti** che si
  apre all'avvio, con gli scaduti in evidenza e la spunta per chiuderli. Un badge sul menu
  dice quanti sono. È il pezzo che distingue un consulente da un sistema di gestione: un piano
  senza follow-up è un documento.
- **Schede strutturate.** Non più il testo grezzo della risposta ma campi estratti
  (composizione, stadio, sicurezza psicologica, diagnosi, interventi, rischi): compatte da
  allegare a una conversazione nuova, e senza il rischio di far scoppiare il contesto.
- **Il tuo contesto.** Settore, reparto, ruolo, rapporto con HR, vincoli: si compila una volta
  e viene allegato a ogni conversazione, con l'istruzione di non richiederlo. Le risposte
  smettono di essere generiche e si risparmiano due o tre giri di domande.
- **Ripresa.** La conversazione in corso resta in `localStorage` (per-dispositivo, dieci giorni):
  se chiudi l'app, al rientro trovi "Riprendi".
- **Scarica.** Il piano scritto esce come file `.md` tramite la capability `downloads`, da
  allegare a una mail invece di copiarlo a mano.

## Versione 3 — la plancia

Seconda vista, accanto alla conversazione. Legge gli stessi dati, non ne aggiunge di nuovi
a mano.

- **Riga KPI** — casi segnati, in lavorazione, risolti, e impegni oltre la data.
- **Avanzamento** — un numero: quota di impegni presi che risultano chiusi, con il conteggio
  accanto. Sotto il titolo c'è scritto cosa *non* misura: se il problema è risolto. Uno score
  senza la sua definizione è un numero che si presta a essere letto male.
- **Impegni chiusi per settimana** — otto settimane, barre, una sola serie (quindi nessuna
  legenda: il titolo nomina il dato), tooltip al passaggio e una vista tabella alternativa.
  Serve a vedere la cosa che conta: una riga piatta a zero con casi aperti vuol dire che il
  follow-up si è fermato.
- **Casi** — per ognuno lo stadio del gruppo come percorso a cinque passi, la sicurezza
  psicologica a tre tacche, i bisogni SCARF sotto pressione, la barra degli impegni, la
  prossima scadenza, e i pulsanti per metterlo in lavorazione, risolverlo o riaprirlo.

### Il tocco HR, come informazione e non come decorazione

Lo stadio Tuckman e il livello di sicurezza psicologica erano già nelle schede, ma come testo
libero: illeggibili a colpo d'occhio e inutilizzabili. Ora l'estrazione restituisce anche
`stadioCodice`, `sicurezzaLivello` e `scarf`, con le definizioni operative nel prompt
(storming = conflitto su priorità e metodo; sicurezza bassa = non si ammettono errori e il
dissenso non arriva in riunione). Diventano un percorso, un indicatore e cinque pastiglie —
e dove la sicurezza è bassa la plancia lo dice a parole: *qui si interviene prima di tutto
il resto*.

I valori estratti sono correggibili a mano prima del salvataggio: due menu e cinque caselle
nel pannello Archivia.

### Colore

Gli stati non si affidano mai alla tinta: ogni pastiglia porta puntino **e** parola. Non è
pignoleria — il validatore della palette misura i colori di stato *warning* e *serious* a
1,77 e 2,55 di contrasto sulla superficie chiara, cioè quasi invisibili come riempimento, e
rosso contro verde sono a ΔE 4,1 in deuteranopia. Le barre dei dati usano il blu sequenziale,
distinto dall'ocra dell'interfaccia, così un segno di dato non si confonde con un comando.

## Modello dati

| Percorso | Cosa contiene |
|---|---|
| `schede/<id>` | `titolo`, `stato` (aperto·corso·risolto), i sei campi di testo, `stadioCodice`, `sicurezzaLivello`, `scarf[]`, `aggiornata`, `creata` |
| `impegni/<id>` | `testo`, `chi`, `scadenza` (AAAA-MM-GG), `fatto`, `chiuso`, `scheda`, `creato` |
| `profilo/mio` | i cinque campi del contesto, `aggiornato` |

`impegni.chiuso` è l'unica fonte del grafico settimanale, e `impegni.scheda` collega gli
impegni al caso per nome: rinominare un caso scollega i suoi impegni.

La conversazione in corso non sta nel database: è una comodità del singolo dispositivo e vive
in `localStorage`.

## Capability dichiarate

`sample` (la pagina interroga Claude sull'account di chi guarda), `db` (schede, impegni,
contesto), `user` (per sapere chi può scrivere), `downloads` (l'export `.md`).

## Modifiche

Modificare questo file e ripubblicarlo con lo stesso URL, altrimenti si crea un Artifact
separato. Da una conversazione nuova serve passare l'URL come `url`.

## Versione 4 — tasti in alto, guida, know-how

- **Barra dei tasti** sotto la testata, sempre visibile e scorrevole in orizzontale: Aperti
  (con il contatore), Il tuo contesto, Guida, Nuova. Il menu a tendina è stato eliminato:
  niente più due tocchi per arrivare a una cosa che si usa ogni volta.
- **Guida** come terza vista: i cinque passi del flusso, i due registri, come si legge lo
  score e perché la riga piatta del grafico conta più della percentuale, cosa conviene fare,
  e dove l'app si ferma.
- **Know-how** in fondo alla guida: 22 modelli in quattro famiglie, ciascuno con autore e
  anno, a cosa serve, il contenuto, e l'errore che si fa. In blocchi richiudibili (`details`),
  così la vista non è un muro.

Il contenuto del know-how è la fonte di [`../Know-how/modelli.md`](../Know-how/modelli.md),
estratto con `../Know-how/estrai.mjs`: l'app e il documento non possono divergere.

## Versione 5-12 — il Diario, e la profondità

Fra la v4 e questa, un'altra sessione ha aggiunto il **Diario**: i casi diventano note `.md`
nel vault Bejelith su Drive (`Lavoro / Gestione gruppi`), le modifiche fatte nelle note — stato
del caso, spunte sugli impegni — rientrano nell'app alla sincronizzazione, una nota con il tag
`caso-team` può diventare un caso, e le ultime note del diario possono dare contesto al
consulente (disattivabile dal pannello Diario). Usa la capability `mcp` con il connettore
Google Drive. **Quella parte non è stata verificata in questa sessione**: nessuna chiamata
reale a Drive è stata osservata qui, quindi i nomi degli argomenti e la forma delle risposte
restano da confermare sull'uso.

Sopra quella base è stata fusa la pass grafica, senza toccare una riga del Diario:

- **Elevazione a token** — `--e1`, `--e2`, `--e3` sono ombre a più strati (non una sfocatura
  sola), con `--ring` come filo di luce sul bordo alto e `--sunk` per le piste incassate. In
  tema scuro le ombre non si leggono, quindi sono ridefinite più nere e il filo di luce
  diventa un velo chiaro all'1-5%: è una palette scelta, non un'inversione.
- **3D dove informa** — le tessere KPI e le card dei casi si inclinano di 2-5 gradi seguendo
  il mouse, con `perspective` sul contenitore. Solo con puntatore fine: al tocco non si
  attiva, perché un dito non ha un "dove sta" continuo e l'effetto diventerebbe un tremolio.
- **Movimento che riporta un dato** — le barre del grafico crescono dalla linea di base in
  sequenza, le piste si riempiono dallo zero, i numeri contano fino al valore. Chi guarda vede
  da dove viene la misura, non solo quanto vale.
- **Risposta al tocco** — pressione dei tasti con affondamento e ombra che cala, pastiglie che
  si alzano al passaggio, pannelli a comparsa che salgono con sfondo sfocato, testata che si
  stacca con un'ombra quando il contenuto le scorre sotto.

Tutto passa da `@media (prefers-reduced-motion: reduce)`, e `conta()`, `riempi()` e `inclina()`
controllano la preferenza anche in JavaScript: con il movimento ridotto i numeri compaiono già
finiti e l'inclinazione non si registra affatto.

`fondi-esempio.mjs` è lo script usato per fondere quella pass sulla versione pubblicata da
un'altra sessione: applica sostituzioni esatte e si rifiuta di scrivere se una non corrisponde
una volta sola. Resta qui come esempio del modo meno rischioso di modificare questo file a
quattro mani.

## Versione 13 — i tredici difetti

### Privacy (il più serio)

Il database era dichiarato **senza regole**, quindi valeva il default: chiunque potesse aprire
l'artifact ed essere firmato leggeva casi, diagnosi, livelli di sicurezza psicologica e impegni
con le iniziali delle persone. Invisibile finché l'app resta privata, disastroso il giorno in
cui la condividi. Ora `schede`, `impegni`, `profilo` e `diario` hanno `read: admin,
write: admin`: leggono solo il proprietario e chi ha accesso in modifica. **Verificato** con una
lettura a livello `view` e una a livello `interact`: entrambe non restituiscono nulla.

I percorsi dei documenti non sono stati spostati — c'erano già casi reali, e una migrazione di
percorso li avrebbe orfanati. Le regole ottengono lo stesso risultato senza toccare un dato.

Il **contesto dal diario personale** ora è **spento per impostazione predefinita**: accenderlo
significa mandare a Claude anche le note private, e un'istruzione di riservatezza nel prompt è
una richiesta di comportamento, non un filtro.

### La plancia mentiva

- **Lo score contava tutti gli impegni**, risolti inclusi: un caso chiuso bene lo teneva alto
  per sempre, uno vecchio con impegni mai spuntati lo teneva basso in eterno. Ora conta solo i
  casi aperti e in lavorazione, e il sottotitolo lo dice.
- **Gli impegni erano collegati al caso per nome**: rinominare un caso li scollegava, e due casi
  omonimi se li scambiavano. Ora c'è `casoId`; il titolo resta come ripiego per le righe già
  scritte, così nulla si rompe.

### Perdita di dati e scala

- **Annulla** sull'eliminazione di un impegno: una barra per dodici secondi che lo riscrive con
  lo stesso id. Era l'unico punto dove un tocco di troppo perdeva un dato per sempre.
- **Export** in Markdown di casi, impegni e contesto, dalla plancia.
- **Finestre alzate** (200 casi, 600 impegni) e ordinate per data, con un avviso visibile quando
  il limite è raggiunto: prima le cose sparivano in silenzio.
- **La conversazione in corso** è anche in `data/users/me/sessione`, privato per costruzione:
  la riprendi da un altro dispositivo. `localStorage` resta come copia locale immediata.

### Difetti che avevo introdotto io con la grafica

- I numeri **ripartivano da zero a ogni modifica** del database, perché la plancia si ridisegna
  a ogni snapshot. Ora l'animazione parte solo al primo disegno e quando entri nella vista.
- I ridisegni sono **accorpati in un frame** e la **posizione di scorrimento** viene conservata.
- Il **tooltip del grafico** non si apriva al tocco (`mouseenter` non arriva da un dito): ora
  risponde anche a `pointerdown`, con chiusura dopo due secondi e mezzo.

### Diario

- `update_file` del connettore Drive **cambia solo i metadati**: l'ho verificato sullo schema del
  tool, quindi il commento nel codice era giusto e il ciclo crea-e-cestina è forzato. Mitigato
  tenendo l'**impronta del testo**: una nota identica non viene riscritta, e la cronologia di
  Drive si spezza molto meno spesso.
- La ricerca delle note da importare girava su **tutto il Drive**: ora è limitata alle due
  cartelle del vault, con due query separate, e scarica al massimo quattro file.
- Ripieghi su `nextPageToken`/`next_page_token` e su `viewUrl`, i soli campi di risposta che
  restano non verificati.

Gli **argomenti** delle quattro chiamate a Drive sono invece verificati sugli schemi dei tool:
`fileId`, `title`, `parentId`, `textContent`, `contentMimeType`,
`disableConversionToGoogleType`, `query`, `pageSize`, `excludeContentSnippets`. Tutti corretti.

`correzioni-v13.mjs` è lo script usato: 36 sostituzioni esatte, con rifiuto a scrivere se una
non corrisponde una volta sola.

