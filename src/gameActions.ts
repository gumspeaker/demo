import { atom } from "jotai";
import { LoadType, Screen, EventType } from "./types";
import { ActivePlayer, PlayerData, GameState } from "../src/types";

const intialActivePlayer = {
  playerId: "123",
  playerDisplayName: "Joey Kaplowee"
};

const initialPlayerData = {
  playerData: intialActivePlayer,
  lastGameState: { playerEnergy: 100 }
};

// Initialize all Atoms
export const activePlayerAtom = atom<ActivePlayer>(intialActivePlayer);
export const playerDataAtom = atom<PlayerData>(initialPlayerData);
export const activeScreenAtom = atom<number>(Screen.NONE);
export const toggleInGameMenuAtom = atom<boolean>(false);
export const isLoadingGameOfTypeAtom = atom<number>(LoadType.NEW);
export const gameEventTriggeredAtom = atom<number>(EventType.NONE);
export const playerEnergyAtom = atom<number>(100);

const resetDefaultGameState = atom(null, (_get, set) => {
  set(toggleInGameMenuAtom, false);
  set(gameEventTriggeredAtom, EventType.NONE);
  set(activeScreenAtom, Screen.GAME);
});

export const startNewGameAction = atom(null, (_get, set) => {
  set(resetDefaultGameState, null);
  set(isLoadingGameOfTypeAtom, LoadType.NEW);
});

export const loadLastGameAction = atom(null, (_get, set) => {
  set(resetDefaultGameState, null);
  set(isLoadingGameOfTypeAtom, LoadType.SAVED);
});

export const shouldTriggerEndGameAction = atom((get) => {
  const gameEventTriggered = get(gameEventTriggeredAtom); // this sometimes returns a stale value
  return [
    gameEventTriggered === EventType.END_GAME,
    gameEventTriggered === EventType.NO_ENERGY
  ].some((triggerState: boolean): boolean => triggerState === true);
});

// This does the actual work of loading up a saved game.
// It is triggered by the useEffect in <Game />, which is
// triggered by the loadLastGameAction above.
export const loadSavedGameAction = atom(null, async (get, set) => {
  const playerData = get(playerDataAtom);
  set(playerEnergyAtom, playerData.lastGameState.playerEnergy);
});

// Same logic as loadSavedGameAction
export const createNewGameAction = atom(null, (_get, set) => {
  set(playerEnergyAtom, 100);
});

export const saveGameStateAction = atom({} as GameState, (get, set) => {
  const activePlayer = get(activePlayerAtom);
  const snapshot: GameState = {
    playerEnergy: get(playerEnergyAtom)
  };
  set(playerDataAtom, {
    playerData: { ...activePlayer },
    lastGameState: { ...snapshot }
  });
});
