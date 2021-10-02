import React from "react";
import Board from "../var0/components/Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V9ChessMovesReducer from "../../../mechanisms/var9/functions/V9ChessMovesReducer";
import V9GetChessMoves from "../../../mechanisms/var9/V9GetChessMoves";

function Var9({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    layout,
    V9ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      V9GetChessMoves,
      V9ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={9}
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

export default Var9;
