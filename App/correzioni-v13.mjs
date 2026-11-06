import fs from "fs";
const file = process.argv[2];
let s = fs.readFileSync(file, "utf8");
const P = [];
const add = (a, b) => P.push([a, b]);

/* ========== F3 + F7 + F8: CSS nuovo ========== */
add(`.chartwrap{position:relative}`,
`.chartwrap{position:relative}
.chartwrap.statico .bar,.chartwrap.statico .barOmbra{animation:none}
.annulla{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:30;
  background:var(--fg);color:var(--bg);border-radius:10px;padding:9px 13px;display:flex;align-items:center;gap:13px;
  font-size:12.5px;font-weight:600;box-shadow:var(--e3);animation:suscard .22s ease both;max-width:min(94vw,430px)}
.annulla span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.annulla button{appearance:none;border:0;background:transparent;color:var(--bg);font:inherit;font-weight:700;
  text-decoration:underline;cursor:pointer;padding:0;flex:none}
.avviso{border-left:2px solid var(--attesa);padding-left:11px;font-size:12px;color:var(--muted);line-height:1.45}`);

/* ========== F3: barra annulla ========== */
add(`function pill(chiave){`,
`/* una barra per annullare l'ultima eliminazione: senza, un tocco di troppo perde un dato */
var annullaT=null;
function annulla(msg,azione){
  var v=document.querySelector(".annulla"); if(v)v.remove();
  clearTimeout(annullaT);
  var b=el("div","annulla"); b.appendChild(el("span",null,msg));
  var t=el("button",null,"Annulla");
  t.onclick=async function(){
    t.disabled=true; t.textContent="…";
    try{ await azione(); b.remove(); }catch(e){ t.textContent="Non riesco"; }
  };
  b.appendChild(t);
  var x=el("button",null,"×"); x.setAttribute("aria-label","Chiudi"); x.onclick=function(){b.remove();};
  b.appendChild(x);
  document.body.appendChild(b);
  annullaT=setTimeout(function(){ b.remove(); },12000);
}
function pill(chiave){`);

/* ========== F5: collegamento per id, non per nome ========== */
add(`function impDi(titolo){ return impegni.filter(function(i){return i.scheda===titolo;}); }`,
`/* un impegno appartiene al caso per id; il titolo resta solo come ripiego per le righe vecchie */
function impDi(s){ if(!s)return [];
  return impegni.filter(function(i){ return i.casoId?(i.casoId===s.id):(i.scheda===s.titolo); }); }
function casoDi(i){ return schede.filter(function(s){
  return i.casoId?(s.id===i.casoId):(s.titolo===i.scheda); })[0]; }
/* lo score guarda solo i casi aperti e in lavorazione: altrimenti i chiusi lo falsano per sempre */
function impAttivi(){ return impegni.filter(function(i){
  var s=casoDi(i); return !s||statoDi(s)!=="risolto"; }); }`);

add(`  var mine=impDi(s.titolo), ch=mine.filter(function(i){return i.fatto;}).length;`,
`  var mine=impDi(s), ch=mine.filter(function(i){return i.fatto;}).length;`);

add(`  var L=[], imps=impDi(s.titolo);`, `  var L=[], imps=impDi(s);`);

add(`        var imps=impDi(s.titolo);`, `        var imps=impDi(s);`);

add(`function diarioDopoImpegno(i,fatto){
  var s=schedaPerTitolo(i.scheda);`,
`function diarioDopoImpegno(i,fatto){
  var s=casoDi(i);`);

add(`        await db.collection("impegni").add({testo:r.tx.value.trim(),chi:r.who.value.trim(),
          scadenza:r.dt.value||"",fatto:false,scheda:d.titolo,creato:new Date().toISOString()});`,
`        await db.collection("impegni").add({testo:r.tx.value.trim(),chi:r.who.value.trim(),
          scadenza:r.dt.value||"",fatto:false,casoId:ref.id,scheda:d.titolo,creato:new Date().toISOString()});`);

