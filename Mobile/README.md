# Uso da telefono

Come avere questo set su smartphone, con conversazione vocale, senza sviluppare niente.

## 1. Crea il Progetto

Da **claude.ai su computer** (il telefono va bene per usarlo, non per configurarlo):

1. Progetti → nuovo progetto, chiamalo *Gestione gruppi*
2. Istruzioni personalizzate → incolla il contenuto di
   [`ISTRUZIONI-PROGETTO.md`](./ISTRUZIONI-PROGETTO.md), **a partire dalla riga dopo il
   separatore `---`** (le righe sopra sono spiegazioni per te, non per Claude)
3. Salva

Il Progetto fonde i cinque agent in un unico set di istruzioni, riscritto per il parlato:
una domanda per turno, turni brevi, nessuna tabella nella parte a voce, e il documento
strutturato solo su richiesta.

## 2. Carica le skill (opzionale, piani a pagamento)

Le otto skill in [`../Skills/`](../Skills) sono già nel formato richiesto: una cartella con
dentro `SKILL.md`. Per caricarle:

1. Impostazioni → Capabilities / Skills → abilita le skill
2. Zippa **una cartella per volta** (una skill = uno zip) e caricala
3. Attiva le skill caricate

Gli zip pronti si generano con lo script [`crea-zip-skills.sh`](./crea-zip-skills.sh).

> **Da verificare provandolo:** non è documentato se le skill caricate si attivino *dentro*
> il voice mode o solo nelle conversazioni scritte. Le istruzioni del Progetto funzionano
> comunque in entrambi i casi, quindi il punto 1 è quello che conta: le skill sono un
> miglioramento, non il fondamento.

## 3. Parla

Sul telefono, dentro il Progetto: tocca l'icona dell'**onda sonora** accanto al microfono
nella barra di input. Il voice mode è in beta ed è disponibile su tutti i piani.

Il momento in cui serve davvero è **uscendo da una riunione andata male**: racconti a voce
cosa è successo mentre cammini, ti vengono fatte le domande giuste, e arrivi in ufficio con
il piano scritto già pronto da leggere.

## Cosa funziona e cosa no

**Funziona bene**
- raccontare una situazione confusa e farsela strutturare
- la fase di diagnosi: domande di raccolta, riformulazione, ipotesi
- decidere la prima mossa
- prepararsi mentalmente dieci minuti prima di una conversazione difficile

**Funziona male, ed è un limite del medium**
- ascoltare uno script di feedback letto ad alta voce: inascoltabile
- tabelle stakeholder, roadmap a fasi, piani 30/60/90 in audio
- qualunque output che serve rileggere

Per questo le istruzioni del Progetto separano le due cose: **a voce la diagnosi e la prima
mossa, per iscritto il piano.** Chiedi "preparami il piano scritto" e passa a leggere.

**Non c'è** l'orchestrazione dei sub-agent: su mobile non esiste il meccanismo per cui un
agent convoca quattro specialisti. Per questo le istruzioni li fondono in uno. Se ti serve
la profondità degli specialisti, apri una sessione di Claude Code — anche dal browser del
telefono, su claude.ai/code, con questo repo: lì agent e skill funzionano per intero, ma
di vocale hai solo la dettatura della tastiera.

## Privacy

In tutti i casi stai parlando di colleghi reali verso un server. Usa **iniziali o solo il
ruolo**, come fanno già le skill nei loro output. Non caricare nel Progetto file che
contengono valutazioni su persone identificabili se il Progetto è condiviso con altri.

## Fonti

- [Use voice mode — supporto Claude](https://support.claude.com/en/articles/11101966-use-voice-mode.md)
- [Utilizzo della modalità vocale sulle app mobili di Claude](https://support.anthropic.com/it/articles/11101966-utilizzo-della-modalita-vocale-sulle-app-mobili-di-claude)
- [Claude's voice mode is now free for everyone — Tom's Guide](https://www.tomsguide.com/ai/claudes-free-voice-mode-has-landed-heres-how-to-access-it)
- [How to upload and use locally built Claude skills in the web app — ChatPRD](https://www.chatprd.ai/how-i-ai/workflows/how-to-upload-and-use-locally-built-claude-skills-in-the-claude-ai-web-app) *(tutorial di terzi, non documentazione ufficiale)*
