import React from "react";
import V14Board from "./components/V14Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import layout from "../boardLayouts/var0Layout";
import GameUI from "../var0/components/GameUI";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V14ChessMovesReducer from "../../../mechanisms/var14/V14ChessMovesReducer";
import V14GetChessMoves from "../../../mechanisms/var14/V14GetChessMoves";

function Var14({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    layout,
    V14ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      V14GetChessMoves,
      V14ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={14}
      boardLayout={layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V14Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var14;