/* ========== F4 + F7 + F8 + F9 + F11: plancia ========== */
add(`function disegnaPlancia(){
  plancia.innerHTML="";`,
`var animaPlancia=true, ridisegnaAtteso=false, tronco={schede:false,impegni:false};
function pianificaPlancia(){
  if(vista!=="plancia"||ridisegnaAtteso)return;
  ridisegnaAtteso=true;
  requestAnimationFrame(function(){ ridisegnaAtteso=false; if(vista==="plancia")disegnaPlancia(); });
}
function disegnaPlancia(){
  var mainEl=document.getElementById("main"), scrollPrec=mainEl.scrollTop;
  plancia.innerHTML="";`);

add(`  var tot=impegni.length, chiusi=impegni.filter(function(i){return i.fatto;}).length;
  var scad=apertiImp().filter(function(i){return scaduto(i.scadenza);}).length;
  var perc=tot?Math.round(chiusi/tot*100):0;`,
`  var attivi=impAttivi();
  var tot=attivi.length, chiusi=attivi.filter(function(i){return i.fatto;}).length;
  var scad=attivi.filter(function(i){return !i.fatto&&scaduto(i.scadenza);}).length;
  var perc=tot?Math.round(chiusi/tot*100):0;`);

add(`    var t=el("div","tile sali"); t.style.setProperty("--i",iT++);
    t.appendChild(el("div","k",lab));
    var v=el("div","v num"); t.appendChild(v); conta(v,val);`,
`    var t=el("div","tile"+(animaPlancia?" sali":"")); t.style.setProperty("--i",iT++);
    t.appendChild(el("div","k",lab));
    var v=el("div","v num"); t.appendChild(v); conta(v,val,animaPlancia);`);

add(`  sh.appendChild(el("p",null,"Quota di impegni presi che risultano chiusi. Non misura se il problema è risolto: misura se quello che hai deciso di fare è stato fatto."));`,
`  sh.appendChild(el("p",null,"Quota di impegni chiusi sui casi aperti e in lavorazione; i casi risolti non entrano nel conto. Non misura se il problema è risolto: misura se quello che hai deciso di fare è stato fatto."));`);

add(`    sc.appendChild(el("div","leg",chiusi+" impegni chiusi su "+tot+(scad?" · "+scad+" oltre la data concordata":"")));
    sb.appendChild(sc);
    var m=el("div","meter"); var mi=el("i"); m.appendChild(mi); sb.appendChild(m); riempi(mi,perc);`,
`    sc.appendChild(el("div","leg",chiusi+" impegni chiusi su "+tot+" nei casi ancora aperti"+(scad?" · "+scad+" oltre la data concordata":"")));
    sb.appendChild(sc);
    var m=el("div","meter"); var mi=el("i"); m.appendChild(mi); sb.appendChild(m); riempi(mi,perc,animaPlancia);`);

add(`    var e0=el("div","empty"); e0.appendChild(el("p","Nessun impegno registrato. Archivia una conversazione e le azioni con una data finiscono qui."));
    sb.appendChild(e0);`,
`    var e0=el("div","empty"); e0.appendChild(el("p","Nessun impegno aperto. Archivia una conversazione e le azioni con una data finiscono qui."));
    sb.appendChild(e0);`);

add(`    var m=el("div","meter"); var mi=el("i"); m.appendChild(mi);
    pr.appendChild(m); riempi(mi,Math.round(ch/mine.length*100));`,
`    var m=el("div","meter"); var mi=el("i"); m.appendChild(mi);
    pr.appendChild(m); riempi(mi,Math.round(ch/mine.length*100),animaPlancia);`);

add(`    schede.slice().sort(function(a,b){ return ord[statoDi(a)]-ord[statoDi(b)]; }).forEach(function(s,i){
      var n=caso(s); n.classList.add("sali"); n.style.setProperty("--i",i+3); inclina(n,2.2); cp.appendChild(n);
    });`,
`    schede.slice().sort(function(a,b){ return ord[statoDi(a)]-ord[statoDi(b)]; }).forEach(function(s,i){
      var n=caso(s);
      if(animaPlancia){ n.classList.add("sali"); n.style.setProperty("--i",i+3); }
      inclina(n,2.2); cp.appendChild(n);
    });`);

