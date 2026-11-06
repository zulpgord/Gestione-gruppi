import fs from "fs";

const live = process.argv[2];
const out = process.argv[3];
let s = fs.readFileSync(live, "utf8");

// via lo scheletro che il publish aggiunge
const i = s.indexOf("<body>");
if (i < 0) throw new Error("nessun <body>");
s = s.slice(i + "<body>".length).replace(/^\n/, "");
s = s.replace(/\n*<\/body><\/html>\s*$/, "\n");

const P = [];
const add = (a, b) => P.push([a, b]);

/* ---------- CSS: profondità ---------- */
add(`*{box-sizing:border-box}
html,body{height:100%}`,
`/* profondità: ombre a strati, un filo di luce sul bordo alto, incassatura per le piste */
:root{
  --e1:0 1px 1px rgba(28,25,20,.05), 0 2px 4px rgba(28,25,20,.045);
  --e2:0 1px 1px rgba(28,25,20,.05), 0 3px 7px rgba(28,25,20,.055), 0 9px 20px rgba(28,25,20,.05);
  --e3:0 2px 4px rgba(28,25,20,.07), 0 12px 26px rgba(28,25,20,.09), 0 28px 56px rgba(28,25,20,.09);
  --ring:inset 0 1px 0 rgba(255,255,255,.75);
  --sunk:inset 0 1px 2px rgba(28,25,20,.14), inset 0 -1px 0 rgba(255,255,255,.5);
  --lift:0 1px 2px rgba(28,25,20,.14);
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --e1:0 1px 2px rgba(0,0,0,.42);
  --e2:0 2px 4px rgba(0,0,0,.45), 0 7px 16px rgba(0,0,0,.42);
  --e3:0 4px 10px rgba(0,0,0,.5), 0 20px 44px rgba(0,0,0,.52);
  --ring:inset 0 1px 0 rgba(255,255,255,.055);
  --sunk:inset 0 1px 3px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.03);
  --lift:0 1px 3px rgba(0,0,0,.5);
}}
:root[data-theme="dark"]{
  --e1:0 1px 2px rgba(0,0,0,.42);
  --e2:0 2px 4px rgba(0,0,0,.45), 0 7px 16px rgba(0,0,0,.42);
  --e3:0 4px 10px rgba(0,0,0,.5), 0 20px 44px rgba(0,0,0,.52);
  --ring:inset 0 1px 0 rgba(255,255,255,.055);
  --sunk:inset 0 1px 3px rgba(0,0,0,.55), inset 0 -1px 0 rgba(255,255,255,.03);
  --lift:0 1px 3px rgba(0,0,0,.5);
}

@keyframes sali{from{opacity:0;transform:translate3d(0,9px,0)}to{opacity:1;transform:none}}
@keyframes entra{from{opacity:0;transform:translate3d(0,6px,0)}to{opacity:1;transform:none}}
@keyframes suscard{from{opacity:0;transform:translate3d(0,22px,0)}to{opacity:1;transform:none}}
@keyframes cresci{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes respira{0%,100%{opacity:.45}50%{opacity:1}}
.sali{animation:sali .34s cubic-bezier(.22,.7,.26,1) both;animation-delay:calc(var(--i,0)*42ms)}
.vista-entra{animation:entra .24s cubic-bezier(.22,.7,.26,1) both}

*{box-sizing:border-box}
html,body{height:100%}`);

add(`header{position:sticky;top:env(safe-area-inset-top,0px);z-index:9;background:var(--surface);border-bottom:1px solid var(--line);flex:none}`,
`header{position:sticky;top:env(safe-area-inset-top,0px);z-index:9;background:var(--surface);border-bottom:1px solid var(--line);
  flex:none;transition:box-shadow .2s ease}
header.staccata{box-shadow:var(--e2)}`);

add(`.tools button{appearance:none;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;font-size:12px;
  font-weight:600;padding:6px 11px;border-radius:999px;cursor:pointer;flex:none;white-space:nowrap}
.tools button:hover{border-color:var(--accent)}
.tools button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}`,
`.tools button{appearance:none;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;font-size:12px;
  font-weight:600;padding:6px 11px;border-radius:999px;cursor:pointer;flex:none;white-space:nowrap;
  box-shadow:var(--e1),var(--ring);transition:transform .14s ease, box-shadow .14s ease, border-color .14s ease}
.tools button:hover{border-color:var(--accent);transform:translateY(-1px);box-shadow:var(--e2),var(--ring)}
.tools button:active{transform:translateY(1px) scale(.98);box-shadow:var(--sunk)}
.tools button[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent);
  box-shadow:var(--e2), inset 0 1px 0 rgba(255,255,255,.22)}`);

