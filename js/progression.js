import { MAPS_DATA } from './config.js';

export const Progression = {
  maxUnlockedMap: 0,
  init() {
    const saved = localStorage.getItem('floraDefendersProgress_v08');
    if (saved !== null) {
      const parsed = Number.parseInt(saved, 10);
      if (Number.isInteger(parsed)) this.maxUnlockedMap = Math.min(Math.max(parsed, 0), MAPS_DATA.length - 1);
    }
  },
  completeMap(mapIndex) {
    if (mapIndex === this.maxUnlockedMap && mapIndex < MAPS_DATA.length - 1) {
      this.maxUnlockedMap += 1;
      localStorage.setItem('floraDefendersProgress_v08', String(this.maxUnlockedMap));
    }
  }
};
