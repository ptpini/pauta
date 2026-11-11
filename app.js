/* Pauta — app de pauta de alimentación. Todo vive en este archivo; los datos se guardan en el celular. */
(function () {
"use strict";
const APP_VERSION = "2.0.1";

/* ================= Datos base ================= */
const BUILTIN = [
  {id:"leche",name:"Leche Protein Full Pro",cat:"prote",unit:"ml",base:100,def:200,p:8,c:5.4,g:0.2},
  {id:"scoop",name:"Proteína en polvo",cat:"prote",unit:"scoop",base:1,def:1,p:24,c:3,g:1.5},
  {id:"pechuga",name:"Pechuga de pollo cocida",cat:"prote",unit:"g",base:100,def:100,p:31,c:0,g:3.6},
  {id:"yogur_sp",name:"Yogurt Soprole Protein (pote 155 g)",cat:"prote",unit:"pote",base:1,def:1,p:10.2,c:9.8,g:2.8},
  {id:"huevo",name:"Huevo entero",cat:"prote",unit:"unid",base:1,def:2,p:6.3,c:0.4,g:4.8},
  {id:"atun",name:"Atún al agua (lata 160 g)",cat:"prote",unit:"lata",base:1,def:1,p:26.5,c:0,g:1},
  {id:"molida10",name:"Carne molida 10% cocida",cat:"prote",unit:"g",base:100,def:100,p:27,c:0,g:11},
  {id:"chuleta",name:"Chuleta de cerdo cocida, sin hueso",cat:"prote",unit:"g",base:100,def:120,p:27,c:0,g:14},
  {id:"avena",name:"Avena",cat:"carbo",unit:"g",base:100,def:60,p:13,c:60,g:7},
  {id:"arroz",name:"Arroz cocido",cat:"carbo",unit:"g",base:100,def:200,p:2.7,c:28,g:0.3},
  {id:"fideos",name:"Fideos cocidos",cat:"carbo",unit:"g",base:100,def:150,p:5.8,c:31,g:0.9},
  {id:"papas",name:"Papas cocidas",cat:"carbo",unit:"g",base:100,def:250,p:2,c:18,g:0.1},
  {id:"papas_d",name:"Papas doradas al horno (sin aceite)",cat:"carbo",unit:"g",base:100,def:200,p:2.5,c:22,g:0.1},
  {id:"pure",name:"Puré de papas",cat:"carbo",unit:"g",base:100,def:250,p:2,c:15,g:4},
  {id:"platano",name:"Plátano mediano",cat:"carbo",unit:"unid",base:1,def:1,p:1.3,c:25,g:0.4},
  {id:"pan",name:"Pan de molde integral",cat:"carbo",unit:"reb.",base:1,def:2,p:2.6,c:11,g:1},
  {id:"marraqueta",name:"Marraqueta",cat:"carbo",unit:"unid",base:1,def:0.5,p:9,c:56,g:1},
  {id:"lentejas",name:"Lentejas cocidas",cat:"carbo",unit:"g",base:100,def:200,p:9,c:20,g:0.4},
  {id:"verduras",name:"Verduras / ensalada",cat:"otro",unit:"g",base:100,def:150,p:1.2,c:4,g:0.2},
  {id:"aceite",name:"Aceite (maravilla u oliva)",cat:"grasa",unit:"cda",base:1,def:1,p:0,c:0,g:15},
  {id:"mani",name:"Maní sin sal",cat:"grasa",unit:"g",base:100,def:15,p:26,c:7,g:49},
  {id:"burrito",name:"Burrito o fajita (estimado)",cat:"otro",unit:"unid",base:1,def:1,p:38,c:75,g:25},
  /* --- v1.1: más alimentos genéricos --- */
  {id:"jurel",name:"Jurel natural en lata (drenado)",cat:"prote",unit:"g",base:100,def:100,p:24,c:0,g:4.9},
  {id:"quesillo_l",name:"Quesillo light",cat:"prote",unit:"g",base:100,def:100,p:13.9,c:4.4,g:1.3},
  {id:"huevo_duro",name:"Huevo duro",cat:"prote",unit:"unid",base:1,def:2,p:6.3,c:0.4,g:4.8},
  {id:"clara",name:"Clara de huevo",cat:"prote",unit:"unid",base:1,def:3,p:3.6,c:0.2,g:0.1},
  {id:"jamon_pavo",name:"Jamón de pavo (lámina 20 g)",cat:"prote",unit:"lámina",base:1,def:3,p:3.4,c:0.5,g:0.7},
  {id:"jamon_cerdo",name:"Jamón de cerdo (lámina 20 g)",cat:"prote",unit:"lámina",base:1,def:3,p:3.2,c:0.6,g:1.2},
  {id:"queso_light",name:"Queso laminado light (lámina 20 g)",cat:"prote",unit:"lámina",base:1,def:2,p:5.4,c:0.2,g:2.8},
  {id:"queso",name:"Queso gauda o mantecoso (lámina 20 g)",cat:"grasa",unit:"lámina",base:1,def:1,p:5,c:0.2,g:5.8},
  {id:"cottage",name:"Queso cottage",cat:"prote",unit:"g",base:100,def:100,p:11,c:3.4,g:4.3},
  {id:"yogur_light",name:"Yogurt light (pote 120 g)",cat:"prote",unit:"pote",base:1,def:1,p:4.4,c:6.4,g:0.2},
  {id:"leche_desc",name:"Leche descremada",cat:"prote",unit:"ml",base:100,def:200,p:3.3,c:4.8,g:0.1},
  {id:"trutro",name:"Trutro de pollo sin piel cocido",cat:"prote",unit:"g",base:100,def:120,p:26,c:0,g:8},
  {id:"molida5",name:"Carne molida 5% cocida",cat:"prote",unit:"g",base:100,def:100,p:28,c:0,g:7},
  {id:"merluza",name:"Merluza o reineta cocida",cat:"prote",unit:"g",base:100,def:150,p:20,c:0,g:1.5},
  {id:"salmon",name:"Salmón cocido",cat:"prote",unit:"g",base:100,def:120,p:22,c:0,g:12},
  {id:"arroz_int",name:"Arroz integral cocido",cat:"carbo",unit:"g",base:100,def:200,p:2.6,c:23,g:0.9},
  {id:"fideos_int",name:"Fideos integrales cocidos",cat:"carbo",unit:"g",base:100,def:150,p:5.5,c:26.5,g:0.8},
  {id:"porotos",name:"Porotos cocidos",cat:"carbo",unit:"g",base:100,def:150,p:8.7,c:23,g:0.5},
  {id:"garbanzos",name:"Garbanzos cocidos",cat:"carbo",unit:"g",base:100,def:150,p:8.9,c:27,g:2.6},
  {id:"camote",name:"Camote cocido",cat:"carbo",unit:"g",base:100,def:200,p:1.6,c:18,g:0.1},
  {id:"choclo",name:"Choclo cocido (granos)",cat:"carbo",unit:"g",base:100,def:100,p:3.3,c:19,g:1.4},
  {id:"quinoa",name:"Quínoa cocida",cat:"carbo",unit:"g",base:100,def:150,p:4.4,c:18.5,g:1.9},
  {id:"hallulla",name:"Hallulla",cat:"carbo",unit:"unid",base:1,def:1,p:8,c:51,g:8},
  {id:"tortilla",name:"Tortilla de trigo para wrap (40 g)",cat:"carbo",unit:"unid",base:1,def:1,p:3.6,c:20,g:3.2},
  {id:"manzana",name:"Manzana grande (200 g)",cat:"carbo",unit:"unid",base:1,def:1,p:0.5,c:28,g:0.3},
  {id:"naranja",name:"Naranja grande (200 g)",cat:"carbo",unit:"unid",base:1,def:1,p:1.9,c:23.5,g:0.2},
  {id:"pera",name:"Pera (180 g)",cat:"carbo",unit:"unid",base:1,def:1,p:0.7,c:27,g:0.2},
  {id:"mandarina",name:"Mandarina",cat:"carbo",unit:"unid",base:1,def:2,p:0.6,c:9.6,g:0.2},
  {id:"kiwi",name:"Kiwi",cat:"carbo",unit:"unid",base:1,def:2,p:0.8,c:11,g:0.4},
  {id:"durazno",name:"Durazno",cat:"carbo",unit:"unid",base:1,def:1,p:1.4,c:14,g:0.4},
  {id:"frutillas",name:"Frutillas",cat:"carbo",unit:"g",base:100,def:200,p:0.7,c:7.7,g:0.3},
  {id:"uvas",name:"Uvas",cat:"carbo",unit:"g",base:100,def:150,p:0.7,c:17,g:0.2},
  {id:"sandia",name:"Sandía",cat:"carbo",unit:"g",base:100,def:300,p:0.6,c:7.6,g:0.2},
  {id:"tomate",name:"Tomate (120 g)",cat:"otro",unit:"unid",base:1,def:1,p:1.1,c:4.7,g:0.2},
  {id:"brocoli",name:"Brócoli cocido",cat:"otro",unit:"g",base:100,def:200,p:2.4,c:4.4,g:0.4},
  {id:"zanahoria",name:"Zanahoria",cat:"otro",unit:"g",base:100,def:100,p:0.9,c:8,g:0.2},
  {id:"zapallo_it",name:"Zapallo italiano",cat:"otro",unit:"g",base:100,def:200,p:1.2,c:2.2,g:0.3},
  {id:"lechuga",name:"Lechuga",cat:"otro",unit:"g",base:100,def:100,p:1.2,c:1.8,g:0.2},
  {id:"pepino",name:"Pepino",cat:"otro",unit:"g",base:100,def:150,p:0.7,c:3,g:0.1},
  {id:"palta",name:"Palta",cat:"grasa",unit:"g",base:100,def:40,p:2,c:2,g:15},
  {id:"nueces",name:"Nueces",cat:"grasa",unit:"g",base:100,def:15,p:15,c:7,g:65},
  {id:"mant_mani",name:"Mantequilla de maní (cda 16 g)",cat:"grasa",unit:"cda",base:1,def:1,p:4,c:3,g:8},
  {id:"mayo",name:"Mayonesa (cda 15 g)",cat:"grasa",unit:"cda",base:1,def:1,p:0.2,c:0.4,g:11},
  {id:"mayo_light",name:"Mayonesa light (cda 15 g)",cat:"grasa",unit:"cda",base:1,def:1,p:0.1,c:1,g:5},
  {id:"completo",name:"Completo italiano (estimado)",cat:"otro",unit:"unid",base:1,def:1,p:15,c:45,g:32},
  {id:"empanada",name:"Empanada de pino (estimado)",cat:"otro",unit:"unid",base:1,def:1,p:20,c:50,g:28},
  {id:"pizza",name:"Pizza, 1 trozo (estimado)",cat:"otro",unit:"trozo",base:1,def:2,p:12,c:33,g:10},
  {id:"sushi",name:"Sushi, 10 piezas (estimado)",cat:"otro",unit:"porción",base:1,def:1,p:14,c:75,g:7},
  {id:"ciabatta",name:"Ciabatta Castaño (unidad ~110 g, estimado)",cat:"carbo",unit:"unid",base:1,def:1,p:9.7,c:55,g:3.9},
  {id:"cacao",name:"Cacao amargo en polvo (cda 5 g)",cat:"otro",unit:"cda",base:1,def:1,p:1,c:0.6,g:0.7},
  {id:"hamburguesa",name:"Hamburguesa con papas fritas (estimado)",cat:"otro",unit:"combo",base:1,def:1,p:35,c:110,g:45}
];
const CAT_LABEL = {prote:"Proteína",carbo:"Carbo",grasa:"Grasa",otro:"Otro"};
const TYPES = {
  semana:{label:"Entreno de semana",short:"Entreno semana"},
  finde:{label:"Entreno de fin de semana",short:"Entreno finde"},
  descanso:{label:"Descanso",short:"Descanso"}
};
/* Cada comida puede tener varias opciones; la primera es la que aparece por defecto. */
const ALM_ENTRENO = [
  {id:"arroz",label:"Con arroz",items:[["pechuga",100],["arroz",250],["aceite",1]]},
  {id:"lentejas",label:"Arroz con lentejas",items:[["pechuga",100],["arroz",130],["lentejas",150],["aceite",1]]},
  {id:"papas",label:"Con papas",items:[["pechuga",100],["papas",390],["aceite",1]]}
];
const CEN_ENTRENO = [
  {id:"fideos",label:"Con fideos",items:[["pechuga",100],["fideos",150],["aceite",1]]},
  {id:"papas",label:"Con papas",items:[["pechuga",100],["papas",260],["aceite",1]]},
  {id:"jurel",label:"Jurel con arroz",items:[["jurel",130],["arroz",165],["aceite",0.5]]}
];
const TEMPLATES = {
  semana:[
    {key:"des",name:"Desayuno",time:"8:00 · trabajo",options:[
      {id:"base",label:"Leche con avena",items:[["leche",400],["avena",60]]},
      {id:"ciabatta",label:"Ciabatta jamón y queso",items:[["ciabatta",1],["jamon_cerdo",2],["queso",2]]},
      {id:"overnight",label:"Avena choco-frutilla",items:[["avena",50],["leche",300],["yogur_sp",1],["cacao",1],["frutillas",100]]},
      {id:"batido",label:"Batido choco-plátano",items:[["leche",400],["avena",30],["platano",1],["cacao",1]]},
      {id:"sandwich",label:"Sándwich proteico",items:[["pan",3],["huevo_duro",2],["jamon_pavo",3],["queso_light",1],["tomate",1]]},
      {id:"wrap",label:"Wrap quesillo-jamón",items:[["tortilla",2],["quesillo_l",100],["jamon_pavo",4],["palta",30]]}
    ]},
    {key:"alm",name:"Almuerzo",time:"11:00",note:"Verduras a gusto",options:ALM_ENTRENO},
    {key:"pre",name:"Pre-entreno",time:"1:15 pm",items:[["leche",400],["avena",20],["platano",1]]},
    {key:"post",name:"Post-entreno",time:"Al terminar en el gym",items:[["leche",200],["scoop",1]]},
    {key:"cen",name:"Cena",time:"Noche",note:"Verduras a gusto",options:CEN_ENTRENO}
  ],
  finde:[
    {key:"pre",name:"Pre-entreno",time:"Al levantarte",items:[["leche",400],["avena",40]]},
    {key:"des",name:"Desayuno",time:"Después de entrenar",items:[["avena",80],["leche",200],["scoop",1]]},
    {key:"alm",name:"Almuerzo",time:"2:00 pm",note:"Verduras a gusto",options:ALM_ENTRENO},
    {key:"cen",name:"Cena",time:"7:30 pm",note:"Verduras a gusto",options:CEN_ENTRENO},
    {key:"noc",name:"Noche",time:"9:30 pm",items:[["leche",400]]}
  ],
  descanso:[
    {key:"des",name:"Desayuno",time:"8:00 · trabajo",options:[
      {id:"atun",label:"Sándwich de atún",items:[["atun",1],["pan",3],["platano",1]]},
      {id:"huevos",label:"Huevos con pan",items:[["huevo",3],["pan",3],["platano",1]]},
      {id:"yogurt",label:"Yogurt con avena",items:[["yogur_sp",2],["avena",30],["platano",1]]},
      {id:"jurel",label:"Jurel con pan",items:[["jurel",100],["pan",3],["tomate",1],["manzana",1]]},
      {id:"quesillo",label:"Quesillo con pan",items:[["quesillo_l",150],["pan",3],["manzana",1]]},
      {id:"jamonqueso",label:"Jamón y queso",items:[["pan",3],["jamon_pavo",4],["queso_light",2],["manzana",1]]},
      {id:"palta",label:"Palta, huevo y jamón",items:[["pan",3],["palta",40],["huevo_duro",2],["jamon_pavo",3],["manzana",1]]},
      {id:"yogurthuevo",label:"Yogurt, frutillas y huevo",items:[["yogur_sp",2],["avena",40],["frutillas",150],["huevo_duro",1]]},
      {id:"wrap",label:"Wrap quesillo-jamón",items:[["tortilla",2],["quesillo_l",100],["jamon_pavo",4],["palta",30]]},
      {id:"ciabatta",label:"Ciabatta jamón y queso",items:[["ciabatta",1],["jamon_cerdo",2],["queso",2]]}
    ]},
    {key:"alm",name:"Almuerzo",time:"10:30 – 11:30",note:"Verduras a gusto",options:[
      {id:"arroz",label:"Con arroz",items:[["pechuga",170],["arroz",130],["aceite",1]]},
      {id:"lentejas",label:"Con lentejas",items:[["pechuga",170],["lentejas",150],["aceite",1]]},
      {id:"papas",label:"Con papas",items:[["pechuga",170],["papas",200],["aceite",1]]}
    ]},
    {key:"col",name:"Colación",time:"3:00 pm",options:[
      {id:"batido",label:"Batido + plátano",items:[["scoop",1],["platano",1]]},
      {id:"batidom",label:"Batido + manzana",items:[["scoop",1],["manzana",1]]},
      {id:"yogurt",label:"Yogurt con avena",items:[["yogur_sp",2],["avena",20]]},
      {id:"quesillo",label:"Quesillo + fruta",items:[["quesillo_l",100],["manzana",1]]},
      {id:"huevos",label:"Huevos duros + fruta",items:[["huevo_duro",2],["manzana",1]]},
      {id:"jurel",label:"Jurel con pan",items:[["jurel",100],["pan",2]]},
      {id:"atun",label:"Sándwich de atún",items:[["atun",1],["pan",2]]}
    ]},
    {key:"cen",name:"Cena",time:"Noche",note:"Verduras a gusto",options:[
      {id:"papas",label:"Con papas",items:[["pechuga",190],["papas",250],["aceite",1]]},
      {id:"brocoli",label:"Papas y brócoli",items:[["pechuga",190],["papas",250],["brocoli",200],["aceite",1]]},
      {id:"fideos",label:"Con fideos",items:[["pechuga",190],["fideos",145],["aceite",1]]},
      {id:"jurel",label:"Jurel con papas",items:[["jurel",230],["papas",250],["aceite",0.5]]}
    ]}
  ]
};
const DEFAULT_CONFIG = {
  targets:{semana:{p:190,c:250,g:65},finde:{p:190,c:250,g:65},descanso:{p:190,c:170,g:55}},
  weekMap:{0:"finde",1:"semana",2:"descanso",3:"semana",4:"descanso",5:"semana",6:"finde"},
  carbAdjust:0, adjustLog:[]
};
const WD = ["dom","lun","mar","mié","jue","vie","sáb"];
const WD_LONG = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

/* ================= Íconos ================= */
const I = {
  left:'<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>',
  right:'<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  cam:'<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  wand:'<svg viewBox="0 0 24 24"><path d="M4 20l10-10M14 4v3M18.5 5.5l-2 2M20 10h-3M12.5 7.5l4 4"/></svg>',
  out:'<svg viewBox="0 0 24 24"><path d="M12 15V3M7 8l5-5 5 5M5 14v6h14v-6"/></svg>',
  in:'<svg viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 14v6h14v-6"/></svg>',
  warn:'<svg viewBox="0 0 24 24"><path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17.2v.1"/></svg>',
  today:'<svg viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/><circle cx="12" cy="15" r="1.4"/></svg>'
};

/* ================= Estado y guardado ================= */
const KEY = "pauta.data.v1", KEY_SET = "pauta.settings.v1";
const S = {
  config: clone(DEFAULT_CONFIG), custom: {}, days: {}, progress: {entries: []}, meta: {},
  settings: {theme: "auto", apiKey: "", model: "claude-sonnet-5-5"},
  date: todayISO(), view: "hoy", installEvt: null, storageOk: true
};
function clone(o){return JSON.parse(JSON.stringify(o))}
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){const o = JSON.parse(raw);
      S.config = Object.assign(clone(DEFAULT_CONFIG), o.config||{});
      S.custom = o.custom||{}; S.days = o.days||{}; S.progress = o.progress||{entries:[]}; S.meta = o.meta||{};}
    const st = localStorage.getItem(KEY_SET); if(st) Object.assign(S.settings, JSON.parse(st));
  }catch(e){S.storageOk = false}
  if(!S.meta.createdAt) S.meta.createdAt = todayISO();
}
let saveTimer = null;
function persist(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try{
      const days = {}; Object.keys(S.days).forEach(k => {if(S.days[k].t) days[k] = S.days[k]});
      localStorage.setItem(KEY, JSON.stringify({v:1, config:S.config, custom:S.custom, days, progress:S.progress, meta:S.meta}));
      S.storageOk = true;
    }catch(e){S.storageOk = false; toast("No se pudo guardar en el celular. Revisa el espacio disponible.")}
  }, 250);
}
function saveSettings(){try{localStorage.setItem(KEY_SET, JSON.stringify(S.settings))}catch(e){}}
function askPersistent(){try{if(navigator.storage && navigator.storage.persist) navigator.storage.persist()}catch(e){}}

