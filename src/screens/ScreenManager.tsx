import React, { ReactElement } from "react";
import { useAtom } from "jotai";
import Game from "./Game";
import Menu from "./Menu";
import { activeScreenAtom } from "../gameActions";
import { Screen } from "../types";

export default function ScreenManager(): ReactElement {
  const [activeScreen] = useAtom(activeScreenAtom);
  if (activeScreen === Screen.GAME) return <Game />;
  return <Menu />; // render the Menu by default on initial load (activeScreen is set to NONE to start)
}
