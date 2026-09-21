import { MAPS_DATA, PLANT_DATA } from './config.js';
import { GameState } from './state.js';
import { Progression } from './progression.js';

export const UI = {
  refs: {},
  messageTimer: null,
  init() {
    this.clearMessageTimer();
    this.refs = {
      overlay: document.getElementById('message-overlay'), msg: document.getElementById('main-message'),
      actionBtn: document.getElementById('action-btn'), nextBtn: document.getElementById('next-map-btn'),
      unlockInfo: document.getElementById('unlock-info'), unlockIcon: document.getElementById('unlock-icon'),
      unlockName: document.getElementById('unlock-name'), seedBank: document.getElementById('seed-bank'),
      resourceAmount: document.getElementById('resource-amount'), waveIndicator: document.getElementById('wave-indicator'),
      mapIndicator: document.getElementById('map-indicator'), mainMenu: document.getElementById('main-menu'),
      uiLayer: document.getElementById('ui-layer'), mapSelector: document.getElementById('map-selector'), container: document.getElementById('game-container')
    };
    this.refs.overlay.style.opacity = 0;
  },
  showMenu() {
    this.clearMessageTimer();
    GameState.status = 'MENU';
    this.refs.uiLayer.style.display = 'none';
    this.refs.mainMenu.style.display = 'flex';
    this.refs.container.style.backgroundColor = '#121814';
    this.refs.overlay.style.opacity = 0;
    this.refs.mapSelector.replaceChildren();
    MAPS_DATA.forEach((map, index) => {
      const locked = index > Progression.maxUnlockedMap;
      const card = document.createElement('div');
      card.className = `map-card${locked ? ' locked' : ''}`;
      if (!locked) card.style.background = map.environment === 'fog' ? 'linear-gradient(145deg,#1e3d59,#17252a)' : map.environment === 'day' ? 'linear-gradient(145deg,#2e7d32,#1b5e20)' : 'linear-gradient(145deg,#283593,#1a237e)';
      card.innerHTML = `<h2>${map.name}</h2><p>${map.desc}</p><p style="margin-top:10px;font-size:11px;color:#FFD700;font-weight:700;">Oleadas: ${map.waves.length}</p>`;
      if (!locked) card.addEventListener('click', () => this.onMapSelected(index));
      this.refs.mapSelector.appendChild(card);
    });
  },
  onMapSelected(index) {},
  clearMessageTimer() {
    if (this.messageTimer !== null) {
      clearTimeout(this.messageTimer);
      this.messageTimer = null;
    }
  },
  updateResources() { this.refs.resourceAmount.textContent = GameState.resources; this.checkSeedAffordability(); },
  buildSeedBank() {
    this.refs.seedBank.replaceChildren();
    GameState.currentMapDef.availablePlants.forEach(plantId => {
      const def = PLANT_DATA[plantId];
      const seed = document.createElement('div');
      seed.className = 'seed-packet'; seed.dataset.plantId = plantId;
      seed.innerHTML = `<div class="seed-icon" style="background-color:${def.color}"></div><div class="seed-cost">${def.cost}</div>`;
      seed.addEventListener('click', e => { e.stopPropagation(); this.selectSeed(plantId, seed); });
      this.refs.seedBank.appendChild(seed);
    });
    this.checkSeedAffordability();
  },
  selectSeed(plantId, element) {
    if (GameState.gameOver || GameState.victory || GameState.resources < PLANT_DATA[plantId].cost) return;
    this.deselectAll(); GameState.selectedPlantId = plantId; element.classList.add('selected');
  },
  checkSeedAffordability() {
    this.refs.seedBank.querySelectorAll('.seed-packet').forEach(packet => packet.classList.toggle('disabled', GameState.resources < PLANT_DATA[packet.dataset.plantId].cost));
  },
  deselectAll() { GameState.selectedPlantId = null; this.refs.seedBank.querySelectorAll('.seed-packet').forEach(el => el.classList.remove('selected')); },
  showMessage(text, color = 'white', duration = 3000) {
    this.clearMessageTimer();
    const { overlay, msg, actionBtn, nextBtn, unlockInfo } = this.refs;
    actionBtn.style.display = 'none'; nextBtn.style.display = 'none'; unlockInfo.style.display = 'none';
    msg.textContent = text; msg.style.color = color; overlay.style.opacity = 1;
    if (duration > 0) {
      this.messageTimer = setTimeout(() => {
        this.messageTimer = null;
        if (!GameState.gameOver && !GameState.victory) overlay.style.opacity = 0;
      }, duration);
    }
  },
  showEndScreen(isVictory, callbacks) {
    this.clearMessageTimer();
    const { overlay, msg, actionBtn, nextBtn, unlockInfo, unlockIcon, unlockName } = this.refs;
    msg.textContent = isVictory ? '¡VICTORIA TRIUNFAL!' : '¡DEFENSAS COLAPSADAS!'; msg.style.color = isVictory ? '#81c784' : '#e53935';
    actionBtn.textContent = isVictory ? 'Volver al Menú' : 'Reintentar'; actionBtn.style.display = 'block';
    actionBtn.style.background = isVictory ? 'linear-gradient(135deg,#546e7a,#37474f)' : 'linear-gradient(135deg,#e53935,#c62828)';
    nextBtn.style.display = isVictory && GameState.currentMapIndex + 1 < MAPS_DATA.length ? 'block' : 'none';
    if (isVictory && GameState.currentMapDef.rewardPlantId) {
      const def = PLANT_DATA[GameState.currentMapDef.rewardPlantId]; unlockInfo.style.display = 'flex'; unlockIcon.style.backgroundColor = def.color; unlockName.textContent = def.name;
      Progression.completeMap(GameState.currentMapIndex);
    }
    actionBtn.onclick = callbacks.onMain; nextBtn.onclick = callbacks.onNext; overlay.style.opacity = 1;
  }
};