/* ================= Utilidades ================= */
function pad(n){return String(n).padStart(2,"0")}
function todayISO(){const d=new Date();return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function parseISO(s){const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)}
function toISO(d){return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())}
function addDays(s,n){const d=parseISO(s);d.setDate(d.getDate()+n);return toISO(d)}
function uid(){return Math.random().toString(36).slice(2,10)}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function r1(n){return Math.round(n*10)/10}
function f1(n){return r1(n).toLocaleString("es-CL")}
function fmt(n){return Math.round(n).toLocaleString("es-CL")}
function num(v){const x=parseFloat(String(v).replace(",","."));return isFinite(x)?x:null}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function buzz(){try{navigator.vibrate&&navigator.vibrate(8)}catch(e){}}

function foods(){const all={};BUILTIN.forEach(f=>all[f.id]=f);Object.values(S.custom).forEach(f=>all[f.id]=f);return all}
function food(id){return foods()[id]||{id,name:"Alimento borrado",cat:"otro",unit:"g",base:100,p:0,c:0,g:0}}
function macro(it){const f=food(it.f);const k=(Number(it.q)||0)/(f.base||1);const p=f.p*k,c=f.c*k,g=f.g*k;return{p,c,g,kcal:p*4+c*4+g*9}}
function sum(list){return list.reduce((a,m)=>({p:a.p+m.p,c:a.c+m.c,g:a.g+m.g,kcal:a.kcal+m.kcal}),{p:0,c:0,g:0,kcal:0})}
function mealMacro(m){return sum(m.items.map(macro))}
function roundQty(f,q){if(f.unit==="g"||f.unit==="ml")return Math.max(0,Math.round(q/5)*5);return Math.max(0,Math.round(q*2)/2)}
function short(name){return name.split(" (")[0]}

/* ================= Días ================= */
function typeFor(date){const d=S.days[date];if(d&&d.type)return d.type;return S.config.weekMap[parseISO(date).getDay()]||"semana"}
/* Cardio: gasto neto = (MET - 1) x kg x minutos / 60. Se devuelve una parte en carbos. */
const CARDIO={
  no:{label:"Sin cardio",met:0},
  cam:{label:"Caminadora",met:3.8,hint:"unos 5 km/h, sin inclinación"},
  inc:{label:"Caminadora inclinada",met:6.5,hint:"unos 5 km/h con 8 a 12 % de inclinación"},
  bicih:{label:"Bici intervalos",met:8,hint:"intervalos fuertes con descansos"},
  bici:{label:"Bici suave",met:5,hint:"ritmo constante y cómodo"}
};
function bodyWeight(){const a=(S.progress.entries||[]).filter(e=>e.w).sort((x,y)=>x.d.localeCompare(y.d));return a.length?a[a.length-1].w:(S.config.cardioWeight||87)}
function cardioInfo(d){const c=d&&d.cardio;if(!c||!CARDIO[c.type]||c.type==="no")return{net:0,extraC:0};
  const min=Math.max(0,Math.min(180,Number(c.min)||0)),net=Math.round((CARDIO[c.type].met-1)*bodyWeight()*min/60);
  const back=S.config.cardioBack==null?0.5:S.config.cardioBack;return{net,extraC:Math.round(net*back/4),min}}
function targetForDay(d){const t=targetFor(d.type),x=cardioInfo(d).extraC;const c=t.c+x;return{p:t.p,c,g:t.g,kcal:t.p*4+c*4+t.g*9}}
function targetFor(type){const t=S.config.targets[type]||DEFAULT_CONFIG.targets[type];const c=Math.max(0,t.c+(S.config.carbAdjust||0));return{p:t.p,c,g:t.g,kcal:t.p*4+c*4+t.g*9}}
function tplOptions(m){return m.options||[{id:"base",label:"",items:m.items}]}
function itemsFrom(list){return list.map(([f,q])=>({id:uid(),f,q}))}
function buildDay(date,type){
  return {date,type,creatina:false,agua:0,meals:TEMPLATES[type].map(m=>{const o=tplOptions(m)[0];
    return {id:uid(),key:m.key,name:m.name,time:m.time,note:m.note||"",opt:o.id,done:false,items:itemsFrom(o.items)}})};
}
function dayDoc(date){if(!S.days[date])S.days[date]=buildDay(date,typeFor(date));return S.days[date]}
function touch(date){const d=S.days[date];if(d){d.t=1;askPersistent()}persist()}
function tplMeal(d,m){return (TEMPLATES[d.type]||[]).find(x=>x.key===m.key)}

/* ================= Avisos y hojas ================= */
let toastTimer=null;
function toast(msg,undoFn){
  const h=document.getElementById("toastHost");
  h.innerHTML='<div class="toast" role="status"><span>'+esc(msg)+'</span>'+(undoFn?'<button type="button" id="undoBtn">Deshacer</button>':'')+'</div>';
  if(undoFn)document.getElementById("undoBtn").onclick=()=>{undoFn();h.innerHTML=""};
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>{h.innerHTML=""},undoFn?7000:3200);
}
function closeSheet(){if(S.scanStop){const f=S.scanStop;S.scanStop=null;f()}document.getElementById("sheetHost").innerHTML="";document.body.style.overflow=""}
function openSheet(html,bind){
  const h=document.getElementById("sheetHost");
  h.innerHTML='<div class="sheet-bg" id="sheetBg"><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>'+html+'</div></div>';
  document.body.style.overflow="hidden";clearToast();
  document.getElementById("sheetBg").addEventListener("click",e=>{if(e.target.id==="sheetBg")closeSheet()});
  bind&&bind(h.querySelector(".sheet"));
}
function confirmSheet(title,text,okLabel,danger,onOk){
  openSheet('<h2>'+esc(title)+'</h2><p class="note" style="font-size:15px">'+esc(text)+'</p><div class="actions"><button class="btn '+(danger?'danger':'primary')+'" id="cfOk" type="button">'+esc(okLabel)+'</button><button class="btn" id="cfX" type="button">Cancelar</button></div>',
    h=>{h.querySelector("#cfX").onclick=closeSheet;h.querySelector("#cfOk").onclick=()=>{closeSheet();onOk()}});
}

/* ================= Barra superior ================= */
function renderAppbar(){
  const ab=document.getElementById("appbar");let h="";
  if(S.view==="hoy"){
    const t=todayISO(),diff=Math.round((parseISO(S.date)-parseISO(t))/864e5);
    const title=diff===0?"Hoy":diff===-1?"Ayer":diff===1?"Mañana":cap(WD_LONG[parseISO(S.date).getDay()]);
    const sub=parseISO(S.date).toLocaleDateString("es-CL",{weekday:diff===0||diff===-1||diff===1?"long":undefined,day:"numeric",month:"long"});
    h='<div class="in"><div style="flex:1;min-width:0"><h1>'+title+'</h1><div class="sub">'+esc(cap(sub))+'</div></div>'+
      (diff!==0?'<button class="iconbtn" type="button" data-go="'+t+'" aria-label="Ir a hoy">'+I.today+'</button>':'')+'</div>';
  }else{
    const titles={alimentos:"Alimentos",progreso:"Progreso",ajustes:"Ajustes"};
    h='<div class="in"><h1>'+titles[S.view]+'</h1></div>';
  }
  ab.innerHTML=h;
}

