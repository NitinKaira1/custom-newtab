const $=q=>document.querySelector(q),$$=q=>[...document.querySelectorAll(q)];
const G=["linear-gradient(135deg,#0f2027,#203a43,#2c5364)","linear-gradient(135deg,#1a0f2e,#4a1d6b,#c2417a)","linear-gradient(135deg,#0b0e14,#1b2a49,#3b6ea5)","linear-gradient(135deg,#141e14,#2d5a3d,#9bc27a)","linear-gradient(135deg,#1c1010,#7a2e1d,#f2a65a)","radial-gradient(circle at 70% 30%,#243b6b,#05070d 70%)"];
const LIB=[ // Add favourites here: {n:"Name",t:"video"|"img"|"css",s:"file or URL",p:"optional poster image for videos"}
 {n:"Deep sea",t:"css",s:G[0]},{n:"Dusk",t:"css",s:G[1]},{n:"Midnight",t:"css",s:G[2]},{n:"Forest",t:"css",s:G[3]},{n:"Ember",t:"css",s:G[4]},{n:"Eclipse",t:"css",s:G[5]}
 // {n:"Black hole",t:"video",s:"wallpapers/blackhole.mp4",p:"wallpapers/blackhole.jpg"},
 // {n:"Mountains",t:"img",s:"wallpapers/mountains.jpg"},
];
const F={sans:'system-ui,-apple-system,"Segoe UI",sans-serif',serif:'Georgia,"Times New Roman",serif',mono:'ui-monospace,Consolas,monospace',round:'ui-rounded,"Segoe UI Variable Display","Trebuchet MS",sans-serif'};
const D={pw:true,wp:{},ssl:[],sso:"shuf",ld:"grow",ldd:2.5,dh:6,nh:18,dayN:"",nightN:"",dayT:"",nightT:"",sBm:false,bmf:"",bml:"grid",bms:56,bmn:true,bmt:true,bmw:560,vz:[],vm:"tab",aw:[],rot:{},clw:600,cls:-.02,sh:.35,vg:0,tint:"#000000",ox:50,oy:50,kb:false,px:false,gap:14,va:"center",snap:false,zen:false,tile:92,lbl:true,cw:560,ph:"Search or type a URL",af:false,greet:"",df:"long",lite:false,br:1,sa:1,wb:0,fit:"cover",vs:1,snd:false,ss:"off",dn:false,day:"",night:"",sWx:false,sPm:false,sCal:false,sCd:false,sQt:false,cst:"w6",gs:"frost",go:.1,rad:14,tc:"#ffffff",city:"",unit:"C",cdn:"",cdd:"",scenes:{},pos:{},scl:{},sNotes:false,sTodo:false,todos:[],notes:"",css:"",bg:"g2",dim:.25,blur:12,ac:"#5eead4",font:"sans",h24:false,sec:false,cs:96,name:"",sClock:true,sDate:true,sGreet:true,sSearch:true,sLinks:true,eng:"https://duckduckgo.com/?q=",links:[{n:"YouTube",u:"https://youtube.com"},{n:"Pinterest",u:"https://pinterest.com"},{n:"Steam",u:"https://store.steampowered.com"},{n:"GitHub",u:"https://github.com"}]};
let s;try{s={...D,...JSON.parse(localStorage.getItem("nt")||"{}")}}catch(e){s={...D}}
let svT,dead=0;const flush=()=>{clearTimeout(svT);if(dead)return;try{localStorage.setItem("nt",JSON.stringify(s))}catch(e){}},save=()=>{clearTimeout(svT);svT=setTimeout(flush,250)};addEventListener("pagehide",flush);
const db=new Promise(r=>{try{const q=indexedDB.open("nt",1);q.onupgradeneeded=()=>q.result.createObjectStore("m",{keyPath:"id"});q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)}catch(e){r(null)}});
const tx=async(m,f)=>{const d=await db;if(!d)return;return new Promise(r=>{const t=d.transaction("m",m),q=f(t.objectStore("m"));t.oncomplete=()=>r(q&&q.result);t.onerror=()=>r()})};
let url=0;
async function bg(){
 const el=$("#bg");el.innerHTML="";if(url){URL.revokeObjectURL(url);url=0}
 if(cb()[0]=="l"){const L=LIB[+cb().slice(1)];el.style.background=G[2];if(!L)return;if(L.t=="css"){el.style.background=L.s;return}
  const v=L.t=="video",m=document.createElement(v?"video":"img");if(v&&s.lite)return;m.src=L.s;
  if(v){m.muted=m.loop=m.autoplay=m.playsInline=true;m.preload="auto";if(L.p)el.style.background=`url("${L.p}") center/cover`;m.oncanplay=()=>m.classList.add("on");m.play().catch(()=>{})}else m.onload=()=>m.classList.add("on");
  el.prepend(m);return}
 const i=cb()[0]=="g"?+cb().slice(1):-1;el.style.background=G[i>=0?i:2];
 if(i>=0)return;
 const r=await tx("readonly",st=>st.get(cb()));if(!r)return;
 if(r.poster)el.style.background=`url(${r.poster}) center/cover`;url=URL.createObjectURL(r.blob);
 const v=r.blob.type.startsWith("video"),m=document.createElement(v?"video":"img");
 if(v&&s.lite)return;m.src=url;
 if(v){m.muted=m.loop=m.autoplay=m.playsInline=true;m.preload="auto";m.oncanplay=()=>m.classList.add("on");m.play().catch(()=>{})}
 else m.onload=()=>m.classList.add("on");
 el.prepend(m);
}
document.addEventListener("visibilitychange",()=>{const v=$("#bg video");if(v)document.hidden?v.pause():v.play().catch(()=>{})});
const DF={long:{weekday:"long",month:"long",day:"numeric"},short:{weekday:"short",month:"short",day:"numeric"},num:{day:"2-digit",month:"2-digit",year:"numeric"},day:{weekday:"long"}};const tE=$("#t"),aE=$("#ap"),dE=$("#d"),gE=$("#gr");let tk="";
const put=(e,t)=>{if(e.textContent!==t)e.textContent=t};
function tick(){const d=new Date(),m=d.getMinutes(),g=d.getHours();let h=g,a="";
 if(!s.h24){a=h<12?"AM":"PM";h=h%12||12}
 const p=n=>String(n).padStart(2,"0");
 put(tE,(s.h24?p(h):h)+":"+p(m)+(s.sec?":"+p(d.getSeconds()):""));put(aE,a);
 if(s.cst=="analog"){$("#hh").setAttribute("transform",`rotate(${(g%12)*30+m/2})`);$("#hm").setAttribute("transform",`rotate(${m*6})`);const hs=$("#hs");hs.style.display=s.sec?"":"none";hs.setAttribute("transform",`rotate(${d.getSeconds()*6})`)}
 const k=d.getDate()+"|"+g+"|"+s.name+s.greet+s.df;
 if(k!==tk){tk=k;put(dE,d.toLocaleDateString(undefined,DF[s.df]||DF.long));put(gE,s.greet||(g<5?"Still up":g<12?"Good morning":g<17?"Good afternoon":"Good evening")+(s.name?", "+s.name:""))}}
function apply(){
 const r=document.documentElement.style;
 r.setProperty("--ac",s.ac);r.setProperty("--dim",s.dim);r.setProperty("--bl",s.blur+"px");r.setProperty("--cs",s.cs+"px");
 document.body.style.fontFamily=F[s.font]||F.sans;
 [["sClock","#clock"],["sDate","#d"],["sGreet","#gr"],["sSearch","#sf"],["sLinks","#lk"]].forEach(([k,q])=>$(q).hidden=!s[k]);
 tick();
}
function links(){
 const lk=$("#lk"),ll=$("#ll");lk.innerHTML=ll.innerHTML="";
 s.links.forEach((l,i)=>{
  let h="";try{h=new URL(l.u).hostname}catch(e){}
  let n=0;for(const c of h)n=(n*31+c.charCodeAt(0))%360;
  const a=document.createElement("a");a.href=l.u;
  const b=document.createElement("b");b.textContent=(l.n[0]||"?").toUpperCase();b.style.background=`hsl(${n} 55% 42%)`;
  if(window.chrome&&chrome.runtime&&chrome.runtime.id){const im=new Image();im.width=im.height=26;im.alt="";im.src=chrome.runtime.getURL("/_favicon/")+"?pageUrl="+encodeURIComponent(l.u)+"&size=32";im.onload=()=>{b.textContent="";b.style.background="rgba(255,255,255,.14)";b.append(im)}}
  const t=document.createElement("span");t.textContent=l.n;a.append(b,t);lk.append(a);
  const row=document.createElement("div");row.className="lr";
  const sp=document.createElement("span");sp.textContent=l.n+" · "+h;
  const x=document.createElement("button");x.className="btn";x.textContent="Remove";
  x.onclick=()=>{s.links.splice(i,1);save();links()};
  const u=document.createElement("button");u.className="btn";u.textContent="↑";u.onclick=()=>{if(i){[s.links[i-1],s.links[i]]=[s.links[i],s.links[i-1]];save();links()}};
  const ed=document.createElement("button");ed.className="btn";ed.textContent="Edit";ed.onclick=()=>{$("#ln").value=l.n;$("#lu").value=l.u;s.links.splice(i,1);save();links()};
  row.append(sp,u,ed,x);ll.append(row);
 });
}
async function gallery(){const box=$("#bgs");box.innerHTML="";
 const all=await tx("readonly",st=>st.getAll())||[];
 if(!all.length){box.textContent="No uploads yet";box.style.opacity=.6;return}box.style.opacity="";
 all.forEach(m=>{const b=document.createElement("button");b.className="sw up"+(s.bg==m.id?" on":"");b.style.background=m.poster?`url("${m.poster}") center/cover`:"#222";
  const u=document.createElement("u");u.textContent=m.name.slice(0,14);const k=document.createElement("i");k.textContent="×";k.title="Delete";
  k.onclick=async e=>{e.stopPropagation();await tx("readwrite",st=>st.delete(m.id));if(s.bg==m.id){s.bg="g2";save();bg()}gallery()};
  b.append(u,k);b.title=m.name;b.onclick=()=>pick(m.id);box.append(b)})}