add(`details.mod{border:1px solid var(--line);border-radius:9px;background:var(--bg);margin-bottom:6px}`,
`details.mod{border:1px solid var(--line);border-radius:10px;background:var(--bg);margin-bottom:6px;
  box-shadow:var(--e1),var(--ring);transition:box-shadow .18s ease}
details.mod:hover,details.mod[open]{box-shadow:var(--e2),var(--ring)}
details.mod[open] .inner{animation:entra .22s ease both}
details.mod>summary::after{transition:transform .2s ease}
details.mod[open]>summary::after{transform:rotate(180deg)}`);

add(`.kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:8px}
.tile{border:1px solid var(--line);border-radius:10px;background:var(--surface);padding:11px 12px}`,
`.kpi{display:grid;grid-template-columns:repeat(auto-fit,minmax(118px,1fr));gap:9px;perspective:900px}
.tile{border:1px solid var(--line);border-radius:11px;background:var(--surface);padding:11px 12px;
  box-shadow:var(--e1),var(--ring);transform-style:preserve-3d;
  transition:box-shadow .2s ease, transform .2s cubic-bezier(.22,.7,.26,1)}
.tile.sollevata{box-shadow:var(--e3),var(--ring)}`);

add(`.panel{border:1px solid var(--line);border-radius:10px;background:var(--surface);overflow:hidden}`,
`.panel{border:1px solid var(--line);border-radius:11px;background:var(--surface);overflow:hidden;
  box-shadow:var(--e2),var(--ring)}`);

add(`.score{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap}
.score .big{font-size:46px;font-weight:700;line-height:.92;letter-spacing:-.03em;font-family:var(--font-ui)}
.score .big i{font-style:normal;font-size:20px;font-weight:600;color:var(--muted);margin-left:2px}
.score .leg{font-size:12px;color:var(--muted);line-height:1.45;flex:1;min-width:150px}
.meter{height:8px;border-radius:4px;background:var(--track);overflow:hidden;margin-top:11px}
.meter i{display:block;height:100%;background:var(--viz);border-radius:4px}`,
`.score{display:flex;align-items:flex-end;gap:12px;flex-wrap:wrap;position:relative;isolation:isolate}
.score::before{content:"";position:absolute;z-index:-1;left:-14px;top:-18px;width:190px;height:150px;pointer-events:none;
  background:radial-gradient(60% 55% at 32% 42%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 72%)}
.score .big{font-size:46px;font-weight:700;line-height:.92;letter-spacing:-.03em;font-family:var(--font-ui);
  text-shadow:0 1px 0 rgba(255,255,255,.5), 0 2px 7px rgba(28,25,20,.14)}
:root[data-theme="dark"] .score .big{text-shadow:0 1px 0 rgba(255,255,255,.07), 0 3px 12px rgba(0,0,0,.6)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .score .big{
  text-shadow:0 1px 0 rgba(255,255,255,.07), 0 3px 12px rgba(0,0,0,.6)}}
.score .big i{font-style:normal;font-size:20px;font-weight:600;color:var(--muted);margin-left:2px;text-shadow:none}
.score .leg{font-size:12px;color:var(--muted);line-height:1.45;flex:1;min-width:150px}
.meter{height:9px;border-radius:5px;background:var(--track);overflow:hidden;margin-top:11px;box-shadow:var(--sunk)}
.meter i{display:block;height:100%;border-radius:5px;width:0;
  background:linear-gradient(180deg, color-mix(in oklab, var(--viz) 82%, white), var(--viz));
  box-shadow:var(--lift), inset 0 1px 0 rgba(255,255,255,.3);
  transition:width .7s cubic-bezier(.22,.7,.26,1)}`);

add(`.caso{border-top:1px solid var(--line-soft);padding:13px}
.caso:first-child{border-top:0}`,
`.caso{border-top:1px solid var(--line-soft);padding:13px;transform-style:preserve-3d;
  transition:transform .22s cubic-bezier(.22,.7,.26,1), box-shadow .22s ease}
.caso:first-child{border-top:0}
.caso.sollevata{box-shadow:var(--e2);border-radius:10px;position:relative;z-index:1;background:var(--surface)}`);

