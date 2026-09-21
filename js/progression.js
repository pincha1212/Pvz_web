import { MAPS_DATA } from './config.js';

const STORAGE_KEY = 'floraDefendersProgress_v10';
const LEGACY_STORAGE_KEYS = ['floraDefendersProgress_v08'];

function readStoredMapIndex() {
  try {
    const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];
    for (const key of keys) {
      const saved = localStorage.getItem(key);
      if (saved === null) continue;
      const parsed = Number.parseInt(saved, 10);
      if (!Number.isInteger(parsed)) continue;
      return Math.min(Math.max(parsed, 0), MAPS_DATA.length - 1);
    }
  } catch {
    // El juego puede seguir funcionando aunque localStorage no esté disponible.
  }
  return 0;
}

export const Progression = {
  maxUnlockedMap: 0,
  init() {
    this.maxUnlockedMap = readStoredMapIndex();
    try {
      localStorage.setItem(STORAGE_KEY, String(this.maxUnlockedMap));
    } catch {
      // Persistencia opcional: no debe impedir iniciar el juego.
    }
  },
  completeMap(mapIndex) {
    if (mapIndex !== this.maxUnlockedMap || mapIndex >= MAPS_DATA.length - 1) return;
    this.maxUnlockedMap += 1;
    try {
      localStorage.setItem(STORAGE_KEY, String(this.maxUnlockedMap));
    } catch {
      // El desbloqueo sigue válido durante la sesión actual.
    }
  }
};
