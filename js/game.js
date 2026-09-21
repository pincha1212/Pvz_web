import { CANVAS_WIDTH, CANVAS_HEIGHT, BOARD_COLS, BOARD_ROWS } from './config.js';
import { GameState } from './state.js';
import { MAPS_DATA } from './config.js';
import { Progression } from './progression.js';
import { UI } from './ui.js';
import { Input } from './input.js';
import { WaveManager } from './waves.js';
import { Renderer } from './renderer.js';
import { ResourceDrop } from './entities.js';

export const canvas=document.getElementById('gameCanvas');
export const ctx=canvas.getContext('2d');

export const GameActions={handleMainButton(){if(GameState.gameOver)loadMap(GameState.currentMapIndex);else if(GameState.victory)UI.showMenu();},handleNextMap(){if(GameState.currentMapIndex+1<MAPS_DATA.length)loadMap(GameState.currentMapIndex+1);else UI.showMenu();},returnToMenu(){UI.showMenu();}};
GameState.callbacks={onMain:()=>GameActions.handleMainButton(),onNext:()=>GameActions.handleNextMap()};
UI.onMapSelected=index=>loadMap(index);

actionSetup();
function actionSetup(){document.getElementById('btn-menu').addEventListener('click',()=>GameActions.returnToMenu());}

export function loadMap(mapIndex){document.getElementById('main-menu').style.display='none';document.getElementById('ui-layer').style.display='flex';GameState.status='PLAYING';GameState.currentMapIndex=mapIndex;GameState.currentMapDef=MAPS_DATA[mapIndex];const def=GameState.currentMapDef;GameState.resources=def.startingResources;GameState.selectedPlantId=null;GameState.entities=[];GameState.particles=[];GameState.floatingTexts=[];GameState.gameOver=false;GameState.victory=false;GameState.skyResourceTimer=0;GameState.fogOffsetTimer=0;GameState.grid=Array.from({length:BOARD_COLS},()=>Array.from({length:BOARD_ROWS},(_,row)=>({terrain:def.terrain[row],entity:null,platform:null})));document.getElementById('game-container').style.backgroundColor=def.colors.bg;UI.refs.mapIndicator.textContent=def.name;WaveManager.reset(def.waves);UI.updateResources();UI.buildSeedBank();UI.showMessage(def.name,'white',2200);}

export function initGame(){Progression.init();UI.init();Input.init(canvas);UI.showMenu();requestAnimationFrame(ts=>{GameState.lastTime=ts;gameLoop(ts);});}

function gameLoop(timestamp){const deltaTime=Math.min(timestamp-GameState.lastTime,100);GameState.lastTime=timestamp;if(GameState.status==='PLAYING'){if(!GameState.gameOver&&!GameState.victory){if(GameState.currentMapDef.environment==='day'){GameState.skyResourceTimer+=deltaTime;if(GameState.skyResourceTimer>=9500){GameState.skyResourceTimer=0;GameState.entities.push(new ResourceDrop(Math.random()*(CANVAS_WIDTH-120)+60,0,true));}}WaveManager.update(deltaTime);for(const ent of GameState.entities)ent.update(deltaTime);for(const p of GameState.particles)p.update(deltaTime);for(const t of GameState.floatingTexts)t.update(deltaTime);GameState.entities=GameState.entities.filter(e=>!e.markedForDeletion);GameState.particles=GameState.particles.filter(p=>!p.markedForDeletion);GameState.floatingTexts=GameState.floatingTexts.filter(t=>!t.markedForDeletion);}ctx.clearRect(0,0,canvas.width,canvas.height);Renderer.drawBoard(ctx);Renderer.drawEntities(ctx);Renderer.drawFog(ctx,deltaTime);for(const p of GameState.particles)p.draw(ctx);for(const t of GameState.floatingTexts)t.draw(ctx);}requestAnimationFrame(gameLoop);}