add(`.steps i{flex:1;height:5px;border-radius:2px;background:var(--track)}
.steps i.on{background:var(--viz)}
.steps i.cur{background:var(--accent)}`,
`.steps i{flex:1;height:5px;border-radius:3px;background:var(--track);box-shadow:var(--sunk);
  transition:transform .3s cubic-bezier(.22,.7,.26,1), background .3s ease}
.steps i.on{background:var(--viz);box-shadow:var(--lift)}
.steps i.cur{background:var(--accent);height:7px;margin:-1px 0;border-radius:4px;
  box-shadow:var(--e1), 0 0 0 3px color-mix(in oklab, var(--accent) 18%, transparent)}`);

add(`.bar{fill:var(--viz)}`,
`.bar{fill:url(#gBar);transform-box:fill-box;transform-origin:bottom;
  animation:cresci .55s cubic-bezier(.22,.7,.26,1) both;animation-delay:calc(var(--i,0)*45ms)}
.barOmbra{fill:rgba(28,25,20,.1);transform-box:fill-box;transform-origin:bottom;
  animation:cresci .55s cubic-bezier(.22,.7,.26,1) both;animation-delay:calc(var(--i,0)*45ms)}
:root[data-theme="dark"] .barOmbra{fill:rgba(0,0,0,.45)}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]) .barOmbra{fill:rgba(0,0,0,.45)}}`);

add(`.chip{appearance:none;text-align:left;border:1px solid var(--line);background:var(--surface);color:var(--fg);font:inherit;
  padding:9px 11px;border-radius:9px;cursor:pointer;min-width:0}
.chip:hover{border-color:var(--accent)}`,
`.chip{appearance:none;text-align:left;border:1px solid var(--line);background:var(--surface);color:var(--fg);font:inherit;
  padding:9px 11px;border-radius:10px;cursor:pointer;min-width:0;box-shadow:var(--e1),var(--ring);
  transition:transform .16s cubic-bezier(.22,.7,.26,1), box-shadow .16s ease, border-color .16s ease}
.chip:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:var(--e2),var(--ring)}
.chip:active{transform:translateY(0) scale(.99);box-shadow:var(--e1)}`);

add(`.mine .body{background:var(--surface-2);border-radius:10px;padding:10px 13px;font-size:14.5px;line-height:1.5;white-space:pre-wrap;
  word-break:break-word}`,
`.mine .body{background:var(--surface-2);border-radius:11px;padding:10px 13px;font-size:14.5px;line-height:1.5;white-space:pre-wrap;
  word-break:break-word;box-shadow:var(--e1),var(--ring);animation:sali .3s cubic-bezier(.22,.7,.26,1) both}`);

add(`.thinking{font-size:13px;color:var(--muted);font-style:italic}`,
`.thinking{font-size:13px;color:var(--muted);font-style:italic;animation:respira 1.5s ease-in-out infinite}`);

add(`.send{appearance:none;border:0;background:var(--accent);color:var(--accent-ink);font:inherit;font-size:12.5px;font-weight:700;
  padding:10px 14px;border-radius:9px;cursor:pointer;flex:none}
.send[disabled]{opacity:.45;cursor:default}`,
`.send{appearance:none;border:0;background:linear-gradient(180deg, color-mix(in oklab, var(--accent) 88%, white), var(--accent));
  color:var(--accent-ink);font:inherit;font-size:12.5px;font-weight:700;
  padding:10px 14px;border-radius:10px;cursor:pointer;flex:none;
  box-shadow:var(--e2), inset 0 1px 0 rgba(255,255,255,.28);transition:transform .13s ease, box-shadow .13s ease}
.send:hover{transform:translateY(-1px);box-shadow:var(--e3), inset 0 1px 0 rgba(255,255,255,.28)}
.send:active{transform:translateY(1px) scale(.985);box-shadow:var(--e1), inset 0 1px 3px rgba(0,0,0,.2)}
.send[disabled]{opacity:.45;cursor:default;transform:none;box-shadow:var(--e1)}`);

add(`.sheet{position:fixed;inset:0;z-index:20;background:rgba(10,11,13,.45);display:flex;align-items:flex-end;justify-content:center}
.sheet>div{background:var(--surface);width:100%;max-width:820px;max-height:88%;overflow-y:auto;border-radius:14px 14px 0 0;
  border-top:1px solid var(--line);`,
`.sheet{position:fixed;inset:0;z-index:20;background:rgba(10,11,13,.45);display:flex;align-items:flex-end;justify-content:center;
  animation:entra .18s ease both;backdrop-filter:blur(2px)}
.sheet>div{background:var(--surface);width:100%;max-width:820px;max-height:88%;overflow-y:auto;border-radius:16px 16px 0 0;
  border-top:1px solid var(--line);box-shadow:var(--e3),var(--ring);
  animation:suscard .3s cubic-bezier(.22,.78,.26,1) both;`);