/* ================= Hoy ================= */
function ring(eat,plan,target){
  const R=50,C=2*Math.PI*R,max=Math.max(target,1);
  const pe=Math.min(1,eat/max),pp=Math.min(1,plan/max);
  return '<div class="ring"><svg viewBox="0 0 118 118" aria-hidden="true"><circle cx="59" cy="59" r="'+R+'" fill="none" stroke="var(--surface-2)" stroke-width="11"/>'+
    '<circle cx="59" cy="59" r="'+R+'" fill="none" stroke="var(--accent)" stroke-opacity=".22" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+(C*pp)+' '+C+'"/>'+
    (pe>0.005?'<circle cx="59" cy="59" r="'+R+'" fill="none" stroke="var(--accent)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+(C*pe)+' '+C+'"/>':'')+'</svg>'+
    '<div class="c"><b class="num">'+fmt(eat)+'</b><span>de '+fmt(target)+' kcal</span></div></div>';
}
function bar(cls,label,eat,plan,target){
  const max=Math.max(target,plan,eat)*1.04||1;const left=target-eat;
  return '<div class="bar '+cls+'"><div class="row"><span><b>'+label+'</b> <span class="num muted">'+fmt(eat)+' / '+fmt(target)+' g</span></span><span class="left">'+(left>0?'faltan '+fmt(left):'meta lista')+'</span></div>'+
    '<div class="track" role="img" aria-label="'+label+': comido '+fmt(eat)+' de '+fmt(target)+' gramos, plan '+fmt(plan)+'"><div class="plan" style="width:'+Math.min(100,plan/max*100)+'%"></div><div class="eat" style="width:'+Math.min(100,eat/max*100)+'%"></div></div></div>';
}
function weekStrip(date){
  const dow=(parseISO(date).getDay()+6)%7,mon=addDays(date,-dow),t=todayISO();let h='<div class="week" role="group" aria-label="Semana">';
  for(let i=0;i<7;i++){const ds=addDays(mon,i),dd=S.days[ds]&&S.days[ds].t?S.days[ds]:null;
    const n=dd?dd.meals.length:TEMPLATES[typeFor(ds)].length,done=dd?dd.meals.filter(m=>m.done).length:0;
    h+='<button type="button" class="'+(ds===t?'today':'')+'" data-go="'+ds+'" aria-pressed="'+(ds===date)+'" aria-label="'+WD_LONG[parseISO(ds).getDay()]+' '+parseISO(ds).getDate()+', '+done+' de '+n+' comidas"><span>'+WD[parseISO(ds).getDay()]+'</span><b>'+parseISO(ds).getDate()+'</b><span class="prog"><i style="width:'+(n?done/n*100:0)+'%"></i></span></button>'}
  return h+'</div>';
}
function equiv(it,o){const f=food(it.f);const key=f.cat==="carbo"?"c":"p";const val=macro(it)[key];if(!o[key])return 0;return roundQty(o,val/o[key]*o.base)}
function renderHoy(){
  const d=dayDoc(S.date),type=d.type,t=targetForDay(d);
  const all=sum(d.meals.map(mealMacro)),eat=sum(d.meals.filter(m=>m.done).map(mealMacro));
  let h='<div class="daynav"><button class="iconbtn" type="button" data-nav="-1" aria-label="Día anterior">'+I.left+'</button><div class="mid">'+
    '<select class="typesel '+type+'" id="typeSel" aria-label="Tipo de día">'+Object.keys(TYPES).map(k=>'<option value="'+k+'"'+(k===type?' selected':'')+'>'+TYPES[k].label+'</option>').join("")+'</select></div>'+
    '<button class="iconbtn" type="button" data-nav="1" aria-label="Día siguiente">'+I.right+'</button></div>';
  h+=weekStrip(S.date);
  h+='<div class="card summary">'+ring(eat.kcal,all.kcal,t.kcal)+'<div class="bars">'+bar("p","Proteína",eat.p,all.p,t.p)+bar("c","Carbos",eat.c,all.c,t.c)+bar("g","Grasa",eat.g,all.g,t.g)+'</div>'+
    '<div class="legend"><span>Color fuerte: lo que ya comiste</span><span>Claro: todo el plan del día (<span class="num">'+fmt(all.kcal)+'</span> kcal)</span></div></div>';
  h+='<div class="actions two"><button class="btn primary" type="button" id="fitBtn">'+I.wand+' Cuadrar el día</button><button class="btn" type="button" id="extraBtn">'+I.plus+' Comí algo fuera</button></div>';
  h+='<div class="quick"><button type="button" class="pill" id="creaBtn" aria-pressed="'+(!!d.creatina)+'">'+(d.creatina?'✓ ':'')+'Creatina 5 g</button>'+
    '<span class="water">Agua <b class="num">'+(d.agua||0)+'/12</b><button type="button" data-water="-1" aria-label="Un vaso menos">−</button><button type="button" data-water="1" aria-label="Un vaso más">+</button></span></div>';
  h+=cardioCard(d);
  d.meals.forEach(m=>{h+=mealCard(d,m)});
  h+='<button class="btn ghost" type="button" id="copyY">Copiar lo del día anterior</button>';
  h+='<button class="btn ghost" type="button" id="resetDay">Volver a la pauta original de este día</button>';
  return h;
}
function cardioCard(d){
  const c=d.cardio||{type:"no",min:20},ci=cardioInfo(d),back=S.config.cardioBack==null?0.5:S.config.cardioBack;
  let h='<section class="card cardio"><div class="cardio-h"><h3>Cardio de hoy</h3>'+(ci.net?'<span class="num">~'+fmt(ci.net)+' kcal</span>':'')+'</div>'+
    '<div class="opts" role="group" aria-label="Tipo de cardio">'+Object.keys(CARDIO).map(k=>'<button type="button" data-cardio="'+k+'" aria-pressed="'+(c.type===k)+'">'+CARDIO[k].label+'</button>').join("")+'</div>';
  if(c.type!=="no"&&CARDIO[c.type]){
    h+='<div class="cardio-row"><label class="field">Minutos<input id="cardioMin" class="num" inputmode="numeric" enterkeyhint="done" value="'+(c.min||20)+'"></label><p class="note">'+esc(cap(CARDIO[c.type].hint))+'. Calculado con tu peso de '+f1(bodyWeight())+' kg.</p></div>'+
      '<p class="note">'+(back>0?'Gastaste unas <b class="num">'+fmt(ci.net)+' kcal</b>. Te devuelvo '+(back===1?'todo':back===0.5?'la mitad':Math.round(back*100)+' %')+': <b class="num">+'+ci.extraC+' g de carbos</b>, repartidos en las comidas que te quedan.':'Gastaste unas <b class="num">'+fmt(ci.net)+' kcal</b>. No te devuelvo calorías (lo cambias en Ajustes): todo va a tu déficit.')+'</p>';
  }else h+='<p class="note">Si hiciste caminadora o bici, márcalo y la app reajusta las comidas que te quedan.</p>';
  return h+'</section>';
}
function setCardio(type,min){
  const d=dayDoc(S.date),before=clone(d),prev=d.cardio||{type:"no",min:20};
  d.cardio={type,min:min!=null?min:(prev.min||20)};touch(S.date);
  const ci=cardioInfo(d);
  if(d.meals.some(m=>!m.done))fitDay(true,before,type==="no"?"Sin cardio: volví tus carbos a la meta normal":"Cardio ~"+fmt(ci.net)+" kcal: +"+ci.extraC+" g de carbos");
  else{render();toast("Cardio anotado. Ya marcaste todas tus comidas, así que no hay nada que reajustar.")}
}
function mealCard(d,m){
  const mm=mealMacro(m),tm=tplMeal(d,m),opts=tm&&tm.options?tm.options:null;
  let h='<article class="card meal'+(m.done?' done':'')+'"><div class="meal-h"><div class="t"><h3>'+esc(m.name)+'</h3><div class="time">'+esc(m.time||"")+(m.note?' · '+esc(m.note):'')+'</div></div>'+
    '<button type="button" class="check" data-done="'+m.id+'" aria-pressed="'+(!!m.done)+'" aria-label="'+(m.done?'Desmarcar ':'Marcar como comida: ')+esc(m.name)+'">'+I.check+'</button></div>';
  if(opts)h+='<div class="opts" role="group" aria-label="Opciones de '+esc(m.name)+'">'+opts.map(o=>'<button type="button" data-opt="'+m.id+'|'+o.id+'" aria-pressed="'+(m.opt===o.id)+'">'+esc(o.label)+'</button>').join("")+'</div>';
  h+='<div class="items">';
  if(!m.items.length)h+='<div class="empty">Sin alimentos. Agrega uno abajo.</div>';
  m.items.forEach(it=>{const f=food(it.f),x=macro(it);
    let swap='';
    if(f.cat==="carbo"||f.cat==="prote"){const os=Object.values(foods()).filter(o=>!o.temp&&o.cat===f.cat&&o.id!==f.id&&(f.cat==="carbo"?o.c>0:o.p>0));
      swap='<select class="swap" data-swap="'+m.id+'|'+it.id+'" aria-label="Cambiar '+esc(f.name)+' por otro alimento"><option value="">Cambiar por…</option>'+os.map(o=>'<option value="'+o.id+'">'+esc(short(o.name))+' · '+f1(equiv(it,o))+' '+esc(o.unit)+'</option>').join("")+'</select>'}
    h+='<div class="item"><div class="nm">'+esc(f.name)+'</div><div class="qty"><input class="num" inputmode="decimal" enterkeyhint="done" aria-label="Cantidad de '+esc(f.name)+'" data-qty="'+m.id+'|'+it.id+'" value="'+esc(String(it.q).replace(".",","))+'"><span class="u">'+esc(f.unit)+'</span><button type="button" class="mini" data-del="'+m.id+'|'+it.id+'" aria-label="Quitar '+esc(f.name)+'">✕</button></div>'+
      '<div class="mac num"><span><span class="p">P '+f1(x.p)+'</span> · <span class="c">C '+f1(x.c)+'</span> · <span class="g">G '+f1(x.g)+'</span> · '+fmt(x.kcal)+' kcal</span>'+swap+'</div></div>'});
  h+='</div><div class="meal-f"><span class="num"><b>'+fmt(mm.kcal)+' kcal</b> · P '+fmt(mm.p)+' · C '+fmt(mm.c)+' · G '+fmt(mm.g)+'</span><span><button type="button" class="mini" data-save="'+m.id+'">Guardar</button><button type="button" class="mini" data-add="'+m.id+'">+ Agregar</button>'+
    (m.extra?'<button type="button" class="mini" data-delmeal="'+m.id+'">Quitar</button>':'')+'</span></div></article>';
  return h;
}
function findItem(d,ref){const [mid,iid]=ref.split("|");const m=d.meals.find(x=>x.id===mid);return{m,it:m&&m.items.find(x=>x.id===iid)}}

function fitDay(fromCardio,prevState,label){
  const d=dayDoc(S.date),t=targetForDay(d),before=prevState||clone(d);
  const open=d.meals.filter(m=>!m.done);if(!open.length){toast("Ya marcaste todas las comidas de este día.");return}
  const changes=[];
  const FIXED={leche:1,scoop:1,yogur_sp:1,huevo:1,platano:1,pan:1};
  const scale=(test,key,target,maxK)=>{
    const tot=sum(d.meals.map(mealMacro))[key];if(Math.abs(target-tot)<(key==="g"?4:8))return;
    const items=[];open.forEach(m=>m.items.forEach(it=>{const f=food(it.f);if(test(f)&&f[key]>0)items.push(it)}));
    const part=items.reduce((a,it)=>a+macro(it)[key],0);if(!part)return;
    const k=Math.max(0,Math.min(maxK,(part+(target-tot))/part));
    items.forEach(it=>{const f=food(it.f),nq=roundQty(f,it.q*k);if(nq!==it.q){changes.push(short(f.name)+' '+f1(it.q)+'→'+f1(nq)+' '+f.unit);it.q=nq}});
  };
  const byWeight=f=>(f.unit==="g"||f.unit==="ml")&&!FIXED[f.id];
  scale(f=>f.cat==="carbo"&&byWeight(f),"c",t.c,2.5);
  scale(f=>f.cat==="prote"&&byWeight(f),"p",t.p,2);
  scale(f=>f.id==="aceite","g",t.g,2);
  const undo=()=>{S.days[S.date]=before;touch(S.date);render()};
  if(!changes.length){render();toast(fromCardio?(label+". Lo que queda ya calza."):"Lo que queda ya calza con tu meta.",fromCardio?undo:null);return}
  touch(S.date);render();buzz();
  toast((fromCardio?label+". ":"")+"Ajusté: "+changes.slice(0,3).join(", ")+(changes.length>3?"…":""),undo);
}

/* ================= Selector de alimentos ================= */
function pickerSheet(mealId,isExtra){
  let sel=null,mode="lista";
  const listHtml=q=>{const fs=Object.values(foods()).filter(f=>!f.temp&&f.name.toLowerCase().includes(q.toLowerCase())).sort((a,b)=>a.name.localeCompare(b.name,"es"));
    return fs.map(f=>'<button type="button" data-pick="'+f.id+'" aria-pressed="'+(sel===f.id)+'"><span>'+esc(f.name)+' <span class="cat '+f.cat+'">'+CAT_LABEL[f.cat]+'</span></span><small class="num">'+f1(f.base)+' '+esc(f.unit)+': P'+f1(f.p)+' C'+f1(f.c)+' G'+f1(f.g)+'</small></button>').join("")||'<div class="empty">No está en tu lista. Búscalo en "Productos chilenos" o escanea su código de barras.</div>'};
  const html=()=>'<h2>'+(isExtra?'Comí algo fuera del plan':'Agregar alimento')+'</h2>'+
    '<div class="seg" role="group"><button type="button" data-mode="lista" aria-pressed="'+(mode==="lista")+'">Alimentos</button><button type="button" data-mode="saved" aria-pressed="'+(mode==="saved")+'">Mis comidas</button><button type="button" data-mode="manual" aria-pressed="'+(mode==="manual")+'">Manual</button></div>'+
    '<div class="chips" role="group" aria-label="Agregar un producto nuevo"><button type="button" id="pkBar">Código de barras</button><button type="button" id="pkOn">Productos chilenos</button><button type="button" id="pkScan">Foto de etiqueta</button><button type="button" id="pkPlate">Foto del plato</button></div>'+
    (mode==="saved"?savedHtml():mode==="lista"
      ?'<label class="field">Buscar<input id="pkQ" type="search" placeholder="pollo, arroz, burrito…" autocomplete="off"></label><div class="flist" id="pkList">'+listHtml("")+'</div><label class="field">Cantidad<input id="pkQty" inputmode="decimal" placeholder="Elige un alimento"></label>'
      :'<label class="field">Qué comiste<input id="mnName" placeholder="Ej: completo italiano"></label><div class="grid3"><label class="field">Proteína (g)<input id="mnP" inputmode="decimal"></label><label class="field">Carbos (g)<input id="mnC" inputmode="decimal"></label><label class="field">Grasa (g)<input id="mnG" inputmode="decimal"></label></div><label class="pill" style="align-self:flex-start"><input type="checkbox" id="mnSave"> Guardarlo en mis alimentos</label>')+
    '<div class="actions"><button class="btn primary" type="button" id="pkOk">Agregar</button><button class="btn" type="button" id="pkCancel">Cancelar</button></div>';
  const bind=host=>{
    host.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{mode=b.dataset.mode;host.innerHTML='<div class="grab"></div>'+html();bind(host)});
    host.querySelector("#pkCancel").onclick=closeSheet;
    host.querySelector("#pkScan").onclick=()=>{closeSheet();foodSheet(null,{scan:true,onSaved:f=>addItem(mealId,isExtra,f.id,f.def||f.base)})};
    const onF=f=>addItem(mealId,isExtra,f.id,f.def||f.base);
    host.querySelector("#pkBar").onclick=()=>{closeSheet();scanSheet(onF)};
    host.querySelector("#pkOn").onclick=()=>{const q=host.querySelector("#pkQ");closeSheet();onlineSheet(q?q.value.trim():"",onF)};
    host.querySelector("#pkPlate").onclick=()=>{closeSheet();plateSheet(f=>addItem(mealId,isExtra,f.id,1))};
    if(mode==="saved"){host.querySelector("#pkOk").hidden=true;host.querySelectorAll("[data-sm]").forEach(b=>b.onclick=()=>{const sm=savedMeals().find(x=>x.id===b.dataset.sm);closeSheet();if(sm)addSaved(mealId,isExtra,sm)});return}
    if(mode==="lista"){const q=host.querySelector("#pkQ"),list=host.querySelector("#pkList"),qty=host.querySelector("#pkQty");
      const wire=()=>list.querySelectorAll("[data-pick]").forEach(b=>b.onclick=()=>{sel=b.dataset.pick;const f=food(sel);qty.value=String(f.def||f.base).replace(".",",");qty.placeholder=f.unit;list.querySelectorAll("[data-pick]").forEach(x=>x.setAttribute("aria-pressed",x.dataset.pick===sel))});
      wire();q.oninput=()=>{list.innerHTML=listHtml(q.value);wire()};
      host.querySelector("#pkOk").onclick=()=>{if(!sel){toast("Elige un alimento de la lista.");return}addItem(mealId,isExtra,sel,num(qty.value)||food(sel).def||1);closeSheet()}}
    else host.querySelector("#pkOk").onclick=()=>{
      const n=host.querySelector("#mnName").value.trim()||"Comida fuera";const g=id=>num(host.querySelector(id).value)||0;
      const f={id:"c_"+uid(),name:n,cat:"otro",unit:"porción",base:1,def:1,p:g("#mnP"),c:g("#mnC"),g:g("#mnG")};
      if(!host.querySelector("#mnSave").checked)f.temp=true;S.custom[f.id]=f;persist();addItem(mealId,isExtra,f.id,1);closeSheet()};
  };
  openSheet(html(),bind);
}
function addItem(mealId,isExtra,fid,q){
  const d=dayDoc(S.date);let m;
  if(isExtra){m={id:uid(),key:"extra",name:"Fuera del plan",time:new Date().toLocaleTimeString("es-CL",{hour:"2-digit",minute:"2-digit"}),done:true,extra:true,items:[]};d.meals.push(m)}
  else m=d.meals.find(x=>x.id===mealId);
  if(!m)return;m.items.push({id:uid(),f:fid,q});touch(S.date);render();
  if(isExtra)toast('Anotado. Toca "Cuadrar lo que queda" para ajustar el resto del día.');
}

