import React, { useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { EventType, Screen } from "../types";
import {
  saveGameStateAction,
  activeScreenAtom,
  gameEventTriggeredAtom
} from "../gameActions";

const InGameMenu: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [gameEventTriggered] = useAtom(gameEventTriggeredAtom);
  const [, saveGameState] = useAtom(saveGameStateAction);
  const [, setActiveScreen] = useAtom(activeScreenAtom);

  // temporarily display the "Game Saved! message"
  const timerId = useRef<number>(0);
  useEffect(() => {
    timerId.current = window.setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => {
      clearTimeout(timerId.current);
    };
  }, [message]);

  const saveGame = () => {
    saveGameState(); // gameActions.ts
    setMessage("Game saved!");
  };

  return (
    <>
      <button
        onClick={() => {
          setActiveScreen(Screen.MENU);
        }}
      >
        Main Menu
      </button>
      {gameEventTriggered !== EventType.END_GAME && (
        <button onClick={saveGame}>Save Game</button>
      )}
      <span>{message}</span>
    </>
  );
};

export default InGameMenu;
