import React from "react";
import V20Board from "./components/V20Board";
import V20UseComputer from "../../../mechanisms/var20/V20UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V20ChessMovesReducer from "../../../mechanisms/var20/functions/V20ChessMovesReducer";
import V20GetChessMoves from "../../../mechanisms/var20/V20GetChessMoves";

function Var20({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    layout,
    V20ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V20UseComputer(
      gameDetails,
      chessActions,
      V20GetChessMoves,
      V20ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={20}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V20Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var20;