/* ================= Lector de etiquetas ================= */
const LABEL_PROMPT=`Eres un lector de etiquetas nutricionales de productos chilenos. Las fotos muestran un producto envasado: la tabla "Información nutricional" y, a veces, el frente del envase. Lee los números EXACTOS impresos; no inventes ni estimes.

Responde solo con un objeto JSON, sin texto antes ni después, con esta forma:
{"es_etiqueta": true, "nombre": "nombre corto del producto", "marca": "marca o null", "tipo": "prote" | "carbo" | "grasa" | "otro", "unidad": "g" | "ml", "porcion": {"cantidad": número o null, "texto": "texto de la porción tal como aparece"}, "por100": {"kcal": n, "proteinas": n, "carbohidratos": n, "grasas": n, "azucares": n, "fibra": n, "sodio_mg": n}, "por_porcion": {mismas claves}, "sellos": ["ALTO EN AZÚCARES"], "notas": "algo dudoso o ilegible, o cadena vacía"}

Reglas:
- Números con punto decimal. Un valor que no se lee o no aparece va como null.
- "carbohidratos" = H. de C. disponibles; "grasas" = grasa total; "kcal" = energía en kcal.
- "por100" es la columna de 100 g o 100 ml; si la etiqueta no la tiene, pon por100 en null.
- "unidad" es "ml" si la columna dice 100 ml; si no, "g".
- "tipo": "prote" si la proteína es su aporte principal, "carbo" si son los carbohidratos, "grasa" si es la grasa, "otro" si es mixto.
- "sellos" son los sellos negros octogonales que se vean; lista vacía si no hay.
- Si las fotos no muestran una etiqueta nutricional, responde {"es_etiqueta": false}.`;
async function toJpeg(file){
  try{
    let src;
    if(window.createImageBitmap){src=await createImageBitmap(file)}
    else{src=await new Promise((res,rej)=>{const im=new Image();im.onload=()=>res(im);im.onerror=rej;im.src=URL.createObjectURL(file)})}
    const w=src.width,h=src.height,k=Math.min(1,1600/Math.max(w,h));
    const cv=document.createElement("canvas");cv.width=Math.round(w*k);cv.height=Math.round(h*k);cv.getContext("2d").drawImage(src,0,0,cv.width,cv.height);
    const url=cv.toDataURL("image/jpeg",0.86);return{data:url.split(",")[1],canvas:cv};
  }catch(e){return null}
}
function parseJSONLoose(t){
  try{return JSON.parse(t)}catch(e){}
  const fence=t.match(/```(?:json)?\s*([\s\S]*?)```/);if(fence){try{return JSON.parse(fence[1])}catch(e){}}
  const a=t.indexOf("{"),b=t.lastIndexOf("}");if(a>=0&&b>a){try{return JSON.parse(t.slice(a,b+1))}catch(e){}}
  return null;
}
async function readLabel(images,signal,prompt){
  const body={model:S.settings.model||"claude-sonnet-5-5",max_tokens:900,messages:[{role:"user",content:[
    ...images.map(x=>({type:"image",source:{type:"base64",media_type:"image/jpeg",data:x.data}})),
    {type:"text",text:prompt||LABEL_PROMPT}]}]};
  let res;
  try{res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",signal,headers:{"content-type":"application/json","x-api-key":S.settings.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify(body)})}
  catch(e){if(e&&e.name==="AbortError")throw{code:"cancelled"};throw{code:"offline"}}
  let data=null;try{data=await res.json()}catch(e){}
  if(!res.ok){const msg=(data&&data.error&&data.error.message)||"";
    if(res.status===401)throw{code:"key"};
    if(res.status===404||/model/i.test(msg)&&res.status===400)throw{code:"model"};
    if(/credit|balance|billing/i.test(msg))throw{code:"credit"};
    if(res.status===429||res.status===529||res.status>=500)throw{code:"busy"};
    throw{code:"other",msg};}
  const text=(data&&data.content||[]).filter(b=>b.type==="text").map(b=>b.text).join("\n");
  const j=parseJSONLoose(text);if(!j)throw{code:"parse"};return j;
}
const SCAN_ERR={offline:"Sin conexión a internet. El lector necesita internet; los datos los puedes llenar a mano.",key:"La clave de Anthropic no es válida. Revísala en Ajustes.",model:"El modelo configurado no existe. Revisa el nombre en Ajustes.",credit:"Tu cuenta de Anthropic no tiene saldo. Carga crédito en console.anthropic.com.",busy:"El servicio está ocupado. Prueba en un momento.",parse:"No entendí bien la etiqueta. Prueba con una foto más cerca y derecha.",other:"Hubo un problema al leer la foto."};
function nn(v){const x=typeof v==="string"?parseFloat(v.replace(",",".")):v;return typeof x==="number"&&isFinite(x)?x:null}
function scanToFood(r){
  const ok=o=>o&&nn(o.proteinas)!=null;const per100=ok(r.por100)?r.por100:null,perP=ok(r.por_porcion)?r.por_porcion:null;
  const unit=r.unidad==="ml"?"ml":"g",pq=r.porcion?nn(r.porcion.cantidad):null,src=per100||perP;if(!src)return null;
  const o={name:[r.nombre,r.marca].filter(Boolean).join(" ").trim()||"Producto",cat:["prote","carbo","grasa","otro"].includes(r.tipo)?r.tipo:"otro",
    p:r1(nn(src.proteinas)||0),c:r1(nn(src.carbohidratos)||0),g:r1(nn(src.grasas)||0),kcal:nn(src.kcal),sellos:Array.isArray(r.sellos)?r.sellos.slice(0,4).map(String):[],notas:r.notas?String(r.notas):""};
  if(per100){o.unit=unit;o.base=100;o.def=pq||100}else if(pq){o.unit=unit;o.base=pq;o.def=pq}else{o.unit="porción";o.base=1;o.def=1}
  return o;
}

/* ================= Ficha de alimento ================= */
function foodSheet(id,opts){
  opts=opts||{};const f=id?clone(S.custom[id]):{id:"c_"+uid(),name:"",cat:"prote",unit:"g",base:100,def:100,p:0,c:0,g:0};if(opts.prefill)Object.assign(f,opts.prefill);
  const hasKey=!!S.settings.apiKey;
  const scanHtml=id?'':(hasKey
    ?'<div class="scan"><label class="scanbtn">'+I.cam+' Leer etiqueta con foto<input type="file" id="scanFile" accept="image/*" multiple></label><div class="st muted" id="scanSt">Saca una foto derecha a la tabla de información nutricional (puedes sumar otra del frente). Lleno los datos y tú los revisas.</div></div>'
    :'<div class="scan"><div class="st muted">Para leer etiquetas con foto, agrega tu clave de Anthropic en Ajustes. Mientras tanto, copia los datos a mano.</div><button class="btn" type="button" id="goKey">Configurar lector</button></div>');
  openSheet('<h2>'+(id?'Editar alimento':'Nuevo alimento')+'</h2>'+scanHtml+
    '<label class="field">Nombre<input id="fN" value="'+esc(f.name)+'" placeholder="Ej: Yogurt Colún Protein"></label>'+
    '<div class="grid2"><label class="field">Tipo<select id="fC">'+Object.keys(CAT_LABEL).map(k=>'<option value="'+k+'"'+(k===f.cat?' selected':'')+'>'+CAT_LABEL[k]+'</option>').join("")+'</select></label>'+
    '<label class="field">Unidad<select id="fU">'+["g","ml","unid","pote","lata","reb.","cda","scoop","porción"].map(u=>'<option'+(u===f.unit?' selected':'')+'>'+u+'</option>').join("")+'</select></label></div>'+
    '<div class="grid2"><label class="field">Valores por (cantidad)<input id="fB" inputmode="decimal" value="'+esc(String(f.base).replace(".",","))+'"></label><label class="field">Porción habitual<input id="fD" inputmode="decimal" value="'+esc(String(f.def).replace(".",","))+'"></label></div>'+
    '<div class="grid3"><label class="field">Proteína (g)<input id="fP" inputmode="decimal" value="'+esc(String(f.p).replace(".",","))+'"></label><label class="field">Carbos (g)<input id="fCa" inputmode="decimal" value="'+esc(String(f.c).replace(".",","))+'"></label><label class="field">Grasa (g)<input id="fG" inputmode="decimal" value="'+esc(String(f.g).replace(".",","))+'"></label></div>'+
    '<p class="note">Copia los números de la etiqueta. Si la tabla dice "100 g", deja 100 en "Valores por".</p>'+
    '<div class="actions"><button class="btn primary" type="button" id="fOk">Guardar</button><button class="btn" type="button" id="fX">Cancelar</button>'+(id?'<button class="btn ghost danger" type="button" id="fDel">Borrar</button>':'')+'</div>',
  h=>{
    let ctl=null;const v=s=>h.querySelector(s).value,n=s=>num(v(s))||0;
    h.querySelector("#fX").onclick=()=>{if(ctl)ctl.abort();closeSheet()};
    const gk=h.querySelector("#goKey");if(gk)gk.onclick=()=>{closeSheet();location.hash="#ajustes";setTimeout(()=>{const el=document.getElementById("apiKey");if(el)el.focus()},150)};
    const fi=h.querySelector("#scanFile"),st=h.querySelector("#scanSt");
    if(fi){fi.onchange=async()=>{
      const files=Array.from(fi.files||[]).slice(0,3);fi.value="";if(!files.length)return;
      st.className="st";st.innerHTML='<span class="thumbs" id="thumbs"></span><span class="spin" aria-hidden="true"></span><span id="stTxt">Preparando la foto…</span>';
      const imgs=(await Promise.all(files.map(toJpeg))).filter(Boolean);
      if(!imgs.length){st.textContent="No pude abrir esa foto. Prueba con otra.";return}
      const th=h.querySelector("#thumbs");imgs.forEach(x=>th.appendChild(x.canvas));
      ctl=new AbortController();const my=ctl;
      h.querySelector("#stTxt").textContent="Leyendo la etiqueta…";
      const stop=document.createElement("button");stop.type="button";stop.className="mini";stop.textContent="Detener";stop.onclick=()=>my.abort();st.appendChild(stop);
      try{
        const r=await readLabel(imgs,my.signal);
        if(!r||r.es_etiqueta===false){st.textContent="No veo una tabla nutricional en esa foto. Prueba de nuevo enfocando la tabla.";return}
        const o=scanToFood(r);if(!o){st.textContent="No pude leer los números de la tabla. Prueba con una foto más cerca y con buena luz.";return}
        const set=(sel,val)=>{const el=h.querySelector(sel);if(el)el.value=String(val).replace(".",",")};
        set("#fN",o.name);h.querySelector("#fC").value=o.cat;h.querySelector("#fU").value=o.unit;set("#fB",o.base);set("#fD",o.def);set("#fP",o.p);set("#fCa",o.c);set("#fG",o.g);
        f.sellos=o.sellos;f.kcalLabel=o.kcal;f.src="foto";
        const calc=o.p*4+o.c*4+o.g*9,off=o.kcal&&calc?Math.abs(calc-o.kcal)/o.kcal:0;
        st.innerHTML='<div style="display:flex;flex-direction:column;gap:6px;width:100%"><b>Listo. Revisa que calce con la etiqueta y guarda.</b>'+
          '<span class="num">Por '+f1(o.base)+' '+esc(o.unit)+': P '+f1(o.p)+' · C '+f1(o.c)+' · G '+f1(o.g)+(o.kcal?' · '+fmt(o.kcal)+' kcal':'')+'</span>'+
          (o.sellos.length?'<span class="sellos">'+o.sellos.map(x=>'<span class="sello">'+esc(x)+'</span>').join("")+'</span>':'')+
          (off>0.15?'<span style="color:var(--warn)">Las calorías no calzan del todo con los macros. Compara los números con la etiqueta.</span>':'')+
          (o.notas?'<span class="muted">'+esc(o.notas)+'</span>':'')+'</div>';
      }catch(e){
        if(e&&e.code==="cancelled"){st.className="st muted";st.textContent="Lectura detenida.";return}
        st.textContent=SCAN_ERR[e&&e.code]||SCAN_ERR.other;
      }finally{if(ctl===my)ctl=null}
    };
    if(opts.scan){try{fi.click()}catch(e){}}}
    h.querySelector("#fOk").onclick=()=>{
      const nm=v("#fN").trim();if(!nm){toast("Ponle un nombre al alimento.");return}
      Object.assign(f,{name:nm,cat:v("#fC"),unit:v("#fU"),base:n("#fB")||1,def:n("#fD")||1,p:n("#fP"),c:n("#fCa"),g:n("#fG")});delete f.temp;
      S.custom[f.id]=f;persist();askPersistent();if(ctl)ctl.abort();closeSheet();
      if(opts.onSaved)opts.onSaved(f);else{render();toast("Guardado en tus alimentos.")}
    };
    const del=h.querySelector("#fDel");if(del)del.onclick=()=>{const keep=S.custom[id];delete S.custom[id];persist();closeSheet();render();toast("Alimento borrado.",()=>{S.custom[id]=keep;persist();render()})};
  });
}

/* ================= Alimentos ================= */
let foodFilter="todos",foodQuery="";
function renderAlimentos(){
  let h='<div class="actions two"><button class="btn primary" type="button" id="barFood">Escanear código</button><button class="btn" type="button" id="onFood">Buscar producto</button><button class="btn" type="button" id="scanFood">'+I.cam+' Leer etiqueta</button><button class="btn" type="button" id="shopBtn">Lista de compras</button></div><button class="btn ghost" type="button" id="newFood">'+I.plus+' Nuevo a mano</button>';
  h+='<div class="search"><input type="search" id="fq" placeholder="Buscar alimento" value="'+esc(foodQuery)+'" aria-label="Buscar alimento"></div>';
  h+='<div class="chips" role="group" aria-label="Filtrar">'+[["todos","Todos"],["mios","Míos"],["prote","Proteína"],["carbo","Carbos"],["grasa","Grasa"],["otro","Otros"]].map(([k,l])=>'<button type="button" data-ff="'+k+'" aria-pressed="'+(foodFilter===k)+'">'+l+'</button>').join("")+'</div>';
  h+='<div class="card" style="padding:0" id="foodList">'+foodListHtml()+'</div>';
  h+='<p class="note">Valores de etiquetas (Loncoleche, Soprole) y tablas de composición. Los marcados "estimado" son aproximados. Tus productos se guardan en este celular y viajan en el respaldo.</p>';
  return h;
}
function foodListHtml(){
  const q=foodQuery.toLowerCase();
  const fs=Object.values(foods()).filter(f=>!f.temp&&(foodFilter==="todos"||(foodFilter==="mios"?!!S.custom[f.id]:f.cat===foodFilter))&&f.name.toLowerCase().includes(q))
    .sort((a,b)=>(a.cat+a.name).localeCompare(b.cat+b.name,"es"));
  if(!fs.length)return '<div class="empty">'+(foodFilter==="mios"?'Todavía no agregas productos propios. Escanea una etiqueta para empezar.':'Sin resultados.')+'</div>';
  return '<ul class="flt">'+fs.map(f=>{const k=f.p*4+f.c*4+f.g*9,mine=!!S.custom[f.id];
    return '<li><span class="dot '+f.cat+'"></span><div class="info"><b>'+esc(f.name)+'</b><span class="num">'+f1(f.base)+' '+esc(f.unit)+' · P '+f1(f.p)+' · C '+f1(f.c)+' · G '+f1(f.g)+(f.sellos&&f.sellos.length?' · '+f.sellos.length+' sello'+(f.sellos.length>1?'s':''):'')+'</span></div>'+
      '<div class="kc num">'+fmt(k)+'<small>kcal</small></div>'+(mine?'<button type="button" class="mini" data-editfood="'+f.id+'">Editar</button>':'')+'</li>'}).join("")+'</ul>';
}

/* ================= Progreso ================= */
function entries(){return (S.progress.entries||[]).slice().sort((a,b)=>a.d.localeCompare(b.d))}
function slope(points){if(points.length<2)return null;const x0=parseISO(points[0].d).getTime();const xs=points.map(p=>(parseISO(p.d).getTime()-x0)/864e5),ys=points.map(p=>p.v);
  const n=xs.length,mx=xs.reduce((a,b)=>a+b,0)/n,my=ys.reduce((a,b)=>a+b,0)/n;let nu=0,de=0;for(let i=0;i<n;i++){nu+=(xs[i]-mx)*(ys[i]-my);de+=(xs[i]-mx)**2}return de?nu/de*7:null}
function chart(points,unit,color){
  if(points.length<1)return '<div class="empty">Todavía no hay registros.</div>';
  const W=600,H=210,pl=44,pr=14,pt=14,pb=28,x0=parseISO(points[0].d).getTime(),x1=parseISO(points[points.length-1].d).getTime();
  const vs=points.map(p=>p.v);let lo=Math.min(...vs),hi=Math.max(...vs);if(hi-lo<2){const m=(hi+lo)/2;lo=m-1;hi=m+1}const span=hi-lo;
  const X=t=>pl+(x1===x0?0.5:(t-x0)/(x1-x0))*(W-pl-pr),Y=v=>pt+(1-(v-lo)/span)*(H-pt-pb);
  let g='';for(let i=0;i<=3;i++){const v=lo+span*i/3;g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+Y(v)+'" y2="'+Y(v)+'" stroke="var(--line)"/><text x="'+(pl-6)+'" y="'+(Y(v)+4)+'" text-anchor="end" font-size="12" fill="var(--muted)">'+f1(v)+'</text>'}
  const pts=points.map(p=>X(parseISO(p.d).getTime())+','+Y(p.v)).join(" ");
  const lbl=s=>parseISO(s).toLocaleDateString("es-CL",{day:"numeric",month:"short"});
  const area=points.length>1?'<polygon points="'+X(x0)+','+(H-pb)+' '+pts+' '+X(x1)+','+(H-pb)+'" fill="'+color+'" fill-opacity=".10"/>':'';
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Evolución en '+unit+'">'+g+area+'<polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>'+
    points.map(p=>'<circle cx="'+X(parseISO(p.d).getTime())+'" cy="'+Y(p.v)+'" r="4" fill="'+color+'"/>').join("")+
    '<text x="'+pl+'" y="'+(H-8)+'" font-size="12" fill="var(--muted)">'+lbl(points[0].d)+'</text><text x="'+(W-pr)+'" y="'+(H-8)+'" font-size="12" text-anchor="end" fill="var(--muted)">'+lbl(points[points.length-1].d)+'</text></svg>';
}
function advice(){
  const w=entries().filter(e=>e.w).map(e=>({d:e.d,v:e.w}));
  const recent=w.filter(p=>parseISO(p.d)>=parseISO(addDays(todayISO(),-21)));
  if(recent.length<2||(parseISO(recent[recent.length-1].d)-parseISO(recent[0].d))/864e5<10)
    return{cls:"",html:"Necesito al menos 2 semanas de pesajes para decirte si vas al ritmo correcto. Pésate los lunes a las 6:00, antes de comer, en la misma pesa del gym."};
  const s=slope(recent),cur=recent[recent.length-1].v,pct=-s/cur*100;
  if(-s<0.6)return{cls:"warn",html:"Estás bajando <b>"+f1(-s)+" kg por semana</b> ("+f1(pct)+"% de tu peso). Para llegar a febrero conviene entre 0,7 y 0,9 kg por semana.",act:-40,actLbl:"Quitar 40 g de carbos por día"};
  if(-s>1)return{cls:"warn",html:"Estás bajando <b>"+f1(-s)+" kg por semana</b> ("+f1(pct)+"% de tu peso). Es más de 1 kg por semana: muy rápido, arriesgas músculo.",act:40,actLbl:"Sumar 40 g de carbos por día"};
  return{cls:"ok",html:"Estás bajando <b>"+f1(-s)+" kg por semana</b> ("+f1(pct)+"% de tu peso). Vas en el rango para febrero: no cambies nada."};
}
function adherence(){
  let done=0,total=0;for(let i=0;i<7;i++){const ds=addDays(todayISO(),-i),d=S.days[ds];if(d&&d.t){const ms=d.meals.filter(m=>!m.extra);total+=ms.length;done+=ms.filter(m=>m.done).length}}
  return total?Math.round(done/total*100):null;
}
function renderProgreso(){
  const es=entries(),w=es.filter(e=>e.w).map(e=>({d:e.d,v:e.w})),c=es.filter(e=>e.c).map(e=>({d:e.d,v:e.c}));
  const last=k=>{const a=es.filter(e=>e[k]);return a.length?a[a.length-1][k]:null},first=k=>{const a=es.filter(e=>e[k]);return a.length?a[0][k]:null};
  const delta=k=>{const a=first(k),b=last(k);if(a==null||b==null||a===b)return '';const dd=r1(b-a);return (dd>0?'+':'')+f1(dd)+(k==="w"?' kg':' cm')+' desde el inicio'};
  const a=advice(),adh=adherence();
  let h='<div class="card"><h2>Registrar</h2><div class="grid3 reg" style="margin-top:10px"><label class="field">Fecha<input type="date" id="pD" value="'+todayISO()+'"></label><label class="field">Peso (kg)<input id="pW" inputmode="decimal" placeholder="86,4"></label><label class="field">Cintura (cm)<input id="pC" inputmode="decimal" placeholder="98"></label></div>'+
    '<div class="actions" style="margin-top:12px"><button class="btn primary" type="button" id="pOk">Guardar registro</button></div><p class="note" style="margin-top:8px">Peso: los lunes en ayunas, en la pesa del gym. Cintura: cada 2 semanas, a la altura del ombligo, sin meter la guata.</p></div>';
  h+='<div class="stat"><div><span>Peso</span><b class="num">'+(last("w")?f1(last("w"))+' kg':'—')+'</b><span>'+delta("w")+'</span></div>'+
     '<div><span>Cintura</span><b class="num">'+(last("c")?f1(last("c"))+' cm':'—')+'</b><span>'+delta("c")+'</span></div>'+
     '<div><span>Comidas cumplidas</span><b class="num">'+(adh==null?'—':adh+'%')+'</b><span>últimos 7 días</span></div></div>';
  h+='<div class="advice '+a.cls+'">'+a.html+(a.act?'<div class="actions" style="margin-top:10px"><button class="btn primary" type="button" id="applyAdj" data-adj="'+a.act+'">'+a.actLbl+'</button></div>':'')+
     ((S.config.carbAdjust||0)!==0?'<p class="note" style="margin-top:8px">Ajuste de carbos activo: <b class="num">'+((S.config.carbAdjust>0)?'+':'')+S.config.carbAdjust+' g por día</b>.</p>':'')+'</div>';
  h+=goalCard(w)+weekStats();
  h+='<div class="card chart"><h2 style="font-size:19px;margin-bottom:6px">Peso</h2>'+chart(w,"kg","var(--accent)")+'</div><div class="card chart"><h2 style="font-size:19px;margin-bottom:6px">Cintura</h2>'+chart(c,"cm","var(--fat)")+'</div>';
  if(es.length)h+='<div class="card" style="padding:6px 6px"><table class="ftable"><thead><tr><th>Fecha</th><th class="n">Peso</th><th class="n">Cintura</th><th></th></tr></thead><tbody>'+
    es.slice().reverse().map(e=>'<tr><td>'+parseISO(e.d).toLocaleDateString("es-CL",{weekday:"short",day:"numeric",month:"short"})+'</td><td class="n">'+(e.w?f1(e.w)+' kg':'—')+'</td><td class="n">'+(e.c?f1(e.c)+' cm':'—')+'</td><td class="n"><button type="button" class="mini" data-delentry="'+e.d+'">Borrar</button></td></tr>').join("")+'</tbody></table></div>';
  return h;
}

/* ================= Ajustes ================= */
function isStandalone(){return window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}
function isIOS(){return /iphone|ipad|ipod/i.test(navigator.userAgent)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)}
function backupDue(){const has=Object.values(S.days).some(d=>d.t)||(S.progress.entries||[]).length;if(!has)return false;const lb=S.meta.lastBackup;return !lb||(parseISO(todayISO())-parseISO(lb))/864e5>=14}
function renderAjustes(){
  const cfg=S.config;let h='';
  if(backupDue())h+='<div class="banner warn">'+I.warn+'<div><b>Haz un respaldo</b><div class="note">Tus datos viven solo en este celular. Exporta un respaldo cada 2 semanas y guárdalo en Drive o mándatelo por WhatsApp.</div></div></div>';
  if(!isStandalone()){
    h+='<div class="sec-title">Instalar</div><div class="card">';
    if(S.installEvt)h+='<p class="note" style="margin-bottom:10px">Instala Pauta para abrirla como app, con su ícono y sin la barra del navegador.</p><button class="btn primary block" type="button" id="installBtn">Instalar Pauta</button>';
    else if(isIOS())h+='<b>Agrégala a tu pantalla de inicio</b><ol class="steps note"><li>Abre esta página en Safari.</li><li>Toca el botón Compartir (cuadrado con flecha).</li><li>Elige <b>Agregar a inicio</b> y luego <b>Agregar</b>.</li></ol>';
    else h+='<b>Agrégala a tu pantalla de inicio</b><ol class="steps note"><li>Abre esta página en Chrome.</li><li>Toca el menú ⋮ arriba a la derecha.</li><li>Elige <b>Instalar app</b> o <b>Agregar a la pantalla principal</b>.</li></ol>';
    h+='</div>';
  }
  h+='<div class="sec-title">Calculadora</div><div class="card"><p class="note" style="margin-bottom:10px">Calcula tus calorías y macros según tu cuerpo, tu actividad y el ritmo al que quieres bajar.</p><button class="btn primary block" type="button" id="calcBtn">Calcular mis metas</button>'+((S.config.saved||[]).length?'<button class="btn ghost block" type="button" id="clrSaved" style="margin-top:8px">Borrar comidas guardadas ('+S.config.saved.length+')</button>':'')+'</div>';
  h+='<div class="sec-title">Metas por tipo de día</div><div class="card">';
  Object.keys(TYPES).forEach((k,i)=>{const t=cfg.targets[k],tt=targetFor(k);
    h+='<h3 style="font-size:17px;margin:'+(i?14:0)+'px 0 8px">'+TYPES[k].label+' <span class="muted num" style="font-family:var(--body);font-size:13px;font-weight:500">· '+fmt(tt.kcal)+' kcal</span></h3><div class="grid3">'+
      ['p','c','g'].map(m=>'<label class="field">'+({p:"Proteína",c:"Carbos",g:"Grasa"})[m]+'<input inputmode="decimal" data-target="'+k+'|'+m+'" value="'+t[m]+'"></label>').join("")+'</div>'});
  h+='<p class="note" style="margin-top:10px">Gramos por día. Las calorías se calculan solas.</p></div>';
  h+='<div class="sec-title">Tu semana</div><div class="list">'+[1,2,3,4,5,6,0].map(i=>'<div class="row"><div class="lbl"><b>'+cap(WD_LONG[i])+'</b></div><select data-wd="'+i+'" aria-label="Tipo de día para el '+WD_LONG[i]+'">'+Object.keys(TYPES).map(k=>'<option value="'+k+'"'+(cfg.weekMap[i]===k?' selected':'')+'>'+TYPES[k].short+'</option>').join("")+'</select></div>').join("")+'</div>';
  h+='<div class="sec-title">Ajuste de carbos</div><div class="card"><p class="note" style="margin-bottom:10px">Lo cambia Progreso según cómo bajas de peso. Ahora: <b class="num">'+((cfg.carbAdjust||0)>0?'+':'')+(cfg.carbAdjust||0)+' g por día</b>.</p><div class="actions"><button class="btn" type="button" data-adjset="-40">−40 g</button><button class="btn" type="button" data-adjset="40">+40 g</button><button class="btn ghost" type="button" data-adjset="reset">Volver a 0</button></div>'+
    ((cfg.adjustLog||[]).length?'<ul class="note" style="margin:10px 0 0;padding-left:18px">'+cfg.adjustLog.slice(-5).reverse().map(l=>'<li>'+esc(l)+'</li>').join("")+'</ul>':'')+'</div>';
  const cb=cfg.cardioBack==null?0.5:cfg.cardioBack;
  h+='<div class="sec-title">Cardio</div><div class="list"><div class="row"><div class="lbl"><b>Calorías del cardio que te devuelvo</b><span>En carbos, el mismo día</span></div><select id="cardioBack">'+[[0,"Nada"],[0.5,"La mitad (recomendado)"],[1,"Todo"]].map(([v,l])=>'<option value="'+v+'"'+(cb===v?' selected':'')+'>'+l+'</option>').join("")+'</select></div>'+
    '<div class="row"><div class="lbl"><b>Peso para calcular el cardio</b><span>Se usa tu último pesaje; sin pesajes, este</span></div><input id="cardioWeight" class="num" inputmode="decimal" style="width:80px;padding:8px;border:1px solid var(--line);border-radius:10px;background:var(--surface-2);text-align:right" value="'+f1(cfg.cardioWeight||87)+'"></div></div>'+
    '<p class="note" style="margin:6px 2px 0">Los relojes y máquinas suelen sobrestimar el gasto; por eso por defecto se devuelve solo la mitad.</p>';
  h+='<div class="sec-title">Lector de etiquetas</div><div class="card"><p class="note" style="margin-bottom:10px">Lee la foto de la tabla nutricional con Claude. Necesita una clave de la API de Anthropic (se crea en console.anthropic.com → API Keys; cada lectura cuesta muy poco). La clave queda solo en este celular y no va en los respaldos.</p>'+
    '<label class="field">Clave de API<input id="apiKey" type="password" autocomplete="off" spellcheck="false" placeholder="sk-ant-…" value="'+esc(S.settings.apiKey)+'"></label>'+
    '<label class="field" style="margin-top:10px">Modelo<input id="apiModel" autocomplete="off" spellcheck="false" value="'+esc(S.settings.model)+'"></label>'+
    '<div class="actions" style="margin-top:12px"><button class="btn primary" type="button" id="saveKey">Guardar</button>'+(S.settings.apiKey?'<button class="btn ghost danger" type="button" id="delKey">Quitar clave</button>':'')+'</div></div>';
  const lb=S.meta.lastBackup?parseISO(S.meta.lastBackup).toLocaleDateString("es-CL",{day:"numeric",month:"long"}):"nunca";
  h+='<div class="sec-title">Respaldo</div><div class="card"><p class="note" style="margin-bottom:10px">Último respaldo: <b>'+lb+'</b>. El archivo trae tus días, alimentos, progreso y metas. Sirve para pasar tus datos a otro celular.</p>'+
    '<div class="actions"><button class="btn primary" type="button" id="expBtn">'+I.out+' Exportar respaldo</button><label class="btn" style="position:relative;overflow:hidden">'+I.in+' Importar<input type="file" id="impFile" accept="application/json,.json" style="position:absolute;inset:0;opacity:0"></label></div></div>';
  h+='<div class="sec-title">Apariencia</div><div class="list"><div class="row"><div class="lbl"><b>Tema</b></div><select id="themeSel">'+[["auto","Automático"],["light","Claro"],["dark","Oscuro"]].map(([k,l])=>'<option value="'+k+'"'+(S.settings.theme===k?' selected':'')+'>'+l+'</option>').join("")+'</select></div></div>';
  h+='<div class="sec-title">Datos</div><div class="card"><button class="btn ghost danger block" type="button" id="wipeBtn">Borrar todos los datos de este celular</button></div>';
  h+='<p class="note" style="text-align:center;margin-top:6px">Pauta '+APP_VERSION+(S.storageOk?'':' · no se pudo acceder al almacenamiento')+'</p>';
  return h;
}
function exportBackup(){
  const days={};Object.keys(S.days).forEach(k=>{if(S.days[k].t)days[k]=S.days[k]});
  const data={app:"pauta",v:1,exportedAt:new Date().toISOString(),config:S.config,custom:Object.fromEntries(Object.entries(S.custom).filter(([,f])=>!f.temp)),days,progress:S.progress};
  const name="pauta-respaldo-"+todayISO()+".json",blob=new Blob([JSON.stringify(data,null,1)],{type:"application/json"});
  const done=()=>{S.meta.lastBackup=todayISO();persist();render();toast("Respaldo listo.")};
  try{const file=new File([blob],name,{type:"application/json"});
    if(navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file],title:"Respaldo de Pauta"}).then(done).catch(e=>{if(e&&e.name!=="AbortError")download(blob,name,done)});return}}catch(e){}
  download(blob,name,done);
}
function download(blob,name,done){const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);done&&done()}
function importBackup(file){
  const rd=new FileReader();
  rd.onload=()=>{
    let o;try{o=JSON.parse(rd.result)}catch(e){toast("Ese archivo no es un respaldo de Pauta.");return}
    if(!o||o.app!=="pauta"){toast("Ese archivo no es un respaldo de Pauta.");return}
    const nd=Object.keys(o.days||{}).length,nf=Object.keys(o.custom||{}).length,np=(o.progress&&o.progress.entries||[]).length;
    confirmSheet("Importar respaldo","Trae "+nd+" día(s), "+nf+" alimento(s) propio(s) y "+np+" registro(s) de progreso. Lo que tengas en las mismas fechas se reemplaza.","Importar",false,()=>{
      Object.entries(o.days||{}).forEach(([k,d])=>{d.t=1;S.days[k]=d});
      Object.assign(S.custom,o.custom||{});
      const map={};(S.progress.entries||[]).forEach(e=>map[e.d]=e);(o.progress&&o.progress.entries||[]).forEach(e=>map[e.d]=Object.assign(map[e.d]||{},e));
      S.progress.entries=Object.values(map);
      if(o.config)S.config=Object.assign(clone(DEFAULT_CONFIG),o.config);
      persist();askPersistent();render();toast("Respaldo importado.");
    });
  };
  rd.readAsText(file);
}
function applyTheme(){const t=S.settings.theme;if(t==="auto")document.documentElement.removeAttribute("data-theme");else document.documentElement.setAttribute("data-theme",t);
  const dark=t==="dark"||(t==="auto"&&matchMedia("(prefers-color-scheme: dark)").matches);
  document.querySelectorAll('meta[name="theme-color"]').forEach(m=>{m.setAttribute("content",dark?"#0F151B":"#EEF1F4");m.removeAttribute("media")});}

