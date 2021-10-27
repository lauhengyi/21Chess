import React from "react";
import V19Board from "./components/V19Board";
import V19UseComputer from "../../../mechanisms/var19/V19UseComputer";
import useTime from "../../../mechanisms/var0/useTime";
import var19Layout from "./components/var19Layout";
import GameUI from "../var0/components/GameUI";
import useChessMove from "../../../mechanisms/var0/useChessMove";
import V19ChessMovesReducer from "../../../mechanisms/var19/function/V19ChessMovesReducer";
import V19GetChessMoves from "../../../mechanisms/var19/V19GetChessMoves";

function Var19({ route, navigation }) {
  //Bring up the constants
  const { options, settings, saved } = route.params;

  //Initialise game
  const [gameDetails, chessActions] = useChessMove(
    var19Layout,
    V19ChessMovesReducer,
    saved
  );

  //Initialise time left
  const [timeLeft, restartTimer] = useTime(gameDetails, options, saved);

  //Activate computer
  if (options.mode === 0) {
    V19UseComputer(
      gameDetails,
      chessActions,
      V19GetChessMoves,
      V19ChessMovesReducer,
      options
    );
  }

  return (
    <GameUI
      varNum={19}
      boardLayout={var19Layout}
      navigation={navigation}
      chessActions={chessActions}
      gameDetails={gameDetails}
      timeLeft={timeLeft}
      restartTimer={restartTimer}
      options={options}
      settings={settings}
    >
      <V19Board
        gameDetails={gameDetails}
        options={options}
        onAction={chessActions}
        settings={settings}
      />
    </GameUI>
  );
}

export default Var19;
