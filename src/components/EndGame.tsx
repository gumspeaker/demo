import React from "react";
import { useAtom } from "jotai";
import { EventType, Screen } from "../types";
import { activeScreenAtom, gameEventTriggeredAtom } from "../gameActions";

const EndGame: React.FC = () => {
  const [, setGameEventTriggered] = useAtom(gameEventTriggeredAtom);
  const [, setActiveScreen] = useAtom(activeScreenAtom);

  const goBackToMainMenu = () => {
    setGameEventTriggered(EventType.NONE);
    setActiveScreen(Screen.NONE);
  };

  return (
    <div style={{ backgroundColor: "lightsalmon" }}>
      <span>You Lose</span>{" "}
      <button onClick={goBackToMainMenu}>Start Over</button>
    </div>
  );
};

export default EndGame;
