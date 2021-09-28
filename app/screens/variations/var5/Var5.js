import React from "react";
import V5Board from "./components/V5Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import "react-native-console-time-polyfill";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V5ChessMovesReducer from "../../../mechanisms/var5/V5ChessMovesReducer";
import V5GetChessMoves from "../../../mechanisms/var5/V5GetChessMoves";

function Var5({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    layout,
    V5ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      V5GetChessMoves,
      V5ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={5}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V5Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var5;
