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

