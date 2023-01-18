import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useAtom } from "jotai";
import { activePlayerAtom, playerDataAtom } from "./gameActions";
import ScreenManager from "./screens/ScreenManager";

// For troubleshooting actual game logic,
// start at <ScreenManager />

// All Atom definitions are held in gameActions.ts

function Init() {
  const [activePlayer, setActivePlayer] = useAtom(activePlayerAtom);
  const [playerData, setPlayerData] = useAtom(playerDataAtom);

  useEffect(() => {
    // in the real app, this is an onPlayerChange listener
    // that passes setActivePlayer down as a callback
    (async () =>
      await setTimeout(
        () =>
          setActivePlayer({
            playerId: "123"
          }),
        500
      ))();
  }, [setActivePlayer]);

  useEffect(() => {
    if (activePlayer) {
      // in the real app, this uses the playerId to retreive
      // further information about the player and their gamestate
      (async () =>
        setTimeout(() => {
          setPlayerData({
            playerData: { ...activePlayer },
            lastGameState: {
              playerEnergy: 50
            }
          });
        }, 500))();
    }
  }, [activePlayer, setPlayerData]);

  if (activePlayer && playerData) return <ScreenManager />;
  return <h1>Loading...</h1>;
}

ReactDOM.render(
  <Provider>
    <Suspense fallback={<h2>Loading...</h2>}>
      <Init />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