add(`  plancia.appendChild(cp);
}`,
`  plancia.appendChild(cp);

  if(tronco.schede||tronco.impegni){
    var av=el("div","panel"); var avb=el("div","pb");
    avb.appendChild(el("div","avviso","Sto mostrando solo i più recenti: "+
      (tronco.schede?"i casi hanno superato i 200":"")+(tronco.schede&&tronco.impegni?" e ":"")+
      (tronco.impegni?"gli impegni hanno superato i 600":"")+". Esporta e archivia i casi vecchi."));
    av.appendChild(avb); plancia.appendChild(av);
  }
  var pie=el("div","row"); pie.style.margin="2px 0 6px";
  if(downloads){
    var be=el("button",null,"Esporta i dati");
    be.onclick=async function(){
      be.disabled=true; be.textContent="…";
      try{ await downloads.save({filename:"gestione-gruppi-"+oggi()+".md",data:testoExport()}); be.textContent="Esportato"; }
      catch(e){ be.textContent=(e&&e.code==="declined")?"Esporta i dati":"Non riesco"; }
      finally{ setTimeout(function(){be.disabled=false; if(be.textContent!=="Esporta i dati")be.textContent="Esporta i dati";},1800); }
    };
    pie.appendChild(be);
  }
  if(mcp){ var bd=el("button",null,"Diario"); bd.onclick=sheetDiario; pie.appendChild(bd); }
  if(pie.childNodes.length)plancia.appendChild(pie);

  animaPlancia=false;
  if(scrollPrec)mainEl.scrollTop=scrollPrec;
}

/* tutto quello che c'è dentro, in un file da tenere fuori da qui */
function testoExport(){
  var L=["# Gestione gruppi — esportazione del "+dataLunga(new Date().toISOString()),""];
  if(profilo){
    L.push("## Il mio contesto","");
    PROF.forEach(function(f){ var v=(profilo[f[0]]||"").trim(); if(v)L.push("**"+f[1]+".** "+v,""); });
  }
  var ord={aperto:0,corso:1,risolto:2};
  L.push("## Casi","");
  if(!schede.length)L.push("_Nessuno._","");
  schede.slice().sort(function(a,b){return ord[statoDi(a)]-ord[statoDi(b)];}).forEach(function(s){
    L.push("### "+(s.titolo||"Senza nome")+" — "+(STATI[statoDi(s)]||STATI.aperto)[0].toLowerCase());
    L.push("");
    if(s.stadioCodice)L.push("- Stadio: "+s.stadioCodice);
    if(s.sicurezzaLivello)L.push("- Sicurezza psicologica: "+s.sicurezzaLivello);
    if((s.scarf||[]).length)L.push("- Bisogni sotto pressione: "+s.scarf.join(", "));
    if(s.aggiornata)L.push("- Aggiornato: "+dataLunga(s.aggiornata));
    L.push("");
    CAMPI.forEach(function(f){ var v=(s[f[0]]||"").trim(); if(v)L.push("**"+f[1]+".** "+v,""); });
    var mi=impDi(s);
    L.push("**Impegni.**");
    if(!mi.length)L.push("- _nessuno_");
    mi.forEach(function(i){
      L.push("- ["+(i.fatto?"x":" ")+"] "+(i.testo||"")+(i.chi?" — "+i.chi:"")+
        (i.scadenza?" — entro "+i.scadenza:"")+(i.fatto&&i.chiuso?" (chiuso "+dataIt(i.chiuso)+")":""));
    });
    L.push("");
  });
  var orfani=impegni.filter(function(i){ return !casoDi(i); });
  if(orfani.length){
    L.push("## Impegni senza caso","");
    orfani.forEach(function(i){ L.push("- ["+(i.fatto?"x":" ")+"] "+(i.testo||"")+(i.chi?" — "+i.chi:"")+(i.scadenza?" — entro "+i.scadenza:"")); });
    L.push("");
  }
  return L.join("\\n");
}`);

/* ========== F6: tooltip anche al tocco ========== */
add(`    hit.addEventListener("mouseenter",function(){
      tip.textContent=x.n+(x.n===1?" impegno chiuso":" impegni chiusi")+" · settimana dal "+x.et;
      tip.style.left=(cx/W*100)+"%"; tip.style.top=(y/H*100)+"%"; tip.style.opacity="1";
    });
    hit.addEventListener("mouseleave",function(){ tip.style.opacity="0"; });`,
`    function mostraTip(){
      tip.textContent=x.n+(x.n===1?" impegno chiuso":" impegni chiusi")+" · settimana dal "+x.et;
      tip.style.left=(cx/W*100)+"%"; tip.style.top=(y/H*100)+"%"; tip.style.opacity="1";
    }
    function nascondiTip(){ tip.style.opacity="0"; }
    hit.addEventListener("mouseenter",mostraTip);
    hit.addEventListener("mouseleave",nascondiTip);
    /* al tocco mouseenter non arriva: il dato va letto anche col dito */
    hit.addEventListener("pointerdown",function(ev){
      if(ev.pointerType==="mouse")return;
      mostraTip(); clearTimeout(tipT); tipT=setTimeout(nascondiTip,2600);
    });`);

