import React from "react";
import Board from "../var0/components/Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import V8UseChessMove from "../../../mechanisms/var8/V8UseChessMove";
import V8ChessMovesReducer from "../../../mechanisms/var8/functions/V8ChessMovesReducer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";

function Var8({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V8UseChessMove(
    layout,
    V8ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      V8ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={8}
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

export default Var8;