/* ================= v2: productos chilenos, escáner, comidas guardadas, compras, metas ================= */
const OFF="https://world.openfoodfacts.org",OFF_F="code,product_name,product_name_es,brands,nutriments,serving_quantity";
const SPIN='<span class="spin" style="display:inline-block;vertical-align:-3px"></span> ';
function offToFood(p){const n=p.nutriments||{},P=nn(n.proteins_100g),C=nn(n.carbohydrates_100g),G=nn(n.fat_100g);
  if(P==null||C==null||G==null)return null;
  const name=((p.product_name_es||p.product_name||"").trim()+" "+((p.brands||"").split(",")[0]||"").trim()).trim();if(!name)return null;
  const top=Math.max(P*4,C*4,G*9),sq=nn(p.serving_quantity);
  return{name:name.slice(0,60),cat:top<12?"otro":top===P*4?"prote":top===C*4?"carbo":"grasa",unit:"g",base:100,def:sq&&sq>0?sq:100,p:r1(P),c:r1(C),g:r1(G),code:String(p.code||""),src:"off"}}
async function offGet(url){let r;try{r=await fetch(url)}catch(e){throw{code:"offline"}}if(r.status===404)return null;if(!r.ok)throw{code:"busy"};return r.json()}
async function offByCode(code){const j=await offGet(OFF+"/api/v2/product/"+encodeURIComponent(code)+".json?fields="+OFF_F);return j&&j.product?offToFood(Object.assign({},j.product,{code})):null}
function offSearch(q){return new Promise((ok,no)=>{const cb="__off"+uid(),s=document.createElement("script"),end=()=>{clearTimeout(t);delete window[cb];s.remove()},t=setTimeout(()=>{end();no({code:"busy"})},20000);
  window[cb]=j=>{end();ok(((j&&j.products)||[]).map(offToFood).filter(Boolean))};s.onerror=()=>{end();no({code:navigator.onLine===false?"offline":"busy"})};
  s.src=OFF+"/cgi/search.pl?search_terms="+encodeURIComponent(q)+"&tagtype_0=countries&tag_contains_0=contains&tag_0=chile&sort_by=unique_scans_n&json=1&jsonp="+cb+"&page_size=24&fields="+OFF_F;document.head.appendChild(s)})}