add(`  var wrap=el("div","chartwrap");
  var tip=el("div","tip"); wrap.appendChild(tip);`,
`  var wrap=el("div","chartwrap"+(animaPlancia?"":" statico"));
  var tip=el("div","tip"), tipT=null; wrap.appendChild(tip);`);

/* ========== F7: conta e riempi solo quando serve ========== */
add(`function conta(nodo,fino){
  if(fermo||fino<=0){ nodo.textContent=String(fino); return; }`,
`function conta(nodo,fino,anima){
  if(fermo||anima===false||fino<=0){ nodo.textContent=String(fino); return; }`);

add(`function riempi(barra,perc){
  if(fermo){ barra.style.transition="none"; barra.style.width=perc+"%"; return; }`,
`function riempi(barra,perc,anima){
  if(fermo||anima===false){ barra.style.transition="none"; barra.style.width=perc+"%"; return; }`);

/* ========== F3: annulla sull'eliminazione di un impegno ========== */
add(`  var d=el("button","x","×"); d.setAttribute("aria-label","Elimina");
  d.onclick=async function(){ if(d.textContent!=="?"){d.textContent="?";return;} d.disabled=true;
    try{ await db.doc("impegni/"+i.id).delete(); diarioDopoImpegno(i,null); }catch(e){ d.disabled=false; d.textContent="×"; } };`,
`  var d=el("button","x","×"); d.setAttribute("aria-label","Elimina");
  d.onclick=async function(){ if(d.textContent!=="?"){d.textContent="?";return;} d.disabled=true;
    var copia={}; for(var k in i)if(k!=="id")copia[k]=i[k];
    try{
      await db.doc("impegni/"+i.id).delete(); diarioDopoImpegno(i,null);
      annulla("Impegno eliminato",async function(){
        await db.doc("impegni/"+i.id).set(copia);
        registra("Eliminazione annullata: "+(i.testo||""));
      });
    }catch(e){ d.disabled=false; d.textContent="×"; } };`);

/* ========== F10: la conversazione in corso segue il dispositivo ========== */
add(`function salvaSessione(){
  try{
    if(!turni.length){ localStorage.removeItem(KEY); return; }
    var p=turni.slice(-14).map(function(t){return {role:t.role,content:String(t.content).slice(0,9000)};});
    localStorage.setItem(KEY,JSON.stringify({turni:p,modo:modo,ts:Date.now()}));
  }catch(e){}
}`,
`function turniLeggeri(){
  return turni.slice(-14).map(function(t){return {role:t.role,content:String(t.content).slice(0,9000)};});
}
function salvaSessione(){
  try{
    if(!turni.length){ localStorage.removeItem(KEY); }
    else localStorage.setItem(KEY,JSON.stringify({turni:turniLeggeri(),modo:modo,ts:Date.now()}));
  }catch(e){}
  salvaSessioneDb();
}
/* la stessa conversazione anche sugli altri dispositivi: sotto data/users/me, che resta privato */
var VIA="data/users/me/sessione";
async function salvaSessioneDb(){
  if(!db||!canWrite)return;
  try{
    if(!turni.length){ await db.doc(VIA).delete(); return; }
    await db.doc(VIA).set({turni:turniLeggeri(),modo:modo,ts:Date.now()});
  }catch(e){}
}
async function leggiSessioneDb(){
  if(!db)return null;
  try{
    var g=await db.doc(VIA).get(); if(!g.exists)return null;
    var v=g.data()||{};
    if(!v.turni||!v.turni.length)return null;
    if(Date.now()-(v.ts||0)>1000*60*60*24*10)return null;
    return {turni:v.turni,modo:v.modo,ts:v.ts||0};
  }catch(e){ return null; }
}`);

