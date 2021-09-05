import React from "react";
import Board from "./var0_Components/Board";
import { useChessMove } from "../../mechanisms/var0/useChessMove";
import useComputer from "../../mechanisms/var0/useComputer";
import useTime from "../../mechanisms/var0/useTime";
import layout from "./boardLayouts/var0Layout";
import testLayout from "./boardLayouts/testLayout";
import GameUI from "./var0_Components/GameUI";
import evaluateBoard from "../../mechanisms/var0/evalutateBoard";
import countMoves from "../../mechanisms/var0/test";

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

  const currentEvaluation = evaluateBoard(gameDetails);
  console.log({ currentEvaluation });
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