function saveOff(f){const ex=Object.values(S.custom).find(x=>x.code&&x.code===f.code&&!x.temp);if(ex)return ex;const nf=Object.assign({id:"c_"+uid()},f);S.custom[nf.id]=nf;persist();askPersistent();return nf}
function loadScript(src){return new Promise((ok,no)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
function scanSheet(onFood){
  openSheet('<h2>Escanear código de barras</h2><video id="scV" playsinline muted style="width:100%;max-height:38vh;border-radius:14px;background:#000;object-fit:cover"></video><p class="note" id="scSt">Abriendo la cámara…</p><div class="search"><input id="scCode" inputmode="numeric" placeholder="O escribe el número del código"><button class="btn primary" type="button" id="scGo">Buscar</button></div><div class="actions"><button class="btn" type="button" id="scX">Cerrar</button></div>',h=>{
    const st=h.querySelector("#scSt"),v=h.querySelector("#scV");let stream=null,timer=null,busy=false;
    const stop=()=>{clearInterval(timer);if(stream)stream.getTracks().forEach(t=>t.stop());stream=null};
    S.scanStop=stop;
    const find=async code=>{if(busy)return;busy=true;stop();v.hidden=true;st.innerHTML=SPIN+'Buscando el producto '+esc(code)+'…';
      try{const f=await offByCode(code);
        if(f){closeSheet();foodSheet(null,{prefill:f,onSaved:onFood});toast("Producto encontrado. Revisa los datos y guarda.")}
        else{st.textContent="Ese producto no está en la base o no tiene tabla nutricional. Agrégalo con una foto de la etiqueta.";busy=false}
      }catch(e){st.textContent=e&&e.code==="offline"?"Sin conexión. El escáner necesita internet.":"La base de productos no respondió. Prueba de nuevo.";busy=false}};
    h.querySelector("#scX").onclick=closeSheet;
    h.querySelector("#scGo").onclick=()=>{const c=h.querySelector("#scCode").value.replace(/\D/g,"");if(c.length<8){toast("Escribe los números que están bajo el código de barras.");return}find(c)};
    (async()=>{try{
      if(!("BarcodeDetector" in window))await loadScript("https://cdn.jsdelivr.net/npm/barcode-detector@2.3.1/dist/iife/side-effects.js");
      const det=new BarcodeDetector({formats:["ean_13","ean_8","upc_a","upc_e"]});
      stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}});
      if(S.scanStop!==stop){stop();return}
      v.srcObject=stream;await v.play();st.textContent="Apunta al código de barras del envase.";
      timer=setInterval(async()=>{if(busy||v.readyState<2)return;try{const r=await det.detect(v);if(r&&r[0]&&r[0].rawValue){buzz();find(r[0].rawValue)}}catch(e){}},350);
    }catch(e){v.hidden=true;st.textContent="No pude abrir la cámara. Escribe el número que está bajo el código de barras."}})();
  });
}
function onlineSheet(q0,onFood){
  openSheet('<h2>Productos chilenos</h2><div class="search"><input id="onQ" type="search" placeholder="Ej: yogurt protein, atún, galletas" value="'+esc(q0||"")+'"><button class="btn primary" type="button" id="onGo">Buscar</button></div><div id="onRes"><p class="note">Busca por nombre o marca en Open Food Facts, una base abierta con productos que se venden en Chile.</p></div><div class="actions"><button class="btn" type="button" id="onScan">'+I.cam+' Escanear código</button><button class="btn" type="button" id="onX">Cerrar</button></div>',h=>{
    const res=h.querySelector("#onRes"),inp=h.querySelector("#onQ");let last=[];
    const go=async()=>{const q=inp.value.trim();if(q.length<2)return;res.innerHTML='<p class="note">'+SPIN+'Buscando…</p>';
      try{last=await offSearch(q);
        res.innerHTML=last.length?'<div class="flist">'+last.map((f,i)=>'<button type="button" data-on="'+i+'"><span>'+esc(f.name)+' <span class="cat '+f.cat+'">'+CAT_LABEL[f.cat]+'</span></span><small class="num">100 g: P'+f1(f.p)+' C'+f1(f.c)+' G'+f1(f.g)+'</small></button>').join("")+'</div>':'<p class="note">Sin resultados. Prueba otra palabra, escanea el código o usa la foto de la etiqueta.</p>';
        res.querySelectorAll("[data-on]").forEach(b=>b.onclick=()=>{const f=saveOff(last[b.dataset.on]);closeSheet();if(onFood)onFood(f);else{render();toast("Agregado a tus alimentos: "+short(f.name))}})}
      catch(e){res.innerHTML='<p class="note">'+(e&&e.code==="offline"?"Sin conexión a internet.":"La base de productos no respondió. Prueba de nuevo.")+'</p>'}};
    h.querySelector("#onGo").onclick=go;inp.onkeydown=e=>{if(e.key==="Enter")go()};
    h.querySelector("#onX").onclick=closeSheet;h.querySelector("#onScan").onclick=()=>{closeSheet();scanSheet(onFood)};
    if(q0)go();
  });
}
const PLATE_PROMPT='Eres nutricionista. La foto muestra un plato o comida. Estima con criterio las porciones y los macros totales de lo que se ve. Responde solo con un objeto JSON, sin texto antes ni después: {"es_comida": true, "nombre": "nombre corto del plato en español", "items": [{"nombre": "alimento", "gramos": número}], "proteinas": número, "carbohidratos": número, "grasas": número, "confianza": "alta" | "media" | "baja"}. Los macros van en gramos totales. Si la foto no muestra comida, responde {"es_comida": false}.';
function plateSheet(onFood){
  if(!S.settings.apiKey){toast("La foto del plato usa tu clave de Anthropic. Agrégala en Ajustes → Lector de etiquetas.");return}
  openSheet('<h2>Foto del plato</h2><div class="scan"><label class="scanbtn">'+I.cam+' Sacar o elegir foto<input type="file" id="plF" accept="image/*"></label><div class="st muted" id="plSt">Saca la foto desde arriba, con todo el plato a la vista. Es una estimación, pensada para cuando comes fuera.</div></div><div class="actions"><button class="btn" type="button" id="plX">Cerrar</button></div>',h=>{
    const st=h.querySelector("#plSt"),fi=h.querySelector("#plF");h.querySelector("#plX").onclick=closeSheet;
    fi.onchange=async()=>{const file=fi.files&&fi.files[0];fi.value="";if(!file)return;
      st.className="st";st.innerHTML='<span class="spin"></span><span>Estimando el plato…</span>';
      const img=await toJpeg(file);if(!img){st.textContent="No pude abrir esa foto. Prueba con otra.";return}
      try{const r=await readLabel([img],undefined,PLATE_PROMPT);
        if(!r||r.es_comida===false||nn(r.proteinas)==null){st.textContent="No reconozco comida en esa foto. Prueba con otra.";return}
        const f={id:"c_"+uid(),name:String(r.nombre||"Plato").slice(0,50)+" (foto)",cat:"otro",unit:"porción",base:1,def:1,p:r1(nn(r.proteinas)||0),c:r1(nn(r.carbohidratos)||0),g:r1(nn(r.grasas)||0),temp:true};
        const items=(Array.isArray(r.items)?r.items:[]).slice(0,6).map(x=>esc(x.nombre)+" ~"+fmt(nn(x.gramos)||0)+" g").join(" · ");
        st.innerHTML='<div style="display:flex;flex-direction:column;gap:6px;width:100%"><b>'+esc(f.name)+'</b><span class="num">P '+f1(f.p)+' · C '+f1(f.c)+' · G '+f1(f.g)+' · '+fmt(f.p*4+f.c*4+f.g*9)+' kcal</span>'+(items?'<span class="muted">'+items+'</span>':'')+'<span class="muted">Confianza '+esc(r.confianza||"media")+'. Puede variar ±25 %.</span><button class="btn primary" type="button" id="plOk">Agregar a la comida</button></div>';
        h.querySelector("#plOk").onclick=()=>{S.custom[f.id]=f;persist();closeSheet();onFood(f)};
      }catch(e){st.textContent=SCAN_ERR[e&&e.code]||SCAN_ERR.other}};
  });
}
/* ---- comidas guardadas ---- */
function savedMeals(){return S.config.saved||(S.config.saved=[])}
function savedHtml(){const L=savedMeals();if(!L.length)return'<div class="empty">Todavía no guardas comidas. Toca "Guardar" en cualquier comida de tu día para repetirla después con un toque.</div>';
  return'<div class="flist">'+L.map(sm=>{const mm=sum(sm.items.map(([f,q])=>macro({f,q})));return'<button type="button" data-sm="'+sm.id+'"><span>'+esc(sm.name)+'</span><small class="num">'+fmt(mm.kcal)+' kcal · P'+fmt(mm.p)+' C'+fmt(mm.c)+' G'+fmt(mm.g)+'</small></button>'}).join("")+'</div><p class="note">Para vaciar esta lista, usa "Borrar comidas guardadas" en Ajustes.</p>'}