add(`  try{localStorage.removeItem(KEY);}catch(e){}
  turni=[]; allegata=null; mostraAllegata(); ripresa=null; setModo("voce"); setVista("parla"); home();
}`,
`  try{localStorage.removeItem(KEY);}catch(e){}
  turni=[]; allegata=null; mostraAllegata(); ripresa=null; salvaSessioneDb();
  setModo("voce"); setVista("parla"); home();
}`);

/* ========== F2: diario come contesto, spento per difetto ========== */
add(`function usaCtx(){ return !(dPref&&dPref.usaContesto===false); }`,
`/* spento per difetto: il diario personale non parte verso Claude se non lo chiedi tu */
function usaCtx(){ return !!(dPref&&dPref.usaContesto===true); }`);

add(`  var tx=el("div","g"); tx.appendChild(el("span",null,"Usa le ultime note del diario come contesto per il consulente"));`,
`  var tx=el("div","g");
  tx.appendChild(el("span",null,"Usa le ultime note del diario come contesto per il consulente"));
  tx.appendChild(el("div","u","Spento per impostazione predefinita. Con questa spunta, le ultime tre note del diario — anche quelle personali — vengono inviate a Claude a ogni messaggio."));`);

add(`   ["Il diario","Ogni caso archiviato diventa una nota nel vault Bejelith (Lavoro, Gestione gruppi), con stato e impegni; gli eventi finiscono in un log datato. Se cambi lo stato o spunti un impegno nella nota, l'app lo rilegge alla sincronizzazione. Una nota con il tag caso-team può diventare un caso. Le ultime note del diario danno contesto al consulente: si disattiva dal pannello Diario."]`,
`   ["Il diario","Ogni caso archiviato diventa una nota nel vault Bejelith (Lavoro, Gestione gruppi), con stato e impegni; gli eventi finiscono in un log datato. Se cambi lo stato o spunti un impegno nella nota, l'app lo rilegge alla sincronizzazione. Una nota con il tag caso-team può diventare un caso. Le ultime note del diario possono dare contesto al consulente: è spento per impostazione predefinita e si accende dal pannello Diario, perché significa mandare a Claude anche quello che hai scritto di personale."]`);

/* ========== F1: dillo nella guida ========== */
add(`  w1.appendChild(el("p",null,"Non diagnostica persone e non usa etichette cliniche: solo comportamenti e impatti. Non scrive copioni per far cedere qualcuno. E davanti a molestie, discriminazione, minacce, rischi per la salute, procedimenti disciplinari od obblighi di consultazione sindacale si fermerà indicandoti HR o il legale: non sono conflitti da mediare, sono condotte. Le decisioni sulle persone restano tue."));`,
`  w1.appendChild(el("p",null,"Non diagnostica persone e non usa etichette cliniche: solo comportamenti e impatti. Non scrive copioni per far cedere qualcuno. E davanti a molestie, discriminazione, minacce, rischi per la salute, procedimenti disciplinari od obblighi di consultazione sindacale si fermerà indicandoti HR o il legale: non sono conflitti da mediare, sono condotte. Le decisioni sulle persone restano tue."));
  var w2=el("div","box warnbox"); w2.style.borderLeftColor="var(--signal)";
  w2.appendChild(el("b",null,"Chi può leggere i casi"));
  w2.appendChild(el("p",null,"Solo tu e chi ha accesso in modifica a questa pagina. Se la condividi in sola lettura o con un link, chi la apre vede l'interfaccia ma non i casi, gli impegni, il tuo contesto o il diario. La conversazione in corso vive sotto il tuo spazio privato, non visibile a nessun altro. Resta valida la regola di usare iniziali o ruoli: un'app privata oggi può essere condivisa domani."));
  pb3.appendChild(w2);`);

/* ========== F12: non riscrivere una nota che non è cambiata ========== */
add(`/* Casi -> note .md nella cartella Lavoro/Gestione gruppi; modifiche alle note -> di nuovo nell'app.
   Il connettore Drive non sa riscrivere il contenuto di un file: una nota si aggiorna creando la nuova versione
   e mettendo la vecchia nel cestino (solo file creati da questa pagina). */`,
`/* Casi -> note .md nella cartella Lavoro/Gestione gruppi; modifiche alle note -> di nuovo nell'app.
   Il connettore Drive non sa riscrivere il contenuto di un file (update_file cambia solo i metadati: verificato
   sullo schema del tool), quindi una nota si aggiorna creando la nuova versione e mettendo la vecchia nel cestino.
   Conseguenza da sapere: la cronologia delle versioni di Drive si spezza e l'indirizzo della nota cambia. Per
   limitare il danno teniamo l'impronta del testo e non riscriviamo una nota identica a quella già salvata. */`);