/* ---------- JS ---------- */
add(`function el(t,c,x){var e=document.createElement(t); if(c)e.className=c; if(x!=null)e.textContent=x; return e;}`,
`function el(t,c,x){var e=document.createElement(t); if(c)e.className=c; if(x!=null)e.textContent=x; return e;}
var fermo=false, puntatoreFine=false;
try{ fermo=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
     puntatoreFine=window.matchMedia("(hover: hover) and (pointer: fine)").matches; }catch(e){}
/* conta fino a un numero, invece di comparire */
function conta(nodo,fino){
  if(fermo||fino<=0){ nodo.textContent=String(fino); return; }
  var dur=Math.min(900,420+fino*14), t0=null;
  function passo(t){
    if(t0===null)t0=t;
    var p=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-p,3);
    nodo.textContent=String(Math.round(fino*e));
    if(p<1)requestAnimationFrame(passo); else nodo.textContent=String(fino);
  }
  nodo.textContent="0"; requestAnimationFrame(passo);
}
/* riempi una pista dopo l'inserimento, cosi' la transizione parte */
function riempi(barra,perc){
  if(fermo){ barra.style.transition="none"; barra.style.width=perc+"%"; return; }
  requestAnimationFrame(function(){ requestAnimationFrame(function(){ barra.style.width=perc+"%"; }); });
}
/* inclinazione al puntatore: solo mouse, mai al tocco, mai con movimento ridotto */
function inclina(nodo,gradi){
  if(fermo||!puntatoreFine)return;
  var g=gradi||4;
  nodo.addEventListener("pointermove",function(ev){
    if(ev.pointerType!=="mouse")return;
    var r=nodo.getBoundingClientRect();
    var x=(ev.clientX-r.left)/r.width-.5, y=(ev.clientY-r.top)/r.height-.5;
    nodo.style.transform="perspective(900px) rotateY("+(x*g).toFixed(2)+"deg) rotateX("+(-y*g).toFixed(2)+"deg) translateZ(6px)";
    nodo.classList.add("sollevata");
  });
  nodo.addEventListener("pointerleave",function(){
    nodo.style.transform=""; nodo.classList.remove("sollevata");
  });
}`);

add(`  function tile(lab,val,uni,cls){
    var t=el("div","tile"); t.appendChild(el("div","k",lab));
    var v=el("div","v num",String(val)); t.appendChild(v);
    if(uni){ var u=el("div","u"); if(cls){ var p=el("span","pill "+cls); p.appendChild(el("i","dot"));
        p.appendChild(document.createTextNode(uni)); u.appendChild(p); } else u.textContent=uni; t.appendChild(u); }
    k.appendChild(t);
  }`,
`  var iT=0;
  function tile(lab,val,uni,cls){
    var t=el("div","tile sali"); t.style.setProperty("--i",iT++);
    t.appendChild(el("div","k",lab));
    var v=el("div","v num"); t.appendChild(v); conta(v,val);
    if(uni){ var u=el("div","u"); if(cls){ var p=el("span","pill "+cls); p.appendChild(el("i","dot"));
        p.appendChild(document.createTextNode(uni)); u.appendChild(p); } else u.textContent=uni; t.appendChild(u); }
    inclina(t,5); k.appendChild(t);
  }`);

add(`    var sc=el("div","score");
    var big=el("div","big num",String(perc)); big.appendChild(el("i",null,"%")); sc.appendChild(big);
    sc.appendChild(el("div","leg",chiusi+" impegni chiusi su "+tot+(scad?" · "+scad+" oltre la data concordata":"")));
    sb.appendChild(sc);
    var m=el("div","meter"); var mi=el("i"); mi.style.width=perc+"%"; m.appendChild(mi); sb.appendChild(m);`,
`    var sc=el("div","score");
    var big=el("div","big num"); var np=el("span"); big.appendChild(np); big.appendChild(el("i",null,"%"));
    sc.appendChild(big); conta(np,perc);
    sc.appendChild(el("div","leg",chiusi+" impegni chiusi su "+tot+(scad?" · "+scad+" oltre la data concordata":"")));
    sb.appendChild(sc);
    var m=el("div","meter"); var mi=el("i"); m.appendChild(mi); sb.appendChild(m); riempi(mi,perc);`);

