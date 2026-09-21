export const CANVAS_WIDTH = 900;
export const CANVAS_HEIGHT = 600;
export const TOP_BAR_HEIGHT = 70;
export const BOARD_COLS = 9;
export const BOARD_ROWS = 5;
export const CELL_WIDTH = CANVAS_WIDTH / BOARD_COLS;
export const CELL_HEIGHT = (CANVAS_HEIGHT - TOP_BAR_HEIGHT) / BOARD_ROWS;

export const PLANT_DATA = {
  peashooter: { id:'peashooter', name:'Tirador Base', cost:100, color:'#4CAF50', hp:300, cooldown:1500, range:Infinity, isPlatform:false, shootsDouble:false },
  doubleshooter: { id:'doubleshooter', name:'Tirador Doble', cost:175, color:'#2E7D32', hp:300, cooldown:1400, range:Infinity, isPlatform:false, shootsDouble:true },
  sunflower: { id:'sunflower', name:'Generadora', cost:50, color:'#FFEB3B', hp:300, cooldown:8000, range:0, isPlatform:false },
  wallnut: { id:'wallnut', name:'Defensiva', cost:50, color:'#8D6E63', hp:4500, cooldown:0, range:0, isPlatform:false },
  puffshroom: { id:'puffshroom', name:'Hongo Menor', cost:0, color:'#9C27B0', hp:150, cooldown:1500, range:3, isPlatform:false },
  lilypad: { id:'lilypad', name:'Nenúfar', cost:25, color:'#00E676', hp:300, cooldown:0, range:0, isPlatform:true },
  lantern: { id:'lantern', name:'Linterna Antiniebla', cost:75, color:'#FF9800', hp:250, cooldown:0, range:0, isPlatform:false, isLantern:true }
};

export const ENEMY_DATA = {
  basic_bug: { id:'basic_bug', name:'Invasor Básico', hp:220, speed:25, damage:45, color:'#9C27B0', allowedTerrain:['grass','water'] },
  fast_bug: { id:'fast_bug', name:'Invasor Rápido', hp:130, speed:45, damage:35, color:'#E91E63', allowedTerrain:['grass'] },
  water_bug: { id:'water_bug', name:'Invasor Anfibio', hp:220, speed:28, damage:45, color:'#00BCD4', allowedTerrain:['water'] },
  armored_bug: { id:'armored_bug', name:'Invasor Acorazado', hp:550, speed:20, damage:60, color:'#607D8B', allowedTerrain:['grass','water'] },
  fog_lurker: { id:'fog_lurker', name:'Acechador Oculto', hp:260, speed:32, damage:50, color:'#37474F', allowedTerrain:['grass','water'], hiddenInFog:true }
};

export const MAPS_DATA = [
  { id:'map_01', name:'Día 1 - Pradera', desc:'Prueba inicial bajo el sol radiante.', environment:'day', startingResources:150, colors:{bg:'#87CEEB',light:'#7CB342',dark:'#689F38',waterLight:null,waterDark:null}, terrain:['grass','grass','grass','grass','grass'], availablePlants:['peashooter','sunflower','wallnut'], waves:[{delayBefore:7000,message:null,enemies:[{type:'basic_bug',time:1000},{type:'basic_bug',time:6000}]},{delayBefore:12000,message:'¡Primera horda masiva!',isHugeWave:true,enemies:[{type:'basic_bug',time:1000},{type:'fast_bug',time:3000},{type:'basic_bug',time:5000}]}], rewardPlantId:'puffshroom' },
  { id:'map_02', name:'Noche 1 - Jardín Oscuro', desc:'Sin sol en el cielo. Utiliza hongos.', environment:'night', startingResources:50, colors:{bg:'#1A1A2E',light:'#30475E',dark:'#222831',waterLight:null,waterDark:null}, terrain:['grass','grass','grass','grass','grass'], availablePlants:['peashooter','sunflower','wallnut','puffshroom'], waves:[{delayBefore:5000,message:'La oscuridad atrae invasores...',enemies:[{type:'basic_bug',time:1000},{type:'armored_bug',time:7000}]},{delayBefore:12000,message:'¡Horda nocturna acorazada!',isHugeWave:true,enemies:[{type:'basic_bug',time:1000},{type:'armored_bug',time:2500},{type:'fast_bug',time:5000}]}], rewardPlantId:'lilypad' },
  { id:'map_03', name:'Día 2 - La Piscina', desc:'Carriles centrales inundados.', environment:'day', startingResources:150, colors:{bg:'#87CEEB',light:'#7CB342',dark:'#689F38',waterLight:'#29B6F6',waterDark:'#039BE5'}, terrain:['grass','grass','water','water','grass'], availablePlants:['peashooter','sunflower','wallnut','puffshroom','lilypad'], waves:[{delayBefore:6000,message:null,enemies:[{type:'basic_bug',time:1000},{type:'water_bug',time:4000}]},{delayBefore:12000,message:'¡Ataque anfibio coordinado!',isHugeWave:true,enemies:[{type:'basic_bug',time:1000},{type:'water_bug',time:2000},{type:'armored_bug',time:4000}]}], rewardPlantId:'doubleshooter' },
  { id:'map_04', name:'Niebla Espesa - Caverna', desc:'Visibilidad reducida por bancos de niebla móvil.', environment:'fog', startingResources:150, colors:{bg:'#0b132b',light:'#223843',dark:'#1d2d44',waterLight:null,waterDark:null}, terrain:['grass','grass','grass','grass','grass'], availablePlants:['peashooter','doubleshooter','sunflower','wallnut','lantern'], visibility:{enabled:true,xStart:5,width:4}, waves:[{delayBefore:7000,message:'Una espesa niebla ciega tus defensas...',enemies:[{type:'basic_bug',time:1000},{type:'fog_lurker',time:5000}]},{delayBefore:14000,message:'¡Acechadores ocultos en la bruma!',isHugeWave:true,enemies:[{type:'fog_lurker',time:1000},{type:'armored_bug',time:3000},{type:'fog_lurker',time:6000}]}], rewardPlantId:null }
];