function pick(id){s.bg=id;save();bg();gallery()}
$("#up").onclick=()=>$("#f").click();
$("#f").onchange=async e=>{
 let last;
 for(const f of e.target.files){last="m"+Date.now()+Math.random().toString(36).slice(2,6);const po=await poster(f);if(!await tx("readwrite",st=>st.put({id:last,name:f.name,blob:f,poster:po}))){toast("Couldn't save "+f.name+" (storage may be full)");last=0;continue}wnc[last]=f.name;toast("Added "+f.name)}
 e.target.value="";if(last)pick(last);
};
$$("[data-k]").forEach(i=>{
 const k=i.dataset.k;
 if(i.type=="checkbox")i.checked=!!s[k];else i.value=s[k];
 i.oninput=()=>{s[k]=i.type=="checkbox"?i.checked:i.type=="range"?+i.value:i.value;save();apply()};
});
const th=$("#th");th.value=localStorage.getItem("nt-th")||"";
const setTh=()=>{th.value?document.documentElement.dataset.theme=th.value:delete document.documentElement.dataset.theme;try{localStorage.setItem("nt-th",th.value)}catch(e){}};
th.onchange=setTh;setTh();
$("#la").onclick=()=>{
 let u=$("#lu").value.trim(),n=$("#ln").value.trim();if(!u)return;
 if(!/^https?:\/\//.test(u))u="https://"+u;
 try{const h=new URL(u).hostname;s.links.push({n:n||h.replace(/^www\./,""),u})}catch(e){return}
 $("#lu").value=$("#ln").value="";save();links();
};
$("#rs").onclick=()=>{if(confirm("Reset all settings? Uploaded wallpapers stay saved.")){dead=1;try{localStorage.removeItem("nt")}catch(e){}location.reload()}};
$("#sf").onsubmit=e=>{
 e.preventDefault();const v=$("#q").value.trim();if(!v)return;
 location.href=/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(v)?(/^https?:/.test(v)?v:"https://"+v):s.eng+encodeURIComponent(v);
};
const pn=$("#pn"),tg=o=>{const was=pn.classList.contains("open");pn.classList.toggle("open",o);pn.inert=!o;$("#gear").setAttribute("aria-expanded",o);if(o){gallery();$("#x").focus()}else if(was)$("#gear").focus()};pn.inert=true;
$("#gear").onclick=()=>tg(!pn.classList.contains("open"));$("#x").onclick=()=>tg(false);
addEventListener("keydown",e=>{
 if(e.key=="Escape"){tg(false);$("#lib").hidden=true;setEdit(false)}
 else if(e.key=="/"&&document.activeElement.tagName!="INPUT"){e.preventDefault();$("#q").focus()}
});

const ap0=apply;apply=()=>{ap0();$("#cc").textContent=s.css;$("#nw").hidden=!s.sNotes;$("#tw").hidden=!s.sTodo;lay()};
const bd=document.body;
function lay(){$$("[data-w]").forEach(e=>{const w=e.dataset.w,p=s.pos[w]||[0,0];e.style.translate=`${p[0]*innerWidth}px ${p[1]*innerHeight}px`;e.style.scale=s.scl[w]||1;e.style.rotate=(s.rot[w]||0)+"deg";e.style.setProperty("--wsc",s.scl[w]||1)})}
addEventListener("resize",lay);
$("#ed").onclick=()=>{bd.classList.add("edit");$("#done").hidden=false;tg(false)};
$("#done").onclick=()=>{bd.classList.remove("edit");$("#done").hidden=true};
$("#rl").onclick=()=>{s.pos={};s.scl={};s.rot={};save();lay()};
const sync=()=>$$("[data-k]").forEach(i=>{const v=s[i.dataset.k];i.type=="checkbox"?i.checked=!!v:i.value=v});
const PRE={min:{sClock:1,sDate:0,sGreet:0,sSearch:0,sLinks:0,sNotes:0,sTodo:0},bal:{sClock:1,sDate:1,sGreet:1,sSearch:1,sLinks:1,sNotes:0,sTodo:0},full:{sClock:1,sDate:1,sGreet:1,sSearch:1,sLinks:1,sNotes:1,sTodo:1}};
$$("[data-pre]").forEach(b=>b.onclick=()=>{for(const k in PRE[b.dataset.pre])s[k]=!!PRE[b.dataset.pre][k];save();sync();apply()});
$$(".tabs button").forEach(b=>b.onclick=()=>{$$(".tabs button,.pg").forEach(e=>e.classList.remove("on"));b.classList.add("on");$("#"+b.dataset.p).classList.add("on")});
$("#dflt").onclick=()=>pick("g2");
$("#dall").onclick=async()=>{await tx("readwrite",st=>st.clear());if(s.bg[0]=="m")pick("g2");else gallery()};
$("#nta").value=s.notes;$("#nta").oninput=e=>{s.notes=e.target.value;save()};
function todos(){const l=$("#tl");l.innerHTML="";s.todos.forEach((t,i)=>{const r=document.createElement("label");r.className="td";const c=document.createElement("input");c.type="checkbox";c.checked=t.d;c.onchange=()=>{t.d=c.checked;save();todos()};const x=document.createElement("span");x.textContent=t.t;if(t.d)x.style.textDecoration="line-through";const d=document.createElement("button");d.textContent="×";d.onclick=e=>{e.preventDefault();s.todos.splice(i,1);save();todos()};r.append(c,x,d);l.append(r)})}
$("#ti").onkeydown=e=>{if(e.key=="Enter"&&e.target.value.trim()){s.todos.push({t:e.target.value.trim(),d:false});e.target.value="";save();todos()}};
todos();

const poster=f=>new Promise(r=>{const cv=document.createElement("canvas");cv.width=320;cv.height=180;const g=cv.getContext("2d"),fin=o=>{const w=o.videoWidth||o.width,h=o.videoHeight||o.height;if(!g||!w)return r();const k=Math.max(320/w,180/h);g.drawImage(o,(320-w*k)/2,(180-h*k)/2,w*k,h*k);r(cv.toDataURL("image/jpeg",.6))};
 if(f.type.startsWith("image"))return createImageBitmap(f).then(fin,()=>r());if(!f.type.startsWith("video"))return r();
 const v=document.createElement("video"),u=URL.createObjectURL(f);v.muted=true;v.src=u;v.onloadeddata=()=>{v.currentTime=Math.min(1,v.duration/2)};v.onseeked=()=>{fin(v);URL.revokeObjectURL(u)};v.onerror=()=>r()});
const WI=c=>c==0?"☀️":c<3?"⛅":c<4?"☁️":c<50?"🌫️":c<70?"🌧️":c<80?"❄️":c<90?"🌦️":"⛈️";
const wxr=c=>{$("#wx").textContent=`${WI(c.c)} ${c.T}°${s.unit} · ${c.n}`};
async function wx(){if(!s.sWx)return;const el=$("#wx");
 try{const c=JSON.parse(localStorage.getItem("nt-wx")||"null");if(c&&c.k==s.city+s.unit){wxr(c);if(Date.now()-c.t<12e5)return}
  if(!s.city){el.textContent="Set a city in Settings";return}
  const g=await(await fetch("https://geocoding-api.open-meteo.com/v1/search?count=1&name="+encodeURIComponent(s.city))).json(),p=g.results[0];
  const w=await(await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.latitude}&longitude=${p.longitude}&current=temperature_2m,weather_code${s.unit=="F"?"&temperature_unit=fahrenheit":""}`)).json();
  const n={k:s.city+s.unit,t:Date.now(),n:p.name,T:Math.round(w.current.temperature_2m),c:w.current.weather_code};localStorage.setItem("nt-wx",JSON.stringify(n));wxr(n)}
 catch(e){if(!el.textContent)el.textContent="Weather works in the extension"}}
let pt=1500,pr=0,pi;const pf=()=>{$("#pt").textContent=String(pt/60|0).padStart(2,"0")+":"+String(pt%60).padStart(2,"0")},pst=()=>{clearInterval(pi);pr=0;$("#pg").textContent="Start"};
$("#pg").onclick=()=>{if(pr)pst();else{pr=1;$("#pg").textContent="Pause";pi=setInterval(()=>{if(--pt<=0){pt=0;pst()}pf()},1000)}};
$$("[data-pm]").forEach(b=>b.onclick=()=>{pst();pt=+b.dataset.pm*60;pf()});
function cal(){const d=new Date(),y=d.getFullYear(),m=d.getMonth(),f=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate();let t="<table><tr>"+[..."SMTWTFS"].map(x=>"<th>"+x+"</th>").join("")+"</tr><tr>"+"<td></td>".repeat(f);for(let i=1;i<=n;i++){t+=`<td${i==d.getDate()?' class="to"':""}>${i}</td>`;if((f+i)%7==0&&i<n)t+="</tr><tr>"}$("#cal").innerHTML="<b>"+d.toLocaleString(undefined,{month:"long",year:"numeric"})+"</b>"+t+"</tr></table>"}
function cd(){const e=$("#cd");if(!s.cdd){e.textContent="Set a countdown in Widgets";return}const n=Math.ceil((new Date(s.cdd)-new Date(new Date().toDateString()))/864e5);e.textContent=(s.cdn||"Event")+": "+(n>0?n+" days left":n==0?"today":"passed")}
const Q=["Small steps still move you forward.","Focus on the next right thing.","Done is better than perfect.","Start before you feel ready.","Make it work, then make it beautiful.","Rest is part of the work.","One tab, one task.","Progress over perfection.","Stay curious, stay kind.","Today is a good day to build something."];
const qt=()=>{$("#qt").textContent=Q[Math.floor(Date.now()/864e5)%Q.length]};
const vp=()=>{const v=$("#bg video");if(v){v.playbackRate=s.vs;v.muted=!s.snd}};
document.addEventListener("canplay",vp,true);
async function rnd(){let all=[...LIB.map((_,i)=>"l"+i),...((await tx("readonly",st=>st.getAllKeys()))||[])];if(s.ssl&&s.ssl.length)all=all.filter(x=>s.ssl.includes(x));if(!all.length)return;let nx;
 if(s.sso=="seq")nx=all[(all.indexOf(s.bg)+1)%all.length];else{const o=all.filter(x=>x!=s.bg);nx=(o.length?o:all)[Math.random()*(o.length||all.length)|0]}
 if(nx&&nx!=s.bg){s.bg=nx;save();bg();gallery()}}
function dnc(f){if(!s.dn)return;const h=new Date().getHours(),d=+s.dh,n=+s.nh,day=d<n?(h>=d&&h<n):(h>=d||h<n),t=day?s.day:s.night;if(t&&t!=s.bg){s.bg=t;save();if(!f)bg()}}
let ssi;const ssch=()=>{clearInterval(ssi);if(!s.dn&&+s.ss>0)ssi=setInterval(rnd,s.ss*6e4)};
let ll=!!s.lite;const ap1=apply;let wt;apply=()=>{ap1();const r=document.documentElement.style;
 [["br","--br",""],["sa","--sa",""],["wb","--wb","px"],["fit","--fit",""],["tc","--tc",""],["go","--go",""],["rad","--rad","px"]].forEach(([k,v,u])=>r.setProperty(v,s[k]+u));
 ["frost","gloss","clear","oled"].forEach(c=>bd.classList.toggle(c,s.gs==c));
 $("#clock").dataset.s=s.cst;
 [["sWx","#wx"],["sPm","#pm"],["sCal","#cal"],["sCd","#cd"],["sQt","#qt"],["sBm","#bm"]].forEach(([k,q])=>$(q).hidden=!s[k]);
 if(s.sCal)cal();if(s.sCd)cd();if(s.sQt)qt();if(s.sBm)renderBM();vp();ssch();clearTimeout(wt);wt=setTimeout(wx,700);bd.classList.toggle("lite",!!s.lite);
 [["clw","--clw",""],["cls","--cls","em"],["sh","--sh",""],["vg","--vg",""],["tint","--tint",""],["ox","--ox","%"],["oy","--oy","%"],["gap","--gap","px"],["tile","--tile","px"],["cw","--cw","px"]].forEach(([k,v,u])=>r.setProperty(v,s[k]+u));
 r.setProperty("--va",{start:"flex-start",center:"center",end:"flex-end"}[s.va]||"center");
 bd.classList.toggle("kb",!!s.kb);bd.classList.toggle("nolbl",!s.lbl);bd.classList.toggle("zen",!!s.zen);$("#q").placeholder=s.ph;
 if(!s.px){const m=$("#bg").firstElementChild;if(m)m.style.translate=""}
 if(!!s.lite!==ll){ll=!!s.lite;bg()}lay()};
$$("[data-pre]").forEach(b=>b.onclick=()=>{const f=b.dataset.pre;for(const k in PRE[f])s[k]=!!PRE[f][k];["sWx","sPm","sCal","sCd","sQt","sBm"].forEach(k=>s[k]=f=="full");save();sync();apply()});
function sceneApply(k){const keep={scenes:s.scenes,todos:s.todos,notes:s.notes};s={...D,...JSON.parse(JSON.stringify(s.scenes[k])),...keep};save();sync();apply();links();lastBg=null;bg();renderAW();awPanel();renderV();vzPanel()}
function scn(){const l=$("#sl");l.innerHTML="";Object.keys(s.scenes).forEach(k=>{const r=document.createElement("div");r.className="lr";const a=document.createElement("button");a.className="btn";a.textContent=k;a.style.flex=1;a.onclick=()=>sceneApply(k);const x=document.createElement("button");x.className="btn";x.textContent="×";x.onclick=()=>{delete s.scenes[k];save();scn()};r.append(a,x);l.append(r)})}
$("#sv").onclick=()=>{const n=$("#sn").value.trim();if(!n)return;const c=JSON.parse(JSON.stringify(s));delete c.scenes;delete c.todos;delete c.notes;s.scenes[n]=c;$("#sn").value="";save();scn()};
$("#ex").onclick=()=>{const j=JSON.stringify(s,null,1);try{navigator.clipboard.writeText(j)}catch(e){}const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([j],{type:"application/json"}));a.download="newtab-settings.json";a.click();toast("Settings exported")};
$("#im").onclick=()=>$("#imf").click();
$("#imf").onchange=async e=>{try{s={...D,...JSON.parse(await e.target.files[0].text())};save();location.reload()}catch(x){toast("That file isn't a valid settings export")}};
const BANG={yt:"https://www.youtube.com/results?search_query=",g:"https://www.google.com/search?q=",gh:"https://github.com/search?q=",w:"https://en.wikipedia.org/w/index.php?search=",r:"https://www.reddit.com/search/?q="};
$("#sf").onsubmit=e=>{e.preventDefault();const v=$("#q").value.trim(),b=v.match(/^!(\w+)\s+(.+)/);if(!v)return;if(b&&BANG[b[1]])return location.href=BANG[b[1]]+encodeURIComponent(b[2]);location.href=/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/.test(v)?(/^https?:/.test(v)?v:"https://"+v):s.eng+encodeURIComponent(v)};
const cp=document.createElement("div");cp.id="cp";cp.hidden=true;cp.innerHTML='<div><input id="ci" type="text" placeholder="Shortcut, command, or !yt query"><div id="cr"></div></div>';document.body.append(cp);
let cx=0,items=[];
function crd(){const c=$("#cr");c.innerHTML="";items.slice(0,8).forEach((it,i)=>{const d=document.createElement("div");d.textContent=it.n;d.className=i==cx?"on":"";d.onclick=()=>{cp.hidden=true;it.f()};c.append(d)})}
function cmds(){const q=$("#ci").value.trim(),lq=q.toLowerCase(),b=q.match(/^!(\w+)\s+(.+)/);
 items=b&&BANG[b[1]]?[{n:"Search "+b[1]+": "+b[2],f:()=>location.href=BANG[b[1]]+encodeURIComponent(b[2])}]:[...s.links.map(l=>({n:l.n,f:()=>location.href=l.u})),{n:"Open settings",f:()=>tg(true)},{n:"Move & resize widgets",f:()=>$("#ed").click()},{n:"Wallpaper library",f:libOpen},{n:"Random wallpaper",f:rnd},{n:"Toggle zen mode",f:()=>{s.zen=!s.zen;save();sync();apply()}},...Object.keys(s.scenes).map(k=>({n:"Scene: "+k,f:()=>sceneApply(k)}))].filter(i=>i.n.toLowerCase().includes(lq));
 if(q.length>1&&!b)bmFlat.filter(x=>x.t.toLowerCase().includes(lq)||x.u.toLowerCase().includes(lq)).slice(0,4).forEach(x=>items.push({n:"★ "+x.t,f:()=>location.href=x.u}));
 if(q&&!b)items.push({n:"Search the web for "+q,f:()=>location.href=s.eng+encodeURIComponent(q)});cx=0;crd()}
$("#ci").oninput=cmds;
$("#ci").onkeydown=e=>{if(e.key=="ArrowDown"){cx=Math.min(cx+1,Math.min(items.length,8)-1);crd();e.preventDefault()}else if(e.key=="ArrowUp"){cx=Math.max(cx-1,0);crd();e.preventDefault()}else if(e.key=="Enter"&&items[cx]){cp.hidden=true;items[cx].f()}else if(e.key=="Escape")cp.hidden=true};
cp.onclick=e=>{if(e.target==cp)cp.hidden=true};
addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key=="k"){e.preventDefault();cp.hidden=false;$("#ci").value="";cmds();$("#ci").focus()}});

const tt=$("#toast");let tti;function toast(m){tt.textContent=m;tt.classList.add("on");clearTimeout(tti);tti=setTimeout(()=>tt.classList.remove("on"),3200)}
const tabs=$$(".tabs button");$$(".pg").forEach(g=>g.setAttribute("role","tabpanel"));
const selTab=b=>{tabs.forEach(t=>{t.classList.toggle("on",t==b);t.setAttribute("aria-selected",t==b)});$$(".pg").forEach(g=>g.classList.toggle("on",g.id==b.dataset.p))};
tabs.forEach((b,i)=>{b.setAttribute("role","tab");b.onclick=()=>selTab(b);b.onkeydown=e=>{const n=e.key=="ArrowRight"?1:e.key=="ArrowLeft"?-1:0;if(n){const t=tabs[(i+n+tabs.length)%tabs.length];selTab(t);t.focus()}}});selTab(tabs[0]);
try{if(!localStorage.getItem("nt-seen")){localStorage.setItem("nt-seen","1");setTimeout(()=>toast("Tip: ⚙ opens settings · Ctrl+K opens commands"),900)}}catch(e){}

$("#tk").innerHTML=Array.from({length:12},(_,i)=>`<line y1="-44" y2="-${i%3?41:38}" stroke="currentColor" stroke-width="${i%3?1:2}" transform="rotate(${i*30})"/>`).join("");
const TH={Aurora:{ac:"#5eead4",gs:"frost",go:.1,rad:16,tc:"#ffffff",dim:.25,vg:.2},Sunset:{ac:"#fb923c",gs:"gloss",go:.1,rad:20,tc:"#fff4e8",dim:.2,vg:.3},Mono:{ac:"#ffffff",gs:"clear",go:.04,rad:6,tc:"#f2f2f2",dim:.35,vg:.25},Neon:{ac:"#e879f9",gs:"gloss",go:.08,rad:14,tc:"#ffffff",dim:.3,vg:.35},OLED:{ac:"#38bdf8",gs:"oled",go:.1,rad:12,tc:"#ffffff",dim:.45,vg:0}};
$("#thm").append(...Object.keys(TH).map(n=>{const b=document.createElement("button");b.className="btn";b.textContent=n;b.onclick=()=>{Object.assign(s,TH[n]);save();sync();apply();toast(n+" theme applied")};return b}));
let rq,pk;addEventListener("mousemove",e=>{if(s.zen){bd.classList.add("peek");clearTimeout(pk);pk=setTimeout(()=>bd.classList.remove("peek"),2500)}
 if(!s.px||rq)return;rq=requestAnimationFrame(()=>{rq=0;const m=$("#bg").firstElementChild;if(m&&m.style)m.style.translate=`${(.5-e.clientX/innerWidth)*24}px ${(.5-e.clientY/innerHeight)*24}px`})});
addEventListener("keydown",e=>{if(e.key=="z"&&!e.ctrlKey&&!e.metaKey&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){s.zen=!s.zen;save();sync();apply();toast("Zen mode "+(s.zen?"on · move mouse to peek":"off"))}});
if(s.af)$("#q").focus();

const ext=!!(window.chrome&&chrome.tabs&&chrome.scripting),SH=["bar","pill","circle","card","mini"];
const IC={prev:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6L18 18V6z"/></svg>',next:'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>',play:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',pause:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>'};
const DM=[{t:"Midnight Drive",a:"Demo Artist",dur:214},{t:"Neon Skyline",a:"Demo Artist",dur:187},{t:"Slow Orbit",a:"Demo Artist",dur:240}];
let demoI=0,mpTab=0,mpWin=0;
const MP=ext?{t:"",a:"",img:"",pos:0,dur:0,play:false}:{...DM[0],img:"",pos:30,play:true};
function probe(){const m=navigator.mediaSession&&navigator.mediaSession.metadata,vs=[...document.querySelectorAll("video,audio")],v=vs.find(x=>!x.paused)||vs[0],ar=m&&m.artwork&&m.artwork.length?m.artwork[m.artwork.length-1].src:"";
 return{t:(m&&m.title)||document.title,a:(m&&m.artist)||location.hostname.replace(/^www\./,""),img:ar,pos:v?v.currentTime:0,dur:v&&isFinite(v.duration)?v.duration:0,play:v?!v.paused:false,has:!!v}}
function ctlf(cmd,arg){const vs=[...document.querySelectorAll("video,audio")],v=vs.find(x=>!x.paused)||vs[0],clk=q=>{const b=document.querySelector(q);if(b){b.click();return 1}};
 if(cmd=="toggle"){if(v)v.paused?v.play():v.pause()}
 else if(cmd=="seek"){if(v&&isFinite(v.duration))v.currentTime=arg*v.duration}
 else if(cmd=="next"){if(!clk(".ytp-next-button,ytmusic-player-bar .next-button,[data-testid=control-button-skip-forward],.skipControl__next")&&v)v.currentTime=Math.min(v.duration||1e9,v.currentTime+10)}
 else if(cmd=="prev"){if(!clk(".ytp-prev-button,ytmusic-player-bar .previous-button,[data-testid=control-button-skip-back],.skipControl__previous")&&v)v.currentTime=Math.max(0,v.currentTime-10)}}
const idle=()=>{Object.assign(MP,{t:"",a:"",img:"",pos:0,dur:0,play:false});updAW()};
async function poll(){
 if(!(s.aw.length||s.vz.length)||document.hidden)return;
 if(!ext){if(MP.play)MP.pos=(MP.pos+1)%MP.dur;updAW();return}
 try{const au=await chrome.tabs.query({audible:true});
  if(au.length&&!au.some(t=>t.id==mpTab)){mpTab=au[0].id;mpWin=au[0].windowId}
  if(!mpTab)return idle();
  const rs=await chrome.scripting.executeScript({target:{tabId:mpTab,allFrames:true},world:"MAIN",func:probe}),
   top=(rs.find(r=>r.frameId===0)||{}).result||{},best=rs.map(r=>r.result).filter(x=>x&&x.has).sort((a,b)=>b.play-a.play)[0];
  if(!best&&!au.length){mpTab=0;return idle()}
  Object.assign(MP,{t:top.t||"",a:top.a||"",img:top.img||"",pos:best?best.pos:0,dur:best?best.dur:0,play:best?best.play:false});updAW()
 }catch(e){mpTab=0;idle()}}
async function loop(){await poll();setTimeout(loop,MP.play?1000:3000)}
document.addEventListener("visibilitychange",()=>{if(!document.hidden)poll()});
function ctl(cmd,arg){
 if(!ext){if(cmd=="toggle")MP.play=!MP.play;else if(cmd=="seek")MP.pos=arg*MP.dur;else{demoI=(demoI+(cmd=="next"?1:2))%3;Object.assign(MP,DM[demoI],{pos:0})}return updAW()}
 if(mpTab)chrome.scripting.executeScript({target:{tabId:mpTab,allFrames:true},world:"MAIN",func:ctlf,args:[cmd,arg||0]}).then(()=>setTimeout(poll,250)).catch(()=>{})}
const jump=()=>{if(ext&&mpTab){chrome.tabs.update(mpTab,{active:true});chrome.windows.update(mpWin,{focused:true})}};
function mkAW(c){const e=document.createElement("section");e.dataset.w=c.id;
 e.innerHTML=`<div class="ar"><img class="ai" alt="" hidden><svg class="rg" viewBox="0 0 100 100"><circle class="g" cx="50" cy="50" r="46"/><circle class="p" cx="50" cy="50" r="46"/></svg></div><div class="tx"><b></b><span></span><div class="pb"><i></i></div></div><div class="eq"><i></i><i></i><i></i><i></i></div><div class="cb"><button data-c="prev" aria-label="Previous">${IC.prev}</button><button data-c="toggle" class="pp" aria-label="Play or pause">${IC.play}</button><button data-c="next" aria-label="Next">${IC.next}</button></div>`;
 e.querySelector(".ai").onerror=ev=>ev.target.hidden=true;
 e.onclick=ev=>{if(bd.classList.contains("edit"))return;const b=ev.target.closest("button[data-c]");if(b)return ctl(b.dataset.c);const pb=ev.target.closest(".pb");if(pb)ctl("seek",ev.offsetX/pb.offsetWidth);else if(ev.target.closest(".ar,.tx"))jump()};
 return e}
function renderAW(){$$(".aw").forEach(x=>x.remove());s.aw.forEach(c=>document.body.append(mkAW(c)));lay();updAW()}
function updAW(){$$(".aw,[data-w]").forEach(e=>{const c=s.aw.find(x=>x.id==e.dataset.w);if(!c)return;
 const cl="wg aw s-"+c.shape+(c.art?"":" no-art")+(c.txt?"":" no-txt")+(c.prg?"":" no-prg")+(c.ctl?"":" no-ctl")+(c.eq?"":" no-eq")+(MP.play?" playing":"");
 if(e.className!==cl)e.className=cl;
 c.col?e.style.setProperty("--ac",c.col):e.style.removeProperty("--ac");
 const im=e.querySelector(".ai"),pp=e.querySelector(".pp"),pr=MP.dur?Math.min(1,MP.pos/MP.dur):0,ic=MP.play?"pause":"play";
 put(e.querySelector("b"),MP.t||"Nothing playing");put(e.querySelector(".tx span"),MP.a||"Play something in another tab");
 if(MP.img){if(im.getAttribute("src")!==MP.img)im.src=MP.img;im.hidden=false}else im.hidden=true;
 e.querySelector(".pb i").style.transform=`scaleX(${pr})`;e.querySelector(".p").style.strokeDashoffset=289*(1-pr);
 if(pp.dataset.i!=ic){pp.dataset.i=ic;pp.innerHTML=IC[ic]}})}
function awPanel(){const l=$("#awl");l.innerHTML="";
 s.aw.forEach((c,i)=>{const d=document.createElement("details");d.className="ac";d.innerHTML="<summary>Player "+(i+1)+" · "+c.shape+"</summary>";
  const row=(lab,el)=>{const r=document.createElement("div");r.className="r";r.append(lab,el);d.append(r)},
   rg=(min,max,st,get,set)=>{const r=document.createElement("input");Object.assign(r,{type:"range",min,max,step:st,value:get()});r.oninput=()=>{set(+r.value);save();lay()};return r},
   sel=document.createElement("select");
  SH.forEach(x=>sel.add(new Option(x[0].toUpperCase()+x.slice(1),x)));sel.value=c.shape;sel.onchange=()=>{c.shape=sel.value;save();updAW()};
  row("Player "+(i+1)+" shape",sel);
  row("Size",rg(.4,3,.05,()=>s.scl[c.id]||1,v=>s.scl[c.id]=v));
  row("Rotate",rg(-180,180,1,()=>s.rot[c.id]||0,v=>s.rot[c.id]=v));
  const cl=document.createElement("input");cl.type="color";cl.value=c.col||s.ac;cl.oninput=()=>{c.col=cl.value;save();updAW()};row("Color",cl);
  const ch=document.createElement("div");ch.className="ch";
  [["art","Art"],["txt","Title"],["prg","Progress"],["ctl","Controls"],["eq","Bars"]].forEach(([k,n])=>{const b=document.createElement("label");b.className="chip";const x=document.createElement("input");x.type="checkbox";x.checked=!!c[k];x.onchange=()=>{c[k]=x.checked;save();updAW()};b.append(x,n);ch.append(b)});
  d.append(ch);
  const rm=document.createElement("button");rm.className="btn";rm.style.marginTop="8px";rm.textContent="Remove";rm.onclick=()=>{s.aw.splice(i,1);delete s.pos[c.id];delete s.scl[c.id];delete s.rot[c.id];save();renderAW();awPanel()};d.append(rm);
  l.append(d)})}
$("#awa").onclick=()=>{const n=s.aw.length,id="a"+Date.now().toString(36);s.aw.push({id,shape:n?"circle":"bar",art:true,txt:true,prg:true,ctl:true,eq:true,col:""});s.pos[id]=[n*.05,-n*.06];save();renderAW();awPanel()};
renderAW();awPanel();loop();

const BN=64,lv=new Float32Array(BN),SV=["bars","mirror","dots","wave","radial"];let vt=0,idleD=0,AN,fb,live=0;
async function startLive(){try{const st=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:1,width:320,height:180},audio:true}),at=st.getAudioTracks();
 if(!at.length){st.getTracks().forEach(t=>t.stop());return toast("No audio shared. Tick 'Share tab audio'.")}
 const AC=new AudioContext();AN=AC.createAnalyser();AN.fftSize=256;AN.smoothingTimeConstant=.8;AC.createMediaStreamSource(new MediaStream(at)).connect(AN);fb=new Uint8Array(AN.frequencyBinCount);live=1;
 at[0].onended=()=>{live=0;st.getTracks().forEach(t=>t.stop());toast("Live capture ended")};toast("Live audio connected")}
 catch(e){toast("Couldn't start capture"+(e&&e.name=="NotAllowedError"?" (permission denied)":""))}}
document.querySelector("[data-k=vm]").addEventListener("change",()=>{if(s.vm=="live")startLive()});
function drawV(c,cv){const x=cv.getContext("2d");if(!x)return;const W=cv.width,H=cv.height,N=c.n,d=devicePixelRatio||1,gap=c.gap*d,bw=Math.max(1,(W-gap*(N-1))/N);
 const v=i=>{const f=Math.min(BN-1.001,i/N*(BN-1)),a=f|0;return Math.min(1,(lv[a]+(lv[a+1]-lv[a])*(f-a))*c.sens)};
 x.clearRect(0,0,W,H);const g=x.createLinearGradient(0,H,0,0);g.addColorStop(0,c.col);g.addColorStop(1,c.grad?c.col2:c.col);x.fillStyle=x.strokeStyle=g;
 const rr=(X,Y,w,h)=>{x.beginPath();c.rnd&&x.roundRect?x.roundRect(X,Y,w,h,Math.min(w,h)/2):x.rect(X,Y,w,h);x.fill()},st=c.style;
 if(st=="bars")for(let i=0;i<N;i++){const h=Math.max(2*d,v(i)*H);rr(i*(bw+gap),H-h,bw,h)}
 else if(st=="mirror")for(let i=0;i<N;i++){const h=Math.max(2*d,v(i)*H);rr(i*(bw+gap),(H-h)/2,bw,h)}
 else if(st=="dots")for(let i=0;i<N;i++){const k=Math.max(1,Math.floor(v(i)*H/(bw+gap)));for(let j=0;j<k;j++){x.beginPath();x.arc(i*(bw+gap)+bw/2,H-bw/2-j*(bw+gap),bw/2,0,6.283);x.fill()}}
 else if(st=="wave"){x.lineWidth=Math.max(2,3*d);x.lineJoin="round";x.beginPath();x.moveTo(0,H/2);for(let i=0;i<N;i++)x.lineTo(i/(N-1)*W,H/2-v(i)*H/2);x.lineTo(W,H/2);for(let i=N-1;i>=0;i--)x.lineTo(i/(N-1)*W,H/2+v(i)*H/2);x.closePath();x.globalAlpha=.3;x.fill();x.globalAlpha=1;x.stroke()}
 else{const R=Math.min(W,H)/2,r0=R*.45,cx=W/2,cy=H/2;x.lineWidth=Math.max(2,Math.min(bw,6.283*r0/N*.7));x.lineCap=c.rnd?"round":"butt";for(let i=0;i<N;i++){const a=i/N*6.283-1.5708,l=Math.max(2*d,v(Math.abs(i-N/2)*2)*(R-r0));x.beginPath();x.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);x.lineTo(cx+Math.cos(a)*(r0+l),cy+Math.sin(a)*(r0+l));x.stroke()}}}
function vframe(t){requestAnimationFrame(vframe);if(document.hidden||!s.vz.length||t-vt<33)return;vt=t;const ts=t/1000,tm=s.vm=="tab"&&ext&&FX,lm=(s.vm=="live"&&live)||tm;
 if(tm){for(let i=0;i<BN;i++){const tg=Math.min(1,FX[Math.min(FX.length-1,Math.floor(Math.pow(i/BN,1.8)*60)+1)]/255*(1+i/BN*.8));lv[i]+=(tg-lv[i])*(tg>lv[i]?.65:.25)}}else if(lm){AN.getByteFrequencyData(fb);for(let i=0;i<BN;i++)lv[i]=fb[Math.min(fb.length-1,Math.floor(Math.pow(i/BN,1.7)*fb.length*.8)+1)]/255}
 else{const beat=.55+.45*Math.pow(Math.sin(ts*5.5),2);for(let i=0;i<BN;i++){const n=.5+.5*Math.sin(ts*3.1+i*.8)*Math.sin(ts*1.7+i*.33),tg=MP.play?(1-i/BN*.75)*n*beat:.03;lv[i]+=(tg-lv[i])*(tg>lv[i]?.45:.15)}}
 if(!lm&&!MP.play&&Math.max(...lv)<.04){if(idleD)return;idleD=1}else idleD=0;
 $$(".vz").forEach(e=>{const c=s.vz.find(x=>x.id==e.dataset.w);if(c)drawV(c,e.firstChild)})}
function renderV(){$$(".vz").forEach(x=>x.remove());s.vz.forEach(c=>{const e=document.createElement("section");e.dataset.w=c.id;e.append(document.createElement("canvas"));document.body.append(e)});lay();updV()}
function updV(){idleD=0;$$(".vz,[data-w]").forEach(e=>{const c=s.vz.find(x=>x.id==e.dataset.w);if(!c)return;const cl="wg vz"+(c.glass?" glass":"");if(e.className!==cl)e.className=cl;e.style.setProperty("--vw",c.w+"px");
 const cv=e.firstChild,d=devicePixelRatio||1;if(cv.width!==Math.round(c.w*d)||cv.height!==Math.round(c.h*d)){cv.width=Math.round(c.w*d);cv.height=Math.round(c.h*d);cv.style.width=c.w+"px";cv.style.height=c.h+"px"}})}
function vzPanel(){const l=$("#vzl");l.innerHTML="";
 s.vz.forEach((c,i)=>{const d=document.createElement("details");d.className="ac";d.innerHTML="<summary>Bars "+(i+1)+" · "+c.style+"</summary>";const
  row=(lab,el)=>{const r=document.createElement("div");r.className="r";r.append(lab,el);d.append(r)},
  rg=(mn,mx,st,get,set)=>{const r=document.createElement("input");Object.assign(r,{type:"range",min:mn,max:mx,step:st,value:get()});r.oninput=()=>{set(+r.value);save();lay();updV()};return r},
  sel=document.createElement("select");
  SV.forEach(x=>sel.add(new Option(x[0].toUpperCase()+x.slice(1),x)));sel.value=c.style;sel.onchange=()=>{c.style=sel.value;save();updV()};row("Bars "+(i+1)+" style",sel);
  [["Bar count","n",8,96,1],["Gap","gap",0,12,1],["Width","w",120,900,10],["Height","h",40,400,10],["Sensitivity","sens",.3,3,.05]].forEach(([lab,k,mn,mx,st])=>row(lab,rg(mn,mx,st,()=>c[k],v=>c[k]=v)));
  row("Size",rg(.4,3,.05,()=>s.scl[c.id]||1,v=>s.scl[c.id]=v));row("Rotate",rg(-180,180,1,()=>s.rot[c.id]||0,v=>s.rot[c.id]=v));
  [["Color 1","col"],["Color 2","col2"]].forEach(([lab,k])=>{const x=document.createElement("input");x.type="color";x.value=c[k];x.oninput=()=>{c[k]=x.value;save();updV()};row(lab,x)});
  const ch=document.createElement("div");ch.className="ch";
  [["rnd","Rounded"],["grad","Gradient"],["glass","Glass card"]].forEach(([k,n])=>{const b=document.createElement("label");b.className="chip";const x=document.createElement("input");x.type="checkbox";x.checked=!!c[k];x.onchange=()=>{c[k]=x.checked;save();updV()};b.append(x,n);ch.append(b)});d.append(ch);
  const rm=document.createElement("button");rm.className="btn";rm.style.marginTop="8px";rm.textContent="Remove";rm.onclick=()=>{s.vz.splice(i,1);delete s.pos[c.id];delete s.scl[c.id];delete s.rot[c.id];save();renderV();vzPanel()};d.append(rm);l.append(d)})}
$("#vza").onclick=()=>{const n=s.vz.length,id="v"+Date.now().toString(36);s.vz.push({id,style:n?"radial":"bars",n:n?48:32,gap:3,rnd:true,sens:1.2,col:"#5eead4",col2:"#e879f9",grad:true,glass:false,w:n?220:320,h:n?220:120});s.pos[id]=[n*.05,n*.05];save();renderV();vzPanel()};
renderV();vzPanel();requestAnimationFrame(vframe);

$("#ui").append($("#cd"),$("#qt"));
let dr=null,selW=null,wsv;const editing=()=>bd.classList.contains("edit");
function place(el,w){const p=s.pos[w]||[0,0],k=s.scl[w]||1;el.style.translate=`${p[0]*innerWidth}px ${p[1]*innerHeight}px`;el.style.scale=k;el.style.rotate=(s.rot[w]||0)+"deg";el.style.setProperty("--wsc",k)}
const pick1=w=>{const o=selW&&document.querySelector(`[data-w="${selW}"]`);if(o)delete o.dataset.sel;selW=w;const n=document.querySelector(`[data-w="${w}"]`);if(n)n.dataset.sel=1};
function setEdit(on){bd.classList.toggle("edit",on);$("#done").hidden=!on;pick1(null);
 $$("[data-w]").forEach(e=>{e.querySelectorAll(":scope>.eh").forEach(x=>x.remove());if(on)["s","r"].forEach(k=>{const i=document.createElement("i");i.className="eh eh-"+k;i.title=k=="s"?"Drag to resize":"Drag to rotate";e.append(i)})})}
$("#ed").onclick=()=>{tg(false);setEdit(true)};$("#done").onclick=()=>setEdit(false);
addEventListener("pointerdown",e=>{if(!editing()||e.button)return;const el=e.target.closest("[data-w]");if(!el)return;e.preventDefault();
 const w=el.dataset.w,r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,h=e.target.closest(".eh");
 dr={el,w,m:h?(h.classList.contains("eh-s")?"s":"r"):"m",x:e.clientX,y:e.clientY,cx,cy,p:(s.pos[w]||[0,0]).slice(),sc:s.scl[w]||1,ro:s.rot[w]||0,d0:Math.hypot(e.clientX-cx,e.clientY-cy)||1,a0:Math.atan2(e.clientY-cy,e.clientX-cx)};
 pick1(w);el.dataset.drag=1;try{el.setPointerCapture(e.pointerId)}catch(x){}});
addEventListener("pointermove",e=>{const d=dr;if(!d)return;d.ex=e.clientX;d.ey=e.clientY;d.sh=e.shiftKey;if(d.q)return;
 d.q=requestAnimationFrame(()=>{d.q=0;const w=d.w;
  if(d.m=="m"){let X=d.p[0]+(d.ex-d.x)/innerWidth,Y=d.p[1]+(d.ey-d.y)/innerHeight;if(s.snap){X=Math.round(X*40)/40;Y=Math.round(Y*24)/24}s.pos[w]=[Math.max(-1,Math.min(1,X)),Math.max(-1,Math.min(1,Y))]}
  else if(d.m=="s")s.scl[w]=Math.min(4,Math.max(.3,d.sc*Math.hypot(d.ex-d.cx,d.ey-d.cy)/d.d0));
  else{let a=d.ro+(Math.atan2(d.ey-d.cy,d.ex-d.cx)-d.a0)*180/Math.PI;if(d.sh||s.snap)a=Math.round(a/15)*15;s.rot[w]=Math.round(a)}
  place(d.el,w)})});
const endDrag=()=>{if(dr){delete dr.el.dataset.drag;dr=null;save()}};
addEventListener("pointerup",endDrag);addEventListener("pointercancel",endDrag);
addEventListener("wheel",e=>{if(!editing())return;const el=e.target.closest("[data-w]");if(!el)return;e.preventDefault();const w=el.dataset.w,dy=e.deltaY||e.deltaX;
 if(e.shiftKey)s.rot[w]=Math.round(((s.rot[w]||0)+dy/8)%360);else s.scl[w]=Math.min(4,Math.max(.3,(s.scl[w]||1)*Math.exp(-dy/600)));
 place(el,w);clearTimeout(wsv);wsv=setTimeout(save,200)},{passive:false});
addEventListener("dblclick",e=>{if(!editing())return;const el=e.target.closest("[data-w]");if(!el)return;const w=el.dataset.w;delete s.pos[w];delete s.scl[w];delete s.rot[w];place(el,w);save();toast("Widget reset")});
addEventListener("keydown",e=>{if(!editing()||!selW||!/^Arrow/.test(e.key))return;e.preventDefault();const p=(s.pos[selW]||[0,0]).slice(),st=e.shiftKey?.02:.004;
 if(e.key=="ArrowLeft")p[0]-=st;else if(e.key=="ArrowRight")p[0]+=st;else if(e.key=="ArrowUp")p[1]-=st;else p[1]+=st;s.pos[selW]=p;const el=document.querySelector(`[data-w="${selW}"]`);if(el)place(el,selW);clearTimeout(wsv);wsv=setTimeout(save,200)});
const DESC={"My uploads":"Your own images and videos. Click to use, × to delete.","Adjust":"Fine-tune the wallpaper. Saved separately for each wallpaper.","Auto change":"Slideshow (pick which wallpapers) and day/night switching.","Layout":"Quick presets, plus move and resize widgets.","Show":"Turn widgets on or off.","Audio players":"Now-playing widgets for music in other tabs.","Visualizer bars":"Animated equalizer widgets.","Bookmarks":"Your browser bookmarks as a grid, dock or list.","Arrange":"Spacing, alignment, snapping and zen mode.","Clock":"Clock size, style and format.","Weather & countdown":"City for weather, and an event countdown.","Shortcuts":"Edit tiles and the open animation.","Scenes":"Save and switch whole looks in one click.","Look":"Themes, glass style, colors and fonts.","Search & text":"Search bar, greeting and date format.","Custom CSS":"Advanced: your own CSS overrides.","Backup":"Export or import all settings.","Reset":"Restore defaults."};
const TIP={"Dim":"Darkens the wallpaper so text is easier to read","Brightness":"Wallpaper brightness","Saturation":"Wallpaper color intensity (0 = black & white)","Blur":"Blurs the wallpaper","Fit":"Fill crops to cover the screen; Fit shows the whole image","Focus X":"Which part of the wallpaper stays visible when cropped","Focus Y":"Which part of the wallpaper stays visible when cropped","Vignette":"Darkens the screen edges","Tint color":"Color of the dim layer","Slow zoom":"Gentle zoom animation on images","Mouse parallax":"Wallpaper shifts slightly with your mouse","Video speed":"Playback speed of video wallpapers","Video sound":"Play the video's audio","Slideshow":"Change wallpaper automatically","Save per wallpaper":"Each wallpaper remembers its own dim, brightness, blur and other adjustments","Slideshow order":"Random or one after another","Slideshow wallpapers":"Choose which wallpapers take part in the slideshow","Auto day":"Use different wallpapers by time of day","Vertical align":"Where the main content sits on screen","Spacing":"Gap between widgets","Snap to grid":"Dragged widgets line up to a grid","Zen mode":"Hides everything except the clock until you move the mouse","Weight":"Clock thickness (Regular style only)","Letter spacing":"Space between clock digits","Tile size":"Size of shortcut tiles","Open animation":"Timed full-screen animation with the site logo while the site loads behind it","Animation length":"Seconds the animation plays before the site is shown","Show names":"Show labels under shortcuts","Glass style":"Look of cards and the search bar","Glass opacity":"How solid frosted cards are","Lite mode":"Faster on slow PCs: no blur, still video frame","Corner radius":"Roundness of cards","Text shadow":"Helps text stay readable on bright wallpapers","Search width":"Width of the search bar","Focus search":"Cursor is in the search bar when a tab opens","Greeting text":"Replace the automatic greeting","Panel theme":"Light or dark style for this settings panel","Source":"Where the bars get their motion"};
$$(".pg").forEach(pg=>{let det=null,first=true;[...pg.children].forEach(k=>{if(k.tagName=="H3"){det=document.createElement("details");det.className="sec";det.open=first;first=false;const sm=document.createElement("summary");sm.textContent=k.textContent;const t=DESC[k.textContent];if(t){const sp=document.createElement("small");sp.textContent=t;sm.append(sp)}det.append(sm);k.replaceWith(det)}else if(det)det.append(k)})});
$$("#pn .r").forEach(r=>{const t=r.firstChild&&r.firstChild.nodeType==3?r.firstChild.textContent:"",k=Object.keys(TIP).find(x=>t.startsWith(x));if(k)r.title=TIP[k]});
$("#ps").oninput=e=>{const q=e.target.value.trim().toLowerCase();pn.classList.toggle("srch",!!q);
 $$("details.sec").forEach(d=>{let any=!q;const head=d.firstChild.textContent.toLowerCase().includes(q);d.querySelectorAll(".r").forEach(r=>{const m=!q||head||r.textContent.toLowerCase().includes(q)||(r.title||"").toLowerCase().includes(q);r.hidden=!m;if(m)any=true});d.hidden=!any;if(q&&any)d.open=true})};
let PV=null,libSlot=null,libF="all";const cb=()=>PV||s.bg;
async function libOpen(slot){libSlot=typeof slot=="string"?slot:null;$("#lt").textContent=libSlot=="slide"?"Pick wallpapers for the slideshow":libSlot?"Choose "+(libSlot=="day"?"Day":"Night")+" wallpaper":"Wallpaper library";$("#lib").classList.toggle("slide",libSlot=="slide");$("#lib").hidden=false;await libRender()}
const closeLib=()=>{if(PV){PV=null;bg()}libSlot=null;$("#lib").hidden=true};
async function libRender(){const f=$("#lf");f.innerHTML="";const slide=libSlot=="slide";
 [["all","All"],["up","My uploads"],["video","Videos"],["img","Images"],["css","Colors"]].forEach(([k,n])=>{const b=document.createElement("button");b.className="bch"+(libF==k?" on":"");b.textContent=n;b.onclick=()=>{libF=k;libRender()};f.append(b)});
 if(slide){const mk=(t,fn,on)=>{const b=document.createElement("button");b.className="bch"+(on?" on":"");b.textContent=t;b.onclick=fn;f.append(b)};mk("Select all",()=>{s.ssl=[];save();sslUI();libRender()});mk("Done",closeLib,1)}
 const g=$("#lg");g.innerHTML="";
 const ups=(await tx("readonly",st=>st.getAll())||[]).map(m=>({id:m.id,n:m.name,t:m.blob.type.startsWith("video")?"video":"img",th:m.poster,up:1}));
 const full=[...LIB.map((L,i)=>({id:"l"+i,n:L.n,t:L.t,css:L.t=="css",th:L.t=="css"?L.s:L.p||(L.t=="img"?L.s:"")})),...ups],ids=full.map(x=>x.id),sel=new Set(slide?(s.ssl&&s.ssl.length?s.ssl:ids):[]);
 full.filter(x=>libF=="all"||(libF=="up"?x.up:libF=="css"?x.css:x.t==libF&&!x.css)).forEach(x=>{const b=document.createElement("button");b.className="card"+((slide?sel.has(x.id):s.bg==x.id)?" on":"");if(x.css)b.style.background=x.th;else if(x.th)b.style.backgroundImage=`url("${x.th}")`;
  const n=document.createElement("span");n.textContent=(x.t=="video"?"▶ ":"")+x.n;b.append(n);
  b.onclick=()=>{PV=null;
   if(slide){if(sel.has(x.id)){if(sel.size<2)return toast("Keep at least one wallpaper");sel.delete(x.id)}else sel.add(x.id);s.ssl=sel.size==ids.length?[]:[...sel];save();sslUI();libRender();return}
   if(libSlot){const k=libSlot;s[k]=x.id;s[k+"N"]=x.n;s[k+"T"]=x.css?x.th:x.th?`url("${x.th}") center/cover`:"";save();toast((k=="day"?"Day":"Night")+" wallpaper: "+x.n);libSlot=null;$("#lib").hidden=true;dnc();dnUI()}else{pick(x.id);libRender()}};
  if(!slide){let to;b.onmouseenter=()=>{clearTimeout(to);to=setTimeout(()=>{if(s.bg!=x.id){PV=x.id;bg()}},320)};b.onmouseleave=()=>{clearTimeout(to);if(PV){PV=null;bg()}}}
  g.append(b)});
 if(!g.children.length)g.textContent="Nothing here yet"}
$("#lo").onclick=()=>libOpen();$("#lc").onclick=closeLib;
$("#lh").onpointerdown=e=>{if(e.target.closest("button"))return;const w=$("#lib"),r=w.getBoundingClientRect(),dx=e.clientX-r.left,dy=e.clientY-r.top,mv=ev=>{w.style.left=Math.max(0,Math.min(innerWidth-80,ev.clientX-dx))+"px";w.style.top=Math.max(0,Math.min(innerHeight-40,ev.clientY-dy))+"px"},up=()=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up)};addEventListener("pointermove",mv);addEventListener("pointerup",up)};
function dnUI(){const b=$("#dnbox");b.innerHTML="";const h=new Date().getHours(),d=+s.dh,n=+s.nh,day=d<n?(h>=d&&h<n):(h>=d||h<n);
 [["day","☀️ Day","dh"],["night","🌙 Night","nh"]].forEach(([k,l,hk])=>{const c=document.createElement("div");c.className="dc"+(s.dn&&(day?k=="day":k=="night")?" on":"");
  const t=document.createElement("div");t.className="dt";if(s[k+"T"])t.style.background=s[k+"T"];
  const sm=document.createElement("small");sm.textContent=l+" · from "+String(s[hk]).padStart(2,"0")+":00";
  const nm=document.createElement("b");nm.textContent=s[k]?(s[k+"N"]||"Selected"):"Not set";
  const bt=document.createElement("button");bt.className="btn";bt.textContent=s[k]?"Change":"Choose";bt.onclick=()=>libOpen(k);c.append(t,sm,nm,bt);b.append(c)});
 $("#dns").textContent=s.dn?"Now it's "+(day?"day":"night")+" → "+((day?s.dayN:s.nightN)||"no wallpaper chosen yet"):"Turn on the switch above to change wallpaper automatically."}
["dn","dh","nh"].forEach(k=>document.querySelector(`[data-k=${k}]`).addEventListener("input",()=>{dnc();dnUI()}));
dnUI();setInterval(()=>{dnc();dnUI()},6e4);
let FX=null,fxBusy=0,fxErr="";
function fxf(){try{const vs=[...document.querySelectorAll("video,audio")],v=vs.find(x=>!x.paused)||vs[0];if(!v)return{e:"none"};let W=window.__ntfx;
 if(!W||W.v!==v){if(v.mediaKeys)return{e:"drm"};if(!(navigator.userActivation&&navigator.userActivation.hasBeenActive))return{e:"gesture"};
  const src=v.currentSrc||v.src||"";if(!(src.startsWith("blob:")||src.startsWith(location.origin)))return{e:"cors"};
  const C=new(window.AudioContext||window.webkitAudioContext)(),S=C.createMediaElementSource(v),A=C.createAnalyser();A.fftSize=256;A.smoothingTimeConstant=.6;S.connect(A);A.connect(C.destination);C.resume();W=window.__ntfx={v,C,A,d:new Uint8Array(A.frequencyBinCount)}}
 if(W.C.state!="running")W.C.resume();W.A.getByteFrequencyData(W.d);return{e:0,d:Array.from(W.d)}}catch(x){return{e:"err"}}}
const FXM={drm:"This site's audio is protected. Use “Share audio” instead.",cors:"Can't tap this site's audio. Use “Share audio” instead.",gesture:"Click once on the music tab so the browser allows audio access.",none:"Play something in another tab.",err:"Couldn't read this tab's audio. Use “Share audio” instead."};
function fxNote(){const e=$("#vst");if(!e)return;e.textContent=s.vm=="tab"?(ext?(FX?"Reading real audio from the playing tab.":FXM[fxErr]||"Waiting for a playing tab…"):"Tab audio works in the extension. The preview shows a demo animation."):s.vm=="live"?"Share a tab with “Share tab audio” ticked when the browser asks.":"Simple animation that moves while music plays."}
async function fxLoop(){if(ext&&s.vz.length&&s.vm=="tab"&&mpTab&&!document.hidden&&!fxBusy){fxBusy=1;
  try{const rs=(await chrome.scripting.executeScript({target:{tabId:mpTab,allFrames:true},world:"MAIN",func:fxf})).map(r=>r.result).filter(Boolean),ok=rs.find(x=>x.d);FX=ok?ok.d:null;fxErr=ok?"":(rs.map(x=>x.e).find(e=>e&&e!="none")||"none")}catch(e){FX=null;fxErr="err"}fxBusy=0}
 fxNote();setTimeout(fxLoop,FX?70:700)}
document.querySelector("[data-k=vm]").addEventListener("change",fxNote);fxLoop();
const DEMO_BM=[{t:"Bookmarks bar",id:"1",c:[{t:"YouTube",u:"https://youtube.com"},{t:"GitHub",u:"https://github.com"},{t:"Reddit",u:"https://reddit.com"},{t:"Wikipedia",u:"https://wikipedia.org"},{t:"Dev",id:"2",c:[{t:"MDN",u:"https://developer.mozilla.org"},{t:"Stack Overflow",u:"https://stackoverflow.com"}]},{t:"News",id:"3",c:[{t:"BBC",u:"https://bbc.com"},{t:"Hacker News",u:"https://news.ycombinator.com"}]}]}];
let BM=null,bmFlat=[],bmCur=null;
const bmNorm=n=>n.url?{t:n.title||n.url,u:n.url}:{t:n.title||"Folder",id:n.id,c:(n.children||[]).map(bmNorm)};
function bmFind(id,a=BM,p=null){for(const n of a){if(n.c&&n.id==id)return{n,p};if(n.c){const r=bmFind(id,n.c,n);if(r)return r}}return null}
async function bmLoad(){if(BM)return;try{BM=window.chrome&&chrome.bookmarks?(await chrome.bookmarks.getTree())[0].children.map(bmNorm):DEMO_BM}catch(e){BM=DEMO_BM}
 bmFlat=[];const w=a=>a.forEach(n=>n.u?bmFlat.push(n):w(n.c));w(BM)}
function bmPop(){const sel=$("#bmf");sel.innerHTML="";const w=(a,d)=>a.forEach(n=>{if(n.c){sel.add(new Option("— ".repeat(d)+n.t,n.id));w(n.c,d+1)}});w(BM,0);sel.value=s.bmf||BM[0].id;sel.onchange=()=>{s.bmf=sel.value;bmCur=sel.value;save();renderBM()}}
function tile(n,u){const a=document.createElement("a");a.href=u;let h="",k=0;try{h=new URL(u).hostname}catch(e){}for(const c of h)k=(k*31+c.charCodeAt(0))%360;
 const b=document.createElement("b");b.textContent=(n[0]||"?").toUpperCase();b.style.background=`hsl(${k} 55% 42%)`;
 if(window.chrome&&chrome.runtime&&chrome.runtime.id){const im=new Image();im.alt="";im.src=chrome.runtime.getURL("/_favicon/")+"?pageUrl="+encodeURIComponent(u)+"&size=32";im.onload=()=>{b.textContent="";b.style.background="rgba(255,255,255,.14)";b.append(im)}}
 const t=document.createElement("span");t.textContent=n;a.title=n;a.append(b,t);return a}
function renderBM(){if(!s.sBm||!BM)return;const r=bmFind(bmCur||s.bmf||BM[0].id)||{n:BM[0],p:null},f=r.n,e=$("#bm");
 e.dataset.l=s.bml;e.style.setProperty("--bs",s.bms+"px");e.style.setProperty("--bw",s.bmw+"px");e.classList.toggle("nolbl",!s.bmn);
 const t=$("#bmt"),g=$("#bmg");t.innerHTML="";g.innerHTML="";t.hidden=!s.bmt;
 if(s.bmt){const mk=(l,id,on)=>{const b=document.createElement("button");b.textContent=l;b.className="bch"+(on?" on":"");b.onclick=()=>{bmCur=id;renderBM()};t.append(b)};if(r.p)mk("‹ "+r.p.t,r.p.id);mk(f.t,f.id,true);f.c.filter(x=>x.c).forEach(x=>mk(x.t,x.id))}
 f.c.filter(x=>x.u).forEach(x=>g.append(tile(x.t,x.u)));if(!g.children.length)g.textContent="No bookmarks in this folder"}
bmLoad().then(()=>{bmPop();renderBM()});
const ldE=document.createElement("div");ldE.id="ld";ldE.hidden=true;ldE.setAttribute("aria-hidden","true");
ldE.innerHTML='<div class="pg"></div><div class="lg"><div class="lw"><div class="lr"></div><div class="lb"></div></div><div class="ln"></div><div class="ls"></div></div>';document.body.append(ldE);
let ldT=0,ldO=null,ldP=null;
function ldShow(a){const fd=matchMedia("(prefers-reduced-motion: reduce)").matches||s.ld=="fade",u=a.href,n=(a.title||(a.querySelector("span")||a).textContent||"").trim(),r=a.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,D=Math.max(1,+s.ldd||2.5)*1000;
 let host="",k=0;try{host=new URL(u).hostname.replace(/^www\./,"")}catch(e){}for(const c of host)k=(k*31+c.charCodeAt(0))%360;
 ldE.style.setProperty("--lh",k);ldE.style.setProperty("--ldd",D+"ms");ldO={cx,cy};
 const lb=ldE.querySelector(".lb");lb.textContent=(n[0]||host[0]||"?").toUpperCase();lb.style.background=`hsl(${k} 55% 42%)`;
 if(window.chrome&&chrome.runtime&&chrome.runtime.id){const im=new Image();im.alt="";im.src=chrome.runtime.getURL("/_favicon/")+"?pageUrl="+encodeURIComponent(u)+"&size=64";im.onload=()=>{lb.textContent="";lb.style.background="rgba(255,255,255,.95)";lb.append(im)}}
 ldE.querySelector(".ln").textContent=n||host;ldE.querySelector(".ls").textContent=host;
 ldE.className=fd?"fade":"";ldE.classList.remove("show");ldE.style.transition="none";ldE.style.clipPath=fd?"":`circle(0px at ${cx}px ${cy}px)`;ldE.hidden=false;ldE.getBoundingClientRect();
 ldE.style.transition=fd?"":"clip-path .55s cubic-bezier(.65,0,.25,1)";ldE.style.clipPath=fd?"":`circle(150vmax at ${cx}px ${cy}px)`;ldE.classList.add("on");
 setTimeout(()=>ldE.classList.add("show"),fd?60:230);clearTimeout(ldT);ldP=null;
 const xt=!!(window.chrome&&chrome.tabs&&chrome.tabs.create);
 if(window.top!==window.self&&!xt){ldT=setTimeout(()=>{ldHide();toast("Preview only: "+host+" opens for real in the extension")},D);return}
 if(xt)ldP=chrome.tabs.create({url:u,active:false}).catch(()=>null);
 ldT=setTimeout(async()=>{try{const t=await ldP;if(t){await chrome.tabs.update(t.id,{active:true});const c=await chrome.tabs.getCurrent();if(c)chrome.tabs.remove(c.id);return}}catch(e){}location.href=u},D)}
function ldCancel(){if(ldE.hidden)return;clearTimeout(ldT);if(ldP){ldP.then(t=>t&&chrome.tabs.remove(t.id)).catch(()=>{});ldP=null}ldHide()}
function ldHide(){if(ldE.hidden)return;clearTimeout(ldT);ldE.classList.remove("show","on");if(!ldE.classList.contains("fade")&&ldO)ldE.style.clipPath=`circle(0px at ${ldO.cx}px ${ldO.cy}px)`;setTimeout(()=>{if(!ldE.classList.contains("on"))ldE.hidden=true},580)}
document.addEventListener("click",e=>{const a=e.target.closest("#lk a,#bmg a");if(!a||s.ld=="off"||e.button||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||editing())return;e.preventDefault();ldShow(a)},true);
addEventListener("pageshow",e=>{if(e.persisted)ldHide()});
addEventListener("keydown",e=>{if(e.key=="Escape")ldCancel()});
const WK=["dim","br","sa","wb","fit","ox","oy","vg","tint","kb","px","vs","snd"],snap=()=>{const o={};WK.forEach(k=>o[k]=s[k]);return o};
let lastBg=null;const wnc={};
const wname=id=>id[0]=="g"?"Gradient "+(+id.slice(1)+1):id[0]=="l"?(LIB[+id.slice(1)]||{}).n||"Library wallpaper":wnc[id]||"Uploaded wallpaper";
function wpLabel(){const e=$("#wpn");if(e)e.textContent=s.pw?"Editing: "+wname(s.bg)+(s.wp[s.bg]?" (has its own settings)":" (using defaults)"):"Settings below apply to every wallpaper."}
function loadProf(id){const b={};WK.forEach(k=>b[k]=D[k]);Object.assign(s,b,s.wd||{},s.wp[id]||{});sync();apply()}
const bg0=bg;bg=async function(){const c=cb();if(c!==lastBg){lastBg=c;if(s.pw)loadProf(c)}wpLabel();await bg0()};
if(!s.wd){s.wd=snap();save()}
WK.forEach(k=>document.querySelector(`[data-k=${k}]`).addEventListener("input",()=>{if(s.pw){s.wp[s.bg]=snap();save()}wpLabel()}));
document.querySelector("[data-k=pw]").addEventListener("input",()=>{if(s.pw){s.wp[s.bg]=snap();save()}wpLabel()});
$("#wpr").onclick=()=>{delete s.wp[s.bg];save();lastBg=null;bg();toast("This wallpaper is back to the default settings")};
$("#wpa").onclick=()=>{s.wd=snap();s.wp={};save();wpLabel();toast("These settings now apply to all wallpapers")};
tx("readonly",st=>st.getAll()).then(a=>{(a||[]).forEach(m=>wnc[m.id]=m.name);wpLabel()});
function sslUI(){$("#sslb").textContent=s.ssl&&s.ssl.length?s.ssl.length+" selected":"All wallpapers"}
$("#sslb").onclick=()=>libOpen("slide");sslUI();
apply();links();s.ss=="tab"&&!s.dn?rnd():(dnc(1),bg());setInterval(tick,1000);setInterval(dnc,6e4);scn();