add(`    var ord={aperto:0,corso:1,risolto:2};
    schede.slice().sort(function(a,b){ return ord[statoDi(a)]-ord[statoDi(b)]; }).forEach(function(s){ cp.appendChild(caso(s)); });`,
`    var ord={aperto:0,corso:1,risolto:2};
    schede.slice().sort(function(a,b){ return ord[statoDi(a)]-ord[statoDi(b)]; }).forEach(function(s,i){
      var n=caso(s); n.classList.add("sali"); n.style.setProperty("--i",i+3); inclina(n,2.2); cp.appendChild(n);
    });`);

add(`  var s=sv("svg",{class:"chart",viewBox:"0 0 "+W+" "+H,role:"img",
    "aria-label":"Impegni chiusi per settimana nelle ultime otto settimane"});`,
`  var s=sv("svg",{class:"chart",viewBox:"0 0 "+W+" "+H,role:"img",
    "aria-label":"Impegni chiusi per settimana nelle ultime otto settimane"});
  var defs=sv("defs"), gr=sv("linearGradient",{id:"gBar",x1:"0",y1:"0",x2:"0",y2:"1"});
  gr.appendChild(sv("stop",{offset:"0","stop-color":"var(--viz)","stop-opacity":"1"}));
  gr.appendChild(sv("stop",{offset:"1","stop-color":"var(--viz)","stop-opacity":".72"}));
  defs.appendChild(gr); s.appendChild(defs);`);

add(`    if(x.n>0) s.appendChild(sv("rect",{class:"bar",x:cx-bar/2,y:y,width:bar,height:Math.max(h,3),rx:4}));`,
`    if(x.n>0){
      s.appendChild(sv("rect",{class:"barOmbra",x:cx-bar/2+1.5,y:y+2,width:bar,height:Math.max(h,3),rx:4,style:"--i:"+k}));
      s.appendChild(sv("rect",{class:"bar",x:cx-bar/2,y:y,width:bar,height:Math.max(h,3),rx:4,style:"--i:"+k}));
    }`);

add(`    var m=el("div","meter"); var mi=el("i"); mi.style.width=Math.round(ch/mine.length*100)+"%"; m.appendChild(mi);
    pr.appendChild(m);`,
`    var m=el("div","meter"); var mi=el("i"); m.appendChild(mi);
    pr.appendChild(m); riempi(mi,Math.round(ch/mine.length*100));`);

add(`  if(v==="plancia") disegnaPlancia();
  else if(v==="guida") disegnaGuida();
  else if(!turni.length) home();
  document.getElementById("main").scrollTop=0;`,
`  if(v==="plancia") disegnaPlancia();
  else if(v==="guida") disegnaGuida();
  else if(!turni.length) home();
  var attiva=v==="plancia"?plancia:v==="guida"?guida:flow;
  if(!fermo){ attiva.classList.remove("vista-entra"); void attiva.offsetWidth; attiva.classList.add("vista-entra"); }
  document.getElementById("main").scrollTop=0;`);

add(`  fine.appendChild(b1); fine.appendChild(b2); guida.appendChild(fine);
  guida.dataset.pronta="1";`,
`  fine.appendChild(b1); fine.appendChild(b2); guida.appendChild(fine);
  Array.prototype.forEach.call(guida.children,function(n,i){
    n.classList.add("sali"); n.style.setProperty("--i",i);
  });
  guida.dataset.pronta="1";`);

add(`ripresa=leggiSessione();
home(); autoAlza();`,
`/* la testata si stacca quando il contenuto le scorre sotto */
(function(){
  var m=document.getElementById("main"), h=document.querySelector("header"), ultimo=false;
  m.addEventListener("scroll",function(){
    var giu=m.scrollTop>6;
    if(giu!==ultimo){ ultimo=giu; h.classList.toggle("staccata",giu); }
  },{passive:true});
})();
ripresa=leggiSessione();
home(); autoAlza();`);

let ko = 0;
P.forEach(([a, b], n) => {
  const c = s.split(a).length - 1;
  if (c !== 1) { console.log("SOSTITUZIONE " + (n + 1) + " trovata " + c + " volte: " + a.slice(0, 70).replace(/\n/g, "\\n")); ko++; return; }
  s = s.replace(a, b);
});
if (ko) { console.log("\n" + ko + " sostituzioni non applicate — niente scritto."); process.exit(1); }

fs.writeFileSync(out, s);
console.log("fuse " + P.length + " modifiche su " + out + " — " + (s.length / 1024).toFixed(0) + " KB");
