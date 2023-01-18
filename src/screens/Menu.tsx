import React from "react";
import { useAtom } from "jotai";
import {
  startNewGameAction,
  loadLastGameAction,
  activeScreenAtom,
  toggleInGameMenuAtom,
  isLoadingGameOfTypeAtom
} from "../gameActions";
import { LoadType, Screen } from "../types";

export default function Menu() {
  const [activeScreen, setActiveScreen] = useAtom(activeScreenAtom);
  const [, setIsLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);
  const [, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
  const [, startNewGame] = useAtom(startNewGameAction);
  const [, loadLastGame] = useAtom(loadLastGameAction);

  const backToGamePlay = () => {
    toggleInGameMenu(false);
    setIsLoadingGameOfType(LoadType.NONE);
    setActiveScreen(Screen.GAME);
  };

  return (
    <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
      <h1>Best Game Ever</h1>
      {activeScreen === Screen.MENU && (
        <button onClick={backToGamePlay}>Back to Gameplay</button>
      )}
      <button onClick={startNewGame}>New Game</button>
      <button onClick={loadLastGame}>Load Last Game</button>
    </div>
  );
}
