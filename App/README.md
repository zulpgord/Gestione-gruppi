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

## Modello dati

| Percorso | Cosa contiene |
|---|---|
| `schede/<id>` | `titolo`, i sei campi della scheda, `aggiornata` |
| `impegni/<id>` | `testo`, `chi`, `scadenza` (AAAA-MM-GG), `fatto`, `scheda`, `creato` |
| `profilo/mio` | i cinque campi del contesto, `aggiornato` |

La conversazione in corso non sta nel database: è una comodità del singolo dispositivo e vive
in `localStorage`.

## Capability dichiarate

`sample` (la pagina interroga Claude sull'account di chi guarda), `db` (schede, impegni,
contesto), `user` (per sapere chi può scrivere), `downloads` (l'export `.md`).

## Modifiche

Modificare questo file e ripubblicarlo con lo stesso URL, altrimenti si crea un Artifact
separato. Da una conversazione nuova serve passare l'URL come `url`.
