import React from "react";
import Board from "./var0_Components/Board";
import { useChessMove } from "../../mechanisms/var0/useChessMove";
import useComputer from "../../mechanisms/var0/useComputer";
import useTime from "../../mechanisms/var0/useTime";
import layout from "./boardLayouts/var0Layout";
import bugTest from "./boardLayouts/bugTest";
import GameUI from "./var0_Components/GameUI";
import evaluateBoardV2 from "../../mechanisms/var0/evalutateBoardV2";
import getOccupiedMatrix from "../../mechanisms/primaryFunctions/getOccupiedMatrix";
import "react-native-console-time-polyfill";
import useEnemyComputer from "../../mechanisms/var0/useEnemyComputer";

function Var0({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(layout, saved);

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(gameDetails, chessActions, options);
  }

  /*   console.log(
    countMoves(
      gameDetails.boardLayout,
      gameDetails.currentSide,
      gameDetails.lastMoved,
      3
    )
  ); */
  return (
    <GameUI
      varNum={0}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var0;
