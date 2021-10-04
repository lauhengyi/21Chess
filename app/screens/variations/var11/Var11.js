import React from "react";
import V11Board from "./components/V11Board";
import useComputer from "../../../mechanisms/var0/useComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var11Layout from "./components/var11Layout";
import GameUI from "../var0/components/GameUI";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V11ChessMovesReducer from "../../../mechanisms/var11/functions/V11ChessMovesReducer";
import V11GetChessMoves from "../../../mechanisms/var11/V11GetChessMoves";

function Var11({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    var11Layout,
    V11ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    useComputer(
      gameDetails,
      chessActions,
      V11GetChessMoves,
      V11ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={11}
      boardLayout={var11Layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V11Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var11;
