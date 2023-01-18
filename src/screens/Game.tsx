import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import {
  playerEnergyAtom,
  toggleInGameMenuAtom,
  // isLoadingGameOfTypeAtom,
  // loadSavedGameAction,
  // createNewGameAction,
  shouldTriggerEndGameAction
} from "../gameActions";
// import { LoadType } from "../types";
import InGameMenu from "../components/InGameMenu";
import EnergyLevel from "../components/EnergyLevel";
import EndGame from "../components/EndGame";

export default function Game() {
  const [inGameMenu, toggleInGameMenu] = useAtom(toggleInGameMenuAtom);
  // const [isLoadingGameOfType] = useAtom(isLoadingGameOfTypeAtom);
  const [shouldTriggerEndGame] = useAtom(shouldTriggerEndGameAction);
  const [playerEnergy, setPlayerEnergy] = useAtom(playerEnergyAtom);
  // const [, loadSavedGame] = useAtom(loadSavedGameAction);
  // const [, createNewGame] = useAtom(createNewGameAction);

  // const loadSavedGameRef = useRef(loadSavedGame);
  // const createNewGameRef = useRef(createNewGame);
  // useEffect(() => {
  //   if (isLoadingGameOfType === LoadType.SAVED) loadSavedGameRef.current();
  //   if (isLoadingGameOfType === LoadType.NEW) createNewGameRef.current();
  // }, [isLoadingGameOfType]);

  const toggleMenu = () => {
    toggleInGameMenu(!inGameMenu);
  };

  const increaseEnergy = () => {
    setPlayerEnergy(playerEnergy >= 100 ? 100 : playerEnergy + 10);
  };

  const decreaseEnergy = () => {
    setPlayerEnergy(playerEnergy <= 0 ? 0 : playerEnergy - 10);
  };

  if (shouldTriggerEndGame) return <EndGame />;

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px"
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={toggleMenu}>In-Game Menu</button>
        {inGameMenu && <InGameMenu />}
      </div>
      <EnergyLevel />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <button onClick={increaseEnergy}>Increase Energy</button>
        <button onClick={decreaseEnergy}>Decrease Energy</button>
      </div>
    </main>
  );
}