function addSaved(mealId,isExtra,sm){const d=dayDoc(S.date);let m;
  if(isExtra){m={id:uid(),key:"extra",name:sm.name,time:"",done:true,extra:true,items:[]};d.meals.push(m)}else m=d.meals.find(x=>x.id===mealId);
  if(!m)return;sm.items.forEach(([f,q])=>m.items.push({id:uid(),f,q}));touch(S.date);render();toast(sm.name+": agregada.")}
function saveMealSheet(mealId){const d=dayDoc(S.date),m=d.meals.find(x=>x.id===mealId);if(!m||!m.items.length){toast("Esa comida no tiene alimentos.");return}
  const tm=tplMeal(d,m),o=tm&&tm.options&&tm.options.find(x=>x.id===m.opt);
  openSheet('<h2>Guardar comida</h2><label class="field">Nombre<input id="svN" value="'+esc(o&&o.label?o.label:m.name)+'"></label><p class="note">Queda en "Mis comidas" al agregar alimentos, con estas cantidades.</p><div class="actions"><button class="btn primary" type="button" id="svOk">Guardar</button><button class="btn" type="button" id="svX">Cancelar</button></div>',h=>{
    h.querySelector("#svX").onclick=closeSheet;
    h.querySelector("#svOk").onclick=()=>{const name=h.querySelector("#svN").value.trim()||m.name;m.items.forEach(it=>{const f=S.custom[it.f];if(f&&f.temp)delete f.temp});
      savedMeals().push({id:uid(),name,items:m.items.map(it=>[it.f,it.q])});persist();closeSheet();toast('"'+name+'" guardada en Mis comidas.')}})}
function copyYesterday(){const y=S.days[addDays(S.date,-1)];if(!y||!y.t){toast("No hay nada anotado el día anterior.");return}
  confirmSheet("Copiar el día anterior","Se reemplazan las comidas de este día por las del día anterior, sin marcar.","Copiar",false,()=>{const before=S.days[S.date]?clone(S.days[S.date]):null,d=clone(y);
    d.date=S.date;d.creatina=false;d.agua=0;delete d.cardio;d.meals.forEach(m=>{m.id=uid();m.done=false;m.items.forEach(it=>it.id=uid())});
    S.days[S.date]=d;touch(S.date);render();toast("Día copiado.",()=>{if(before)S.days[S.date]=before;else delete S.days[S.date];persist();render()})})}
/* ---- lista de compras ---- */
const RAW={pechuga:[1.35,"crudo"],trutro:[1.5,"crudo, con hueso"],arroz:[0.36,"crudo"],arroz_int:[0.4,"crudo"],fideos:[0.42,"secos"],fideos_int:[0.42,"secos"],lentejas:[0.4,"secas"],porotos:[0.4,"secos"],garbanzos:[0.45,"secos"],quinoa:[0.35,"cruda"],molida10:[1.3,"cruda"],molida5:[1.3,"cruda"],merluza:[1.25,"crudo"],salmon:[1.2,"crudo"],chuleta:[1.4,"cruda"]};
function shopList(n){const tot={};
  for(let i=0;i<n;i++){const ds=addDays(todayISO(),i),d=S.days[ds]||buildDay(ds,typeFor(ds));d.meals.forEach(m=>{if(m.extra)return;m.items.forEach(it=>{tot[it.f]=(tot[it.f]||0)+(Number(it.q)||0)})})}
  return Object.keys(tot).filter(id=>!food(id).temp&&tot[id]>0).map(id=>{const f=food(id);let q=tot[id],note="";if(RAW[id]){q*=RAW[id][0];note=RAW[id][1]}
    const u=f.unit,txt=(u==="g"||u==="ml")?(q>=1000?f1(q/1000)+(u==="g"?" kg":" L"):fmt(Math.ceil(q/10)*10)+" "+u):f1(Math.ceil(q))+" "+u;
    return{id,cat:f.cat,name:RAW[id]?short(f.name).replace(/ cocid[oa]s?/,""):short(f.name),txt:txt+(note?" "+note:"")}}).sort((a,b)=>(a.cat+a.name).localeCompare(b.cat+b.name,"es"))}
function shopSheet(){let n=7;const ck=S.meta.shop||(S.meta.shop={});
  const html=()=>{const L=shopList(n);return'<h2>Lista de compras</h2><div class="seg" role="group">'+[[7,"7 días"],[14,"14 días"],[30,"30 días"]].map(([v,l])=>'<button type="button" data-n="'+v+'" aria-pressed="'+(n===v)+'">'+l+'</button>').join("")+'</div><p class="note">Sale de tu pauta desde hoy, con las opciones que tienes elegidas. Carnes, arroz, fideos y legumbres van en peso crudo.</p><ul class="flt" style="border:1px solid var(--line);border-radius:14px">'+L.map(x=>'<li><input type="checkbox" data-ck="'+x.id+'"'+(ck[x.id]?' checked':'')+' style="width:22px;height:22px;flex:none" aria-label="Comprado: '+esc(x.name)+'"><span class="dot '+x.cat+'"></span><div class="info"><b>'+esc(x.name)+'</b></div><div class="kc num" style="font-size:15px">'+esc(x.txt)+'</div></li>').join("")+'</ul><div class="actions"><button class="btn primary" type="button" id="shCopy">'+I.out+' Compartir lista</button><button class="btn" type="button" id="shClr">Desmarcar todo</button><button class="btn" type="button" id="shX">Cerrar</button></div>'};
  const bind=h=>{
    h.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{n=Number(b.dataset.n);h.innerHTML='<div class="grab"></div>'+html();bind(h)});
    h.querySelectorAll("[data-ck]").forEach(c=>c.onchange=()=>{if(c.checked)ck[c.dataset.ck]=1;else delete ck[c.dataset.ck];persist()});
    h.querySelector("#shX").onclick=closeSheet;
    h.querySelector("#shClr").onclick=()=>{Object.keys(ck).forEach(k=>delete ck[k]);persist();h.innerHTML='<div class="grab"></div>'+html();bind(h)};
    h.querySelector("#shCopy").onclick=()=>{const text="Lista de compras ("+n+" días)\n"+shopList(n).map(x=>"- "+x.name+": "+x.txt).join("\n");
      if(navigator.share)navigator.share({text}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(text).then(()=>toast("Lista copiada."),()=>toast("No se pudo copiar."));else toast("Este navegador no permite compartir.")};
  };
  openSheet(html(),bind);
}
/* ---- calculadora de metas ---- */
function calcSheet(){
  const pf=Object.assign({sex:"m",age:22,h:168,w:bodyWeight(),act:1.6,rate:0.8},S.config.profile||{});
  const calc=()=>{const bmr=10*pf.w+6.25*pf.h-5*pf.age+(pf.sex==="m"?5:-161),tdee=bmr*pf.act,avg=Math.max(pf.sex==="m"?1500:1200,tdee-pf.rate*1100),P=Math.round(2.2*pf.w/5)*5;
    const mk=(kcal,gf)=>{const g=Math.round(gf*pf.w/5)*5;return{p:P,c:Math.max(50,Math.round((kcal-P*4-g*9)/20)*5),g}};
    return{tdee,avg,tr:mk(avg+115,0.75),re:mk(avg-290,0.63)}};
  const kc=t=>t.p*4+t.c*4+t.g*9,row=(l,t)=>'<tr><td>'+l+'</td><td class="n">'+fmt(kc(t))+'</td><td class="n">'+t.p+'</td><td class="n">'+t.c+'</td><td class="n">'+t.g+'</td></tr>';
  const out=()=>{const r=calc();return'<div class="stat" style="grid-template-columns:repeat(2,minmax(0,1fr))"><div><span>Gastas al día</span><b class="num">'+fmt(r.tdee)+'</b><span>kcal aprox.</span></div><div><span>Para tu ritmo, comes</span><b class="num">'+fmt(r.avg)+'</b><span>kcal promedio</span></div></div><table class="ftable" style="margin-top:8px"><thead><tr><th></th><th class="n">kcal</th><th class="n">Prot</th><th class="n">Carb</th><th class="n">Grasa</th></tr></thead><tbody>'+row("Entreno",r.tr)+row("Descanso",r.re)+'</tbody></table>'+(pf.rate>pf.w*0.01?'<p class="note" style="color:var(--warn);margin-top:8px">Ese ritmo es más de 1 % de tu peso por semana: arriesgas músculo.</p>':'')};
  const opt=(list,cur)=>list.map(([v,l])=>'<option value="'+v+'"'+(String(cur)===String(v)?' selected':'')+'>'+l+'</option>').join("");
  openSheet('<h2>Calcular mis metas</h2><div class="grid2"><label class="field">Sexo<select id="cSex">'+opt([["m","Hombre"],["f","Mujer"]],pf.sex)+'</select></label><label class="field">Edad<input id="cAge" inputmode="numeric" value="'+pf.age+'"></label><label class="field">Estatura (cm)<input id="cH" inputmode="numeric" value="'+pf.h+'"></label><label class="field">Peso (kg)<input id="cW" inputmode="decimal" value="'+f1(pf.w)+'"></label></div>'+
    '<label class="field">Actividad<select id="cAct">'+opt([[1.45,"Trabajo sentado + gym"],[1.6,"Trabajo de pie + gym 4 a 5 días"],[1.75,"Trabajo físico pesado + gym"]],pf.act)+'</select></label>'+
    '<label class="field">Ritmo de bajada<select id="cRate">'+opt([[0,"Mantener peso"],[0.4,"0,4 kg por semana (suave)"],[0.6,"0,6 kg por semana"],[0.8,"0,8 kg por semana"],[1,"1 kg por semana (agresivo)"]],pf.rate)+'</select></label><div id="cOut"></div>'+
    '<p class="note">Usa la fórmula Mifflin-St Jeor, con 2,2 g de proteína por kilo. Es un punto de partida: Progreso lo afina con tus pesajes.</p><div class="actions"><button class="btn primary" type="button" id="cOk">Usar estas metas</button><button class="btn" type="button" id="cX">Cancelar</button></div>',h=>{
    const upd=()=>{pf.sex=h.querySelector("#cSex").value;pf.age=num(h.querySelector("#cAge").value)||pf.age;pf.h=num(h.querySelector("#cH").value)||pf.h;pf.w=num(h.querySelector("#cW").value)||pf.w;pf.act=Number(h.querySelector("#cAct").value);pf.rate=Number(h.querySelector("#cRate").value);h.querySelector("#cOut").innerHTML=out()};
    h.querySelectorAll("input,select").forEach(el=>{el.oninput=upd;el.onchange=upd});upd();
    h.querySelector("#cX").onclick=closeSheet;
    h.querySelector("#cOk").onclick=()=>{const r=calc(),c=S.config;c.targets={semana:clone(r.tr),finde:clone(r.tr),descanso:clone(r.re)};c.carbAdjust=0;(c.adjustLog=c.adjustLog||[]).push(todayISO()+": metas recalculadas con la calculadora");c.profile=clone(pf);c.cardioWeight=pf.w;persist();closeSheet();render();toast('Metas actualizadas. Usa "Cuadrar el día" para ajustar las porciones.')}});
}
/* ---- meta con fecha y resumen de la semana ---- */
function goalCard(w){const g=S.config.goal||{},cur=w.length?w[w.length-1].v:null;
  let h='<div class="card"><h2 style="font-size:19px">Meta</h2><div class="grid2" style="margin-top:8px"><label class="field">Peso meta (kg)<input id="gW" inputmode="decimal" value="'+(g.w?f1(g.w):'')+'" placeholder="76"></label><label class="field">Fecha<input type="date" id="gD" value="'+esc(g.date||"2027-02-15")+'"></label></div>',t="";
  if(g.w&&g.date&&cur){const days=(parseISO(g.date)-parseISO(todayISO()))/864e5,left=cur-g.w;
    if(left<=0)t="Meta cumplida. Define una nueva o pasa a mantención con la calculadora de Ajustes.";
    else if(days<=0)t="La fecha ya pasó y te faltan "+f1(left)+" kg. Pon una fecha nueva.";
    else{const need=left/(days/7),first=w[0].v,pct=Math.max(0,Math.min(100,(first-cur)/Math.max(0.1,first-g.w)*100)),rec=w.filter(p=>parseISO(p.d)>=parseISO(addDays(todayISO(),-21))),s=rec.length>1?slope(rec):null;
      h+='<div class="track" style="margin-top:12px;height:12px" role="img" aria-label="Avance hacia la meta: '+Math.round(pct)+' %"><div class="eat" style="width:'+pct+'%;background:var(--accent)"></div></div>';
      t="Te faltan <b>"+f1(left)+" kg</b> en "+Math.max(1,Math.round(days/7))+" semanas: necesitas bajar <b>"+f1(need)+" kg por semana</b>."+(need>cur*0.01?" Es más de 1 % de tu peso por semana: conviene mover la fecha o la meta para cuidar el músculo.":"")+(s!=null?" A tu ritmo de las últimas semanas llegarías a esa fecha con <b>"+f1(cur+s*days/7)+" kg</b>.":"")}}
  else t="Pon tu peso meta y la fecha. Con tus pesajes te digo qué ritmo necesitas y con cuánto llegarías.";
  return h+'<p class="note" style="margin-top:8px">'+t+'</p></div>'}
