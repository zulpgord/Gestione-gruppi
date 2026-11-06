---
name: gestisci-conflitto
description: Analizza e gestisce un conflitto fra due persone o due sottogruppi — classificazione del conflitto, interessi contro posizioni, scelta della strategia con Thomas-Kilmann, script della mediazione. Usala quando due persone non si parlano, due team si rimpallano responsabilità, c'è un attrito ricorrente che blocca il lavoro, o devi mediare fra due collaboratori.
---

# Gestisci conflitto

Workflow per un conflitto **fra parti identificate**: due persone, due sottogruppi, due funzioni.
Per un clima teso diffuso usa `diagnosi-team`; per un workshop di gruppo `facilita-retrospettiva`.

## Fase 1 — Raccolta separata

Chiedi all'utente:
- chi sono le parti, in che rapporto gerarchico stanno fra loro e con lui
- **l'episodio più recente**, raccontato come fatti: chi ha fatto cosa, quando, davanti a chi
- da quanto va avanti e qual è stato il primo episodio ricordato
- cosa è già stato tentato
- l'**impatto sul lavoro**: cosa non si fa, cosa si fa due volte, chi altro ne paga il prezzo
- cosa dice ciascuna parte dell'altra (le due versioni, separate)

> Se l'utente ha sentito solo una delle due parti, è il primo problema. Un conflitto raccontato
> da un lato solo produce una mediazione che la seconda parte vive come un'imboscata.
> Dillo prima di procedere.

## Fase 2 — Classificare il conflitto

La natura determina tutto. Non saltare questo passaggio.

| Tipo | Riconoscimento | Trattamento |
|---|---|---|
| **Di compito** | disaccordo su cosa fare, su priorità, su soluzione tecnica | **utile**: va alimentato e strutturato, non spento. Serve un criterio di decisione, non una riconciliazione |
| **Di processo** | disaccordo su chi fa cosa, come, con che tempi | si risolve con il **ridisegno dei confini**: RACI, handoff, interfacce. Spesso non serve nessuna conversazione emotiva |
| **Di relazione** | antipatia, sfiducia, attacchi personali, storia pregressa | il più costoso: va trasformato o contenuto. Non si risolve con un chiarimento di ruoli |
| **Di status** | chi conta più, chi è stato scavalcato, chi doveva avere quel ruolo | **la causa più spesso ignorata**. Si affronta solo nominandola, e di solito richiede una decisione del manager, non una mediazione |

> Errore ricorrente: trattare come conflitto di relazione ciò che è un conflitto di processo
> mal disegnato. Due persone che litigano ogni settimana sullo stesso handoff non hanno un
> problema di carattere: hanno un confine di ruolo non definito. Verificalo **sempre prima**
> di proporre una mediazione.

## Fase 3 — Posizioni e interessi

Per ciascuna parte, costruisci la tabella:

| | Parte A | Parte B |
|---|---|---|
| **Posizione dichiarata** | cosa chiede | cosa chiede |
| **Interesse reale** | di cosa ha bisogno | di cosa ha bisogno |
| **Minaccia SCARF** | quale dei cinque domini è sotto attacco | idem |
| **Cosa teme** | il peggio che può succedergli | idem |

Le posizioni sono incompatibili quasi sempre; gli interessi quasi mai. Lo spazio di soluzione
sta negli interessi, e il lavoro del manager è farli emergere senza che nessuna delle due parti
senta di aver ceduto.

## Fase 4 — Scegliere la strategia (Thomas-Kilmann)

Indica **uno** stile e perché in questo caso gli altri sono sbagliati:

- **Collaborare** — alto valore, tempo disponibile, relazione da preservare. Costoso: non si usa per tutto.
- **Competere / decidere** — urgenza, questione di principio o di sicurezza, o quando una parte ha ragione. Il manager decide e lo dice. *Non mediare ciò che va deciso: la mediazione di una questione di merito comunica che non c'è un criterio.*
- **Compromettere** — soluzione accettabile e veloce, entrambi cedono qualcosa di dichiarato
- **Evitare** — il tema è marginale e si spegne da solo, o i tempi non sono maturi. Scelta legittima **se consapevole e dichiarata**, non se è fuga
- **Accomodare** — la posta è bassa per te e alta per l'altro, e vale la relazione

## Fase 5 — Il percorso

Costruisci la sequenza, con i testi:

1. **1:1 separati** — mai partire dall'incontro congiunto. Ciascuna parte deve poter dire la sua
   senza pubblico, e sapere in anticipo che ci sarà un incontro comune.
2. **Verifica delle condizioni** — l'incontro congiunto si fa solo se entrambe le parti
   riconoscono un problema comune e accettano di parlarne. Se una delle due nega il conflitto,
   non si convoca: si lavora ancora in separata.
3. **Incontro congiunto** — regole dichiarate in apertura, facilitazione attiva, nessuno
   interrompe, si parla dei comportamenti e dell'impatto
4. **Accordo scritto** — chi fa cosa, cosa smette di fare, come ci si parla la prossima volta
5. **Follow-up a 2 e a 6 settimane** — separati, poi insieme

## Fase 6 — Output

```markdown
# Conflitto <A> / <B> · <data>

## I fatti
Cronologia degli episodi. Fatti separati dalle interpretazioni di ciascuna parte.

## Classificazione
Tipo di conflitto + perché. **Verifica del confine di ruolo**: è un problema di processo travestito?

## Posizioni e interessi
Tabella a due colonne, incluse minacce SCARF e timori.

## Strategia
Lo stile scelto e perché gli altri non vanno. Cosa decide il manager e cosa negoziano le parti.

## Percorso
### 1:1 con A — script
### 1:1 con B — script
### Condizioni per l'incontro congiunto
### Incontro congiunto — scaletta, regole di apertura, testo di apertura
### L'accordo — cosa deve contenere

## Se va male
Le derive probabili e la mossa successiva: una parte non si presenta, si rifiuta l'accordo,
l'accordo viene violato, il conflitto si allarga ad altri.

## Linea rossa
Cosa fa smettere la mediazione e far partire il percorso HR o disciplinare.
```

## Limiti

- Non si media mai un conflitto che contiene **molestie, discriminazione, minacce, violenza
  verbale ripetuta o ritorsioni**. Non sono conflitti: sono condotte. La mediazione in questi
  casi è dannosa perché mette sullo stesso piano chi subisce e chi agisce, e va detto subito
  con l'indicazione di escalation a HR.
- Non si media fra persone con un forte dislivello di potere senza tutele: il subordinato
  cederà e chiamerà accordo la resa.
- Non costruisci strategie per isolare una delle due parti, costruire un dossier contro di lei
  o ottenerne l'uscita.
- Se una delle parti è l'utente stesso, dillo: non è una mediazione, è una sua conversazione
  difficile. Passa a `prepara-feedback`.

## Correlati

`prepara-feedback` per i 1:1 separati, se diventano conversazioni correttive.
`diagnosi-team` se il conflitto fra due è il sintomo visibile di una dinamica di gruppo.
`facilita-retrospettiva` se le parti sono sottogruppi e serve un workshop.