add(`async function scriviNota(s){
  var f=await dcall("create_file",{title:nomeNota(s)+".md",parentId:ID_CASI,textContent:testoNota(s),
    contentMimeType:"text/markdown",disableConversionToGoogleType:true});
  if(!f||!f.id)throw {code:"upstream_error"};
  var vecchio=s.nota&&s.nota.fileId;
  var nuova={fileId:f.id,modificata:f.modifiedTime||new Date().toISOString(),url:f.viewUrl||""};`,
`function impronta(t){ var h=5381,i=0; for(;i<t.length;i++)h=((h<<5)+h+t.charCodeAt(i))|0; return String(h>>>0); }
function urlFile(f){ return (f&&f.viewUrl)||("https://drive.google.com/file/d/"+((f&&f.id)||"")+"/view"); }
async function scriviNota(s){
  var testo=testoNota(s), imp=impronta(testo);
  if(s.nota&&s.nota.fileId&&s.nota.impronta===imp){ tr("nota invariata, non riscritta: "+s.nota.fileId); return; }
  var f=await dcall("create_file",{title:nomeNota(s)+".md",parentId:ID_CASI,textContent:testo,
    contentMimeType:"text/markdown",disableConversionToGoogleType:true});
  if(!f||!f.id)throw {code:"upstream_error"};
  var vecchio=s.nota&&s.nota.fileId;
  var nuova={fileId:f.id,modificata:f.modifiedTime||new Date().toISOString(),url:urlFile(f),impronta:imp};`);

add(`  var f=await dcall("create_file",{title:"Gestione gruppi - Log.md",parentId:ID_CASI,textContent:testoLog(voci),
    contentMimeType:"text/markdown",disableConversionToGoogleType:true});
  if(!f||!f.id)throw {code:"upstream_error"};
  await ref.set({voci:voci,fileId:f.id,url:f.viewUrl||"",aggiornato:new Date().toISOString()});`,
`  var f=await dcall("create_file",{title:"Gestione gruppi - Log.md",parentId:ID_CASI,textContent:testoLog(voci),
    contentMimeType:"text/markdown",disableConversionToGoogleType:true});
  if(!f||!f.id)throw {code:"upstream_error"};
  await ref.set({voci:voci,fileId:f.id,url:urlFile(f),aggiornato:new Date().toISOString()});`);

/* ========== F13: cerca solo nelle cartelle del vault, e sopporta nomi di campo diversi ========== */
add(`    tok=r&&r.nextPageToken; n++;`,
`    tok=r&&(r.nextPageToken||r.next_page_token); n++;`);

