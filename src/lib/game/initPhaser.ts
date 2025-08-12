// src/lib/game/initPhaser.ts
"use client";

import Phaser from "phaser";

declare global {
  interface Window {
    __PHASER_GAME__?: Phaser.Game;
  }
}

export const initPhaserGame = (config: Phaser.Types.Core.GameConfig) => {
  // If already created, return existing instance
  if (window.__PHASER_GAME__) {
    return window.__PHASER_GAME__;
  }
  const game = new Phaser.Game(config);
  window.__PHASER_GAME__ = game;
  return game;
};

export const destroyPhaserGame = () => {
  if (window.__PHASER_GAME__) {
    window.__PHASER_GAME__.destroy(true);
    delete window.__PHASER_GAME__;
  }
};