function weekStats(){const days=[];
  for(let i=6;i>=0;i--){const ds=addDays(todayISO(),-i),d=S.days[ds]&&S.days[ds].t?S.days[ds]:null;days.push({ds,eat:d?sum(d.meals.filter(m=>m.done).map(mealMacro)):null,t:d?targetForDay(d):null})}
  const used=days.filter(x=>x.eat&&x.eat.kcal>0);if(!used.length)return'';
  const avg=k=>used.reduce((a,x)=>a+x.eat[k],0)/used.length,avgT=used.reduce((a,x)=>a+x.t.kcal,0)/used.length,max=1.12*Math.max(1,...days.map(x=>Math.max(x.eat?x.eat.kcal:0,x.t?x.t.kcal:0)));
  let streak=0;for(let i=0;i<60;i++){const d=S.days[addDays(todayISO(),-i)];const ms=d&&d.t?d.meals.filter(m=>!m.extra):[];const ok=ms.length&&ms.filter(m=>m.done).length/ms.length>=0.8;if(ok)streak++;else if(i>0)break}
  const diff=avg("kcal")-avgT;
  return'<div class="card"><h2 style="font-size:19px">Últimos 7 días</h2><div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;align-items:end;height:120px;margin-top:10px" role="img" aria-label="Calorías comidas por día contra la meta">'+
    days.map(x=>{const e=x.eat?x.eat.kcal:0,over=x.t&&e>x.t.kcal*1.05;return'<div style="position:relative;height:100%;display:flex;align-items:flex-end;background:var(--surface-2);border-radius:8px;overflow:hidden"><div style="width:100%;height:'+(e/max*100)+'%;background:'+(over?'var(--warn)':'var(--accent)')+';border-radius:8px 8px 0 0"></div>'+(x.t?'<i style="position:absolute;left:0;right:0;bottom:'+(x.t.kcal/max*100)+'%;border-top:2px dashed var(--ink);opacity:.55"></i>':'')+'</div>'}).join("")+'</div>'+
    '<div style="display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:6px;text-align:center;font-size:12px;color:var(--muted);margin-top:4px">'+days.map(x=>'<span>'+WD[parseISO(x.ds).getDay()]+'</span>').join("")+'</div>'+
    '<p class="note" style="margin-top:8px">La línea punteada es tu meta de cada día; la barra, lo que marcaste como comido.</p>'+
    '<div class="stat" style="margin-top:10px"><div><span>Promedio</span><b class="num">'+fmt(avg("kcal"))+'</b><span>kcal ('+(diff>0?'+':'')+fmt(diff)+' vs meta)</span></div><div><span>Proteína</span><b class="num">'+fmt(avg("p"))+' g</b><span>promedio al día</span></div><div><span>Racha</span><b class="num">'+streak+'</b><span>'+(streak===1?'día cumplido':'días cumplidos')+'</span></div></div></div>'}

/* ================= Render y navegación ================= */
function render(){
  const v=document.getElementById("view");
  document.querySelectorAll(".tabbar a").forEach(a=>a.setAttribute("aria-current",a.dataset.v===S.view?"page":"false"));
  document.getElementById("setBadge").hidden=!backupDue();
  const ae=document.activeElement,keep=ae&&ae.dataset&&(ae.dataset.qty||ae.dataset.target)?(ae.dataset.qty?'[data-qty="'+ae.dataset.qty+'"]':'[data-target="'+ae.dataset.target+'"]'):(ae&&ae.id==="fq"?"#fq":null);
  renderAppbar();
  v.innerHTML=S.view==="alimentos"?renderAlimentos():S.view==="progreso"?renderProgreso():S.view==="ajustes"?renderAjustes():renderHoy();
  v.querySelectorAll(".opts").forEach(o=>{const sel=o.querySelector('[aria-pressed="true"]');if(sel&&sel.offsetLeft+sel.offsetWidth>o.clientWidth)o.scrollLeft=sel.offsetLeft-14});
  if(keep){const el=v.querySelector(keep);if(el){el.focus();try{const n=el.value.length;el.setSelectionRange(n,n)}catch(e){}}}
}
function clearToast(){clearTimeout(toastTimer);const t=document.getElementById("toastHost");if(t&&!t.querySelector("#updBtn"))t.innerHTML=""}
function route(){clearToast();const h=(location.hash||"#hoy").slice(1);const nv=["hoy","alimentos","progreso","ajustes"].includes(h)?h:"hoy";const changed=nv!==S.view;S.view=nv;render();if(changed)window.scrollTo(0,0)}
window.addEventListener("hashchange",route);
window.addEventListener("scroll",()=>{document.getElementById("appbar").classList.toggle("scrolled",window.scrollY>4)},{passive:true});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){const t=todayISO();if(S.lastToday&&S.lastToday!==t&&S.date===S.lastToday){S.date=t;render()}S.lastToday=t}});

/* ================= Eventos ================= */
document.addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b||b.closest("#sheetHost")||b.closest("#toastHost"))return;
  const ds=b.dataset;
  if(ds.nav){S.date=addDays(S.date,Number(ds.nav));render();return}
  if(ds.go){S.date=ds.go;if(S.view!=="hoy")location.hash="#hoy";else render();return}
  if(ds.done){const d=dayDoc(S.date),m=d.meals.find(x=>x.id===ds.done);m.done=!m.done;touch(S.date);if(m.done)buzz();render();return}
  if(ds.opt){const d=dayDoc(S.date),[mid,oid]=ds.opt.split("|"),m=d.meals.find(x=>x.id===mid),tm=tplMeal(d,m);if(!tm||m.opt===oid)return;
    const o=tm.options.find(x=>x.id===oid),before=clone(d);m.opt=oid;m.items=itemsFrom(o.items);touch(S.date);render();toast(m.name+": "+o.label,()=>{S.days[S.date]=before;touch(S.date);render()});return}
  if(ds.del){const d=dayDoc(S.date),{m,it}=findItem(d,ds.del),before=clone(d);m.items=m.items.filter(x=>x!==it);touch(S.date);render();toast("Quitado.",()=>{S.days[S.date]=before;touch(S.date);render()});return}
  if(ds.add){pickerSheet(ds.add,false);return}
  if(ds.delmeal){const d=dayDoc(S.date),before=clone(d);d.meals=d.meals.filter(x=>x.id!==ds.delmeal);touch(S.date);render();toast("Comida quitada.",()=>{S.days[S.date]=before;touch(S.date);render()});return}
  if(ds.water){const d=dayDoc(S.date);d.agua=Math.max(0,Math.min(12,(d.agua||0)+Number(ds.water)));touch(S.date);render();return}
  if(ds.ff){foodFilter=ds.ff;render();return}
  if(ds.cardio){const d=dayDoc(S.date);if((d.cardio&&d.cardio.type)===ds.cardio)return;setCardio(ds.cardio);return}
  if(ds.editfood){foodSheet(ds.editfood);return}
  if(ds.delentry){const keep=clone(S.progress);S.progress.entries=(S.progress.entries||[]).filter(x=>x.d!==ds.delentry);persist();render();toast("Registro borrado.",()=>{S.progress=keep;persist();render()});return}
  if(b.id==="applyAdj"||ds.adjset){const val=ds.adj||ds.adjset,cfg=S.config;cfg.adjustLog=cfg.adjustLog||[];
    if(val==="reset"){cfg.carbAdjust=0;cfg.adjustLog.push(todayISO()+": ajuste de carbos vuelve a 0")}
    else{cfg.carbAdjust=(cfg.carbAdjust||0)+Number(val);cfg.adjustLog.push(todayISO()+": "+(Number(val)>0?"+":"")+val+" g de carbos por día (queda en "+cfg.carbAdjust+" g)")}
    persist();render();toast('Meta de carbos actualizada. Usa "Cuadrar lo que queda" para ajustar las porciones.');return}
  if(ds.save){saveMealSheet(ds.save);return}
  switch(b.id){
    case "barFood":scanSheet();return;
    case "onFood":onlineSheet(foodQuery,null);return;
    case "shopBtn":shopSheet();return;
    case "calcBtn":calcSheet();return;
    case "copyY":copyYesterday();return;
    case "clrSaved":confirmSheet("Borrar comidas guardadas","Se borran todas las comidas de Mis comidas. Tus días anotados no cambian.","Borrar",true,()=>{S.config.saved=[];persist();render();toast("Comidas guardadas borradas.")});return;
    case "creaBtn":{const d=dayDoc(S.date);d.creatina=!d.creatina;touch(S.date);if(d.creatina)buzz();render();return}
    case "fitBtn":fitDay();return;
    case "extraBtn":pickerSheet(null,true);return;
    case "resetDay":confirmSheet("Volver a la pauta original","Se borran los cambios y las comidas marcadas de este día.","Restaurar",false,()=>{const before=S.days[S.date]?clone(S.days[S.date]):null;S.days[S.date]=buildDay(S.date,S.config.weekMap[parseISO(S.date).getDay()]);touch(S.date);render();toast("Pauta original restaurada.",()=>{if(before){S.days[S.date]=before;touch(S.date);render()}})});return;
    case "newFood":foodSheet(null);return;
    case "scanFood":foodSheet(null,{scan:true});return;
    case "pOk":{const dv=document.getElementById("pD").value||todayISO(),pos=id=>{const x=num(document.getElementById(id).value);return x&&x>0?x:null};
      const w=pos("pW"),c=pos("pC");if(!w&&!c){toast("Anota el peso, la cintura o los dos.");return}
      if(w&&(w<35||w>250)){toast("Revisa el peso: parece un número fuera de rango.");return}
      if(c&&(c<45||c>200)){toast("Revisa la cintura: parece un número fuera de rango.");return}
      const list=S.progress.entries||[],ex=list.find(x=>x.d===dv);if(ex){if(w)ex.w=w;if(c)ex.c=c}else list.push({d:dv,w,c});S.progress.entries=list;persist();askPersistent();render();buzz();toast("Registro guardado.");return}
    case "saveKey":{S.settings.apiKey=document.getElementById("apiKey").value.trim();S.settings.model=document.getElementById("apiModel").value.trim()||"claude-sonnet-5-5";saveSettings();render();toast(S.settings.apiKey?"Lector de etiquetas listo.":"Guardado.");return}
    case "delKey":S.settings.apiKey="";saveSettings();render();toast("Clave quitada de este celular.");return;
    case "expBtn":exportBackup();return;
    case "installBtn":if(S.installEvt){S.installEvt.prompt();S.installEvt.userChoice.finally(()=>{S.installEvt=null;render()})}return;
    case "wipeBtn":confirmSheet("Borrar todo","Se borran tus días, alimentos propios, progreso y metas de este celular. Haz un respaldo antes si lo quieres guardar.","Borrar todo",true,()=>{
      try{localStorage.removeItem(KEY)}catch(e){}S.config=clone(DEFAULT_CONFIG);S.custom={};S.days={};S.progress={entries:[]};S.meta={createdAt:todayISO()};render();toast("Datos borrados.")});return;
  }
});
document.addEventListener("input",e=>{
  const el=e.target;if(el.closest("#sheetHost"))return;
  if(el.dataset.qty){const d=dayDoc(S.date),{it}=findItem(d,el.dataset.qty),v=num(el.value);if(v==null||v<0)return;it.q=v;touch(S.date);clearTimeout(S.rq);if(!/[.,]$/.test(el.value))S.rq=setTimeout(render,700);return}
  if(el.dataset.target){const [k,m]=el.dataset.target.split("|"),v=num(el.value);if(v==null)return;S.config.targets[k][m]=v;persist();return}
  if(el.id==="fq"){foodQuery=el.value;document.getElementById("foodList").innerHTML=foodListHtml();return}
});
document.addEventListener("change",e=>{
  const el=e.target;if(el.closest("#sheetHost"))return;
  if(el.id==="typeSel"){const before=S.days[S.date]?clone(S.days[S.date]):null;S.days[S.date]=buildDay(S.date,el.value);touch(S.date);render();
    toast("Día cambiado a "+TYPES[el.value].label.toLowerCase()+".",()=>{if(before)S.days[S.date]=before;else delete S.days[S.date];persist();render()});return}
  if(el.dataset.swap&&el.value){const d=dayDoc(S.date),{it}=findItem(d,el.dataset.swap),o=food(el.value),nq=equiv(it,o),old=food(it.f).name;it.f=o.id;it.q=nq;touch(S.date);render();toast(short(old)+" → "+short(o.name)+" "+f1(nq)+" "+o.unit);return}
  if(el.dataset.wd){S.config.weekMap[el.dataset.wd]=el.value;Object.keys(S.days).forEach(k=>{if(!S.days[k].t)delete S.days[k]});persist();toast(cap(WD_LONG[el.dataset.wd])+": "+TYPES[el.value].label.toLowerCase()+". Aplica a los días que aún no tocas.");return}
  if(el.dataset.target){render();return}
  if(el.id==="gW"||el.id==="gD"){const w=num(document.getElementById("gW").value),dt=document.getElementById("gD").value;S.config.goal={w:w&&w>35&&w<250?w:null,date:dt||null};persist();render();return}
  if(el.id==="themeSel"){S.settings.theme=el.value;saveSettings();applyTheme();return}
  if(el.id==="cardioMin"){const v=Math.round(num(el.value)||0);const d=dayDoc(S.date);if(d.cardio&&v!==d.cardio.min)setCardio(d.cardio.type,Math.max(0,Math.min(180,v)));return}
  if(el.id==="cardioBack"){S.config.cardioBack=Number(el.value);persist();toast("Listo. Aplica a los días en que marques cardio.");return}
  if(el.id==="cardioWeight"){const v=num(el.value);if(v&&v>35&&v<250){S.config.cardioWeight=v;persist()}return}
  if(el.id==="impFile"&&el.files&&el.files[0]){importBackup(el.files[0]);el.value="";return}
  if(el.dataset.qty){render();return}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&document.querySelector(".sheet-bg"))closeSheet();if(e.key==="Enter"&&e.target.dataset&&e.target.dataset.qty)e.target.blur()});

/* ================= Instalación y modo sin internet ================= */
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();S.installEvt=e;if(S.view==="ajustes")render()});
window.addEventListener("appinstalled",()=>{S.installEvt=null;toast("Pauta quedó instalada.")});
if("serviceWorker" in navigator&&location.protocol!=="file:"){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("sw.js").then(reg=>{
      const offer=w=>{toast("Hay una versión nueva de Pauta.");const h=document.getElementById("toastHost");
        h.innerHTML='<div class="toast" role="status"><span>Hay una versión nueva de Pauta.</span><button type="button" id="updBtn">Actualizar</button></div>';
        document.getElementById("updBtn").onclick=()=>w.postMessage("skipWaiting")};
      if(reg.waiting&&navigator.serviceWorker.controller)offer(reg.waiting);
      reg.addEventListener("updatefound",()=>{const w=reg.installing;w&&w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller)offer(w)})});
    }).catch(()=>{});
    let reloaded=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!reloaded){reloaded=true;location.reload()}});
  });
}

/* ================= Inicio ================= */
load();applyTheme();S.lastToday=todayISO();
matchMedia("(prefers-color-scheme: dark)").addEventListener("change",applyTheme);
route();
})();
