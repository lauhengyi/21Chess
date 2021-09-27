import React from "react";
import Board from "../var0/components/Board";
import V1UseChessMove from "../../../mechanisms/var1/V1UseChessMoves";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import "react-native-console-time-polyfill";
import getChessMoves from "../../../mechanisms/var0/getChessMoves";
import V1ChessMovesReducer from "../../../mechanisms/var1/V1ChessMoveReducer";

function Var3({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = V1UseChessMove(layout, saved);

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      getChessMoves,
      V1ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={3}
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

export default Var3;
