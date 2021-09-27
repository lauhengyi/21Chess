import React from "react";
import Board from "../var0/components/Board";
import chessMovesReducer from "../../../mechanisms/var0/functions/chessMovesReducer";
import useComputer from "../../../mechanisms/var0/useComputer";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import useTime from "../../../mechanisms/var0/useTime";
import GameUI from "../var0/components/GameUI";

function V2GameScreen({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved, boardLayout } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    boardLayout,
    chessMovesReducer,
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
      chessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={2}
      boardLayout={boardLayout}
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

export default V2GameScreen;