add(`async function cercaDaImportare(perId){
  var res=await dcall("search_files",{query:"fullText contains 'caso-team' and mimeType = 'text/markdown' and trashed = false",
    excludeContentSnippets:true,pageSize:25});
  var notaIds={}; schede.forEach(function(s){ if(s.nota&&s.nota.fileId)notaIds[s.nota.fileId]=1; });
  var gia=(dPref.trattate||[]);
  var out=[];
  var cand=((res&&res.files)||[]).filter(function(f){
    return !notaIds[f.id]&&gia.indexOf(f.id)<0&&!/^Caso - /.test(f.title||"")&&!/^Gestione gruppi - Log/.test(f.title||"");
  }).slice(0,6);
  for(var k=0;k<cand.length;k++){
    var t=await leggiFile(cand[k].id), n=leggiNota(t);
    if(n.fm.caso_id)continue;
    out.push({id:cand[k].id,title:String(cand[k].title||"").replace(/\\.md$/,""),url:cand[k].viewUrl||"",testo:pulisciNota(t)});
  }
  daImportare=out; aggiornaBadgeD();
}`,
`async function cercaDaImportare(perId){
  /* solo dentro le due cartelle del vault: una ricerca su tutto il Drive pescava file non pertinenti
     e ne scaricava il contenuto intero */
  var trovati=[], visti={};
  for(var p=0;p<2;p++){
    var cart=p===0?ID_CASI:ID_DIARIO;
    try{
      var res=await dcall("search_files",{query:"parentId = '"+cart+"' and fullText contains 'caso-team' and trashed = false",
        excludeContentSnippets:true,pageSize:25});
      ((res&&res.files)||[]).forEach(function(f){ if(f&&f.id&&!visti[f.id]){ visti[f.id]=1; trovati.push(f); } });
    }catch(e){ tr("ricerca in "+cart+" non riuscita: "+((e&&e.code)||"errore")); }
  }
  var notaIds={}; schede.forEach(function(s){ if(s.nota&&s.nota.fileId)notaIds[s.nota.fileId]=1; });
  var gia=(dPref.trattate||[]);
  var out=[];
  var cand=trovati.filter(function(f){
    return !notaIds[f.id]&&gia.indexOf(f.id)<0&&!/^Caso - /.test(f.title||"")&&!/^Gestione gruppi - Log/.test(f.title||"");
  }).slice(0,4);
  for(var k=0;k<cand.length;k++){
    var t=await leggiFile(cand[k].id), n=leggiNota(t);
    if(n.fm.caso_id)continue;
    out.push({id:cand[k].id,title:String(cand[k].title||"").replace(/\\.md$/,""),url:urlFile(cand[k]),testo:pulisciNota(t)});
  }
  daImportare=out; aggiornaBadgeD();
}`);

/* ========== F7/F8/F9/F10: avvio e sottoscrizioni ========== */
add(`  if(v==="plancia") disegnaPlancia();`, `  if(v==="plancia"){ animaPlancia=true; disegnaPlancia(); }`);

add(`    db.collection("schede").orderBy("aggiornata","desc").limit(80).onSnapshot(function(snap){
      clearTimeout(t1); dbPronto=true;
      schede=snap.docs.map(function(d){ var v=Object.assign({},d.data()||{}); v.id=d.id; return v; });
      if(vista==="plancia")disegnaPlancia();
    },function(){ clearTimeout(t1); dbPronto=true; });
    db.collection("impegni").limit(400).onSnapshot(function(snap){
      impegni=snap.docs.map(function(d){ var v=Object.assign({},d.data()||{}); v.id=d.id; return v; });
      aggiornaBadge();
      if(vista==="plancia")disegnaPlancia(); else if(!turni.length)home();
    },function(){});`,
`    db.collection("schede").orderBy("aggiornata","desc").limit(200).onSnapshot(function(snap){
      clearTimeout(t1); dbPronto=true;
      schede=snap.docs.map(function(d){ var v=Object.assign({},d.data()||{}); v.id=d.id; return v; });
      tronco.schede=snap.docs.length>=200;
      pianificaPlancia();
    },function(){ clearTimeout(t1); dbPronto=true; });
    db.collection("impegni").orderBy("creato","desc").limit(600).onSnapshot(function(snap){
      impegni=snap.docs.map(function(d){ var v=Object.assign({},d.data()||{}); v.id=d.id; return v; });
      tronco.impegni=snap.docs.length>=600;
      aggiornaBadge();
      if(vista==="plancia")pianificaPlancia(); else if(!turni.length)home();
    },function(){});`);

add(`  diarioAvvia();
})();`,
`  /* la conversazione lasciata a metà su un altro dispositivo */
  try{
    var sdb=await leggiSessioneDb();
    if(sdb&&!turni.length&&(!ripresa||sdb.ts>ripresa.ts)){ ripresa=sdb; if(vista==="parla")home(); }
  }catch(e){}
  diarioAvvia();
})();`);

let ko = 0;
P.forEach(([a, b], n) => {
  const c = s.split(a).length - 1;
  if (c !== 1) { console.log("FIX " + (n + 1) + ": trovato " + c + " volte -> " + a.slice(0, 68).replace(/\n/g, "\\n")); ko++; return; }
  s = s.replace(a, b);
});
if (ko) { console.log("\n" + ko + " non applicate — niente scritto."); process.exit(1); }
fs.writeFileSync(file, s);
console.log("applicate " + P.length + " correzioni — " + (s.length / 1024).toFixed(0) + " KB");
