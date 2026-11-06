import fs from "fs";

const src = process.argv[2];
const out = process.argv[3];
const s = fs.readFileSync(src, "utf8");

function grab(name) {
  const i = s.indexOf("var " + name + "=");
  if (i < 0) throw new Error("non trovo " + name);
  let d = 0, j = s.indexOf("[", i), k = j;
  for (; k < s.length; k++) {
    if (s[k] === "[") d++;
    else if (s[k] === "]") { d--; if (!d) break; }
  }
  return new Function("return " + s.slice(j, k + 1))();
}

const FAM = grab("FAMIGLIE");
const PASSI = grab("PASSI");
const L = [];

L.push("# Know-how: i modelli, chi li ha fatti, dove si sbaglia");
L.push("");
L.push("Riferimento condiviso per gli agent e le skill di questo repo, e testo della sezione");
L.push("**Guida → Know-how** dell'[app](https://claude.ai/artifact/7aczbLrtrGQkHj4j1jhrVW).");
L.push("Questo file è **estratto da** `App/gestione-gruppi.html` con");
L.push("`Know-how/estrai.mjs`, quindi le due copie non possono divergere: si modifica l'app e");
L.push("si rigenera.");
L.push("");
L.push("> Sono **lenti, non leggi.** Un modello va usato quando spiega qualcosa che altrimenti");
L.push("> resta oscuro; se non serve, non lo si nomina. Dove l'evidenza empirica è debole sta");
L.push("> scritto nel paragrafo sull'errore — e in questo campo capita più spesso di quanto la");
L.push("> letteratura divulgativa lasci pensare.");
L.push("");
L.push("## Indice");
L.push("");
for (const [fam, mods] of FAM) L.push("- **" + fam + "** — " + mods.map(m => m[0]).join(" · "));

for (const [fam, mods] of FAM) {
  L.push("");
  L.push("## " + fam);
  for (const m of mods) {
    L.push("");
    L.push("### " + m[0]);
    L.push("*" + m[1] + "*");
    L.push("");
    L.push("**A cosa serve.** " + m[2]);
    L.push("");
    L.push("**In breve.** " + m[3]);
    L.push("");
    L.push("**L'errore che si fa.** " + m[4]);
  }
}

L.push("");
L.push("## Come si usa l'app, in cinque passi");
L.push("");
PASSI.forEach((p, i) => L.push(i + 1 + ". **" + p[0] + "** — " + p[1]));

L.push("");
L.push("## Dove questo materiale si ferma");
L.push("");
L.push("Nessuno di questi modelli autorizza a diagnosticare una persona: si descrivono");
L.push("comportamenti e impatti, non caratteri. Molestie, discriminazione, minacce, rischi per");
L.push("la salute, procedimenti disciplinari e obblighi di informazione e consultazione");
L.push("sindacale non sono conflitti da mediare — sono condotte, e vanno a HR o al legale.");
L.push("Le decisioni sulle persone restano di chi le prende.");

fs.writeFileSync(out, L.join("\n") + "\n");
const n = FAM.reduce((a, f) => a + f[1].length, 0);
console.log("scritto " + out + " — " + n + " modelli, " + (fs.statSync(out).size / 1024).toFixed(1) + " KB");
