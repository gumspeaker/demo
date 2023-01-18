import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { gameEventTriggeredAtom, playerEnergyAtom } from "../gameActions";
import { EventType } from "../types";

const containerStyle = {
  width: "100px",
  height: "16px",
  border: "1px solid black"
};

const EnergyLevel: React.FC = () => {
  const [playerEnergy] = useAtom(playerEnergyAtom);
  const [, setGameEventTriggered] = useAtom(gameEventTriggeredAtom);

  useEffect(() => {
    if (playerEnergy <= 0) setGameEventTriggered(EventType.NO_ENERGY);
  }, [playerEnergy, setGameEventTriggered]);

  return (
    <div style={{ display: "flex" }}>
      Energy:
      <div style={containerStyle}>
        <div
          style={{
            backgroundColor: "green",
            width: `${playerEnergy}px`,
            height: "16px",
            fontSize: "12px"
          }}
        >
          {playerEnergy}
        </div>
      </div>
    </div>
  );
};

export default EnergyLevel;
