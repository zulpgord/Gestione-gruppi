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

## Capability dichiarate

`sample` (la pagina interroga Claude sull'account di chi guarda), `db` (le schede),
`user` (per sapere chi può scrivere).

## Modifiche

Modificare questo file e ripubblicarlo con lo stesso URL, altrimenti si crea un Artifact
separato. Da una conversazione nuova serve passare l'URL come `url`.
