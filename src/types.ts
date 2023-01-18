export type ActivePlayer = {
  playerId: string;
};

export type GameState = {
  playerEnergy: number;
};

export type PlayerData = {
  playerData: ActivePlayer;
  lastGameState: GameState;
};

export enum Screen {
  NONE,
  GAME,
  MENU
}

export enum LoadType {
  NONE,
  NEW,
  SAVED
}

export enum EventType {
  NONE,
  END_GAME,
  NO_ENERGY
}
